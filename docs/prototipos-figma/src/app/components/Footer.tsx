import { Link } from "react-router";
import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin } from "lucide-react";

const footerLinks = {
  "Volar con nosotros": ["Reservar vuelo", "Check-in online", "Estado de vuelos", "Gestionar reserva", "Equipaje"],
  "Servicios": ["Vuelo + Hotel", "Alquiler de autos", "Seguros de viaje", "Salas VIP", "Asistencia especial"],
  "Sobre nosotros": ["Quiénes somos", "Flota aérea", "Sostenibilidad", "Trabaja con nosotros", "Prensa"],
};

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-[#1B4332] rounded-full flex items-center justify-center">
                <svg viewBox="0 0 40 40" className="w-6 h-6" fill="none">
                  <path d="M10 26 L20 10 L30 26 L24 26 L24 32 L16 32 L16 26 Z" fill="white"/>
                </svg>
              </div>
              <div>
                <div className="text-sm font-bold tracking-wide">TERRA</div>
                <div className="text-xs text-gray-400 tracking-widest">SKY</div>
              </div>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed mb-4">
              Tu aerolínea de confianza. Conectamos destinos con seguridad, comodidad y servicio de primera.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <button
                  key={i}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#0E7490] transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-white text-sm font-semibold mb-3">{section}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      to="#"
                      className="text-gray-400 text-xs hover:text-white transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact row */}
        <div className="border-t border-white/10 mt-10 pt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: Mail, label: "Correo electrónico", value: "contacto@terrasky.co" },
            { icon: MapPin, label: "Sede principal", value: "Bogotá, Colombia" },
          ].map((c) => (
            <div key={c.label} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <c.icon className="w-4 h-4 text-[#0E7490]" />
              </div>
              <div>
                <div className="text-xs text-gray-500">{c.label}</div>
                <div className="text-sm text-gray-300">{c.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-gray-500 text-xs">
            © 2026 Terra Sky S.A. Todos los derechos reservados.
          </p>
          <div className="flex gap-4">
            {["Términos y condiciones", "Privacidad", "Cookies"].map((t) => (
              <Link key={t} to="#" className="text-gray-500 text-xs hover:text-gray-300 transition-colors">
                {t}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

