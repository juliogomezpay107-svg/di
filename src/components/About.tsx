import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  UtensilsCrossed,
  ChefHat,
  Grape,
  Salad,
  Star,
} from "lucide-react";

const highlights = [
  { icon: UtensilsCrossed, label: "Cocina contemporánea" },
  { icon: ChefHat, label: "Producto de calidad" },
  { icon: Grape, label: "Arroces" },
  { icon: Salad, label: "Tapas creativas" },
  { icon: Star, label: "Atención excelente" },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="nosotros" className="bg-[#252525] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" as const }}
          >
            <span className="text-gold text-xs uppercase tracking-[0.2em]">
              Nuestra Filosofía
            </span>
            <h2 className="font-serif text-4xl md:text-5xl mt-2 mb-8">
              Elevando lo cotidiano
            </h2>

            <div className="space-y-5 text-text-secondary leading-relaxed">
              <p>
                En Dichoso entendemos la gastronomía como un acto de generosidad.
                Cada plato que sale de nuestra cocina nace del respeto por el producto
                y del deseo de ofrecer algo más que una simple comida.
              </p>
              <p>
                Trabajamos con proveedores locales que comparten nuestra obsesión por
                la calidad: verduras de temporada, pescado salvaje, carnes maduradas y
                un arroz que cuenta la historia de quien lo cultiva.
              </p>
              <p>
                Nuestra carta cambia con las estaciones, porque creemos que lo mejor
                de cada producto solo se encuentra en su momento exacto. No seguimos
                modas; seguimos el producto.
              </p>
            </div>

            <div className="mt-10 pl-6 border-l-2 border-gold">
              <p className="font-serif text-xl italic text-text-primary leading-relaxed">
                &ldquo;No solo damos de comer; creamos momentos para recordar en
                torno a una mesa.&rdquo;
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative"
          >
            <div className="relative overflow-hidden">
              <img
                src="https://res.cloudinary.com/dmuxgamms/image/upload/v1779289197/Screenshot_24_qkmz4s.png"
                alt="Interior del restaurante Dichoso en Mairena del Aljarafe"
                className="w-full h-[500px] md:h-[600px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 text-xs uppercase tracking-[0.15em] text-white/70">
                Dichoso · Mairena del Aljarafe
              </span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-20"
        >
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="text-center p-6 border border-border/50 hover:border-gold/30 transition-colors duration-300"
              >
                <Icon size={24} className="text-gold mx-auto mb-3" />
                <span className="text-xs uppercase tracking-[0.15em] text-text-secondary">
                  {item.label}
                </span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
