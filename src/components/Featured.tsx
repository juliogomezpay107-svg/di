import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const featuredDishes = [
  {
    number: "01",
    name: "Steak Tartar en tuétano",
    description:
      "Carpaccio de vacuno madurado, yema curada, mostaza antigua y tuétano asado.",
    category: "Entrantes",
    image:
      "https://res.cloudinary.com/dmuxgamms/image/upload/v1779288305/Screenshot_18_v4uea5.png",
  },
  {
    number: "02",
    name: "Arroz de carabinero y azafrán",
    description:
      "Arroz meloso con carabinero salvaje, azafrán de La Mancha y all i oli.",
    category: "Arroces",
    image:
      "https://res.cloudinary.com/dmuxgamms/image/upload/v1779288783/Screenshot_21_qz9mjz.png",
  },
  {
    number: "03",
    name: "Croquetas de puchero",
    description:
      "Bechamel cremosa de gallina de corral, jamón ibérico y caldo de puchero.",
    category: "Entrantes",
    image:
      "https://res.cloudinary.com/dmuxgamms/image/upload/v1779288848/Screenshot_20_virgor.png",
  },
  {
    number: "04",
    name: "Solomillo Wellington",
    description:
      "Solomillo de vacuno envuelto en hojaldre, duxelle de setas y foie.",
    category: "Principales",
    image:
      "https://res.cloudinary.com/dmuxgamms/image/upload/v1779288781/Screenshot_23_lnlp6t.png",
  },
  {
    number: "05",
    name: "Sándwich de cecina",
    description:
      "Cecina de León, queso ahumado, rúcula y reducción de Pedro Ximénez.",
    category: "Entrantes",
    image:
      "https://res.cloudinary.com/dmuxgamms/image/upload/v1779288782/Screenshot_22_yr9v7t.png",
  },
];

export default function Featured() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [tappedIndex, setTappedIndex] = useState<number | null>(null);

  return (
    <section className="relative py-24 md:py-32 bg-bg-card overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-gold/[0.03] rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gold/[0.03] rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-white/[0.02] rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-gold text-xs uppercase tracking-[0.2em]">
            Los Imprescindibles
          </span>
          <h2 className="font-serif text-4xl md:text-5xl mt-2">
            Platos Estrella
          </h2>
        </div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {featuredDishes.map((dish, index) => (
            <motion.div
              key={dish.number}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: "easeOut" as const },
                },
              }}
              onClick={() =>
                setTappedIndex(tappedIndex === index ? null : index)
              }
              className="group relative overflow-hidden border border-border/40 transition-all duration-500 cursor-default hover:border-gold hover:shadow-lg hover:shadow-gold/5"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
              </div>
              <div className="p-6 relative">
                <span className="font-serif text-6xl text-gold/[0.06] absolute -top-8 right-4 select-none leading-none">
                  {dish.number}
                </span>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-px bg-gold/40" />
                  <span className="text-[10px] uppercase tracking-[0.2em] text-gold/60">
                    {dish.category}
                  </span>
                </div>
                <h3 className="font-serif text-xl text-text-primary transition-colors duration-300 group-hover:text-gold">
                  {dish.name}
                </h3>
                <p className="text-text-secondary text-sm mt-3 leading-relaxed">
                  {dish.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
