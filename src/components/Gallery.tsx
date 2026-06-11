import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const images = [
  {
    src: "https://res.cloudinary.com/dmuxgamms/image/upload/v1779288305/Screenshot_18_v4uea5.png",
    alt: "Steak tartar en tuétano del restaurante Dichoso",
    span: "lg:col-span-2 lg:row-span-2",
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
    span: "lg:col-span-2",
  },
];

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="py-24 md:py-32 bg-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-gold text-xs uppercase tracking-[0.2em]">
            Experiencia Visual
          </span>
          <h2 className="font-serif text-4xl md:text-5xl mt-2">Galería</h2>
        </div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[250px]"
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
              onClick={() =>
                setActiveIndex(activeIndex === index ? null : index)
              }
              className={`relative overflow-hidden group cursor-pointer ${img.span}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className={`w-full h-full object-cover transition-transform duration-700 ${
                  activeIndex === index
                    ? "scale-110"
                    : "group-hover:scale-110"
                }`}
                loading="lazy"
              />
              <div
                className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
                  activeIndex === index
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                }`}
              />
              <div
                className={`absolute bottom-0 left-0 right-0 p-6 transition-all duration-300 ${
                  activeIndex === index
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                }`}
              >
                <span className="text-white/80 text-xs uppercase tracking-[0.15em]">
                  Dichoso · Mairena del Aljarafe
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <p className="text-center text-text-muted text-xs uppercase tracking-[0.15em] mt-8 lg:hidden">
          Toca una imagen para ver el detalle
        </p>
      </div>
    </section>
  );
}
