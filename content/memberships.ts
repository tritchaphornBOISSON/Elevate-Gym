export type MembershipPass = {
  id: "day" | "week" | "month" | "year";
  label: string;
  priceThb: number;
  provisional: true;
};

export const membershipPasses = [
  { id: "day", label: "Day", priceThb: 250, provisional: true },
  { id: "week", label: "Week", priceThb: 1000, provisional: true },
  { id: "month", label: "Month", priceThb: 1500, provisional: true },
  { id: "year", label: "Year", priceThb: 15000, provisional: true },
] as const satisfies readonly MembershipPass[];

export function formatPriceThb(priceThb: number): string {
  return `${new Intl.NumberFormat("en-US").format(priceThb)} THB`;
}
