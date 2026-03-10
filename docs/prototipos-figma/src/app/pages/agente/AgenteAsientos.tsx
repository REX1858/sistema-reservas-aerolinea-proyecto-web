import { useState } from "react";
import { PanelLayout } from "../../components/PanelLayout";
import { agenteNav } from "./AgenteDashboard";
import { VUELOS, TIQUETES } from "../../data/mockData";
import { Plane, Users, CheckCircle } from "lucide-react";

const COLS = ["A", "B", "C", "D", "E", "F"];
const ROWS = 10;
const BUSINESS_ROWS = [1, 2];

function buildSeatMap(flightId: number) {
  const occupied = TIQUETES.filter((t) => [1, 2, 3].includes(t.id_reserva)).map((t) => t.asiento);
  const seats: Record<string, { occupied: boolean; passenger?: string; class: string }> = {};
  for (let r = 1; r <= ROWS; r++) {
    for (const col of COLS) {
      const seatId = `${r}${col}`;
      const ticket = TIQUETES.find((t) => t.asiento === seatId);
      seats[seatId] = {
        occupied: occupied.includes(seatId),
        passenger: ticket?.pasajero,
        class: BUSINESS_ROWS.includes(r) ? "Ejecutiva" : "Económica",
      };
    }
  }
  return seats;
}

export function AgenteAsientos() {
  const [selectedFlight, setSelectedFlight] = useState(VUELOS[0].id);
  const [seats, setSeats] = useState(() => buildSeatMap(VUELOS[0].id));
  const [activeSeat, setActiveSeat] = useState<string | null>(null);
  const [passengerName, setPassengerName] = useState("");
  const [saved, setSaved] = useState<string[]>([]);

  const flight = VUELOS.find((v) => v.id === selectedFlight)!;
  const occupiedCount = Object.values(seats).filter((s) => s.occupied).length;
  const availableCount = Object.values(seats).filter((s) => !s.occupied).length;

  const handleAssign = () => {
    if (!activeSeat || !passengerName) return;
    setSeats((prev) => ({ ...prev, [activeSeat]: { ...prev[activeSeat], occupied: true, passenger: passengerName } }));
    setSaved((prev) => [...prev, activeSeat]);
    setActiveSeat(null);
    setPassengerName("");
    setTimeout(() => setSaved((prev) => prev.filter((s) => s !== activeSeat)), 3000);
  };

  const handleRelease = (seat: string) => {
    setSeats((prev) => ({ ...prev, [seat]: { ...prev[seat], occupied: false, passenger: undefined } }));
  };

  return (
    <PanelLayout role="agente" userName="María García" userRole="Agente Terra Sky" navItems={agenteNav}>
      <div className="max-w-5xl mx-auto">
        <div className="mb-5">
          <h2 className="text-gray-800 mb-0.5">Asignación de asientos</h2>
          <p className="text-gray-400 text-sm">Gestiona la distribución de pasajeros</p>
        </div>

        {/* Flight selector */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-5">
          <label className="block text-xs text-gray-500 mb-2">Seleccionar vuelo</label>
          <select value={selectedFlight} onChange={(e) => setSelectedFlight(Number(e.target.value))}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 text-sm focus:outline-none focus:border-emerald-400 max-w-lg">
            {VUELOS.map((v) => (
              <option key={v.id} value={v.id}>{v.codigo} · {v.origen.split("(")[1]?.replace(")", "")} → {v.destino.split("(")[1]?.replace(")", "")} · {v.salida.split(" ")[0]}</option>
            ))}
          </select>
          <div className="flex gap-4 mt-3 text-sm">
            <span className="text-gray-500"><strong className="text-red-600">{occupiedCount}</strong> ocupados</span>
            <span className="text-gray-500"><strong className="text-green-600">{availableCount}</strong> disponibles</span>
            <span className="text-gray-500">Cap. total: <strong>{flight.capacidad}</strong></span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Seat map */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-3 mb-4">
              <Plane className="w-5 h-5 text-emerald-600" />
              <h3 className="text-gray-800">Mapa de cabina — {flight.codigo}</h3>
            </div>

            {/* Col headers */}
            <div className="flex items-center gap-1 mb-2 pl-8">
              {COLS.map((c, i) => (
                <div key={c} className="w-9 text-center text-xs font-bold text-gray-400">
                  {c}{i === 2 && <span className="ml-0.5 text-gray-200">|</span>}
                </div>
              ))}
            </div>

            {Array.from({ length: ROWS }).map((_, row) => (
              <div key={row} className="flex items-center gap-1 mb-1">
                <div className="w-7 text-xs text-gray-400 text-right pr-1 shrink-0">{row + 1}</div>
                {COLS.map((col, ci) => {
                  const seatId = `${row + 1}${col}`;
                  const seat = seats[seatId];
                  const isActive = activeSeat === seatId;
                  const wasSaved = saved.includes(seatId);
                  return (
                    <div key={col}>
                      <button
                        onClick={() => {
                          if (seat.occupied && seat.passenger) {
                            if (window.confirm(`¿Liberar asiento ${seatId} de ${seat.passenger}?`)) handleRelease(seatId);
                          } else if (!seat.occupied) {
                            setActiveSeat(isActive ? null : seatId);
                          }
                        }}
                        title={seat.occupied ? `${seat.passenger} (clic para liberar)` : `Asiento ${seatId} libre`}
                        className={`w-9 h-8 rounded-lg text-xs font-medium transition-all ${
                          seat.occupied
                            ? "bg-red-400 text-white cursor-pointer hover:bg-red-500"
                            : isActive
                            ? "bg-emerald-500 text-white ring-2 ring-emerald-300 scale-110"
                            : wasSaved
                            ? "bg-green-200 text-green-700"
                            : seat.class === "Ejecutiva"
                            ? "bg-yellow-100 text-yellow-700 border border-yellow-300 hover:bg-yellow-200"
                            : "bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100"
                        }`}
                      >
                        {seat.occupied ? "✕" : seatId}
                      </button>
                      {ci === 2 && <span className="inline-block w-3" />}
                    </div>
                  );
                })}
              </div>
            ))}

            {/* Legend */}
            <div className="flex flex-wrap gap-3 mt-4">
              {[
                { color: "bg-blue-50 border border-blue-200", label: "Disponible" },
                { color: "bg-yellow-100 border border-yellow-300", label: "Ejecutiva" },
                { color: "bg-emerald-500", label: "Seleccionado" },
                { color: "bg-red-400", label: "Ocupado" },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-1.5 text-xs text-gray-500">
                  <div className={`w-4 h-4 rounded ${l.color}`} /> {l.label}
                </div>
              ))}
            </div>
          </div>

          {/* Assignment panel */}
          <div className="space-y-4">
            {/* Assign seat */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h4 className="text-gray-800 mb-3">Asignar asiento</h4>
              {activeSeat ? (
                <div>
                  <div className="bg-emerald-50 rounded-xl p-3 text-center mb-4">
                    <div className="text-xs text-gray-400">Asiento seleccionado</div>
                    <div className="text-2xl font-bold text-emerald-600">{activeSeat}</div>
                    <div className="text-xs text-gray-500">{seats[activeSeat]?.class}</div>
                  </div>
                  <div className="mb-3">
                    <label className="block text-xs text-gray-500 mb-1">Nombre del pasajero</label>
                    <input value={passengerName} onChange={(e) => setPassengerName(e.target.value)}
                      placeholder="Nombre completo"
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-400" />
                  </div>
                  <button onClick={handleAssign} disabled={!passengerName}
                    className="w-full bg-emerald-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4" /> Asignar
                  </button>
                  <button onClick={() => setActiveSeat(null)} className="w-full mt-2 text-gray-500 text-sm py-2 hover:text-gray-700">
                    Cancelar selección
                  </button>
                </div>
              ) : (
                <p className="text-sm text-gray-400 text-center py-4">Selecciona un asiento disponible en el mapa</p>
              )}
            </div>

            {/* Occupied seats list */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-4 h-4 text-emerald-600" />
                <h4 className="text-gray-800">Pasajeros asignados</h4>
              </div>
              <div className="space-y-1.5 max-h-48 overflow-y-auto">
                {Object.entries(seats).filter(([, s]) => s.occupied).map(([id, s]) => (
                  <div key={id} className="flex items-center justify-between text-xs p-2 bg-gray-50 rounded-lg">
                    <span className="font-mono font-bold text-red-600 w-8">{id}</span>
                    <span className="text-gray-600 flex-1 ml-2 truncate">{s.passenger}</span>
                    <span className="text-gray-400">{s.class === "Ejecutiva" ? "Ej." : "Ec."}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PanelLayout>
  );
}


