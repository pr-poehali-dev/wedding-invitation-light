import { useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const contacts = [
  {
    icon: "Phone",
    label: "Анна (невеста)",
    value: "+7 (900) 123-45-67",
    href: "tel:+79001234567",
  },
  {
    icon: "Phone",
    label: "Михаил (жених)",
    value: "+7 (900) 765-43-21",
    href: "tel:+79007654321",
  },
  {
    icon: "Mail",
    label: "Электронная почта",
    value: "anna.mikhail@wedding.ru",
    href: "mailto:anna.mikhail@wedding.ru",
  },
];

export default function ContactsSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    [titleRef, cardsRef].forEach((ref) => {
      const el = ref.current;
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
        { threshold: 0.2 }
      );
      observer.observe(el);
      return () => observer.disconnect();
    });
  }, []);

  return (
    <section id="contacts" className="py-24 cream-bg">
      <div className="max-w-3xl mx-auto px-6">
        <div ref={titleRef} className="section-animate text-center mb-14">
          <p className="text-gold-600 tracking-[0.3em] uppercase text-xs font-montserrat mb-4">
            Есть вопросы?
          </p>
          <h2 className="font-cormorant text-5xl md:text-6xl text-warm-dark font-light">
            Свяжитесь с нами
          </h2>
          <div className="ornament-line mt-6 max-w-xs mx-auto">
            <span className="text-gold-500 text-xl">✦</span>
          </div>
          <p className="text-muted-foreground text-sm mt-6 leading-relaxed">
            Мы будем рады ответить на все ваши вопросы
          </p>
        </div>

        <div ref={cardsRef} className="section-animate grid grid-cols-1 md:grid-cols-3 gap-6">
          {contacts.map((c, i) => (
            <a
              key={i}
              href={c.href}
              className="text-center p-8 border border-gold-200 bg-white/60 hover:border-gold-400 hover:bg-white/90 transition-all duration-300 group"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 border border-gold-300 rounded-full mb-4 group-hover:bg-gold-50 transition-colors">
                <Icon name={c.icon as "Phone"} size={18} className="text-gold-600" />
              </div>
              <p className="text-xs font-montserrat tracking-[0.15em] uppercase text-gold-600 mb-2">
                {c.label}
              </p>
              <p className="font-cormorant text-lg text-warm-dark">{c.value}</p>
            </a>
          ))}
        </div>

        <div className="text-center mt-20 pt-12 border-t border-gold-200">
          <p className="font-cormorant text-3xl text-warm-dark italic">
            «С нетерпением ждём встречи с вами»
          </p>
          <p className="text-gold-600 font-cormorant text-xl mt-3">Анна & Михаил</p>
          <div className="flex justify-center gap-6 mt-8">
            <a href="#" className="text-gold-500 hover:text-gold-700 transition-colors">
              <Icon name="Instagram" size={20} />
            </a>
            <a href="#" className="text-gold-500 hover:text-gold-700 transition-colors">
              <Icon name="Send" size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
