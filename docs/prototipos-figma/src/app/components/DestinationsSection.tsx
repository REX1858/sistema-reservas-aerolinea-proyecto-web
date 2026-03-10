import { MapPin, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const destinations = [
  {
    id: 1,
    city: "Madrid",
    code: "MAD",
    country: "España",
    price: "desde 2.890.000 COP",
    image: "https://images.unsplash.com/photo-1612694882907-80f21c0e2bb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    hot: true,
    tag: "Internacional",
  },
  {
    id: 2,
    city: "Barcelona",
    code: "BCN",
    country: "España",
    price: "desde 2.870.000 COP",
    image: "https://images.unsplash.com/photo-1691732758999-40e14a08a66a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    hot: false,
    tag: "Internacional",
  },
  {
    id: 3,
    city: "Cali",
    code: "CLO",
    country: "Colombia",
    price: "desde 180.000 COP",
    image: "https://images.unsplash.com/photo-1653658660627-84be3d1bf98d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    hot: true,
    tag: "Nacional",
  },
  {
    id: 4,
    city: "Cartagena",
    code: "CTG",
    country: "Colombia",
    price: "desde 250.000 COP",
    image: "https://images.unsplash.com/photo-1692839685082-c66d810f0a21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    hot: false,
    tag: "Nacional",
  },
  {
    id: 5,
    city: "Medellín",
    code: "MDE",
    country: "Colombia",
    price: "desde 160.000 COP",
    image: "https://images.unsplash.com/photo-1640768239887-77479f49a7dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    hot: true,
    tag: "Nacional",
  },
  {
    id: 6,
    city: "Nueva York",
    code: "JFK",
    country: "Estados Unidos",
    price: "desde 2.980.000 COP",
    image: "https://images.unsplash.com/photo-1644530777878-f576db6ac8ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    hot: false,
    tag: "Internacional",
  },
];

export function DestinationsSection() {
  const navigate = useNavigate();

  const goToRoute = (city: string, code: string) => {
    navigate("/resultados", {
      state: {
        search: {
          tripType: "ida-vuelta",
          origin: "Bogotá (BOG) – El Dorado",
          destination: `${city} (${code})`,
          originCode: "BOG",
          originCity: "Bogotá",
          destinationCode: code,
          destinationCity: city,
          departDate: new Date("2026-03-15T00:00:00.000Z").toISOString(),
          returnDate: new Date("2026-03-22T00:00:00.000Z").toISOString(),
          cabinClass: "Económica",
          passengers: { adults: 1, teens: 0, children: 0, infants: 0 },
        },
      },
    });
  };

  return (
    <section className="bg-gray-50 py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-7">
          <div>
            <div className="flex items-center gap-2 text-[#1B4332] mb-1">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-semibold uppercase tracking-wide">Destinos populares</span>
            </div>
            <h2 className="text-gray-900">¿A dónde quieres volar?</h2>
          </div>
          <button
            onClick={() => navigate("/resultados")}
            className="hidden sm:flex items-center gap-1 text-[#1B4332] text-sm hover:gap-2 transition-all hover:underline"
          >
            Ver todos <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {destinations.map((dest) => (
            <div
              key={dest.id}
              className="group cursor-pointer rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
              onClick={() => goToRoute(dest.city, dest.code)}
            >
              <div className="relative h-52 overflow-hidden">
                <ImageWithFallback
                  src={dest.image}
                  alt={`${dest.city}, ${dest.country}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full border border-white/30">
                    {dest.tag}
                  </span>
                  {dest.hot && (
                    <span className="bg-[#1B4332] text-white text-xs px-2 py-0.5 rounded-full">
                      🔥 Popular
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white flex items-end justify-between">
                  <div>
                    <div className="font-bold text-lg leading-tight">{dest.city}</div>
                    <div className="text-xs opacity-80">{dest.country}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs opacity-70">desde</div>
                    <div className="font-bold text-sm">{dest.price.replace("desde ", "")}</div>
                  </div>
                </div>
              </div>
              <div className="bg-white px-4 py-3 flex items-center justify-between">
                <span className="text-xs text-gray-400">Ida y vuelta · Directo disponible</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToRoute(dest.city, dest.code);
                  }}
                  className="flex items-center gap-1 text-[#0E7490] text-sm font-semibold hover:gap-2 transition-all"
                >
                  Reservar <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

