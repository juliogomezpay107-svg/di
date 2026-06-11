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
            className="font-serif text-2xl md:text-3xl text-gold tracking-wide"
          >
            Dichoso
          </a>

          <div className="hidden lg:flex items-center gap-10">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm uppercase tracking-[0.15em] text-text-secondary hover:text-gold transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#reservas"
              className="bg-gold text-[#1C1C1C] px-6 py-3 text-sm uppercase tracking-[0.15em] font-semibold hover:bg-gold-light transition-colors duration-300"
            >
              Reservar Mesa
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-text-primary p-2"
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
                  className="text-sm uppercase tracking-[0.15em] text-text-secondary hover:text-gold transition-colors duration-300"
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
