import { useState, useEffect } from "react";
import { Clock } from "./components/Clock";
// import tzlookup from "tz-lookup";

function App() {
  const [now, setNow] = useState(new Date());

  // your location (example: Madrid)
    const lat = 40.4168;
    const lon = -3.7038;

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
