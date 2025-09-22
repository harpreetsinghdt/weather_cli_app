// Load environment variables from .env file
require('dotenv').config();

// Get the city name from command line arguments
const city = process.argv[2];

// Get the OpenWeatherMap API key from environment variables
const apiKey = process.env.OPENWEATHER_API_KEY;

// Check if API key is present
if (!apiKey) {
  console.error('❌ Error: OPENWEATHER_API_KEY is missing in your .env file.');
  process.exit(1);
}

// Check if city argument is provided
if (!city) {
  console.log('Usage: npm start -- <city>');
  process.exit(1);
}

// Construct the OpenWeatherMap API URL with the city and API key
const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

/**
 * Fetches weather data for the specified city and displays it.
 * Handles API errors and network issues gracefully.
 */
async function getWeather() {
  try {
    // Make the API request
    const res = await fetch(url);

    // Handle HTTP errors (e.g., city not found, invalid API key)
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

    // Parse the JSON response
    const data = await res.json();

    // Display the weather information in a user-friendly format
    console.log(`\n🌤️  Weather in \x1b[1m${data.name}, ${data.sys.country}\x1b[0m`);
    console.log(`-----------------------------`);
    console.log(`Temperature : ${data.main.temp}°C`);
    console.log(`Feels Like  : ${data.main.feels_like}°C`);
    console.log(`Description : ${data.weather[0].description}`);
    console.log(`Humidity    : ${data.main.humidity}%`);
    console.log(`Wind Speed  : ${data.wind.speed} m/s\n`);
  } catch (err) {
    // Handle network or unexpected errors
    console.error('❌ Network or unexpected error:', err.message);
    process.exit(1);
  }
}

// Run the weather fetching function
getWeather();