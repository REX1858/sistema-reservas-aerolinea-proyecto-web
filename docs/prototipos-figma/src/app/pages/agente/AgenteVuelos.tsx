import { useState } from "react";
import { PanelLayout } from "../../components/PanelLayout";
import { agenteNav } from "./AgenteDashboard";
import { VUELOS } from "../../data/mockData";
import {
  Search, PlaneTakeoff, PlaneLanding, AlertCircle, CheckCircle,
  RefreshCw, Clock, Edit,
} from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  Programado: "bg-green-100 text-green-700",
  Abordando: "bg-blue-100 text-blue-700",
  "En vuelo": "bg-indigo-100 text-indigo-700",
  Finalizado: "bg-gray-100 text-gray-600",
  Cancelado: "bg-red-100 text-red-700",
};

export function AgenteVuelos() {
  const [vuelos, setVuelos] = useState(VUELOS);
  const [query, setQuery] = useState("");
  const [filterEstado, setFilterEstado] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [newEstado, setNewEstado] = useState("");

  const filtered = vuelos.filter((v) => {
    const matchQ =
      !query ||
      v.codigo.toLowerCase().includes(query.toLowerCase()) ||
      v.origen.toLowerCase().includes(query.toLowerCase()) ||
      v.destino.toLowerCase().includes(query.toLowerCase());
    const matchE = !filterEstado || v.estado === filterEstado;
    return matchQ && matchE;
  });

  const handleUpdateStatus = (id: number) => {
    setVuelos((prev) =>
      prev.map((v) => (v.id === id ? { ...v, estado: newEstado } : v))
    );
    setEditId(null);
    setNewEstado("");
  };

  const stats = [
    { label: "Programados", count: vuelos.filter((v) => v.estado === "Programado").length, color: "text-green-600", bg: "bg-green-50" },
    { label: "En vuelo", count: vuelos.filter((v) => v.estado === "En vuelo").length, color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "Finalizados", count: vuelos.filter((v) => v.estado === "Finalizado").length, color: "text-gray-600", bg: "bg-gray-50" },
    { label: "Cancelados", count: vuelos.filter((v) => v.estado === "Cancelado").length, color: "text-red-600", bg: "bg-red-50" },
  ];

  return (
    <PanelLayout role="agente" userName="María García" userRole="Agente Terra Sky" navItems={agenteNav}>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-gray-800 mb-0.5">Estado de vuelos</h2>
            <p className="text-gray-400 text-sm">{filtered.length} vuelos encontrados</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 border border-gray-300 text-gray-600 px-3 py-2 rounded-xl text-sm hover:bg-gray-50 transition-colors"
          >
            <RefreshCw className="w-4 h-4" /> Actualizar
          </button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          {stats.map((s) => (
            <div key={s.label} className={`${s.bg} rounded-2xl p-4 border border-gray-100`}>
              <div className={`text-2xl font-bold ${s.color}`}>{s.count}</div>
              <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por código, origen o destino..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-white text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {["", "Programado", "En vuelo", "Finalizado", "Cancelado"].map((e) => (
              <button
                key={e}
                onClick={() => setFilterEstado(e)}
                className={`px-3 py-2 rounded-xl text-xs border transition-colors ${
                  filterEstado === e
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : "bg-white text-gray-600 border-gray-300 hover:border-emerald-400"
                }`}
              >
                {e || "Todos"}
              </button>
            ))}
          </div>
        </div>

        {/* Flights list */}
        <div className="space-y-3">
          {filtered.map((v) => (
            <div
              key={v.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-all"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
                {/* ID + aircraft */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-xs font-semibold text-[#C8102E] shrink-0">Terra Sky</div>
                  <div>
                    <div className="font-bold text-gray-900">{v.codigo}</div>
                    <div className="text-xs text-gray-400">{v.aeronave}</div>
                  </div>
                </div>

                {/* Route */}
                <div className="flex flex-1 items-center gap-4 justify-center">
                  <div className="text-center">
                    <div className="font-bold text-gray-900 text-lg">{v.origen.split("(")[1]?.replace(")", "") ?? v.origen}</div>
                    <div className="text-xs text-gray-500">{v.origen.split(" (")[0]}</div>
                    <div className="text-xs text-gray-400">{v.salida.split(" ")[1]}</div>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex items-center gap-1 w-20">
                      <div className="h-px bg-gray-300 flex-1" />
                      <PlaneTakeoff className="w-4 h-4 text-emerald-500" />
                      <div className="h-px bg-gray-300 flex-1" />
                    </div>
                    <div className="text-xs text-gray-400">
                      {v.capacidad} pax
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-gray-900 text-lg">{v.destino.split("(")[1]?.replace(")", "") ?? v.destino}</div>
                    <div className="text-xs text-gray-500">{v.destino.split(" (")[0]}</div>
                    <div className="text-xs text-gray-400">{v.llegada.split(" ")[1]}</div>
                  </div>
                </div>

                {/* Date + status + action */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <div className="text-xs text-gray-400">{v.salida.split(" ")[0]}</div>
                    <div className="font-bold text-gray-800">${v.precio} COP</div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_COLORS[v.estado] ?? "bg-gray-100 text-gray-600"}`}>
                      {v.estado}
                    </span>
                    <button
                      onClick={() => { setEditId(v.id); setNewEstado(v.estado); }}
                      className="flex items-center gap-1 text-xs text-emerald-600 hover:text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-lg hover:bg-emerald-50 transition-colors"
                    >
                      <Edit className="w-3 h-3" /> Cambiar estado
                    </button>
                  </div>
                </div>
              </div>

              {/* Status update inline */}
              {editId === v.id && (
                <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap items-center gap-3">
                  <span className="text-xs text-gray-500">Nuevo estado:</span>
                  <select
                    value={newEstado}
                    onChange={(e) => setNewEstado(e.target.value)}
                    className="px-3 py-1.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:border-emerald-400"
                  >
                    {["Programado", "Abordando", "En vuelo", "Finalizado", "Cancelado"].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleUpdateStatus(v.id)}
                    className="flex items-center gap-1 bg-emerald-600 text-white px-4 py-1.5 rounded-xl text-xs hover:bg-emerald-700 transition-colors"
                  >
                    <CheckCircle className="w-3 h-3" /> Confirmar
                  </button>
                  <button
                    onClick={() => setEditId(null)}
                    className="text-xs text-gray-400 hover:text-gray-600"
                  >
                    Cancelar
                  </button>
                </div>
              )}

              {v.estado === "Cancelado" && (
                <div className="mt-3 flex items-center gap-2 bg-red-50 text-red-600 text-xs px-3 py-2 rounded-xl">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  Este vuelo está cancelado. Los pasajeros deben ser notificados y sus reservas gestionadas.
                </div>
              )}
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-14 bg-white rounded-2xl border border-gray-100">
              <Clock className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No hay vuelos con esa búsqueda</p>
            </div>
          )}
        </div>
      </div>
    </PanelLayout>
  );
}


