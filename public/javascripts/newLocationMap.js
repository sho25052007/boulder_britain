mapboxgl.accessToken = mapBoxToken;
const coordinates = document.querySelector('input#geometryCoords');
// const coordinates = document.getElementById('coordinates');
// let lngLat = [0,0]
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [-0.140634, 51.501476], // starting position [lng, lat]
    zoom: 13 // starting zoom
});

const marker = new mapboxgl.Marker({
    color: '#FF0000',
    draggable: true
})
.setLngLat([-0.140634, 51.501476])
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
    // map.addSource('single-point', {
    // 'type': 'geojson',
    // 'data': {
    // 'type': 'FeatureCollection',
    // 'features': []
    // }
    // });

    // map.addLayer({
    // 'id': 'point',
    // 'source': 'single-point',
    // 'type': 'circle',
    // 'paint': {
    // 'circle-radius': 10,
    // 'circle-color': '#448ee4'
    // }
    // });

    geocoder.on('result', (event) => {
    // map.getSource('single-point').setData(event.result.geometry);
    // console.log(event.result.geometry);
    marker.setLngLat(event.result.geometry.coordinates).addTo(map);
    const lngLat = marker.getLngLat();
    // console.log(`Longitude: ${lngLat.lng}, Latitude: ${lngLat.lat}`);
});
});

// function parser() {
//     coordinates.value = JSON.parse(coordinates.value)
// }
