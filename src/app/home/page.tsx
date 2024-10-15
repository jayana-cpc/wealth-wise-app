import { Metadata } from "next";
import Hero from "@/components/Hero";
import Brands from "@/components/Brands";
import Feature from "@/components/Features";
import About from "@/components/About";
import FunFact from "@/components/FunFact";
import Integration from "@/components/Integration";

import Contact from "@/components/Contact";


export const metadata: Metadata = {
  title: "Wealth Wise",
  description: "Build Financial Literacy NOW",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Brands />
      <Feature />
      <About />
      {/* <FeaturesTab /> */}
      <FunFact />
      <Integration />
      {/* <CTA />
      <FAQ /> */}
      {/* <Testimonial /> */}
      {/* <Pricing /> */}
      <div className="h-8"></div>

      <Contact />
      <div className="h-5"></div>
      {/* <Blog /> */}
    </main>
  );
}
