const apiKeys = "764aec224ed3a3be0e528b21fd3ec0d4";

const weatherData = document.getElementById("weather-data");
const cityInput = document.getElementById("city-input");
const formE1 = document.querySelector("form");
formE1.addEventListener("submit", (event )=>{

    // page refresh when we click the button.To prevent this behavior we use...
    event.preventDefault();

    const cityValue = cityInput.value;
    getWeatherData(cityValue);
});

getWeatherData = async (cityValue)=>{

// try-catch is best way to fetch data from the api. if ur data enter is correct then our result will be shown otherwise an error will be generated.

try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKeys}&units=metric`)

    if(!response.ok){
        throw new Error("Network response was not ok.");
    }
    const data = await response.json();
    console.log(data);

    // now data is ready , have to fill website with this data.
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const details = [
        `Feels Like: ${data.main.feels_like}`,
        `Humidity: ${data.main.humidity}%`,
        `Wind Speed: ${data.wind.speed}m/s`
    ]

    weatherData.querySelector(".icon").innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt = "weather-icon">`;

    weatherData.querySelector(".temperature").textContent= `${temperature}°C`;

    weatherData.querySelector(".description").textContent = description;

    weatherData.querySelector(".details").innerHTML = details.map((details)=>`<div>${details}</div>`).join("")

} catch (error) {
    weatherData.querySelector(".icon").innerHTML ="";
    weatherData.querySelector(".temperature").textContent="";
    weatherData.querySelector(".description").textContent = "An Error! Please enter the valid input.";
    weatherData.querySelector(".details").innerHTML = "";
}

// await = it  going to waits untill the response comes and then goes to the next line. it prevents the code to read the next line. 
}
 