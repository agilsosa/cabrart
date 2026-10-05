import { useMemo, useState } from "react";
import { Button } from "@base-ui/react/button";
import { Drawer } from "@base-ui/react/drawer";
import { Separator } from "@base-ui/react/separator";
import { EVENTS, type EventItem } from "../../data/event";
import { usePoiStore } from "../../store/poiStore";

// local-date helpers (toISOString would shift the day for some timezones)
const iso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const parse = (s: string) => new Date(`${s}T00:00:00`);

const monthFmt = new Intl.DateTimeFormat("es", {
  month: "long",
  year: "numeric",
});
const longFmt = new Intl.DateTimeFormat("es", {
  weekday: "long",
  day: "numeric",
  month: "long",
});
const shortFmt = new Intl.DateTimeFormat("es", {
  day: "numeric",
  month: "short",
});
const WEEKDAYS = ["L", "M", "X", "J", "V", "S", "D"]; // Monday first

const occursOn = (e: EventItem, day: string) =>
  e.date <= day && day <= (e.endDate ?? e.date);

export function CalendarPanel() {
  const today = useMemo(() => iso(new Date()), []);
  const [month, setMonth] = useState(() => {
    const n = new Date();
    return new Date(n.getFullYear(), n.getMonth(), 1);
  });
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const shiftMonth = (delta: number) => {
    setMonth((m) => new Date(m.getFullYear(), m.getMonth() + delta, 1));
    setSelectedDay(null);
  };

  const goToday = () => {
    const n = new Date();
    setMonth(new Date(n.getFullYear(), n.getMonth(), 1));
    setSelectedDay(today);
  };

  // grid cells: leading blanks, then every day of the month as an ISO string
  const cells = useMemo(() => {
    const y = month.getFullYear();
    const m = month.getMonth();
    const lead = (new Date(y, m, 1).getDay() + 6) % 7;
    const count = new Date(y, m + 1, 0).getDate();
    return [
      ...Array<null>(lead).fill(null),
      ...Array.from({ length: count }, (_, i) => iso(new Date(y, m, i + 1))),
    ];
  }, [month]);

  const monthEvents = useMemo(() => {
    const start = iso(month);
    const end = iso(new Date(month.getFullYear(), month.getMonth() + 1, 0));
    return EVENTS.filter(
      (e) => e.date <= end && (e.endDate ?? e.date) >= start,
    ).sort(
      (a, b) =>
        a.date.localeCompare(b.date) ||
        (a.time ?? "").localeCompare(b.time ?? ""),
    );
  }, [month]);

  const listed = selectedDay
    ? monthEvents.filter((e) => occursOn(e, selectedDay))
    : monthEvents;

  return (
    <div>
      <Drawer.Title className="sr-only">Calendario</Drawer.Title>

      {/* month header */}
      <div className="flex items-center justify-between">
        <Button
          onClick={() => shiftMonth(-1)}
          aria-label="Mes anterior"
          className="flex size-10 items-center justify-center rounded-full text-lg outline-none hover:bg-black/5 focus-visible:ring-2 focus-visible:ring-blue-600"
        >
          ‹
        </Button>
        <div className="flex items-center gap-2">
          <h2 className="text-base font-bold capitalize">
            {monthFmt.format(month)}
          </h2>
          <Button
            onClick={goToday}
            className="rounded-full bg-white/70 px-2.5 py-1 text-xs font-medium outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            Hoy
          </Button>
        </div>
        <Button
          onClick={() => shiftMonth(1)}
          aria-label="Mes siguiente"
          className="flex size-10 items-center justify-center rounded-full text-lg outline-none hover:bg-black/5 focus-visible:ring-2 focus-visible:ring-blue-600"
        >
          ›
        </Button>
      </div>

      {/* weekday labels + day grid */}
      <div className="mt-2 grid grid-cols-7 text-center text-xs text-stone-500">
        {WEEKDAYS.map((d) => (
          <span key={d} className="py-1">
            {d}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((day, i) => {
          if (!day) return <span key={`b${i}`} />;
          const selected = day === selectedDay;
          const isToday = day === today;
          const has = monthEvents.some((e) => occursOn(e, day));
          return (
            <Button
              key={day}
              onClick={() => setSelectedDay(selected ? null : day)}
              aria-label={longFmt.format(parse(day))}
              aria-pressed={selected}
              className={`relative mx-auto flex size-10 items-center justify-center rounded-full text-sm outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                selected
                  ? "bg-stone-800 text-white"
                  : isToday
                    ? "ring-1 ring-stone-800"
                    : "hover:bg-black/5"
              }`}
            >
              {Number(day.slice(8))}
              {has && (
                <span
                  aria-hidden
                  className={`absolute bottom-1 size-1 rounded-full ${selected ? "bg-white" : "bg-rose-500"}`}
                />
              )}
            </Button>
          );
        })}
      </div>

      {/* event list */}
      <h3 className="mt-5 mb-2 px-1 text-xs font-semibold tracking-wide text-stone-600 uppercase">
        {selectedDay ? longFmt.format(parse(selectedDay)) : "Eventos del mes"}
      </h3>

      <p className="sr-only" role="status" aria-live="polite">
        {listed.length} {listed.length === 1 ? "evento" : "eventos"}
      </p>

      {listed.length === 0 ? (
        <p className="px-1 py-4 text-stone-600">
          No hay eventos {selectedDay ? "este día" : "este mes"}
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {listed.map((e) => (
            <li key={e.id}>
              <EventCard event={e} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function EventCard({ event: e }: { event: EventItem }) {
  const select = usePoiStore((s) => s.select);

  const when = e.endDate
    ? `${shortFmt.format(parse(e.date))} – ${shortFmt.format(parse(e.endDate))}`
    : shortFmt.format(parse(e.date));

  return (
    <article className="overflow-hidden rounded-2xl bg-white/80 shadow-sm">
      {e.image && (
        <img
          src={e.image}
          alt=""
          loading="lazy"
          decoding="async"
          className="aspect-video w-full bg-stone-200 object-cover"
        />
      )}
      <div className="p-3.5">
        <p className="text-xs text-stone-500">
          <time dateTime={e.date}>{when}</time>
          {e.time && ` · ${e.time}`}
        </p>
        <h4 className="mt-1 text-base font-bold">{e.title}</h4>
        {e.place && <p className="text-sm text-stone-600">{e.place}</p>}
        {e.description && <p className="mt-2 text-sm">{e.description}</p>}

        {e.poiId && (
          <>
            <Separator className="my-3 h-px bg-black/10" />
            <Button
              onClick={() => select(e.poiId!)}
              className="rounded-lg bg-stone-800 px-3 py-2 text-sm font-medium text-white outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              Ver en el mapa
            </Button>
          </>
        )}
      </div>
    </article>
  );
}
