import React from "react";

export interface MuseumIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  width?: number | string;
  height?: number | string;
  color?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number | string;
}

export default function MuseumIcon({
  size = 24,
  width,
  height,
  color = "#ffffff",
  strokeWidth = 25,
  className = "",
  style = {},
  ...props
}: MuseumIconProps) {
  const iconWidth = width ?? size;
  const iconHeight = height ?? size;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      data-name="Capa 5"
      viewBox="0 0 748.42 728.41"
      width={iconWidth}
      height={iconHeight}
      className={className}
      style={{ display: "inline-block", verticalAlign: "middle", ...style }}
      {...props}
    >
      <path d="M731.46 92.84c-33.81-66.83-101.08-84.56-116.12-88-58.79-13.66-135.92.56-179.93 60-41.3 55.75-30.44 120.21-28.08 132.72L621.1 310.84l-98.88 21.88q4.54 128.09 9.1 256.17L718.7 267.66c2.34-3.54 56.4-88.59 12.76-174.82m-155.1 141.7A75.56 75.56 0 1 1 651.92 159a75.56 75.56 0 0 1-75.56 75.54" />
      <path d="m0 328.16 507.89-35.73-270.53-135.26ZM4.93 370.52l64.65-4.13Q79.8 492.05 90 617.69l-74.54-3.51ZM422.98 343.18l58.42-4.86q7.1 143.63 14.18 287.25l-89.61-3ZM155.69 363.84l46.79-4 11.91 171.31-68.06 1.7ZM265.43 352.5l63.79-6.55v181.23l-71.1 1.77q3.66-88.23 7.31-176.45M140.37 576.8l214.39-5.11 2.55 53.88-211.83-10.49q-2.55-19.13-5.11-38.28M2.27 650.71l508.31 20.24 15.18 57.47L9.08 694.95Z" />
    </svg>
  );
}
