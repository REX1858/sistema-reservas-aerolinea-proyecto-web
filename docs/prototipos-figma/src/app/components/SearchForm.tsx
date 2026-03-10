import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  PlaneTakeoff,
  PlaneLanding,
  Calendar,
  Users,
  ArrowLeftRight,
  Search,
  ChevronDown,
  Plus,
  Minus,
  Baby,
  User,
  UserCheck,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { Calendar as CalendarComponent } from "../components/ui/calendar";
import { format } from "date-fns";
import { es } from "date-fns/locale";

type TripType = "ida-vuelta" | "solo-ida";

interface Passengers {
  adults: number;
  teens: number;
  children: number;
  infants: number;
}

const AIRPORTS = [
  "Bogotá (BOG) – El Dorado",
  "Medellín (MDE) – José M. Córdova",
  "Cali (CLO) – Alfonso Bonilla",
  "Cartagena (CTG) – Rafael Núñez",
  "Madrid (MAD) – Barajas",
  "Barcelona (BCN) – El Prat",
  "Nueva York (JFK) – John F. Kennedy",
  "Miami (MIA) – International",
];

function AirportInput({
  label,
  icon: Icon,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  icon: React.ElementType;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const filtered = AIRPORTS.filter((a) =>
    a.toLowerCase().includes(value.toLowerCase())
  );

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="flex-1 relative" ref={ref}>
      <label className="block text-xs text-gray-500 mb-1 ml-1">{label}</label>
      <div className="relative flex items-center">
        <Icon className="absolute left-3 w-4 h-4 text-[#1B4332] z-10" />
        <input
          type="text"
          value={value}
          onChange={(e) => { onChange(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          autoComplete="off"
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332] text-sm bg-gray-50"
        />
      </div>
      {open && value.length > 0 && filtered.length > 0 && (
        <ul className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-30 max-h-52 overflow-y-auto">
          {filtered.map((airport) => (
            <li key={airport}>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  onChange(airport);
                  setOpen(false);
                }}
                className="w-full text-left px-4 py-2.5 text-sm hover:bg-cyan-50 hover:text-[#1B4332] transition-colors"
              >
                {airport}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function SearchForm() {
  const navigate = useNavigate();
  const [tripType, setTripType] = useState<TripType>("ida-vuelta");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departDate, setDepartDate] = useState<Date | undefined>();
  const [returnDate, setReturnDate] = useState<Date | undefined>();
  const [cabinClass, setCabinClass] = useState("Económica");
  const [passengers, setPassengers] = useState<Passengers>({ adults: 1, teens: 0, children: 0, infants: 0 });
  const [showPassengers, setShowPassengers] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [searchError, setSearchError] = useState("");
  const today = new Date();
  const passRef = useRef<HTMLDivElement>(null);

  // Close passenger dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (passRef.current && !passRef.current.contains(e.target as Node))
        setShowPassengers(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const totalPassengers = passengers.adults + passengers.teens + passengers.children + passengers.infants;

  const passengerSummary = () => {
    const parts = [];
    parts.push(`${passengers.adults} adulto${passengers.adults !== 1 ? "s" : ""}`);
    if (passengers.teens > 0)
      parts.push(`${passengers.teens} joven${passengers.teens !== 1 ? "es" : ""}`);
    if (passengers.children > 0)
      parts.push(`${passengers.children} niño${passengers.children !== 1 ? "s" : ""}`);
    if (passengers.infants > 0)
      parts.push(`${passengers.infants} bebé${passengers.infants !== 1 ? "s" : ""}`);
    return parts.join(", ");
  };

  const swapLocations = () => {
    const tmp = origin;
    setOrigin(destination);
    setDestination(tmp);
  };

  const updatePassenger = (type: keyof Passengers, delta: number) => {
    setPassengers((prev) => ({
      ...prev,
      [type]: Math.max(type === "adults" ? 1 : 0, prev[type] + delta),
    }));
  };

  const extractAirportData = (value: string) => {
    const codeMatch = value.match(/\(([A-Z]{3})\)/);
    const code = codeMatch?.[1] || "";
    const city = value.split("(")[0].trim();
    return { code, city };
  };

  const handleSearch = () => {
    const originData = extractAirportData(origin);
    const destinationData = extractAirportData(destination);

    if (!originData.code || !destinationData.code) {
      setSearchError("Selecciona origen y destino desde la lista de aeropuertos.");
      return;
    }

    if (originData.code === destinationData.code) {
      setSearchError("Origen y destino no pueden ser el mismo aeropuerto.");
      return;
    }

    setSearchError("");

    navigate("/resultados", {
      state: {
        search: {
          tripType,
          origin,
          destination,
          originCode: originData.code,
          originCity: originData.city,
          destinationCode: destinationData.code,
          destinationCity: destinationData.city,
          departDate: departDate ? departDate.toISOString() : null,
          returnDate: returnDate ? returnDate.toISOString() : null,
          cabinClass,
          passengers,
        },
      },
    });
  };

  const tabs: { id: TripType; label: string }[] = [
    { id: "ida-vuelta", label: "Ida y vuelta" },
    { id: "solo-ida", label: "Solo ida" },
  ];

  const passengerTypes = [
    { key: "adults" as const, label: "Adultos", sub: "15+ años", icon: UserCheck, color: "text-[#1B4332]" },
    { key: "teens" as const, label: "Jóvenes", sub: "11 a 14 años", icon: User, color: "text-[#0E7490]" },
    { key: "children" as const, label: "Niños", sub: "2 a 10 años", icon: User, color: "text-teal-600" },
    { key: "infants" as const, label: "Bebés", sub: "Menores de 2 años", icon: Baby, color: "text-cyan-600" },
  ];

  const formatDateDisplay = () => {
    if (!departDate) return "Seleccionar fechas";
    const departStr = format(departDate, "d MMM", { locale: es });
    if (tripType === "ida-vuelta" && returnDate) {
      const returnStr = format(returnDate, "d MMM", { locale: es });
      return `${departStr} - ${returnStr}`;
    }
    return departStr;
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-5 sm:p-7 w-full max-w-5xl">
      {/* Trip type tabs */}
      <div className="flex gap-1 mb-5 bg-gray-100 rounded-xl p-1 w-fit">
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab.id}
            onClick={() => setTripType(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              tripType === tab.id
                ? "bg-[#1B4332] text-white shadow"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Row 1: Origin / Destination / Dates */}
      <div className="flex flex-col lg:flex-row gap-3">
        <AirportInput
          label="Origen"
          icon={PlaneTakeoff}
          value={origin}
          onChange={setOrigin}
          placeholder="Ciudad o aeropuerto"
        />

        {/* Swap button */}
        <div className="hidden lg:flex items-end pb-1">
          <button
            type="button"
            onClick={swapLocations}
            className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-[#1B4332] hover:text-[#1B4332] transition-colors mt-5"
          >
            <ArrowLeftRight className="w-4 h-4" />
          </button>
        </div>

        <AirportInput
          label="Destino"
          icon={PlaneLanding}
          value={destination}
          onChange={setDestination}
          placeholder="Ciudad o aeropuerto"
        />

        {/* Date Range Picker */}
        <div className="flex-[1.25]">
          <label className="block text-xs text-gray-500 mb-1 ml-1">Fechas</label>
          <Popover open={showDatePicker} onOpenChange={setShowDatePicker}>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="w-full flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-sm hover:border-[#1B4332] transition-colors text-left"
              >
                <Calendar className="w-4 h-4 text-[#1B4332] shrink-0" />
                <span className="text-gray-700">{formatDateDisplay()}</span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              {tripType === "ida-vuelta" ? (
                <div className="p-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 mb-2">Fecha de salida</p>
                      <CalendarComponent
                        mode="single"
                        selected={departDate}
                        onSelect={(date) => {
                          setDepartDate(date);
                          if (returnDate && date && returnDate < date) {
                            setReturnDate(undefined);
                          }
                        }}
                        disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                        locale={es}
                      />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 mb-2">Fecha de regreso</p>
                      <CalendarComponent
                        mode="single"
                        selected={returnDate}
                        onSelect={setReturnDate}
                        disabled={(date) => {
                          const minDate = departDate || new Date(new Date().setHours(0, 0, 0, 0));
                          return date < minDate;
                        }}
                        locale={es}
                      />
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setDepartDate(undefined);
                        setReturnDate(undefined);
                      }}
                      className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      Limpiar
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowDatePicker(false)}
                      className="px-4 py-2 bg-[#1B4332] text-white text-sm rounded-lg hover:bg-[#143126] transition-colors"
                    >
                      Aplicar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-3">
                  <p className="text-xs font-semibold text-gray-500 mb-2">Fecha de salida</p>
                  <CalendarComponent
                    mode="single"
                    selected={departDate}
                    onSelect={(date) => {
                      setDepartDate(date);
                      setShowDatePicker(false);
                    }}
                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                    locale={es}
                  />
                </div>
              )}
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Row 2: Passengers + Babies + Class + Search */}
      <div className="flex flex-col sm:flex-row gap-3 mt-3">

        {/* Passengers dropdown */}
        <div className="flex-1 relative" ref={passRef}>
          <label className="block text-xs text-gray-500 mb-1 ml-1">Pasajeros</label>
          <button
            type="button"
            onClick={() => setShowPassengers((v) => !v)}
            className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-sm hover:border-[#1B4332] transition-colors"
          >
            <div className="flex items-center gap-2 min-w-0">
              <Users className="w-4 h-4 text-[#1B4332] shrink-0" />
              <span className="text-gray-700 truncate">{passengerSummary()}</span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-gray-400 transition-transform shrink-0 ml-1 ${showPassengers ? "rotate-180" : ""}`}
            />
          </button>

          {showPassengers && (
            <div className="absolute top-full left-0 right-0 sm:right-auto mt-2 bg-white border border-gray-200 rounded-2xl shadow-2xl p-4 z-50 w-full sm:w-[360px] max-w-[calc(100vw-2rem)] max-h-[70vh] overflow-y-auto">
              <p className="text-xs text-gray-400 mb-3 uppercase tracking-wide">Selecciona pasajeros</p>

              {passengerTypes.map((p) => {
                const Icon = p.icon;
                const count = passengers[p.key];
                return (
                  <div key={p.key} className="flex items-start justify-between py-3 border-b last:border-0 border-gray-100">
                    <div className="flex items-center gap-3 min-w-0 pr-2">
                      <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                        <Icon className={`w-4 h-4 ${p.color}`} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-gray-800">{p.label}</div>
                        <div className="text-xs text-gray-400 leading-tight">{p.sub}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); updatePassenger(p.key, -1); }}
                        disabled={p.key === "adults" ? count <= 1 : count <= 0}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-[#1B4332] hover:text-[#1B4332] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-sm font-semibold text-gray-800">{count}</span>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); updatePassenger(p.key, 1); }}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-[#1B4332] hover:text-[#1B4332] transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* Summary pill */}
              <div className="mt-3 bg-cyan-50 rounded-xl px-3 py-2 flex items-center justify-between">
                <span className="text-xs text-gray-500">Total</span>
                <span className="text-sm font-bold text-[#1B4332]">
                  {totalPassengers} pasajero{totalPassengers !== 1 ? "s" : ""}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setShowPassengers(false)}
                className="mt-3 w-full bg-[#1B4332] text-white py-2.5 rounded-xl text-sm hover:bg-[#143126] transition-colors font-semibold"
              >
                Confirmar selección
              </button>
            </div>
          )}
        </div>

        {/* Cabin class */}
        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1 ml-1">Clase</label>
          <div className="relative">
            <select
              value={cabinClass}
              onChange={(e) => setCabinClass(e.target.value)}
              className="w-full appearance-none px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-sm focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332]"
            >
              <option>Económica</option>
              <option>Económica Plus</option>
              <option>Ejecutiva</option>
              <option>Primera Clase</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Search button */}
        <div className="sm:flex-none">
          <label className="block text-xs text-transparent mb-1 select-none">.</label>
          <button
            type="button"
            onClick={handleSearch}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#1B4332] hover:bg-[#143126] active:scale-95 text-white px-8 py-3 rounded-xl transition-all shadow-lg shadow-emerald-200"
          >
            <Search className="w-4 h-4" />
            <span>Buscar vuelos</span>
          </button>
        </div>
      </div>

      {searchError && (
        <div className="mt-3 rounded-xl border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm text-cyan-700">
          {searchError}
        </div>
      )}
    </div>
  );
}