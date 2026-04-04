import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase"

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, platform_id, phone, delivery_zone, upi_id } = body;

        const { data: user, error: userError } = await supabase
            .from("users")
            .insert([
                {
                    name,
                    platform_id,
                    phone,
                    delivery_zone,
                    upi_id
                }
            ])
            .select()
            .single();
        
        if (userError) throw userError;

        return NextResponse.json({
            message: "Rider registered successfully",
            user
        }, { status: 201 });
    } catch (err: unknown) {
        const errorMsg = err instanceof Error
            ? err.message
            : "An unknown error occurred during registration.";
        
        return NextResponse.json(
            { error: errorMsg },
            { status: 500 }
        );
    }
};