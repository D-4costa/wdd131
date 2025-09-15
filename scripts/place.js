// Footer dynamic content
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// static weather values (metric)
const temperature = 8; // °C
const windSpeed = 12; // km/h

// one-line metric wind chill formula
function calculateWindChill(t, v) { return (13.12 + 0.6215 * t - 11.37 * Math.pow(v,0.16) + 0.3965 * t * Math.pow(v,0.16)).toFixed(1); }

// Determine applicability (metric): temp <= 10°C and wind > 4.8 km/h
let windChillText = "N/A";
if (temperature <= 10 && windSpeed > 4.8) {
  windChillText = calculateWindChill(temperature, windSpeed) + " °C";
}
document.getElementById("windchill").textContent = windChillText;

