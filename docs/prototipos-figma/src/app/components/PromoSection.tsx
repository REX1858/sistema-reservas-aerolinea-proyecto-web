import { Tag, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

const promos = [
  {
    id: 1,
    tag: "Oferta especial",
    title: "Vuelos nacionales",
    subtitle: "Bogotá · Medellín · Cali",
    price: "desde 89.000 COP",
    color: "bg-[#1B4332]",
    textColor: "text-white",
    accent: "bg-white/20",
    route: "BOG-MDE",
  },
  {
    id: 2,
    tag: "Paquete completo",
    title: "Madrid + Hotel",
    subtitle: "7 noches incluidas",
    price: "desde 8.850.000 COP",
    color: "bg-[#0E7490]",
    textColor: "text-white",
    accent: "bg-white/20",
    route: "BOG-MAD",
  },
  {
    id: 3,
    tag: "Escapada de verano",
    title: "Cartagena de Indias",
    subtitle: "Vuelo + Resort todo incluido",
    price: "desde 1.450.000 COP",
    color: "bg-gradient-to-br from-orange-500 to-pink-500",
    textColor: "text-white",
    accent: "bg-white/20",
    route: "BOG-CTG",
  },
  {
    id: 4,
    tag: "Temporada alta",
    title: "Nueva York – JFK",
    subtitle: "Clase ejecutiva disponible",
    price: "desde 4.980.000 COP",
    color: "bg-gray-800",
    textColor: "text-white",
    accent: "bg-white/10",
    route: "BOG-JFK",
  },
];

export function PromoSection() {
  const navigate = useNavigate();

  const routeToCity: Record<string, { city: string; code: string }> = {
    "BOG-MDE": { city: "Medellín", code: "MDE" },
    "BOG-MAD": { city: "Madrid", code: "MAD" },
    "BOG-CTG": { city: "Cartagena", code: "CTG" },
    "BOG-JFK": { city: "Nueva York", code: "JFK" },
  };

  const goToPromoRoute = (route: string) => {
    const target = routeToCity[route];
    if (!target) {
      navigate("/resultados");
      return;
    }

    navigate("/resultados", {
      state: {
        search: {
          tripType: "ida-vuelta",
          origin: "Bogotá (BOG) – El Dorado",
          destination: `${target.city} (${target.code})`,
          originCode: "BOG",
          originCity: "Bogotá",
          destinationCode: target.code,
          destinationCity: target.city,
          departDate: new Date("2026-03-15T00:00:00.000Z").toISOString(),
          returnDate: new Date("2026-03-22T00:00:00.000Z").toISOString(),
          cabinClass: "Económica",
          passengers: { adults: 1, teens: 0, children: 0, infants: 0 },
        },
      },
    });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
      <div className="flex items-center justify-between mb-7">
        <div>
          <div className="flex items-center gap-2 text-[#1B4332] mb-1">
            <Tag className="w-4 h-4" />
            <span className="text-sm font-semibold uppercase tracking-wide">Ofertas y promociones</span>
          </div>
          <h2 className="text-gray-900">Descubre nuestras mejores ofertas</h2>
        </div>
        <button
          onClick={() => navigate("/resultados")}
          className="hidden sm:flex items-center gap-1 text-[#1B4332] text-sm hover:gap-2 transition-all hover:underline"
        >
          Ver todas <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {promos.map((promo) => (
          <button
            key={promo.id}
            onClick={() => goToPromoRoute(promo.route)}
            className={`${promo.color} ${promo.textColor} rounded-2xl p-5 cursor-pointer hover:scale-[1.02] transition-transform shadow-md relative overflow-hidden group text-left w-full`}
          >
            <div className={`absolute -top-4 -right-4 w-24 h-24 rounded-full ${promo.accent}`} />
            <div className={`absolute -bottom-6 -left-6 w-32 h-32 rounded-full ${promo.accent}`} />

            <div className="relative z-10">
              <span className="inline-block text-xs bg-white/25 px-2 py-0.5 rounded-full mb-3">
                {promo.tag}
              </span>
              <h3 className="text-base font-bold leading-tight mb-1">{promo.title}</h3>
              <p className="text-xs opacity-80 mb-4">{promo.subtitle}</p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs opacity-70">Precio</div>
                  <div className="font-bold">{promo.price}</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

