import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { AccountsProvider } from "@/store/context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Banking App",
  description: "Banking App for SCALIS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AccountsProvider>{children}</AccountsProvider>
      </body>
    </html>
  );
}
