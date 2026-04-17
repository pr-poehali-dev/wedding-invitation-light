import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const photos = [
  {
    src: "https://cdn.poehali.dev/projects/9882caf3-7f21-4bb0-b127-acd5e535793c/files/f6fbfb3f-62da-4a3f-9c9c-6e8fd8a339ad.jpg",
    alt: "Пара на закате",
    span: "col-span-2 row-span-2",
  },
  {
    src: "https://cdn.poehali.dev/projects/9882caf3-7f21-4bb0-b127-acd5e535793c/files/1204e2af-b566-4b7b-affd-de2fa76b809f.jpg",
    alt: "Прогулка в саду",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://cdn.poehali.dev/projects/9882caf3-7f21-4bb0-b127-acd5e535793c/files/dec51c8f-823a-430d-ad18-ce6a74b9eaa1.jpg",
    alt: "Детали свадьбы",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://cdn.poehali.dev/projects/9882caf3-7f21-4bb0-b127-acd5e535793c/files/65c4a7e1-cb6a-4a8c-9305-6fd4641f1352.jpg",
    alt: "Первый танец",
    span: "col-span-2 row-span-1",
  },
];

export default function GallerySection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);

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

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <section id="gallery" className="py-24 cream-bg">
      <div className="max-w-5xl mx-auto px-6">
        <div ref={titleRef} className="section-animate text-center mb-16">
          <p className="text-gold-600 tracking-[0.3em] uppercase text-xs font-montserrat mb-4">
            Наши моменты
          </p>
          <h2 className="font-cormorant text-5xl md:text-6xl text-warm-dark font-light">
            Галерея
          </h2>
          <div className="ornament-line mt-6 max-w-xs mx-auto">
            <span className="text-gold-500 text-xl">◈</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-3 gap-3 h-[480px] md:h-[520px]">
          {photos.map((photo, i) => (
            <div
              key={i}
              className={`${photo.span} overflow-hidden cursor-pointer group relative`}
              onClick={() => setLightbox(photo.src)}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <Icon
                  name="ZoomIn"
                  size={28}
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
            onClick={() => setLightbox(null)}
          >
            <Icon name="X" size={32} />
          </button>
          <img
            src={lightbox}
            alt="Фото"
            className="max-w-full max-h-full object-contain rounded shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
