import React, { useState, useEffect } from 'react';
import { supabase } from '../../api/supabase'; 

const WEATHER_LOCATION = { lat: 59.927554, lon: 10.745640 };

export function WeatherWidget() {
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const { data, error } = await supabase
          .from('weather_data')
          .select('time, temp, wind_speed, precipitation, humidity, uv_index, symbol_code')
          .eq('lat', WEATHER_LOCATION.lat)
          .eq('lon', WEATHER_LOCATION.lon)
          .eq('date', new Date().toISOString().split('T')[0])  // Dagens dato
          .order('time', { ascending: true });  // Sorter etter tid (00:00, 03:00, osv.)

        if (error) {
          throw error;
        }

        setForecast(data);  // Sett værdataene i state
      } catch (err) {
        setError('Failed to load weather data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h3>{`Weather at ${WEATHER_LOCATION.lat}, ${WEATHER_LOCATION.lon}`}</h3>
      <div>
        {forecast.map((entry) => (
          <div key={entry.time}>
            <h4>{`${entry.time}: ${entry.temp}°C`}</h4>
            <p>Wind: {entry.wind_speed} m/s</p>
            <p>Precipitation: {entry.precipitation} mm</p>
            <p>Humidity: {entry.humidity}%</p>
            <p>UV Index: {entry.uv_index}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
