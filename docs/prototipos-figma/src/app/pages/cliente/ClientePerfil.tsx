import { useState } from "react";
import { PanelLayout } from "../../components/PanelLayout";
import { clienteNav } from "./ClienteDashboard";
import { User, Mail, Phone, MapPin, FileText, Edit, Save, X, Lock, CheckCircle } from "lucide-react";

const initialData = {
  nombres: "Carlos Andrés",
  apellidos: "Ramírez López",
  correo: "carlos.ramirez@email.com",
  telefono: "+57 300 123 4567",
  telefonoAlt: "",
  doc: "CC 10254789",
  tipoDoc: "Cédula de ciudadanía",
  pais: "Colombia",
  departamento: "Cundinamarca",
  ciudad: "Bogotá",
  direccion: "Cra 7 # 32-16, Apt 501",
};

export function ClientePerfil() {
  const [editing, setEditing] = useState(false);
  const [data, setData] = useState(initialData);
  const [draft, setDraft] = useState(initialData);
  const [saved, setSaved] = useState(false);
  const [editPass, setEditPass] = useState(false);

  const handleSave = () => {
    setData(draft);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const inp = "w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400";

  return (
    <PanelLayout role="cliente" userName="Carlos Andrés Ramírez" userRole="Cliente" navItems={clienteNav}>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-gray-800 mb-0.5">Mi perfil</h2>
            <p className="text-gray-400 text-sm">Gestiona tu información personal</p>
          </div>
          {!editing ? (
            <button onClick={() => { setDraft(data); setEditing(true); }}
              className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-xl text-sm hover:bg-gray-50 transition-colors">
              <Edit className="w-4 h-4" /> Editar perfil
            </button>
          ) : (
            <div className="flex gap-2">
              <button onClick={() => setEditing(false)} className="flex items-center gap-1 border border-gray-300 text-gray-600 px-3 py-2 rounded-xl text-sm hover:bg-gray-50">
                <X className="w-4 h-4" /> Cancelar
              </button>
              <button onClick={handleSave} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm hover:bg-blue-700 transition-colors">
                <Save className="w-4 h-4" /> Guardar
              </button>
            </div>
          )}
        </div>

        {saved && (
          <div className="flex items-center gap-2 bg-green-50 text-green-700 text-sm px-4 py-3 rounded-xl mb-5 border border-green-200">
            <CheckCircle className="w-4 h-4" /> Perfil actualizado exitosamente
          </div>
        )}

        {/* Avatar section */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-5 flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white text-2xl font-bold shrink-0">
            {data.nombres.charAt(0)}{data.apellidos.charAt(0)}
          </div>
          <div>
            <div className="font-bold text-gray-900">{data.nombres} {data.apellidos}</div>
            <div className="text-sm text-gray-500">{data.correo}</div>
            <div className="text-xs text-blue-600 mt-0.5">Cliente · Categoría Classic</div>
          </div>
        </div>

        {/* Personal data */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-5">
          <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-gray-700">
            <User className="w-4 h-4 text-blue-500" /> Datos personales
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Nombres</label>
              {editing ? <input className={inp} value={draft.nombres} onChange={(e) => setDraft({ ...draft, nombres: e.target.value })} />
                : <div className="text-sm text-gray-800 py-2">{data.nombres}</div>}
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Apellidos</label>
              {editing ? <input className={inp} value={draft.apellidos} onChange={(e) => setDraft({ ...draft, apellidos: e.target.value })} />
                : <div className="text-sm text-gray-800 py-2">{data.apellidos}</div>}
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Tipo de documento</label>
              {editing ? (
                <select className={inp} value={draft.tipoDoc} onChange={(e) => setDraft({ ...draft, tipoDoc: e.target.value })}>
                  <option>Cédula de ciudadanía</option>
                  <option>Pasaporte</option>
                  <option>Cédula de extranjería</option>
                </select>
              ) : <div className="text-sm text-gray-800 py-2">{data.tipoDoc}</div>}
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Número de documento</label>
              {editing ? <input className={inp} value={draft.doc} onChange={(e) => setDraft({ ...draft, doc: e.target.value })} />
                : <div className="text-sm text-gray-800 py-2">{data.doc}</div>}
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-5">
          <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-gray-700">
            <Mail className="w-4 h-4 text-blue-500" /> Contacto
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Correo electrónico</label>
              {editing ? <input type="email" className={inp} value={draft.correo} onChange={(e) => setDraft({ ...draft, correo: e.target.value })} />
                : <div className="text-sm text-gray-800 py-2">{data.correo}</div>}
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Teléfono principal</label>
              {editing ? <input className={inp} value={draft.telefono} onChange={(e) => setDraft({ ...draft, telefono: e.target.value })} />
                : <div className="text-sm text-gray-800 py-2">{data.telefono}</div>}
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs text-gray-400 mb-1">Dirección</label>
              {editing ? <input className={inp} value={draft.direccion} onChange={(e) => setDraft({ ...draft, direccion: e.target.value })} />
                : <div className="text-sm text-gray-800 py-2">{data.direccion}</div>}
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-5">
          <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-gray-700">
            <MapPin className="w-4 h-4 text-blue-500" /> Ubicación
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { key: "pais", label: "País" },
              { key: "departamento", label: "Departamento" },
              { key: "ciudad", label: "Ciudad" },
            ].map((f) => (
              <div key={f.key}>
                <label className="block text-xs text-gray-400 mb-1">{f.label}</label>
                {editing ? (
                  <input className={inp} value={(draft as any)[f.key]} onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value })} />
                ) : <div className="text-sm text-gray-800 py-2">{(data as any)[f.key]}</div>}
              </div>
            ))}
          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Lock className="w-4 h-4 text-blue-500" /> Seguridad
            </div>
            <button onClick={() => setEditPass(!editPass)} className="text-xs text-blue-600 hover:underline">
              {editPass ? "Cancelar" : "Cambiar contraseña"}
            </button>
          </div>
          {editPass ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Contraseña actual</label>
                <input type="password" className={inp} placeholder="••••••••" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Nueva contraseña</label>
                <input type="password" className={inp} placeholder="••••••••" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Confirmar contraseña</label>
                <input type="password" className={inp} placeholder="••••••••" />
              </div>
              <div className="flex items-end">
                <button className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm hover:bg-blue-700 transition-colors w-full">
                  Actualizar contraseña
                </button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-400">Contraseña: •••••••• · Última actualización: Hace 3 meses</p>
          )}
        </div>
      </div>
    </PanelLayout>
  );
}


