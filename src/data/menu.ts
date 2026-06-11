export interface MenuItem {
  name: string;
  description: string;
  price: string;
  tags?: string[];
}

export interface MenuCategory {
  id: string;
  label: string;
  items: MenuItem[];
}

export const menuData: MenuCategory[] = [
  {
    id: "entrantes",
    label: "Entrantes",
    items: [
      {
        name: "Steak Tartar en tuétano",
        description: "Carpaccio de vacuno madurado, yema curada, mostaza antigua y tuétano asado.",
        price: "—",
        tags: ["estrella", "vaca madurada"],
      },
      {
        name: "Croquetas de puchero",
        description: "Bechamel cremosa de gallina de corral, jamón ibérico y caldo de puchero.",
        price: "—",
        tags: ["caseras"],
      },
      {
        name: "Sashimi de corvina",
        description: "Corvina salvaje, ponzu de yuzu, sésamo tostado y gel de jengibre.",
        price: "—",
        tags: ["pescado salvaje"],
      },
      {
        name: "Tartar de atún rojo",
        description: "Atún rojo de almadraba, aguacate, mayonesa de wasabi y crujiente de arroz.",
        price: "—",
        tags: ["almadraba"],
      },
    ],
  },
  {
    id: "arroces",
    label: "Arroces",
    items: [
      {
        name: "Arroz de carabinero y azafrán",
        description: "Arroz meloso con carabinero salvaje, azafrán de La Mancha y all i oli.",
        price: "—",
        tags: ["meloso", "carabinero"],
      },
      {
        name: "Arroz de presa ibérica y boletus",
        description: "Arroz seco con presa ibérica de bellota, boletus edulis y parmesano.",
        price: "—",
        tags: ["ibérico", "boletus"],
      },
      {
        name: "Arroz de verduras de temporada",
        description: "Arroz caldoso con alcachofa, espárrago, habas y hierbabuena.",
        price: "—",
        tags: ["temporada", "caldoso"],
      },
    ],
  },
  {
    id: "principales",
    label: "Principales",
    items: [
      {
        name: "Solomillo Wellington",
        description: "Solomillo de vacuno envuelto en hojaldre, duxelle de setas y foie.",
        price: "—",
        tags: ["clásico", "vacuno"],
      },
      {
        name: "Merluza de pincho en salsa verde",
        description: "Merluza del Cantábrico, almejas, espárragos y salsa verde ligera.",
        price: "—",
        tags: ["cantábrico", "pescado salvaje"],
      },
      {
        name: "Presa ibérica con puré de boniato",
        description: "Presa ibérica de bellota marinada, puré de boniato ahumado y demi-glace.",
        price: "—",
        tags: ["ibérico", "ahumado"],
      },
    ],
  },
  {
    id: "postres",
    label: "Postres",
    items: [
      {
        name: "Baba de ron y vainilla",
        description: "Bizcocho Ba-Ba, ron añejo, nata montada y virutas de vainilla de Madagascar.",
        price: "—",
        tags: ["clásico francés"],
      },
      {
        name: "Tarta de queso y frutos rojos",
        description: "Cheesecake cremoso horneado, coulis de frutos rojos y sorbete de limón.",
        price: "—",
        tags: ["cremoso"],
      },
      {
        name: "Chocolate y aceite de oliva",
        description: "Brownie denso de chocolate valrhona, helado de aceite de oliva virgen extra y sal maldon.",
        price: "—",
        tags: ["valrhona"],
      },
    ],
  },
  {
    id: "bebidas",
    label: "Bebidas",
    items: [
      {
        name: "Selección de vinos por copas",
        description: "Carta rotativa de vinos nacionales e internacionales maridados con la propuesta culinaria.",
        price: "—",
        tags: ["carta rotativa"],
      },
      {
        name: "Cóctel de la casa",
        description: "Creación propia con ginebra artesana, vermut, cítricos y especias.",
        price: "—",
        tags: ["autor"],
      },
      {
        name: "Agua filtrada y sin gas",
        description: "Agua osmotizada purificada en casa, servida en jarra de vidrio.",
        price: "—",
        tags: ["natural"],
      },
    ],
  },
];
