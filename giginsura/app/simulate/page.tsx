"use client";

import { useState } from "react";

interface TriggerResult {
    message?: string;
    claims_generated?: number;
    error?: string;
};

export default function SimulateDisaster() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<TriggerResult | null>(null);

    const [payload, setPayload] = useState(
        {
            zone: "Koramangala",
            triggerType: "HEAVY_RAIN",
            severityWeight: 0.5 // 50% of max payout
        }
    );

    const fireTrigger = async () => {
        setLoading(true);
        setResult(null);

        try {
            const res = await fetch("/api/webhooks/trigger", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const text = await res.text();
                console.error("Backend returned an error:", text);

                throw new Error(`Server Error: ${res.status}. Check Next.js terminal!`);
            }

            const data = await res.json();

            setResult(data);
        } catch (err: unknown) {
            const errorMsg = err instanceof Error
                ? err.message
                : "An unknown error occurred while simulating the disaster trigger.";
            
            setResult({ error: errorMsg });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen bg-gray-900 p-8 text-white"
        >
            <div
                className="max-w-2xl mx-auto border border-red-500/30 bg-gray-800 rounded-xl p-8 shadow-2xl shadow-red-500/10"
            >
                <h1
                    className="text-3xl font-black text-red-500 mb-2 flex items-center"
                >
                    <span className="mr-2">⚠️</span> Parametric Trigger Simulator
                </h1>
                <p
                    className="text-gray-400 mb-8"
                >
                    Force an environmental disruption to test the zero-touch claims engine.
                </p>

                <div
                    className="space-y-6"
                >
                    <div>
                        <label
                            className="block text-sm font-medium text-gray-400 mb-1"
                        >
                            Target Delivery Zone
                        </label>
                        <select
                            className="w-full bg-gray-700 border border-gray-600 rounded p-3 text-white"
                            value={payload.zone}
                            onChange={(e) => setPayload({ ...payload, zone: e.target.value })}
                        >
                            <option>Koramangala</option>
                            <option>Indiranagar</option>
                            <option>Whitefield</option>
                        </select>
                    </div>

                    <div>
                        <label
                            className="block text-sm font-medium text-gray-400 mb-1"
                        >
                            Disruption Event
                        </label>
                        <select
                            className="w-full bg-gray-700 border border-gray-600 rounded p-3 text-white"
                            value={payload.triggerType}
                            onChange={(e) => setPayload({ ...payload, triggerType: e.target.value })}
                        >
                            <option value="HEAVY_RAIN">Monsoon / Heavy Rain</option>
                            <option value="FLOODING">Waterlogging / Flooding</option>
                            <option value="GRIDLOCK">Severe Traffic Gridlock</option>
                            <option value="SEVERE_AQI">Hazardous Air Quality</option>
                        </select>
                    </div>

                    <button
                        onClick={fireTrigger}
                        disabled={loading}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-lg shadow-lg shadow-red-600/30 transition-all active:scale-95 disabled:opacity-50 text-lg uppercase tracking-wider"
                    >
                        {loading ? "Transmiting to Disaster Networks..." : "Deploy Emergency Trigger"}
                    </button>
                </div>

                {result && (
                    <div
                        className={`mt-8 p-4 rounded border ${result.error ? "bg-red-900/50 border-red-500 text-red-200" : "bg-green-900/50 border-green-500 text-green-200"}`}
                    >
                        <pre
                            className="whitespace-pre-wrap font-mono text-sm"
                        >
                            {JSON.stringify(result, null, 2)}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
};