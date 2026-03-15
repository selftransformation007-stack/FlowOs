import type { Metadata } from "next";
import { Toaster } from 'sonner';
import "@/src/app/globals.css";

export const metadata: Metadata = {
  title: "FlowOS",
  description: "A luxury-minimal dark productivity workspace for habits, tasks, and focus.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-surface-0 text-text-2 font-body antialiased">
        <Toaster 
          theme="dark" 
          position="top-right"
          toastOptions={{
            style: {
              background: 'oklch(17% 0.032 260)',
              border: '1px solid rgba(255,255,255,0.07)',
              color: 'oklch(95% 0.012 260)',
              fontFamily: 'DM Sans, sans-serif',
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
