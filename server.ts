/// <reference path="./typings/index.d.ts" />


// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

import fs = require('fs');

import { BrickMaster } from "./src/devices/BrickMaster";
import { BrickletHumidity } from "./src/devices/BrickletHumidity";
import { BrickletBarometer } from "./src/devices/BrickletBarometer";
import { BrickletTemperature } from "./src/devices/BrickletTemperature";
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

router.route('/brickmaster')
    .put((req, res) => {
        let bm = new BrickMaster();
        bm.setJson(req.body);
        bm.save(() => {
            res.json(bm.getJson());
        });
    });
router.route('/brickmaster/:id')
    .get((req,res) => {
        let bm = new BrickMaster();
        bm.brickMasterID = req.params.id;
        bm.load(req.params.id, () => {
            res.json(bm.getJson());
        });
    });
router.route('/brickmaster/:id/bricklets')
    .get((req,res) => {
        let bb = new BrickletBarometer();
        let bt = new BrickletTemperature();
        let bh = new BrickletHumidity();
        bb.
    });
router.route('/brickmaster/:id/brickletbarometer')
    .put((req,res) => {
        let bm = new BrickMaster();
        bm.load(req.params.id, () => {
            let b = new BrickletBarometer();        
            b.setJson(req.body);
            bm.addBrickletBarometer(b);
            bm.save(() => {
                res.json(b.getJson());
            })
        })
    });
router.route('/brickmaster/:id/bricklettemperature')
    .put((req,res) => {
        let b = new BrickletTemperature();        
        b.setJson(req.body);
        b.brickMasterID = req.params.id;
        b.save(() => {
            res.json(b.getJson());
        })
    });
router.route('/brickmaster/:id/bricklethumidity')
    .put((req,res) => {
        let b = new BrickletHumidity();        
        b.setJson(req.body);
        b.brickMasterID = req.params.id;
        b.save(() => {
            res.json(b.getJson());
        })
    });
router.route('/brickletbarometer')
    .put((req, res) => {
        let bb = new BrickletBarometer();
        bb.setJson(req.body);
        bb.save(() => {
            res.json(bb.getJson());
        });
    });
router.route('/brickletbarometer/:id')
    .get((req,res) => {
        let bb = new BrickletBarometer();
        bb.load(req.params('id'), () => {
            res.json(bb.getJson());
        });
    });
router.route('/bricklettemperature')
    .put((req, res) => {
        let bt = new BrickletTemperature();
        bt.setJson(req.body);
        bt.save(() => {
            res.json(bt.getJson());
        });
    });
router.route('/bricklettemperature/:id')
    .get((req,res) => {
        let bt = new BrickletTemperature();
        bt.load(req.param('id'), () => {
            res.json(bt.getJson());
        });
    });
router.route('/bricklethumidity')
    .put((req, res) => {
        let bh = new BrickletHumidity();
        bh.setJson(req.body);
        bh.save(() => {
            res.json(bh.getJson());
        });
    });
router.route('/bricklethumidity/:id')
    .get((req,res) => {
        let bh = new BrickletHumidity();
        bh.load(req.param('id'), () => {
            res.json(bh.getJson());
        });        
    });
router.route('/brickmaster/:id/brickletbarometerreport')
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
    .put(function(req, res) {
        let bhr = new BrickletHumidityReport();
        bhr.setJson(req.body);
        bhr.save(() => {
            res.json({});
        });
    })
router.route('/brickmaster/:id/bricklettemperaturereport')    
    .put(function(req, res) {
        let btr = new BrickletTemperatureReport();
        btr.setJson(req.body);
        btr.save(() => {
            res.json({});
        });
    })

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);