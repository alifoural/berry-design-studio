import type { Metadata } from "next";
import { HomePage } from "@/components/site/HomePage";

export const metadata: Metadata = {
  title: "BerryDesign — Web Design & Development Studio",
  description: "We build fast, SEO-first websites for schools and brands in Qatar.",
};

export default function Page() {
  return <HomePage />;
}