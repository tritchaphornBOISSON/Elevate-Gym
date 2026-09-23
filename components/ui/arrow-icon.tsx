export type ArrowIconProps = {
  direction: "left" | "right";
  className?: string;
};

export function ArrowIcon({ className, direction }: ArrowIconProps) {
  const path =
    direction === "left"
      ? "M19 12H5m6-6-6 6 6 6"
      : "M5 12h14m-6-6 6 6-6 6";

  return (
    <svg
      aria-hidden="true"
      className={`shrink-0 ${className ?? "size-4"}`}
      fill="none"
      focusable="false"
      viewBox="0 0 24 24"
    >
      <path
        d={path}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.75"
      />
    </svg>
  );
}
