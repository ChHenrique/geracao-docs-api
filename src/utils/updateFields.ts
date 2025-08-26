export function updateFields<T extends object>(
  original: T,
  update: Partial<T>,
) {
  for (const [key, value] of Object.entries(update)) {
    if (value !== undefined && value !== null) {
      (original as any)[key] = value;
    }
  }
}
