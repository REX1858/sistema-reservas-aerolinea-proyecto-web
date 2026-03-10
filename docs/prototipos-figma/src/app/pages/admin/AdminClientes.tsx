import { useState } from "react";
import { PanelLayout } from "../../components/PanelLayout";
import { adminNav } from "./AdminDashboard";
import { CLIENTES } from "../../data/mockData";
import { Plus, Edit, Trash2, X, CheckCircle, Search, User } from "lucide-react";

type Cliente = typeof CLIENTES[0];

const empty: Omit<Cliente, "id"> = {
  nombres: "", apellidos: "", correo: "", telefono: "", ciudad: "",
  departamento: "", pais: "Colombia", doc: "", estado: "Activo", telefonoAlt: "",
};

export function AdminClientes() {
  const [clientes, setClientes] = useState(CLIENTES);
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState<{ mode: "create" | "edit" | "delete"; item?: Cliente } | null>(null);
  const [form, setForm] = useState<Omit<Cliente, "id">>(empty);
  const [saved, setSaved] = useState(false);

  const filtered = clientes.filter((c) =>
    !query ||
    `${c.nombres} ${c.apellidos}`.toLowerCase().includes(query.toLowerCase()) ||
    c.correo.toLowerCase().includes(query.toLowerCase()) ||
    c.doc.toLowerCase().includes(query.toLowerCase())
  );

  const handleOpen = (mode: "create" | "edit" | "delete", item?: Cliente) => {
    setModal({ mode, item });
    if (mode === "edit" && item) setForm({ ...item });
    if (mode === "create") setForm(empty);
    setSaved(false);
  };

  const handleSave = () => {
    if (modal?.mode === "create") {
      const id = Math.max(...clientes.map((c) => c.id)) + 1;
      setClientes((prev) => [...prev, { id, ...form }]);
    } else if (modal?.mode === "edit" && modal.item) {
      setClientes((prev) => prev.map((c) => c.id === modal.item!.id ? { id: modal.item!.id, ...form } : c));
    }
    setSaved(true);
    setTimeout(() => { setSaved(false); setModal(null); }, 1200);
  };

  const handleDelete = () => {
    setClientes((prev) => prev.filter((c) => c.id !== modal?.item?.id));
    setModal(null);
  };

  const inp = "w-full px-3 py-2.5 border border-gray-200 rounded-xl bg-gray-50 text-sm focus:outline-none focus:border-indigo-400";

  return (
    <PanelLayout role="admin" userName="Admin Sistema" userRole="Súper Administrador" navItems={adminNav}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-gray-800 mb-0.5">Gestión de clientes</h2>
            <p className="text-gray-400 text-sm">{filtered.length} clientes registrados</p>
          </div>
          <button onClick={() => handleOpen("create")}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm hover:bg-indigo-700 transition-colors">
            <Plus className="w-4 h-4" /> Nuevo cliente
          </button>
        </div>

        <div className="relative mb-5 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar cliente..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-white text-sm focus:outline-none focus:border-indigo-400" />
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {["Cliente", "Documento", "Correo", "Ciudad", "Estado", ""].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold text-xs shrink-0">
                          {c.nombres.charAt(0)}{c.apellidos.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{c.nombres} {c.apellidos}</div>
                          <div className="text-xs text-gray-400">{c.telefono}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-gray-500 text-xs">{c.doc}</td>
                    <td className="px-5 py-3.5 text-gray-500">{c.correo}</td>
                    <td className="px-5 py-3.5 text-gray-500">{c.ciudad}, {c.pais}</td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${c.estado === "Activo" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{c.estado}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleOpen("edit", c)} className="p-1.5 rounded-lg hover:bg-indigo-50"><Edit className="w-4 h-4 text-indigo-500" /></button>
                        <button onClick={() => handleOpen("delete", c)} className="p-1.5 rounded-lg hover:bg-red-50"><Trash2 className="w-4 h-4 text-red-500" /></button>
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
                <h3 className="text-gray-900">{modal.mode === "create" ? "Nuevo cliente" : "Editar cliente"}</h3>
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
                    {[
                      { key: "nombres", label: "Nombres *", type: "text" },
                      { key: "apellidos", label: "Apellidos *", type: "text" },
                      { key: "correo", label: "Correo electrónico *", type: "email" },
                      { key: "telefono", label: "Teléfono principal", type: "tel" },
                      { key: "doc", label: "Número de documento *", type: "text" },
                      { key: "pais", label: "País", type: "text" },
                      { key: "departamento", label: "Departamento", type: "text" },
                      { key: "ciudad", label: "Ciudad", type: "text" },
                    ].map((f) => (
                      <div key={f.key}>
                        <label className="block text-xs text-gray-500 mb-1">{f.label}</label>
                        <input type={f.type} className={inp} value={(form as any)[f.key]} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} />
                      </div>
                    ))}
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Estado</label>
                      <select className={inp} value={form.estado} onChange={(e) => setForm({ ...form, estado: e.target.value })}>
                        <option>Activo</option><option>Inactivo</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button onClick={() => setModal(null)} className="flex-1 border border-gray-300 text-gray-600 py-2.5 rounded-xl text-sm">Cancelar</button>
                    <button onClick={handleSave} disabled={!form.nombres || !form.apellidos || !form.correo}
                      className="flex-1 bg-indigo-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50">
                      {modal.mode === "create" ? "Registrar cliente" : "Guardar cambios"}
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
                <User className="w-7 h-7 text-red-600" />
              </div>
              <h3 className="text-gray-900 mb-2">Eliminar cliente</h3>
              <p className="text-gray-500 text-sm mb-1">¿Confirmas la eliminación de:</p>
              <p className="font-bold text-gray-800 mb-5">{modal.item?.nombres} {modal.item?.apellidos}</p>
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
