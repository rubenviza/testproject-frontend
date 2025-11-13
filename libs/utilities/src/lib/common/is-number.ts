export function isNumber(value: unknown): boolean {
  return !isNaN(Number(value)) && value !== null && value !== '';
}
