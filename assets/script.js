
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

formInput.addEventListener('submit', submitted);

let lat = "34.068623"
let lon = "-118.027565"
let baseUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=imperial`

//QuerySelectors
/*
const formInput = document.querySelector('#form')
const currentTempDiv = document.querySelector('#temp')
const currentDescriptionDiv = document.querySelector('#todayDescription')
const currentCityDiv = document.querySelector('#city')
const currentDateDiv = document.querySelector('#date')
const currentWindDiv = document.querySelector('#wind')
const currentHumidityDiv = document.querySelector('#humidity')

Bonus points if I wanna do append()
*/

const searchInput = document.querySelector('#search-input')
const searchButton = document.querySelector('#search-btn')
const weatherHistoryUL = document.querySelector('#history-list')

//Convert City Name to Lat/Long
let inputtedCity = ""
let findLatLongUrl = ""

//After converting the user's inputted city to lat/long, it will overwrite the lat/long variables at the top of the page
async function latLongApi() {
    const response = await fetch(findLatLongUrl)
    try {
            const data = await response.json();
            const fetchedLat = data[0].lat
            const fetchedLon = data[0].lon
            lat = fetchedLat
            lon = fetchedLon
        }
    catch (err) {
        console.log(err)
    }
}

