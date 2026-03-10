import { useState } from "react";
import { useNavigate } from "react-router";
import { PanelLayout } from "../../components/PanelLayout";
import { clienteNav } from "./ClienteDashboard";
import { RESERVAS, TIQUETES, PAQUETES } from "../../data/mockData";
import { Eye, Plus, X, Plane, Package, Ticket, Search } from "lucide-react";

const myReservas = RESERVAS.filter((r) => r.id_cliente === 1 || r.id_cliente === 11);

export function ClienteReservas() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<typeof RESERVAS[0] | null>(null);
  const [filterEstado, setFilterEstado] = useState("");

  const filtered = myReservas.filter((r) => !filterEstado || r.estado === filterEstado);

  return (
    <PanelLayout role="cliente" userName="Carlos Andrés Ramírez" userRole="Cliente" navItems={clienteNav}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-gray-800 mb-0.5">Mis reservas</h2>
            <p className="text-gray-400 text-sm">{filtered.length} reserva{filtered.length !== 1 ? "s" : ""} encontrada{filtered.length !== 1 ? "s" : ""}</p>
          </div>
          <button onClick={() => navigate("/cliente/buscar")}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" /> Nueva reserva
          </button>
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-5 flex-wrap">
          {["", "Confirmada", "Reservada", "Cancelada", "Expirada"].map((e) => (
            <button key={e} onClick={() => setFilterEstado(e)}
              className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${
                filterEstado === e ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-600 border-gray-300 hover:border-blue-400"
              }`}>
              {e || "Todos"}
            </button>
          ))}
        </div>

        {/* Reservations list */}
        <div className="space-y-3">
          {filtered.map((r) => (
            <div key={r.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-all">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="text-xs font-semibold text-[#C8102E] shrink-0">Terra Sky</div>
                  <div>
                    <div className="font-semibold text-gray-900">{r.vuelo}</div>
                    <div className="text-xs text-gray-400">{r.codigo} · Reservado el {r.fecha}</div>
                    {r.paquetes.length > 0 && (
                      <div className="flex items-center gap-1 mt-1">
                        <Package className="w-3 h-3 text-purple-500" />
                        <span className="text-xs text-purple-600">{r.paquetes.join(", ")}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="font-bold text-gray-900">${r.valor} COP</div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      r.estado === "Confirmada" ? "bg-green-100 text-green-700" :
                      r.estado === "Reservada" ? "bg-yellow-100 text-yellow-700" :
                      r.estado === "Cancelada" ? "bg-red-100 text-red-700" :
                      "bg-gray-100 text-gray-600"
                    }`}>{r.estado}</span>
                  </div>
                  <button onClick={() => setSelected(r)} className="p-2 border border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-colors">
                    <Eye className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <Search className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No tienes reservas con ese estado</p>
          </div>
        )}

        {/* Detail modal */}
        {selected && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <h3 className="text-gray-900">Detalle de reserva</h3>
                <button onClick={() => setSelected(null)} className="p-1.5 rounded-lg hover:bg-gray-100"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-5 space-y-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-xs font-semibold text-[#C8102E]">Terra Sky</div>
                    <div>
                      <div className="font-bold text-gray-900">{selected.vuelo}</div>
                      <div className="text-xs text-gray-400">{selected.codigo}</div>
                    </div>
                    <span className={`ml-auto text-xs px-2 py-1 rounded-full ${
                      selected.estado === "Confirmada" ? "bg-green-100 text-green-700" :
                      selected.estado === "Reservada" ? "bg-yellow-100 text-yellow-700" :
                      "bg-red-100 text-red-700"
                    }`}>{selected.estado}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div><div className="text-xs text-gray-400">Fecha reserva</div><div className="font-medium">{selected.fecha}</div></div>
                    <div><div className="text-xs text-gray-400">Valor total</div><div className="font-bold text-[#C8102E]">${selected.valor} COP</div></div>
                  </div>
                </div>

                {/* Tickets */}
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Ticket className="w-4 h-4" /> Tiquetes
                  </div>
                  {TIQUETES.filter((t) => t.id_reserva === selected.id).map((t) => (
                    <div key={t.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl mb-2">
                      <div>
                        <div className="text-sm font-medium">{t.pasajero}</div>
                        <div className="text-xs text-gray-400">Asiento {t.asiento} · {t.clase}</div>
                      </div>
                      <div className="font-bold text-sm">${t.precio} COP</div>
                    </div>
                  ))}
                </div>

                {/* Packages */}
                {selected.paquetes.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <Package className="w-4 h-4" /> Paquetes incluidos
                    </div>
                    {selected.paquetes.map((p) => (
                      <div key={p} className="flex items-center gap-2 p-3 bg-purple-50 rounded-xl mb-2">
                        <Package className="w-4 h-4 text-purple-500" />
                        <span className="text-sm text-purple-700">{p}</span>
                      </div>
                    ))}
                  </div>
                )}

                {selected.estado === "Confirmada" && (
                  <button onClick={() => { setSelected(null); navigate("/checkin"); }}
                    className="w-full bg-blue-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                    <Plane className="w-4 h-4" /> Hacer check-in
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </PanelLayout>
  );
}



