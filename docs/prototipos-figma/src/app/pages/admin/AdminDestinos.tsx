import { useState } from "react";
import { PanelLayout } from "../../components/PanelLayout";
import { adminNav } from "./AdminDashboard";
import { MapPin, Plus, Edit, Trash2, X, CheckCircle, Search, Globe, Flag } from "lucide-react";

interface Destino {
  id: number;
  ciudad: string;
  codigoIATA: string;
  pais: string;
  departamento: string;
  activo: boolean;
  vuelosActivos: number;
}

const INITIAL_DESTINOS: Destino[] = [
  { id: 1, ciudad: "Bogotá", codigoIATA: "BOG", pais: "Colombia", departamento: "Cundinamarca", activo: true, vuelosActivos: 6 },
  { id: 2, ciudad: "Medellín", codigoIATA: "MDE", pais: "Colombia", departamento: "Antioquia", activo: true, vuelosActivos: 3 },
  { id: 3, ciudad: "Cali", codigoIATA: "CLO", pais: "Colombia", departamento: "Valle del Cauca", activo: true, vuelosActivos: 2 },
  { id: 4, ciudad: "Cartagena", codigoIATA: "CTG", pais: "Colombia", departamento: "Bolívar", activo: true, vuelosActivos: 2 },
  { id: 5, ciudad: "Barranquilla", codigoIATA: "BAQ", pais: "Colombia", departamento: "Atlántico", activo: true, vuelosActivos: 1 },
  { id: 6, ciudad: "Pereira", codigoIATA: "PEI", pais: "Colombia", departamento: "Risaralda", activo: true, vuelosActivos: 1 },
  { id: 7, ciudad: "Santa Marta", codigoIATA: "SMR", pais: "Colombia", departamento: "Magdalena", activo: true, vuelosActivos: 0 },
  { id: 8, ciudad: "Bucaramanga", codigoIATA: "BGA", pais: "Colombia", departamento: "Santander", activo: true, vuelosActivos: 0 },
  { id: 9, ciudad: "Madrid", codigoIATA: "MAD", pais: "España", departamento: "Comunidad de Madrid", activo: true, vuelosActivos: 2 },
  { id: 10, ciudad: "Barcelona", codigoIATA: "BCN", pais: "España", departamento: "Cataluña", activo: false, vuelosActivos: 0 },
  { id: 11, ciudad: "Nueva York", codigoIATA: "JFK", pais: "Estados Unidos", departamento: "Nueva York", activo: true, vuelosActivos: 1 },
  { id: 12, ciudad: "Miami", codigoIATA: "MIA", pais: "Estados Unidos", departamento: "Florida", activo: true, vuelosActivos: 0 },
  { id: 13, ciudad: "Lima", codigoIATA: "LIM", pais: "Perú", departamento: "Lima", activo: true, vuelosActivos: 1 },
  { id: 14, ciudad: "Buenos Aires", codigoIATA: "EZE", pais: "Argentina", departamento: "Buenos Aires", activo: true, vuelosActivos: 1 },
  { id: 15, ciudad: "Ciudad de México", codigoIATA: "MEX", pais: "México", departamento: "Ciudad de México", activo: false, vuelosActivos: 0 },
];

const emptyDestino: Omit<Destino, "id"> = {
  ciudad: "",
  codigoIATA: "",
  pais: "Colombia",
  departamento: "",
  activo: true,
  vuelosActivos: 0,
};

export function AdminDestinos() {
  const [destinos, setDestinos] = useState(INITIAL_DESTINOS);
  const [query, setQuery] = useState("");
  const [filterPais, setFilterPais] = useState("");
  const [modal, setModal] = useState<{ mode: "create" | "edit" | "delete"; item?: Destino } | null>(null);
  const [form, setForm] = useState<Omit<Destino, "id">>(emptyDestino);
  const [saved, setSaved] = useState(false);

  const paises = [...new Set(destinos.map((d) => d.pais))];

  const filtered = destinos.filter((d) => {
    const matchQ =
      !query ||
      d.ciudad.toLowerCase().includes(query.toLowerCase()) ||
      d.codigoIATA.toLowerCase().includes(query.toLowerCase()) ||
      d.pais.toLowerCase().includes(query.toLowerCase());
    const matchP = !filterPais || d.pais === filterPais;
    return matchQ && matchP;
  });

  const handleOpen = (mode: "create" | "edit" | "delete", item?: Destino) => {
    setModal({ mode, item });
    if (mode === "edit" && item) setForm({ ...item });
    if (mode === "create") setForm(emptyDestino);
    setSaved(false);
  };

  const handleSave = () => {
    if (modal?.mode === "create") {
      const id = Math.max(...destinos.map((d) => d.id)) + 1;
      setDestinos((prev) => [...prev, { id, ...form }]);
    } else if (modal?.mode === "edit" && modal.item) {
      setDestinos((prev) =>
        prev.map((d) => (d.id === modal.item!.id ? { id: modal.item!.id, ...form } : d))
      );
    }
    setSaved(true);
    setTimeout(() => { setSaved(false); setModal(null); }, 1200);
  };

  const handleDelete = () => {
    setDestinos((prev) => prev.filter((d) => d.id !== modal?.item?.id));
    setModal(null);
  };

  const toggleActive = (id: number) => {
    setDestinos((prev) => prev.map((d) => (d.id === id ? { ...d, activo: !d.activo } : d)));
  };

  const inp = "w-full px-3 py-2.5 border border-gray-200 rounded-xl bg-gray-50 text-sm focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400";

  return (
    <PanelLayout role="admin" userName="Admin Sistema" userRole="Súper Administrador" navItems={adminNav}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-gray-800 mb-0.5">Gestión de destinos</h2>
            <p className="text-gray-400 text-sm">{filtered.length} destinos registrados</p>
          </div>
          <button
            onClick={() => handleOpen("create")}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-4 h-4" /> Nuevo destino
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          {[
            { label: "Total destinos", value: destinos.length, color: "text-indigo-600", bg: "bg-indigo-50" },
            { label: "Activos", value: destinos.filter((d) => d.activo).length, color: "text-green-600", bg: "bg-green-50" },
            { label: "Inactivos", value: destinos.filter((d) => !d.activo).length, color: "text-gray-500", bg: "bg-gray-50" },
            { label: "Países", value: paises.length, color: "text-blue-600", bg: "bg-blue-50" },
          ].map((s) => (
            <div key={s.label} className={`${s.bg} rounded-2xl p-4 border border-gray-100`}>
              <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
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
              placeholder="Buscar ciudad, código IATA o país..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-white text-sm focus:outline-none focus:border-indigo-400"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilterPais("")}
              className={`px-3 py-2 rounded-xl text-xs border transition-colors ${!filterPais ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-gray-600 border-gray-300 hover:border-indigo-400"}`}
            >
              Todos
            </button>
            {paises.map((p) => (
              <button
                key={p}
                onClick={() => setFilterPais(p)}
                className={`px-3 py-2 rounded-xl text-xs border transition-colors ${filterPais === p ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-gray-600 border-gray-300 hover:border-indigo-400"}`}
              >
                {p}
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
                  {["Ciudad", "IATA", "País / Departamento", "Vuelos activos", "Estado", ""].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((d) => (
                  <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center shrink-0">
                          <MapPin className="w-4 h-4 text-indigo-600" />
                        </div>
                        <span className="font-semibold text-gray-900">{d.ciudad}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="font-mono font-bold text-gray-700 bg-gray-100 px-2 py-0.5 rounded-lg text-xs">{d.codigoIATA}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <Globe className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-700">{d.pais}</span>
                      </div>
                      <div className="text-xs text-gray-400 ml-4">{d.departamento}</div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`text-sm font-bold ${d.vuelosActivos > 0 ? "text-emerald-600" : "text-gray-400"}`}>
                        {d.vuelosActivos}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <button
                        onClick={() => toggleActive(d.id)}
                        className={`text-xs px-2 py-1 rounded-full font-medium transition-colors cursor-pointer ${d.activo ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
                      >
                        {d.activo ? "Activo" : "Inactivo"}
                      </button>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleOpen("edit", d)} className="p-1.5 rounded-lg hover:bg-indigo-50 transition-colors">
                          <Edit className="w-4 h-4 text-indigo-500" />
                        </button>
                        <button onClick={() => handleOpen("delete", d)} className="p-1.5 rounded-lg hover:bg-red-50 transition-colors">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400 text-sm">No hay destinos con esa búsqueda</div>
          )}
        </div>

        {/* Create/Edit modal */}
        {modal && modal.mode !== "delete" && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-5 border-b">
                <h3 className="text-gray-900">{modal.mode === "create" ? "Nuevo destino" : "Editar destino"}</h3>
                <button onClick={() => setModal(null)} className="p-1.5 rounded-lg hover:bg-gray-100">
                  <X className="w-5 h-5" />
                </button>
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
                      <label className="block text-xs text-gray-500 mb-1">Ciudad *</label>
                      <input className={inp} value={form.ciudad} onChange={(e) => setForm({ ...form, ciudad: e.target.value })} placeholder="Bogotá" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Código IATA *</label>
                      <input className={inp} value={form.codigoIATA} onChange={(e) => setForm({ ...form, codigoIATA: e.target.value.toUpperCase() })} placeholder="BOG" maxLength={3} />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">País *</label>
                      <input className={inp} value={form.pais} onChange={(e) => setForm({ ...form, pais: e.target.value })} placeholder="Colombia" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Departamento / Estado</label>
                      <input className={inp} value={form.departamento} onChange={(e) => setForm({ ...form, departamento: e.target.value })} placeholder="Cundinamarca" />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs text-gray-500 mb-1">Estado del destino</label>
                      <div className="flex gap-3">
                        {[true, false].map((v) => (
                          <button
                            key={String(v)}
                            type="button"
                            onClick={() => setForm({ ...form, activo: v })}
                            className={`flex-1 py-2 rounded-xl text-sm border transition-colors ${form.activo === v ? (v ? "bg-green-600 text-white border-green-600" : "bg-gray-500 text-white border-gray-500") : "bg-white text-gray-600 border-gray-300"}`}
                          >
                            {v ? "Activo" : "Inactivo"}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button onClick={() => setModal(null)} className="flex-1 border border-gray-300 text-gray-600 py-2.5 rounded-xl text-sm">
                      Cancelar
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={!form.ciudad || !form.codigoIATA}
                      className="flex-1 bg-indigo-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50"
                    >
                      {modal.mode === "create" ? "Crear destino" : "Guardar cambios"}
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
                <MapPin className="w-7 h-7 text-red-600" />
              </div>
              <h3 className="text-gray-900 mb-2">Eliminar destino</h3>
              <p className="text-gray-500 text-sm mb-1">¿Confirmas eliminar el destino?</p>
              <p className="font-bold text-gray-800 mb-5">
                {modal.item?.ciudad} ({modal.item?.codigoIATA}) — {modal.item?.pais}
              </p>
              <div className="flex gap-3">
                <button onClick={() => setModal(null)} className="flex-1 border border-gray-300 text-gray-600 py-2.5 rounded-xl text-sm">
                  Cancelar
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 bg-red-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-red-700 transition-colors"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PanelLayout>
  );
}


