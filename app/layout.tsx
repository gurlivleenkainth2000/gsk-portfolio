import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import Script from "next/script";

import { Providers } from "./providers";

import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { AmbientBackground } from "@/components/page-background";
import { rootMetadata, personSchema } from "@/metadata";

export const metadata: Metadata = { ...rootMetadata };

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
          type="application/ld+json"
        />
      </head>
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <AmbientBackground />

          <div className="relative flex flex-col">
            <Navbar />
            <main className="flex-grow flex-shrink-0 basis-auto overflow-x-hidden">
              {children}
            </main>
            {/* <Footer /> */}
          </div>
        </Providers>
        <Script src="https://platform.linkedin.com/badges/js/profile.js" />
      </body>
    </html>
  );
}
