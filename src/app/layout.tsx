import type { Metadata } from "next";
import { Toaster } from 'sonner';
import { Syne, DM_Sans } from 'next/font/google';
import "@/src/app/globals.css";

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '700'],
});

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
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <body className="bg-surface-0 text-text-2 font-body antialiased">
        <Toaster 
          theme="dark" 
          position="top-right"
          toastOptions={{
            style: {
              background: 'var(--color-surface-3)',
              border: '1px solid rgba(255,255,255,0.07)',
              color: 'var(--color-text-1)',
              fontFamily: 'var(--font-body)',
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
