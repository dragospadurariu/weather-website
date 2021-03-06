"use strict";

var path = require('path');

var express = require('express');

var hbs = require('hbs');

var forecast = require('./utils/forecast');

var app = express();
var port = process.env.PORT || 3000; // Define paths for Express config

var publicDirectoryPath = path.join(__dirname, '../public');
var viewsPath = path.join(__dirname, '../templates/views');
var partialsPath = path.join(__dirname, '../templates/partials'); // Setup handlebars engine and views location

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath); // Setup static directory to serve

app.use(express["static"](publicDirectoryPath));
app.get('', function (req, res) {
  res.render('index', {
    title: 'Weather',
    name: 'Dragos Padurariu'
  });
});
app.get('/about', function (req, res) {
  res.render('about', {
    title: 'About Me',
    name: 'Dragos Padurariu'
  });
});
app.get('/help', function (req, res) {
  res.render('help', {
    helpText: 'This is some helpful text.',
    title: 'Help',
    name: 'Dragos Padurariu'
  });
});
app.get('/weather', function (req, res) {
  var address = req.query.address;
  if (!address) return res.send({
    error: 'You must provide an address query'
  });
  forecast(address, function (error) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        temperature = _ref.temperature,
        feelslike = _ref.feelslike;

    if (error) return res.send({
      error: error
    });
    return res.send({
      address: address,
      temperature: temperature,
      feelslike: feelslike
    });
  });
});
app.get('/products', function (req, res) {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search'
    });
  }

  res.send({
    products: []
  });
});
app.get('/help/*', function (req, res) {
  res.render('404', {
    title: '404',
    name: 'Andrew Mead',
    errorMessage: 'Help article not found.'
  });
});
app.get('*', function (req, res) {
  res.render('404', {
    title: '404',
    name: 'Andrew Mead',
    errorMessage: 'Page not found.'
  });
});
app.listen(port, function () {
  console.log("Server is up on port ".concat(port));
});