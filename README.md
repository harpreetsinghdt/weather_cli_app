## README.md

# CLI Weather App

A simple Node.js command-line application to fetch and display current weather information for any city using the OpenWeatherMap API.

## Features

- Fetches real-time weather data for any city
- User-friendly CLI output
- Robust error handling (missing API key, city not found, etc.)
- Uses environment variables for API key security

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- An [OpenWeatherMap API key](https://openweathermap.org/api)

## Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/weather_app.git
   cd weather_app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up your environment variables:**
   - Create a `.env` file in the project root:
     ```
     OPENWEATHER_API_KEY=your_openweathermap_api_key
     ```

## Usage

Run the app with a city name as an argument:

```bash
npm start -- "City Name"
```

**Example:**
```bash
npm start -- "Toronto"
```

## Example Output

```
🌤️  Weather in Toronto, CA
-----------------------------
Temperature : 22°C
Feels Like  : 21°C
Description : clear sky
Humidity    : 40%
Wind Speed  : 3.5 m/s
```

## License

MIT