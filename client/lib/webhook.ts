export function toSortedWord(payload: unknown): { word: string[] } | { error: string; status: number } {
  const data = (payload as { data?: unknown } | null)?.data;

  if (typeof data !== "string") {
    return { error: 'Invalid payload. Expected {"data":"string"}.', status: 400 };
  }

  const word = data.split("").sort((a, b) => a.localeCompare(b));
  return { word };
}
