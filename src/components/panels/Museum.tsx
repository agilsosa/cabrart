import { useMemo, useState } from "react";
import { Button } from "@base-ui/react/button";
import { Drawer } from "@base-ui/react/drawer";
import { Field } from "@base-ui/react/field";
import { Separator } from "@base-ui/react/separator";
import { POIS, type Poi } from "../../data/pois";
import { usePoiStore } from "../../store/poiStore";

const MUSEUMS = POIS.filter((p) => p.category === "museum");

export function MuseumsPanel({
  onSearchFocus,
}: {
  onSearchFocus?: () => void;
}) {
  const selectedId = usePoiStore((s) => s.selectedId);
  const select = usePoiStore((s) => s.select);
  const [query, setQuery] = useState("");

  const selected = POIS.find((p) => p.id === selectedId) ?? null;

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return MUSEUMS;
    return MUSEUMS.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.address?.toLowerCase().includes(q),
    );
  }, [query]);

  if (selected) {
    return <PoiDetail poi={selected} onBack={() => select(null)} />;
  }

  return (
    <div>
      <Drawer.Title className="sr-only">Museums</Drawer.Title>

      <Field.Root>
        <Field.Label className="sr-only">Search museums</Field.Label>
        <Field.Control
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={onSearchFocus}
          placeholder="Search museums"
          className="w-full rounded-xl bg-white/70 px-3.5 py-3 text-base outline-none placeholder:text-stone-500 focus:bg-white focus-visible:ring-2 focus-visible:ring-blue-600"
        />
      </Field.Root>

      <p className="sr-only" role="status" aria-live="polite">
        {results.length} {results.length === 1 ? "museum" : "museums"} found
      </p>

      <ul className="mt-3">
        {results.map((m, i) => (
          <li key={m.id}>
            <Button
              onClick={() => {
                (document.activeElement as HTMLElement | null)?.blur();
                select(m.id);
              }}
              className="flex w-full flex-col items-start gap-0.5 rounded-lg px-1 py-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-blue-600 data-[disabled]:opacity-50"
            >
              <span className="font-semibold">{m.name}</span>
              {m.address && (
                <span className="text-sm text-stone-600">{m.address}</span>
              )}
            </Button>
            {i < results.length - 1 && (
              <Separator className="h-px bg-black/10" />
            )}
          </li>
        ))}
        {results.length === 0 && (
          <li className="px-1 py-5 text-stone-600">
            No museums match “{query}”
          </li>
        )}
      </ul>
    </div>
  );
}

export function PoiDetail({ poi, onBack }: { poi: Poi; onBack: () => void }) {
  return (
    <div>
      <Button
        onClick={onBack}
        className="rounded pb-2.5 text-sm text-blue-950 outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
      >
        ← Volver
      </Button>

      {poi.image && (
        <img
          src={poi.image}
          alt=""
          className="h-40 w-full rounded-xl object-cover"
        />
      )}

      <Drawer.Title className="mt-3 text-xl font-bold">{poi.name}</Drawer.Title>

      {poi.address && <p className="text-sm text-stone-600">{poi.address}</p>}
      {poi.hours && <p className="text-sm text-stone-600">{poi.hours}</p>}
      {poi.description && <p className="mt-3">{poi.description}</p>}
    </div>
  );
}
