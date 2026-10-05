export type NewsItem = {
  id: string;
  title: string;
  summary: string;
  body?: string;
  date: string; // ISO, "2026-10-03"
  image?: string; // served from public/, e.g. "/images/news/1.jpg"
  poiId?: string; // links the story to a marker
};

// placeholder content: replace with your real stories
export const NEWS: NewsItem[] = [
  {
    id: "n-galeron",
    title:
      "El Galerón Margariteño es declarado Patrimonio Cultural Inmaterial de Venezuela",
    summary:
      "El ministro de Cultura certificó oficialmente el galerón margariteño en El Cercado, municipio Gómez.",
    body: 'El ministro de Cultura, Raúl Cazal, visitó el pueblo de El Cercado, en el municipio Gómez, para certificar oficialmente el galerón margariteño como Patrimonio Inmaterial de Venezuela. Durante el acto, que coincidió con las festividades en honor a "El Gran Poder de Dios", se llevó a cabo la Feria Turística Artesanal Gómez 2026, donde artesanos locales exhibieron piezas hechas a mano como vasijas de arcilla, chinchorros tejidos y dulces típicos. La actividad también incluyó la interpretación de décimas orientales por parte de 13 galeronistas de la región.',
    date: "2026-06-01",
    poiId: "news-galeron",
  },
  {
    id: "n-ciudad-mural",
    title:
      'Segunda edición de "Ciudad Mural" transforma La Asunción en una galería a cielo abierto',
    summary:
      "El municipio Arismendi presentó la segunda edición del proyecto que convoca a muralistas en el casco histórico.",
    body: 'Las autoridades del municipio Arismendi presentaron la segunda edición del proyecto cultural "Ciudad Mural", una iniciativa que convoca a muralistas locales e internacionales para intervenir paredes y fachadas en el casco histórico de La Asunción. El objetivo es embellecer el paisaje urbano, recuperar espacios en deterioro y fortalecer el sentido de pertenencia y el atractivo turístico de la isla. La primera edición, realizada en agosto de 2025, reunió a artistas de Venezuela, Brasil y Cuba, y rindió homenaje a la cultura asuntina y sus tradiciones.',
    date: "2026-08-11",
    poiId: "news-ciudad-mural",
  },
];
