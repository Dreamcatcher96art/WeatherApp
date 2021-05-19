function formatDate (timestamp){
let date = new Date(timestamp);
let hours = date.getHours();
if (hours <10){
    hours = `0${hours}`;
}
let minutes = date.getMinutes();
if (minutes <10){
    minutes = `0${minutes}`;
}
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[date.getDay()];
return `${day} ${hours}:${minutes}`
}

function displayForecast(){
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = "";
    let days = ["Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    days.forEach(function(day){
    forecastHTML = forecastHTML+`
            <div class="card">
                <p class="day">${day}</p>
                <p><img src="https://ssl.gstatic.com/onebox/weather/64/sunny.png" alt="sunny" width="50" class="picture" id="picture"></p>
                <p class="temperature-forecast">18/12</p>
            </div>`  
    })
    forecastElement.innerHTML = forecastHTML
}



function getForecast(coordinates){
    console.log(coordinates)
    let apiKey = "97a9745b0c3a1f932357060a2331ab49";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}


function displayTemperature(response){
    console.log(response.data)
let temperatureElement = document.querySelector("#temperature");
temperatureElement.innerHTML = Math.round(response.data.main.temp);
let cityElement = document.querySelector("#city");
cityElement.innerHTML = response.data.name;
let descriptionElement = document.querySelector("#description");
descriptionElement.innerHTML = response.data.weather[0].description;
let humidityElement = document.querySelector("#hum");
humidityElement.innerHTML = Math.round(response.data.main.humidity);
let pressureElement = document.querySelector("#press");
pressureElement.innerHTML = Math.round(response.data.main.pressure);
let windSpeedElement = document.querySelector("#winds");
windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
let timeElement = document.querySelector("#time");
timeElement.innerHTML = formatDate(response.data.dt*1000)
let iconElement = document.querySelector("#icon");
iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png `);
iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city){
let apiKey = "97a9745b0c3a1f932357060a2331ab49";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature)
}


function handleSubmit(event){
    event.preventDefault();
    let cityInput = document.querySelector("#enter-city");
    search(cityInput.value)
}

search("Gdynia");
displayForecast();

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);





