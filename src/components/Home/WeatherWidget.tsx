import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, CloudLightning, Wind, ChevronRight, ChevronLeft, Umbrella, Thermometer, Droplets } from 'lucide-react';

interface HourlyForecast {
  time: string;
  temp: number;
  description: string;
  symbolCode: string;
  precipitation: number;
  windSpeed: number;
  humidity: number;
  uvIndex: number;
}

interface DayForecast {
  date: string;
  hourly: HourlyForecast[];
  maxTemp: number;
  minTemp: number;
  maxUV: number;
}

interface ForecastResponse {
  properties: {
    timeseries: Array<{
      time: string;
      data: {
        instant: {
          details: {
            air_temperature: number;
            wind_speed: number;
            relative_humidity: number;
            ultraviolet_index_clear_sky: number;
          }
        };
        next_1_hours?: {
          summary: {
            symbol_code: string;
          };
          details: {
            precipitation_amount: number;
          }
        };
      }
    }>;
  };
}

interface WeatherLocation {
  name: string;
  lat: number;
  lon: number;
}

const WEATHER_LOCATION: WeatherLocation = {
  name: 'Været i bakgården',
  lat: 59.927554,
  lon: 10.745640
};

export function WeatherWidget() {
  const [forecast, setForecast] = useState<DayForecast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentDay, setCurrentDay] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await fetch(
          `https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=${WEATHER_LOCATION.lat}&lon=${WEATHER_LOCATION.lon}`,
          {
            headers: {
              'User-Agent': 'Condo/1.0 (https://condo.no; contact@condo.no)'
            }
          }
        );
        
        if (!response.ok) throw new Error('Failed to fetch forecast data');
        
        const data: ForecastResponse = await response.json();
        
        // Group forecast by day
        const dailyForecasts: Record<string, HourlyForecast[]> = {};
        
        data.properties.timeseries.forEach(entry => {
          const date = new Date(entry.time).toISOString().split('T')[0];
          if (!dailyForecasts[date]) {
            dailyForecasts[date] = [];
          }

          dailyForecasts[date].push({
            time: entry.time,
            temp: Math.round(entry.data.instant.details.air_temperature),
            description: entry.data.next_1_hours?.summary.symbol_code || 'unknown',
            symbolCode: entry.data.next_1_hours?.summary.symbol_code || 'unknown',
            precipitation: entry.data.next_1_hours?.details.precipitation_amount || 0,
            windSpeed: Math.round(entry.data.instant.details.wind_speed),
            humidity: Math.round(entry.data.instant.details.relative_humidity),
            uvIndex: Math.round(entry.data.instant.details.ultraviolet_index_clear_sky * 10) / 10
          });
        });

        // Process into day forecasts
        const processedForecast = Object.entries(dailyForecasts)
          .slice(0, 7) // Get 7 days
          .map(([date, hourly]) => ({
            date,
            hourly,
            maxTemp: Math.max(...hourly.map(h => h.temp)),
            minTemp: Math.min(...hourly.map(h => h.temp)),
            maxUV: Math.max(...hourly.map(h => h.uvIndex))
          }));

        setForecast(processedForecast);
      } catch (err) {
        setError('Could not load forecast data');
        console.error('Forecast fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
    // Refresh every hour
    const interval = setInterval(fetchForecast, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = (symbolCode: string, size: 'sm' | 'lg' = 'lg') => {
    const className = size === 'lg' ? "h-8 w-8" : "h-5 w-5";
    if (symbolCode.includes('clearsky')) return <Sun className={`${className} text-orange-8`} />;
    if (symbolCode.includes('cloudy')) return <Cloud className={`${className} text-condo-dark`} />;
    if (symbolCode.includes('rain')) return <CloudRain className={`${className} text-condo-dark`} />;
    if (symbolCode.includes('thunder')) return <CloudLightning className={`${className} text-condo-orange`} />;
    if (symbolCode.includes('snow')) return <CloudSnow className={`${className} text-condo-dark`} />;
    return <Wind className={`${className} text-condo-dark`} />;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('no', { weekday: 'long', day: 'numeric', month: 'long' });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('no', { hour: '2-digit', minute: '2-digit' });
  };

  const getUVLevel = (uv: number) => {
    if (uv >= 11) return { level: 'Ekstremt høy', color: 'text-purple-600' };
    if (uv >= 8) return { level: 'Veldig høy', color: 'text-red-600' };
    if (uv >= 6) return { level: 'Høy', color: 'text-orange-10' };
    if (uv >= 3) return { level: 'Moderat', color: 'text-orange-9' };
    return { level: 'Lav', color: 'text-orange-8 text-shadow-light' };
  };

  const getKeyHours = (hourly: HourlyForecast[]) => {
    const allTimeSlots = [0, 3, 6, 9, 12, 15, 18, 21, 23];
    const currentHour = new Date().getHours();
    const isToday = new Date(hourly[0]?.time).toDateString() === new Date().toDateString();
    
    // Only filter time slots for today
    const timeSlots = isToday 
      ? allTimeSlots.filter(slot => slot > currentHour)
      : allTimeSlots;
    
    return timeSlots.map(targetHour => {
      return hourly.reduce((closest, current) => {
        const currentHour = new Date(current.time).getHours();
        const closestHour = new Date(closest.time).getHours();
        
        const currentDiff = Math.abs(currentHour - targetHour);
        const closestDiff = Math.abs(closestHour - targetHour);
        
        return currentDiff < closestDiff ? current : closest;
      }, hourly[0]);
    }).filter(hour => {
      const hourTime = new Date(hour.time);
      const now = new Date();
      // Only filter out past hours for today
      return !isToday || hourTime > now;
    });
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(prev + 1, keyHours.length - 5));
  };

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  if (error) {
    return (
      <div className="bg-white rounded-2xl border shadow-md mx-4 sm:mx-0 p-4 text-center text-gray-500">
        {error}
      </div>
    );
  }

  if (loading || forecast.length === 0) {
    return (
      <div className="bg-white rounded-2xl border shadow-md mx-4 sm:mx-0 p-4">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-8 w-32 bg-gray-200 rounded"></div>
          <div className="h-12 w-24 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const currentForecast = forecast[currentDay];
  const uvInfo = getUVLevel(currentForecast.maxUV);
  const keyHours = getKeyHours(currentForecast.hourly);

  return (
    <div className="sm:w-full max-w-[100vw] mx-auto w-auto">
      <div className="bg-yellow-1 border border-condo-yellow rounded-2xl border shadow-md sm:mx-0 mx-4 sm:mt-0 overflow-hidden">
        <div className="sm:p-4 sm:pt-6 p-2">
          {/* Header with navigation */}
          <div className="flex sm:flex-row flex-col items-center justify-between sm:pb-4 pb-2">
            <h3 className="sm:text-lg text-base font-semibold mb-1">{WEATHER_LOCATION.name}</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentDay(prev => Math.max(0, prev - 1))}
                disabled={currentDay === 0}
                className="p-1 rounded-lg hover:bg-condo-yellow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="text-sm font-medium w-[150px] text-center">
                {formatDate(currentForecast.date)}
              </span>
              <button
                onClick={() => setCurrentDay(prev => Math.min(forecast.length - 1, prev + 1))}
                disabled={currentDay === forecast.length - 1}
                className="p-1 rounded-lg hover:bg-condo-yellow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Daily summary */}
          <div className="bg-yellow-2 border border-condo-yellow rounded-xl p-4 sm:mb-4 mb-2">
            <div className="grid grid-cols-2 items-center gap-4">
              {/* Left column: Icon, current temp, and min/max */}
              <div className="flex items-center gap-4 col-span-1">
                <div className="flex-shrink-0">
                  {getWeatherIcon(currentForecast.hourly[0].symbolCode, 'lg')}
                </div>
                <div>
                  <div className="text-2xl font-bold">{currentForecast.hourly[0].temp}°</div>
                  <div className="text-sm text-gray-600 flex-row">
                    {currentForecast.minTemp}° / {currentForecast.maxTemp}°
                  </div>
                </div>
              </div>

              {/* Right column: Wind, Humidity, UV */}
              <div className="flex flex-col items-end gap-2 col-span-1">
                <div className="flex items-center gap-2 text-sm">
                  <Wind className="h-4 w-4 text-condo-dark" />
                  <span>{currentForecast.hourly[0].windSpeed} m/s</span>
                </div>
                <div className={`flex items-center gap-2 text-sm ${uvInfo.color}`}>
                  <Sun className="h-4 w-4" />
                  <span>UV: {currentForecast.maxUV} ({uvInfo.level})</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Droplets className="h-4 w-4 text-condo-med" />
                  <span>{currentForecast.hourly[0].humidity}% luftfuktighet</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hourly forecast */}
          <div className="relative max-w-full">
            {/* Desktop navigation buttons - only show if more than 5 slots */}
            {keyHours.length > 5 && (
              <div className="hidden sm:block">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 rounded-r-lg transition-colors
                    ${currentIndex === 0 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:bg-condo-yellow cursor-pointer'
                    }`}
                >
                  <ChevronLeft className="h-5 w-5 text-gray-600" />
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentIndex >= keyHours.length - 5}
                  className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 rounded-l-lg transition-colors
                    ${currentIndex >= keyHours.length - 5 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:bg-condo-yellow cursor-pointer'
                    }`}
                >
                  <ChevronRight className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            )}

            {/* Scrollable container */}
            <div className="overflow-x-auto scrollbar-hide max-w-full">
              <div className={`
                ${window.innerWidth < 640 
                  ? keyHours.length <= 4
                    ? 'flex justify-between gap-1' 
                    : 'inline-flex gap-1'
                  : keyHours.length <= 5
                    ? 'flex justify-between gap-4'
                    : 'grid grid-cols-5 gap-4'
                } 
                w-full
              `}>
                {(window.innerWidth < 640 
                  ? keyHours 
                  : keyHours.length <= 5 
                    ? keyHours 
                    : keyHours.slice(currentIndex, currentIndex + 5)
                ).map((hour, index) => (
                  <div 
                    key={index}
                    className={`
                      flex-col flex items-stretch bg-yellow-2 border border-condo-yellow rounded-lg p-1
                      ${window.innerWidth < 640 
                        ? keyHours.length <= 4 
                          ? 'flex-1' 
                          : 'flex-shrink-0 w-[90px]'
                        : 'flex flex-1'
                      }
                      h-[120px] sm:h-[120px]
                    `}
                  >
                    {/* Top section - Time, Icon, Temperature */}
                    <div className="flex flex-col items-center justify-center h-1/2 w-full">
                      <div className="text-xs font-medium">
                        {formatTime(hour.time)}
                      </div>
                      <div className="flex items-center justify-center gap-1 sm:gap-2 mt-2">
                        {getWeatherIcon(hour.symbolCode, 'sm')}
                        <span className="text-base sm:text-lg font-bold">{hour.temp}°</span>
                      </div>
                    </div>

                    {/* Bottom section - Precipitation, Wind, Humidity */}
                    <div className="flex flex-col items-center justify-center 
                      sm:gap-2 gap-1  h-1/2 w-full">
                      {hour.precipitation > 0 && (
                        <div className="flex items-center justify-center gap-1 text-[10px] sm:text-xs w-full">
                          <Umbrella className="h-3 w-3 text-blue-400" />
                          <span>{hour.precipitation}mm</span>
                        </div>
                      )}
                      <div className="flex items-center justify-center gap-1 text-[10px] sm:text-xs w-full">
                        <Wind className="h-3 w-3 text-condo-dark" />
                        <span>{hour.windSpeed}m/s</span>
                      </div>
                      <div className="flex items-center justify-center gap-1 text-[10px] sm:text-xs w-full">
                        <Droplets className="h-3 w-3 text-condo-med" />
                        <span>{hour.humidity}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}