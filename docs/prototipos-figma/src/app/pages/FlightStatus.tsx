import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Search, PlaneTakeoff, PlaneLanding, Clock, AlertCircle, CheckCircle, RefreshCw } from "lucide-react";

const mockFlights = [
  {
    id: "AN1042",
    from: "Bogotá",
    fromCode: "BOG",
    to: "Madrid",
    toCode: "MAD",
    scheduled: "22:30",
    actual: "22:45",
    arrive: "14:45+1",
    date: "15 Mar 2026",
    status: "En vuelo",
    statusColor: "bg-blue-100 text-blue-700",
    gate: "B14",
    terminal: "T1",
    aircraft: "Boeing 787",
    delay: 15,
  },
  {
    id: "AN0231",
    from: "Medellín",
    fromCode: "MDE",
    to: "Bogotá",
    toCode: "BOG",
    scheduled: "08:10",
    actual: "08:10",
    arrive: "09:05",
    date: "15 Mar 2026",
    status: "A tiempo",
    statusColor: "bg-green-100 text-green-700",
    gate: "A03",
    terminal: "T2",
    aircraft: "Airbus A320",
    delay: 0,
  },
  {
    id: "AN0815",
    from: "Bogotá",
    fromCode: "BOG",
    to: "Cartagena",
    toCode: "CTG",
    scheduled: "14:30",
    actual: "16:00",
    arrive: "15:45",
    date: "15 Mar 2026",
    status: "Demorado",
    statusColor: "bg-orange-100 text-orange-700",
    gate: "C22",
    terminal: "T1",
    aircraft: "Airbus A320",
    delay: 90,
  },
  {
    id: "AN0554",
    from: "Nueva York",
    fromCode: "JFK",
    to: "Bogotá",
    toCode: "BOG",
    scheduled: "11:00",
    actual: "11:00",
    arrive: "19:30",
    date: "15 Mar 2026",
    status: "Aterrizado",
    statusColor: "bg-gray-100 text-gray-600",
    gate: "D07",
    terminal: "T3",
    aircraft: "Boeing 777",
    delay: 0,
  },
];

export function FlightStatus() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);

  const filtered = searched
    ? mockFlights.filter(
        (f) =>
          f.id.toLowerCase().includes(query.toLowerCase()) ||
          f.from.toLowerCase().includes(query.toLowerCase()) ||
          f.to.toLowerCase().includes(query.toLowerCase()) ||
          f.fromCode.toLowerCase().includes(query.toLowerCase()) ||
          f.toCode.toLowerCase().includes(query.toLowerCase())
      )
    : mockFlights;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#1B4332] text-white py-5 px-4">
        <div className="max-w-5xl mx-auto">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-white/80 hover:text-white text-sm mb-2">
            <ArrowLeft className="w-4 h-4" /> Volver al inicio
          </button>
          <h2 className="text-white">Estado de vuelos</h2>
          <p className="text-white/70 text-sm">Información en tiempo real · Actualizado: 14:32 hs</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Search */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
          <div className="flex gap-3 flex-col sm:flex-row">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && setSearched(true)}
                placeholder="Número de vuelo o ciudad (ej: AN1042, Bogotá)"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-sm focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332]"
              />
            </div>
            <button
              onClick={() => setSearched(true)}
              className="flex items-center gap-2 bg-[#1B4332] text-white px-6 py-3 rounded-xl hover:bg-[#143126] transition-colors text-sm whitespace-nowrap"
            >
              <Search className="w-4 h-4" /> Buscar
            </button>
            <button
              onClick={() => { setQuery(""); setSearched(false); }}
              className="flex items-center gap-2 border border-gray-300 text-gray-600 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm"
              title="Actualizar"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 mb-5">
          {[
            { label: "A tiempo", cls: "bg-green-100 text-green-700" },
            { label: "En vuelo", cls: "bg-blue-100 text-blue-700" },
            { label: "Demorado", cls: "bg-orange-100 text-orange-700" },
            { label: "Aterrizado", cls: "bg-gray-100 text-gray-600" },
            { label: "Cancelado", cls: "bg-red-100 text-red-700" },
          ].map((s) => (
            <span key={s.label} className={`text-xs px-3 py-1 rounded-full ${s.cls}`}>{s.label}</span>
          ))}
        </div>

        {/* Flights table */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
              <AlertCircle className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No encontramos vuelos con esa búsqueda</p>
            </div>
          ) : (
            filtered.map((flight) => (
              <div key={flight.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  {/* Flight ID + status */}
                  <div className="shrink-0">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="text-xs font-semibold text-[#1B4332]">Terra Sky</div>
                      <div>
                        <div className="font-bold text-gray-900">{flight.id}</div>
                        <div className="text-xs text-gray-400">{flight.aircraft}</div>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${flight.statusColor}`}>{flight.status}</span>
                  </div>

                  {/* Route */}
                  <div className="flex flex-1 items-center gap-4 justify-center">
                    <div className="text-center">
                      <div className="font-bold text-gray-900 text-xl">{flight.fromCode}</div>
                      <div className="text-xs text-gray-400">{flight.from}</div>
                    </div>
                    <div className="flex-1 max-w-[100px] text-center">
                      <div className="h-px bg-gray-300 relative">
                        <PlaneTakeoff className="w-4 h-4 text-[#0E7490] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white" />
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-gray-900 text-xl">{flight.toCode}</div>
                      <div className="text-xs text-gray-400">{flight.to}</div>
                    </div>
                  </div>

                  {/* Times */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center shrink-0">
                    <div>
                      <div className="text-xs text-gray-400">Salida progr.</div>
                      <div className="font-semibold text-gray-800">{flight.scheduled}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Salida real</div>
                      <div className={`font-semibold ${flight.delay > 0 ? "text-orange-500" : "text-green-600"}`}>
                        {flight.actual}
                        {flight.delay > 0 && <span className="text-xs ml-1">(+{flight.delay}min)</span>}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Puerta</div>
                      <div className="font-semibold text-gray-800">{flight.gate}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Terminal</div>
                      <div className="font-semibold text-gray-800">{flight.terminal}</div>
                    </div>
                  </div>
                </div>

                {flight.delay > 0 && (
                  <div className="mt-3 flex items-center gap-2 bg-orange-50 text-orange-600 text-xs p-3 rounded-xl">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    El vuelo presenta una demora de {flight.delay} minutos. Nos disculpamos por los inconvenientes.
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}


