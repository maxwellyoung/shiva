import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Hero />
      <div className="flex-grow relative z-10 bg-white">
        <Gallery />
      </div>
      <Footer />
    </main>
  );
}
