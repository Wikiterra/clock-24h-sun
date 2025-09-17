import SunCalc from "suncalc";
import { DateTime } from "luxon";

// Devuelve salida y puesta del sol, además de info por minuto
export function getSunTimes(date: Date, lat: number, lon: number) {
  const times = SunCalc.getTimes(date, lat, lon);
  return {
    sunrise: times.sunrise,
    sunset: times.sunset,
  };
}

// Genera array de ángulos (0..360°) donde hay sol
export function getDaylightAngles(date: Date, lat: number, lon: number) {
  const angles: number[] = [];

  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 10) { // muestreo cada 10 min
      const dt = DateTime.fromObject({
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        hour: h,
        minute: m,
      }).toJSDate();

      const pos = SunCalc.getPosition(dt, lat, lon);
      const altitude = pos.altitude * (180 / Math.PI);

      if (altitude > 0) {
        const angle = ((h + m / 60) / 24) * 360;
        angles.push(angle);
      }
    }
  }

  return angles;
}
