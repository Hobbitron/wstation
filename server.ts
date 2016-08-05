/// <reference path="./typings/index.d.ts" />


// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

import fs = require('fs');

import { BrickMaster } from "./src/devices/BrickMaster";
import { BrickletBarometerReport } from "./src/reports/BrickletBarometerReport"
import { BrickletHumidityReport } from "./src/reports/BrickletHumidityReport"
import { BrickletTemperatureReport } from "./src/reports/BrickletTemperatureReport"

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 5010;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:{{port}}/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api for a weather station!' });   
});


router.route('/brickmaster/:id/brickletbarometerreport')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .put(function(req, res) {
        let bbr = new BrickletBarometerReport();
        bbr.setJson(req.body);
        bbr.save(() => {
            res.json({});
        });
    })
    .get(function(req, res) {
        res.json({ message: 'hooray! welcome to our api for reporting brickletbarometer!' });   
    });

router.route('/brickmaster/:id/bricklethumidityreport')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .put(function(req, res) {
        let bhr = new BrickletHumidityReport();
        bhr.setJson(req.body);
        bhr.save(() => {
            res.json({});
        });
    })

router.route('/brickmaster/:id/bricklettemperaturereport')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .put(function(req, res) {
        let btr = new BrickletTemperatureReport();
        btr.setJson(req.body);
        btr.save(() => {
            res.json({});
        });
    })

router.route('weatherstations')
    .get(function(req, res) {
        //load all weather stations
    })

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);