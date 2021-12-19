mapboxgl.accessToken = mapBoxToken;
const map = new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/mapbox/streets-v11', // style URL
center: place.geometry.coordinates, // starting position [lng, lat]
zoom: 14 // starting zoom
});

new mapboxgl.Marker()
.setLngLat(place.geometry.coordinates)
.addTo(map);