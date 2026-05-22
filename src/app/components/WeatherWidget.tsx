import { useEffect, useState } from "react";
import { Cloud, Droplets, Wind, Thermometer } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

interface WeatherData {
  temp: number;
  humidity: number;
  wind: number;
  code: number;
}

export default function WeatherWidget() {
  const { t } = useLanguage();
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=28.6315&longitude=77.2167&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code"
        );
        const json = await res.json();
        const c = json.current;
        setData({
          temp: Math.round(c.temperature_2m),
          humidity: c.relative_humidity_2m,
          wind: Math.round(c.wind_speed_10m),
          code: c.weather_code,
        });
      } catch {
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, []);

  const emoji =
    data && data.code <= 3 ? "☀️" : data && data.code <= 48 ? "🌧️" : data && data.code <= 67 ? "🌦️" : "⛅";

  return (
    <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-4 bg-white/80 dark:bg-gray-800/90 backdrop-blur px-4 py-3 rounded-xl shadow-sm border border-green-100 dark:border-gray-700 mb-6 sm:mb-8 max-w-full">
      <div className="flex items-center gap-2">
        <Cloud className="size-5 text-sky-600 flex-shrink-0" />
        <span className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200">
          {t.weather.title} — {t.weather.delhi}
        </span>
      </div>
      {loading ? (
        <span className="text-xs text-gray-500">{t.weather.loading}</span>
      ) : data ? (
        <>
          <span className="text-lg" aria-hidden>{emoji}</span>
          <span className="flex items-center gap-1 text-sm font-bold text-gray-900 dark:text-white">
            <Thermometer className="size-4 text-red-500" />
            {data.temp}°C
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
            <Droplets className="size-3.5 text-blue-500" />
            {data.humidity}%
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
            <Wind className="size-3.5 text-gray-500" />
            {data.wind} km/h
          </span>
        </>
      ) : (
        <span className="text-xs text-gray-500">{t.weather.error}</span>
      )}
    </div>
  );
}
