import Hero from "@/components/Hero";
import Topbar from "@/components/Topbar";
import Header from "@/components/Header";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Work from "@/components/Work";
import Faq from "@/components/Faq";
import Testimoniais from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div>
      <Topbar />
      <Header />
      <Hero />
      <About />
      <Stats />
      <Services />
      <Work />
      <Faq />
    
      <Pricing />
      <Contact />
      <Footer />
    </div>
  );
}
