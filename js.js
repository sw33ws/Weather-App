var cityDate = $("#cityDate");

function cityandtime() {
    var timeNow = moment().format('dddd MMMM D YYYY'); 
    cityDate.text(timeNow);
    for (x = 1; x < 6 ; x++) {
        document.getElementById(`day${x}`).innerHTML = moment().add(`${x}`, 'days').format('ddd MMM D YYYY');
    }
}

// weather info for the choosen city

function searchbar() {
    var searchInput = document.getElementById('search-input');
    var city = searchInput.value;
    getWeatherData(city)
}

function sidebuttons(place) {
    var city = place;
    getWeatherData(city)
}

// getting the weather data
function getWeatherData(city) {
    // getting the lat and long
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                localStorage.setItem("location", JSON.stringify(data))
                const cityLocal = JSON.parse(localStorage.getItem("location"));
                var lat = cityLocal.results[0].latitude;
                var lon = cityLocal.results[0].longitude;
                // getting the weather data
                fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_min,precipitation_sum,wind_speed_10m_max&timezone=auto`)
                .then(function(response2) {
                    if (response2.ok) {
                        response2.json().then(function(weatherdata) {
                            localStorage.setItem("weather", JSON.stringify(weatherdata))
                            loadWeather()
                            loadWeatherFive()
                            cityandtime()
                        })
                    }
                })
            })
        }
    })
};

// actively loading
function loadWeather() {
    const cityLocal = JSON.parse(localStorage.getItem("weather"));
    const location = JSON.parse(localStorage.getItem("location"))
    document.getElementById("Location").textContent = location.results[0].name;
    let weatherCode = cityLocal.current.weather_code;
    let Icon = weatherImage(weatherCode);
    document.getElementById("weatherLarge").innerHTML = `<img src="${Icon}" class="currentForecastIcon">`;
    document.getElementById("tempLarge").textContent = ("temperature: " + Math.round(cityLocal.current.temperature_2m) + "C");
    document.getElementById("windLarge").textContent = ("wind speeds: " + Math.round(cityLocal.current.wind_speed_10m) + "KM/h");
    document.getElementById("humidityLarge").textContent = ("Humidity: " + cityLocal.current.relative_humidity_2m + "%");
}

// five bottom displays
function loadWeatherFive() {
    const cityLocal = JSON.parse(localStorage.getItem("weather"));
    for (x = 0; x < 5 ; x++) {
        let weatherCode = cityLocal.current.weather_code;
        let Icon = weatherImage(weatherCode);
        document.getElementById(`${x}weather`).innerHTML = `<img src="${Icon}" class="forecastIcon">`;
        document.getElementById(`${x}temp`).textContent = ("temperature: " + Math.round(cityLocal.daily.temperature_2m_min[x]) + "C");
        document.getElementById(`${x}wind`).textContent = ("wind speeds: " + Math.round(cityLocal.daily.wind_speed_10m_max[x]) + "KM/h");
    }
};

function weatherImage(weatherCode) {
    if(weatherCode == 0) {
        return "img/icons/sun.png"
    }
    if(weatherCode == 1 || weatherCode == 2 || weatherCode == 3) {
        return "img/icons/clouds.png"
    }
    if(weatherCode >= 45 && weatherCode <= 48) {
        return "img/icons/fog.png"
    }
    if(weatherCode >= 51 && weatherCode <= 67) {
        return "img/icons/rain.png"
    }
    if(weatherCode >= 68 && weatherCode <= 79) {
        return "img/icons/snow.png"
    }
    if(weatherCode >= 95 && weatherCode <= 99) {
        return "img/icons/storm.png"
    }

    // default
    return "img/icons/none.png"
}

window.onload = getWeatherData("Hamilton");