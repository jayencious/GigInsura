"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { AlertTriangle, Send } from "lucide-react";
import { sendDisasterAlert } from "../actions/sendAlert";

export default function AdminOverlord() {
    const [isSimulating, setIsSimulating] = useState(false);

    const triggerDisaster = async () => {
        setIsSimulating(true);
        const loadingToast = toast.loading("Injecting Category 4 Anomaly...");

        // Simulate a slight delay to make the demo look realistic
        setTimeout(async () => {
            // Call the secure Server Action we just created
            const res = await sendDisasterAlert("Koramangala", 850);
            
            if (res.success) {
                toast.success("Anomaly Injected! Smart Contracts Executed.", { id: loadingToast });
                toast("Check your phone for the email receipt!", { icon: "📱" });
            } else {
                toast.error("Simulation failed.", { id: loadingToast });
            }
            setIsSimulating(false);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
            <div className="bg-slate-900 border border-red-900/50 p-8 rounded-3xl shadow-2xl shadow-red-900/20 max-w-xl w-full text-center">
                <div className="w-20 h-20 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle size={40} />
                </div>
                
                <h1 className="text-3xl font-black text-white mb-2">Overlord Terminal</h1>
                <p className="text-slate-400 mb-8">Warning: This panel overrides global telemetry and triggers live smart-contract payouts.</p>

                <button
                    onClick={triggerDisaster}
                    disabled={isSimulating}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-black text-lg py-5 rounded-xl transition-all flex justify-center items-center gap-3 disabled:opacity-50"
                >
                    {isSimulating ? "Executing Subroutines..." : "SIMULATE DISASTER EVENT"}
                    {!isSimulating && <Send size={24} />}
                </button>
            </div>
        </div>
    );
}