export function formatWilayah(value: string) {
  if (!value) return null;
  return value.padStart(3, "0");
}
