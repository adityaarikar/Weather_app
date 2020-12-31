"use strict";

const form = document.querySelector(".main-container form");
const input = document.querySelector(".main-container input");
const msg = document.querySelector(".main-container .msg");
const showImg = document.querySelector(".show-icon img");
const city = document.querySelector(".city");
const cntCode = document.querySelector(".cnt-code");
const tempValue = document.querySelector(".temp-value");
const description = document.querySelector(".description");
const celcius = document.querySelector(".celcius");

const apiKey = "4d8fb5b93d4af21d66a2948710284366";

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let inputValue = input.value;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const { main, name, sys, weather } = data;
      const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;

      cntCode.classList.remove("hidden");
      celcius.classList.remove("hidden");
      showImg.src = icon;
      description.textContent = weather[0]["description"];
      city.textContent = name;
      cntCode.textContent = sys.country;
      tempValue.textContent = main.temp;
    })
    .catch(() => {
      msg.classList.remove("hidden");
      msg.textContent = "Please search for a valid city 😩";
    });
  msg.textContent = "";
  form.reset();
  input.focus();
});
