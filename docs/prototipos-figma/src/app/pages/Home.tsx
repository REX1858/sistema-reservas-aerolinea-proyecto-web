import { useNavigate } from "react-router";
import { SearchForm } from "../components/SearchForm";
import { PromoSection } from "../components/PromoSection";
import { DestinationsSection } from "../components/DestinationsSection";
import { PackagesSection } from "../components/PackagesSection";
import {
  CheckCircle,
  Clock,
  ShieldCheck,
  Plane,
  PhoneCall,
} from "lucide-react";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1609180618214-5c2afa596c05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920";

const quickLinks = [
  { icon: Plane, label: "Gestionar reserva", sub: "Modifica o cancela", href: "/gestionar" },
  { icon: CheckCircle, label: "Check-in online", sub: "Hasta 1h antes", href: "/checkin" },
  { icon: Clock, label: "Estado de vuelos", sub: "En tiempo real", href: "/estado" },
];

const trustBadges = [
  { icon: ShieldCheck, label: "Pago 100% seguro", sub: "Cifrado SSL de 256 bits" },
  { icon: CheckCircle, label: "Mejor precio garantizado", sub: "O te devolvemos la diferencia" },
  { icon: Clock, label: "Soporte 24/7", sub: "Atención en cualquier momento" },
  { icon: PhoneCall, label: "Check-in gratuito", sub: "Online, en app o en aeropuerto" },
];

export function Home() {
  const navigate = useNavigate();

  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative min-h-[90vh] sm:min-h-[80vh] flex flex-col items-center justify-center overflow-visible">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt="Vuelo Terra Sky"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/75" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 flex flex-col items-center gap-8">
          <div className="text-center">
            <p className="text-white/70 text-xs sm:text-sm uppercase tracking-[0.3em] mb-3 flex items-center justify-center gap-2">
              <span className="w-8 h-px bg-white/40" />
              Terra Sky · Línea nacional
              <span className="w-8 h-px bg-white/40" />
            </p>
            <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              Conectamos Colombia contigo
            </h1>
            <p className="text-white/70 mt-4 max-w-lg mx-auto text-sm sm:text-base">
              Vuelos directos, precios incomparables y el mejor servicio en cada trayecto.
              Reserva hoy y viaja con confianza.
            </p>
          </div>

          {/* Search form */}
          <SearchForm />

          {/* Quick links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-5xl">
            {quickLinks.map((ql) => (
              <button
                key={ql.label}
                onClick={() => navigate(ql.href)}
                className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3 hover:bg-white/20 transition-colors text-left"
              >
                <div className="w-9 h-9 rounded-lg bg-[#1B4332]/75 flex items-center justify-center shrink-0">
                  <ql.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white text-xs font-semibold leading-tight">{ql.label}</div>
                  <div className="text-white/60 text-xs">{ql.sub}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust badges ── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {trustBadges.map((b) => (
              <div key={b.label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center shrink-0">
                  <b.icon className="w-5 h-5 text-[#0E7490]" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-800">{b.label}</div>
                  <div className="text-xs text-gray-400">{b.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Promos ── */}
      <PromoSection />

      {/* ── Destinos ── */}
      <DestinationsSection />

      {/* ── Paquetes ── */}
      <PackagesSection />

    </main>
  );
}
