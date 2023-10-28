
  mapboxgl.accessToken = mapToken;
  
  const map = new mapboxgl.Map({
    container: 'map', // container ID
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: coordinates, // starting position [lng, lat]
    zoom: 9 // starting zoom
  });

console.log(coordinates);

  // Create a default Marker and add it to the map.
const marker = new mapboxgl.Marker({ color: 'red'})
.setLngLat(coordinates)  //Listing.geometry.coodinates
.setPopup(
  new mapboxgl.Popup({offset: 25})
.setHTML(`<h4>${locations}</h4><p>Exect Location provided after booking</p>`)
.setMaxWidth("300px")
)
.addTo(map);