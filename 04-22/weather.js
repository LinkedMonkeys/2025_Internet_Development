(function() {
    'use strict';

    const images = new Map([[0, 'clear-day'],
        [1, 'partly-cloudy-day'], [2, 'partly-cloudy-day'], [3, 'cloudy'],
        [45, 'fog'], [48, 'fog'],
        [51, 'showers-day'], [53, 'showers-day'], [55, 'showers-day'],
        [61, 'showers-day'], [63, 'rain'], [65, 'rain'],
        [66, 'rain-snow-showers-day'], [67, 'rain-snow-showers-day'],
        [71, 'snow-showers-day'], [73, 'snow'], [75, 'snow'],
        [77, 'snow-showers-day'],
        [80, 'showers-day'], [81, 'showers-day'], [82, 'showers-day'],
        [95, 'thunder-rain'],
        [96, 'thunder-rain'], [99, 'thunder-rain']
    ]);

    const code = new Map([[0, 'Clear sky'],
        [1, 'Mainly clear'], [2, 'Partly cloudy'], [3, 'Overcast'],
        [45, 'Fog'], [48, 'Depositing rime fog'],
        [51, 'Drizzle: light'], [53, 'Drizzle: moderate'], [55, 'Drizzle: heavy'],
        [61, 'Rain: light'], [63, 'Rain: moderate'], [65, 'Rain: heavy'],
        [66, 'Freezing rain: light'], [67, 'Freezing rain: heavy'],
        [71, 'Snow fall: slight'], [73, 'Snow fall: moderate'], [75, 'Snow fall: heavy'],
        [77, 'Snow grains'],
        [80, 'Rain showers: slight'], [81, 'Rain showers: moderate'], [82, 'Rain showers: violent'],
        [95, 'Thunderstorm: slight or moderate'],
        [96, 'Thunderstorm with slight hail'], [99, 'Thunderstorm with heavy hail']
    ]);

    window.addEventListener('load', init);

    function init() {
        const getWeatherButton = id('get-weather');
        getWeatherButton.addEventListener('click', geocode);
    }

    function geocode() {
        const input = id('input');
        input.classList.add('hidden');
        const weather = id('weather');
        weather.classList.remove('hidden');
        const zipCodeInput = id('zip-code');
        const zipCode = zipCodeInput.value;
    
        const url = `https://geocode.maps.co/search?postalcode=${zipCode}&country=US&api_key=${geocodeKey}`;
        console.log(url);
        
        fetch(url)
            .then(statusCheck)
            .then((response) => response.json())
            .then(getWeather)
            .catch(handleError);
    }

    function getWeather(response) {
        console.log(response);
        const displayName = id('display-name');
        displayName.textContent = response[0].display_name;
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
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        // const date = new Date(response.daily.time[0]);
        // console.log(dayNames[date.getDay()]);

        // const weatherList = id('weather-list');
        const forecastRegion = id('forecast-region');
        console.log(forecastRegion);
        for (let i=0; i<response.daily.time.length; i++) {
            const dateArr = response.daily.time[i].split('-');
            const date = new Date(parseInt(dateArr[0]), parseInt(dateArr[1])-1, parseInt(dateArr[2]));
            
            const card = buildWeatherCard(dayNames[date.getDay()], 
                                        response.daily.temperature_2m_min[i],
                                        response.daily.temperature_2m_max[i],
                                        response.daily.weather_code[i]);
            forecastRegion.appendChild(card);
        }

        
    }

    function buildWeatherCard(day, lo, hi, weatherCode) {
        const newCard = document.createElement('div');
        newCard.classList.add('card');

        const dayPara = document.createElement('p');
        dayPara.classList.add('day');
        dayPara.textContent = day;

        const weatherIcon = document.createElement('img');
        weatherIcon.src = `2nd Set - Color/${images.get(weatherCode)}.png`;

        const temperaturePara = document.createElement('p');
        temperaturePara.textContent = `${lo}°F / ${hi}°F`;

        const forecastPara = document.createElement('p');
        forecastPara.classList.add('forecast');
        forecastPara.textContent = code.get(weatherCode);

        newCard.appendChild(dayPara);
        newCard.appendChild(weatherIcon);
        newCard.appendChild(temperaturePara);
        newCard.appendChild(forecastPara);

        return newCard;
    }

    function handleError(error) {
        console.log(error);
    }


    /////////////////////////////////////////////////////////////////////
    // Helper functions
    /**
    * Helper function to return the response's result text if successful, otherwise
    * returns the rejected Promise result with an error status and corresponding text
    * @param {object} res - response to check for success/error

    * @return {object} - valid response if response was successful, otherwise rejected
    *                    Promise result
    */
    async function statusCheck(res) {
        if (!res.ok) {
            throw new Error(await res.text());
        }
        return res;
    }

    function id(id) {
        return document.getElementById(id);
    }

    function qs(selector) {
        return document.querySelector(selector);
    }

    function qsa(selector) {
        return document.querySelectorAll(selector);
    }
})();