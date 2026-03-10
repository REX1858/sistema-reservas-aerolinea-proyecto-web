import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  ArrowLeft,
  PlaneTakeoff,
  PlaneLanding,
  Clock,
  Wifi,
  Utensils,
  Luggage,
  Filter,
  X,
  ChevronDown,
  ChevronUp,
  CheckCircle,
} from "lucide-react";

const baseFlights = [
  {
    id: 1,
    from: "BOG",
    fromCity: "Bogotá",
    to: "CTG",
    toCity: "Cartagena",
    depart: "06:30",
    arrive: "08:00",
    duration: "1h 30m",
    stops: "Directo",
    stopCount: 0,
    price: 250000,
    cabin: "Económica",
    seats: 18,
    amenities: ["luggage"],
    aircraft: "Airbus A320",
  },
  {
    id: 2,
    from: "BOG",
    fromCity: "Bogotá",
    to: "CTG",
    toCity: "Cartagena",
    depart: "14:20",
    arrive: "15:50",
    duration: "1h 30m",
    stops: "Directo",
    stopCount: 0,
    price: 285000,
    cabin: "Económica",
    seats: 12,
    amenities: ["wifi", "luggage"],
    aircraft: "Boeing 737",
  },
  {
    id: 3,
    from: "BOG",
    fromCity: "Bogotá",
    to: "MDE",
    toCity: "Medellín",
    depart: "07:15",
    arrive: "08:15",
    duration: "1h",
    stops: "Directo",
    stopCount: 0,
    price: 160000,
    cabin: "Económica",
    seats: 24,
    amenities: ["luggage"],
    aircraft: "Airbus A320",
  },
  {
    id: 4,
    from: "BOG",
    fromCity: "Bogotá",
    to: "CLO",
    toCity: "Cali",
    depart: "16:45",
    arrive: "17:45",
    duration: "1h",
    stops: "Directo",
    stopCount: 0,
    price: 195000,
    cabin: "Económica Plus",
    seats: 8,
    amenities: ["wifi", "food", "luggage"],
    aircraft: "Boeing 737",
  },
  {
    id: 5,
    from: "BOG",
    fromCity: "Bogotá",
    to: "MAD",
    toCity: "Madrid",
    depart: "22:30",
    arrive: "14:45+1",
    duration: "11h 15m",
    stops: "Directo",
    stopCount: 0,
    price: 2890000,
    cabin: "Económica",
    seats: 8,
    amenities: ["wifi", "food", "luggage"],
    aircraft: "Boeing 787",
  },
  {
    id: 6,
    from: "BOG",
    fromCity: "Bogotá",
    to: "MAD",
    toCity: "Madrid",
    depart: "08:10",
    arrive: "23:05",
    duration: "13h 55m",
    stops: "1 escala · MIA",
    stopCount: 1,
    price: 2420000,
    cabin: "Económica",
    seats: 15,
    amenities: ["food", "luggage"],
    aircraft: "Airbus A330",
  },
  {
    id: 7,
    from: "BOG",
    fromCity: "Bogotá",
    to: "MAD",
    toCity: "Madrid",
    depart: "15:40",
    arrive: "08:30+1",
    duration: "11h 50m",
    stops: "Directo",
    stopCount: 0,
    price: 7100000,
    cabin: "Ejecutiva",
    seats: 4,
    amenities: ["wifi", "food", "luggage"],
    aircraft: "Boeing 777",
  },
  {
    id: 8,
    from: "BOG",
    fromCity: "Bogotá",
    to: "BCN",
    toCity: "Barcelona",
    depart: "23:00",
    arrive: "15:30+1",
    duration: "11h 30m",
    stops: "Directo",
    stopCount: 0,
    price: 2870000,
    cabin: "Económica",
    seats: 10,
    amenities: ["wifi", "food", "luggage"],
    aircraft: "Boeing 787",
  },
  {
    id: 9,
    from: "BOG",
    fromCity: "Bogotá",
    to: "JFK",
    toCity: "Nueva York",
    depart: "01:15",
    arrive: "07:50",
    duration: "6h 35m",
    stops: "Directo",
    stopCount: 0,
    price: 2980000,
    cabin: "Económica",
    seats: 12,
    amenities: ["wifi", "food", "luggage"],
    aircraft: "Boeing 787",
  },
  {
    id: 10,
    from: "BOG",
    fromCity: "Bogotá",
    to: "MIA",
    toCity: "Miami",
    depart: "05:30",
    arrive: "10:15",
    duration: "4h 45m",
    stops: "Directo",
    stopCount: 0,
    price: 1850000,
    cabin: "Económica",
    seats: 16,
    amenities: ["wifi", "food", "luggage"],
    aircraft: "Boeing 737",
  },
];

const allFlights = [
  ...baseFlights,
  ...baseFlights.map((flight, index) => ({
    ...flight,
    id: 100 + index,
    from: flight.to,
    fromCity: flight.toCity,
    to: flight.from,
    toCity: flight.fromCity,
  })),
];

const amenityLabel: Record<string, { icon: React.ElementType; label: string }> = {
  wifi: { icon: Wifi, label: "WiFi a bordo" },
  food: { icon: Utensils, label: "Comida incluida" },
  luggage: { icon: Luggage, label: "Equipaje 23 kg" },
};

type SortKey = "price" | "duration" | "depart";

interface SearchState {
  tripType: "ida-vuelta" | "solo-ida";
  origin: string;
  destination: string;
  originCode: string;
  originCity: string;
  destinationCode: string;
  destinationCity: string;
  departDate: string | null;
  returnDate: string | null;
  cabinClass: string;
  passengers: {
    adults: number;
    teens: number;
    children: number;
    infants: number;
  };
}

const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const matchesAirport = (flightCode: string, flightCity: string, queryCode: string, queryCity: string) => {
  if (queryCode) return flightCode === queryCode;
  if (!queryCity) return true;
  return normalize(flightCity).includes(normalize(queryCity));
};

export function SearchResults() {
  const navigate = useNavigate();
  const location = useLocation();
  const search = (location.state as { search?: SearchState } | null)?.search;

  const routeFilteredFlights = useMemo(() => {
    if (!search) return allFlights;
    return allFlights.filter((flight) => {
      const originOk = matchesAirport(flight.from, flight.fromCity, search.originCode, search.originCity);
      const destinationOk = matchesAirport(flight.to, flight.toCity, search.destinationCode, search.destinationCity);
      return originOk && destinationOk;
    });
  }, [search]);

  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<SortKey>("price");
  const [filterStops, setFilterStops] = useState<number | null>(null);
  const [filterCabin, setFilterCabin] = useState(search?.cabinClass === "Primera Clase" ? "" : search?.cabinClass || "");
  const [maxPrice, setMaxPrice] = useState(10000000);
  const [selectedFlight, setSelectedFlight] = useState<number | null>(null);

  let flights = [...routeFilteredFlights];

  if (filterStops !== null) flights = flights.filter((f) => f.stopCount === filterStops);
  if (filterCabin) flights = flights.filter((f) => f.cabin === filterCabin);
  flights = flights.filter((f) => f.price <= maxPrice);

  if (sortBy === "price") flights.sort((a, b) => a.price - b.price);
  else if (sortBy === "depart") flights.sort((a, b) => a.depart.localeCompare(b.depart));
  else if (sortBy === "duration") {
    const toMinutes = (duration: string) => {
      const hMatch = duration.match(/(\d+)h/);
      const mMatch = duration.match(/(\d+)m/);
      const h = hMatch ? Number(hMatch[1]) : 0;
      const m = mMatch ? Number(mMatch[1]) : 0;
      return h * 60 + m;
    };
    flights.sort((a, b) => toMinutes(a.duration) - toMinutes(b.duration));
  }

  const formatCop = (value: number) => new Intl.NumberFormat("es-CO").format(value);

  const headerRoute = search
    ? `${search.originCity || "Origen"} (${search.originCode || "---"}) → ${search.destinationCity || "Destino"} (${search.destinationCode || "---"})`
    : "Red completa Terra Sky";

  const departureLabel = search?.departDate
    ? format(new Date(search.departDate), "d MMM", { locale: es })
    : "15 Mar";

  const returnLabel = search?.returnDate
    ? format(new Date(search.returnDate), "d MMM", { locale: es })
    : "22 Mar";

  const passengerLabel = search
    ? `${search.passengers.adults} adulto${search.passengers.adults !== 1 ? "s" : ""}`
    : "Todos los pasajeros";

  const tripTypeLabel = search?.tripType === "solo-ida" ? "Solo ida" : "Ida y vuelta";

  const handleSelect = (id: number) => {
    setSelectedFlight(id);
    setTimeout(() => navigate("/reservar"), 300);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Results header bar */}
      <div className="bg-[#1B4332] text-white py-5 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-white/80 hover:text-white text-sm mb-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Volver al inicio
            </button>
            <h2 className="text-white">{headerRoute}</h2>
            <p className="text-white/70 text-sm">
              {search
                ? `${passengerLabel} · ${search?.cabinClass || "Económica"} · ${tripTypeLabel}${tripTypeLabel === "Ida y vuelta" ? ` · ${departureLabel} – ${returnLabel} 2026` : ` · ${departureLabel} 2026`}`
                : "Mostrando todas las rutas y tarifas disponibles"}
            </p>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-xl text-sm hover:bg-white/30 transition-colors"
          >
            <Filter className="w-4 h-4" />
            Filtros
            {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-5">
            <div className="flex flex-wrap gap-6 items-start">
              {/* Escala */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Escalas</p>
                <div className="flex gap-2">
                  {[
                    { label: "Todos", val: null },
                    { label: "Directo", val: 0 },
                    { label: "1 escala", val: 1 },
                  ].map((opt) => (
                    <button
                      key={String(opt.val)}
                      onClick={() => setFilterStops(opt.val)}
                      className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${
                        filterStops === opt.val
                          ? "bg-[#1B4332] text-white border-[#1B4332]"
                          : "bg-white text-gray-700 border-gray-300 hover:border-[#1B4332]"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cabina */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Clase</p>
                <div className="flex gap-2 flex-wrap">
                  {["", "Económica", "Económica Plus", "Ejecutiva"].map((c) => (
                    <button
                      key={c}
                      onClick={() => setFilterCabin(c)}
                      className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${
                        filterCabin === c
                          ? "bg-[#1B4332] text-white border-[#1B4332]"
                          : "bg-white text-gray-700 border-gray-300 hover:border-[#1B4332]"
                      }`}
                    >
                      {c || "Todas"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Precio */}
              <div className="min-w-[200px]">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                  Precio máx: <span className="text-[#1B4332]">{formatCop(maxPrice)} COP</span>
                </p>
                <input
                  type="range"
                  min={100000}
                  max={10000000}
                  step={100000}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#1B4332]"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>100.000</span><span>10.000.000</span>
                </div>
              </div>

              {/* Sort */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Ordenar por</p>
                <div className="flex gap-2">
                  {[
                    { label: "Precio", val: "price" as SortKey },
                    { label: "Duración", val: "duration" as SortKey },
                    { label: "Salida", val: "depart" as SortKey },
                  ].map((s) => (
                    <button
                      key={s.val}
                      onClick={() => setSortBy(s.val)}
                      className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${
                        sortBy === s.val
                          ? "bg-[#1B4332] text-white border-[#1B4332]"
                          : "bg-white text-gray-700 border-gray-300 hover:border-[#1B4332]"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reset */}
              <div className="flex items-end">
                <button
                  onClick={() => { setFilterStops(null); setFilterCabin(search?.cabinClass === "Primera Clase" ? "" : search?.cabinClass || ""); setMaxPrice(10000000); setSortBy("price"); }}
                  className="flex items-center gap-1 text-gray-400 text-sm hover:text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" /> Limpiar filtros
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-6">
        <p className="text-gray-500 text-sm mb-4">
          <span className="font-semibold text-gray-800">{flights.length}</span> vuelos encontrados
        </p>

        {flights.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <div className="text-4xl mb-3">✈️</div>
            <h3 className="text-gray-700 mb-2">No hay vuelos con esos filtros</h3>
            <p className="text-gray-400 text-sm mb-4">Intenta ajustando los filtros de búsqueda</p>
            <button
              onClick={() => { setFilterStops(null); setFilterCabin(search?.cabinClass === "Primera Clase" ? "" : search?.cabinClass || ""); setMaxPrice(10000000); }}
              className="bg-[#1B4332] text-white px-5 py-2 rounded-xl text-sm hover:bg-[#143126] transition-colors"
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {flights.map((flight) => (
              <div
                key={flight.id}
                className={`bg-white rounded-2xl shadow-sm border-2 transition-all overflow-hidden ${
                  selectedFlight === flight.id
                    ? "border-[#1B4332] shadow-emerald-100"
                    : "border-gray-100 hover:shadow-md hover:border-gray-200"
                }`}
              >
                <div className="p-5">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    {/* Airline badge */}
                    <div className="flex items-center gap-3 shrink-0">
                      <div>
                        <div className="text-sm font-semibold text-gray-800">Terra Sky</div>
                        <div className="text-xs text-gray-400">{flight.aircraft}</div>
                        <span className={`text-xs px-2 py-0.5 rounded-full mt-0.5 inline-block ${
                          flight.cabin === "Ejecutiva"
                            ? "bg-yellow-100 text-yellow-700"
                            : flight.cabin === "Económica Plus"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-600"
                        }`}>
                          {flight.cabin}
                        </span>
                      </div>
                    </div>

                    {/* Flight timeline */}
                    <div className="flex flex-1 items-center justify-center gap-4 sm:gap-6">
                      <div className="text-center">
                        <div className="font-bold text-gray-900 text-2xl">{flight.depart}</div>
                        <div className="text-xs text-gray-400 flex items-center gap-1 justify-center mt-0.5">
                          <PlaneTakeoff className="w-3 h-3" /> {flight.from}
                        </div>
                        <div className="text-xs text-gray-500">{flight.fromCity}</div>
                      </div>

                      <div className="flex flex-col items-center gap-1 flex-1 max-w-[140px]">
                        <div className="text-xs text-gray-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {flight.duration}
                        </div>
                        <div className="flex items-center gap-1 w-full">
                          <div className="h-px bg-gray-300 flex-1" />
                          {flight.stopCount > 0 && (
                            <div className="w-2 h-2 rounded-full bg-orange-400 border-2 border-white shadow" />
                          )}
                          <div className="w-2 h-2 rounded-full bg-[#0E7490]" />
                          <div className="h-px bg-gray-300 flex-1" />
                        </div>
                        <div className={`text-xs font-medium ${flight.stopCount === 0 ? "text-green-600" : "text-orange-500"}`}>
                          {flight.stops}
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="font-bold text-gray-900 text-2xl">{flight.arrive}</div>
                        <div className="text-xs text-gray-400 flex items-center gap-1 justify-center mt-0.5">
                          <PlaneLanding className="w-3 h-3" /> {flight.to}
                        </div>
                        <div className="text-xs text-gray-500">{flight.toCity}</div>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="hidden md:flex flex-col gap-1.5 shrink-0">
                      {flight.amenities.map((a) => {
                        const info = amenityLabel[a];
                        if (!info) return null;
                        const Icon = info.icon;
                        return (
                          <div key={a} className="flex items-center gap-1.5 text-xs text-gray-500">
                            <Icon className="w-3.5 h-3.5 text-[#0E7490]" />
                            {info.label}
                          </div>
                        );
                      })}
                    </div>

                    {/* Price + CTA */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 w-full sm:w-auto shrink-0">
                      <div className="text-right">
                        <div className="text-xs text-gray-400">por persona</div>
                        <div className="text-[#1B4332] font-bold text-2xl">{formatCop(flight.price)}</div>
                        <div className="text-xs text-gray-400">COP · {flight.seats} asientos</div>
                      </div>
                      <button
                        onClick={() => handleSelect(flight.id)}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm transition-all whitespace-nowrap ${
                          selectedFlight === flight.id
                            ? "bg-green-500 text-white"
                            : "bg-[#1B4332] text-white hover:bg-[#143126] active:scale-95"
                        }`}
                      >
                        {selectedFlight === flight.id ? (
                          <><CheckCircle className="w-4 h-4" /> Seleccionado</>
                        ) : (
                          "Seleccionar"
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Mobile amenities */}
                <div className="flex md:hidden px-5 pb-4 gap-3 flex-wrap">
                  {flight.amenities.map((a) => {
                    const info = amenityLabel[a];
                    if (!info) return null;
                    const Icon = info.icon;
                    return (
                      <div key={a} className="flex items-center gap-1 text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-lg">
                        <Icon className="w-3 h-3 text-[#0E7490]" />
                        {info.label}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


