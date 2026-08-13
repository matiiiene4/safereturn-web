"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function Counter({
  target,
  prefix = "",
  decimal = false,
}: {
  target: number;
  prefix?: string;
  decimal?: boolean;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const duration = 1800;
    let start: number | null = null;
    let frame: number;

    const tick = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target]);

  return (
    <span>
      {prefix}
      {decimal ? value.toFixed(1) : Math.round(value)}
    </span>
  );
}

// Reseñas reales con consentimiento de uso de nombre e imagen.
const reviews = [
  { name: "Renato Oñate", initial: "R", color: "bg-celeste", text: "Excelente servicio, muy buena coordinación y puntualidad. Todo se realizó de manera rápida y profesional." },
  { name: "Renata Jara", initial: "R", color: "bg-brown", text: "Muy conforme con el servicio. Destaco la puntualidad, la buena conducción y la seguridad durante todo el trayecto." },
  { name: "Cristián Rojas", initial: "C", color: "bg-celeste", text: "Servicio confiable y responsable. La coordinación fue excelente y cumplieron con el horario acordado." },
  { name: "Cristóbal Finaldi", initial: "C", color: "bg-brown", text: "Muy buena experiencia, conductor amable y cuidadoso. Se nota la preocupación por entregar un servicio seguro y de calidad." },
  { name: "Alexander Vargas", initial: "A", color: "bg-celeste", text: "100% recomendable. Buena comunicación desde el primer contacto, excelente puntualidad y muy buena conducción." },
  { name: "Magdalena Corvalán", initial: "M", color: "bg-brown", text: "Quedé muy satisfecha con el servicio. Todo bien coordinado, vehículo en buenas condiciones y traslado cómodo y seguro." },
  { name: "Benjamín Villagrán", initial: "B", color: "bg-celeste", text: "Excelente atención y servicio. Fueron puntuales, responsables y muy profesionales durante todo el traslado. Sin duda volvería a contratar." },
  { name: "Álvaro Marín", initial: "A", color: "bg-brown", text: "El conductor fue muy simpático y amable durante todo el trayecto, además de puntual y muy cuidadoso al conducir. Excelente servicio." },
  { name: "Felipe Mollo", initial: "F", color: "bg-celeste", text: "Muy buena experiencia, el conductor fue súper amable, simpático y profesional. Se agradece mucho el buen trato y la disposición durante todo el viaje." },
  { name: "Paula Pérez", initial: "P", color: "bg-brown", text: "Excelente experiencia, muy buena coordinación y trato. El conductor fue puntual, responsable y condujo de manera muy segura durante todo el viaje." },
];

const faqItems = [
  {
    question: "¿Qué es la conducción de reemplazo?",
    answer:
      "Tú vas a tu evento en tu propio vehículo y, al finalizar, un conductor de SafeReturn llega al lugar, te recoge y conduce tu auto de regreso a casa contigo. Así disfrutas sin preocuparte por manejar.",
  },
  {
    question: "¿Con cuánta anticipación debo reservar?",
    answer:
      "Lo ideal es solicitar con al menos 48 horas de anticipación, aunque también atendemos en el momento según disponibilidad.",
  },
  {
    question: "¿De qué depende el valor?",
    answer:
      "El valor depende de la distancia, la zona, el horario, el tipo de servicio, la cantidad de paradas y las direcciones entregadas. Siempre te enviaremos la cotización antes de confirmar.",
  },
  {
    question: "¿Trabajan solo en Santiago?",
    answer:
      "Nuestro foco principal es Santiago y alrededores, pero podemos evaluar otros sectores. Escríbenos indicando origen y destino para revisar la factibilidad.",
  },
  {
    question: "¿Cómo se coordina el servicio?",
    answer:
      "Toda la coordinación se realiza de forma directa por WhatsApp. Ahí te pediremos los datos, te enviaremos la cotización y confirmaremos el conductor asignado.",
  },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [openAbout, setOpenAbout] = useState<boolean>(true);

  const handleWhatsAppClick = () => {
    const text = encodeURIComponent("Hola SafeReturn 👋, quiero cotizar un traslado.");
    const url = `https://wa.me/56929907763?text=${text}`;
    window.open(url, "_blank");
  };

  const handlePromoWhatsAppClick = () => {
    const text = encodeURIComponent("Hola SafeReturn 👋, quiero cotizar convenios y/o promociones.");
    const url = `https://wa.me/56991513393?text=${text}`;
    window.open(url, "_blank");
  };

  return (
    <main className="min-h-screen text-cream">
      {/* HERO BACKGROUND */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/fondo-portada-safereturn.jpg"
          alt="Vista desde el volante en carretera al atardecer"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-navy-deep/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-navy-deep/70" />
      </div>

      {/* NAVBAR */}
      <header className="sticky top-0 z-30 border-b border-cream/10 bg-gradient-to-b from-navy-deep/85 to-navy-deep/60 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
          <div className="flex items-center gap-3">
            <div className="relative h-9 w-9 md:h-10 md:w-10 overflow-hidden rounded-full">
              <Image
                src="/logo-safereturn.png"
                alt="SafeReturn logo"
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
            <span className="text-lg font-semibold md:text-xl">
              <span className="font-bold">Safe</span>Return
            </span>
          </div>

          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a href="#inicio" className="hover:text-celeste transition-colors">
              Inicio
            </a>
            <a href="#como-funciona" className="hover:text-celeste transition-colors">
              ¿Cómo funciona?
            </a>
            <a href="#servicios" className="hover:text-celeste transition-colors">
              Nuestros servicios
            </a>
            <a href="#por-que-confiar" className="hover:text-celeste transition-colors">
              ¿Por qué confiar en nosotros?
            </a>
            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-celeste transition-colors">
                Más <span className="text-xs">▼</span>
              </button>
              <div className="invisible absolute right-0 mt-2 w-52 rounded-xl border border-cream/10 bg-navy/95 p-2 text-xs shadow-xl opacity-0 transition group-hover:visible group-hover:opacity-100">
                <a
                  href="#quienes-somos"
                  className="block rounded-lg px-3 py-2 hover:bg-cream/5"
                >
                  ¿Quiénes somos?
                </a>
                <a
                  href="#preguntas"
                  className="block rounded-lg px-3 py-2 hover:bg-cream/5"
                >
                  Preguntas frecuentes
                </a>
                <a
                  href="#terminos"
                  className="block rounded-lg px-3 py-2 hover:bg-cream/5"
                >
                  Términos y condiciones
                </a>
                <a
                  href="#contacto"
                  className="block rounded-lg px-3 py-2 hover:bg-cream/5"
                >
                  Contacto
                </a>
              </div>
            </div>
          </nav>

          {/* Botón flotante de WhatsApp (versión escritorio) */}
          <button
            onClick={handleWhatsAppClick}
            className="hidden md:flex items-center justify-center h-14 w-14 rounded-full bg-white text-black shadow-[0_0_40px_rgba(255,255,255,0.35)] hover:bg-white/85 transition-all"
            aria-label="Escribir por WhatsApp"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
              <path
                d="M12 3a9 9 0 0 0-7.75 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <g transform="translate(7.3,6.8) scale(0.44)">
                <path
                  d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
          </button>
        </div>
      </header>

      {/* CONTENIDO */}
      <div id="inicio">
        {/* HERO */}
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-10 md:px-6 md:pt-16">
        <section className="flex flex-col items-center text-center md:pt-4">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-white/90">
            Traslados privados · Conductor de reemplazo · Aeropuerto
          </p>

          <h1 className="font-serif font-extrabold uppercase leading-tight text-3xl sm:whitespace-nowrap sm:text-3xl md:text-4xl lg:text-5xl">
            Disfruta tu evento con tranquilidad
            <span className="mt-2 block whitespace-normal text-celeste">
              Nosotros nos encargamos del resto
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-sm font-medium uppercase tracking-[0.25em] text-white/90 md:text-base">
            Servicio profesional para que llegues seguro a tu destino, con
            coordinación simple por WhatsApp.
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button
              onClick={handleWhatsAppClick}
              className="rounded-full bg-white hover:bg-white/85 px-10 py-3 text-base font-serif font-semibold text-black shadow-[0_0_50px_rgba(255,255,255,0.35)] focus:outline-none focus:ring-2 focus:ring-white"
            >
              Cotiza tu servicio
            </button>
            <button
              onClick={handlePromoWhatsAppClick}
              className="rounded-full bg-white hover:bg-white/85 px-10 py-3 text-base font-serif font-semibold text-black shadow-[0_0_50px_rgba(255,255,255,0.35)] focus:outline-none focus:ring-2 focus:ring-white"
            >
              Cotiza convenios y/o promociones
            </button>
          </div>

          {/* CIFRAS DINÁMICAS */}
          <div className="mt-14 flex w-full max-w-4xl items-start justify-between gap-2">
            <div className="flex-1 text-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="mx-auto mb-2 h-6 w-6 text-celeste/80 sm:h-7 sm:w-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v-3.2c0-.5.2-1 .55-1.35l1.5-1.5c.3-.3.7-.45 1.1-.45h9.7c.4 0 .8.15 1.1.45l1.5 1.5c.35.35.55.85.55 1.35V16" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.5 16h17a.5.5 0 0 1 .5.5v1a1 1 0 0 1-1 1h-1v.75a.75.75 0 0 1-.75.75h-.5a.75.75 0 0 1-.75-.75V18.5H7v.75a.75.75 0 0 1-.75.75h-.5a.75.75 0 0 1-.75-.75V18.5H4a1 1 0 0 1-1-1v-1a.5.5 0 0 1 .5-.5Z" />
                <circle cx="7.5" cy="14" r="1" /><circle cx="16.5" cy="14" r="1" />
              </svg>
              <div className="font-serif text-xl font-bold text-white sm:text-2xl md:text-3xl lg:text-4xl">
                <Counter target={300} prefix="+" />
              </div>
              <p className="mt-1 text-[10px] uppercase tracking-wide text-cream/70 sm:text-xs md:text-sm">Rutas completadas</p>
            </div>
            <div className="flex-1 text-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="mx-auto mb-2 h-6 w-6 text-celeste/80 sm:h-7 sm:w-7">
                <circle cx="9" cy="8" r="2.6" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 18c.5-3 2.3-4.5 4.5-4.5s4 1.5 4.5 4.5" />
                <circle cx="16.3" cy="8.7" r="2.1" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.8 13.7c1.8.1 3.3 1.4 3.7 4.3" />
              </svg>
              <div className="font-serif text-xl font-bold text-white sm:text-2xl md:text-3xl lg:text-4xl">
                <Counter target={200} prefix="+" />
              </div>
              <p className="mt-1 text-[10px] uppercase tracking-wide text-cream/70 sm:text-xs md:text-sm">Clientes satisfechos</p>
            </div>
            <div className="flex-1 text-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="mx-auto mb-2 h-6 w-6 text-celeste/80 sm:h-7 sm:w-7">
                <rect x="5" y="4" width="8" height="16" rx="1" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 9h6v11h-6" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h1M10.5 7.5h1M7.5 10.5h1M10.5 10.5h1M7.5 13.5h1M10.5 13.5h1M15.5 12h1M15.5 15h1" />
              </svg>
              <div className="font-serif text-xl font-bold text-white sm:text-2xl md:text-3xl lg:text-4xl">
                <Counter target={30} prefix="+" />
              </div>
              <p className="mt-1 text-[10px] uppercase tracking-wide text-cream/70 sm:text-xs md:text-sm">Centros de eventos</p>
            </div>
            <div className="flex-1 text-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="mx-auto mb-2 h-6 w-6 text-celeste/80 sm:h-7 sm:w-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.5l2.55 5.17 5.7.83-4.13 4.02.97 5.68L12 16.4l-5.09 2.8.97-5.68-4.13-4.02 5.7-.83L12 3.5Z" />
              </svg>
              <div className="font-serif text-xl font-bold text-white sm:text-2xl md:text-3xl lg:text-4xl">
                <Counter target={5.0} decimal prefix="" />
              </div>
              <p className="mt-1 text-[10px] uppercase tracking-wide text-cream/70 sm:text-xs md:text-sm">Estrellas en Google</p>
            </div>
          </div>
        </section>
        </div>

                <div className="band-cream">
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
{/* CÓMO FUNCIONA */}
        <section id="como-funciona">
          <h2 className="font-serif text-center text-3xl font-bold md:text-4xl">
            ¿Cómo funciona?
          </h2>
          <p className="mt-2 text-center text-cream/70">
            Paso a paso para disfrutar tu evento sin preocuparte por manejar.
          </p>

          <div className="relative mt-10 grid gap-6 md:grid-cols-4">
            {/* Flechas de conexión entre pasos (solo escritorio) */}
            <div className="pointer-events-none absolute inset-x-0 top-[38px] hidden md:block">
              <svg className="w-full" height="24" viewBox="0 0 1000 24" fill="none" preserveAspectRatio="none">
                <path d="M235 12 H265" stroke="#6b4a35" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M258 6 L268 12 L258 18" stroke="#6b4a35" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M485 12 H515" stroke="#6b4a35" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M508 6 L518 12 L508 18" stroke="#6b4a35" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M735 12 H765" stroke="#6b4a35" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M758 6 L768 12 L758 18" stroke="#6b4a35" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Paso 1: Nos escribes */}
            <div className="rounded-2xl border border-cream/10 bg-navy/50 p-5 text-center shadow-lg shadow-black/40 transition-all duration-300 hover:-translate-y-1 hover:border-celeste/50 hover:shadow-[0_0_45px_rgba(79,195,236,0.2)]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="mx-auto mb-3 h-7 w-7 text-celeste">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 5.5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-4 3.2V17.5H4a1 1 0 0 1-1-1v-10a1 1 0 0 1 1-1Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 9.5h10M7 12.5h6" />
              </svg>
              <h3 className="text-base font-semibold md:text-lg">Nos escribes</h3>
              <p className="mt-2 text-sm text-cream/70">Nos cuentas por WhatsApp qué tipo de traslado necesitas.</p>
            </div>

            {/* Paso 2: Asignamos conductor */}
            <div className="rounded-2xl border border-cream/10 bg-navy/50 p-5 text-center shadow-lg shadow-black/40 transition-all duration-300 hover:-translate-y-1 hover:border-celeste/50 hover:shadow-[0_0_45px_rgba(79,195,236,0.2)]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="mx-auto mb-3 h-7 w-7 text-celeste">
                <circle cx="12" cy="12" r="7.5" />
                <circle cx="12" cy="12" r="2" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v2.2M12 17.3v2.2M19.5 12h-2.2M6.7 12H4.5" />
              </svg>
              <h3 className="text-base font-semibold md:text-lg">Asignamos conductor</h3>
              <p className="mt-2 text-sm text-cream/70">Buscamos al conductor disponible que mejor se adapte a tu viaje.</p>
            </div>

            {/* Paso 3: Planificamos */}
            <div className="rounded-2xl border border-cream/10 bg-navy/50 p-5 text-center shadow-lg shadow-black/40 transition-all duration-300 hover:-translate-y-1 hover:border-celeste/50 hover:shadow-[0_0_45px_rgba(79,195,236,0.2)]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="mx-auto mb-3 h-7 w-7 text-celeste">
                <rect x="4" y="5" width="16" height="15" rx="1.5" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 9.5h16M8 3v3M16 3v3" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 13.2l1.8 1.8 3.7-3.8" />
              </svg>
              <h3 className="text-base font-semibold md:text-lg">Planificamos</h3>
              <p className="mt-2 text-sm text-cream/70">Coordinamos horario, ruta y cualquier detalle antes de tu traslado.</p>
            </div>

            {/* Paso 4: Llegas tranquilo */}
            <div className="rounded-2xl border border-cream/10 bg-navy/50 p-5 text-center shadow-lg shadow-black/40 transition-all duration-300 hover:-translate-y-1 hover:border-celeste/50 hover:shadow-[0_0_45px_rgba(79,195,236,0.2)]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="mx-auto mb-3 h-7 w-7 text-celeste">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-6.5-5.6-6.5-11A6.5 6.5 0 0 1 18.5 10c0 5.4-6.5 11-6.5 11Z" />
                <circle cx="12" cy="10" r="2.3" />
              </svg>
              <h3 className="text-base font-semibold md:text-lg">Llegas tranquilo</h3>
              <p className="mt-2 text-sm text-cream/70">A tu evento, tu destino o el aeropuerto: siempre a tiempo y sin complicaciones.</p>
            </div>
          </div>
        </section>

        
          </div>
        </div>

        <div className="band-navy">
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
{/* SERVICIOS */}
        <section id="servicios">
          <h2 className="font-serif text-center text-3xl font-bold md:text-4xl">
            Nuestros servicios
          </h2>
          <p className="mt-2 text-center text-cream/70">
            Pensados para que tu traslado sea cómodo, seguro y sin complicaciones.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3 items-stretch">
            {/* Conducción de reemplazo */}
            <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-cream/10 bg-navy/60 shadow-lg shadow-black/40 transition-all duration-300 hover:-translate-y-1 hover:border-celeste/50 hover:shadow-[0_0_45px_rgba(79,195,236,0.2)]">
              <div className="relative h-44 w-full overflow-hidden">
                <Image
                  src="/servicio-reemplazo.jpg"
                  alt="Conducción de reemplazo"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/10 to-transparent" />
              </div>
              <div className="flex flex-1 flex-col items-center p-6 text-center">
                <h3 className="font-serif text-lg font-semibold">Conducción de reemplazo</h3>
                <p className="mt-3 text-sm text-cream/70 max-w-xs md:min-h-[60px]">
                  Ideal para matrimonios, fiestas y eventos. Vuelves en tu propio vehículo
                  con un conductor asignado, sin manejar de regreso.
                </p>
                <ul className="mt-4 space-y-1.5 text-sm text-cream/80 md:min-h-[92px]">
                  <li><span className="text-celeste">✓</span> Conductor de reemplazo para tu auto.</li>
                  <li><span className="text-celeste">✓</span> Tú disfrutas, nosotros manejamos.</li>
                  <li><span className="text-celeste">✓</span> Pensado para que vuelvas tranquilo(a).</li>
                </ul>
                <button
                  onClick={handleWhatsAppClick}
                  className="mt-6 md:mt-auto rounded-full bg-white px-8 py-2 text-sm font-serif font-semibold text-black shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:bg-white/85 transition-transform hover:scale-105"
                >
                  Cotiza aquí
                </button>
              </div>
            </div>

            {/* Viajes privados */}
            <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-cream/10 bg-navy/60 shadow-lg shadow-black/40 transition-all duration-300 hover:-translate-y-1 hover:border-celeste/50 hover:shadow-[0_0_45px_rgba(79,195,236,0.2)]">
              <div className="relative h-44 w-full overflow-hidden">
                <Image
                  src="/servicio-privado.jpg"
                  alt="Viajes privados"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/10 to-transparent" />
              </div>
              <div className="flex flex-1 flex-col items-center p-6 text-center">
                <h3 className="font-serif text-lg font-semibold">Viajes privados</h3>
                <p className="mt-3 text-sm text-cream/70 max-w-xs md:min-h-[60px]">
                  Traslados privados coordinados previamente. Pensados para viajes puntuales
                  dentro o fuera de la ciudad según disponibilidad.
                </p>
                <ul className="mt-4 space-y-1.5 text-sm text-cream/80 md:min-h-[92px]">
                  <li><span className="text-celeste">✓</span> Planificación según tu horario y ruta.</li>
                  <li><span className="text-celeste">✓</span> Atención profesional durante todo el servicio.</li>
                  <li><span className="text-celeste">✓</span> Posibilidad de paradas según necesidad.</li>
                </ul>
                <button
                  onClick={handleWhatsAppClick}
                  className="mt-6 md:mt-auto rounded-full bg-white px-8 py-2 text-sm font-serif font-semibold text-black shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:bg-white/85 transition-transform hover:scale-105"
                >
                  Cotiza aquí
                </button>
              </div>
            </div>

            {/* Traslado a aeropuerto */}
            <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-cream/10 bg-navy/60 shadow-lg shadow-black/40 transition-all duration-300 hover:-translate-y-1 hover:border-celeste/50 hover:shadow-[0_0_45px_rgba(79,195,236,0.2)]">
              <div className="relative h-44 w-full overflow-hidden">
                <Image
                  src="/servicio-aeropuerto.jpg"
                  alt="Traslado a aeropuerto"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/10 to-transparent" />
              </div>
              <div className="flex flex-1 flex-col items-center p-6 text-center">
                <h3 className="font-serif text-lg font-semibold">Traslado a aeropuerto</h3>
                <p className="mt-3 text-sm text-cream/70 max-w-xs md:min-h-[60px]">
                  Traslados hacia o desde el aeropuerto, coordinados con anticipación para
                  que llegues a tiempo y sin estrés.
                </p>
                <ul className="mt-4 space-y-1.5 text-sm text-cream/80 md:min-h-[92px]">
                  <li><span className="text-celeste">✓</span> Puntualidad y confirmación previa.</li>
                  <li><span className="text-celeste">✓</span> Coordinación según vuelo y terminal.</li>
                  <li><span className="text-celeste">✓</span> Pensado para viajes y equipaje.</li>
                </ul>
                <button
                  onClick={handleWhatsAppClick}
                  className="mt-6 md:mt-auto rounded-full bg-white px-8 py-2 text-sm font-serif font-semibold text-black shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:bg-white/85 transition-transform hover:scale-105"
                >
                  Cotiza aquí
                </button>
              </div>
            </div>
          </div>
        </section>

        
          </div>
        </div>

        <div className="band-cream">
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
{/* POR QUÉ CONFIAR */}
        <section id="por-que-confiar">
          <h2 className="font-serif text-center text-3xl font-bold md:text-4xl">
            ¿Por qué confiar en nosotros?
          </h2>
          <p className="mt-2 text-center text-cream/70">
            Detalles que marcan la diferencia al momento de elegir quién te lleva de
            regreso.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-4">
            <div className="rounded-2xl border border-cream/10 bg-navy/60 p-5 text-center shadow-lg shadow-black/40 transition-all duration-300 hover:-translate-y-1 hover:border-celeste/50 hover:shadow-[0_0_45px_rgba(79,195,236,0.2)]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="mx-auto mb-4 h-7 w-7 text-celeste">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.5l2 2 4-4.5" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.5c2.2 1.4 4 1.9 6.5 1.9 0 8-3 11.5-6.5 13.1-3.5-1.6-6.5-5.1-6.5-13.1 2.5 0 4.3-.5 6.5-1.9Z" />
              </svg>
              <h3 className="text-base font-semibold md:text-lg">Conductores evaluados</h3>
              <p className="mt-2 text-sm text-cream/70">Documentos, experiencia y perfil revisados antes de cada asignación.</p>
            </div>
            <div className="rounded-2xl border border-cream/10 bg-navy/60 p-5 text-center shadow-lg shadow-black/40 transition-all duration-300 hover:-translate-y-1 hover:border-celeste/50 hover:shadow-[0_0_45px_rgba(79,195,236,0.2)]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="mx-auto mb-4 h-7 w-7 text-celeste">
                <circle cx="12" cy="12" r="8" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5V12l3 2" />
              </svg>
              <h3 className="text-base font-semibold md:text-lg">Puntualidad real</h3>
              <p className="mt-2 text-sm text-cream/70">Coordinamos con anticipación para respetar tu horario.</p>
            </div>
            <div className="rounded-2xl border border-cream/10 bg-navy/60 p-5 text-center shadow-lg shadow-black/40 transition-all duration-300 hover:-translate-y-1 hover:border-celeste/50 hover:shadow-[0_0_45px_rgba(79,195,236,0.2)]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="mx-auto mb-4 h-7 w-7 text-celeste">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v-3.2c0-.5.2-1 .55-1.35l1.5-1.5c.3-.3.7-.45 1.1-.45h9.7c.4 0 .8.15 1.1.45l1.5 1.5c.35.35.55.85.55 1.35V16" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.5 16h17a.5.5 0 0 1 .5.5v1a1 1 0 0 1-1 1h-1v.75a.75.75 0 0 1-.75.75h-.5a.75.75 0 0 1-.75-.75V18.5H7v.75a.75.75 0 0 1-.75.75h-.5a.75.75 0 0 1-.75-.75V18.5H4a1 1 0 0 1-1-1v-1a.5.5 0 0 1 .5-.5Z" />
                <circle cx="7.5" cy="14" r="1" /><circle cx="16.5" cy="14" r="1" />
              </svg>
              <h3 className="text-base font-semibold md:text-lg">Cuidado del vehículo</h3>
              <p className="mt-2 text-sm text-cream/70">Manejamos tu auto con el mismo respeto que el propio.</p>
            </div>
            <div className="rounded-2xl border border-cream/10 bg-navy/60 p-5 text-center shadow-lg shadow-black/40 transition-all duration-300 hover:-translate-y-1 hover:border-celeste/50 hover:shadow-[0_0_45px_rgba(79,195,236,0.2)]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="mx-auto mb-4 h-7 w-7 text-celeste">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 5.5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-4 3.2V17.5H4a1 1 0 0 1-1-1v-10a1 1 0 0 1 1-1Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 9.5h10M7 12.5h6" />
              </svg>
              <h3 className="text-base font-semibold md:text-lg">Comunicación directa</h3>
              <p className="mt-2 text-sm text-cream/70">Todo por WhatsApp, sin intermediarios ni letra chica.</p>
            </div>
          </div>
        </section>

        
          </div>
        </div>

        <div className="band-navy">
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
{/* MAPA DE COBERTURA / CENTROS DE EVENTOS */}
        <section id="cobertura">
          <h2 className="font-serif text-center text-3xl font-bold md:text-4xl">
            ¡Busca el lugar de tu evento!
          </h2>
          <p className="mt-2 text-center text-cream/70">
            Revisa algunos centros de eventos donde cubrimos servicio habitualmente.
          </p>
          <div className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-2xl border border-cream/10 shadow-lg shadow-black/40">
            <iframe
              src="https://www.google.com/maps/d/embed?mid=1HghouniaL5IbJUnvgduxJ1BCjgnZd7Y"
              width="100%"
              height="480"
              style={{ border: 0, display: "block" }}
              loading="lazy"
              title="Centros de eventos SafeReturn"
            />
          </div>
          <p className="mt-4 text-center text-sm text-cream/60">
            ¿No aparece el lugar de tu evento? No te preocupes, cuéntanos desde dónde
            necesitas tu traslado y lo evaluamos.
          </p>
          <div className="mt-4 flex justify-center">
            <button
              onClick={handleWhatsAppClick}
              className="rounded-full bg-white px-8 py-2.5 text-sm font-serif font-semibold text-black shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:bg-white/85"
            >
              Consultar por WhatsApp
            </button>
          </div>
        </section>

        
          </div>
        </div>

        <div className="band-cream">
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
{/* TESTIMONIOS */}
        <section id="testimonios">
          <h2 className="font-serif text-center text-3xl font-bold md:text-4xl">
            Reseñas de nuestros clientes
          </h2>
          <div className="mt-3 flex flex-col items-center gap-1 text-center text-sm text-cream/70">
            <span className="text-celeste">★★★★★</span>
            <span>Reseñas reales de quienes ya viajaron con nosotros</span>
          </div>

          <div className="relative mt-10 overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-navy-deep to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-navy-deep to-transparent" />
            <div className="marquee-track flex w-max gap-5">
              {[...reviews, ...reviews].map((review, idx) => (
                <div
                  key={idx}
                  className="w-72 flex-shrink-0 rounded-2xl border border-cream/10 bg-cream/95 p-5 text-navy-deep shadow-lg shadow-black/30 transition-all duration-300 hover:-translate-y-1 hover:border-celeste/50 hover:shadow-[0_0_45px_rgba(79,195,236,0.35)]"
                >
                  <div className="text-sm text-amber-500">★★★★★</div>
                  <p className="mt-3 text-sm leading-relaxed text-navy-deep/85">
                    &quot;{review.text}&quot;
                  </p>
                  <div className="mt-4 flex items-center gap-2.5">
                    <div
                      className={cn(
                        "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-navy-deep",
                        review.color
                      )}
                    >
                      {review.initial}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-navy-deep">{review.name}</p>
                      <p className="text-[11px] text-navy-deep/50">Google Maps</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        
          </div>
        </div>

        <div className="band-navy">
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
{/* QUIÉNES SOMOS (ACORDEÓN) */}
        <section id="quienes-somos">
          <h2 className="font-serif text-center text-3xl font-bold md:text-4xl">¿Quiénes somos?</h2>
          <p className="mt-2 text-center text-cream/70">
            Un servicio cercano, pensado para personas que buscan trasladarse con
            seguridad y tranquilidad.
          </p>

          <div className="mx-auto mt-8 max-w-4xl">
            <button
              onClick={() => setOpenAbout((prev) => !prev)}
              className="flex w-full items-center justify-between rounded-2xl border border-cream/10 bg-navy/60 px-6 py-4 text-left shadow-lg shadow-black/40"
            >
              <span className="text-lg font-semibold">
                Nuestra historia, propósito y forma de trabajar
              </span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                className={cn(
                  "h-5 w-5 flex-shrink-0 text-celeste transition-transform duration-300",
                  openAbout && "rotate-180"
                )}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {openAbout && (
              <div className="mt-3 rounded-2xl border border-cream/10 bg-navy/60 px-6 py-5 text-sm leading-relaxed text-cream/80 shadow-lg shadow-black/40 text-justify">
                <p>
                  SafeReturn nace de una necesidad muy concreta: poder disfrutar de
                  matrimonios, cenas, celebraciones y eventos sin tener que preocuparse
                  por quién va a manejar de regreso. Vimos que muchas personas optaban
                  por no llevar su auto o se arriesgaban a manejar cansados, y quisimos
                  ofrecer una alternativa segura, responsable y cercana.
                </p>
                <p className="mt-3">
                  Nuestro foco es el servicio de conducción de reemplazo y traslados
                  privados coordinados, con atención personalizada a través de WhatsApp.
                  Cada solicitud se revisa caso a caso, buscando entregar una experiencia
                  clara, puntual y humana, no un trámite más.
                </p>
                <p className="mt-3">
                  Detrás de SafeReturn hay un equipo que entiende lo importante que es la
                  confianza en este tipo de servicio: alguien va a manejar tu auto, con tu
                  familia o tus invitados dentro. Por eso ponemos especial cuidado en quién
                  forma parte de nuestro equipo de conductores, y en que cada detalle del
                  proceso, desde el primer mensaje hasta que llegas a casa, se sienta
                  cuidado.
                </p>
                <p className="mt-3">
                  SafeReturn es liderada por{" "}
                  <span className="font-semibold text-cream">Matías Nicolás Naranjo Luna</span>,
                  fundador y CEO de la empresa, quien impulsó este proyecto a partir de una
                  convicción simple: la seguridad y la tranquilidad no deberían ser un lujo,
                  sino parte natural de cualquier salida. SafeReturn opera bajo la razón
                  social Matías Nicolás Naranjo Luna Transporte y Servicios E.I.R.L., RUT
                  78.469.724-K, con domicilio en Santiago, Chile.
                </p>
              </div>
            )}
          </div>
        </section>

        
          </div>
        </div>

        <div className="band-cream">
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
{/* PREGUNTAS FRECUENTES */}
        <section id="preguntas">
          <h2 className="font-serif text-center text-3xl font-bold md:text-4xl">
            Preguntas frecuentes
          </h2>
          <p className="mt-2 text-center text-cream/70">
            Algunas dudas que suelen aparecer antes de reservar.
          </p>

          <div className="mx-auto mt-8 max-w-4xl space-y-3">
            {faqItems.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="rounded-2xl border border-cream/10 bg-navy/60 shadow-lg shadow-black/40">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between px-6 py-4 text-left"
                  >
                    <span className="font-semibold">{item.question}</span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      className={cn(
                        "h-5 w-5 flex-shrink-0 text-celeste transition-transform duration-300",
                        isOpen && "rotate-180"
                      )}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  {isOpen && (
                    <div className="border-t border-cream/10 px-6 py-4 text-sm text-cream/80">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        
          </div>
        </div>

        <div className="band-navy">
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
{/* TÉRMINOS Y CONDICIONES */}
        <section id="terminos">
          <div className="mx-auto max-w-2xl rounded-3xl border border-cream/10 bg-navy/60 p-10 text-center shadow-lg shadow-black/40 transition-all duration-300 hover:-translate-y-1 hover:border-celeste/50 hover:shadow-[0_0_45px_rgba(79,195,236,0.2)]">
            <h2 className="text-2xl font-bold md:text-3xl">
              Términos y condiciones
            </h2>
            <p className="mt-3 text-sm text-cream/70">
              Antes de reservar, revisa las reglas básicas de nuestro servicio: reservas,
              tarifas, cancelaciones, seguridad y más.
            </p>
            <a
              href="/terminos"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-full bg-white px-8 py-2.5 text-sm font-serif font-semibold text-black shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:bg-white/85"
            >
              Ver términos y condiciones completos ↗
            </a>
          </div>
        </section>

        
          </div>
        </div>

{/* CONTACTO / FOOTER */}
        <section id="contacto" className="mt-20 bg-navy-deep">
          <div className="grid gap-10 border-t border-cream/10 pt-10 md:grid-cols-4">
            {/* Logo + descripción */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image
                    src="/logo-safereturn.png"
                    alt="SafeReturn logo"
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <span className="text-lg font-semibold">
                  <span className="font-bold">Safe</span>Return
                </span>
              </div>
              <p className="mt-4 text-sm text-cream/70 max-w-xs">
                Conductores de reemplazo y traslados privados en Santiago y alrededores.
                Disfruta, nosotros te llevamos de regreso. 🚗
              </p>
            </div>

            {/* Servicios resumen */}
            <div>
              <h3 className="text-sm font-semibold">Servicios</h3>
              <ul className="mt-3 space-y-1 text-sm text-cream/70">
                <li>Conducción de reemplazo</li>
                <li>Viajes privados</li>
                <li>Traslado a aeropuerto</li>
              </ul>
            </div>

            {/* Navegación */}
            <div>
              <h3 className="text-sm font-semibold">Navegación</h3>
              <ul className="mt-3 space-y-1 text-sm text-cream/70">
                <li>
                  <a href="#inicio" className="hover:text-celeste">
                    Inicio
                  </a>
                </li>
                <li>
                  <a href="#como-funciona" className="hover:text-celeste">
                    ¿Cómo funciona?
                  </a>
                </li>
                <li>
                  <a href="#servicios" className="hover:text-celeste">
                    Nuestros servicios
                  </a>
                </li>
                <li>
                  <a href="#preguntas" className="hover:text-celeste">
                    Preguntas frecuentes
                  </a>
                </li>
              </ul>
            </div>

            {/* Contacto */}
            <div>
              <h3 className="text-sm font-semibold">Contacto</h3>
              <ul className="mt-3 space-y-1 text-sm text-cream/70">
                <li>📞 +56 9 9151 3393</li>
                <li>📞 +56 9 2990 7763</li>
                <li>📍 Santiago, Chile</li>
                <li>
                  ✉️{" "}
                  <a
                    href="mailto:safereturn.transportes@gmail.com"
                    className="underline decoration-celeste/70 underline-offset-4 hover:text-celeste"
                  >
                    safereturn.transportes@gmail.com
                  </a>
                </li>
                <li>
                  💬{" "}
                  <button
                    onClick={handleWhatsAppClick}
                    className="underline decoration-celeste/70 underline-offset-4 hover:text-celeste"
                  >
                    WhatsApp
                  </button>
                </li>
                <li>
                  📷{" "}
                  <a
                    href="https://www.instagram.com/safereturn.of?igsh=c2hoMWNxOGlraWJh&utm_source=qr"
                    target="_blank"
                    className="underline decoration-celeste/70 underline-offset-4 hover:text-celeste"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <p className="mt-10 text-center text-xs text-cream/50">
            © {new Date().getFullYear()} SafeReturn. Todos los derechos reservados.
          </p>
        </section>
      </div>
    </main>
  );
}
