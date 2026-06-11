import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import MenuSection from "./components/MenuSection";
import Featured from "./components/Featured";
import Gallery from "./components/Gallery";
import ReviewsCarousel from "./components/ReviewsCarousel";
import Reservas from "./components/Reservas";
import Ubicacion from "./components/Ubicacion";
import Footer from "./components/Footer";
import FloatingButtons from "./components/FloatingButtons";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Featured />
        <MenuSection />
        <Gallery />
        <ReviewsCarousel />
        <Reservas />
        <Ubicacion />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
