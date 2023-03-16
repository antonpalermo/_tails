export default function parseBoolean(value: string): boolean {
  return /true/i.test(value)
}
