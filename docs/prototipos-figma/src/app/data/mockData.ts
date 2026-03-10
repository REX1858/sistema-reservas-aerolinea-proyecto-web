// ──────────────────────────────────────────────
//  MOCK DATA — Terra Sky
// ──────────────────────────────────────────────

export const CLIENTES = [
  { id: 1, nombres: "Carlos Andrés", apellidos: "Ramírez López", correo: "carlos.ramirez@email.com", telefono: "+57 300 123 4567", telefonoAlt: "", ciudad: "Bogotá", departamento: "Cundinamarca", pais: "Colombia", doc: "CC 10254789", estado: "Activo" },
  { id: 2, nombres: "María Fernanda", apellidos: "González Pérez", correo: "mfernanda@email.com", telefono: "+57 315 987 6543", telefonoAlt: "", ciudad: "Medellín", departamento: "Antioquia", pais: "Colombia", doc: "CC 71345678", estado: "Activo" },
  { id: 3, nombres: "Jorge Luis", apellidos: "Martínez Silva", correo: "jorge.martinez@email.com", telefono: "+57 320 456 7890", telefonoAlt: "", ciudad: "Cali", departamento: "Valle del Cauca", pais: "Colombia", doc: "CC 94123456", estado: "Activo" },
  { id: 4, nombres: "Laura Patricia", apellidos: "Torres Vega", correo: "laurap@email.com", telefono: "+57 311 234 5678", telefonoAlt: "", ciudad: "Barranquilla", departamento: "Atlántico", pais: "Colombia", doc: "CC 22456789", estado: "Activo" },
  { id: 5, nombres: "Andrés Felipe", apellidos: "Rodríguez Mora", correo: "andresf@email.com", telefono: "+57 316 345 6789", telefonoAlt: "", ciudad: "Cartagena", departamento: "Bolívar", pais: "Colombia", doc: "CC 80234567", estado: "Activo" },
  { id: 6, nombres: "Valentina", apellidos: "Herrera Castro", correo: "valeh@email.com", telefono: "+57 314 567 8901", telefonoAlt: "", ciudad: "Bucaramanga", departamento: "Santander", pais: "Colombia", doc: "CC 63789012", estado: "Activo" },
  { id: 7, nombres: "David Alejandro", apellidos: "Ospina Ruiz", correo: "davidosp@email.com", telefono: "+57 318 678 9012", telefonoAlt: "", ciudad: "Pereira", departamento: "Risaralda", pais: "Colombia", doc: "CC 10123456", estado: "Inactivo" },
  { id: 8, nombres: "Catalina", apellidos: "Vargas Nieto", correo: "catav@email.com", telefono: "+57 312 789 0123", telefonoAlt: "", ciudad: "Santa Marta", departamento: "Magdalena", pais: "Colombia", doc: "CC 57890123", estado: "Activo" },
  { id: 9, nombres: "Sebastián", apellidos: "Morales Cruz", correo: "sebm@email.com", telefono: "+57 319 890 1234", telefonoAlt: "", ciudad: "Armenia", departamento: "Quindío", pais: "Colombia", doc: "CC 10901234", estado: "Activo" },
  { id: 10, nombres: "Isabella", apellidos: "Ramos Díaz", correo: "isabellar@email.com", telefono: "+57 313 901 2345", telefonoAlt: "", ciudad: "Villavicencio", departamento: "Meta", pais: "Colombia", doc: "CC 40012345", estado: "Activo" },
  { id: 11, nombres: "Miguel Ángel", apellidos: "Jiménez Reyes", correo: "miguelj@email.com", telefono: "+57 317 012 3456", telefonoAlt: "", ciudad: "Bogotá", departamento: "Cundinamarca", pais: "Colombia", doc: "CC 79012345", estado: "Activo" },
  { id: 12, nombres: "Sofía", apellidos: "Castro Leal", correo: "sofiac@email.com", telefono: "+57 310 123 4567", telefonoAlt: "", ciudad: "Medellín", departamento: "Antioquia", pais: "Colombia", doc: "CC 43123456", estado: "Activo" },
  { id: 13, nombres: "Juan Pablo", apellidos: "Ríos Ortega", correo: "juanpr@email.com", telefono: "+57 321 234 5678", telefonoAlt: "", ciudad: "Madrid", departamento: "—", pais: "España", doc: "PA AB123456", estado: "Activo" },
  { id: 14, nombres: "Natalia", apellidos: "Sánchez Montoya", correo: "natalias@email.com", telefono: "+57 322 345 6789", telefonoAlt: "", ciudad: "Nueva York", departamento: "—", pais: "Estados Unidos", doc: "PA CD789012", estado: "Activo" },
  { id: 15, nombres: "Alejandro", apellidos: "Ponce Bedoya", correo: "alejandrop@email.com", telefono: "+57 323 456 7890", telefonoAlt: "", ciudad: "Cali", departamento: "Valle del Cauca", pais: "Colombia", doc: "CC 94567890", estado: "Inactivo" },
];

export const VUELOS = [
  { id: 1, codigo: "AN1042", origen: "Bogotá (BOG)", destino: "Madrid (MAD)", salida: "2026-03-15 22:30", llegada: "2026-03-16 14:45", capacidad: 180, precio: 3560000, estado: "Programado", aeronave: "Boeing 787" },
  { id: 2, codigo: "AN0231", origen: "Medellín (MDE)", destino: "Bogotá (BOG)", salida: "2026-03-15 08:10", llegada: "2026-03-15 09:05", capacidad: 120, precio: 356000, estado: "Programado", aeronave: "Airbus A320" },
  { id: 3, codigo: "AN0815", origen: "Bogotá (BOG)", destino: "Cartagena (CTG)", salida: "2026-03-15 14:30", llegada: "2026-03-15 15:50", capacidad: 140, precio: 480000, estado: "En vuelo", aeronave: "Airbus A320" },
  { id: 4, codigo: "AN0554", origen: "Nueva York (JFK)", destino: "Bogotá (BOG)", salida: "2026-03-15 11:00", llegada: "2026-03-15 19:30", capacidad: 220, precio: 3920000, estado: "Finalizado", aeronave: "Boeing 777" },
  { id: 5, codigo: "AN0677", origen: "Bogotá (BOG)", destino: "Medellín (MDE)", salida: "2026-03-16 07:00", llegada: "2026-03-16 07:55", capacidad: 120, precio: 300000, estado: "Programado", aeronave: "Airbus A320" },
  { id: 6, codigo: "AN0912", origen: "Cali (CLO)", destino: "Bogotá (BOG)", salida: "2026-03-16 09:20", llegada: "2026-03-16 10:30", capacidad: 120, precio: 380000, estado: "Programado", aeronave: "Airbus A320" },
  { id: 7, codigo: "AN1155", origen: "Bogotá (BOG)", destino: "Lima (LIM)", salida: "2026-03-17 16:40", llegada: "2026-03-17 20:10", capacidad: 160, precio: 1800000, estado: "Programado", aeronave: "Airbus A330" },
  { id: 8, codigo: "AN0320", origen: "Barranquilla (BAQ)", destino: "Bogotá (BOG)", salida: "2026-03-17 06:30", llegada: "2026-03-17 08:00", capacidad: 120, precio: 440000, estado: "Programado", aeronave: "Airbus A320" },
  { id: 9, codigo: "AN0440", origen: "Bogotá (BOG)", destino: "Buenos Aires (EZE)", salida: "2026-03-18 21:00", llegada: "2026-03-19 07:30", capacidad: 180, precio: 2480000, estado: "Programado", aeronave: "Boeing 787" },
  { id: 10, codigo: "AN0763", origen: "Madrid (MAD)", destino: "Bogotá (BOG)", salida: "2026-03-22 10:20", llegada: "2026-03-22 18:05", capacidad: 180, precio: 3480000, estado: "Programado", aeronave: "Boeing 787" },
  { id: 11, codigo: "AN0189", origen: "Bogotá (BOG)", destino: "Ciudad de México (MEX)", salida: "2026-03-19 13:15", llegada: "2026-03-19 17:45", capacidad: 160, precio: 1520000, estado: "Cancelado", aeronave: "Airbus A330" },
  { id: 12, codigo: "AN0334", origen: "Pereira (PEI)", destino: "Bogotá (BOG)", salida: "2026-03-20 05:45", llegada: "2026-03-20 06:55", capacidad: 80, precio: 260000, estado: "Programado", aeronave: "ATR 72" },
];

export const PAQUETES = [
  { id: 1, nombre: "Hotel Cartagena 3N", descripcion: "3 noches en hotel 4★ en la zona histórica", destino: "Cartagena", precio: 1120000, estado: "Disponible", incluye: ["3 noches hotel 4★", "Desayuno incluido", "Traslado aeropuerto"] },
  { id: 2, nombre: "Tour Isla Barú", descripcion: "Excursión de día completo a Isla Barú con snorkel", destino: "Cartagena", precio: 340000, estado: "Disponible", incluye: ["Transporte marítimo", "Almuerzo", "Equipo de snorkel"] },
  { id: 3, nombre: "Traslado Aeropuerto-Hotel", descripcion: "Servicio de transporte privado al hotel", destino: "Bogotá", precio: 140000, estado: "Disponible", incluye: ["Vehículo privado", "Seguimiento de vuelo", "Hasta 2 maletas"] },
  { id: 4, nombre: "Tour Cultural Madrid", descripcion: "City tour guiado por los principales museos de Madrid", destino: "Madrid", precio: 480000, estado: "Disponible", incluye: ["Guía bilingüe", "Museo del Prado", "Palacio Real"] },
  { id: 5, nombre: "Excursión Miami Beach", descripcion: "Tour por Miami Beach y Art Deco District", destino: "Miami", precio: 380000, estado: "Disponible", incluye: ["Bus panorámico", "Guía turístico", "Almuerzo"] },
  { id: 6, nombre: "Hotel Medellín 2N", descripcion: "2 noches en hotel boutique en El Poblado", destino: "Medellín", precio: 600000, estado: "Disponible", incluye: ["2 noches hotel boutique", "Desayuno", "WiFi premium"] },
  { id: 7, nombre: "Parque Tayrona", descripcion: "Excursión al Parque Nacional Tayrona desde Santa Marta", destino: "Santa Marta", precio: 280000, estado: "Disponible", incluye: ["Transporte", "Entrada al parque", "Guía ecológico"] },
  { id: 8, nombre: "Hotel Barcelona 4N", descripcion: "4 noches en hotel 4★ cerca de Las Ramblas", destino: "Barcelona", precio: 1920000, estado: "No disponible", incluye: ["4 noches hotel 4★", "Desayuno buffet", "Tarjeta de transporte"] },
  { id: 9, nombre: "Tour Gastronómico Cali", descripcion: "Recorrido por los mejores restaurantes de Cali", destino: "Cali", precio: 220000, estado: "Disponible", incluye: ["5 paradas gastronómicas", "Guía local", "Bebidas incluidas"] },
  { id: 10, nombre: "Paquete Familiar Bogotá", descripcion: "Plan familiar en Bogotá con atracciones para niños", destino: "Bogotá", precio: 800000, estado: "Disponible", incluye: ["Maloka", "Monserrate", "Zoo de Cali", "2 días"] },
];

export const ESTADOS_RESERVA = ["Reservada", "Confirmada", "Cancelada", "Expirada"];

export const RESERVAS = [
  { id: 1, codigo: "RES-00001", id_cliente: 1, cliente: "Carlos Andrés Ramírez", id_vuelo: 1, vuelo: "AN1042 BOG→MAD", fecha: "2026-02-10", valor: 3560000, estado: "Confirmada", paquetes: ["Tour Cultural Madrid"] },
  { id: 2, codigo: "RES-00002", id_cliente: 2, cliente: "María Fernanda González", id_vuelo: 2, vuelo: "AN0231 MDE→BOG", fecha: "2026-02-12", valor: 356000, estado: "Confirmada", paquetes: [] },
  { id: 3, codigo: "RES-00003", id_cliente: 3, cliente: "Jorge Luis Martínez", id_vuelo: 3, vuelo: "AN0815 BOG→CTG", fecha: "2026-02-14", valor: 1940000, estado: "Reservada", paquetes: ["Hotel Cartagena 3N", "Tour Isla Barú"] },
  { id: 4, codigo: "RES-00004", id_cliente: 4, cliente: "Laura Patricia Torres", id_vuelo: 7, vuelo: "AN1155 BOG→LIM", fecha: "2026-02-15", valor: 1800000, estado: "Confirmada", paquetes: [] },
  { id: 5, codigo: "RES-00005", id_cliente: 5, cliente: "Andrés Felipe Rodríguez", id_vuelo: 1, vuelo: "AN1042 BOG→MAD", fecha: "2026-02-16", valor: 4040000, estado: "Reservada", paquetes: ["Tour Cultural Madrid"] },
  { id: 6, codigo: "RES-00006", id_cliente: 6, cliente: "Valentina Herrera", id_vuelo: 5, vuelo: "AN0677 BOG→MDE", fecha: "2026-02-18", valor: 300000, estado: "Confirmada", paquetes: ["Hotel Medellín 2N"] },
  { id: 7, codigo: "RES-00007", id_cliente: 7, cliente: "David Alejandro Ospina", id_vuelo: 9, vuelo: "AN0440 BOG→EZE", fecha: "2026-02-20", valor: 2480000, estado: "Cancelada", paquetes: [] },
  { id: 8, codigo: "RES-00008", id_cliente: 8, cliente: "Catalina Vargas", id_vuelo: 8, vuelo: "AN0320 BAQ→BOG", fecha: "2026-02-22", valor: 440000, estado: "Confirmada", paquetes: [] },
  { id: 9, codigo: "RES-00009", id_cliente: 9, cliente: "Sebastián Morales", id_vuelo: 3, vuelo: "AN0815 BOG→CTG", fecha: "2026-02-24", valor: 700000, estado: "Reservada", paquetes: ["Traslado Aeropuerto-Hotel"] },
  { id: 10, codigo: "RES-00010", id_cliente: 10, cliente: "Isabella Ramos", id_vuelo: 6, vuelo: "AN0912 CLO→BOG", fecha: "2026-02-25", valor: 1180000, estado: "Confirmada", paquetes: ["Paquete Familiar Bogotá"] },
  { id: 11, codigo: "RES-00011", id_cliente: 11, cliente: "Miguel Ángel Jiménez", id_vuelo: 1, vuelo: "AN1042 BOG→MAD", fecha: "2026-02-26", valor: 8400000, estado: "Confirmada", paquetes: ["Tour Cultural Madrid"] },
  { id: 12, codigo: "RES-00012", id_cliente: 12, cliente: "Sofía Castro", id_vuelo: 10, vuelo: "AN0763 MAD→BOG", fecha: "2026-02-28", valor: 3480000, estado: "Reservada", paquetes: [] },
  { id: 13, codigo: "RES-00013", id_cliente: 13, cliente: "Juan Pablo Ríos", id_vuelo: 2, vuelo: "AN0231 MDE→BOG", fecha: "2026-03-01", valor: 356000, estado: "Expirada", paquetes: [] },
  { id: 14, codigo: "RES-00014", id_cliente: 14, cliente: "Natalia Sánchez", id_vuelo: 4, vuelo: "AN0554 JFK→BOG", fecha: "2026-03-02", valor: 3920000, estado: "Confirmada", paquetes: ["Traslado Aeropuerto-Hotel"] },
  { id: 15, codigo: "RES-00015", id_cliente: 15, cliente: "Alejandro Ponce", id_vuelo: 12, vuelo: "AN0334 PEI→BOG", fecha: "2026-03-03", valor: 260000, estado: "Cancelada", paquetes: [] },
];

export const TIQUETES = [
  { id: 1, id_reserva: 1, codigo_reserva: "RES-00001", asiento: "14C", clase: "Económica", precio: 3560000, pasajero: "Carlos Andrés Ramírez" },
  { id: 2, id_reserva: 2, codigo_reserva: "RES-00002", asiento: "5A", clase: "Económica", precio: 356000, pasajero: "María Fernanda González" },
  { id: 3, id_reserva: 3, codigo_reserva: "RES-00003", asiento: "22B", clase: "Económica", precio: 480000, pasajero: "Jorge Luis Martínez" },
  { id: 4, id_reserva: 3, codigo_reserva: "RES-00003", asiento: "22C", clase: "Económica", precio: 480000, pasajero: "Acompañante Jorge" },
  { id: 5, id_reserva: 4, codigo_reserva: "RES-00004", asiento: "8D", clase: "Ejecutiva", precio: 1800000, pasajero: "Laura Patricia Torres" },
  { id: 6, id_reserva: 5, codigo_reserva: "RES-00005", asiento: "31E", clase: "Económica", precio: 3560000, pasajero: "Andrés Felipe Rodríguez" },
  { id: 7, id_reserva: 6, codigo_reserva: "RES-00006", asiento: "12F", clase: "Económica", precio: 300000, pasajero: "Valentina Herrera" },
  { id: 8, id_reserva: 8, codigo_reserva: "RES-00008", asiento: "3A", clase: "Ejecutiva", precio: 440000, pasajero: "Catalina Vargas" },
  { id: 9, id_reserva: 9, codigo_reserva: "RES-00009", asiento: "18B", clase: "Económica", precio: 480000, pasajero: "Sebastián Morales" },
  { id: 10, id_reserva: 10, codigo_reserva: "RES-00010", asiento: "7C", clase: "Económica", precio: 380000, pasajero: "Isabella Ramos" },
  { id: 11, id_reserva: 10, codigo_reserva: "RES-00010", asiento: "7D", clase: "Económica", precio: 380000, pasajero: "Isabella hija" },
  { id: 12, id_reserva: 11, codigo_reserva: "RES-00011", asiento: "2A", clase: "Ejecutiva", precio: 8400000, pasajero: "Miguel Ángel Jiménez" },
  { id: 13, id_reserva: 12, codigo_reserva: "RES-00012", asiento: "25B", clase: "Económica", precio: 3480000, pasajero: "Sofía Castro" },
  { id: 14, id_reserva: 14, codigo_reserva: "RES-00014", asiento: "11A", clase: "Económica", precio: 3920000, pasajero: "Natalia Sánchez" },
  { id: 15, id_reserva: 15, codigo_reserva: "RES-00015", asiento: "9C", clase: "Económica", precio: 260000, pasajero: "Alejandro Ponce" },
  { id: 16, id_reserva: 1, codigo_reserva: "RES-00001", asiento: "14D", clase: "Económica", precio: 3560000, pasajero: "Acompañante Carlos" },
  { id: 17, id_reserva: 4, codigo_reserva: "RES-00004", asiento: "8E", clase: "Ejecutiva", precio: 1800000, pasajero: "Acompañante Laura" },
  { id: 18, id_reserva: 6, codigo_reserva: "RES-00006", asiento: "12E", clase: "Económica", precio: 300000, pasajero: "Acompañante Val" },
  { id: 19, id_reserva: 9, codigo_reserva: "RES-00009", asiento: "18C", clase: "Económica", precio: 480000, pasajero: "Acompañante Seb" },
  { id: 20, id_reserva: 11, codigo_reserva: "RES-00011", asiento: "2B", clase: "Ejecutiva", precio: 8400000, pasajero: "Acompañante Miguel" },
];

export const HISTORIAL = [
  { id: 1, id_reserva: 7, codigo: "RES-00007", estado_anterior: "Confirmada", estado_nuevo: "Cancelada", fecha: "2026-02-21", agente: "Sistema" },
  { id: 2, id_reserva: 13, codigo: "RES-00013", estado_anterior: "Reservada", estado_nuevo: "Expirada", fecha: "2026-03-02", agente: "Sistema" },
  { id: 3, id_reserva: 15, codigo: "RES-00015", estado_anterior: "Reservada", estado_nuevo: "Cancelada", fecha: "2026-03-04", agente: "Agente01" },
  { id: 4, id_reserva: 1, codigo: "RES-00001", estado_anterior: "Reservada", estado_nuevo: "Confirmada", fecha: "2026-02-11", agente: "Agente01" },
  { id: 5, id_reserva: 2, codigo: "RES-00002", estado_anterior: "Reservada", estado_nuevo: "Confirmada", fecha: "2026-02-13", agente: "Agente02" },
];

export const STATS = {
  total_reservas: 15,
  reservas_confirmadas: 8,
  reservas_canceladas: 2,
  ingresos_mes: 37692000,
  vuelos_activos: 10,
  clientes_activos: 13,
  tiquetes_vendidos: 20,
  paquetes_vendidos: 9,
};
