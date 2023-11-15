let APIkey = keys.APIkey

let lat = "";
let lon = "";
let baseUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=imperial`

const currentTempDiv = document.querySelector('#temp')
const currentDescriptionDiv = document.querySelector('#description')
const currentCityDiv = document.querySelector('#city')
const currentDateDiv = document.querySelector('#date')
const currentWindDiv = document.querySelector('#wind')
const currentHumidityDiv = document.querySelector('#humidity')

const searchInput = document.querySelector('#search-input')
const searchButton = document.querySelector('#search-btn')
const historyList = document.querySelector('.dropdown-menu')

let cityInput = "";
let findLatLongUrl = "";

async function latLongApi() {
    const response = await fetch(findLatLongUrl)
    try {
            let data = await response.json();
            let fetchedLat = data[0].lat
            let fetchedLon = data[0].lon
            lat = fetchedLat
            lon = fetchedLon
            weatherApi()
    }
    catch (err) {
        console.log(err)
    }
}

//Retrieves all data with the key 'cities' in the local storage into array
const cities = JSON.parse(localStorage.getItem('cities')) || []

//Loads Search History | Basically re-creating the list again from the local storage
function loadSearchHistory() {
    for (const city of cities) {
        const newLI = document.createElement('li');
        newLI.textContent = city;
        newLI.addEventListener('click', function() {
            // Retrieve the city name from the clicked history item
            let selectedCity = city;
            // Update the search input with the selected city
            searchInput.value = selectedCity;
            inputtedCity = selectedCity;
            weatherApi();
        });
        historyList.appendChild(newLI);
    }
}

//Loads Search History Upon Startup
window.addEventListener('load', loadSearchHistory);

//Search button will save the user's inputs (into a list) into the local storage and will retrieve it into the 'History'
searchButton.addEventListener('click', function() {
    cityInput = searchInput.value;
    cities.push(cityInput)
    localStorage.setItem('cities', JSON.stringify(cities))

    const newLI = document.createElement('li')
    newLI.textContent = cityInput
    historyList.appendChild(newLI)

    //Added location.protocol 'if statement' due to GitHub pages not properly fetching without the correct protocol
    if (location.protocol === 'http:') {
        findLatLongUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&appid=${APIkey}`
    } else {
        findLatLongUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&appid=${APIkey}`
    }
    //Gets the user's inputted CITY and outputs the LATITUDE/LONGITUDE
    latLongApi();
})

//Gets weather data with the converted lat/long from latLongApi
async function weatherApi() {
    if (location.protocol === 'http') {
        baseUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=imperial`
    } else {
        baseUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=imperial`
    }
    const response = await fetch(baseUrl)
    try {
        if (response.ok) {
            //Query Selectors for CURRENT DAY
            const data = await response.json()
            const currentCity = data.city.name
            const currentTemp = data.list[0].main.temp
            const currentHumidity = data.list[0].main.humidity
            const currentDescription = data.list[0].weather[0].description
            const currentWind = data.list[0].wind.speed
            const currentDt = (data.list[0].dt_txt)
            currentDateDiv.textContent = `Date/Time: ${currentDt}`;
            currentCityDiv.textContent = `City: ${currentCity}`;
            currentTempDiv.textContent = `Temperature: ${currentTemp} F`;
            currentDescriptionDiv.textContent = `Description: ${currentDescription}`;
            currentWindDiv.textContent = `Wind: ${currentWind} MPH`
            currentHumidityDiv.textContent = `Humidity: ${currentHumidity}%`

            //Day 1 Forecast
            const dayOneForecastDateDiv = document.querySelector('#forecast-day-1-date');
            const dayOneForecastTempDiv = document.querySelector('#forecast-day-1-temp')
            const dayOneForecastWindDiv = document.querySelector('#forecast-day-1-wind')
            const dayOneForecastHumidityDiv = document.querySelector('#forecast-day-1-humidity')
            dayOneForecastDateDiv.textContent = `Date: ${data.list[7].dt_txt}`
            dayOneForecastTempDiv.textContent = `Temperature: ${data.list[7].main.temp} F`
            dayOneForecastWindDiv.textContent = `Wind: ${data.list[7].wind.speed} MPH`
            dayOneForecastHumidityDiv.textContent = `Humidity: ${data.list[0].main.humidity}%`

            //Day 2 Forecast
            const dayTwoForecastDateDiv = document.querySelector('#forecast-day-2-date');
            const dayTwoForecastTempDiv = document.querySelector('#forecast-day-2-temp')
            const dayTwoForecastWindDiv = document.querySelector('#forecast-day-2-wind')
            const dayTwoForecastHumidityDiv = document.querySelector('#forecast-day-2-humidity')
            dayTwoForecastDateDiv.textContent = `Date: ${data.list[15].dt_txt}`
            dayTwoForecastTempDiv.textContent = `Temperature: ${data.list[15].main.temp} F`
            dayTwoForecastWindDiv.textContent = `Wind: ${data.list[15].wind.speed} MPH`
            dayTwoForecastHumidityDiv.textContent = `Humidity: ${data.list[15].main.humidity}%`

            //Day 3 Forecast
            const dayThreeForecastDateDiv = document.querySelector('#forecast-day-3-date');
            const dayThreeForecastTempDiv = document.querySelector('#forecast-day-3-temp')
            const dayThreeForecastWindDiv = document.querySelector('#forecast-day-3-wind')
            const dayThreeForecastHumidityDiv = document.querySelector('#forecast-day-3-humidity')
            dayThreeForecastDateDiv.textContent = `Date: ${data.list[23].dt_txt}`
            dayThreeForecastTempDiv.textContent = `Temperature: ${data.list[23].main.temp} F`
            dayThreeForecastWindDiv.textContent = `Wind: ${data.list[23].wind.speed} MPH`
            dayThreeForecastHumidityDiv.textContent = `Humidity: ${data.list[23].main.humidity}%`

            //Day 4 Forecast
            const dayFourForecastDateDiv = document.querySelector('#forecast-day-4-date');
            const dayFourForecastTempDiv = document.querySelector('#forecast-day-4-temp')
            const dayFourForecastWindDiv = document.querySelector('#forecast-day-4-wind')
            const dayFourForecastHumidityDiv = document.querySelector('#forecast-day-4-humidity')
            dayFourForecastDateDiv.textContent = `Date: ${data.list[31].dt_txt}`
            dayFourForecastTempDiv.textContent = `Temperature: ${data.list[31].main.temp} F`
            dayFourForecastWindDiv.textContent = `Wind: ${data.list[31].wind.speed} MPH`
            dayFourForecastHumidityDiv.textContent = `Humidity: ${data.list[31].main.humidity}%`

            // Day 5F orecast
            const dayFiveForecastDateDiv = document.querySelector('#forecast-day-5-date');
            const dayFiveForecastTempDiv = document.querySelector('#forecast-day-5-temp')
            const dayFiveForecastWindDiv = document.querySelector('#forecast-day-5-wind')
            const dayFiveForecastHumidityDiv = document.querySelector('#forecast-day-5-humidity')
            dayFiveForecastDateDiv.textContent = `Date: ${data.list[39].dt_txt}`
            dayFiveForecastTempDiv.textContent = `Temperature: ${data.list[39].main.temp} F`
            dayFiveForecastWindDiv.textContent = `Wind: ${data.list[39].wind.speed} MPH`
            dayFiveForecastHumidityDiv.textContent = `Humidity: ${data.list[39].main.humidity}%`
        }
    } catch(err) {
        console.log(err)
    }
}