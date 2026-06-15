import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Expertise from "@/components/Expertise";
import Quote from "@/components/Quote";
import Work from "@/components/Work";
import Articles from "@/components/Articles";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Expertise />
      <Quote />
      <Work />
      <Articles />
      <Experience />
      <Contact />
      <Footer />
    </main>
  );
}
