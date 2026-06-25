import type { Metadata } from "next";
import {
  ClerkProvider,
} from '@clerk/nextjs'
import "./globals.css";
import { EdgeStoreProvider } from "@/lib/edgestore";
import QueryProvider from "@/components/query-provider";
import ThemeProvider from "@/components/theme-provider";
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: "Noto",
  description: "A connected workspace where better, faster work happens.",
  icons: {
    icon: "/icon.png"
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`antialiased text-[#191918]`}
        >
          <EdgeStoreProvider>
            <QueryProvider>
              <ThemeProvider>
                {children}
              </ThemeProvider>
            </QueryProvider>
          </EdgeStoreProvider>
          <Toaster position="bottom-center" />
        </body>
      </html>
    </ClerkProvider>
  );
}
