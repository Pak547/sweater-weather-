
// Step 1 
// create skeleton html structure
// Implement weather API
// Implement search input for cities

// Step 2 
// the search result will show details and then it will be added in the search history
// empty div html section

//step 3
// current weather cond
// The search details will include city name, date, and icon representation of the weather conditions, temperature and humidity and wind speed

// step 4
// future weather cond
// 5 day forecast displaying date, icon rep for weather conditions, temp, wind speed, and humidity

//step 5
// implement a working search history


const APIkey = "ac1420b505ff9abbca12da4b8180a280"

var city;

var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIkey;

fetch(queryURL)

const f = document.getElementById('form');
const q = document.getElementById('query');

const site = 'pagedart.com';

function submitted(event) {
  event.preventDefault();
  const url = queryURL + site + '+' + q.value;
  const win = window.open(url, '_blank');
  win.focus();
}

f.addEventListener('submit', submitted);