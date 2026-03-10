import { useState } from "react";
import { useNavigate } from "react-router";
import { PanelLayout } from "../../components/PanelLayout";
import { clienteNav } from "./ClienteDashboard";
import { PAQUETES } from "../../data/mockData";
import { Package, CheckCircle, X, MapPin, ShoppingCart } from "lucide-react";

export function ClientePaquetes() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<typeof PAQUETES[0] | null>(null);
  const [added, setAdded] = useState<number[]>([]);
  const [filterDest, setFilterDest] = useState("");

  const destinos = [...new Set(PAQUETES.map((p) => p.destino))];
  const filtered = PAQUETES.filter((p) => !filterDest || p.destino === filterDest);

  const handleAdd = (id: number) => {
    setAdded((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
    setSelected(null);
  };

  return (
    <PanelLayout role="cliente" userName="Carlos Andrés Ramírez" userRole="Cliente" navItems={clienteNav}>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-gray-800 mb-0.5">Paquetes turísticos</h2>
            <p className="text-gray-400 text-sm">Agrega experiencias a tu viaje</p>
          </div>
          {added.length > 0 && (
            <button onClick={() => navigate("/cliente/reservas")}
              className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-xl text-sm hover:bg-purple-700 transition-colors">
              <ShoppingCart className="w-4 h-4" />
              {added.length} seleccionado{added.length > 1 ? "s" : ""}
            </button>
          )}
        </div>

        {/* Destination filter */}
        <div className="flex gap-2 mb-5 flex-wrap">
          <button onClick={() => setFilterDest("")}
            className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${!filterDest ? "bg-purple-600 text-white border-purple-600" : "bg-white text-gray-600 border-gray-300 hover:border-purple-400"}`}>
            Todos
          </button>
          {destinos.map((d) => (
            <button key={d} onClick={() => setFilterDest(d)}
              className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${filterDest === d ? "bg-purple-600 text-white border-purple-600" : "bg-white text-gray-600 border-gray-300 hover:border-purple-400"}`}>
              {d}
            </button>
          ))}
        </div>

        {/* Packages grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((pkg) => {
            const isAdded = added.includes(pkg.id);
            const available = pkg.estado === "Disponible";
            return (
              <div key={pkg.id} className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all hover:shadow-md ${
                isAdded ? "border-purple-300 ring-2 ring-purple-100" : "border-gray-100"
              } ${!available ? "opacity-60" : ""}`}>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isAdded ? "bg-purple-100" : "bg-gray-100"}`}>
                      <Package className={`w-5 h-5 ${isAdded ? "text-purple-600" : "text-gray-500"}`} />
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${available ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      {pkg.estado}
                    </span>
                  </div>
                  <h4 className="text-gray-900 mb-1">{pkg.nombre}</h4>
                  <p className="text-xs text-gray-500 mb-3">{pkg.descripcion}</p>

                  <div className="flex items-center gap-1 text-xs text-gray-400 mb-3">
                    <MapPin className="w-3 h-3" /> {pkg.destino}
                  </div>

                  <ul className="space-y-1 mb-4">
                    {pkg.incluye.map((item) => (
                      <li key={item} className="flex items-center gap-1.5 text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 text-green-500 shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="font-bold text-purple-600 text-lg">${pkg.precio} COP</div>
                    <div className="flex gap-2">
                      <button onClick={() => setSelected(pkg)} className="text-xs border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
                        Ver más
                      </button>
                      {available && (
                        <button onClick={() => handleAdd(pkg.id)}
                          className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${
                            isAdded ? "bg-purple-100 text-purple-700 border border-purple-300" : "bg-purple-600 text-white hover:bg-purple-700"
                          }`}>
                          {isAdded ? "✓ Agregado" : "Agregar"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detail modal */}
        {selected && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <h3 className="text-gray-900">{selected.nombre}</h3>
                <button onClick={() => setSelected(null)} className="p-1.5 rounded-lg hover:bg-gray-100"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <MapPin className="w-4 h-4 text-purple-500" /> {selected.destino}
                </div>
                <p className="text-gray-600 text-sm mb-4">{selected.descripcion}</p>
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">¿Qué incluye?</p>
                  <ul className="space-y-2">
                    {selected.incluye.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="font-bold text-purple-600 text-2xl">${selected.precio} COP</div>
                  <button onClick={() => handleAdd(selected.id)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold ${
                      added.includes(selected.id) ? "bg-gray-200 text-gray-600" : "bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                    }`}>
                    <ShoppingCart className="w-4 h-4" />
                    {added.includes(selected.id) ? "Quitar" : "Agregar a reserva"}
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

