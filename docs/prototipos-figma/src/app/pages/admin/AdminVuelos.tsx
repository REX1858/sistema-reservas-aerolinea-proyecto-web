import { useState } from "react";
import { PanelLayout } from "../../components/PanelLayout";
import { adminNav } from "./AdminDashboard";
import { VUELOS } from "../../data/mockData";
import { Plus, Edit, Trash2, X, CheckCircle, Search, Plane } from "lucide-react";

type Vuelo = typeof VUELOS[0];

const emptyVuelo: Omit<Vuelo, "id"> = {
  codigo: "", origen: "", destino: "", salida: "", llegada: "",
  capacidad: 150, precio: 0, estado: "Programado", aeronave: "Airbus A320",
};

export function AdminVuelos() {
  const [vuelos, setVuelos] = useState(VUELOS);
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState<{ mode: "create" | "edit" | "delete"; item?: Vuelo } | null>(null);
  const [form, setForm] = useState<Omit<Vuelo, "id">>(emptyVuelo);
  const [saved, setSaved] = useState(false);

  const filtered = vuelos.filter((v) =>
    !query ||
    v.codigo.toLowerCase().includes(query.toLowerCase()) ||
    v.origen.toLowerCase().includes(query.toLowerCase()) ||
    v.destino.toLowerCase().includes(query.toLowerCase())
  );

  const handleOpen = (mode: "create" | "edit" | "delete", item?: Vuelo) => {
    setModal({ mode, item });
    if (mode === "edit" && item) setForm({ ...item });
    if (mode === "create") setForm(emptyVuelo);
    setSaved(false);
  };

  const handleSave = () => {
    if (modal?.mode === "create") {
      const id = Math.max(...vuelos.map((v) => v.id)) + 1;
      setVuelos((prev) => [...prev, { id, ...form }]);
    } else if (modal?.mode === "edit" && modal.item) {
      setVuelos((prev) => prev.map((v) => v.id === modal.item!.id ? { id: modal.item!.id, ...form } : v));
    }
    setSaved(true);
    setTimeout(() => { setSaved(false); setModal(null); }, 1200);
  };

  const handleDelete = () => {
    setVuelos((prev) => prev.filter((v) => v.id !== modal?.item?.id));
    setModal(null);
  };

  const inp = "w-full px-3 py-2.5 border border-gray-200 rounded-xl bg-gray-50 text-sm focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400";

  const estadoColors: Record<string, string> = {
    "Programado": "bg-green-100 text-green-700",
    "Abordando": "bg-blue-100 text-blue-700",
    "En vuelo": "bg-indigo-100 text-indigo-700",
    "Finalizado": "bg-gray-100 text-gray-600",
    "Cancelado": "bg-red-100 text-red-700",
  };

  return (
    <PanelLayout role="admin" userName="Admin Sistema" userRole="Súper Administrador" navItems={adminNav}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-gray-800 mb-0.5">Gestión de vuelos</h2>
            <p className="text-gray-400 text-sm">{filtered.length} vuelos en el sistema</p>
          </div>
          <button onClick={() => handleOpen("create")}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm hover:bg-indigo-700 transition-colors">
            <Plus className="w-4 h-4" /> Nuevo vuelo
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-5 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar vuelo..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-white text-sm focus:outline-none focus:border-indigo-400" />
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {["Código", "Origen → Destino", "Salida", "Capacidad", "Precio base", "Estado", ""].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((v) => (
                  <tr key={v.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-[#C8102E] rounded-lg flex items-center justify-center shrink-0">
                          <Plane className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="font-semibold text-gray-900">{v.codigo}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-gray-600">{v.origen.split("(")[1]?.replace(")", "")} → {v.destino.split("(")[1]?.replace(")", "")}</td>
                    <td className="px-5 py-3.5 text-gray-500 text-xs">{v.salida}</td>
                    <td className="px-5 py-3.5 text-gray-600">{v.capacidad} pax</td>
                    <td className="px-5 py-3.5 font-semibold text-gray-800">${v.precio} COP</td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${estadoColors[v.estado] || "bg-gray-100 text-gray-600"}`}>{v.estado}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleOpen("edit", v)} className="p-1.5 rounded-lg hover:bg-indigo-50 transition-colors" title="Editar">
                          <Edit className="w-4 h-4 text-indigo-500" />
                        </button>
                        <button onClick={() => handleOpen("delete", v)} className="p-1.5 rounded-lg hover:bg-red-50 transition-colors" title="Eliminar">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create/Edit modal */}
        {modal && modal.mode !== "delete" && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-5 border-b">
                <h3 className="text-gray-900">{modal.mode === "create" ? "Nuevo vuelo" : "Editar vuelo"}</h3>
                <button onClick={() => setModal(null)} className="p-1.5 rounded-lg hover:bg-gray-100"><X className="w-5 h-5" /></button>
              </div>
              {saved ? (
                <div className="p-8 text-center">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                  <p className="font-semibold text-gray-800">¡Guardado exitosamente!</p>
                </div>
              ) : (
                <div className="p-5 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Código de vuelo *</label>
                      <input className={inp} value={form.codigo} onChange={(e) => setForm({ ...form, codigo: e.target.value })} placeholder="AN0000" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Aeronave</label>
                      <select className={inp} value={form.aeronave} onChange={(e) => setForm({ ...form, aeronave: e.target.value })}>
                        <option>Airbus A320</option><option>Airbus A330</option><option>Boeing 787</option><option>Boeing 777</option><option>ATR 72</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Ciudad origen *</label>
                      <input className={inp} value={form.origen} onChange={(e) => setForm({ ...form, origen: e.target.value })} placeholder="Bogotá (BOG)" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Ciudad destino *</label>
                      <input className={inp} value={form.destino} onChange={(e) => setForm({ ...form, destino: e.target.value })} placeholder="Madrid (MAD)" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Fecha/hora salida *</label>
                      <input type="datetime-local" className={inp} value={form.salida.replace(" ", "T")} onChange={(e) => setForm({ ...form, salida: e.target.value.replace("T", " ") })} />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Fecha/hora llegada *</label>
                      <input type="datetime-local" className={inp} value={form.llegada.replace(" ", "T")} onChange={(e) => setForm({ ...form, llegada: e.target.value.replace("T", " ") })} />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Capacidad pasajeros</label>
                      <input type="number" className={inp} value={form.capacidad} onChange={(e) => setForm({ ...form, capacidad: Number(e.target.value) })} />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Precio base (COP)</label>
                      <input type="number" className={inp} value={form.precio} onChange={(e) => setForm({ ...form, precio: Number(e.target.value) })} />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs text-gray-500 mb-1">Estado</label>
                      <select className={inp} value={form.estado} onChange={(e) => setForm({ ...form, estado: e.target.value })}>
                        {["Programado", "Abordando", "En vuelo", "Finalizado", "Cancelado"].map((e) => <option key={e}>{e}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button onClick={() => setModal(null)} className="flex-1 border border-gray-300 text-gray-600 py-2.5 rounded-xl text-sm hover:bg-gray-50">Cancelar</button>
                    <button onClick={handleSave} disabled={!form.codigo || !form.origen || !form.destino}
                      className="flex-1 bg-indigo-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50">
                      {modal.mode === "create" ? "Crear vuelo" : "Guardar cambios"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Delete confirm */}
        {modal?.mode === "delete" && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-7 h-7 text-red-600" />
              </div>
              <h3 className="text-gray-900 mb-2">Eliminar vuelo</h3>
              <p className="text-gray-500 text-sm mb-1">¿Confirmas la eliminación del vuelo?</p>
              <p className="font-bold text-gray-800 mb-5">{modal.item?.codigo} — {modal.item?.origen.split("(")[1]?.replace(")", "")} → {modal.item?.destino.split("(")[1]?.replace(")", "")}</p>
              <div className="flex gap-3">
                <button onClick={() => setModal(null)} className="flex-1 border border-gray-300 text-gray-600 py-2.5 rounded-xl text-sm">Cancelar</button>
                <button onClick={handleDelete} className="flex-1 bg-red-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-red-700 transition-colors">Eliminar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PanelLayout>
  );
}



