import React from "react";

export interface CalendarIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  width?: number | string;
  height?: number | string;
  color?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number | string;
}

export default function CalendarIcon({
  size = 24,
  width,
  height,
  color = "#ffffff",
  strokeWidth = 25,
  className = "",
  style = {},
  ...props
}: CalendarIconProps) {
  const iconWidth = width ?? size;
  const iconHeight = height ?? size;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      data-name="Capa 11"
      viewBox="0 0 500.21 435.52"
      width={iconWidth}
      height={iconHeight}
      className={className}
      style={{ display: "inline-block", verticalAlign: "middle", ...style }}
      {...props}
    >
      {/* Calendar body frame */}
      <path d="M469.42 122.57q-28.47-32.26-56.92-64.54h-.68l-6.41 51.64-61.57 4.56-10.4-54-23.66.66-5.67 72.16 121-3 17.3 188.78q-19.8 32-39.63 63.95l-299.57 11.45q-24.43-28.59-48.85-57.2 3.23-98.94 6.44-197.87l130.62-3.28-4.95-71.54-20.78.58-5.58 44.77-61.58 4.56-9.08-47.21-8.87.25-54.47 44.01q-13.06 132-26.09 264l49.78 60.21 391.16-6.95q29.66-35.9 59.28-71.79zM310.11 132.9q2.49-36.07 5-72.15l-136 3.8 6.94 71.46Z" />
      {/* Top binder hooks / clips */}
      <path d="M155.18 0q-5.5 44-11 87.95l-33 1.73L89.31 0ZM341.63 0h56.8q-4.8 42.54-9.61 85.08l-31.84 2.59Q349.3 43.84 341.63 0" />
    </svg>
  );
}
