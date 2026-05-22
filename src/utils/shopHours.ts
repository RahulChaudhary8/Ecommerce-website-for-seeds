export interface ShopHoursConfig {
  weekdayOpenHour: number;
  weekdayCloseHour: number;
  sundayOpenHour: number;
  sundayCloseHour: number;
}

const DEFAULT_HOURS: ShopHoursConfig = {
  weekdayOpenHour: 9,
  weekdayCloseHour: 19,
  sundayOpenHour: 10,
  sundayCloseHour: 17,
};

export function isShopOpen(now = new Date(), config: ShopHoursConfig = DEFAULT_HOURS): boolean {
  const day = now.getDay();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const time = hours + minutes / 60;

  if (day === 0) return time >= config.sundayOpenHour && time < config.sundayCloseHour;
  if (day >= 1 && day <= 6) return time >= config.weekdayOpenHour && time < config.weekdayCloseHour;
  return false;
}
