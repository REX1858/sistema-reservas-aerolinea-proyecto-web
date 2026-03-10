import { useState } from "react";
import { PanelLayout } from "../../components/PanelLayout";
import { agenteNav } from "./AgenteDashboard";
import { RESERVAS, TIQUETES } from "../../data/mockData";
import { Search, Eye, X, CheckCircle, XCircle, Filter } from "lucide-react";

export function AgenteReservas() {
  const [reservas, setReservas] = useState(RESERVAS);
  const [query, setQuery] = useState("");
  const [filterEstado, setFilterEstado] = useState("");
  const [selected, setSelected] = useState<typeof RESERVAS[0] | null>(null);
  const [confirmAction, setConfirmAction] = useState<{ id: number; action: string } | null>(null);

  const filtered = reservas.filter((r) => {
    const matchQ = !query || r.cliente.toLowerCase().includes(query.toLowerCase()) || r.codigo.toLowerCase().includes(query.toLowerCase()) || r.vuelo.toLowerCase().includes(query.toLowerCase());
    const matchE = !filterEstado || r.estado === filterEstado;
    return matchQ && matchE;
  });

  const handleAction = (id: number, newState: string) => {
    setReservas((prev) => prev.map((r) => r.id === id ? { ...r, estado: newState } : r));
    setConfirmAction(null);
    setSelected(null);
  };

  return (
    <PanelLayout role="agente" userName="María García" userRole="Agente Terra Sky" navItems={agenteNav}>
      <div className="max-w-5xl mx-auto">
        <div className="mb-5">
          <h2 className="text-gray-800 mb-0.5">Gestión de reservas</h2>
          <p className="text-gray-400 text-sm">{filtered.length} reservas encontradas</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar por cliente, código o vuelo..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-white text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {["", "Reservada", "Confirmada", "Cancelada", "Expirada"].map((e) => (
              <button key={e} onClick={() => setFilterEstado(e)}
                className={`px-3 py-2 rounded-xl text-sm border transition-colors ${filterEstado === e ? "bg-emerald-600 text-white border-emerald-600" : "bg-white text-gray-600 border-gray-300 hover:border-emerald-400"}`}>
                {e || "Todos"}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Código</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Cliente</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Vuelo</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase hidden lg:table-cell">Fecha</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Valor</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Estado</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5 font-mono text-xs text-gray-600">{r.codigo}</td>
                    <td className="px-5 py-3.5">
                      <div className="font-medium text-gray-900">{r.cliente}</div>
                    </td>
                    <td className="px-5 py-3.5 text-gray-600 hidden md:table-cell">{r.vuelo}</td>
                    <td className="px-5 py-3.5 text-gray-400 text-xs hidden lg:table-cell">{r.fecha}</td>
                    <td className="px-5 py-3.5 font-semibold text-gray-800">${r.valor}</td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        r.estado === "Confirmada" ? "bg-green-100 text-green-700" :
                        r.estado === "Reservada" ? "bg-yellow-100 text-yellow-700" :
                        r.estado === "Cancelada" ? "bg-red-100 text-red-700" :
                        "bg-gray-100 text-gray-500"
                      }`}>{r.estado}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1">
                        <button onClick={() => setSelected(r)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors" title="Ver detalle">
                          <Eye className="w-4 h-4 text-gray-500" />
                        </button>
                        {r.estado === "Reservada" && (
                          <>
                            <button onClick={() => setConfirmAction({ id: r.id, action: "Confirmada" })} className="p-1.5 rounded-lg hover:bg-green-100 transition-colors" title="Confirmar">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            </button>
                            <button onClick={() => setConfirmAction({ id: r.id, action: "Cancelada" })} className="p-1.5 rounded-lg hover:bg-red-100 transition-colors" title="Cancelar">
                              <XCircle className="w-4 h-4 text-red-500" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400 text-sm">No hay reservas con esos filtros</div>
          )}
        </div>

        {/* Detail modal */}
        {selected && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-5 border-b">
                <h3 className="text-gray-900">Detalle: {selected.codigo}</h3>
                <button onClick={() => setSelected(null)} className="p-1.5 rounded-lg hover:bg-gray-100"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {[
                    { label: "Cliente", value: selected.cliente },
                    { label: "Vuelo", value: selected.vuelo },
                    { label: "Fecha reserva", value: selected.fecha },
                    { label: "Valor total", value: `$${selected.valor} COP` },
                    { label: "Estado", value: selected.estado },
                    { label: "Paquetes", value: selected.paquetes.length > 0 ? selected.paquetes.join(", ") : "Ninguno" },
                  ].map((f) => (
                    <div key={f.label}>
                      <div className="text-xs text-gray-400">{f.label}</div>
                      <div className="font-semibold text-gray-800">{f.value}</div>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-2">Tiquetes</p>
                  {TIQUETES.filter((t) => t.id_reserva === selected.id).map((t) => (
                    <div key={t.id} className="flex justify-between text-sm p-2 bg-gray-50 rounded-lg mb-1">
                      <span>{t.pasajero} · Asiento {t.asiento} · {t.clase}</span>
                      <span className="font-semibold">${t.precio}</span>
                    </div>
                  ))}
                </div>
                {selected.estado === "Reservada" && (
                  <div className="flex gap-2 pt-2">
                    <button onClick={() => handleAction(selected.id, "Confirmada")}
                      className="flex-1 bg-emerald-600 text-white py-2.5 rounded-xl text-sm hover:bg-emerald-700 transition-colors font-semibold flex items-center justify-center gap-2">
                      <CheckCircle className="w-4 h-4" /> Confirmar reserva
                    </button>
                    <button onClick={() => handleAction(selected.id, "Cancelada")}
                      className="flex-1 bg-red-50 text-red-600 py-2.5 rounded-xl text-sm hover:bg-red-100 transition-colors font-semibold flex items-center justify-center gap-2">
                      <XCircle className="w-4 h-4" /> Cancelar
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Confirm dialog */}
        {confirmAction && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 ${confirmAction.action === "Confirmada" ? "bg-green-100" : "bg-red-100"}`}>
                {confirmAction.action === "Confirmada" ? <CheckCircle className="w-7 h-7 text-green-600" /> : <XCircle className="w-7 h-7 text-red-500" />}
              </div>
              <h3 className="text-gray-900 mb-2">{confirmAction.action === "Confirmada" ? "Confirmar reserva" : "Cancelar reserva"}</h3>
              <p className="text-gray-500 text-sm mb-5">¿Estás seguro de que deseas {confirmAction.action === "Confirmada" ? "confirmar" : "cancelar"} esta reserva?</p>
              <div className="flex gap-3">
                <button onClick={() => setConfirmAction(null)} className="flex-1 border border-gray-300 text-gray-600 py-2.5 rounded-xl text-sm hover:bg-gray-50">
                  Cancelar
                </button>
                <button onClick={() => handleAction(confirmAction.id, confirmAction.action)}
                  className={`flex-1 text-white py-2.5 rounded-xl text-sm font-semibold ${confirmAction.action === "Confirmada" ? "bg-emerald-600 hover:bg-emerald-700" : "bg-red-600 hover:bg-red-700"} transition-colors`}>
                  Sí, {confirmAction.action === "Confirmada" ? "confirmar" : "cancelar"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PanelLayout>
  );
}

