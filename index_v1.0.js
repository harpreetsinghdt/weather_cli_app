// index.js
require('dotenv').config();

const apiKey = process.env.OPENWEATHER_API_KEY;
// console.log('Your OpenWeatherMap API Key is:', apiKey);

const city = process.argv[2];
if(!city){
    console.log("Usage: npm start -- <city>");
    process.exit(1);
}

const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

fetch(url).then(res=>{
    if(!res.ok) throw new Error('City not found or API error');
    return res.json();
}).then(data=>{
    console.log(`Weather in ${data.name}, ${data.sys.country}:`);
    console.log(`Temperature: ${data.main.temp}°C`);
    console.log(`Description: ${data.weather[0].description}`);
    console.log(`Humidity: ${data.main.humidity}%`);
    console.log(`Wind Speed: ${data.wind.speed} m/s`);
}).catch(err=>{
    console.error('Errors:',err.message);
});