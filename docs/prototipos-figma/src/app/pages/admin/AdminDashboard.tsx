import { useNavigate } from "react-router";
import { PanelLayout, NavItem } from "../../components/PanelLayout";
import { STATS, RESERVAS, VUELOS } from "../../data/mockData";
import {
  Plane, Users, BookOpen, Package, BarChart3, Settings,
  TrendingUp, AlertCircle, CheckCircle, ArrowRight, DollarSign,
} from "lucide-react";

export const adminNav: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: BarChart3 },
  { label: "Gestión de vuelos", href: "/admin/vuelos", icon: Plane },
  { label: "Gestión de clientes", href: "/admin/clientes", icon: Users },
  { label: "Paquetes turísticos", href: "/admin/paquetes", icon: Package },
  { label: "Destinos", href: "/admin/destinos", icon: Settings },
  { label: "Reportes", href: "/admin/reportes", icon: BarChart3 },
];

const recentReservas = RESERVAS.slice(0, 5);
const canceledFlights = VUELOS.filter((v) => v.estado === "Cancelado");

export function AdminDashboard() {
  const navigate = useNavigate();

  const kpis = [
    { label: "Total reservas", value: STATS.total_reservas, icon: BookOpen, color: "text-indigo-600", bg: "bg-indigo-50", change: "+12% mes", up: true },
    { label: "Ingresos del mes", value: `$${STATS.ingresos_mes.toLocaleString()}`, icon: DollarSign, color: "text-green-600", bg: "bg-green-50", change: "+8% mes", up: true },
    { label: "Clientes activos", value: STATS.clientes_activos, icon: Users, color: "text-blue-600", bg: "bg-blue-50", change: "+5 nuevos", up: true },
    { label: "Vuelos activos", value: STATS.vuelos_activos, icon: Plane, color: "text-purple-600", bg: "bg-purple-50", change: "2 cancelados", up: false },
    { label: "Tiquetes vendidos", value: STATS.tiquetes_vendidos, icon: BookOpen, color: "text-orange-600", bg: "bg-orange-50", change: "+15% mes", up: true },
    { label: "Paquetes vendidos", value: STATS.paquetes_vendidos, icon: Package, color: "text-pink-600", bg: "bg-pink-50", change: "+3 hoy", up: true },
  ];

  return (
    <PanelLayout role="admin" userName="Admin Sistema" userRole="Súper Administrador" navItems={adminNav}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-5">
          <h2 className="text-gray-800 mb-0.5">Panel de Administración</h2>
          <p className="text-gray-400 text-sm">Vista general del sistema · {new Date().toLocaleDateString("es-CO", { dateStyle: "full" })}</p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          {kpis.map((k) => (
            <div key={k.label} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-2 ${k.bg}`}>
                <k.icon className={`w-4 h-4 ${k.color}`} />
              </div>
              <div className={`text-xl font-bold ${k.color}`}>{k.value}</div>
              <div className="text-xs text-gray-400 leading-tight mt-0.5">{k.label}</div>
              <div className={`text-xs mt-1 flex items-center gap-1 ${k.up ? "text-green-600" : "text-red-500"}`}>
                <TrendingUp className={`w-3 h-3 ${!k.up ? "rotate-180" : ""}`} />
                {k.change}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          {/* Recent reservations */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-800">Reservas recientes</h3>
              <button onClick={() => navigate("/admin/reportes")} className="text-xs text-indigo-600 hover:underline flex items-center gap-1">
                Reportes <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-2">
              {recentReservas.map((r) => (
                <div key={r.id} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl">
                  <div>
                    <div className="text-sm font-medium text-gray-800">{r.cliente}</div>
                    <div className="text-xs text-gray-400">{r.codigo} · {r.vuelo}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold">${r.valor}</div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${r.estado === "Confirmada" ? "bg-green-100 text-green-700" : r.estado === "Reservada" ? "bg-yellow-100 text-yellow-700" : r.estado === "Cancelada" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-500"}`}>
                      {r.estado}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alerts */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-gray-800 mb-4">Alertas del sistema</h3>
            <div className="space-y-3">
              {[
                { type: "warning", icon: AlertCircle, msg: `${RESERVAS.filter((r) => r.estado === "Reservada").length} reservas pendientes de confirmación`, action: () => navigate("/agente/pagos") },
                { type: "error", icon: AlertCircle, msg: `${canceledFlights.length} vuelo${canceledFlights.length !== 1 ? "s" : ""} cancelado${canceledFlights.length !== 1 ? "s" : ""} en el sistema`, action: () => navigate("/admin/vuelos") },
                { type: "success", icon: CheckCircle, msg: "Todos los sistemas operan con normalidad", action: null },
                { type: "info", icon: TrendingUp, msg: "Reporte mensual de marzo disponible", action: () => navigate("/admin/reportes") },
              ].map((a, i) => (
                <div key={i} className={`flex items-start gap-3 p-3 rounded-xl border ${
                  a.type === "warning" ? "bg-yellow-50 border-yellow-200" :
                  a.type === "error" ? "bg-red-50 border-red-200" :
                  a.type === "success" ? "bg-green-50 border-green-200" :
                  "bg-blue-50 border-blue-200"
                }`}>
                  <a.icon className={`w-4 h-4 shrink-0 mt-0.5 ${
                    a.type === "warning" ? "text-yellow-600" :
                    a.type === "error" ? "text-red-600" :
                    a.type === "success" ? "text-green-600" : "text-blue-600"
                  }`} />
                  <div className="flex-1">
                    <p className="text-xs text-gray-700">{a.msg}</p>
                    {a.action && <button onClick={a.action} className="text-xs text-indigo-600 hover:underline mt-0.5">Ver →</button>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Gestionar vuelos", icon: Plane, href: "/admin/vuelos", color: "bg-purple-600" },
            { label: "Gestionar clientes", icon: Users, href: "/admin/clientes", color: "bg-blue-600" },
            { label: "Paquetes turísticos", icon: Package, href: "/admin/paquetes", color: "bg-pink-600" },
            { label: "Ver reportes", icon: BarChart3, href: "/admin/reportes", color: "bg-indigo-600" },
          ].map((q) => (
            <button key={q.label} onClick={() => navigate(q.href)}
              className={`${q.color} text-white rounded-2xl p-4 text-left hover:opacity-90 transition-opacity`}>
              <q.icon className="w-6 h-6 mb-2 opacity-80" />
              <div className="text-sm font-semibold">{q.label}</div>
            </button>
          ))}
        </div>
      </div>
    </PanelLayout>
  );
}
