import { useState } from "react";
import { PanelLayout } from "../../components/PanelLayout";
import { agenteNav } from "./AgenteDashboard";
import { CLIENTES, RESERVAS } from "../../data/mockData";
import { Search, Eye, X, User, MapPin, Phone, Mail, BookOpen } from "lucide-react";

export function AgenteClientes() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<typeof CLIENTES[0] | null>(null);

  const filtered = CLIENTES.filter((c) =>
    !query ||
    c.nombres.toLowerCase().includes(query.toLowerCase()) ||
    c.apellidos.toLowerCase().includes(query.toLowerCase()) ||
    c.correo.toLowerCase().includes(query.toLowerCase()) ||
    c.doc.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <PanelLayout role="agente" userName="María García" userRole="Agente Terra Sky" navItems={agenteNav}>
      <div className="max-w-5xl mx-auto">
        <div className="mb-5">
          <h2 className="text-gray-800 mb-0.5">Consulta de clientes</h2>
          <p className="text-gray-400 text-sm">{filtered.length} clientes encontrados</p>
        </div>

        {/* Search */}
        <div className="relative mb-5 max-w-lg">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nombre, correo o documento..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-white text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400" />
        </div>

        {/* Client grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((c) => {
            const reservasCliente = RESERVAS.filter((r) => r.id_cliente === c.id);
            return (
              <div key={c.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {c.nombres.charAt(0)}{c.apellidos.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">{c.nombres} {c.apellidos}</div>
                      <div className="text-xs text-gray-400">{c.doc}</div>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${c.estado === "Activo" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    {c.estado}
                  </span>
                </div>
                <div className="space-y-1.5 text-xs text-gray-500 mb-3">
                  <div className="flex items-center gap-2"><Mail className="w-3 h-3 text-emerald-500 shrink-0" />{c.correo}</div>
                  <div className="flex items-center gap-2"><Phone className="w-3 h-3 text-emerald-500 shrink-0" />{c.telefono}</div>
                  <div className="flex items-center gap-2"><MapPin className="w-3 h-3 text-emerald-500 shrink-0" />{c.ciudad}, {c.pais}</div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-400">{reservasCliente.length} reserva{reservasCliente.length !== 1 ? "s" : ""}</span>
                  <button onClick={() => setSelected(c)} className="flex items-center gap-1 text-xs text-emerald-600 hover:text-emerald-700">
                    <Eye className="w-3 h-3" /> Ver detalle
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detail modal */}
        {selected && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-5 border-b">
                <h3 className="text-gray-900">Perfil del cliente</h3>
                <button onClick={() => setSelected(null)} className="p-1.5 rounded-lg hover:bg-gray-100"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-5 space-y-4">
                {/* Avatar */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {selected.nombres.charAt(0)}{selected.apellidos.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{selected.nombres} {selected.apellidos}</div>
                    <div className="text-sm text-gray-500">{selected.correo}</div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${selected.estado === "Activo" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      {selected.estado}
                    </span>
                  </div>
                </div>

                {/* Data */}
                <div className="grid grid-cols-2 gap-3 text-sm bg-gray-50 rounded-xl p-4">
                  {[
                    { label: "Documento", value: selected.doc },
                    { label: "Teléfono", value: selected.telefono },
                    { label: "País", value: selected.pais },
                    { label: "Departamento", value: selected.departamento },
                    { label: "Ciudad", value: selected.ciudad },
                    { label: "Dirección", value: "Cra 7 # 32-16" },
                  ].map((f) => (
                    <div key={f.label}>
                      <div className="text-xs text-gray-400">{f.label}</div>
                      <div className="font-medium text-gray-800">{f.value}</div>
                    </div>
                  ))}
                </div>

                {/* Reservations */}
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <BookOpen className="w-4 h-4" /> Reservas del cliente
                  </div>
                  {RESERVAS.filter((r) => r.id_cliente === selected.id).length === 0 ? (
                    <p className="text-sm text-gray-400">Sin reservas registradas</p>
                  ) : (
                    RESERVAS.filter((r) => r.id_cliente === selected.id).map((r) => (
                      <div key={r.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl mb-1.5">
                        <div>
                          <div className="text-sm font-medium text-gray-800">{r.codigo}</div>
                          <div className="text-xs text-gray-400">{r.vuelo} · {r.fecha}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold">${r.valor}</div>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${r.estado === "Confirmada" ? "bg-green-100 text-green-700" : r.estado === "Reservada" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>{r.estado}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PanelLayout>
  );
}
