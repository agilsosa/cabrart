// data/pois.ts
export type Poi = {
  id: string;
  name: string;
  category: "museum" | "gallery" | "landmark" | "news";
  position: [x: number, z: number];
  onlyWhenSelected?: boolean; // marker is hidden until it's the selected POI
  address?: string;
  hours?: string;
  description?: string;
  image?: string;
};

export const CATEGORY_COLOR = {
  museum: "#e8505b",
  gallery: "#f2b134",
  landmark: "#4a90d9",
  news: "#7c5cd6",
} as const;

export const POIS: Poi[] = [
  {
    id: "m1",
    name: "Galería Somos 111.1",
    category: "museum",
    position: [26, 2],
    address: "Av. Aldonza Manrique, Urb. Playa El Ángel, Pampatar / Porlamar",
    hours: "Lunes a Sábado: 10:00 AM - 6:00 PM",
    description:
      "Espacio de arte contemporáneo y galería independiente focalizada en el talento insular y nacional. Alberga exposiciones cambiantes de pintura, fotografía, escultura y diseño visual.",
    image: "/assets/somos-1111.jpg",
  },
  {
    id: "m2",
    name: "Museo de Arte Contemporáneo Francisco Narváez",
    category: "museum",
    position: [24, 6],
    address: "Calle Igualdad c/c Calle Fraternidad, Centro de Porlamar",
    hours: "Martes a Sábado: 9:00 AM - 4:00 PM",
    description:
      "Museo en el centro de Porlamar dedicado al escultor y pintor margariteño Francisco Narváez. La planta baja reúne esculturas en madera, piedra y bronce, además de pinturas suyas y de otros artistas de su época, mientras que la planta alta se destina a exposiciones temporales.",
    image: "/assets/narvaez.jpg",
  },
  {
    id: "m3",
    name: "Fundación Serpentina",
    category: "museum",
    position: [22, -3],
    address: "Calle San Nicolás, Sector Genovés, Porlamar",
    hours: "Lunes a Viernes: 9:00 AM - 5:00 PM",
    description:
      "Espacio cultural y museístico alternativo enfocado en las artes escénicas, los títeres, la indumentaria artesanal y talleres comunitarios orientados a la promoción artística y el patrimonio regional.",
    image: "/assets/serpentina.jpg",
  },
  {
    id: "m4",
    name: "Casa de la Cultura Ramón Vásquez Brito",
    category: "museum",
    position: [25, 4],
    address: "Av. 4 de Mayo c/c Calle Cedeño, Porlamar",
    hours: "Lunes a Viernes: 8:00 AM - 5:00 PM | Sábados: 9:00 AM - 1:00 PM",
    description:
      "Centro cultural referencial bautizado en honor al paisajista y pintor Ramón Vásquez Brito. Dispone de salas de exposición artística (como la Sala Inocente Carreño), auditorio para teatro y eventos musicales, y aulas para formación en artes plásticas.",
    image: "/assets/casa.jpg",
  },
  {
    id: "news-galeron",
    name: "El Cercado, municipio Gómez",
    category: "news",
    onlyWhenSelected: true,
    position: [15, -4], // TODO: placeholder, replace with the real coordinates
  },
  {
    id: "news-ciudad-mural",
    name: "Casco histórico de La Asunción",
    category: "news",
    onlyWhenSelected: true,
    position: [22, -3], // TODO: placeholder, replace with the real coordinates
  },
];
