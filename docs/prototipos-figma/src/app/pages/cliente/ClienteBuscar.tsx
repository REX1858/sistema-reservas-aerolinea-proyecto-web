import { useNavigate } from "react-router";
import { PanelLayout } from "../../components/PanelLayout";
import { clienteNav } from "./ClienteDashboard";
import { SearchForm } from "../../components/SearchForm";
import { VUELOS } from "../../data/mockData";
import { PlaneTakeoff, PlaneLanding, Clock, ArrowRight } from "lucide-react";

const upcoming = VUELOS.filter((v) => v.estado === "Programado").slice(0, 4);

export function ClienteBuscar() {
  const navigate = useNavigate();

  return (
    <PanelLayout role="cliente" userName="Carlos Andrés Ramírez" userRole="Cliente" navItems={clienteNav}>
      <div className="max-w-5xl mx-auto">
        <div className="mb-5">
          <h2 className="text-gray-800 mb-0.5">Buscar vuelos</h2>
          <p className="text-gray-400 text-sm">Encuentra el mejor vuelo para tu próximo viaje</p>
        </div>

        {/* Search form */}
        <div className="mb-8">
          <SearchForm />
        </div>

        {/* Suggested flights */}
        <div>
          <h3 className="text-gray-700 mb-4">Vuelos disponibles próximamente</h3>
          <div className="space-y-3">
            {upcoming.map((v) => (
              <div key={v.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-xs font-semibold text-[#C8102E]">Terra Sky</div>
                  <div>
                    <div className="font-semibold text-gray-900">{v.codigo}</div>
                    <div className="text-xs text-gray-400">{v.aeronave}</div>
                  </div>
                </div>

                <div className="flex flex-1 items-center gap-4 justify-center">
                  <div className="text-center">
                    <div className="font-bold text-gray-900 text-lg">{v.salida.split(" ")[1]}</div>
                    <div className="text-xs text-gray-400">{v.origen.split("(")[1]?.replace(")", "")}</div>
                    <div className="text-xs text-gray-500">{v.origen.split(" (")[0]}</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1 w-24">
                      <div className="h-px bg-gray-300 flex-1" />
                      <PlaneTakeoff className="w-4 h-4 text-[#C8102E]" />
                      <div className="h-px bg-gray-300 flex-1" />
                    </div>
                    <div className="text-xs text-gray-400 mt-1">Directo</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-gray-900 text-lg">{v.llegada.split(" ")[1]}</div>
                    <div className="text-xs text-gray-400">{v.destino.split("(")[1]?.replace(")", "")}</div>
                    <div className="text-xs text-gray-500">{v.destino.split(" (")[0]}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <div className="text-xs text-gray-400">desde</div>
                    <div className="font-bold text-[#C8102E] text-lg">${v.precio} COP</div>
                    <div className="text-xs text-gray-400">Cap: {v.capacidad} pax</div>
                  </div>
                  <button onClick={() => navigate("/resultados")}
                    className="bg-[#C8102E] text-white px-4 py-2 rounded-xl text-sm hover:bg-[#A50D25] transition-colors flex items-center gap-1">
                    Ver <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PanelLayout>
  );
}



