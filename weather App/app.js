
//let newconst = https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
let apikey = "32a16e50f4297f3d47b749de45392f6c";

const searchbox =document.querySelector(".search input");
const searchbtn =document.querySelector(".search button");
const imgicon = document.getElementsByClassName("weather-icon");
console.log(imgicon)

console.log( searchbox ,searchbtn);

async function Checkweather(city) {
  console.log(city);
  const response = await fetch(apiurl+city+`&appid=${apikey}`);
  if (response.status === 404) {
    document.querySelector(".city").innerHTML = "City not found";
    document.querySelector(".temp").innerHTML = "-";
    document.querySelector(".humidity").innerHTML = "-";
    document.querySelector(".wind").innerHTML = "-";
    imgicon[0].src = "error.png"; // optional: add an error image
    return;
  }
  var data = await response.json();
  console.log(data);
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML =Math.round( data.main.temp )+"°C";
  document.querySelector(".humidity").innerHTML = data.main.humidity  +"%";
  document.querySelector(".wind").innerHTML = data.wind.speed +"k/h";

  // Set weather icon based on condition
  if (data.weather[0].main === "Clouds") {
    imgicon[0].src = "clouds.png";
  } else if (data.weather[0].main === "Clear") {
    imgicon[0].src = "clear.png";
  } else if (data.weather[0].main === "Rain") {
    imgicon[0].src = "rain.png";
  } else if (data.weather[0].main === "Drizzle") {
    imgicon[0].src = "drizzle.png";
  } else if (data.weather[0].main === "Mist") {
    imgicon[0].src = "mist.png";
  }
}

searchbtn.addEventListener("click", () => {
  let city = searchbox.value;
  Checkweather(city);
});

