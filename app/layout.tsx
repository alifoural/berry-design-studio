import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Providers } from "./providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://berrydesign.online"),
  title: {
    default: "BerryDesign — Web Design & Development Studio",
    template: "%s — BerryDesign",
  },
  description: "BerryDesign builds fast, SEO-first websites.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <Providers>
          <div className="relative min-h-screen">
            <Nav />
            <main className="pt-28">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}