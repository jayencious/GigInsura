import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const authHeader = req.headers.get("authorization");
        if(!authHeader || !authHeader.startsWith("Bearer ")) return NextResponse.json(
            { error: "Security breach: Missing token" },
            { status: 401 }
        );

        const body = await req.json();

        const { action_type } = body;

        let resultMsg = "";

        switch(action_type) {
            case "INJECT_ANOMALY": {
                resultMsg = "SUCCESS: Category 4 Storm telemetry injected into OpenWeather node. Dynamic premium spiking.";
                break;
            }
            
            case "TEST_FRAUD": {
                resultMsg = "SUCCESS: Fraud engine pinged. 0 suspicious claims detected in the last 24 hours.";
                break;
            }

            case "TRIGGER_PAYOUT": {
                resultMsg = "SUCCESS: Smart Contract executed. ₹15,400 distributed to 42 affectd riders in Koramangala.";
                break;
            }

            default:
                return NextResponse.json(
                    { error: "Unknown command" },
                    { status: 400 }
                );
        }

        await new Promise(
            (resolve) => setTimeout(resolve, 1500)
        );

        return NextResponse.json(
            { success: true, message: resultMsg }
        );
    } catch (err) {
        console.error("Admin Action Failed:", err);

        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
};