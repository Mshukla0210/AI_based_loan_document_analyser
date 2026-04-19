import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { SiteShell } from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "Lenscore | Smart Loan Document Analyzer",
  description: "A premium AI workspace for analyzing loan files, surfacing risk, and explaining decisions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body>
        <SiteShell>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SiteShell>
      </body>
    </html>
  );
}
