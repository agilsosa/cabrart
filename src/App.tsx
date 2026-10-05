import { useEffect, useRef, useState, type ReactNode } from "react";
import BottomSheet, { PEEK_HEIGHT, HALF_SNAP } from "./components/BottomSheet";
import { MuseumsPanel } from "./components/panels/Museum";
import { usePoiStore } from "./store/poiStore";
import type { Section } from "./components/NavigationBar";
import { MapView } from "./components/MapView";
import NavigationBar from "./components/NavigationBar";
import { NewsPanel } from "./components/panels/News";
import { POIS } from "./data/pois";
import { CalendarPanel } from "./components/panels/Calendar";

export default function App() {
  const [active, setActive] = useState<Section>("museums");
  const [sheetOpen, setSheetOpen] = useState(true);
  const [snapPoint, setSnapPoint] = useState<string | number | null>(
    PEEK_HEIGHT,
  );

  const selectedId = usePoiStore((s) => s.selectedId);
  const select = usePoiStore((s) => s.select);
  const activeRef = useRef(active);
  activeRef.current = active;

  // marker tap or list tap -> show the detail; clearing -> back to peek
  useEffect(() => {
    const poi = POIS.find((p) => p.id === selectedId);

    if (!poi) {
      // deselected: collapse to the peek, except when browsing the news list
      setSnapPoint((s) => (activeRef.current === "news" ? s : PEEK_HEIGHT));
      return;
    }

    setSheetOpen(true);
    if (poi.category === "news") {
      setActive("news");
      // only raise the sheet if it's at the peek, so the marker isn't hidden behind it
      setSnapPoint((s) => (s === PEEK_HEIGHT ? HALF_SNAP : s));
    } else {
      setActive("museums");
      setSnapPoint(HALF_SNAP);
    }
  }, [selectedId]);

  const sectionContent: Record<Section, ReactNode> = {
    museums: <MuseumsPanel onSearchFocus={() => setSnapPoint(1)} />,
    news: <NewsPanel />,
    calendar: <CalendarPanel />,
  };
  return (
    <>
      <MapView />
      <BottomSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        snapPoint={snapPoint}
        onSnapPointChange={setSnapPoint}
      >
        {sectionContent[active]}
      </BottomSheet>
      <NavigationBar
        active={active}
        onActiveChange={(value) => {
          select(null); // leaving a detail view when switching tabs
          setActive(value);
          setSheetOpen(true);
          setSnapPoint(PEEK_HEIGHT);
        }}
      />
    </>
  );
}
