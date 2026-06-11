import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Lightbox from "./Lightbox";

const images = [
  {
    src: "https://res.cloudinary.com/dmuxgamms/image/upload/v1779288305/Screenshot_18_v4uea5.png",
    alt: "Steak tartar en tuétano del restaurante Dichoso",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    src: "https://res.cloudinary.com/dmuxgamms/image/upload/v1779288371/Screenshot_19_rwy5fo.png",
    alt: "Ambiente del restaurante Dichoso en Mairena del Aljarafe",
    span: "",
  },
  {
    src: "https://res.cloudinary.com/dmuxgamms/image/upload/v1779288848/Screenshot_20_virgor.png",
    alt: "Croquetas de puchero del restaurante Dichoso",
    span: "",
  },
  {
    src: "https://res.cloudinary.com/dmuxgamms/image/upload/v1779288783/Screenshot_21_qz9mjz.png",
    alt: "Arroz de carabinero del restaurante Dichoso",
    span: "",
  },
  {
    src: "https://res.cloudinary.com/dmuxgamms/image/upload/v1779288781/Screenshot_23_lnlp6t.png",
    alt: "Presentación de plato en Dichoso",
    span: "",
  },
  {
    src: "https://res.cloudinary.com/dmuxgamms/image/upload/v1779288782/Screenshot_22_yr9v7t.png",
    alt: "Sándwich de cecina del restaurante Dichoso",
    span: "md:col-span-2",
  },
];

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);
  const prevImage = () => setLightboxIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const nextImage = () => setLightboxIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <section className="py-24 md:py-32 bg-bg relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-gold text-xs uppercase tracking-[0.2em]">
            Experiencia Visual
          </span>
          <h2 className="font-serif text-4xl md:text-5xl mt-2">Galer&iacute;a</h2>
        </div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 auto-rows-[180px] md:auto-rows-[250px]"
        >
          {images.map((img, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: "easeOut" },
                },
              }}
              onClick={() => openLightbox(index)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") openLightbox(index); }}
              role="button"
              tabIndex={0}
              aria-label={`Ampliar imagen: ${img.alt}`}
              className={`relative overflow-hidden cursor-pointer ${img.span}`}
            >
              <div className="w-full h-full overflow-hidden">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110 active:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-black/0 hover:bg-black/40 active:bg-black/40 transition-all duration-500" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 active:opacity-100 transition-all duration-500 translate-y-4 hover:translate-y-0 active:translate-y-0">
                <span className="text-white/90 text-[10px] md:text-xs uppercase tracking-[0.2em] border border-white/40 px-3 py-1.5 md:px-4 md:py-2">
                  Ampliar
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <p className="text-center text-text-muted text-xs uppercase tracking-[0.15em] mt-8 md:hidden">
          Toca una imagen para ampliarla
        </p>
      </div>

      {lightboxOpen && (
        <Lightbox
          images={images}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </section>
  );
}
