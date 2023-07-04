var cityDate = $("#cityDate");

var apiKey = '44541d76d19b2706ab8b90c24f5bbf53';

function cityandtime() {
    var timeNow = moment().format('dddd MMMM D YYYY'); 
    cityDate.text(timeNow);
    for (x = 1; x < 6 ; x++) {
        document.getElementById(`day${x}`).innerHTML = moment().add(`${x}`, 'days').format('ddd MMM D YYYY');
    }
}

// preloaded city
function preloading() {
    var city = "Kelowna";
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=44541d76d19b2706ab8b90c24f5bbf53`
    )
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                localStorage.setItem("city", JSON.stringify(data))
                cityandtime()

                const cityLocal = JSON.parse(localStorage.getItem("city"));
                var lat = cityLocal.coord.lat;
                var lon = cityLocal.coord.lon;
                console.log(lat, lon);
                fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&lang=&exclude=alerts,minutely&appid=${apiKey}`)
                .then(function(response2) {
                    if (response2.ok) {
                        response2.json().then(function(data2) {
                            console.log(data2)
                            localStorage.setItem("city2", JSON.stringify(data2))
                            loadWeather()
                            loadWeatherFive()
                        })
                    }
                })
            })
        }
    })
};

// weather info for the choosen city

function searchbar() {
    var searchInput = document.getElementById('search-input');
    var city = searchInput.value;
    searching(city)
}

function sidebuttons(place) {
    var city = place;
    searching(city)
}

function searching(city) {
    // var searchInput = document.getElementById('search-input');
    // var city = searchInput.value;
    console.log(city);
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=44541d76d19b2706ab8b90c24f5bbf53`
    )
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                localStorage.setItem("city", JSON.stringify(data))
                const cityLocal = JSON.parse(localStorage.getItem("city"));
                var lat = cityLocal.coord.lat;
                var lon = cityLocal.coord.lon;
                console.log(lat, lon);
                fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&lang=&exclude=alerts,minutely&appid=${apiKey}`)
                .then(function(response2) {
                    if (response2.ok) {
                        response2.json().then(function(data2) {
                            console.log(data2)
                            localStorage.setItem("city2", JSON.stringify(data2))
                            loadWeather()
                            loadWeatherFive()
                        })
                    }
                })
            })
        }
    })
};

// actively loading
function loadWeather() {
    const cityLocal = JSON.parse(localStorage.getItem("city2"));
    const location = JSON.parse(localStorage.getItem("city"))
    let icon = cityLocal.current.weather[0].icon;
    document.getElementById("Location").textContent = location.name;
    document.getElementById("weatherLarge").innerHTML = `<img src=https://openweathermap.org/img/wn/${icon}@4x.png>`;
    document.getElementById("tempLarge").textContent = ("temperature " + cityLocal.current.temp + "C");
    document.getElementById("windLarge").textContent = ("wind speeds " + cityLocal.current.wind_speed + "KM/h");
    document.getElementById("humidityLarge").textContent = ("Humidity " + cityLocal.current.humidity + "%");
}

// five bottom displays
function loadWeatherFive() {
    const cityLocal = JSON.parse(localStorage.getItem("city2"));
    for (x = 0; x < 5 ; x++) {
        let icon = cityLocal.daily[x].weather[0].icon;
        document.getElementById(`${x}weather`).innerHTML = `<img src=https://openweathermap.org/img/wn/${icon}@4x.png>`;
        document.getElementById(`${x}temp`).textContent = ("temperature " + cityLocal.daily[x].temp.day + "C");
        document.getElementById(`${x}wind`).textContent = ("wind speeds " + cityLocal.daily[x].wind_speed + "KM/h");
        document.getElementById(`${x}hum`).textContent = ("Humidity " + cityLocal.daily[x].humidity + "%");
       }
    };

window.onload = preloading();