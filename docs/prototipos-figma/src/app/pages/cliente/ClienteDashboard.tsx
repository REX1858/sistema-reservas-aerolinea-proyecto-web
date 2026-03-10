import { useNavigate } from "react-router";
import { PanelLayout, NavItem } from "../../components/PanelLayout";
import { RESERVAS, TIQUETES } from "../../data/mockData";
import {
  LayoutDashboard, Search, BookOpen, Package, Clock, User,
  Plane, CheckCircle, XCircle, ArrowRight, Star,
} from "lucide-react";

export const clienteNav: NavItem[] = [
  { label: "Dashboard", href: "/cliente", icon: LayoutDashboard },
  { label: "Buscar vuelos", href: "/cliente/buscar", icon: Search },
  { label: "Mis reservas", href: "/cliente/reservas", icon: BookOpen },
  { label: "Paquetes turísticos", href: "/cliente/paquetes", icon: Package },
  { label: "Historial de viajes", href: "/cliente/historial", icon: Clock },
  { label: "Mi perfil", href: "/cliente/perfil", icon: User },
];

const myReservas = RESERVAS.filter((r) => r.id_cliente === 1);
const myTiquetes = TIQUETES.filter((t) => t.id_reserva === 1);

export function ClienteDashboard() {
  const navigate = useNavigate();

  const stats = [
    { label: "Mis reservas", value: myReservas.length, icon: BookOpen, color: "bg-blue-50 text-blue-600" },
    { label: "Vuelos confirmados", value: myReservas.filter((r) => r.estado === "Confirmada").length, icon: CheckCircle, color: "bg-green-50 text-green-600" },
    { label: "Tiquetes activos", value: myTiquetes.length, icon: Plane, color: "bg-purple-50 text-purple-600" },
    { label: "Millas acumuladas", value: "4.250", icon: Star, color: "bg-yellow-50 text-yellow-600" },
  ];

  return (
    <PanelLayout role="cliente" userName="Carlos Andrés Ramírez" userRole="Cliente" navItems={clienteNav}>
      <div className="max-w-5xl mx-auto">
        {/* Welcome */}
        <div className="mb-6">
          <h2 className="text-gray-800 mb-1">¡Hola, Carlos! 👋</h2>
          <p className="text-gray-500 text-sm">Bienvenido a tu panel de viajero. Aquí puedes gestionar todas tus reservas.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>
                <s.icon className="w-5 h-5" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{s.value}</div>
              <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Upcoming flight */}
        <div className="bg-gradient-to-r from-[#1E40AF] to-[#1D4ED8] rounded-2xl p-6 text-white mb-6">
          <p className="text-white/70 text-xs uppercase tracking-wider mb-1">Próximo vuelo</p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-white text-xl">Bogotá → Madrid</h3>
              <p className="text-white/70 text-sm mt-0.5">AN1042 · 15 Mar 2026 · 22:30 h · Asiento 14C</p>
              <span className="inline-block mt-2 bg-white/20 text-white text-xs px-3 py-1 rounded-full">Confirmado</span>
            </div>
            <div className="flex gap-3">
              <button onClick={() => navigate("/checkin")} className="bg-white text-blue-700 text-sm px-4 py-2 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
                Check-in
              </button>
              <button onClick={() => navigate("/cliente/reservas")} className="border border-white/40 text-white text-sm px-4 py-2 rounded-xl hover:bg-white/15 transition-colors">
                Ver detalles
              </button>
            </div>
          </div>
        </div>

        {/* My reservations */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-800">Mis reservas recientes</h3>
            <button onClick={() => navigate("/cliente/reservas")} className="text-xs text-blue-600 hover:underline flex items-center gap-1">
              Ver todas <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-3">
            {myReservas.map((r) => (
              <div key={r.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors cursor-pointer" onClick={() => navigate("/cliente/reservas")}>
                <div className="flex items-center gap-3">
                  <div className="text-xs font-semibold text-[#C8102E] shrink-0">Terra Sky</div>
                  <div>
                    <div className="text-sm font-semibold text-gray-800">{r.vuelo}</div>
                    <div className="text-xs text-gray-400">{r.codigo} · {r.fecha}</div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-sm font-bold text-gray-900">${r.valor} COP</div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    r.estado === "Confirmada" ? "bg-green-100 text-green-700" :
                    r.estado === "Reservada" ? "bg-yellow-100 text-yellow-700" :
                    "bg-red-100 text-red-700"
                  }`}>{r.estado}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Buscar vuelos", sub: "Encuentra tu próximo destino", icon: Search, href: "/cliente/buscar", color: "bg-blue-600" },
            { label: "Ver paquetes", sub: "Vuelo + hotel todo incluido", icon: Package, href: "/cliente/paquetes", color: "bg-purple-600" },
            { label: "Mi perfil", sub: "Actualiza tus datos", icon: User, href: "/cliente/perfil", color: "bg-gray-700" },
          ].map((a) => (
            <button key={a.label} onClick={() => navigate(a.href)}
              className={`${a.color} text-white rounded-2xl p-5 text-left hover:opacity-90 transition-opacity`}>
              <a.icon className="w-6 h-6 mb-3 opacity-80" />
              <div className="font-semibold text-sm">{a.label}</div>
              <div className="text-xs opacity-70 mt-0.5">{a.sub}</div>
            </button>
          ))}
        </div>
      </div>
    </PanelLayout>
  );
}



