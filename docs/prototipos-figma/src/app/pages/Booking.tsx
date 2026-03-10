import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  User,
  Baby,
  CreditCard,
  ChevronRight,
  CheckCircle,
  PlaneTakeoff,
  PlaneLanding,
  Clock,
  Luggage,
  Wifi,
  Utensils,
  Lock,
  UserCheck,
  Plus,
  Minus,
} from "lucide-react";

interface Passengers {
  adults: number;
  teens: number;
  children: number;
  infants: number;
}

const STEPS = ["Pasajeros", "Asientos", "Pago", "Confirmación"];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-0 mb-8">
      {STEPS.map((step, i) => (
        <div key={step} className="flex items-center flex-1">
          <div className="flex flex-col items-center flex-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                i < current
                  ? "bg-green-500 text-white"
                  : i === current
                  ? "bg-[#1B4332] text-white ring-4 ring-emerald-100"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {i < current ? <CheckCircle className="w-4 h-4" /> : i + 1}
            </div>
            <span className={`text-xs mt-1 hidden sm:block ${i === current ? "text-[#1B4332] font-semibold" : "text-gray-400"}`}>
              {step}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`h-0.5 flex-1 mx-1 ${i < current ? "bg-green-400" : "bg-gray-200"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

const SEAT_ROWS = 6;
const SEATS_PER_ROW = 6;
const COLUMNS = ["A", "B", "C", "D", "E", "F"];
const OCCUPIED = ["1A", "1C", "2B", "2F", "3D", "4A", "4E", "5C", "6B", "6F"];
const BUSINESS = ["1A", "1B", "1C", "1D", "1E", "1F", "2A", "2B", "2C", "2D", "2E", "2F"];

function SeatMap({ selected, onSelect }: { selected: string[]; onSelect: (s: string) => void }) {
  return (
    <div className="overflow-x-auto pb-2">
      <div className="min-w-[320px]">
        {/* Column headers */}
        <div className="flex items-center gap-1 mb-2 pl-8">
          {COLUMNS.map((col, i) => (
            <div key={col} className="w-9 text-center text-xs font-bold text-gray-400">
              {col}
              {i === 2 && <span className="text-gray-200 ml-0.5">|</span>}
            </div>
          ))}
        </div>
        {Array.from({ length: SEAT_ROWS }).map((_, row) => (
          <div key={row} className="flex items-center gap-1 mb-1">
            <div className="w-7 text-right text-xs text-gray-400 pr-1 shrink-0">{row + 1}</div>
            {COLUMNS.map((col, colIdx) => {
              const seat = `${row + 1}${col}`;
              const isOccupied = OCCUPIED.includes(seat);
              const isBusiness = BUSINESS.includes(seat);
              const isSelected = selected.includes(seat);
              return (
                <div key={col}>
                  <button
                    type="button"
                    disabled={isOccupied}
                    onClick={() => !isOccupied && onSelect(seat)}
                    className={`w-9 h-8 rounded-lg text-xs font-semibold transition-all ${
                      isOccupied
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : isSelected
                        ? "bg-[#1B4332] text-white scale-110 shadow"
                        : isBusiness
                        ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border border-yellow-300"
                        : "bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200"
                    }`}
                  >
                    {isOccupied ? "✕" : seat}
                  </button>
                  {colIdx === 2 && <span className="inline-block w-3" />}
                </div>
              );
            })}
          </div>
        ))}

        {/* Legend */}
        <div className="flex items-center gap-4 mt-4 flex-wrap">
          {[
            { color: "bg-blue-50 border border-blue-200", label: "Disponible" },
            { color: "bg-[#1B4332]", label: "Seleccionado" },
            { color: "bg-yellow-100 border border-yellow-300", label: "Ejecutiva" },
            { color: "bg-gray-200", label: "Ocupado" },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-1.5 text-xs text-gray-500">
              <div className={`w-5 h-5 rounded ${l.color}`} />
              {l.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Booking() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [passengers, setPassengers] = useState<Passengers>({ adults: 1, teens: 0, children: 0, infants: 0 });
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", doc: "", docType: "Cédula",
    cardNumber: "", cardName: "", expiry: "", cvv: "",
  });

  const totalPassengersWithSeats = passengers.adults + passengers.teens + passengers.children;

  const updatePassenger = (type: keyof Passengers, delta: number) => {
    setPassengers((prev) => ({
      ...prev,
      [type]: Math.max(type === "adults" ? 1 : 0, prev[type] + delta),
    }));
  };

  const handleSeatToggle = (seat: string) => {
    setSelectedSeats((prev) =>
      prev.includes(seat) 
        ? prev.filter((s) => s !== seat) 
        : prev.length < totalPassengersWithSeats 
          ? [...prev, seat] 
          : prev
    );
  };

  const handleFieldChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const inputCls = "w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-sm focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332]";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#1B4332] text-white py-5 px-4">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => step === 0 ? navigate("/resultados") : setStep(step - 1)}
            className="flex items-center gap-2 text-white/80 hover:text-white text-sm mb-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {step === 0 ? "Volver a resultados" : "Paso anterior"}
          </button>
          <h2 className="text-white">Completar reserva</h2>
          <p className="text-white/70 text-sm">Bogotá → Madrid · 15 Mar 2026 · 22:30 h</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <StepIndicator current={step} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2">

            {/* STEP 0: Passenger data */}
            {step === 0 && (
              <div className="space-y-5">
                {/* Passenger selection */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-gray-900">Seleccionar pasajeros</h3>
                      <p className="text-xs text-gray-400">Indica el número de pasajeros para el vuelo</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      { key: "adults" as const, label: "Adultos", sub: "15+ años", icon: UserCheck, color: "text-[#1B4332]" },
                      { key: "teens" as const, label: "Jóvenes", sub: "11 a 14 años", icon: User, color: "text-purple-500" },
                      { key: "children" as const, label: "Niños", sub: "2 a 10 años", icon: User, color: "text-blue-500" },
                      { key: "infants" as const, label: "Bebés", sub: "Menores de 2 años · Sin asiento", icon: Baby, color: "text-pink-500" },
                    ].map((p) => {
                      const Icon = p.icon;
                      const count = passengers[p.key];
                      return (
                        <div key={p.key} className="flex items-center justify-between py-2.5 border-b last:border-0 border-gray-100">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                              <Icon className={`w-5 h-5 ${p.color}`} />
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-gray-800">{p.label}</div>
                              <div className="text-xs text-gray-400">{p.sub}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => updatePassenger(p.key, -1)}
                              disabled={p.key === "adults" ? count <= 1 : count <= 0}
                              className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:border-[#1B4332] hover:text-[#1B4332] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center text-sm font-bold text-gray-800">{count}</span>
                            <button
                              type="button"
                              onClick={() => updatePassenger(p.key, 1)}
                              className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:border-[#1B4332] hover:text-[#1B4332] transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Infants notice */}
                  {passengers.infants > 0 && (
                    <div className="mt-4 p-4 bg-pink-50 rounded-xl border border-pink-100 flex items-start gap-3">
                      <Baby className="w-5 h-5 text-pink-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-pink-700">Bebés ({passengers.infants})</p>
                        <p className="text-xs text-pink-600 mt-0.5">
                          Los bebés viajan en brazos del adulto sin asiento asignado. No se requiere formulario adicional.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Primary passenger form */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 bg-cyan-50 rounded-xl flex items-center justify-center">
                      <User className="w-5 h-5 text-[#1B4332]" />
                    </div>
                    <div>
                      <h3 className="text-gray-900">Datos del pasajero principal</h3>
                      <p className="text-xs text-gray-400">Adulto · Contacto de la reserva</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Nombres *</label>
                      <input className={inputCls} placeholder="Ej: Carlos Andrés" value={form.firstName} onChange={(e) => handleFieldChange("firstName", e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Apellidos *</label>
                      <input className={inputCls} placeholder="Ej: Ramírez López" value={form.lastName} onChange={(e) => handleFieldChange("lastName", e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Correo electrónico *</label>
                      <input type="email" className={inputCls} placeholder="correo@email.com" value={form.email} onChange={(e) => handleFieldChange("email", e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Teléfono *</label>
                      <input type="tel" className={inputCls} placeholder="+57 300 000 0000" value={form.phone} onChange={(e) => handleFieldChange("phone", e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Tipo de documento</label>
                      <select className={inputCls} value={form.docType} onChange={(e) => handleFieldChange("docType", e.target.value)}>
                        <option>Cédula de ciudadanía</option>
                        <option>Pasaporte</option>
                        <option>Cédula de extranjería</option>
                        <option>Tarjeta de identidad</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Número de documento *</label>
                      <input className={inputCls} placeholder="Número de documento" value={form.doc} onChange={(e) => handleFieldChange("doc", e.target.value)} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 1: Seat selection */}
            {step === 1 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-gray-900 mb-1">Selección de asientos</h3>
                <p className="text-sm text-gray-400 mb-3">
                  Elige {totalPassengersWithSeats} asiento{totalPassengersWithSeats !== 1 ? "s" : ""} para 
                  {passengers.adults > 0 && ` ${passengers.adults} adulto${passengers.adults !== 1 ? "s" : ""}`}
                  {passengers.teens > 0 && ` ${passengers.teens} joven${passengers.teens !== 1 ? "es" : ""}`}
                  {passengers.children > 0 && ` ${passengers.children} niño${passengers.children !== 1 ? "s" : ""}`}
                </p>
                
                {passengers.infants > 0 && (
                  <div className="mb-4 p-3 bg-pink-50 rounded-lg border border-pink-100 flex items-center gap-2">
                    <Baby className="w-4 h-4 text-pink-500 shrink-0" />
                    <p className="text-xs text-pink-600">
                      Los bebés ({passengers.infants}) viajan en brazos sin asiento asignado
                    </p>
                  </div>
                )}

                <SeatMap selected={selectedSeats} onSelect={handleSeatToggle} />
                {selectedSeats.length > 0 && (
                  <div className="mt-4 bg-cyan-50 rounded-xl px-4 py-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#1B4332]" />
                    <span className="text-sm text-[#1B4332] font-medium">
                      {selectedSeats.length} de {totalPassengersWithSeats} asiento{totalPassengersWithSeats !== 1 ? "s" : ""}: {selectedSeats.join(", ")}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* STEP 2: Payment */}
            {step === 2 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-cyan-50 rounded-xl flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-[#1B4332]" />
                  </div>
                  <div>
                    <h3 className="text-gray-900">Datos de pago</h3>
                    <p className="text-xs text-gray-400">Pago seguro con cifrado SSL</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Número de tarjeta</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        className={`${inputCls} pl-10`}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        value={form.cardNumber}
                        onChange={(e) => handleFieldChange("cardNumber", e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Nombre en la tarjeta</label>
                    <input className={inputCls} placeholder="CARLOS RAMIREZ" value={form.cardName} onChange={(e) => handleFieldChange("cardName", e.target.value)} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Fecha de expiración</label>
                      <input className={inputCls} placeholder="MM/AA" maxLength={5} value={form.expiry} onChange={(e) => handleFieldChange("expiry", e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">CVV</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          className={`${inputCls} pl-10`}
                          placeholder="123"
                          maxLength={4}
                          value={form.cvv}
                          onChange={(e) => handleFieldChange("cvv", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment methods */}
                <div className="mt-5">
                  <p className="text-xs text-gray-400 mb-2">Métodos de pago aceptados</p>
                  <div className="flex gap-2 flex-wrap">
                    {["Visa", "Mastercard", "Amex", "PSE", "Efecty"].map((m) => (
                      <span key={m} className="bg-gray-100 text-gray-600 text-xs px-3 py-1.5 rounded-lg border border-gray-200">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex items-start gap-2 text-xs text-gray-500">
                  <Lock className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  Tus datos de pago están protegidos con cifrado de 256 bits. No almacenamos datos de tarjeta.
                </div>
              </div>
            )}

            {/* STEP 3: Confirmation */}
            {step === 3 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h2 className="text-gray-900 mb-2">¡Reserva confirmada!</h2>
                <p className="text-gray-500 text-sm mb-1">Tu código de reserva es:</p>
                <div className="text-3xl font-bold text-[#1B4332] tracking-widest my-3">RSV-{Math.random().toString(36).substring(2,8).toUpperCase()}</div>
                <p className="text-xs text-gray-400 mb-6">Hemos enviado tu itinerario a <strong>{form.email || "tu correo registrado"}</strong></p>

                <div className="bg-gray-50 rounded-xl p-4 text-left mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-xs font-semibold text-[#1B4332]">Terra Sky</div>
                    <div>
                      <div className="text-sm font-semibold">BOG → MAD</div>
                      <div className="text-xs text-gray-400">15 Mar 2026 · 22:30 – 14:45+1</div>
                    </div>
                  </div>
                  {selectedSeats.length > 0 && (
                    <div className="text-xs text-gray-500">Asiento{selectedSeats.length > 1 ? "s" : ""}: <strong>{selectedSeats.join(", ")}</strong></div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => navigate("/checkin")}
                    className="bg-[#1B4332] text-white px-6 py-3 rounded-xl hover:bg-[#143126] transition-colors text-sm"
                  >
                    Hacer check-in online
                  </button>
                  <button
                    onClick={() => navigate("/")}
                    className="border border-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm"
                  >
                    Volver al inicio
                  </button>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            {step < 3 && (
              <div className="flex justify-between mt-5">
                {step > 0 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="flex items-center gap-2 border border-gray-300 text-gray-700 px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-sm"
                  >
                    <ArrowLeft className="w-4 h-4" /> Anterior
                  </button>
                )}
                <button
                  onClick={() => setStep(step + 1)}
                  className="ml-auto flex items-center gap-2 bg-[#1B4332] text-white px-6 py-2.5 rounded-xl hover:bg-[#143126] transition-colors text-sm"
                >
                  {step === 2 ? "Confirmar y pagar" : "Continuar"}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Sidebar: flight summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sticky top-24">
              <h4 className="text-gray-800 mb-4 pb-3 border-b border-gray-100">Resumen del vuelo</h4>

              {/* Flight info */}
              <div className="flex items-center gap-2 mb-4">
                <div className="text-xs font-semibold text-[#1B4332] shrink-0">Terra Sky</div>
                <div className="text-sm">
                  <div className="font-semibold text-gray-800">BOG → MAD</div>
                  <div className="text-xs text-gray-400">15 Mar 2026</div>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <PlaneTakeoff className="w-4 h-4 text-[#1B4332]" />
                  <span>Salida: <strong>22:30</strong> – Bogotá (BOG)</span>
                </div>
                <div className="flex items-center gap-2">
                  <PlaneLanding className="w-4 h-4 text-[#1B4332]" />
                  <span>Llegada: <strong>14:45</strong> – Madrid (MAD)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>Duración: 11h 15m · Directo</span>
                </div>
              </div>

              {/* Amenities */}
              <div className="flex gap-3 mb-4 pb-4 border-b border-gray-100">
                {[Wifi, Utensils, Luggage].map((Icon, i) => (
                  <div key={i} className="w-8 h-8 bg-cyan-50 rounded-lg flex items-center justify-center">
                    <Icon className="w-4 h-4 text-[#1B4332]" />
                  </div>
                ))}
              </div>

              {/* Price breakdown */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Tarifa base</span><span>$3.320.000 COP</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Tasas e impuestos</span><span>$240.000 COP</span>
                </div>
                {selectedSeats.length > 0 && (
                  <div className="flex justify-between text-gray-500">
                    <span>Selección asiento</span><span>$0 COP</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-gray-900 pt-2 border-t border-gray-100">
                  <span>Total</span><span className="text-[#1B4332]">$3.560.000 COP</span>
                </div>
              </div>

              <p className="text-xs text-gray-400 mt-3 text-center">
                Precio final por persona. Incluye todos los impuestos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



