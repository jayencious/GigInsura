import { NextResponse } from "next/server";
import { supabase } from "../../../../lib/supabase";

interface AffectedPolicy {
    id: string;
    user_id: string;
    max_payout_amount: number;
    users: {
        delivery_zone: string;
    } | { delivery_zone: string }[];    // Handles Supabase 1-to-1 or 1-to-many join typing
};

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { zone, triggerType, severityWeight } = body;

        console.log(`🚨 ALERT RECEIVED: ${triggerType} detected in ${zone} with severity weight ${severityWeight}`);

        const { data: affectedPolicies, error: fetchError } = await supabase
            .from("policies")
            .select(`
                id,
                user_id,
                max_payout_amount,
                users!inner (delivery_zone)
            `)
            .eq("is_active", true)
            .eq("users.delivery_zone", zone);
        
        if(fetchError) throw fetchError;

        if(!affectedPolicies || affectedPolicies.length === 0) return NextResponse.json(
            { message: `No active riders found in ${zone}.` },
            { status: 200 }
        );

        const claimsToInsert = affectedPolicies.map(
            (policy: AffectedPolicy) => (
                {
                    policy_id: policy.id,
                    user_id: policy.user_id,
                    trigger_type: triggerType,
                    status: "PENDING",  // We set to PENDING so that our Fraud Engine can check it before approving
                    payout_amount: policy.max_payout_amount * severityWeight,   // Dynamic payout based on severity weight
                }
            )
        );

        const { error: insertError } = await supabase
            .from("claims")
            .insert(claimsToInsert);
        
        if(insertError) throw insertError;

        return NextResponse.json(
            { message: "Automated parametric claims successfully triggered!", claims_generated: claimsToInsert.length },
            { status: 200 }
        );
    } catch (err: unknown) {
        const errorMsg = err instanceof Error
            ? err.message
            : "An unknown error occurred while processing the webhook trigger.";
        
        return NextResponse.json(
            { error: errorMsg },
            { status: 500 }
        );
    }
};