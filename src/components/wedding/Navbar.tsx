import { useEffect, useState } from "react";

const links = [
  { href: "#home", label: "Главная" },
  { href: "#rsvp", label: "Подтверждение" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm border-b border-gold-100" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#home" className={`font-cormorant text-xl italic transition-colors duration-300 ${scrolled ? "text-warm-dark" : "text-white"}`}>
          M & K
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`font-montserrat text-xs tracking-[0.15em] uppercase transition-colors duration-300 hover:text-gold-600 ${
                  scrolled ? "text-warm-dark/70" : "text-white/80"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className={`md:hidden transition-colors duration-300 ${scrolled ? "text-warm-dark" : "text-white"}`}
          onClick={() => setOpen(!open)}
          aria-label="Меню"
        >
          <div className="space-y-1.5">
            <span className={`block h-px w-6 bg-current transition-transform duration-300 ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-px w-6 bg-current transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`block h-px w-6 bg-current transition-transform duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white/97 border-b border-gold-100 py-4">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block px-6 py-3 font-montserrat text-xs tracking-[0.15em] uppercase text-warm-dark/70 hover:text-gold-600 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}