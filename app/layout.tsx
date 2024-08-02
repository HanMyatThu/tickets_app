import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Navigation } from "@/components/navigation";

import "./globals.css";
import { ThemeProvider } from "@/providers/theme-providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ticket Application",
  description: "Draz the Coder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <nav className="flex flex-col items-center border-b mb-5 px-5 py-3">
            <div className="max-w-6xl w-full">
              <Navigation />
            </div>
          </nav>
          <main className="flex flex-col items-center">
            <div className="max-w-6xl w-full">
              {children}
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
