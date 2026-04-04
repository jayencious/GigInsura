"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../utils/supabase/client";
import { motion, Variants } from "framer-motion";
import { ShieldAlert, CloudLightning, Activity, Terminal, ShieldCheck } from "lucide-react";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function AdminDashboard() {
    const router = useRouter();
    const supabase = createClient();

    const [loading, setLoading] = useState(true);
    const [actionLog, setActionLog] = useState<string[]>(["[SYSTEM] Admin connection established. Awaiting commands..."]);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        const verifyAdmin = async () => {
            try {
                const { data: { session }, error: authError } = await supabase.auth.getSession();

                if (authError || !session) {
                    router.push("/login");
                    return;
                }

                const { data: userData, error: dbError } = await supabase
                    .from("users")
                    .select("role, name")
                    .eq("id", session.user.id)
                    .single();

                if (dbError || userData?.role !== 'admin') {
                    console.warn("Unauthorized access attempt detected.");
                    router.push("/dashboard");
                    return;
                }

                setLoading(false);
            } catch (err) {
                console.error("Admin verification failed:", err);
                router.push("/dashboard");
            }
        };

        verifyAdmin();
    }, [router, supabase]);

    const executeCommand = async (actionType: string) => {
        setIsProcessing(true);

        setActionLog(prev => [`[${new Date().toLocaleTimeString()}] Executing ${actionType}...`, ...prev]);

        try {
            const { data: { session } } = await supabase.auth.getSession();
            const token = session?.access_token;

            const res = await fetch("/api/admin/action", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ action_type: actionType })
            });

            const data = await res.json();

            if (res.ok) {
                setActionLog(prev => [`[${new Date().toLocaleTimeString()}] ${data.message}`, ...prev]);
            } else {
                setActionLog(prev => [`[${new Date().toLocaleTimeString()}] ERROR: ${data.error}`, ...prev]);
            }
        } catch (error) {
            setActionLog(prev => [`[${new Date().toLocaleTimeString()}] CRITICAL FAILURE: Node disconnected.`, ...prev]);
        } finally {
            setIsProcessing(false);
        }
    };

    if (loading) {
        return (
            <div
                className="min-h-screen bg-black flex items-center justify-center font-mono text-green-500"
            >
                <motion.div
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                >
                    Verifying Admin Clearance...
                </motion.div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-[#0a0a0a] text-slate-300 p-4 md:p-8 font-sans"
        >
            <div
                className="max-w-6xl mx-auto space-y-6"
            >

                {/* Header Section */}
                <div
                    className="flex justify-between items-center bg-red-950/20 p-6 rounded-2xl border border-red-900/50 shadow-[0_0_30px_rgba(220,38,38,0.1)]"
                >
                    <div
                        className="flex items-center gap-4"
                    >
                        <div
                            className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center border border-red-500/30"
                        >
                            <ShieldAlert className="text-red-500" size={24} />
                        </div>
                        <div>
                            <h1
                                className="text-3xl font-black text-white tracking-tight"
                            >
                                GigInsura Overlord Control Panel
                            </h1>
                            <p
                                className="text-red-400 mt-1 font-mono text-sm flex items-center gap-2"
                            >
                                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                                RESTRICTED ACCESS AREA
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => router.push("/dashboard")}
                        className="text-slate-400 hover:text-white transition-colors font-medium"
                    >
                        View Rider Dashboard
                    </button>
                </div>

                <div
                    className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                >

                    {/* Left Column: Command Buttons */}
                    <div
                        className="space-y-4"
                    >
                        <h2
                            className="text-xl font-bold text-white mb-4 flex items-center gap-2"
                        >
                            <Terminal size={20} className="text-slate-500" /> Active Webhooks
                        </h2>

                        <button
                            onClick={() => executeCommand("INJECT_ANOMALY")}
                            disabled={isProcessing}
                            className="w-full group bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/50 p-6 rounded-xl transition-all flex items-center justify-between disabled:opacity-50"
                        >
                            <div
                                className="flex items-center gap-4"
                            >
                                <div
                                    className="bg-blue-500/10 p-3 rounded-lg group-hover:bg-blue-500/20 transition-colors"
                                >
                                    <CloudLightning className="text-blue-400" size={24} />
                                </div>
                                <div
                                    className="text-left"
                                >
                                    <h3
                                        className="font-bold text-white"
                                    >
                                        Inject Telemetry Anomaly
                                    </h3>
                                    <p
                                        className="text-sm text-slate-500"
                                    >Simulate heavy storm data in OpenWeather API</p>
                                </div>
                            </div>
                        </button>

                        <button
                            onClick={() => executeCommand("TEST_FRAUD")}
                            disabled={isProcessing}
                            className="w-full group bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/50 p-6 rounded-xl transition-all flex items-center justify-between disabled:opacity-50"
                        >
                            <div
                                className="flex items-center gap-4"
                            >
                                <div
                                    className="bg-amber-500/10 p-3 rounded-lg group-hover:bg-amber-500/20 transition-colors"
                                >
                                    <Activity className="text-amber-400" size={24} />
                                </div>
                                <div
                                    className="text-left"
                                >
                                    <h3
                                    className="font-bold text-white"
                                    >
                                        Ping Fraud Engine
                                    </h3>
                                    <p
                                        className="text-sm text-slate-500"
                                    >
                                        Run heuristic checks on latest claims
                                    </p>
                                </div>
                            </div>
                        </button>

                        <button
                            onClick={() => executeCommand("TRIGGER_PAYOUT")}
                            disabled={isProcessing}
                            className="w-full group bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/50 p-6 rounded-xl transition-all flex items-center justify-between disabled:opacity-50"
                        >
                            <div
                                className="flex items-center gap-4"
                            >
                                <div
                                    className="bg-emerald-500/10 p-3 rounded-lg group-hover:bg-emerald-500/20 transition-colors"
                                >
                                    <ShieldCheck className="text-emerald-400" size={24} />
                                </div>
                                <div
                                    className="text-left"
                                >
                                    <h3
                                        className="font-bold text-white"
                                    >
                                        Force Automated Payouts
                                    </h3>
                                    <p
                                        className="text-sm text-slate-500"
                                    >
                                        Trigger smart contract distribution for active anomaly
                                    </p>
                                </div>
                            </div>
                        </button>
                    </div>

                    {/* Right Column: Live Output Terminal */}
                    <div
                        className="h-full"
                    >
                        <div
                            className="bg-black border border-slate-800 rounded-xl p-4 h-full min-h-100 font-mono text-sm relative overflow-hidden shadow-xl"
                        >
                            <div
                                className="absolute top-0 left-0 w-full h-8 bg-slate-900 border-b border-slate-800 flex items-center px-4 gap-2"
                            >
                                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                                <span
                                    className="ml-2 text-slate-500 text-xs"
                                >
                                    /var/log/giginsura/engine.log
                                </span>
                            </div>

                            <div
                                className="mt-10 space-y-2 max-h-87.5 overflow-y-auto pb-4"
                            >
                                {actionLog.map(
                                    (log, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className={`${log.includes('SUCCESS') ? 'text-emerald-400' : log.includes('ERROR') ? 'text-red-400' : 'text-slate-400'}`}
                                    >
                                        {log}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}