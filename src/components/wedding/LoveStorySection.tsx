import { useEffect, useRef } from "react";

const events = [
  {
    year: "2019",
    title: "Первая встреча",
    text: "Судьба свела нас на вечеринке общих друзей. Один взгляд — и всё стало ясно. Мы проговорили всю ночь, не замечая времени.",
  },
  {
    year: "2020",
    title: "Первое путешествие",
    text: "Флоренция стала нашим первым совместным приключением. Среди старинных улочек и закатов над Арно мы поняли — хотим быть вместе всегда.",
  },
  {
    year: "2022",
    title: "Совместный дом",
    text: "Мы переехали в нашу первую квартиру. Маленький уютный мир, наполненный смехом, уютными вечерами и запахом кофе по утрам.",
  },
  {
    year: "2024",
    title: "Предложение",
    text: "На берегу моря, под звёздным небом, Максим опустился на одно колено. Слёзы радости и одно слово: «Да!»",
  },
];

function StoryCard({ event, index }: { event: typeof events[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add("visible");
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`section-animate flex items-center gap-8 md:gap-16 ${isLeft ? "flex-row" : "flex-row-reverse"} mb-16 last:mb-0`}
    >
      <div className={`hidden md:block flex-1 ${isLeft ? "text-right" : "text-left"}`}>
        {isLeft && (
          <div className="inline-block">
            <p className="font-cormorant text-5xl text-gold-500 font-light">{event.year}</p>
            <h3 className="font-cormorant text-2xl text-warm-dark mt-1">{event.title}</h3>
            <p className="text-muted-foreground text-sm mt-3 leading-relaxed max-w-xs ml-auto">{event.text}</p>
          </div>
        )}
        {!isLeft && (
          <div className="inline-block">
            <p className="font-cormorant text-5xl text-gold-500 font-light">{event.year}</p>
            <h3 className="font-cormorant text-2xl text-warm-dark mt-1">{event.title}</h3>
            <p className="text-muted-foreground text-sm mt-3 leading-relaxed max-w-xs">{event.text}</p>
          </div>
        )}
      </div>

      <div className="relative flex-shrink-0">
        <div className="w-4 h-4 rounded-full bg-gold-500 border-4 border-gold-200 relative z-10" />
      </div>

      <div className="flex-1 md:hidden">
        <p className="font-cormorant text-4xl text-gold-500 font-light">{event.year}</p>
        <h3 className="font-cormorant text-xl text-warm-dark mt-1">{event.title}</h3>
        <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{event.text}</p>
      </div>
      <div className="hidden md:block flex-1" />
    </div>
  );
}

export default function LoveStorySection() {
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="story" className="py-24 cream-bg">
      <div className="max-w-3xl mx-auto px-6">
        <div ref={titleRef} className="section-animate text-center mb-20">
          <p className="text-gold-600 tracking-[0.3em] uppercase text-xs font-montserrat mb-4">
            Наша история
          </p>
          <h2 className="font-cormorant text-5xl md:text-6xl text-warm-dark font-light">
            История нашей любви
          </h2>
          <div className="ornament-line mt-6 max-w-xs mx-auto">
            <span className="text-gold-500 text-xl">♡</span>
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold-300 via-gold-400 to-gold-300 hidden md:block" />

          {events.map((event, i) => (
            <StoryCard key={i} event={event} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}