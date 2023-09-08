const apiKey = "a3865d784aadefa960e6a7fa9240da85";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-button");
const weatherIcon = document.querySelector(".weather-icon");
const errorElement = document.querySelector(".error");
const weatherElement = document.querySelector(".weather");
const descriptionElement = document.querySelector(".description");
const cityElement = document.querySelector(".city");
const tempElement = document.querySelector(".temp");
const tempMinElement = document.querySelector(".temp_min");
const tempMaxElement = document.querySelector(".temp_max");
const feelsLikeElement = document.querySelector(".feels_like");
const pressureElement = document.querySelector(".pressure");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".wind");
const dateTimeElement = document.querySelector(".date-time");

function displayDateTime() {
    const now = new Date();
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric", hour12: true };
    const formattedDateTime = now.toLocaleDateString("en-US", options);
    dateTimeElement.textContent = formattedDateTime;
}

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        if (response.status === 404) {
            errorElement.style.display = "block";
            weatherElement.style.display = "none";
        } else {
            const data = await response.json();

            descriptionElement.textContent = data.weather[0].description;
            cityElement.textContent = "Weather in " + data.name;
            tempElement.textContent = data.main.temp + "°C";
            tempMinElement.textContent = data.main.temp_min + "°C";
            tempMaxElement.textContent = data.main.temp_max + "°C";
            feelsLikeElement.textContent = data.main.feels_like + "°C";
            pressureElement.textContent = data.main.pressure + " hPa";
            humidityElement.textContent = data.main.humidity + "%";
            windElement.textContent = data.wind.speed + " m/s";

            switch (data.weather[0].main) {
                case "Clouds":
                    weatherIcon.src = "images/clouds.png";
                    break;
                case "Clear":
                    weatherIcon.src = "images/clear.png";
                    break;
                case "Rain":
                    weatherIcon.src = "images/rain.png";
                    break;
                case "Drizzle":
                    weatherIcon.src = "images/drizzle.png";
                    break;
                case "Mist":
                    weatherIcon.src = "images/mist.png";
                    break;
                default:
                    weatherIcon.src = "images/default.png";
                    break;
            }

            weatherElement.style.display = "block";
            errorElement.style.display = "none";
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);
    }
});

displayDateTime();

checkWeather();
