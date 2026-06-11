import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Phone, MapPin } from "lucide-react";
import { CONSTANTS } from "../data/constants";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      <h1 className="sr-only">
        Dichoso Mairena del Aljarafe &mdash; Restaurante Gastron&oacute;mico en Sevilla y el Aljarafe
      </h1>

      <div className="absolute inset-0">
        <div
          className="w-full h-[120%] absolute top-0 left-0 will-change-transform"
          style={{ transform: `translateY(${scrollY * 0.35}px)` }}
        >
          <img
            src="https://res.cloudinary.com/dmuxgamms/image/upload/v1779287302/Screenshot_17_ofzab6.png"
            alt="Interior del restaurante Dichoso en Mairena del Aljarafe"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center max-w-4xl mx-auto px-6"
      >
        <motion.div
          variants={itemVariants}
          className="mb-4"
        >
          <span className="inline-block text-[10px] uppercase tracking-[0.3em] text-gold/70 border border-gold/20 px-4 py-1.5">
            Mairena del Aljarafe &middot; Sevilla
          </span>
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="font-serif text-5xl md:text-7xl lg:text-8xl leading-tight mb-6"
        >
          Sabores que{" "}
          <span className="text-gold italic">sorprenden</span>
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Cocina contempor&aacute;nea, producto cuidado y una experiencia gastron&oacute;mica diferente en Mairena del Aljarafe.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-3 md:gap-4"
        >
          <a
            href="#carta"
            className="relative border border-gold text-gold px-8 py-3 text-sm uppercase tracking-[0.15em] overflow-hidden group transition-all duration-300 hover:text-[#1C1C1C]"
          >
            <span className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10">Ver carta</span>
          </a>
          <a
            href="#reservas"
            className="bg-gold text-[#1C1C1C] px-8 py-3 text-sm uppercase tracking-[0.15em] font-semibold hover:bg-gold-light transition-all duration-300 relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10">Reservar Mesa</span>
          </a>
          <a
            href={`tel:${CONSTANTS.phone}`}
            className="flex items-center gap-2 text-text-secondary px-5 py-3 text-sm uppercase tracking-[0.15em] hover:text-gold transition-colors duration-300 border border-transparent hover:border-gold/30"
          >
            <Phone size={16} />
            Llamar
          </a>
          <a
            href={CONSTANTS.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-text-secondary px-5 py-3 text-sm uppercase tracking-[0.15em] hover:text-gold transition-colors duration-300 border border-transparent hover:border-gold/30"
          >
            <MapPin size={16} />
            C&oacute;mo llegar
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">Scroll</span>
          <ChevronDown size={20} className="text-gold" />
        </motion.div>
      </motion.div>
    </section>
  );
}
