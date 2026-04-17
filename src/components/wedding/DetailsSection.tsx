import { useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const details = [
  {
    icon: "Calendar",
    label: "Дата",
    value: "21 августа 2026",
    sub: "Пятница",
  },
  {
    icon: "Clock",
    label: "Время",
    value: "16:00",
    sub: "Сбор гостей с 15:30",
  },
  {
    icon: "MapPin",
    label: "Место",
    value: "Ресторан «Империал»",
    sub: "ул. Дворцовая, 12, Москва",
  },
  {
    icon: "Wine",
    label: "Банкет",
    value: "18:00 — 00:00",
    sub: "Торжественный ужин и танцы",
  },
];

function DetailCard({ item, index }: { item: typeof details[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="section-animate text-center p-8 border border-gold-200 bg-white/70 backdrop-blur-sm hover:border-gold-400 transition-colors duration-300"
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className="inline-flex items-center justify-center w-14 h-14 border border-gold-300 rounded-full mb-5">
        <Icon name={item.icon as "Calendar"} size={22} className="text-gold-600" />
      </div>
      <p className="text-gold-600 tracking-[0.2em] uppercase text-xs font-montserrat mb-2">
        {item.label}
      </p>
      <p className="font-cormorant text-2xl text-warm-dark">{item.value}</p>
      <p className="text-muted-foreground text-xs mt-1 font-montserrat">{item.sub}</p>
    </div>
  );
}

export default function DetailsSection() {
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
    <section id="details" className="py-24 ivory-bg">
      <div className="max-w-5xl mx-auto px-6">
        <div ref={titleRef} className="section-animate text-center mb-16">
          <p className="text-gold-600 tracking-[0.3em] uppercase text-xs font-montserrat mb-4">
            Детали торжества
          </p>
          <h2 className="font-cormorant text-5xl md:text-6xl text-warm-dark font-light">
            Когда и где
          </h2>
          <div className="ornament-line mt-6 max-w-xs mx-auto">
            <span className="text-gold-500 text-xl">✦</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {details.map((item, i) => (
            <DetailCard key={i} item={item} index={i} />
          ))}
        </div>

        <div className="text-center">
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-gold-400 text-gold-700 font-montserrat text-xs tracking-[0.2em] uppercase px-8 py-3 hover:bg-gold-500 hover:text-white transition-all duration-300"
          >
            <Icon name="Map" size={14} />
            Открыть на карте
          </a>
        </div>
      </div>
    </section>
  );
}