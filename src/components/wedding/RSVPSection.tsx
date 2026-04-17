import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";

const initialForm = {
  name: "",
  guests: "1",
  attending: "yes",
  food: "no",
  message: "",
};

export default function RSVPSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    [titleRef, formRef].forEach((ref) => {
      const el = ref.current;
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
        { threshold: 0.15 }
      );
      observer.observe(el);
      return () => observer.disconnect();
    });
  }, []);

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast({ title: "Пожалуйста, укажите ваше имя", variant: "destructive" });
      return;
    }
    setSubmitted(true);
    toast({ title: "Спасибо! Ваш ответ получен 💛" });
  };

  return (
    <section id="rsvp" className="py-24 ivory-bg">
      <div className="max-w-2xl mx-auto px-6">
        <div ref={titleRef} className="section-animate text-center mb-14">
          <p className="text-gold-600 tracking-[0.3em] uppercase text-xs font-montserrat mb-4">
            Ваш ответ
          </p>
          <h2 className="font-cormorant text-5xl md:text-6xl text-warm-dark font-light">
            Подтвердите присутствие
          </h2>
          <div className="ornament-line mt-6 max-w-xs mx-auto">
            <span className="text-gold-500 text-xl">♡</span>
          </div>
          <p className="text-muted-foreground text-sm mt-6 leading-relaxed">
            Пожалуйста, подтвердите своё присутствие до <strong>1 мая 2025</strong>
          </p>
        </div>

        <div ref={formRef} className="section-animate">
          {submitted ? (
            <div className="text-center py-16 border border-gold-200 bg-white/60">
              <p className="text-gold-500 text-5xl mb-6">♡</p>
              <h3 className="font-cormorant text-3xl text-warm-dark mb-3">Спасибо!</h3>
              <p className="text-muted-foreground text-sm">
                Мы с нетерпением ждём встречи с вами в этот особенный день.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-6 bg-white/60 border border-gold-200 p-8">
              <div>
                <label className="block text-xs font-montserrat tracking-[0.15em] uppercase text-gold-700 mb-2">
                  Ваше имя *
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handle}
                  placeholder="Иван Иванов"
                  className="w-full border border-gold-200 bg-transparent px-4 py-3 text-sm text-warm-dark placeholder-muted-foreground/50 focus:outline-none focus:border-gold-500 transition-colors font-montserrat"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-montserrat tracking-[0.15em] uppercase text-gold-700 mb-2">
                    Вы придёте?
                  </label>
                  <select
                    name="attending"
                    value={form.attending}
                    onChange={handle}
                    className="w-full border border-gold-200 bg-white px-4 py-3 text-sm text-warm-dark focus:outline-none focus:border-gold-500 transition-colors font-montserrat"
                  >
                    <option value="yes">Да, буду!</option>
                    <option value="no">К сожалению, нет</option>
                    <option value="maybe">Пока не знаю</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-montserrat tracking-[0.15em] uppercase text-gold-700 mb-2">
                    Количество гостей
                  </label>
                  <select
                    name="guests"
                    value={form.guests}
                    onChange={handle}
                    className="w-full border border-gold-200 bg-white px-4 py-3 text-sm text-warm-dark focus:outline-none focus:border-gold-500 transition-colors font-montserrat"
                  >
                    {["1", "2", "3", "4"].map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-montserrat tracking-[0.15em] uppercase text-gold-700 mb-2">
                  Особые предпочтения в еде?
                </label>
                <select
                  name="food"
                  value={form.food}
                  onChange={handle}
                  className="w-full border border-gold-200 bg-white px-4 py-3 text-sm text-warm-dark focus:outline-none focus:border-gold-500 transition-colors font-montserrat"
                >
                  <option value="no">Нет предпочтений</option>
                  <option value="vegetarian">Вегетарианское меню</option>
                  <option value="vegan">Веганское меню</option>
                  <option value="halal">Халяль</option>
                  <option value="allergy">Есть аллергии</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-montserrat tracking-[0.15em] uppercase text-gold-700 mb-2">
                  Пожелания молодожёнам
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handle}
                  rows={4}
                  placeholder="Ваши добрые слова..."
                  className="w-full border border-gold-200 bg-transparent px-4 py-3 text-sm text-warm-dark placeholder-muted-foreground/50 focus:outline-none focus:border-gold-500 transition-colors font-montserrat resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gold-500 text-white font-montserrat text-xs tracking-[0.25em] uppercase hover:bg-gold-600 transition-colors duration-300"
              >
                Отправить ответ
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
