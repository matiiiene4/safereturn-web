"use client";

import Image from "next/image";
import { useState, useMemo } from "react";

const WHATSAPP_NUMBER = "+56991513393"; // con +, sin espacios

type QuoteForm = {
  nombre: string;
  telefono: string;
  servicio: string;
  fecha: string;
  hora: string;
  pasajeros: string;
  paradas: string;
  origen: string;
  destino: string;
  paradasIntermedias: string;
  notas: string;
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function buildWhatsAppText(data: QuoteForm) {
  const lines = [
    "👋 Hola SafeReturn, quiero cotizar un traslado:",
    "",
    `👤 Nombre: ${data.nombre || "-"}`,
    `📞 Teléfono: ${data.telefono || "-"}`,
    "",
    `🚗 Servicio: ${data.servicio || "-"}`,
    `📅 Fecha: ${data.fecha || "-"}`,
    `⏰ Hora: ${data.hora || "-"}`,
    "",
    `👥 Pasajeros: ${data.pasajeros || "-"}`,
    `📍 Origen: ${data.origen || "-"}`,
    `📍 Destino: ${data.destino || "-"}`,
    `🛑 Paradas: ${data.paradas || "-"}`,
    `➡️ Paradas intermedias: ${data.paradasIntermedias || "-"}`,
    "",
    `📝 Notas: ${data.notas || "-"}`,
  ];

  return encodeURIComponent(lines.join("\n"));
}

const faqItems = [
  {
    question: "¿Cómo funciona el servicio de regreso post eventos?",
    answer:
      "Tú vas a tu evento en tu propio vehículo y, al finalizar, un conductor de SafeReturn llega al lugar, te recoge y conduce tu auto de regreso a casa contigo. Así disfrutas sin preocuparte por manejar.",
  },
  {
    question: "¿Con cuánta anticipación debo pedirlo?",
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

const termsAccordion = [
  {
    title: "Ámbito del servicio",
    content:
      "SafeReturn ofrece traslados privados y servicio de conductor de reemplazo para trayectos previamente coordinados. No somos una aplicación de viajes instantáneos ni un medio de transporte público.",
  },
  {
    title: "Reserva y disponibilidad",
    content:
      "Todas las solicitudes están sujetas a disponibilidad de conductor. La reserva se considera confirmada solo cuando es respondida y aceptada por WhatsApp por parte de SafeReturn.",
  },
  {
    title: "Tarifas y cotizaciones",
    content:
      "La tarifa depende de la distancia, el horario, el tipo de servicio, la cantidad de paradas y las direcciones entregadas. Las cotizaciones pueden ajustarse si se modifican la ruta, los horarios o la información inicial.",
  },
  {
    title: "Cambios y modificaciones",
    content:
      "Cualquier cambio (horario, origen/destino, paradas, pasajeros adicionales, etc.) debe informarse por WhatsApp. El valor del servicio puede variar según el nuevo recorrido o condiciones.",
  },
  {
    title: "Política de cancelación y reembolso",
    content:
      "Si se cancela con al menos 24 horas de anticipación, el reembolso es del 100 %. Si se cancela entre 12 y 24 horas antes del servicio, el reembolso es del 50 %. Si se cancela con menos de 12 horas o el pasajero no se presenta, no corresponde reembolso.",
  },
  {
    title: "Puntualidad y tiempos de espera",
    content:
      "El conductor esperará un tiempo razonable en el punto de encuentro. Después de ese plazo, podría cobrarse tiempo adicional o considerarse el viaje cancelado según las condiciones informadas al cliente.",
  },
  {
    title: "Seguridad y comportamiento",
    content:
      "No se permite fumar, consumir drogas o mantener conductas que pongan en riesgo la seguridad. El conductor puede dar por terminado el servicio si hay comportamiento inadecuado o agresivo.",
  },
  {
    title: "Daños y limpieza del vehículo",
    content:
      "El pasajero será responsable de los daños o de la necesidad de limpieza especial del vehículo cuando sean ocasionados por su conducta (por ejemplo, vómito, suciedad excesiva o daños materiales).",
  },
  {
    title: "Privacidad y uso de datos",
    content:
      "Los datos del cliente se utilizan solo para coordinar el servicio a través de WhatsApp y registro interno básico. El conductor asignado también tendrá acceso a los datos necesarios del viaje (nombre de contacto, teléfono y direcciones) para poder prestarlo. No se comparten datos con terceros para fines comerciales.",
  },
  {
    title: "Fuerza mayor y reprogramaciones",
    content:
      "SafeReturn podrá reprogramar o cancelar un servicio ante situaciones de fuerza mayor (accidentes, cortes de ruta, problemas climáticos u otros eventos externos). En esos casos, se coordinará con el cliente la mejor alternativa posible.",
  },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [openAbout, setOpenAbout] = useState<boolean>(true);
  const [openTerms, setOpenTerms] = useState<number | null>(0);

  const [form, setForm] = useState<QuoteForm>({
    nombre: "",
    telefono: "",
    servicio: "",
    fecha: "",
    hora: "",
    pasajeros: "",
    paradas: "",
    origen: "",
    destino: "",
    paradasIntermedias: "",
    notas: "",
  });

  const previewText = useMemo(() => decodeURIComponent(buildWhatsAppText(form)), [form]);

  const handleChange = (field: keyof QuoteForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/56991513393?text=${buildWhatsAppText(form)}`;
    window.open(url, "_blank");
  };

  const handleSimpleWhatsAppClick = () => {
    const text = encodeURIComponent("Hola SafeReturn 👋, quiero más información sobre sus servicios.");
    const url = `https://wa.me/56991513393?text=${text}`;
    window.open(url, "_blank");
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO BACKGROUND */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/hero-bg.png"
          alt="Car on the road at night"
          fill
          priority
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/90 to-black" />
      </div>

      {/* NAVBAR */}
      <header className="sticky top-0 z-30 border-b border-white/5 bg-gradient-to-b from-black/85 to-black/60 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
          <div className="flex items-center gap-3">
            <div className="relative h-9 w-9 md:h-10 md:w-10 overflow-hidden rounded-xl">
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
            <a href="#inicio" className="hover:text-emerald-400 transition-colors">
              Inicio
            </a>
            <a href="#como-funciona" className="hover:text-emerald-400 transition-colors">
              ¿Cómo funciona?
            </a>
            <a href="#servicios" className="hover:text-emerald-400 transition-colors">
              Nuestros servicios
            </a>
            <a href="#por-que-confiar" className="hover:text-emerald-400 transition-colors">
              ¿Por qué confiar en nosotros?
            </a>
            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-emerald-400 transition-colors">
                Más <span className="text-xs">▼</span>
              </button>
              <div className="invisible absolute right-0 mt-2 w-52 rounded-xl border border-white/5 bg-neutral-900/95 p-2 text-xs shadow-xl opacity-0 transition group-hover:visible group-hover:opacity-100">
                <a
                  href="#quienes-somos"
                  className="block rounded-lg px-3 py-2 hover:bg-white/5"
                >
                  ¿Quiénes somos?
                </a>
                <a
                  href="#preguntas"
                  className="block rounded-lg px-3 py-2 hover:bg-white/5"
                >
                  Preguntas frecuentes
                </a>
                <a
                  href="#ayuda"
                  className="block rounded-lg px-3 py-2 hover:bg-white/5"
                >
                  ¿Necesitas ayuda o más información?
                </a>
                <a
                  href="#terminos"
                  className="block rounded-lg px-3 py-2 hover:bg-white/5"
                >
                  Términos y condiciones
                </a>
                <a
                  href="#contacto"
                  className="block rounded-lg px-3 py-2 hover:bg-white/5"
                >
                  Contacto
                </a>
              </div>
            </div>
          </nav>

          {/* Botón flotante de WhatsApp (versión escritorio) */}
          <button
            onClick={handleSimpleWhatsAppClick}
            className="hidden md:flex items-center justify-center h-12 w-12 rounded-full bg-emerald-500 text-black shadow-[0_0_40px_rgba(16,185,129,0.7)] hover:bg-emerald-400 transition-all"
            aria-label="Escribir por WhatsApp"
          >
            <span className="text-2xl">💬</span>
          </button>
        </div>
      </header>

      {/* CONTENIDO */}
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-10 md:px-6 md:pt-16" id="inicio">
        {/* HERO */}
        <section className="flex flex-col items-center text-center md:pt-4">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-emerald-300/80">
            Traslados privados y conductor de reemplazo
          </p>

          <h1 className="text-4xl font-extrabold leading-tight md:text-6xl lg:text-7xl">
            Disfruta tu evento con <span className="block">tranquilidad.</span>
            <span className="mt-2 block text-emerald-400">
              Nosotros te llevamos de regreso.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base text-neutral-200 md:text-lg">
            Servicio profesional pensado para que vuelvas seguro(a) a casa. Coordinación
            simple por WhatsApp 📲 y atención clara desde el primer mensaje.
          </p>

          <div className="mt-8 flex flex-col items-center gap-4">
            <button
              onClick={handleWhatsAppClick}
              className="rounded-full bg-emerald-500 px-10 py-3 text-base font-semibold text-black shadow-[0_0_50px_rgba(16,185,129,0.8)] hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300"
            >
              Cotiza aquí
            </button>
          </div>
        </section>

        {/* CÓMO FUNCIONA */}
        <section id="como-funciona" className="mt-20">
          <h2 className="text-center text-3xl font-bold md:text-4xl">
            ¿Cómo funciona?
          </h2>
          <p className="mt-2 text-center text-neutral-300">
            Paso a paso para disfrutar tu evento sin preocuparte por manejar.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {[
              {
                title: "Contáctanos",
                desc: "Nos escribes por WhatsApp y nos cuentas qué tipo de traslado necesitas.",
                emoji: "📲",
              },
              {
                title: "Asignamos un conductor",
                desc: "Buscamos al conductor disponible que mejor se adapte a tu recorrido.",
                emoji: "🧑‍✈️",
              },
              {
                title: "Disfruta tu evento",
                desc: "Vas a tu evento en tu vehículo, disfrutas con tranquilidad y sin manejar de vuelta.",
                emoji: "🥂",
              },
              {
                title: "Llegas seguro a casa",
                desc: "Al finalizar, el conductor te recoge y lleva tu auto de regreso contigo.",
                emoji: "🏡",
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-white/5 bg-black/50 p-5 text-center shadow-lg shadow-black/40"
              >
                <div className="mb-3 text-3xl">{step.emoji}</div>
                <h3 className="text-base font-semibold md:text-lg">{step.title}</h3>
                <p className="mt-2 text-sm text-neutral-300">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SERVICIOS */}
        <section id="servicios" className="mt-20">
          <h2 className="text-center text-3xl font-bold md:text-4xl">
            Nuestros servicios
          </h2>
          <p className="mt-2 text-center text-neutral-300">
            Pensados para que tu traslado sea cómodo, seguro y sin complicaciones.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {/* Regreso post eventos */}
            <div className="flex flex-col items-center rounded-2xl border border-white/5 bg-black/60 p-6 text-center shadow-lg shadow-black/40">
              <div className="mb-3 text-3xl">🎉</div>
              <h3 className="text-lg font-semibold">Regreso post eventos</h3>
              <p className="mt-3 text-sm text-neutral-300 max-w-xs">
                Ideal para matrimonios, fiestas y eventos. Vuelves en tu propio vehículo
                con un conductor asignado, sin manejar de regreso.
              </p>
              <ul className="mt-4 space-y-1 text-sm text-neutral-200">
                <li>✅ Conductor de reemplazo para tu auto.</li>
                <li>✅ Tú disfrutas, nosotros manejamos.</li>
                <li>✅ Servicio pensado para que vuelvas tranquilo(a).</li>
              </ul>
              <button
                onClick={handleWhatsAppClick}
                className="mt-6 rounded-full bg-emerald-500 px-8 py-2 text-sm font-semibold text-black shadow-[0_0_30px_rgba(16,185,129,0.7)] hover:bg-emerald-400"
              >
                Cotiza aquí
              </button>
            </div>

            {/* Viajes privados */}
            <div className="flex flex-col items-center rounded-2xl border border-white/5 bg-black/60 p-6 text-center shadow-lg shadow-black/40">
              <div className="mb-3 text-3xl">🚘</div>
              <h3 className="text-lg font-semibold">Viajes privados</h3>
              <p className="mt-3 text-sm text-neutral-300 max-w-xs">
                Traslados privados coordinados previamente. Pensados para viajes puntuales
                dentro o fuera de la ciudad según disponibilidad.
              </p>
              <ul className="mt-4 space-y-1 text-sm text-neutral-200">
                <li>✅ Planificación según tu horario y ruta.</li>
                <li>✅ Atención profesional durante todo el servicio.</li>
                <li>✅ Posibilidad de paradas según necesidad.</li>
              </ul>
              <button
                onClick={handleWhatsAppClick}
                className="mt-6 rounded-full bg-emerald-500 px-8 py-2 text-sm font-semibold text-black shadow-[0_0_30px_rgba(16,185,129,0.7)] hover:bg-emerald-400"
              >
                Cotiza aquí
              </button>
            </div>

            {/* Traslado a aeropuerto */}
            <div className="flex flex-col items-center rounded-2xl border border-white/5 bg-black/60 p-6 text-center shadow-lg shadow-black/40">
              <div className="mb-3 text-3xl">✈️</div>
              <h3 className="text-lg font-semibold">Traslado a aeropuerto</h3>
              <p className="mt-3 text-sm text-neutral-300 max-w-xs">
                Traslados hacia o desde el aeropuerto, coordinados con anticipación para
                que llegues a tiempo y sin estrés.
              </p>
              <ul className="mt-4 space-y-1 text-sm text-neutral-200">
                <li>✅ Puntualidad y confirmación antes del traslado.</li>
                <li>✅ Coordinación por vuelo y terminal.</li>
                <li>✅ Servicio pensado para viajes y equipaje.</li>
              </ul>
              <button
                onClick={handleWhatsAppClick}
                className="mt-6 rounded-full bg-emerald-500 px-8 py-2 text-sm font-semibold text-black shadow-[0_0_30px_rgba(16,185,129,0.7)] hover:bg-emerald-400"
              >
                Cotiza aquí
              </button>
            </div>
          </div>
        </section>

        {/* POR QUÉ CONFIAR */}
        <section id="por-que-confiar" className="mt-20">
          <h2 className="text-center text-3xl font-bold md:text-4xl">
            ¿Por qué confiar en nosotros?
          </h2>
          <p className="mt-2 text-center text-neutral-300">
            Detalles que marcan la diferencia al momento de elegir quién te lleva de
            regreso.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {[
              {
                title: "Conductores profesionales",
                desc: "Personas seleccionadas y capacitadas para brindar un servicio responsable y amable.",
                emoji: "🧑‍✈️",
              },
              {
                title: "Puntualidad garantizada",
                desc: "Coordinamos contigo con anticipación para respetar tu horario y el de tu evento.",
                emoji: "⏰",
              },
              {
                title: "Cuidado de tu vehículo",
                desc: "Manejamos tu auto como si fuera nuestro, con respeto y preocupación por los detalles.",
                emoji: "🚗",
              },
              {
                title: "Seguridad y confianza",
                desc: "Información clara, comunicación directa por WhatsApp y servicio transparente.",
                emoji: "🛡️",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-white/5 bg-black/60 p-5 text-center shadow-lg shadow-black/40"
              >
                <div className="mb-3 text-3xl">{item.emoji}</div>
                <h3 className="text-base font-semibold md:text-lg">{item.title}</h3>
                <p className="mt-2 text-sm text-neutral-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* QUIÉNES SOMOS (ACORDEÓN) */}
        <section id="quienes-somos" className="mt-20">
          <h2 className="text-center text-3xl font-bold md:text-4xl">¿Quiénes somos?</h2>
          <p className="mt-2 text-center text-neutral-300">
            Un servicio cercano, pensado para personas que quieren disfrutar sin manejar
            de vuelta.
          </p>

          <div className="mx-auto mt-8 max-w-4xl">
            <button
              onClick={() => setOpenAbout((prev) => !prev)}
              className="flex w-full items-center justify-between rounded-2xl border border-white/5 bg-black/60 px-6 py-4 text-left shadow-lg shadow-black/40"
            >
              <span className="text-lg font-semibold">
                Nuestra historia, propósito y forma de trabajar
              </span>
              <span className="text-2xl">{openAbout ? "−" : "+"}</span>
            </button>
            {openAbout && (
              <div className="mt-3 rounded-2xl border border-white/5 bg-black/60 px-6 py-5 text-sm leading-relaxed text-neutral-200 shadow-lg shadow-black/40">
                <p>
                  SafeReturn nace de una necesidad muy concreta: poder disfrutar de
                  matrimonios, cenas, celebraciones y eventos sin tener que preocuparse
                  por quién va a manejar de regreso. Vimos que muchas personas optaban
                  por no llevar su auto o se arriesgaban a manejar cansados, y quisimos
                  ofrecer una alternativa segura y responsable.
                </p>
                <p className="mt-3">
                  Nuestro foco es el servicio de conductor de reemplazo y traslados
                  privados coordinados, con atención personalizada a través de WhatsApp.
                  Cada solicitud se revisa caso a caso, buscando entregar una experiencia
                  clara, puntual y cercana.
                </p>
                <p className="mt-3">
                  Nos importa que llegues tranquilo(a) a tu casa, que tu vehículo quede en
                  buenas manos y que sientas confianza en cada paso del proceso. Por eso
                  ponemos énfasis en la comunicación, en el respeto por tu tiempo y en el
                  cuidado de tu auto.
                </p>
                <p className="mt-3">
                  Más que un traslado, queremos que sientas que tienes a alguien de
                  confianza encargado de llevarte de vuelta, para que solo te preocupes de
                  disfrutar el momento. 🚗✨
                </p>
              </div>
            )}
          </div>
        </section>

        {/* PREGUNTAS FRECUENTES */}
        <section id="preguntas" className="mt-20">
          <h2 className="text-center text-3xl font-bold md:text-4xl">
            Preguntas frecuentes
          </h2>
          <p className="mt-2 text-center text-neutral-300">
            Algunas dudas que suelen aparecer antes de reservar.
          </p>

          <div className="mx-auto mt-8 max-w-4xl space-y-3">
            {faqItems.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="rounded-2xl border border-white/5 bg-black/60 shadow-lg shadow-black/40">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between px-6 py-4 text-left"
                  >
                    <span className="font-semibold">{item.question}</span>
                    <span className="text-2xl">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && (
                    <div className="border-t border-white/5 px-6 py-4 text-sm text-neutral-200">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* AYUDA / FORMULARIO */}
        <section id="ayuda" className="mt-20">
          <h2 className="text-center text-3xl font-bold md:text-4xl">
            ¿Necesitas ayuda o más información?
          </h2>
          <p className="mt-2 text-center text-neutral-300">
            Completa tus datos y revisa cómo se verá el mensaje que nos llegará por
            WhatsApp.
          </p>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {/* FORM */}
            <div className="space-y-4 rounded-2xl border border-white/5 bg-black/60 p-6 shadow-lg shadow-black/40">
              {[
                { label: "Nombre completo", field: "nombre", placeholder: "Ej: Matías Naranjo" },
                { label: "Teléfono", field: "telefono", placeholder: "+56 9 ..." },
                {
                  label: "Servicio",
                  field: "servicio",
                  placeholder: "Regreso post evento, viaje privado, aeropuerto...",
                },
                { label: "Fecha", field: "fecha", placeholder: "Ej: 25/01/2026" },
                { label: "Hora", field: "hora", placeholder: "Ej: 02:30 AM" },
                { label: "Cantidad de pasajeros", field: "pasajeros", placeholder: "Ej: 3" },
                { label: "Paradas", field: "paradas", placeholder: "Ej: 1 parada en domicilio intermedio" },
                { label: "Origen", field: "origen", placeholder: "Dirección de inicio" },
                { label: "Destino", field: "destino", placeholder: "Dirección final" },
                {
                  label: "Paradas intermedias",
                  field: "paradasIntermedias",
                  placeholder: "Direcciones o referencias extra",
                },
                {
                  label: "Notas adicionales",
                  field: "notas",
                  placeholder: "Detalles que quieras mencionar (equipaje, horarios especiales, etc.)",
                },
              ].map((input) => (
                <div key={input.field}>
                  <label className="text-xs font-medium text-neutral-300">
                    {input.label}
                  </label>
                  <input
                    className="mt-1 w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-sm outline-none focus:border-emerald-400"
                    placeholder={input.placeholder}
                    value={form[input.field as keyof QuoteForm]}
                    onChange={(e) => handleChange(input.field as keyof QuoteForm, e.target.value)}
                  />
                </div>
              ))}

              <button
                onClick={handleWhatsAppClick}
                className="mt-2 w-full rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-black shadow-[0_0_30px_rgba(16,185,129,0.7)] hover:bg-emerald-400"
              >
                Enviar por WhatsApp
              </button>
            </div>

            {/* PREVIEW */}
            <div className="rounded-2xl border border-white/5 bg-black/60 p-6 shadow-lg shadow-black/40">
              <h3 className="text-base font-semibold">Vista previa del mensaje 📲</h3>
              <p className="mt-2 text-xs text-neutral-300">
                Así se verá el mensaje que enviaremos a SafeReturn cuando presiones
                &quot;Enviar por WhatsApp&quot;.
              </p>
              <div className="mt-4 h-[340px] overflow-y-auto rounded-2xl bg-black/70 p-4 text-xs leading-relaxed text-neutral-100 border border-white/5">
                <pre className="whitespace-pre-wrap font-mono text-[11px]">
                  {previewText}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* TÉRMINOS Y CONDICIONES (ACORDEÓN) */}
        <section id="terminos" className="mt-20">
          <h2 className="text-center text-3xl font-bold md:text-4xl">
            Términos y condiciones
          </h2>
          <p className="mt-2 text-center text-neutral-300">
            Recomendaciones y reglas básicas para un servicio claro. ✅
          </p>

          <div className="mx-auto mt-8 max-w-4xl space-y-3">
            {termsAccordion.map((item, idx) => {
              const isOpen = openTerms === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/5 bg-black/60 shadow-lg shadow-black/40"
                >
                  <button
                    onClick={() => setOpenTerms(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between px-6 py-4 text-left"
                  >
                    <span className="font-semibold">{item.title}</span>
                    <span className="text-2xl">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && (
                    <div className="border-t border-white/5 px-6 py-4 text-sm text-neutral-200">
                      {item.content}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* CONTACTO / FOOTER */}
        <section id="contacto" className="mt-20">
          <div className="grid gap-10 border-t border-white/5 pt-10 md:grid-cols-4">
            {/* Logo + descripción */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-xl">
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
              <p className="mt-4 text-sm text-neutral-300 max-w-xs">
                Conductores de reemplazo y traslados privados en Santiago y alrededores.
                Disfruta, nosotros te llevamos de regreso. 🚗
              </p>
            </div>

            {/* Servicios resumen */}
            <div>
              <h3 className="text-sm font-semibold">Servicios</h3>
              <ul className="mt-3 space-y-1 text-sm text-neutral-300">
                <li>Regreso post eventos</li>
                <li>Viajes privados</li>
                <li>Traslado a aeropuerto</li>
              </ul>
            </div>

            {/* Navegación */}
            <div>
              <h3 className="text-sm font-semibold">Navegación</h3>
              <ul className="mt-3 space-y-1 text-sm text-neutral-300">
                <li>
                  <a href="#inicio" className="hover:text-emerald-400">
                    Inicio
                  </a>
                </li>
                <li>
                  <a href="#como-funciona" className="hover:text-emerald-400">
                    ¿Cómo funciona?
                  </a>
                </li>
                <li>
                  <a href="#servicios" className="hover:text-emerald-400">
                    Nuestros servicios
                  </a>
                </li>
                <li>
                  <a href="#preguntas" className="hover:text-emerald-400">
                    Preguntas frecuentes
                  </a>
                </li>
              </ul>
            </div>

            {/* Contacto */}
            <div>
              <h3 className="text-sm font-semibold">Contacto</h3>
              <ul className="mt-3 space-y-1 text-sm text-neutral-300">
                <li>📞 +56 9 9151 3393</li>
                <li>📍 Santiago, Chile</li>
                <li>
                  💬{" "}
                  <button
                    onClick={handleSimpleWhatsAppClick}
                    className="underline decoration-emerald-500/70 underline-offset-4 hover:text-emerald-400"
                  >
                    WhatsApp
                  </button>
                </li>
                <li>
                  📷{" "}
                  <a
                    href="https://www.instagram.com/safereturn.of?igsh=c2hoMWNxOGlraWJh&utm_source=qr"
                    target="_blank"
                    className="underline decoration-emerald-500/70 underline-offset-4 hover:text-emerald-400"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <p className="mt-10 text-center text-xs text-neutral-500">
            © {new Date().getFullYear()} SafeReturn. Todos los derechos reservados.
          </p>
        </section>
      </div>
    </main>
  );
}
