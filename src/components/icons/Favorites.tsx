import React, { useId } from "react";

export interface FavoritesIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  width?: number | string;
  height?: number | string;
  color?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number | string;
}

export default function FavoritesIcon({
  size = 24,
  width,
  height,
  color = "#ffffff",
  strokeWidth = 25,
  className = "",
  style = {},
  ...props
}: FavoritesIconProps) {
  const iconWidth = width ?? size;
  const iconHeight = height ?? size;
  const maskId = useId();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      data-name="Capa 1"
      viewBox="0 0 569.19 573.93"
      width={iconWidth}
      height={iconHeight}
      className={className}
      style={{ display: "inline-block", verticalAlign: "middle", ...style }}
      {...props}
    >
      <defs>
        <mask id={maskId}>
          {/* Everything inside mask filled white will be visible */}
          <rect width="100%" height="100%" fill="#ffffff" />
          {/* The red path set to black cuts out a transparent hole */}
          <path
            d="M70.62 470.28q-11.47-116.8-23-233.59l364.67-29.61q-6.17 140.64-12.39 281.29Z"
            fill="#000000"
          />
        </mask>
      </defs>

      <g mask={`url(#${maskId})`}>
        <path d="m435.21 227.37 43.14 29.17-5.88 317.37L0 509.77v-317.5l314.27-43 35.18 26.43-20.76 146.67Z" />
        <path d="M480.71 126.47q-.19 10.88-.4 21.75l-.72 38.64q-.36 20-.74 39.9l-45.81-31-70 62.43 13.27-93.65-26.8-20.14Z" />
        <path d="M383.07 101.01 255.42 89.37l107.44 80.72-17 120.15 88.25-78.68 75.49 51q-11.69-51.5-23.39-103.07l83-65.54-116 12.42Q433.01 53.21 412.81.04q-14.86 50.47-29.74 100.97" />
        <path d="m113.96 274.52 230 144.77" style={{ fill: color }} />
        <path d="m107.31 285.117 13.318-21.157 229.987 144.775-13.318 21.157z" />
        <path d="m130.54 355.13 120.18 70.74" style={{ fill: color }} />
        <path d="m124.201 365.882 12.68-21.545 120.18 70.734-12.681 21.545z" />
      </g>
    </svg>
  );
}
