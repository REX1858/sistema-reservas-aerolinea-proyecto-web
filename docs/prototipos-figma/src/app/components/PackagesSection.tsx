import { Hotel, Luggage, Utensils, ArrowRight, Star } from "lucide-react";
import { useNavigate } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const packages = [
  {
    id: 1,
    name: "Cartagena Express",
    destinationCity: "Cartagena",
    destinationCode: "CTG",
    description: "Vuelo + 3 noches hotel + traslados",
    price: "920.000 COP",
    originalPrice: "1.280.000 COP",
    discount: "28%",
    stars: 4,
    image: "https://images.unsplash.com/photo-1621944860377-8cfda325a59e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    includes: ["Vuelo ida y vuelta", "Hotel 4★ céntrico", "Traslado aeropuerto", "Desayuno incluido"],
  },
  {
    id: 2,
    name: "Clase Ejecutiva Madrid",
    destinationCity: "Madrid",
    destinationCode: "MAD",
    description: "Vuelo ejecutiva + hotel boutique 5★",
    price: "8.100.000 COP",
    originalPrice: "10.800.000 COP",
    discount: "25%",
    stars: 5,
    image: "https://images.unsplash.com/photo-1772354852092-0685c2bf32b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    includes: ["Ejecutiva ida y vuelta", "Hotel 5★ Madrid centro", "Acceso Lounge VIP", "Traslado privado"],
  },
];

export function PackagesSection() {
  const navigate = useNavigate();

  const goToPackageRoute = (destinationCity: string, destinationCode: string) => {
    navigate("/resultados", {
      state: {
        search: {
          tripType: "ida-vuelta",
          origin: "Bogotá (BOG) – El Dorado",
          destination: `${destinationCity} (${destinationCode})`,
          originCode: "BOG",
          originCity: "Bogotá",
          destinationCode,
          destinationCity,
          departDate: new Date("2026-03-15T00:00:00.000Z").toISOString(),
          returnDate: new Date("2026-03-22T00:00:00.000Z").toISOString(),
          cabinClass: destinationCode === "MAD" ? "Ejecutiva" : "Económica",
          passengers: { adults: 1, teens: 0, children: 0, infants: 0 },
        },
      },
    });
  };

  return (
    <section className="bg-white py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-7">
          <div>
            <div className="flex items-center gap-2 text-[#1B4332] mb-1">
              <Hotel className="w-4 h-4" />
              <span className="text-sm font-semibold uppercase tracking-wide">Paquetes turísticos</span>
            </div>
            <h2 className="text-gray-900">Vuelo + Hotel: Todo incluido</h2>
          </div>
          <button
            onClick={() => navigate("/resultados")}
            className="hidden sm:flex items-center gap-1 text-[#1B4332] text-sm hover:gap-2 transition-all hover:underline"
          >
            Ver paquetes <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-all group cursor-pointer"
              onClick={() => goToPackageRoute(pkg.destinationCity, pkg.destinationCode)}
            >
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-52 h-48 sm:h-auto relative overflow-hidden shrink-0">
                  <ImageWithFallback
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className="absolute top-3 left-3 bg-[#1B4332] text-white text-xs font-bold px-2 py-1 rounded-lg">
                    -{pkg.discount}
                  </span>
                  {/* Stars */}
                  <div className="absolute bottom-3 left-3 flex gap-0.5">
                    {Array.from({ length: pkg.stars }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-gray-900 mb-1">{pkg.name}</h3>
                    <p className="text-gray-500 text-sm mb-3">{pkg.description}</p>
                    <div className="flex flex-col gap-1.5 mb-4">
                      {pkg.includes.map((item) => (
                        <div key={item} className="flex items-center gap-2 text-xs text-gray-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#0E7490] shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div>
                      <span className="text-xs text-gray-400 line-through">{pkg.originalPrice}</span>
                      <div className="text-[#1B4332] font-bold text-lg">{pkg.price}</div>
                      <div className="text-xs text-gray-400">por persona</div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        goToPackageRoute(pkg.destinationCity, pkg.destinationCode);
                      }}
                      className="bg-[#0E7490] text-white px-4 py-2.5 rounded-xl text-sm hover:bg-[#0B5D73] transition-colors flex items-center gap-1"
                    >
                      Ver paquete <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Feature pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: Luggage, label: "Equipaje incluido", sub: "23 kg en bodega" },
            { icon: Utensils, label: "Comida a bordo", sub: "Menú seleccionable" },
            { icon: Hotel, label: "Hotel garantizado", sub: "Confirmación inmediata" },
          ].map((f) => (
            <div key={f.label} className="flex items-center gap-3 bg-gray-50 rounded-xl p-4 border border-gray-100">
              <div className="w-11 h-11 rounded-xl bg-cyan-50 flex items-center justify-center shrink-0">
                <f.icon className="w-5 h-5 text-[#0E7490]" />
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-800">{f.label}</div>
                <div className="text-xs text-gray-400">{f.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

