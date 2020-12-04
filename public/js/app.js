console.log('Client side javascript file is loaded!');

const fetchWeather = (address) => {
  fetch(`http://localhost:3000/weather?address=${address}`)
    .then((response) => response.json())
    .then((data) => {
      const { error, address, feelslike, temperature } = data;

      if (error) return messageElement.innerText = error;

      
       messageElement.innerText = `The temperature in ${address} is ${temperature}, but it feels like ${feelslike}.`
  
    });
};

const weatherForm = document.querySelector('form');
const inputFormElement = document.querySelector('input');
const messageElement = document.getElementById('message-1');


weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const inputText =  inputFormElement.value;
  fetchWeather(inputText)
  inputFormElement.value='';

});
