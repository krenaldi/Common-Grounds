// var config = {
//   apiKey: "AIzaSyCd_w24x3LzqPkoUudKS9-H9OBfGUsgw4Y",
//   authDomain: "project-b4bbd.firebaseapp.com",
//   databaseURL: "https://project-b4bbd.firebaseio.com",
//   projectId: "project-b4bbd",
//   storageBucket: "",
//   messagingSenderId: "831254137538",
//   appId: "1:831254137538:web:615e408d0e3574da"
// };

// firebase.initializeApp(config);

// var database = fire.database();
  
var users = {
  // Where the users will be dumped from firebase.
    Angela: ["Angela", "New Brunswick, NJ", "LittleRascals"],

    Tom: ["Tom", "New York, NY"],

    Bob: ["Bob", "Bridgewater, NJ"]
    
}

var groups = {
  // Where the groups will be dumped from firebase.
    LittleRascals: ["Angela", "Tom", "Bob"]

}

var tempGroup = [];

var group = "";

var tempLocations = [];
// Where the Locations will be stored in format City, State.
var tempLat = [];
// Where the temporary Latitudes will be stored for each member
// of the group.


var tempLong = [];
// Where the temporary Longitudes will be stored for each member
// of the group.

var midLat = 0;
  // Where the Calculated Midpoint Latitude will be stored.
var midLong = 0;
  // Where the calculated Midpoint Longitude will be stored.

// Will allow for each user to read the stored data
// on firebase and use it to run the program.

// database.ref().on("value", function(snapshot) {

//    for ( var i = 0; i < users.length; i++) {

//      users = snapshot.val().users

//    }

//    for ( var i = 0; i < groups.length; i++) {

//     groups = snapshot.val().groups

//    }

//    midLat = snapshot.val().midPointLat

//    midLong = snapshot.val().midPointLong

// }, function(errorObject) {

//   console.log("The read failed: " + errorObject.code);

// });
// console.log(users)
// console.log(groups)

//   API LocationIQ
//   API YELP maybe

  function formGroup() {
    // something like groups.push(Names), with
    // lists or buttons of already created users
  }

  // change groups.LittleRascals to groups.group later and 
  // put acquireLocations(group) in parameter
  function acquireLocation(group) {

      for (i = 0; i < groups.LittleRascals.length; i++) {

        tempLocations.push(users[groups.LittleRascals[i]][1]);

    }  

  }

  acquireLocation()

  console.log(tempLocations);
  
  
  
  function calculateMidPoint() {
    setTimeout(function() {

      var sumLat = 0;
      var sumLong = 0;
      
      for (var i = 0; i < tempLat.length; i++) {
        
        sumLat = sumLat + parseFloat(tempLat[i]);
        
        sumLong = sumLong + parseFloat(tempLong[i]);
        
      midLat = sumLat / tempLat.length;

      midLong = sumLong / tempLong.length;
      
      } 
      
      console.log("midpoint Latitude");
      console.log(midLat);
      console.log("midpoint Longitude");
      console.log(midLong);

      var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://us1.locationiq.com/v1/reverse.php?key=965e216b522057&lat=" + midLat + "&lon=" + midLong + "&format=json",
        "method": "GET"
      }
      
      $.ajax(settings).done(function (response) {
        console.log(response);
        console.log(response.address.city)
        console.log(response.address.state)
        var place = $("<span style='float:right; padding: 0 10% 0 0'><h4>" + response.address.city + ", " + response.address.state + "</h4></span>");
        $("#search-form").append(place);
      }); 
      
      $("#googleMap").empty();

      var a = $("<img src='https://maps.locationiq.com/v2/staticmap?key=965e216b522057&center=" + midLat + "," + midLong +"&zoom=12&size=1190x400&format=<format>&maptype=<MapType>&markers=icon:large-blue-cutout|" + midLat + "," + midLong + "&markers=icon:<icon>|<latitude>,<longitude>'>")
  
      $("#googleMap").append(a);

    }, 1000);

    
  }

  ;

  function runYelpApi() {
    //   use yelp api (or other one) with calculated midpoint geolocation
    //  or location as starting point and display map
  }

//   function updateLocation() {
//     // Update firebase location for current user run acquireLocation()
//   }

function searchArea() {
    // grab from search bar the val of the text and use as the q or corresponding API tags (search parameters), 
    // and use geolocated midpoint as start point
}

// will build the LocationIQ ajax GET when needed
function buildQueryUrl_Loc() {

  var settings = []
  
  function myLoop (i) {          
    setTimeout(function () {   

    var located = tempLocations[i-1]

    var mykey = "965e216b522057"
    
    var queryURL = "https://us1.locationiq.com/v1/search.php?key=" 
    + mykey + "&q=" + located + "&format=json";
    
    var setting = {
      "async": true,
      "crossDomain": true,
      "url": queryURL,
      "method": "GET" 
    }
    settings.push(setting)
    
    if (settings.length === 1) {
      
      $.ajax(settings[0]).then(function (response) {
        
        console.log("1st Geo Location");
        console.log(response[0].lat);
        console.log(response[0].lon);
          
        tempLat.push(response[0].lat);
          
        tempLong.push(response[0].lon);
          
      }); 
    
    }

    if (settings.length === 2) {
      
      $.ajax(settings[1]).then(function (response) {
            
        console.log("2nd Geo Location");
        console.log(response[0].lat);
        console.log(response[0].lon);
            
        tempLat.push(response[0].lat);
        
        tempLong.push(response[0].lon);
        
      }); 
    
    }
          
    if (settings.length === 3) {
        
      $.ajax(settings[2]).then(function (response) {
         
        console.log("3rd Geo Location");
        console.log(response[0].lat);
        console.log(response[0].lon);
            
        tempLat.push(response[0].lat);
        
        tempLong.push(response[0].lon);
              
              
      }); 
              
    }
    
    if (settings.length === 4) {
         
      $.ajax(settings[3]).then(function (response) {
              
        console.log("4th Geo Location");
        console.log(response[0].lat);
        console.log(response[0].lon);
                
        tempLat.push(response[0].lat);
                
        tempLong.push(response[0].lon);
                
      }); 
                
    }
    
    if (settings.length === 5) {
             
      $.ajax(settings[4]).then(function (response) {
                
        console.log("5th Geo Location");
        console.log(response[0].lat);
        console.log(response[0].lon);
        
        tempLat.push(response[0].lat);
        
        tempLong.push(response[0].lon);
                  
      }); 
                  
    }
    
    if (--i) myLoop(i);      
    if (settings.length === tempLocations.length) {

      calculateMidPoint();
    
    }
    }, 1000)
    
  };
  
myLoop(tempLocations.length)


}

buildQueryUrl_Loc();

console.log(tempLat);
console.log(tempLong);


// will build the YELP ajax GET when needed with geomidpoint as start
// and the value of the search input as the search?term="what your searching here"
          
function buildQueryUrl_Yelp() {
          
        
}