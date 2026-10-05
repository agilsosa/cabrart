import { Drawer } from "@base-ui/react/drawer";
import { useState, type ReactNode } from "react";

export const PEEK_HEIGHT = "140px";
export const HALF_SNAP = 0.55;
const snapPoints = [PEEK_HEIGHT, HALF_SNAP, 1] as const;

interface BottomSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  snapPoint?: Drawer.Root.SnapPoint | null;
  onSnapPointChange?: (snapPoint: Drawer.Root.SnapPoint | null) => void;
  children: ReactNode;
}

export default function BottomSheet({
  open,
  onOpenChange,
  snapPoint: controlledSnapPoint,
  onSnapPointChange,
  children,
}: BottomSheetProps) {
  const [internalSnapPoint, setInternalSnapPoint] =
    useState<Drawer.Root.SnapPoint | null>(PEEK_HEIGHT);
  const snapPoint = controlledSnapPoint ?? internalSnapPoint;
  const setSnapPoint = onSnapPointChange ?? setInternalSnapPoint;

  const FULL_H = "calc(100dvh - var(--nav-h) - 1rem)"; // popup height, fixed

  const visible =
    typeof snapPoint === "number"
      ? `${snapPoint * 100}dvh`
      : (snapPoint ?? PEEK_HEIGHT);
  return (
    <Drawer.Root
      open={open}
      onOpenChange={onOpenChange}
      swipeDirection="down"
      modal={false}
      snapPoints={[...snapPoints]}
      snapPoint={snapPoint}
      onSnapPointChange={setSnapPoint}
    >
      <Drawer.Portal>
        <Drawer.Backdrop
          className={`pointer-events-none fixed inset-0 transition-opacity duration-300 ${
            snapPoint === 1 ? "opacity-100" : "opacity-0"
          }`}
        />
        <Drawer.Viewport className="pointer-events-none fixed inset-0 z-40 flex items-end justify-center pb-(--nav-h)">
          <Drawer.Popup
            style={{ height: FULL_H }}
            className="pointer-events-auto flex w-full flex-col overflow-hidden rounded-t-2xl bg-stone-300 transition-transform duration-300 ease-out transform-[translateY(calc(var(--drawer-snap-point-offset)+var(--drawer-swipe-movement-y)))] data-starting-style:transform-[translateY(calc(100%+2px))] data-ending-style:transform-[translateY(calc(100%+2px))]"
          >
            <div className="flex shrink-0 cursor-grab touch-none justify-center py-3 active:cursor-grabbing">
              <div
                className="h-1.5 w-12 rounded-full bg-black/30"
                aria-hidden
              />
            </div>
            <div
              data-base-ui-swipe-ignore
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4"
              style={{
                paddingBottom: `max(1rem, calc(${FULL_H} - ${visible} + 1rem))`,
              }}
            >
              {children}
            </div>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
