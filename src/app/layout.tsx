import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "sonner";

const nunito = Nunito({ subsets: ["latin"], weight: ["400", "600", "700", "800"] });

export const metadata: Metadata = {
  title: "Tasks Notebook",
  description: "A warm little place for your tasks",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body className={nunito.className}>
        <Navbar />
        <main>{children}</main>
        <Toaster
          toastOptions={{
            style: {
              background: "#fff8f0",
              border: "1px solid #ebe0cc",
              color: "#3c3632",
              borderRadius: "14px",
            },
          }}
        />
      </body>
    </html>
  );
}
