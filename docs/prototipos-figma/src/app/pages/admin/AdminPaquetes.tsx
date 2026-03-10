import { useState } from "react";
import { PanelLayout } from "../../components/PanelLayout";
import { adminNav } from "./AdminDashboard";
import { PAQUETES } from "../../data/mockData";
import { Plus, Edit, Trash2, X, CheckCircle, Search, Package, MapPin } from "lucide-react";

type Paquete = typeof PAQUETES[0];

const empty: Omit<Paquete, "id"> = {
  nombre: "", descripcion: "", destino: "", precio: 0, estado: "Disponible", incluye: [],
};

export function AdminPaquetes() {
  const [paquetes, setPaquetes] = useState(PAQUETES);
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState<{ mode: "create" | "edit" | "delete"; item?: Paquete } | null>(null);
  const [form, setForm] = useState<Omit<Paquete, "id">>(empty);
  const [incluyeText, setIncluyeText] = useState("");
  const [saved, setSaved] = useState(false);

  const filtered = paquetes.filter((p) =>
    !query ||
    p.nombre.toLowerCase().includes(query.toLowerCase()) ||
    p.destino.toLowerCase().includes(query.toLowerCase())
  );

  const handleOpen = (mode: "create" | "edit" | "delete", item?: Paquete) => {
    setModal({ mode, item });
    if (mode === "edit" && item) { setForm({ ...item }); setIncluyeText(item.incluye.join("\n")); }
    if (mode === "create") { setForm(empty); setIncluyeText(""); }
    setSaved(false);
  };

  const handleSave = () => {
    const incluye = incluyeText.split("\n").map((s) => s.trim()).filter(Boolean);
    const finalForm = { ...form, incluye };
    if (modal?.mode === "create") {
      const id = Math.max(...paquetes.map((p) => p.id)) + 1;
      setPaquetes((prev) => [...prev, { id, ...finalForm }]);
    } else if (modal?.mode === "edit" && modal.item) {
      setPaquetes((prev) => prev.map((p) => p.id === modal.item!.id ? { id: modal.item!.id, ...finalForm } : p));
    }
    setSaved(true);
    setTimeout(() => { setSaved(false); setModal(null); }, 1200);
  };

  const handleDelete = () => {
    setPaquetes((prev) => prev.filter((p) => p.id !== modal?.item?.id));
    setModal(null);
  };

  const inp = "w-full px-3 py-2.5 border border-gray-200 rounded-xl bg-gray-50 text-sm focus:outline-none focus:border-indigo-400";

  return (
    <PanelLayout role="admin" userName="Admin Sistema" userRole="Súper Administrador" navItems={adminNav}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-gray-800 mb-0.5">Paquetes turísticos</h2>
            <p className="text-gray-400 text-sm">{filtered.length} paquetes en el sistema</p>
          </div>
          <button onClick={() => handleOpen("create")}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm hover:bg-indigo-700 transition-colors">
            <Plus className="w-4 h-4" /> Nuevo paquete
          </button>
        </div>

        <div className="relative mb-5 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar paquete o destino..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-white text-sm focus:outline-none focus:border-indigo-400" />
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                  <Package className="w-5 h-5 text-indigo-600" />
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${p.estado === "Disponible" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                  {p.estado}
                </span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">{p.nombre}</h4>
              <p className="text-xs text-gray-500 mb-2">{p.descripcion}</p>
              <div className="flex items-center gap-1 text-xs text-gray-400 mb-3">
                <MapPin className="w-3 h-3" /> {p.destino}
              </div>
              <ul className="space-y-1 mb-4">
                {p.incluye.map((item) => (
                  <li key={item} className="text-xs text-gray-500 flex items-center gap-1.5">
                    <div className="w-1 h-1 rounded-full bg-indigo-400 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="font-bold text-indigo-700">${p.precio} COP</div>
                <div className="flex gap-1">
                  <button onClick={() => handleOpen("edit", p)} className="p-1.5 rounded-lg hover:bg-indigo-50"><Edit className="w-4 h-4 text-indigo-500" /></button>
                  <button onClick={() => handleOpen("delete", p)} className="p-1.5 rounded-lg hover:bg-red-50"><Trash2 className="w-4 h-4 text-red-500" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {modal && modal.mode !== "delete" && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-5 border-b">
                <h3 className="text-gray-900">{modal.mode === "create" ? "Nuevo paquete" : "Editar paquete"}</h3>
                <button onClick={() => setModal(null)} className="p-1.5 rounded-lg hover:bg-gray-100"><X className="w-5 h-5" /></button>
              </div>
              {saved ? (
                <div className="p-8 text-center">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                  <p className="font-semibold text-gray-800">¡Guardado exitosamente!</p>
                </div>
              ) : (
                <div className="p-5 space-y-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Nombre del paquete *</label>
                    <input className={inp} value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Descripción</label>
                    <textarea className={`${inp} resize-none h-20`} value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Destino *</label>
                      <input className={inp} value={form.destino} onChange={(e) => setForm({ ...form, destino: e.target.value })} placeholder="Ciudad" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Precio (COP)</label>
                      <input type="number" className={inp} value={form.precio} onChange={(e) => setForm({ ...form, precio: Number(e.target.value) })} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">¿Qué incluye? (un ítem por línea)</label>
                    <textarea className={`${inp} resize-none h-24`} value={incluyeText} onChange={(e) => setIncluyeText(e.target.value)} placeholder={"3 noches hotel 4★\nDesayuno incluido\nTraslado aeropuerto"} />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Estado</label>
                    <select className={inp} value={form.estado} onChange={(e) => setForm({ ...form, estado: e.target.value })}>
                      <option>Disponible</option><option>No disponible</option>
                    </select>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button onClick={() => setModal(null)} className="flex-1 border border-gray-300 text-gray-600 py-2.5 rounded-xl text-sm">Cancelar</button>
                    <button onClick={handleSave} disabled={!form.nombre || !form.destino}
                      className="flex-1 bg-indigo-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50 transition-colors">
                      {modal.mode === "create" ? "Crear paquete" : "Guardar cambios"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {modal?.mode === "delete" && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"><Trash2 className="w-7 h-7 text-red-600" /></div>
              <h3 className="text-gray-900 mb-2">Eliminar paquete</h3>
              <p className="font-bold text-gray-800 mb-5">{modal.item?.nombre}</p>
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

