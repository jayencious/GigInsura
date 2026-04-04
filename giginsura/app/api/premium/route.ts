import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const pyRes = await fetch("http://127.0.0.1:8000/api/calculate-premium", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
        });

        if (!pyRes.ok) throw new Error("Python API failed!");

        const data = await pyRes.json();

        return NextResponse.json(data, { status: 200 });
    } catch (err: unknown) {
        const errorMsg = err instanceof Error
            ? err.message
            : "An unknown error occurred while calculating premium.";
        
        return NextResponse.json(
            { error: errorMsg },
            { status: 500 }
        );
    }
};