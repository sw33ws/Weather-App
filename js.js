var cityDate = $("#cityDate");
var day1 = $("#day1");
var day2 = $("#day2");
var day3 = $("#day3");
var day4 = $("#day4");
var day5 = $("#day5");

var apiKey = '44541d76d19b2706ab8b90c24f5bbf53';
var tempMain = $('#temp1');
var windMain = $('wind1');
var humidityMain = $('humidity1');
var uvMain = $('#uv1');

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
 
// getting the info
function searching() {
    var searchInput = document.getElementById('search-input');
    console.log(searchInput.value);
    var city = searchInput.value;
    console.log(city);
    fetchWeather()
}

// Uncaught ReferenceError: city is not defined came up ever time, so i just defined it here as i couldn't get it too work
city = 'london';

// weather info for the choosen city
function fetchWeather() {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=44541d76d19b2706ab8b90c24f5bbf53`
    ).then((response) => response.json())
    .then((data) => console.log(data));
}

window.onload = cityandtime;