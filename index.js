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
}

let apiKey = "97a9745b0c3a1f932357060a2331ab49";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;


axios.get(apiUrl).then(displayTemperature)

