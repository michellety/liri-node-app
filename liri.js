//variables to store the required packages and files
require("dotenv").config();
//used to hide the keys in the .env file
var fs = require("fs");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var keys = require("./keys.js");
//variable to store the third word that the user enters
var action = process.argv[2];

//if else statements to match the user entered phrase with the function
if (action === "concert-this") {
    //the entery command is sliced to accept multiple words
    var artist = process.argv.slice(3).join(" ");
    concert(artist);

} else if (action === "spotify-this-song") {
    var artist = process.argv.slice(3).join(" ");
    //if the user does not enter a song to search, the default is "The Sign"
    if(!artist) {
      artist = "The Sign";
    }
    spotifySong(artist);

} else if (action === "movie-this") {
  var artist = process.argv.slice(3).join(" ");
  //if the user does not enter a movie to search, the default is "Mr. Nobody"
  if(!artist) {
    artist = "Mr. Nobody";
  }
    movie(artist);
    
} else if (action === "do-what-it-says") {
    thatWay();
};

/////function to search concerts
function concert(artist) {
  //axios call 
  //the user entered index 3 and above becomes the artist in the serach query url
  axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
    function(response) {
      //loop through the length of the data
      for(var i = 0; i < response.data.length; i++) {
        //console.log the responses
        console.log("Concert Information for ", artist)
        console.log("Location: ", response.data[i].venue.city);
        console.log("Venue Name: ", response.data[i].venue.name);
        console.log("Date (MM/DD/YYYY): ", moment(response.data[i].datetime).format("MM DD YYYY"));
        console.log("---------------------------");
      }
    }, 
    function(error) {
      //notify if there is an error
      if (error.response) {
          console.error("error", error);
        } 
    },
)};
       
//spotify function: searches for a user entered track
function spotifySong(something){
  var spotify = new Spotify(keys);
  spotify.search({ type: "track", query: something}, function(err, data) {
    if (err) {
      return console.log("Error occured: " + err);
    } else {
        //searches for how many are available 
        var songs = data.tracks.items;
        for (var i =0; i < songs.length; i++) {
        //display the results
        console.log("Song name: ", songs[i].name);
        console.log("Artist: ", songs[i].artists[0].name);
        console.log("Album: ", songs[i].album.name);
        console.log("Preview song: ", songs[i].preview_url); 
        console.log("------------------------------------");
        }
      }
  });
};

//function to search movie titles, user may enter multiple words 
function movie(){
  var multipleWords = process.argv;
  var movieName = "";
  //join the words with + for the format required by the query url and OMDB
  for (var i = 3; i < multipleWords.length; i++) {
    if (i > 2 && multipleWords.length) {
      movieName = movieName + "+" + multipleWords[i];
    
    } else {
      movieName += multipleWords[i];
    }

  }
  //build the query with the provided movie title as movieName
  var query = "http://www.omdbapi.com/?t="+ movieName +"&y=&plot=short&apikey=trilogy";
  // console.log(query);
  //axios call   
  axios.get(query).then(function(response) {
    //display the results
    console.log("Title: ", response.data.Title);
    console.log("Year: ", response.data.Released);
    console.log("IMBD Rating: ", response.data.imdbRating);
    console.log("Country Produced: ", response.data.Country);
    console.log("Language: ", response.data.Language);
    console.log("Plot: ", response.data.Plot);
    console.log("Actors: ", response.data.Actors);
    console.log("------------------------------------");
 
  });
};

//this function reads from a text file and runs the commands
function thatWay() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);

    } else {
      var splitted = data.split(",");
        if (splitted[0] === "spotify-this-song"){
        spotifySong(splitted[1]);
      }
    }
  })

};



