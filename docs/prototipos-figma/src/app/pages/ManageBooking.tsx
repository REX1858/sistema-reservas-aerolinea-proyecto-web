import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  Search,
  PlaneTakeoff,
  PlaneLanding,
  Clock,
  Edit,
  XCircle,
  Download,
  ChevronRight,
  CheckCircle,
} from "lucide-react";

const mockBooking = {
  code: "RSV-X7K2P9",
  status: "Confirmada",
  from: "Bogotá (BOG)",
  to: "Madrid (MAD)",
  depart: "22:30",
  arrive: "14:45",
  date: "15 Mar 2026",
  returnDate: "22 Mar 2026",
  returnDepart: "10:20",
  returnArrive: "18:05",
  passengers: [
    { name: "Carlos Andrés Ramírez", type: "Adulto", seat: "14C", doc: "CC 10254789" },
  ],
  cabin: "Económica",
  price: "$890 COP",
  aircraft: "Boeing 787",
};

export function ManageBooking() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [found, setFound] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    setSearched(true);
    if (code.toUpperCase() === "RSV-X7K2P9" || code === "") setFound(true);
    else setFound(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#1B4332] text-white py-5 px-4">
        <div className="max-w-4xl mx-auto">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-white/80 hover:text-white text-sm mb-2">
            <ArrowLeft className="w-4 h-4" /> Volver al inicio
          </button>
          <h2 className="text-white">Gestionar reserva</h2>
          <p className="text-white/70 text-sm">Consulta, modifica o cancela tu reserva</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Search box */}
        {!found && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <h3 className="text-gray-900 mb-4">Buscar mi reserva</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Código de reserva</label>
                <input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Ej: RSV-X7K2P9"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-sm focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332]"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Correo electrónico</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="correo@email.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-sm focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332]"
                />
              </div>
            </div>
            <button
              onClick={handleSearch}
              className="mt-4 flex items-center gap-2 bg-[#1B4332] text-white px-6 py-3 rounded-xl hover:bg-[#143126] transition-colors text-sm"
            >
              <Search className="w-4 h-4" /> Buscar reserva
            </button>
            {searched && !found && (
              <p className="mt-3 text-sm text-red-600">No encontramos una reserva con ese código. Usa <strong>RSV-X7K2P9</strong> de prueba.</p>
            )}
            <p className="mt-3 text-xs text-gray-400">💡 Prueba con el código <strong>RSV-X7K2P9</strong> para ver un ejemplo.</p>
          </div>
        )}

        {/* Booking result */}
        {found && (
          <div className="space-y-5">
            {/* Status banner */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-500 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-green-700">Reserva {mockBooking.status}</p>
                <p className="text-xs text-green-600">Código: <strong>{mockBooking.code}</strong></p>
              </div>
              <button onClick={() => setFound(false)} className="ml-auto text-gray-400 hover:text-gray-600">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Itinerary */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-gray-900 mb-5">Itinerario</h3>
              <div className="space-y-4">
                {[
                  { label: "Vuelo de ida", date: mockBooking.date, from: mockBooking.from, to: mockBooking.to, dep: mockBooking.depart, arr: mockBooking.arrive },
                  { label: "Vuelo de vuelta", date: mockBooking.returnDate, from: mockBooking.to, to: mockBooking.from, dep: mockBooking.returnDepart, arr: mockBooking.returnArrive },
                ].map((leg) => (
                  <div key={leg.label} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="shrink-0">
                      <div className="text-xs font-semibold text-[#1B4332]">Terra Sky</div>
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-gray-400 mb-1">{leg.label} · {leg.date}</div>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="font-bold text-gray-900">{leg.dep}</div>
                          <div className="text-xs text-gray-400"><PlaneTakeoff className="w-3 h-3 inline" /> {leg.from}</div>
                        </div>
                        <div className="flex-1 h-px bg-gray-300 relative">
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#0E7490]" />
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-gray-900">{leg.arr}</div>
                          <div className="text-xs text-gray-400"><PlaneLanding className="w-3 h-3 inline" /> {leg.to}</div>
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 shrink-0">
                      <div>{mockBooking.aircraft}</div>
                      <div>{mockBooking.cabin}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Passengers */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-gray-900 mb-4">Pasajeros</h3>
              {mockBooking.passengers.map((p, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <div className="text-sm font-semibold text-gray-800">{p.name}</div>
                    <div className="text-xs text-gray-400">{p.type} · {p.doc} · Asiento: <strong>{p.seat}</strong></div>
                  </div>
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-lg">Check-in disponible</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: CheckCircle, label: "Hacer Check-in", sub: "Hasta 1h antes del vuelo", action: () => navigate("/checkin"), color: "bg-[#1B4332] text-white" },
                { icon: Download, label: "Descargar itinerario", sub: "Formato PDF", action: () => alert("Descargando..."), color: "bg-[#0E7490] text-white" },
                { icon: XCircle, label: "Cancelar reserva", sub: "Sujeto a tarifas", action: () => alert("Para cancelar, contacta nuestro servicio al cliente."), color: "bg-gray-700 text-white" },
              ].map((a) => (
                <button
                  key={a.label}
                  onClick={a.action}
                  className={`${a.color} rounded-2xl p-4 text-left hover:opacity-90 transition-opacity`}
                >
                  <a.icon className="w-5 h-5 mb-2" />
                  <div className="text-sm font-semibold">{a.label}</div>
                  <div className="text-xs opacity-70">{a.sub}</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}



