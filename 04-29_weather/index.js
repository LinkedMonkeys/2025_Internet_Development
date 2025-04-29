"use strict";

const express = require('express');
const app = express();
const port = 3000;
const fs = require('node:fs');

// Import the API key from another file.
const key = require('./apikey.js');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/weather/:zipcode', (req, res) => {
    let location; // Set by geocoding.
    const url = `https://geocode.maps.co/search?postalcode=${req.params.zipcode}&country=US&api_key=${key.geocodeKey}`;
        console.log(url);
        
        fetch(url)
            .then(statusCheck)
            .then((response) => response.json())
            .then(getWeather)
            .catch(handleError);

    function getWeather(response) {
        console.log(response);
        location = response[0].display_name;

        const lat = response[0].lat;
        const lon = response[0].lon;
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FChicago`;
        fetch(url)
            .then(statusCheck)
            .then((response) => response.json())
            .then(addWeather)
            .catch(handleError);
    }

    function addWeather(response) {
        console.log(response);
        res.render('weather',
            {
                date: response.daily.time,
                weather_code: response.daily.weather_code,
                maxtemp: response.daily.temperature_2m_max,
                mintemp: response.daily.temperature_2m_min,
                location: location
            });
    }
});

function handleError(error) {
    console.log(error);
}

async function statusCheck(res) {
    if (!res.ok) {
        throw new Error(await res.text());
    }
    return res;
}

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });