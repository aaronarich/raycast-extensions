export function parseUnixTimestamp(input: string): Date | null {
  const raw = input.trim();
  if (!raw) return null;

  const value = Number(raw);
  if (!Number.isFinite(value)) return null;

  // 13+ digits is usually milliseconds; otherwise treat as seconds.
  const milliseconds = Math.abs(value) >= 1e12 ? value : value * 1000;
  const date = new Date(milliseconds);

  return Number.isNaN(date.getTime()) ? null : date;
}

export function parseDateInput(input: string): Date | null {
  const raw = input.trim();
  if (!raw) return null;

  const date = new Date(raw);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function formatUtc(date: Date): string {
  return new Intl.DateTimeFormat(undefined, {
    timeZone: "UTC",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZoneName: "short",
  }).format(date);
}

export function formatLocal(date: Date): string {
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZoneName: "short",
  }).format(date);
}

export function toUnixSeconds(date: Date): string {
  return Math.floor(date.getTime() / 1000).toString();
}

export function toUnixMilliseconds(date: Date): string {
  return date.getTime().toString();
}
