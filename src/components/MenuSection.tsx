import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { menuData } from "../data/menu";

export default function MenuSection() {
  const [activeTab, setActiveTab] = useState(menuData[0].id);

  const activeCategory = menuData.find((c) => c.id === activeTab)!;

  return (
    <section id="carta" className="py-24 md:py-32 bg-bg">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-gold text-xs uppercase tracking-[0.2em]">
            Nuestra Propuesta
          </span>
          <h2 className="font-serif text-4xl md:text-5xl mt-2">La Carta</h2>
        </div>

        <div className="flex justify-center mb-12 border-b border-border">
          <div className="flex relative gap-1">
            {menuData.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`relative px-5 py-3 text-sm uppercase tracking-[0.15em] transition-colors duration-300 ${
                  activeTab === category.id
                    ? "text-gold"
                    : "text-text-muted hover:text-text-secondary"
                }`}
              >
                {category.label}
                {activeTab === category.id && (
                  <motion.div
                    layoutId="menu-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="space-y-8"
          >
            {activeCategory.items.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="group border-b border-border/40 pb-6"
              >
                <div className="flex justify-between items-baseline gap-4">
                  <h3 className="font-serif text-xl md:text-2xl text-text-primary group-hover:text-gold transition-colors duration-300">
                    {item.name}
                  </h3>
                  <span className="font-serif text-gold text-lg whitespace-nowrap">
                    {item.price}
                  </span>
                </div>
                <p className="text-text-secondary text-sm mt-2 leading-relaxed max-w-2xl">
                  {item.description}
                </p>
                {item.tags && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] uppercase tracking-[0.15em] text-gold/70 border border-gold/20 px-2.5 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
