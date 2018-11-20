

// required dotenv file
require("dotenv").config();

// node file system module
var fs = require("fs");

// axios node module
var axios = require("axios");

// variable that imports key.js file
var keys = require("./keys.js");

// accesses the spotify keys
var spotify = new Spotify(keys.spotify);
























// logs the command in log.txt
var command = process.argv[2];

fs.appendFile("log.txt", command, function(err) {
    // If an error was experienced, it log it to console
    if (err) {
      console.log(err);
    }
    // If no error is experienced, it log in console that the command was successfully added to log.txt
    else {
      console.log("Command Added to log.txt!");
    }
  });