/** Monsoon sale ends Aug 31 same year (or next year if past) */
export function getSaleEndDate(): Date {
  const now = new Date();
  let end = new Date(now.getFullYear(), 7, 31, 23, 59, 59);
  if (end < now) {
    end = new Date(now.getFullYear() + 1, 7, 31, 23, 59, 59);
  }
  return end;
}

export function getTimeLeft(end: Date) {
  const diff = Math.max(0, end.getTime() - Date.now());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds, total: diff };
}
