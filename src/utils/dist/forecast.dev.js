"use strict";

var request = require('postman-request');

var forecast = function forecast(location, callback) {
  var url = "http://api.weatherstack.com/current?access_key=1feaa47272b60812278c6baf18812047&query=".concat(location);
  request({
    url: url,
    json: true
  }, function (error, response) {
    console.log(error);
    console.log(response.body.error);

    if (error) {
      return callback('Error', undefined);
    } else if (response.body.error) {
      return callback('Error', undefined);
    }

    var _response$body$curren = response.body.current,
        temperature = _response$body$curren.temperature,
        feelslike = _response$body$curren.feelslike;
    return callback(undefined, {
      temperature: temperature,
      feelslike: feelslike
    });
  });
};

module.exports = forecast;