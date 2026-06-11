import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Clock, Phone, Mail, ExternalLink } from "lucide-react";
import { CONSTANTS } from "../data/constants";

export default function Ubicacion() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 md:py-32 bg-bg-card overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" as const }}
          className="text-center mb-16"
        >
          <span className="text-gold text-xs uppercase tracking-[0.2em]">
            Ubicaci&oacute;n
          </span>
          <h2 className="font-serif text-4xl md:text-5xl mt-2">
            D&oacute;nde estamos
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" as const, delay: 0.2 }}
          >
            <div className="space-y-6">
              {[
                { icon: MapPin, label: "Direcci&oacute;n", value: CONSTANTS.address },
                {
                  icon: Clock,
                  label: "Horarios",
                  value: (
                    <>
                      <p className="text-text-primary">Lunes a domingo</p>
                      <p className="text-text-secondary">13:00 &mdash; 16:00 | 20:00 &mdash; 23:30</p>
                    </>
                  ),
                },
                {
                  icon: Phone,
                  label: "Tel&eacute;fono",
                  value: (
                    <a href={`tel:${CONSTANTS.phone}`} className="text-text-primary hover:text-gold transition-colors duration-300">
                      {CONSTANTS.phoneDisplay}
                    </a>
                  ),
                },
                {
                  icon: Mail,
                  label: "Email",
                  value: (
                    <a href={`mailto:${CONSTANTS.email}`} className="text-text-primary hover:text-gold transition-colors duration-300">
                      {CONSTANTS.email}
                    </a>
                  ),
                },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 flex items-center justify-center border border-border/50 group-hover:border-gold/30 transition-colors duration-300 shrink-0">
                      <Icon size={18} className="text-gold" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.15em] text-text-muted mb-1">
                        {item.label}
                      </p>
                      <div>{item.value}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.a
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.5 }}
              href={CONSTANTS.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 border border-gold text-gold px-6 py-3 text-sm uppercase tracking-[0.15em] hover:bg-gold hover:text-[#1C1C1C] transition-all duration-300 group"
            >
              <ExternalLink size={16} />
              Abrir en Google Maps
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" as const, delay: 0.3 }}
            className="h-[300px] md:h-[400px] border border-border/50 overflow-hidden"
          >
            <iframe
              src={CONSTANTS.googleMapsEmbed}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicaci&oacute;n de Dichoso en Mairena del Aljarafe"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
