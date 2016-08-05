/// <reference path="./typings/index.d.ts" />
"use strict";
// BASE SETUP
// =============================================================================
// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
var fs = require('fs');
var file = "test.db";
var exists = fs.existsSync(file);
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);
db.serialize(function () {
    if (!exists) {
        db.run("CREATE TABLE Stuff (thing TEXT)");
    }
});
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 5015; // set our port
// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router
// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});
router.route('/data')
    .post(function (req, res) {
    var dd = {}; // create a new instance of the Bear model
    console.log(req.body);
    db.serialize(function () {
        var stmt = db.prepare("INSERT INTO stuff VALUES (?)");
        stmt.run(req.body.name);
        stmt.finalize();
    });
    db.each("SELECT rowid AS id, thing FROM Stuff", function (err, row) {
        console.log(row.id + ": " + row.thing);
    });
});
// more routes for our API will happen here
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
//# sourceMappingURL=server.js.map