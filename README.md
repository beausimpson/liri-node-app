# LIRI Node App
**Built by Beau Simpson**

**This Node based app was built using the following Node packages:**
- Node-Spotify-API
- Axios
    - OMDB API
    - Bands in Town API
- Moment
- DotEnv

### To use the app the user must first:
- Supply their own `.env` file
- Install the required Node packages:
    - ` npm install `

#### Enter `node liri.js` to run program

### liri.js can take in one of the following commands:
- `concert-this`

- `spotify-this-song`

- `movie-this`

- `do-what-it-says`

### What Each Command Should Do:
#### concert-this
`node liri.js concert-this <artist/band name here>`
    
#### Outputs the following of the user submitted artist:
- Name of venues
- Venue locations
- Date of events

Example of concert-this command:
![Image of concert-this command](https://s3.amazonaws.com/simpson/markdown_images/liri_node_app/concert-this-command.jpg)

Example of concert-this results:
![Image of concert-this results](https://s3.amazonaws.com/simpson/markdown_images/liri_node_app/concert-this-results.jpg)

#### spotify-this-song
`node liri.js spotify-this-song '<song name here>'`

#### Outputs the following of the user submitted song:
- Artist
- Name of Song
- The album the song is from
- A preview link of the song from Spotify
- If no song is submitted, the program will output data for "The Sign"

Example of spotify-this-song command:
![Image of spotify-this-song command](https://s3.amazonaws.com/simpson/markdown_images/liri_node_app/spotify-this-song-command.jpg)

Example of spotify-this-song results:
![Image of spotify-this-song results](https://s3.amazonaws.com/simpson/markdown_images/liri_node_app/spotify-this-song-results.jpg)

#### movie-this
`node liri.js movie-this '<movie name here>'`

 ### Output the following from user submitted movie:

- Title of the movie.
- Year the movie came out.
- IMDB Rating of the movie.
- Rotten Tomatoes Rating of the movie.
- Country where the movie was produced.
- Language of the movie.
- Plot of the movie.
- Actors in the movie.
- If no movie is submitted, the program will output data for the movie 'Mr. Nobody.'

Example of movie-this command:
![Image of movie-this Command](https://s3.amazonaws.com/simpson/markdown_images/liri_node_app/movie-this-command.jpg)

Example of movie-this results:
![Image of movie-this results](https://s3.amazonaws.com/simpson/markdown_images/liri_node_app/movie-this-results.jpg)

#### do-what-it-says
`node liri.js do-what-it-says`

- LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
- By default it will  run spotify-this-song for "I Want it That Way"

Example of do-what-it-says command:
![Image of do-what-it-says command](https://s3.amazonaws.com/simpson/markdown_images/liri_node_app/do-what-it-says-command.jpg)

Example of random.txt file contents:

![Image of random.txt file](https://s3.amazonaws.com/simpson/markdown_images/liri_node_app/random-txt-example.jpg)

Example of do-what-it-says results:
![Image of do-what-it-says results](https://s3.amazonaws.com/simpson/markdown_images/liri_node_app/do-what-it-says-results.jpg)

### As a bonus feature:

- The program will log all commands, returning data and the time stamp of when the command was run
    - All of the data is stored in log.txt


### Work in Progess:
- Added Inquirer node package so that LIRI works from the command line
    - `liri-with-inquirer.js` is still a work in progress