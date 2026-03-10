import { useNavigate } from "react-router";
import { PanelLayout, NavItem } from "../../components/PanelLayout";
import { RESERVAS, STATS, VUELOS } from "../../data/mockData";
import {
  BookOpen, CreditCard, Armchair, Users, Plane,
  CheckCircle, Clock, AlertCircle, TrendingUp, ArrowRight,
} from "lucide-react";

export const agenteNav: NavItem[] = [
  { label: "Dashboard", href: "/agente", icon: Plane },
  { label: "Gestión de reservas", href: "/agente/reservas", icon: BookOpen },
  { label: "Confirmación de pagos", href: "/agente/pagos", icon: CreditCard },
  { label: "Asignación de asientos", href: "/agente/asientos", icon: Armchair },
  { label: "Consulta de clientes", href: "/agente/clientes", icon: Users },
  { label: "Estado de vuelos", href: "/agente/vuelos", icon: Plane },
];

const pendientes = RESERVAS.filter((r) => r.estado === "Reservada");
const hoy = VUELOS.filter((v) => v.estado === "En vuelo" || v.estado === "Programado").slice(0, 3);

export function AgenteDashboard() {
  const navigate = useNavigate();

  const stats = [
    { label: "Reservas hoy", value: pendientes.length, icon: BookOpen, color: "bg-emerald-50 text-emerald-600", change: "+3" },
    { label: "Pagos pendientes", value: pendientes.length, icon: CreditCard, color: "bg-yellow-50 text-yellow-600", change: "urgente" },
    { label: "Vuelos activos", value: STATS.vuelos_activos, icon: Plane, color: "bg-blue-50 text-blue-600", change: "hoy" },
    { label: "Clientes atendidos", value: 12, icon: Users, color: "bg-purple-50 text-purple-600", change: "esta semana" },
  ];

  return (
    <PanelLayout role="agente" userName="María García" userRole="Agente Terra Sky" navItems={agenteNav}>
      <div className="max-w-5xl mx-auto">
        <div className="mb-5">
          <h2 className="text-gray-800 mb-0.5">Panel del Agente</h2>
          <p className="text-gray-400 text-sm">Gestiona reservas, pagos y operaciones del día</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>
                <s.icon className="w-5 h-5" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{s.value}</div>
              <div className="text-xs text-gray-400">{s.label}</div>
              <div className="text-xs text-emerald-600 mt-1">{s.change}</div>
            </div>
          ))}
        </div>

        {/* Pending reservations */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-yellow-500" />
              <h3 className="text-gray-800">Reservas pendientes de confirmar</h3>
              <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5 rounded-full">{pendientes.length}</span>
            </div>
            <button onClick={() => navigate("/agente/reservas")} className="text-xs text-emerald-600 hover:underline flex items-center gap-1">
              Ver todas <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-2">
            {pendientes.slice(0, 4).map((r) => (
              <div key={r.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-xl border border-yellow-100">
                <div className="flex items-center gap-3">
                  <div className="text-xs font-semibold text-[#C8102E] shrink-0">Terra Sky</div>
                  <div>
                    <div className="text-sm font-semibold text-gray-800">{r.cliente}</div>
                    <div className="text-xs text-gray-400">{r.codigo} · {r.vuelo}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold">${r.valor} COP</span>
                  <button onClick={() => navigate("/agente/pagos")}
                    className="bg-emerald-600 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-emerald-700 transition-colors">
                    Confirmar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active flights */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-800">Vuelos del día</h3>
            <button onClick={() => navigate("/agente/vuelos")} className="text-xs text-emerald-600 hover:underline flex items-center gap-1">
              Ver todos <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-2">
            {hoy.map((v) => (
              <div key={v.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="text-xs font-semibold text-[#C8102E]">Terra Sky</div>
                  <div>
                    <div className="text-sm font-semibold text-gray-800">{v.codigo} · {v.origen.split("(")[1]?.replace(")", "")} → {v.destino.split("(")[1]?.replace(")", "")}</div>
                    <div className="text-xs text-gray-400">{v.salida.split(" ")[1]} · {v.aeronave}</div>
                  </div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  v.estado === "En vuelo" ? "bg-blue-100 text-blue-700" :
                  v.estado === "Programado" ? "bg-green-100 text-green-700" :
                  "bg-gray-100 text-gray-600"
                }`}>{v.estado}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PanelLayout>
  );
}



