import { useState, useEffect } from "react";
import { Clock } from "./components/Clock";

// Madrid fallback if geolocation is denied/unavailable
const DEFAULT_LAT = 40.4168;
const DEFAULT_LON = -3.7038;

function App() {
  const [now, setNow] = useState(new Date());
  const [lat, setLat] = useState(DEFAULT_LAT);
  const [lon, setLon] = useState(DEFAULT_LON);

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
      },
      () => {
        // permission denied or unavailable: keep Madrid fallback
      }
    );
  }, []);

  // update every minute
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  // Calculate local time zone according to system clock
  const offsetMinutes = now.getTimezoneOffset();
  const utcOffset = -offsetMinutes / 60;
  // Get system time zone name
  const tzName = Intl.DateTimeFormat('en', { timeZoneName: 'long' }).format(now).split(' ').slice(-1)[0];

  return (
    <div style={{ background: "#222", height: "100vh", color: "white" }}>
      <h1 style={{ textAlign: "center" }}>24h Solar Clock (UTC)</h1>
      <p style={{ textAlign: "center" }}>
        {`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} `}
        {`${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`}
        <br />
        <span style={{ fontWeight: "bold" }}>Local time: UTC{utcOffset >= 0 ? "+" : ""}{utcOffset} ({tzName})</span>
      </p>
      <Clock date={now} lat={lat} lon={lon} />
    </div>
  );
}

export default App;
