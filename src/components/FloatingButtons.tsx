import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, ArrowUp, MessageCircle } from "lucide-react";
import { CONSTANTS } from "../data/constants";

export default function FloatingButtons() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const buttons = [
    {
      icon: Phone,
      href: `tel:${CONSTANTS.phone}`,
      label: "Llamar",
      bg: "bg-gold",
      hoverBg: "hover:bg-gold-light",
    },
    {
      icon: MessageCircle,
      href: CONSTANTS.whatsappUrl,
      label: "WhatsApp",
      bg: "bg-[#25D366]",
      hoverBg: "hover:bg-[#20BD5E]",
    },
    {
      icon: ArrowUp,
      onClick: scrollToTop,
      label: "Subir",
      bg: "bg-white/10 backdrop-blur-sm border border-border/50",
      hoverBg: "hover:bg-white/20",
    },
  ];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-8 right-6 z-40 flex flex-col gap-3"
        >
          {buttons.map((btn) => {
            const Icon = btn.icon;
            if (btn.onClick) {
              return (
                <motion.button
                  key={btn.label}
                  onClick={btn.onClick}
                  whileTap={{ scale: 0.9 }}
                  className={`w-12 h-12 flex items-center justify-center text-white ${btn.bg} ${btn.hoverBg} transition-colors duration-300 shadow-lg shadow-black/30`}
                  aria-label={btn.label}
                >
                  <Icon size={20} />
                </motion.button>
              );
            }
            return (
              <motion.a
                key={btn.label}
                href={btn.href}
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.9 }}
                className={`w-12 h-12 flex items-center justify-center text-white ${btn.bg} ${btn.hoverBg} transition-colors duration-300 shadow-lg shadow-black/30`}
                aria-label={btn.label}
              >
                <Icon size={20} />
              </motion.a>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
