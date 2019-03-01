//used to hide the keys in the .env file
require("dotenv").config();

var keys = require("./keys.js");

// var spotify = new spotify(keys.spotify);

var action = process.argv[2];

// if (action === "concert-this") {
//     concert();
// } else if (action === "spotify-this-song") {
//     spotify();
// } else if (action === "movie-this") {
//     movie();   
// } else if (action === "do-what-it-says") {
//     thatWay();
// };

//make it so liri.js can take in one of the following commands:
//concert-this.  node liri.js concert-this <artist/band name here>
    //search bands in town: show name of venue, location, date "MM/DD/YYYY"

    //grab axios package
    //run the get function 
    //error request
    var fs = require("fs");

    var axios = require("axios");

    var moment = require("moment");
    
    function concert() {
      var artist = process.argv.slice(3);
      artist = artist.join(' ');
      axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
        function(response) {
        //   console.log(response.data[1].venue.city);
          

          //display the top 10 events
          for(var i = 0; i < response.data.length; i++) {
            //   console.log(property)
            //   console.log(response.data[0]);
                console.log("---------------------------");
              console.log("Location: ", response.data[i].venue.city);
              console.log("Venue Name: ", response.data[i].venue.name);
              console.log("Date (MM/DD/YYYY): ", moment(response.data[i].datetime).format("MM DD YYYY"));
              console.log("---------------------------");
          }
        }, 
        function(error) {
          if (error.response) {
              console.error("error", error);
            } 
        },
    )};

      concert();

//spotify-this-song
    //artist, song name, preview link of song from spotify, album the song is from

    // function spotify(){}

//movie-this
    //Title, year, IMBD rating, rotten tomatoes rating, country produced, language,
    //plot, actors 
    //data for movie Mr. Nobody if nothing entered

    // function movie(){}

//do-what-it-says
    //spotify-this-song for I want it that way from random.txt

    // function thatWay() {}
