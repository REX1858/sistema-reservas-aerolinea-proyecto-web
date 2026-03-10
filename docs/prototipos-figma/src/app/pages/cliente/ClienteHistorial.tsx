import { PanelLayout } from "../../components/PanelLayout";
import { clienteNav } from "./ClienteDashboard";
import { RESERVAS, TIQUETES } from "../../data/mockData";
import { Plane, PlaneLanding, Clock, CheckCircle, XCircle } from "lucide-react";

const history = [
  ...RESERVAS.filter((r) => r.id_cliente === 1 || r.id_cliente === 11),
  RESERVAS[3],
].filter((r) => r.estado === "Confirmada" || r.estado === "Cancelada");

export function ClienteHistorial() {
  const totalViajes = history.filter((r) => r.estado === "Confirmada").length;
  const totalGastado = history.filter((r) => r.estado === "Confirmada").reduce((s, r) => s + r.valor, 0);
  const destinosVisitados = [...new Set(history.map((r) => r.vuelo.split("→")[1]?.trim()))];

  return (
    <PanelLayout role="cliente" userName="Carlos Andrés Ramírez" userRole="Cliente" navItems={clienteNav}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-5">
          <h2 className="text-gray-800 mb-0.5">Historial de viajes</h2>
          <p className="text-gray-400 text-sm">Registro completo de tus vuelos con Terra Sky</p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="text-3xl font-bold text-blue-600 mb-1">{totalViajes}</div>
            <div className="text-sm text-gray-500">Viajes completados</div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="text-3xl font-bold text-green-600 mb-1">${totalGastado.toLocaleString()}</div>
            <div className="text-sm text-gray-500">COP invertidos en viajes</div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="text-3xl font-bold text-purple-600 mb-1">{destinosVisitados.length}</div>
            <div className="text-sm text-gray-500">Destinos visitados</div>
          </div>
        </div>

        {/* History list */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h3 className="text-gray-800">Todos los vuelos</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {history.map((r) => {
              const tiquetes = TIQUETES.filter((t) => t.id_reserva === r.id);
              const isPast = r.estado === "Confirmada";
              return (
                <div key={r.id} className="px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:bg-gray-50 transition-colors">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${isPast ? "bg-green-100" : "bg-red-100"}`}>
                    {isPast ? <Plane className="w-5 h-5 text-green-600" /> : <XCircle className="w-5 h-5 text-red-500" />}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{r.vuelo}</div>
                    <div className="text-xs text-gray-400">{r.codigo} · {r.fecha}</div>
                    {tiquetes.length > 0 && (
                      <div className="text-xs text-gray-400 mt-0.5">
                        Asiento{tiquetes.length > 1 ? "s" : ""}: {tiquetes.map((t) => t.asiento).join(", ")} · {tiquetes[0].clase}
                      </div>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-bold text-gray-900">${r.valor} COP</div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${isPast ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {r.estado}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Miles bar */}
        <div className="mt-5 bg-gradient-to-r from-[#1E40AF] to-[#1D4ED8] rounded-2xl p-5 text-white">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-white/70 text-xs">Millas acumuladas</p>
              <div className="text-3xl font-bold">4.250 millas</div>
            </div>
            <div className="text-right">
              <p className="text-white/70 text-xs">Categoría actual</p>
              <span className="bg-gray-300 text-gray-800 text-sm px-3 py-1 rounded-full font-bold">Classic</span>
            </div>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full" style={{ width: "17%" }} />
          </div>
          <p className="text-white/60 text-xs mt-1.5">4.250 / 25.000 millas para nivel Plata</p>
        </div>
      </div>
    </PanelLayout>
  );
}


