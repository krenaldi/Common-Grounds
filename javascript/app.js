

  var users = {
      Angela: ["Angela", "New Brunswick, NJ"],
      Tom: ["Tom", "Brooklyn, NY"],
      Bob: ["Bob", "Bridgewater, NJ"]
  }

  var groups = {
      LittleRascals: ["Angela", "Tom", "Bob"]
  }

  var tempGeoLocations = []

//   API LocationIQ
//   API YELP maybe

  function formGroup() {
    // something like groups.push(Names), with
    // lists or buttons of already created users
  }

  function acquireLocation() {
    //   for (i = 0; i < somethig.length; i++) {
    //      grabs people in groups locations, 
    // }
  }

  function convertLocations() {
    //   using LocationIQ API, convert locations to geolocations,
    // push to tempGeoLocations
  }

  function calculateMidPoint() {
    //   take temp locations and separate at comma if needed, and 
    // add respective locations togethers, and divided each 
    // by group.name.length
    // reformat if needed, 00.00000, -00.00000 
    // use Geolocation to obtain location if needed and dynamically
    // update to firebase 
  }

  function runYelpApi() {
    //   use yelp api (or otherone) with calculated midpoint geolocation
    //  or location as starting point and display map
  }

//   function updateLocation() {
//     // Update firebase location for current user run acquireLocation()
//   }

function searchArea() {
    // grab from search bar the val of the text and use as the q or corresponding API tags (search parameters), 
    // and use geolocated midpoint as start point
}





  