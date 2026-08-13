import Image from "next/image";
import Link from "next/link";

const terminos = [
  {
    title: "1. Ámbito del servicio",
    content:
      "SafeReturn ofrece traslados privados y servicio de conductor de reemplazo para trayectos previamente coordinados. No somos una aplicación de viajes instantáneos ni un medio de transporte público.",
  },
  {
    title: "2. Reserva y disponibilidad",
    content:
      "Todas las solicitudes están sujetas a disponibilidad de conductor. La reserva se considera confirmada solo cuando es respondida y aceptada por WhatsApp por parte de SafeReturn.",
  },
  {
    title: "3. Documentación del vehículo",
    content:
      "Aplica solo para Conducción de reemplazo: el cliente garantiza que su vehículo cuenta con permiso de circulación, revisión técnica y seguro obligatorio (SOAP) vigentes. SafeReturn se reserva el derecho de rechazar el servicio si el vehículo no cumple con la documentación exigida por la ley. Para Viaje privado y Traslado aeropuerto, la documentación del vehículo utilizado es responsabilidad de SafeReturn o del conductor asignado, según corresponda.",
  },
  {
    title: "4. Tarifas y cotizaciones",
    content:
      "La tarifa depende de la distancia, el horario, el tipo de servicio, la cantidad de paradas y las direcciones entregadas. Las cotizaciones pueden ajustarse si se modifican la ruta, los horarios o la información inicial.",
  },
  {
    title: "5. Medios de pago",
    content:
      "El servicio se paga mediante tarjeta de crédito o débito, a través de los medios de pago habilitados por SafeReturn. No se aceptan pagos en efectivo directamente al conductor.",
  },
  {
    title: "6. Combustible y peajes",
    content:
      "En Conducción de reemplazo, el vehículo es del cliente: el combustible y los peajes de autopista (TAG) corren por su cuenta, ya que se generan directamente en su propio vehículo durante el trayecto. En Viaje privado y Traslado aeropuerto, el combustible y los peajes están incluidos dentro del valor cotizado.",
  },
  {
    title: "7. Cambios y modificaciones",
    content:
      "Cualquier cambio (horario, origen/destino, paradas, pasajeros adicionales, etc.) debe informarse por WhatsApp. El valor del servicio puede variar según el nuevo recorrido o condiciones.",
  },
  {
    title: "8. Política de cancelación y reembolso",
    content:
      "Si se cancela con al menos 24 horas de anticipación, el reembolso es del 100%. Si se cancela entre 12 y 24 horas antes del servicio, el reembolso es del 50%. Si se cancela con menos de 12 horas o el pasajero no se presenta, no corresponde reembolso.",
  },
  {
    title: "9. Puntualidad y tiempos de espera",
    content:
      "El conductor esperará un tiempo razonable en el punto de encuentro. Después de ese plazo, podría cobrarse tiempo adicional o considerarse el viaje cancelado según las condiciones informadas al cliente.",
  },
  {
    title: "10. Seguridad y comportamiento",
    content:
      "No se permite fumar, consumir drogas o mantener conductas que pongan en riesgo la seguridad. El conductor puede dar por terminado el servicio si hay comportamiento inadecuado o agresivo.",
  },
  {
    title: "11. Pasajeros menores de edad",
    content:
      "Los pasajeros menores de 18 años deben viajar siempre acompañados de un adulto responsable. SafeReturn no presta servicios a menores de edad no acompañados.",
  },
  {
    title: "12. Responsabilidad ante accidentes de tránsito",
    content:
      "En Conducción de reemplazo, ante un accidente de tránsito durante el servicio, se aplicará en primer lugar el seguro obligatorio (SOAP) y el seguro particular del vehículo del cliente, si lo tuviese contratado. En Viaje privado y Traslado aeropuerto, aplicará el seguro correspondiente al vehículo dispuesto para el servicio. En ambos casos, SafeReturn colaborará en la gestión del siniestro, pero no se hace responsable de daños que excedan la cobertura de dichos seguros, salvo negligencia comprobada del conductor asignado.",
  },
  {
    title: "13. Multas de tránsito",
    content:
      "Las infracciones cursadas durante el trayecto por responsabilidad directa del conductor serán asumidas por SafeReturn. En Conducción de reemplazo, las infracciones asociadas a condiciones previas del vehículo del cliente (documentos vencidos, fallas mecánicas, etc.) son responsabilidad de este último.",
  },
  {
    title: "14. Daños y limpieza del vehículo",
    content:
      "El pasajero será responsable de los daños o de la necesidad de limpieza especial del vehículo utilizado durante el servicio —ya sea el vehículo propio del cliente en Conducción de reemplazo, o el vehículo dispuesto por SafeReturn en Viaje privado y Traslado aeropuerto— cuando sean ocasionados por su conducta.",
  },
  {
    title: "15. Objetos olvidados",
    content:
      "SafeReturn no se hace responsable por objetos olvidados dentro del vehículo durante el servicio. En caso de encontrarlos, el conductor informará al cliente para coordinar su devolución, sujeto a disponibilidad.",
  },
  {
    title: "16. Privacidad y uso de datos",
    content:
      "Los datos del cliente se utilizan solo para coordinar el servicio a través de WhatsApp y registro interno básico. El conductor asignado también tendrá acceso a los datos necesarios del viaje (nombre de contacto, teléfono y direcciones) para poder prestarlo. No se comparten datos con terceros para fines comerciales.",
  },
  {
    title: "17. Fuerza mayor y reprogramaciones",
    content:
      "SafeReturn podrá reprogramar o cancelar un servicio ante situaciones de fuerza mayor (accidentes, cortes de ruta, problemas climáticos u otros eventos externos). En esos casos, se coordinará con el cliente la mejor alternativa posible.",
  },
  {
    title: "18. Modificación de estos términos",
    content:
      "SafeReturn podrá actualizar estos términos y condiciones en cualquier momento. Los cambios se entenderán vigentes desde su publicación en este sitio web.",
  },
  {
    title: "19. Ley aplicable y jurisdicción",
    content:
      "Estos términos se rigen por las leyes de la República de Chile. Cualquier controversia derivada del servicio será sometida a los tribunales competentes de Santiago.",
  },
];

export default function TerminosPage() {
  return (
    <main className="min-h-screen bg-navy-deep text-cream">
      <header className="sticky top-0 z-30 border-b border-cream/10 bg-gradient-to-b from-navy-deep/90 to-navy-deep/70 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4 md:px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-9 w-9 overflow-hidden rounded-xl">
              <Image src="/logo-safereturn.png" alt="SafeReturn logo" fill className="object-cover" sizes="36px" />
            </div>
            <span className="text-lg font-semibold">
              <span className="font-bold">Safe</span>Return
            </span>
          </Link>
          <Link href="/" className="text-sm text-celeste hover:underline">
            ← Volver al inicio
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-14 md:px-6">
        <h1 className="text-center font-serif text-3xl font-bold md:text-4xl">Términos y condiciones</h1>
        <p className="mt-3 text-center text-cream/70">
          Última actualización: {new Date().toLocaleDateString("es-CL", { year: "numeric", month: "long", day: "numeric" })}
        </p>
        <p className="mt-6 text-sm text-cream/70 leading-relaxed max-w-2xl text-justify mx-auto">
          Al agendar y utilizar cualquiera de los servicios de SafeReturn (conducción de reemplazo,
          viaje privado o traslado aeropuerto), el cliente declara haber leído, entendido y aceptado
          en su totalidad los siguientes términos y condiciones.
        </p>

        <div className="mt-10 space-y-4">
          {terminos.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-cream/10 bg-navy/60 px-6 py-5 shadow-lg shadow-black/40 transition-all duration-300 hover:-translate-y-1 hover:border-celeste/50 hover:shadow-[0_0_45px_rgba(79,195,236,0.2)]"
            >
              <h2 className="font-semibold text-cream">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-cream/75 text-justify">{item.content}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-cream/40">
          Matías Nicolás Naranjo Luna Transporte y Servicios E.I.R.L. — RUT 78.469.724-K
          <br />
          Santiago, Chile.
        </p>
      </div>
    </main>
  );
}
