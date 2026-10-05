import { useMemo } from "react";
import { Collapsible } from "@base-ui/react/collapsible";
import { Drawer } from "@base-ui/react/drawer";
import { NEWS, type NewsItem } from "../../data/news";
import { usePoiStore } from "../../store/poiStore";

const parse = (iso: string) => new Date(`${iso}T00:00:00`); // avoids timezone day-shift
const monthFmt = new Intl.DateTimeFormat("es", {
  month: "long",
  year: "numeric",
});
const dayFmt = new Intl.DateTimeFormat("es", {
  day: "numeric",
  month: "short",
});

export function NewsPanel() {
  // newest first, grouped by month
  const groups = useMemo(() => {
    const sorted = [...NEWS].sort((a, b) => b.date.localeCompare(a.date));
    const map = new Map<string, NewsItem[]>();
    for (const item of sorted) {
      const key = monthFmt.format(parse(item.date));
      map.set(key, [...(map.get(key) ?? []), item]);
    }
    return [...map.entries()];
  }, []);

  return (
    <div>
      <Drawer.Title className="sr-only">Noticias</Drawer.Title>

      {groups.length === 0 && (
        <p className="px-1 py-5 text-stone-600">No hay noticias todavía</p>
      )}

      {groups.map(([month, items]) => (
        <section key={month} className="mb-5">
          <h2 className="mb-2 px-1 text-xs font-semibold tracking-wide text-stone-600 uppercase">
            {month}
          </h2>
          <ul className="flex flex-col gap-3">
            {items.map((item) => (
              <li key={item.id}>
                <NewsCard item={item} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function NewsCard({ item }: { item: NewsItem }) {
  const selectedId = usePoiStore((s) => s.selectedId);
  const select = usePoiStore((s) => s.select);

  const linked = Boolean(item.poiId);
  const isOpen = linked && selectedId === item.poiId;

  return (
    <Collapsible.Root
      // linked stories are driven by the map selection; unlinked ones manage themselves
      {...(linked
        ? {
            open: isOpen,
            onOpenChange: (open: boolean) => select(open ? item.poiId! : null),
          }
        : {})}
      className="overflow-hidden rounded-2xl bg-white/80 shadow-sm"
    >
      {/* Trigger unchanged */}
      <Collapsible.Trigger className="group block w-full text-left outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
        {item.image && (
          <img
            src={item.image}
            alt=""
            loading="lazy"
            decoding="async"
            className="aspect-video w-full bg-stone-200 object-cover"
          />
        )}
        <div className="p-3.5">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <time dateTime={item.date}>{dayFmt.format(parse(item.date))}</time>
            <span
              aria-hidden
              className="transition-transform duration-200 group-data-[panel-open]:rotate-180"
            >
              ▾
            </span>
          </div>
          <h3 className="mt-1 text-base font-bold">{item.title}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-stone-600">
            {item.summary}
          </p>
        </div>
      </Collapsible.Trigger>

      <Collapsible.Panel className="h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-200 ease-out data-starting-style:h-0 data-ending-style:h-0">
        <div className="px-3.5 pb-3.5">
          {item.body && <p className="text-sm">{item.body}</p>}
        </div>
      </Collapsible.Panel>
    </Collapsible.Root>
  );
}
