import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Search, CheckCircle, Smartphone, Printer, User, PlaneTakeoff } from "lucide-react";

const mockPass = {
  passenger: "Carlos Andrés Ramírez",
  flight: "FL 1042",
  date: "15 Mar 2026",
  from: "BOG",
  to: "MAD",
  boarding: "21:00",
  gate: "B14",
  seat: "14C",
  cabin: "Económica",
  status: "Listo para embarque",
};

export function CheckIn() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"search" | "done">("search");
  const [code, setCode] = useState("");
  const [doc, setDoc] = useState("");
  const [notFound, setNotFound] = useState(false);

  const handleSearch = () => {
    if (code || doc) { setStep("done"); setNotFound(false); }
    else setNotFound(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#1B4332] text-white py-5 px-4">
        <div className="max-w-3xl mx-auto">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-white/80 hover:text-white text-sm mb-2">
            <ArrowLeft className="w-4 h-4" /> Volver al inicio
          </button>
          <h2 className="text-white">Check-in online</h2>
          <p className="text-white/70 text-sm">Disponible hasta 1 hora antes de tu vuelo</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {step === "search" && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-gray-900 mb-1">Identificar reserva</h3>
            <p className="text-sm text-gray-400 mb-5">Ingresa tu código de reserva y documento para continuar</p>

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
                <label className="block text-xs text-gray-500 mb-1">Número de documento</label>
                <input
                  value={doc}
                  onChange={(e) => setDoc(e.target.value)}
                  placeholder="Cédula o pasaporte"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-sm focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332]"
                />
              </div>
            </div>

            {notFound && (
              <p className="mt-3 text-sm text-red-600">Por favor ingresa al menos un dato para buscar.</p>
            )}

            <button
              onClick={handleSearch}
              className="mt-5 flex items-center gap-2 bg-[#1B4332] text-white px-6 py-3 rounded-xl hover:bg-[#143126] transition-colors text-sm"
            >
              <Search className="w-4 h-4" /> Iniciar check-in
            </button>
          </div>
        )}

        {step === "done" && (
          <div className="space-y-5">
            {/* Success */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-5 flex items-start gap-4">
              <CheckCircle className="w-7 h-7 text-green-500 shrink-0" />
              <div>
                <p className="font-semibold text-green-700">¡Check-in completado exitosamente!</p>
                <p className="text-sm text-green-600 mt-0.5">Tu tarjeta de embarque está lista. Preséntala en la puerta de embarque.</p>
              </div>
            </div>

            {/* Boarding pass */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
              {/* Header */}
              <div className="bg-[#1B4332] text-white p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs opacity-70 uppercase tracking-widest mb-1">Terra Sky</div>
                    <div className="text-2xl font-bold">Tarjeta de Embarque</div>
                  </div>
                  <PlaneTakeoff className="w-10 h-10 opacity-40" />
                </div>
              </div>

              {/* Body */}
              <div className="p-5 grid grid-cols-2 sm:grid-cols-4 gap-5">
                <div className="col-span-2">
                  <div className="text-xs text-gray-400 uppercase">Pasajero</div>
                  <div className="font-bold text-gray-900 mt-0.5">{mockPass.passenger}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 uppercase">Vuelo</div>
                  <div className="font-bold text-gray-900 mt-0.5">{mockPass.flight}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 uppercase">Fecha</div>
                  <div className="font-bold text-gray-900 mt-0.5">{mockPass.date}</div>
                </div>

                <div>
                  <div className="text-xs text-gray-400 uppercase">Origen</div>
                  <div className="font-bold text-3xl text-[#1B4332]">{mockPass.from}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 uppercase">Destino</div>
                  <div className="font-bold text-3xl text-[#1B4332]">{mockPass.to}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 uppercase">Asiento</div>
                  <div className="font-bold text-3xl text-gray-900">{mockPass.seat}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 uppercase">Clase</div>
                  <div className="font-bold text-gray-900 mt-0.5">{mockPass.cabin}</div>
                </div>

                <div>
                  <div className="text-xs text-gray-400 uppercase">Embarque</div>
                  <div className="font-bold text-gray-900 mt-0.5">{mockPass.boarding}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 uppercase">Puerta</div>
                  <div className="font-bold text-2xl text-gray-900">{mockPass.gate}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-xs text-gray-400 uppercase">Estado</div>
                  <span className="inline-block mt-0.5 bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-semibold">
                    {mockPass.status}
                  </span>
                </div>
              </div>

              {/* Barcode */}
              <div className="border-t-2 border-dashed border-gray-200 p-5 flex items-center justify-between">
                <div className="flex gap-0.5">
                  {Array.from({ length: 60 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-gray-900"
                      style={{
                        width: Math.random() > 0.5 ? 3 : 2,
                        height: i % 7 === 0 ? 40 : 28,
                      }}
                    />
                  ))}
                </div>
                <div className="text-xs text-gray-400 ml-4 text-right shrink-0">
                  <div>AN1042/15MAR</div>
                  <div>14C / BOG-MAD</div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 bg-[#1B4332] text-white px-5 py-2.5 rounded-xl hover:bg-[#143126] transition-colors text-sm"
              >
                <Printer className="w-4 h-4" /> Imprimir tarjeta
              </button>
              <button className="flex items-center gap-2 bg-[#0E7490] text-white px-5 py-2.5 rounded-xl hover:bg-[#0B5D73] transition-colors text-sm">
                <Smartphone className="w-4 h-4" /> Guardar en móvil
              </button>
              <button
                onClick={() => navigate("/gestionar")}
                className="flex items-center gap-2 border border-gray-300 text-gray-700 px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-sm"
              >
                <User className="w-4 h-4" /> Ver reserva
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


