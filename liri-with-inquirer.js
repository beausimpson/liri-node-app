// required node modules
// dotenv package to read and set enviroment variables
require("dotenv").config();

// inquirer command line module
var inquirer = require("inquirer");

// node file system module
var fs = require("fs");

// axios node module
var axios = require("axios");

// moment js node module
var moment = require('moment');

// node spotify api module
var Spotify = require('node-spotify-api');

// variable that imports key.js file
var keys = require("./keys.js");

// accesses the spotify keys
var spotify = new Spotify(keys.spotify);

// Sets OMDB API Key from local enviroment
var omdb = process.env.OMDB_APIKEY;

// logs the command in log.txt
// var command = process.argv[2];
// var nodeArgs = process.argv;

inquirer
    .prompt([
        {
            type: "list",
            name: "command",
            message: "Select a Command: ",
            choices: ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"]
        }, {
            type: "input",
            name: "searchTerm",
            message: "What would you like to search: "
        }
    ]).then(function (user) {

        // swtich statement for the user entered commands
        switch (user.command) {
            case 'concert-this':
                logCommand();
                concertThis(user.searchTerm);
                break;
            case 'spotify-this-song':
                logCommand();
                spotifySong(user.searchTerm);
                break;
            case 'movie-this':
                logCommand();
                movieThis(user.searchTerm);
                break;
            case 'do-what-it-says':
                logCommand();
                doWhatSays(user.searchTerm);
                break;
        };

    })

// concert-this function -- Returns Upcoming Concert Info for User Submitted Band
function concertThis(searchTerm) {
    // nodeArgs = process.argv;
    var bandName = "";
    for (var i = 3; i < searchTerm.length; i++) {

        if (i > 3 && i < searchTerm.length) {
            bandName = bandName + "+" + searchTerm[i];
        }
        else {
            bandName += searchTerm[i];
        }
    }

    var bandQueryUrl = `https://rest.bandsintown.com/artists/${bandName}/events?app_id=codingbootcamp`

    axios.get(bandQueryUrl).then(function (bandResponse) {
        var respsonseData = bandResponse.data;
        var bandEvents = [];
        for (var i = 0; i < respsonseData.length; i++) {
            bandEvents.push(
                respsonseData[i].venue.name,
                respsonseData[i].venue.city,
                respsonseData[i].venue.region,
                respsonseData[i].venue.country,
                moment(respsonseData[i].datetime).format("MM/DD/YYYY"),
                "-------------"
            );
        }
        console.log(JSON.stringify(bandEvents, null, 3))
        logData(bandEvents)
    })

};

// spotify-this-song function -- Returns info for User entered Song Title
function spotifySong(searchTerm) {
    // fixes Node Argument issue if song has more than 1 word in name
    // var nodeArgs = process.argv;
    var songName = "";
    for (var i = 3; i < searchTerm.length; i++) {

        if (i > 3 && i < searchTerm.length) {
            songName = songName + "+" + searchTerm[i];
        }
        else {
            songName += searchTerm[i];
        }
    }

    // sets default song parameter if user does not enter song
    // -- does not add "The Sign" by Ace of Base as listed in instructions
    if (songName === "") {
        song = "The Sign"
    } else {
        song = songName
    }

    spotify.search({ type: 'track', query: `${song}`, limit: '5' }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        var song = {
            "Artist": `${data.tracks.items[0].album.artists[0].name}`,
            "Song Name": `${data.tracks.items[0].name}`,
            "Album": `${data.tracks.items[0].album.name}`,
            "Preview URL": `${data.tracks.items[0].preview_url}`,
        };

        console.log(JSON.stringify(song, null, 3));
        logData(song);
    });
};

// movie-this function -- Returns info for User entered Movie Title
function movieThis(searchTerm) {
    // fixes Node Argument issue if movie has more than 1 word in title
    // var nodeArgs = process.argv;
    var movieName = "";
    for (var i = 3; i < searchTerm.length; i++) {

        if (i > 3 && i < searchTerm.length) {
            movieName = movieName + "+" + searchTerm[i];
        }
        else {
            movieName += searchTerm[i];

        }
    }
    // sets default movie parameter if user does enter movie
    if (movieName === "") {
        var movieQueryUrl = `http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&apikey=${omdb}`;
    } else {
        var movieQueryUrl = `http://www.omdbapi.com/?t=${movieName}&y=&plot=short&apikey=${omdb}`;
    };

    // axios call for OMDB api
    axios.get(movieQueryUrl).then(function (movieResponse) {
        var movie = {
            "Title": `${movieResponse.data.Title}`,
            "Released": `${movieResponse.data.Year}`,
            "IMDB Rating": `${movieResponse.data.Ratings[0].Value}`,
            "Rotton Tomatoes Rating": `${movieResponse.data.Ratings[1].Value}`,
            "Language": `${movieResponse.data.Language}`,
            "Plot": `${movieResponse.data.Plot}`,
            "Actors": `${movieResponse.data.Actors}`
        }
        console.log(JSON.stringify(movie, null, 3))
        logData(movie);

    }
    );
}

// do-what-it-says function -- reads random.txt file and take first index in string as command and second index as parameter
function doWhatSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        // If code experiences any errors, it will log error to console
        if (error) {
            return console.log(error);
        }

        var output = data.split(",")

        switch (output[0]) {
            case 'concert-this':
                logCommand();
                concertThis(output[1]);
                break;
            case 'spotify-this-song':
                logCommand();
                spotifySong(output[1]);
                break;
            case 'movie-this':
                logCommand();
                movieThis(output[1]);
                break;
        };
    })
}

// log command function -- logs command to log.txt
function logCommand() {
    var timeAdded = moment().format("dddd, MMMM Do YYYY, h:mm:ss a")
    var loggedCommand = `${command}\n${timeAdded}\n-------------\n`;
    fs.appendFile("log.txt", loggedCommand, function (err) {
        // If an error was experienced, it log it to console
        if (err) {
            console.log(err);
        }
        // If no error is experienced, it logs in console that the command was successfully added to log.txt
        else {
            console.log("\nCommand Added to log.txt!\n");
        }
    });
};

function logData(data) {
    data = `${JSON.stringify(data, null, 3)}\n-------------\n`;
    fs.appendFile("log.txt", data, function (err) {
        // If an error was experienced, it log it to console
        if (err) {
            console.log(err);
        }
        // If no error is experienced, it logs in console that the command was successfully added to log.txt
        else {
            console.log("\nData Added to log.txt!\n");
        }
    });
};