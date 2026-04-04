import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
    try {
        const authHeader = req.headers.get("Authorization");
        if(!authHeader) return NextResponse.json(
            { success: false, message: "🚨 SECURITY BREACH: Missing Authorization Token" },
            { status: 401 }
        );

        const token = authHeader.replace("Bearer", "");
        const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);

        if(authError || !user) return NextResponse.json(
            { success: false, message: "🚨 SECURITY BREACH: Invalid or Expired Token" },
            { status: 401 }
        );

        const { data: adminCheck } = await supabaseAdmin
            .from("users")
            .select("is_admin")
            .eq("id", user.id)
            .single();
        
        if(!adminCheck?.is_admin) return NextResponse.json(
            { success: false, message: "🚨 SECURITY BREACH: Unauthorized User Attempting to Trigger Payouts" },
            { status: 403 }
        );
        
        const { zone, disruption_type } = await req.json();

        const { data: affectedUsers, error: fetchError } = await supabaseAdmin
            .from("users")
            .select("*")
            .eq("delivery_zone", zone);
        
        if(fetchError) throw fetchError;

        if(affectedUsers && affectedUsers.length > 50) return NextResponse.json(
            {
                success: false,
                message: `🚨 FRAUD ALERT: Unusual/Suspicious density of ${affectedUsers.length} riders in ${zone}. System halted. Payouts frozen for manual review.`
            },
            { status: 403 }
        );

        if(!affectedUsers || affectedUsers.length === 0) return NextResponse.json(
            {
                success: true,
                message: `Disaster triggered, but 0 active riders were found in ${zone}.`,
                riders_protected: 0,
                total_payout_inr: 0
            }
        );

        const simulatedPayoutInr = 500; // For production use, we can integrate a payment API like Razorpay or Striple to wire money.

        return NextResponse.json(
            {
                success: true,
                message: `Successfully executed parametric smart contract for ${zone}.`,
                disruption: disruption_type,
                riders_protected: affectedUsers.length,
                total_payout_inr: affectedUsers.length * simulatedPayoutInr,
                logs: affectedUsers.map(
                    (user) => `Ledger TX: ₹${simulatedPayoutInr} wired to ${user.name} (${user.id})`
                )
            }
        );
    } catch (err: unknown) {
        const errorMsg = err instanceof Error
            ? err.message
            : "An unknown error occurred!";
        
        return NextResponse.json(
            {
                success: false,
                error: errorMsg
            },
            { status: 500 }
        );
    }
};