"use strict";

console.log('Client side javascript file is loaded!');

var fetchWeather = function fetchWeather(address) {
  fetch("http://localhost:3000/weather?address=".concat(address)).then(function (response) {
    return response.json();
  }).then(function (data) {
    var error = data.error,
        address = data.address,
        feelslike = data.feelslike,
        temperature = data.temperature;
    if (error) return messageElement.innerText = error;
    messageElement.innerText = "The temperature in ".concat(address, " is ").concat(temperature, ", but it feels like ").concat(feelslike, ".");
  });
};

var weatherForm = document.querySelector('form');
var inputFormElement = document.querySelector('input');
var messageElement = document.getElementById('message-1');
weatherForm.addEventListener('submit', function (event) {
  event.preventDefault();
  var inputText = inputFormElement.value;
  fetchWeather(inputText);
  inputFormElement.value = '';
});