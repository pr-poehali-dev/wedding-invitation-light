import { useEffect, useState } from "react";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/9882caf3-7f21-4bb0-b127-acd5e535793c/files/f6fbfb3f-62da-4a3f-9c9c-6e8fd8a339ad.jpg";

const Petal = ({ style }: { style: React.CSSProperties }) => (
  <div
    className="absolute pointer-events-none select-none text-2xl opacity-60"
    style={style}
  >
    🌸
  </div>
);

export default function HeroSection() {
  const [petals, setPetals] = useState<{ id: number; style: React.CSSProperties }[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      style: {
        left: `${Math.random() * 100}%`,
        top: `-5%`,
        animationDelay: `${Math.random() * 6}s`,
        animationDuration: `${6 + Math.random() * 4}s`,
        animation: `petal-fall ${6 + Math.random() * 4}s linear ${Math.random() * 6}s infinite`,
        fontSize: `${1 + Math.random() * 0.8}rem`,
        opacity: 0.4 + Math.random() * 0.3,
      },
    }));
    setPetals(generated);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />

      {petals.map((p) => (
        <Petal key={p.id} style={p.style} />
      ))}

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <p
          className="text-gold-200 tracking-[0.35em] uppercase text-sm mb-6 font-montserrat animate-fade-in"
          style={{ animationDelay: "0.2s", opacity: 0 }}
        >
          Мы приглашаем вас на нашу свадьбу
        </p>

        <h1
          className="font-cormorant text-white text-7xl md:text-9xl font-light leading-none mb-4 animate-fade-up"
          style={{ animationDelay: "0.4s", opacity: 0 }}
        >
          Максим
          <span className="block text-gold-300 italic text-5xl md:text-6xl my-3">&amp;</span>
          Ксения
        </h1>

        <div
          className="ornament-line my-8 animate-fade-in"
          style={{ animationDelay: "0.8s", opacity: 0 }}
        >
          <span className="text-gold-300 tracking-[0.25em] text-sm font-montserrat uppercase">
            21 Августа 2026
          </span>
        </div>

        <p
          className="text-white/80 font-cormorant text-xl italic animate-fade-in"
          style={{ animationDelay: "1s", opacity: 0 }}
        >
          «Любовь никогда не перестаёт»
        </p>

        <a
          href="#rsvp"
          className="inline-block mt-10 px-10 py-3 border border-gold-400 text-gold-200 font-montserrat text-xs tracking-[0.25em] uppercase hover:bg-gold-500 hover:text-white transition-all duration-300 animate-fade-in"
          style={{ animationDelay: "1.2s", opacity: 0 }}
        >
          Подтвердить присутствие
        </a>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-px h-12 bg-gradient-to-b from-gold-400 to-transparent mx-auto" />
      </div>
    </section>
  );
}