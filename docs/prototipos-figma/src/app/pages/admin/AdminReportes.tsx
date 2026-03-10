import { PanelLayout } from "../../components/PanelLayout";
import { adminNav } from "./AdminDashboard";
import { RESERVAS, VUELOS, CLIENTES, TIQUETES, STATS } from "../../data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

const revenueData = [
  { mes: "Oct", ingresos: 6200 }, { mes: "Nov", ingresos: 7800 }, { mes: "Dic", ingresos: 9100 },
  { mes: "Ene", ingresos: 5400 }, { mes: "Feb", ingresos: 8300 }, { mes: "Mar", ingresos: 9423 },
];

const reservasByState = [
  { name: "Confirmada", value: RESERVAS.filter((r) => r.estado === "Confirmada").length, color: "#22c55e" },
  { name: "Reservada", value: RESERVAS.filter((r) => r.estado === "Reservada").length, color: "#eab308" },
  { name: "Cancelada", value: RESERVAS.filter((r) => r.estado === "Cancelada").length, color: "#ef4444" },
  { name: "Expirada", value: RESERVAS.filter((r) => r.estado === "Expirada").length, color: "#6b7280" },
];

const flightsByRoute = [
  { ruta: "BOG→MAD", vuelos: 3 }, { ruta: "MDE→BOG", vuelos: 2 }, { ruta: "BOG→CTG", vuelos: 2 },
  { ruta: "BOG→EZE", vuelos: 1 }, { ruta: "JFK→BOG", vuelos: 1 }, { ruta: "BOG→LIM", vuelos: 1 },
];

const clasesData = [
  { clase: "Económica", tiquetes: TIQUETES.filter((t) => t.clase === "Económica").length },
  { clase: "Ejecutiva", tiquetes: TIQUETES.filter((t) => t.clase === "Ejecutiva").length },
  { clase: "Primera", tiquetes: 0 },
];

export function AdminReportes() {
  const totalIngresos = RESERVAS.filter((r) => r.estado === "Confirmada").reduce((s, r) => s + r.valor, 0);
  const ticketPromedio = Math.round(totalIngresos / (TIQUETES.length || 1));

  return (
    <PanelLayout role="admin" userName="Admin Sistema" userRole="Súper Administrador" navItems={adminNav}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-5">
          <h2 className="text-gray-800 mb-0.5">Reportes comerciales y operativos</h2>
          <p className="text-gray-400 text-sm">Período: Octubre 2025 – Marzo 2026</p>
        </div>

        {/* Summary KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Ingresos totales", value: `$${totalIngresos.toLocaleString()} COP`, color: "text-green-700" },
            { label: "Ticket promedio", value: `$${ticketPromedio} COP`, color: "text-blue-700" },
            { label: "Tasa de confirmación", value: `${Math.round((RESERVAS.filter((r) => r.estado === "Confirmada").length / RESERVAS.length) * 100)}%`, color: "text-indigo-700" },
            { label: "Tasa de cancelación", value: `${Math.round((RESERVAS.filter((r) => r.estado === "Cancelada").length / RESERVAS.length) * 100)}%`, color: "text-red-600" },
          ].map((k) => (
            <div key={k.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className={`text-2xl font-bold mb-1 ${k.color}`}>{k.value}</div>
              <div className="text-xs text-gray-400">{k.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          {/* Revenue chart */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-gray-800 mb-4">Ingresos mensuales (COP)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v) => [`$${v.toLocaleString()}`, "Ingresos"]} />
                <Line type="monotone" dataKey="ingresos" stroke="#4F46E5" strokeWidth={2} dot={{ fill: "#4F46E5", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Reservation status pie */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-gray-800 mb-4">Estado de reservas</h3>
            <div className="flex items-center gap-4">
              <ResponsiveContainer width="60%" height={180}>
                <PieChart>
                  <Pie data={reservasByState} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" paddingAngle={3}>
                    {reservasByState.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-col gap-2">
                {reservasByState.map((d) => (
                  <div key={d.name} className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                    <span className="text-gray-600">{d.name}</span>
                    <span className="font-bold text-gray-900">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          {/* Flights by route */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-gray-800 mb-4">Vuelos por ruta</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={flightsByRoute} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                <XAxis type="number" tick={{ fontSize: 10 }} />
                <YAxis type="category" dataKey="ruta" tick={{ fontSize: 10 }} width={70} />
                <Tooltip />
                <Bar dataKey="vuelos" fill="#4F46E5" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Tickets by class */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-gray-800 mb-4">Tiquetes por clase</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={clasesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="clase" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="tiquetes" fill="#C8102E" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Table: Reservas por vuelo */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h3 className="text-gray-800">Número de reservas por vuelo</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">Vuelo</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">Ruta</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">Estado</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500">Reservas</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500">Ingresos est.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {VUELOS.map((v) => {
                  const count = RESERVAS.filter((r) => r.id_vuelo === v.id).length;
                  const ingresos = RESERVAS.filter((r) => r.id_vuelo === v.id && r.estado === "Confirmada").reduce((s, r) => s + r.valor, 0);
                  return (
                    <tr key={v.id} className="hover:bg-gray-50">
                      <td className="px-5 py-3.5 font-semibold text-gray-900">{v.codigo}</td>
                      <td className="px-5 py-3.5 text-gray-500 text-xs">{v.origen.split("(")[1]?.replace(")", "")} → {v.destino.split("(")[1]?.replace(")", "")}</td>
                      <td className="px-5 py-3.5">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${v.estado === "Programado" ? "bg-green-100 text-green-700" : v.estado === "Cancelado" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"}`}>{v.estado}</span>
                      </td>
                      <td className="px-5 py-3.5 text-right font-bold text-gray-900">{count}</td>
                      <td className="px-5 py-3.5 text-right text-green-700 font-semibold">{ingresos > 0 ? `$${ingresos.toLocaleString()}` : "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PanelLayout>
  );
}

