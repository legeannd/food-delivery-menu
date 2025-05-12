import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Header } from "@/modules/shared/components/Header";
import { Footer } from "@/modules/shared/components/Footer";
import { QueryProvider } from "@/providers/QueryProvider";

const nunito = Nunito({
  weight: ["400", "600", "700", "800"],
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Food Delivery Menu",
  description: "Order your favorite food here!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} antialiased`}>
        <QueryProvider>
          <div className="flex flex-col min-h-screen justify-between touch-none">
            <Header />
            {children}
            <Footer />
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
