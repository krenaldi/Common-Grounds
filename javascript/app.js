var users = {

  // Where the users will be dumped from firebase.
  Angela: ["Angela", "New Brunswick, NJ", "LittleRascals"],

  Tom: ["Tom", "New York, NY"],

  Bob: ["Bob", "Bridgewater, NJ"]

}

var usersArray = []

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
db.ref().on("value", function(snapshot) {

  users = snapshot.val().users

  for (var i in users) {

    usersArray.push(users[i])
    
  }
  acquireLocation()
    
  buildQueryUrl_Loc();
  
  $("#dynamic-chat").empty();
  
  for (var i = 0; usersArray.length; i++) {
    
    var name = $("<div id='chat-userName'>" + usersArray[i].displayname + "</div>");

    $("#dynamic-chat").append(name);
    
  }
}, function(errorObject) {

  console.log("The read failed: " + errorObject.code);

});

function acquireLocation(group) {
  
  for (var i = 0; i < usersArray.length; i++) {
    
    var location = usersArray[i].city  + " " + usersArray[i].state
    
    tempLocations.push(location);
    
  }  

}

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
    
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://us1.locationiq.com/v1/reverse.php?key=965e216b522057&lat=" + midLat + "&lon=" + midLong + "&format=json",
      "method": "GET"
    }
      
    $.ajax(settings).done(function (response) {
      
      var place = $("<span style='float:right; padding: 0 10% 0 0'><h4>" + response.address.city + ", " + response.address.state + "</h4></span>");
      
      $("#search-form").append(place);
      
    }); 
    
    $("#googleMap").empty();
    
    var a = $("<img src='https://maps.locationiq.com/v2/staticmap?key=965e216b522057&center=" + midLat + "," + midLong +"&zoom=12&size=1190x400&format=<format>&maptype=<MapType>&markers=icon:large-blue-cutout|" + midLat + "," + midLong + "&markers=icon:<icon>|<latitude>,<longitude>' class='img-fluid' style='max-height: 400px; min-height:400px'>")
    
    $("#googleMap").append(a);
    
    var b = $("<h2>").text("Nearby Restaurants")
    
    $(".search-result").prepend(b)
    
    $("search-result").prepend($("<hr>"))
    
    var zomato = {
      "async": true,
      "crossDomain": true,
      "url": "https://developers.zomato.com/api/v2.1/geocode?&lat="+ midLat +"&lon="+ midLong +"&apikey=d7db74dd4486cb039f810541d694f67d&count=5&format=json",
      "method": "GET"
    }
      
    $.ajax(zomato).done(function(salty){

      var results = salty.nearby_restaurants
        
      for (var i=0; i<results.length;i++){
        
        var resDiv = $("<div class='res'>")
        
        var resName = results[i].restaurant.name
        
        var resCur = results[i].restaurant.currency
        
        var rate = results[i].restaurant.user_rating.aggregate_rating
        
        var adr = results[i].restaurant.location.address
        
        var type = results[i].restaurant.cuisines
        
        var head = $("<h5>").text(resName)
        
        var head2 = $("<p>").text(" Price: " + resCur + " , "+  " Rating: " + rate + "/5")
        
        var p = $("<p>").text(" Address: " + adr)
        
        var p1 = $("<p>").text(" Cuisine Type: " + type)
        
        resDiv.append(head);
        
        resDiv.append(head2);
        
        resDiv.append(p);
        
        resDiv.append(p1);
        
        resDiv.append("<hr>");
        
        $(".place-results").append(resDiv);
        
      }
      
    });
    
    $("#searched").on("click", function(event) {
      
      event.preventDefault();
      
      var searched = $("#input-search").val().trim();

      var zomato2 = {
        "async": true,
        "crossDomain": true,
        "url": "https://developers.zomato.com/api/v2.1/search?q=" + searched + "&apikey=d7db74dd4486cb039f810541d694f67d&count=9&lat=" + midLat + "&lon=" + midLong + "&radius=30000",
        "method": "GET"
      }
    
      $.ajax(zomato2).done(function(resalt){
        
        var results = resalt.restaurants

        $(".res").empty();
          
        for (var i=0; i<results.length;i++){
          
          var resDiv = $("<div class='res'>")
          
          var resName = results[i].restaurant.name
          
          var resCur = results[i].restaurant.currency
          
          var rate = results[i].restaurant.user_rating.aggregate_rating
          
          var adr = results[i].restaurant.location.address
          
          var type = results[i].restaurant.cuisines
          
          var head = $("<h5>").text(resName)
          
          var head2 = $("<p>").text(" Price: " + resCur + " , "+  " Rating: " + rate + "/5")
          
          var p = $("<p>").text(" Address: " + adr)
          
          var p1 = $("<p>").text(" Cuisine Type: " + type)

          resDiv.append(head);
            
          resDiv.append(head2);

          resDiv.append(p);

          resDiv.append(p1);

          resDiv.append("<hr>");
          
          $(".place-results").append(resDiv);
          
        }
        
      });

    });

  }, 1000);

};

// builds the LocationIQ ajax GET when needed
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

          tempLat.push(response[0].lat);

          tempLong.push(response[0].lon);
    
        }); 
      
      }
          
      if (settings.length === 2) {
          
        $.ajax(settings[1]).then(function (response) {
          
          tempLat.push(response[0].lat);
    
          tempLong.push(response[0].lon);

        }); 
      
      }
            
      if (settings.length === 3) {
        
        $.ajax(settings[2]).then(function (response) {
        
          tempLat.push(response[0].lat);
    
          tempLong.push(response[0].lon);
          
        }); 
        
      }
            
      if (settings.length === 4) {
        
        $.ajax(settings[3]).then(function (response) {
              
          tempLat.push(response[0].lat);
              
          tempLong.push(response[0].lon);
              
        }); 
        
      }
         
      if (settings.length === 5) {
                
        $.ajax(settings[4]).then(function (response) {
                
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