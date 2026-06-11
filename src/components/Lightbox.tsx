import { useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  images: { src: string; alt: string }[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({ images, index, onClose, onPrev, onNext }: LightboxProps) {
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) onNext();
      else onPrev();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center touch-pan-y"
        onClick={onClose}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="absolute top-3 right-3 md:top-6 md:right-6 z-20 text-white/70 hover:text-white transition-colors p-2 bg-black/30 rounded-full"
          aria-label="Cerrar"
        >
          <X size={24} />
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-2 z-20 bg-black/30 md:bg-transparent rounded-full md:rounded-none"
          aria-label="Anterior"
        >
          <ChevronLeft size={32} />
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-2 z-20 bg-black/30 md:bg-transparent rounded-full md:rounded-none"
          aria-label="Siguiente"
        >
          <ChevronRight size={32} />
        </button>

        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="max-w-[95vw] max-h-[80vh] md:max-w-[90vw] md:max-h-[85vh] flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={images[index].src}
            alt={images[index].alt}
            className="max-w-full max-h-full object-contain select-none"
            draggable={false}
          />
        </motion.div>

        <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); }}
              className={`transition-all duration-300 rounded-full ${
                i === index ? "bg-gold w-6 h-1.5 md:w-8 md:h-1.5" : "bg-white/40 w-1.5 h-1.5 md:w-2 md:h-2 hover:bg-white/60"
              }`}
              aria-label={`Ir a imagen ${i + 1}`}
            />
          ))}
        </div>

        <div className="absolute bottom-10 md:bottom-8 left-1/2 -translate-x-1/2 z-20 md:hidden">
          <span className="text-white/40 text-[10px] uppercase tracking-[0.15em]">
            Desliza para navegar
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
