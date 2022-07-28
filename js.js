var cityDate = $("#cityDate");
var day1 = $("#day1");
var day2 = $("#day2");
var day3 = $("#day3");
var day4 = $("#day4");
var day5 = $("#day5");

var apiKey = '44541d76d19b2706ab8b90c24f5bbf53';

function cityandtime() {
    var timeNow = moment().format('(M/D/YYYY)'); 
    cityDate.text(timeNow);
    var timeNow = moment().add(1, 'days').format('M/D/YYYY'); 
    day1.text(timeNow);
    var timeNow = moment().add(2, 'days').format('M/D/YYYY'); 
    day2.text(timeNow);
    var timeNow = moment().add(3, 'days').format('M/D/YYYY'); 
    day3.text(timeNow);
    var timeNow = moment().add(4, 'days').format('M/D/YYYY'); 
    day4.text(timeNow);
    var timeNow = moment().add(5, 'days').format('M/D/YYYY'); 
    day5.text(timeNow);
}

// preloaded city
function preloading() {
    var city = "toronto";
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=44541d76d19b2706ab8b90c24f5bbf53`
    )
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                localStorage.setItem("city", JSON.stringify(data))
                cityandtime()
                loadWeather()
                loadWeatherFive()
            })
        }
    })
};

// weather info for the choosen city
function searching() {
    var searchInput = document.getElementById('search-input');
    var city = searchInput.value;
    console.log(city);
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=44541d76d19b2706ab8b90c24f5bbf53`
    )
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                localStorage.setItem("city", JSON.stringify(data))
                loadWeather()
                loadWeatherFive()
            })
        }
    })
};

// actively loading
function loadWeather() {
    const cityLocal = JSON.parse(localStorage.getItem("city"));
    let icon = cityLocal.weather[0].icon;
    document.getElementById("Location").textContent = cityLocal.name;
    document.getElementById("weatherLarge").innerHTML = `<img src=https://openweathermap.org/img/wn/${icon}@4x.png>`;
    document.getElementById("tempLarge").textContent = ("temperature " + cityLocal.main.temp + "C");
    document.getElementById("windLarge").textContent = ("wind speeds " + cityLocal.wind.speed + "KM/h");
    document.getElementById("humidityLarge").textContent = ("Humidity " + cityLocal.main.humidity + "%");
}

// five bottom displays
function loadWeatherFive() {
    const cityLocal = JSON.parse(localStorage.getItem("city"));
    for (x = 0; x < 5 ; x++) {
        let icon = cityLocal.weather[0].icon;
        document.getElementById(`${x}weather`).innerHTML = `<img src=https://openweathermap.org/img/wn/${icon}@4x.png>`;
        document.getElementById(`${x}temp`).textContent = ("temperature " + cityLocal.main.temp + "C");
        document.getElementById(`${x}wind`).textContent = ("wind speeds " + cityLocal.wind.speed + "KM/h");
        document.getElementById(`${x}hum`).textContent = ("Humidity " + cityLocal.main.humidity + "%");
       }
    };

window.onload = preloading();