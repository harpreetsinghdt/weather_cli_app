require('dotenv').config();

const city = process.argv[2];
const apiKey = process.env.OPENWEATHER_API_KEY;

if (!apiKey) {
  console.error('❌ Error: OPENWEATHER_API_KEY is missing in your .env file.');
  process.exit(1);
}

if (!city) {
  console.log('Usage: npm start -- <city>');
  process.exit(1);
}

const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

async function getWeather() {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      if (res.status === 404) {
        console.error(`❌ City "${city}" not found. Please check the spelling.`);
      } else if (res.status === 401) {
        console.error('❌ Invalid API key. Please check your .env file.');
      } else {
        console.error(`❌ API Error: ${res.status} ${res.statusText}`);
      }
      process.exit(1);
    }

    const data = await res.json();

    // Output formatting
    console.log(`\n🌤️  Weather in \x1b[1m${data.name}, ${data.sys.country}\x1b[0m`);
    console.log(`-----------------------------`);
    console.log(`Temperature : ${data.main.temp}°C`);
    console.log(`Feels Like  : ${data.main.feels_like}°C`);
    console.log(`Description : ${data.weather[0].description}`);
    console.log(`Humidity    : ${data.main.humidity}%`);
    console.log(`Wind Speed  : ${data.wind.speed} m/s\n`);
  } catch (err) {
    console.error('❌ Network or unexpected error:', err.message);
    process.exit(1);
  }
}

getWeather();