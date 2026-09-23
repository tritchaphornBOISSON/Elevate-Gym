export type ArrowIconProps = {
  direction: "left" | "right";
};

export function ArrowIcon({ direction }: ArrowIconProps) {
  const path =
    direction === "left"
      ? "M19 12H5m6-6-6 6 6 6"
      : "M5 12h14m-6-6 6 6-6 6";

  return (
    <svg
      aria-hidden="true"
      className="size-4 shrink-0"
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
