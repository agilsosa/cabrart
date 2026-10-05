export type EventItem = {
  id: string;
  title: string;
  date: string; // start, ISO "2026-10-17"
  endDate?: string; // for multi-day events
  time?: string; // "18:00"
  place?: string;
  description?: string;
  image?: string; // e.g. "/images/events/e1.jpg"
  poiId?: string; // links the event to a marker
};

// placeholder content: replace with your real events
export const EVENTS: EventItem[] = [
  {
    id: "e1",
    title: "Inauguración de exposición",
    date: "2026-10-17",
    time: "18:00",
    place: "Museo de Arte Contemporáneo Francisco Narváez",
    description: "Texto de ejemplo para la descripción del evento.",
    poiId: "m2",
  },
  {
    id: "e2",
    title: "Taller abierto",
    date: "2026-10-24",
    endDate: "2026-10-25",
    place: "Casa de la Cultura Ramón Vásquez Brito",
    poiId: "m4",
  },
];
