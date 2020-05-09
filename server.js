const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());

let lat = '54.0293';
let lon = '39.3020';
const getLocation = async(city) => {
    try {
        const data = await request.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATIONIQ_KEY}&q=${city}&format=json`);

        return JSON.parse(data.text)[0];
    } catch (e) {
        console.error(e);
    }
};

const parseLocation = (location) => ({
    formatted_query: location.dispaly_name,
    latitude: location.lat,
    longitude: location.lon


});

app.get('/location', (req, res) => {
    getLocation(req.query.search).then((locationRes) => {
        const response = parseLocation(locationRes);

        lat = response.latitude;
        lon = response.longitude;

        res.json(response);
    });
});

const getWeather = async() => {
    try {
        const data = await request.get(`http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHERBIT_KEY}&lat=${lat}&lon=${lon}`);
        return JSON.parse(data.text);
    } catch (e) {
        console.error(e);
    }
};

const parseWeather = (weather = {}) => weather
    .map(day => ({
        forecast: day.weather.description,
        time: day.ts
    }));

app.get('/weather', (req, res) => {
    getWeather()
        .then(weatherResponse => {
            res.json(parseWeather(weatherResponse.data));
        });
});
 












app.listen(PORT, () => console.log(`running on port ${PORT}`));