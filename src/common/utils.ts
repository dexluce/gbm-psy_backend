export function getNormalizedRandomizedName(baseName: string) {
  const randomValue = Math.random().toString(36).substring(7);
  return (baseName + randomValue).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[/\u0020]/g, '').toLowerCase();
}