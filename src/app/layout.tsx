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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme:dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}})()`,
          }}
        />
      </head>
      <body className={nunito.className}>
        <Navbar />
        <main>{children}</main>
        <Toaster
          toastOptions={{
            className: "!bg-parchment-50 !border-parchment-300 !text-ink dark:!bg-night-card dark:!border-night-border dark:!text-night-text",
            style: {
              borderRadius: "14px",
            },
          }}
        />
      </body>
    </html>
  );
}
