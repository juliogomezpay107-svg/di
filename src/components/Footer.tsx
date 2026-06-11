import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import { CONSTANTS } from "../data/constants";

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function TwitterIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

const footerLinks = [
  { label: "Carta", href: "#carta" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Reservas", href: "#reservas" },
  { label: "Contacto", href: "#contacto" },
];

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer id="contacto" className="bg-[#1C1C1C] border-t border-border/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-20">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid md:grid-cols-3 gap-12"
        >
          <div>
            <span className="font-serif text-2xl text-gold tracking-wide">
              Dichoso
            </span>
            <p className="text-text-secondary text-sm mt-4 leading-relaxed max-w-sm">
              Cocina contemporánea en Mairena del Aljarafe. Producto cuidado,
              arroces y una experiencia gastronómica diferente.
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gold mb-6">
              Enlaces
            </p>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-text-secondary text-sm hover:text-gold transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gold mb-6">
              Contacto
            </p>
            <ul className="space-y-3">
              <li>
                <a
                  href={CONSTANTS.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-text-secondary text-sm hover:text-gold transition-colors duration-300"
                >
                  <MapPin size={14} className="shrink-0" />
                  {CONSTANTS.address}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONSTANTS.phone}`}
                  className="flex items-center gap-2 text-text-secondary text-sm hover:text-gold transition-colors duration-300"
                >
                  <Phone size={14} className="shrink-0" />
                  {CONSTANTS.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONSTANTS.email}`}
                  className="flex items-center gap-2 text-text-secondary text-sm hover:text-gold transition-colors duration-300"
                >
                  <Mail size={14} className="shrink-0" />
                  {CONSTANTS.email}
                </a>
              </li>
            </ul>

            <div className="flex gap-4 mt-6">
              <a
                href={CONSTANTS.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-gold transition-colors duration-300"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href={CONSTANTS.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-gold transition-colors duration-300"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>
              <a
                href={CONSTANTS.twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-gold transition-colors duration-300"
                aria-label="Twitter"
              >
                <TwitterIcon />
              </a>
            </div>
          </div>
        </motion.div>

        <div className="border-t border-border/30 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-muted text-xs">
            &copy; {new Date().getFullYear()} Dichoso. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-text-muted text-xs hover:text-gold transition-colors duration-300">
              Aviso Legal
            </a>
            <a href="#" className="text-text-muted text-xs hover:text-gold transition-colors duration-300">
              Privacidad
            </a>
            <a href="#" className="text-text-muted text-xs hover:text-gold transition-colors duration-300">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
