/**
 * 
 */
var geocoder = new google.maps.Geocoder();
var map;
var infowindow = new google.maps.InfoWindow();
var marker;

var $ = function(id)
{
	return document.getElementById(id)
}

function initialize() 
{
  // added code to get position
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        $("demo").innerHTML = "Geolocation is not supported by this browser.";
    }
}

// Method added from previous Google get lat/long example. 
// Mapping appears to be contingent on getting a single lat/long
// string - apparently and preferably from an input field which 
// can be read by Java as well.
function showPosition(position) {
	$("latlng").value = position.coords.latitude + "," 
	+ position.coords.longitude;
	
	// add the mapping function down in this method rather than in the 
	// initialize() method shown in the reverse geolocation example
	// 
	map = new google.maps.Map(document.getElementById('map-canvas'), {
        zoom: 8,
        center: {lat: position.coords.latitude, lng: position.coords.longitude}
      });
}

// this is the method called by the Pinpoint button when clicked 
// that takes the lat/long data and converts to an address
function codeLatLng() {
  var input = document.getElementById('latlng').value;
  var latlngStr = input.split(',', 2);
  var latlng = new google.maps.LatLng(latlngStr[0], latlngStr[1]);
  geocoder.geocode({'location': latlng}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        map.setZoom(11);
        marker = new google.maps.Marker({
          position: latlng,
          map: map
        });
        infowindow.setContent(results[0].address_components[0].long_name + " " + 
        		results[0].address_components[1].long_name + "<br>" +
        		results[0].address_components[2].long_name + ", " +
        		results[0].address_components[5].short_name + " " +
        		results[0].address_components[7].long_name + "<br>" + 
        		results[0].address_components[6].long_name);
        infowindow.open(map, marker);
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
}

google.maps.event.addDomListener(window, 'load', initialize);