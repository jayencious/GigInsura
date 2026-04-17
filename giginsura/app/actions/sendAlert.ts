"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendDisasterAlert(zone: string, payout: number) {
    try {
        await resend.emails.send({
            from: "GigInsura Overlord <onboarding@resend.dev>",
            to: "joel.official2565@gmail.com",
            subject: "🚨 URGENT: Smart Contract Payout Executed",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #334155; border-radius: 10px; background-color: #0f172a; color: #f8fafc;">
                    <h2 style="color: #38bdf8; margin-top: 0;">GigInsura Automated Relief</h2>
                    
                    <div style="background-color: rgba(239, 68, 68, 0.1); border-left: 4px solid #ef4444; padding: 15px; margin: 20px 0;">
                        <h3 style="color: #ef4444; margin: 0 0 10px 0;">DISASTER ANOMALY DETECTED</h3>
                        <p style="margin: 0;"><strong>Zone:</strong> ${zone}</p>
                        <p style="margin: 5px 0 0 0;">A Category 4 storm anomaly has breached the safety threshold in your delivery zone.</p>
                    </div>

                    <div style="background-color: rgba(16, 185, 129, 0.1); border-left: 4px solid #10b981; padding: 15px; margin: 20px 0;">
                        <h3 style="color: #10b981; margin: 0 0 10px 0;">SMART CONTRACT EXECUTED</h3>
                        <p style="margin: 0; font-size: 18px;"><strong>₹${payout}</strong> has been instantly routed to your registered UPI ID.</p>
                    </div>

                    <p style="color: #94a3b8; font-size: 14px;">Seek shelter immediately. Your shift has been financially secured.<br><br>— The GigInsura Network</p>
                </div>
            `
        });

        return { success: true };
    } catch (err) {
        console.error("Failed to send email:", err);

        return { success: false };
    }
};