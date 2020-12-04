const request = require('postman-request');

const forecast = (location, callback) => {
  const url =
    `http://api.weatherstack.com/current?access_key=1feaa47272b60812278c6baf18812047&query=${location}`;

  request({ url, json: true },(error, response) =>{
    console.log(error)
    console.log(response.body.error)
    if (error) {
      return callback('Error',undefined)
    } else if (response.body.error) {
      return callback('Error',undefined)
    }

    const { temperature, feelslike } = response.body.current;

    return callback(undefined,{temperature,feelslike});
    
  });
};

module.exports=forecast;
