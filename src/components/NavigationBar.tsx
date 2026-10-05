// components/NavigationBar.tsx
import { Toggle, ToggleGroup } from "@base-ui/react";
import MuseumIcon from "./icons/Museum";
import CalendarIcon from "./icons/Calendar";
import FavoriteIcon from "./icons/Favorites";

export type Section = "museums" | "calendar" | "news";

const items: { value: Section; label: string; icon: typeof MuseumIcon }[] = [
  { value: "museums", label: "Museos", icon: MuseumIcon },
  { value: "calendar", label: "Calendario", icon: CalendarIcon },
  { value: "news", label: "Noticias", icon: FavoriteIcon },
];

interface NavigationBarProps {
  active: Section;
  onActiveChange: (value: Section) => void;
}

export default function NavigationBar({
  active,
  onActiveChange,
}: NavigationBarProps) {
  return (
    <ToggleGroup
      value={[active]}
      onValueChange={(value) => {
        if (value.length > 0) onActiveChange(value[0] as Section);
      }}
      aria-label="Secciones"
      className="fixed inset-x-0 bottom-0 h-(--nav-h)  z-50 flex items-stretch bg-stone-100 pb-[env(safe-area-inset-bottom)] backdrop-blur dark:border-white/10 dark:bg-stone-900/95"
    >
      {items.map(({ value, label, icon: Icon }) => (
        <Toggle
          key={value}
          value={value}
          className="group flex flex-1 flex-col items-center justify-center gap-1 py-3 outline-none"
        >
          <div className="rounded-full px-4 py-2 transition-[background-color,transform] duration-200 ease-out group-active:scale-95 group-data-pressed:bg-amber-300 group-focus-visible:ring-2 group-focus-visible:ring-stone-900 dark:group-data-pressed:bg-amber-300/15 dark:group-focus-visible:ring-amber-300">
            <Icon
              aria-hidden="true"
              className="h-8 w-11 fill-stone-500 transition-colors duration-200 ease-out group-data-pressed:fill-stone-900 dark:fill-stone-400 dark:group-data-pressed:fill-amber-300"
            />
          </div>
          <span className="text-xs font-medium text-stone-600 transition-colors duration-200 group-data-pressed:font-semibold group-data-pressed:text-stone-900 dark:text-stone-400 dark:group-data-pressed:text-amber-300">
            {label}
          </span>
        </Toggle>
      ))}
    </ToggleGroup>
  );
}
