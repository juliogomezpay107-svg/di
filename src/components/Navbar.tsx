import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Carta", href: "#carta" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Reservas", href: "#reservas" },
  { label: "Contacto", href: "#contacto" },
];

const navVariants = {
  hidden: { y: -100 },
  visible: { y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const mobileVariants = {
  closed: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  open: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#1C1C1C]/80 backdrop-blur-lg shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a
            href="#"
            className="flex items-center gap-3 group"
          >
            <span className="w-8 h-8 border border-gold flex items-center justify-center font-serif text-gold text-sm transition-transform duration-300 group-hover:scale-110">
              D
            </span>
            <span className="font-serif text-xl md:text-2xl text-gold tracking-wide">
              Dichoso
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-10">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-sm uppercase tracking-[0.15em] text-text-secondary hover:text-gold transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </a>
            ))}
            <a
              href="#reservas"
              className="bg-gold text-[#1C1C1C] px-6 py-3 text-sm uppercase tracking-[0.15em] font-semibold hover:bg-gold-light transition-all duration-300 relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative z-10">Reservar Mesa</span>
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-text-primary p-2 hover:text-gold transition-colors"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            variants={mobileVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="lg:hidden bg-[#1C1C1C]/95 backdrop-blur-lg border-t border-border"
          >
            <div className="flex flex-col items-center gap-6 py-8 px-6">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="relative text-sm uppercase tracking-[0.15em] text-text-secondary hover:text-gold transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#reservas"
                onClick={() => setMobileOpen(false)}
                className="bg-gold text-[#1C1C1C] px-8 py-3 text-sm uppercase tracking-[0.15em] font-semibold"
              >
                Reservar Mesa
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
