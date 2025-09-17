import React, { useState, useEffect } from "react";
import unMap from "../assets/un-map.svg";
import { getDaylightAngles } from "../lib/sun";

type Props = {
  date: Date;
  lat: number;
  lon: number;
};

export const Clock: React.FC<Props> = ({ date, lat, lon }) => {
  const daylight = getDaylightAngles(date, lat, lon);
  const radius = 150;
  const center = radius + 10;
  // Converts angle (degrees) to coordinates on the circle (0º = top, clockwise)
  const toXY = (angle: number) => {
    const rad = (angle - 90) * (Math.PI / 180);
    return {
      x: center + radius * Math.cos(rad),
      y: center + radius * Math.sin(rad),
    };
  };
  // Mean angle of the daylight arc
  const daylightMean = daylight.reduce((acc, a) => acc + a, 0) / daylight.length;
  const daylightPath = daylight.map((a) => toXY(a));
  const daylightPoly = daylightPath
    .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
    .join(" ") + " Z";
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 30000); // Updates every 30 seconds
    return () => clearInterval(interval);
  }, []);

  // Calculate the exact angle for the current UTC time (0h at top, clockwise)
  const hour = now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600;
  const sunAngle = (hour * 15) % 360;
  const sunLineEnd = toXY(sunAngle);

  return (
    <svg width={2 * center} height={2 * center}>
      <image href={unMap} x="0" y="0" width={2 * center} height={2 * center} />
      <g transform={`rotate(${sunAngle - daylightMean},${center},${center})`}>
        <path d={daylightPoly} fill="yellow" opacity={0.6} />
      </g>
      <circle cx={center} cy={center} r={radius} fill="none" stroke="white" />
      <line x1={center} y1={center} x2={sunLineEnd.x} y2={sunLineEnd.y} stroke="red" strokeWidth="3" />
      {/* Hour labels (1-24) */}
      {Array.from({ length: 24 }, (_, i) => {
        // 0h/24h = top, clockwise
        const hour = i === 0 ? 0 : i;
        const label = hour === 0 ? 24 : hour;
        const angle = (i * 15) % 360;
        const pos = toXY(angle);
        return (
          <text
            key={label}
            x={pos.x}
            y={pos.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={14}
            fill="black"
            fontWeight="bold"
          >
            {label}
          </text>
        );
      })}
    </svg>
  );
};
export default Clock;
