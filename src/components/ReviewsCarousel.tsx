import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { reviews } from "../data/reviews";

export default function ReviewsCarousel() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);

    const autoPlay = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);

    return () => {
      clearInterval(autoPlay);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="relative py-24 md:py-32 bg-bg-card overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" as const }}
          className="text-center mb-12"
        >
          <span className="text-gold text-xs uppercase tracking-[0.2em]">
            5,0 &#9733;&#9733;&#9733;&#9733;&#9733; &middot; 321 rese&ntilde;as en Google
          </span>
          <h2 className="font-serif text-4xl md:text-5xl mt-2">
            Lo que dicen de nosotros
          </h2>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {reviews.map((review, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0 px-4 md:px-16">
                  <div className="text-center max-w-2xl mx-auto">
                    <div className="flex justify-center gap-1 mb-6">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className="text-gold fill-gold"
                        />
                      ))}
                    </div>
                    <p className="font-serif text-xl md:text-2xl italic leading-relaxed text-text-primary">
                      &ldquo;{review.text}&rdquo;
                    </p>
                    <p className="mt-6 text-text-secondary text-sm uppercase tracking-[0.15em]">
                      {review.author}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-bg-card/80 border border-border/40 p-2.5 text-text-secondary hover:text-gold hover:border-gold/40 transition-all duration-300 hidden md:block"
            aria-label="Anterior reseña"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-bg-card/80 border border-border/40 p-2.5 text-text-secondary hover:text-gold hover:border-gold/40 transition-all duration-300 hidden md:block"
            aria-label="Siguiente reseña"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="flex justify-center gap-2.5 mt-10">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`transition-all duration-300 rounded-full ${
                index === selectedIndex
                  ? "bg-gold w-8 h-1.5"
                  : "bg-border w-1.5 h-1.5 hover:bg-text-muted"
              }`}
              aria-label={`Ir a reseña ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
