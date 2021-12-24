mapboxgl.accessToken = mapBoxToken;
const map = new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/mapbox/streets-v10', // style URL
center: place.geometry.coordinates, // starting position [lng, lat]
zoom: 14 // starting zoom
});

new mapboxgl.Marker()
.setLngLat(place.geometry.coordinates)
.setPopup(
    new mapboxgl.Popup({ offset: 25 })
    .setHTML(
        `<h5>${place.place}, ${place.area}</h5>`
    )
)
.addTo(map);