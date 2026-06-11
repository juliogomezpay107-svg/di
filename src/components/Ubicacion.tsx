import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Clock, Phone, Mail, ExternalLink } from "lucide-react";
import { CONSTANTS } from "../data/constants";

export default function Ubicacion() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 bg-bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
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
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin size={18} className="text-gold mt-1 shrink-0" />
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-text-muted mb-1">
                    Direcci&oacute;n
                  </p>
                  <p className="text-text-primary">{CONSTANTS.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock size={18} className="text-gold mt-1 shrink-0" />
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-text-muted mb-1">
                    Horarios
                  </p>
                  <p className="text-text-primary">
                    Lunes a domingo
                  </p>
                  <p className="text-text-secondary">
                    13:00 &mdash; 16:00 | 20:00 &mdash; 23:30
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone size={18} className="text-gold mt-1 shrink-0" />
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-text-muted mb-1">
                    Tel&eacute;fono
                  </p>
                  <a
                    href={`tel:${CONSTANTS.phone}`}
                    className="text-text-primary hover:text-gold transition-colors duration-300"
                  >
                    {CONSTANTS.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail size={18} className="text-gold mt-1 shrink-0" />
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-text-muted mb-1">
                    Email
                  </p>
                  <a
                    href={`mailto:${CONSTANTS.email}`}
                    className="text-text-primary hover:text-gold transition-colors duration-300"
                  >
                    {CONSTANTS.email}
                  </a>
                </div>
              </div>
            </div>

            <a
              href={CONSTANTS.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 border border-gold text-gold px-6 py-3 text-sm uppercase tracking-[0.15em] hover:bg-gold hover:text-[#1C1C1C] transition-all duration-300"
            >
              <ExternalLink size={16} />
              Abrir en Google Maps
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="h-[300px] md:h-[400px]"
          >
            <iframe
              src={CONSTANTS.googleMapsEmbed}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de Dichoso en Mairena del Aljarafe"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
