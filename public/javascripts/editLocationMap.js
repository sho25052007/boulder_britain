mapboxgl.accessToken = mapBoxToken;
const coordinates = document.querySelector('input#geometryCoords');

const map = new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/mapbox/streets-v11', // style URL
center: place.geometry.coordinates, // starting position [lng, lat]
zoom: 14 // starting zoom
});

const marker = new mapboxgl.Marker({
    color: '#FF0000',
    draggable: true
})
.setLngLat(place.geometry.coordinates)
.addTo(map);

function onDragEnd() {
    const lngLat = marker.getLngLat()
    const data = [{
        lat:lngLat.lat,
        lng: lngLat.lng
    }]
    const dataGeoJSON = GeoJSON.parse(data, { Point: ["lat", "lng"] });
    coordinates.value = JSON.stringify(dataGeoJSON.features[0].geometry, null, 4);
    console.log(dataGeoJSON)
    // console.log(typeof coordinates.value)
}

marker.on('dragend', onDragEnd);

const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
});

map.addControl(geocoder);

map.on('load', () => {
    geocoder.on('result', (event) => {
    marker.setLngLat(event.result.geometry.coordinates).addTo(map);
    const lngLat = marker.getLngLat();
});
});