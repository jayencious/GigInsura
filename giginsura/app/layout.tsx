import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter(
  { subsets: ["latin"] }
);

export const metadata: Metadata = {
  title: "GigInsura: AI-Powered Enterprise Risk Protection",
  description: "AI-Driven Parametric Insurance for the Gig Economy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
    >
      <body
        className={inter.className}
      >
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#1e293b",
              color: "#f8fafc",
              border: "1px solid #334155",
            },
          }}
        />
      </body>
    </html>
  );
}
