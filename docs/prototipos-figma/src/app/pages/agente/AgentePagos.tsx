import { useState } from "react";
import { PanelLayout } from "../../components/PanelLayout";
import { agenteNav } from "./AgenteDashboard";
import { RESERVAS } from "../../data/mockData";
import { CreditCard, CheckCircle, X, DollarSign, Clock } from "lucide-react";

export function AgentePagos() {
  const [pagos, setPagos] = useState(
    RESERVAS.map((r) => ({
      ...r,
      metodoPago: r.estado === "Confirmada" ? "Tarjeta de crédito" : "Pendiente",
      fechaPago: r.estado === "Confirmada" ? r.fecha : null,
      comprobante: r.estado === "Confirmada" ? `COMP-${String(r.id).padStart(5, "0")}` : null,
    }))
  );
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const [metodo, setMetodo] = useState("Tarjeta de crédito");
  const [comprobante, setComprobante] = useState("");

  const pendientes = pagos.filter((p) => p.estado === "Reservada");
  const confirmados = pagos.filter((p) => p.estado === "Confirmada");

  const handleConfirm = (id: number) => {
    const fecha = new Date().toISOString().split("T")[0];
    const comp = comprobante || `COMP-${String(id).padStart(5, "0")}`;
    setPagos((prev) => prev.map((p) =>
      p.id === id ? { ...p, estado: "Confirmada", metodoPago: metodo, fechaPago: fecha, comprobante: comp } : p
    ));
    setConfirmId(null);
    setComprobante("");
  };

  return (
    <PanelLayout role="agente" userName="María García" userRole="Agente Terra Sky" navItems={agenteNav}>
      <div className="max-w-5xl mx-auto">
        <div className="mb-5">
          <h2 className="text-gray-800 mb-0.5">Confirmación de pagos</h2>
          <p className="text-gray-400 text-sm">{pendientes.length} pagos pendientes de confirmar</p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-yellow-500" />
              <div>
                <div className="text-2xl font-bold text-yellow-700">{pendientes.length}</div>
                <div className="text-xs text-yellow-600">Pagos pendientes</div>
              </div>
            </div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <div>
                <div className="text-2xl font-bold text-green-700">{confirmados.length}</div>
                <div className="text-xs text-green-600">Pagos confirmados</div>
              </div>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
            <div className="flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-blue-500" />
              <div>
                <div className="text-2xl font-bold text-blue-700">${confirmados.reduce((s, p) => s + p.valor, 0).toLocaleString()}</div>
                <div className="text-xs text-blue-600">COP recaudados</div>
              </div>
            </div>
          </div>
        </div>

        {/* Pending */}
        {pendientes.length > 0 && (
          <div className="mb-6">
            <h3 className="text-gray-700 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-yellow-500" /> Pendientes de confirmar
            </h3>
            <div className="space-y-3">
              {pendientes.map((p) => (
                <div key={p.id} className="bg-white rounded-2xl border-2 border-yellow-200 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <div className="font-semibold text-gray-900">{p.cliente}</div>
                    <div className="text-xs text-gray-400">{p.codigo} · {p.vuelo} · {p.fecha}</div>
                    {p.paquetes.length > 0 && <div className="text-xs text-purple-600 mt-0.5">+{p.paquetes.join(", ")}</div>}
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <div className="font-bold text-gray-900 text-lg">${p.valor} COP</div>
                      <div className="text-xs text-gray-400">a confirmar</div>
                    </div>
                    <button onClick={() => setConfirmId(p.id)}
                      className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm hover:bg-emerald-700 transition-colors font-semibold flex items-center gap-2">
                      <CreditCard className="w-4 h-4" /> Confirmar pago
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Confirmed */}
        <div>
          <h3 className="text-gray-700 mb-3 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" /> Pagos confirmados
          </h3>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Cliente</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Reserva</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Valor</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase hidden sm:table-cell">Método</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase hidden lg:table-cell">Comprobante</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {confirmados.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-5 py-3.5 font-medium text-gray-900">{p.cliente}</td>
                    <td className="px-5 py-3.5 text-gray-500 hidden md:table-cell">{p.codigo}</td>
                    <td className="px-5 py-3.5 font-bold text-emerald-700">${p.valor}</td>
                    <td className="px-5 py-3.5 text-gray-500 hidden sm:table-cell">{p.metodoPago}</td>
                    <td className="px-5 py-3.5 font-mono text-xs text-gray-400 hidden lg:table-cell">{p.comprobante}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Confirm modal */}
        {confirmId !== null && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-900">Confirmar pago</h3>
                <button onClick={() => setConfirmId(null)} className="p-1.5 rounded-lg hover:bg-gray-100"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Método de pago</label>
                  <select value={metodo} onChange={(e) => setMetodo(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 text-sm focus:outline-none focus:border-emerald-400">
                    <option>Tarjeta de crédito</option>
                    <option>Tarjeta débito</option>
                    <option>Transferencia bancaria</option>
                    <option>PSE</option>
                    <option>Efectivo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Número de comprobante (opcional)</label>
                  <input value={comprobante} onChange={(e) => setComprobante(e.target.value)}
                    placeholder="Se genera automáticamente"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 text-sm focus:outline-none focus:border-emerald-400" />
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setConfirmId(null)} className="flex-1 border border-gray-300 text-gray-600 py-2.5 rounded-xl text-sm">Cancelar</button>
                  <button onClick={() => handleConfirm(confirmId)}
                    className="flex-1 bg-emerald-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-emerald-700 transition-colors">
                    Confirmar pago
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PanelLayout>
  );
}

