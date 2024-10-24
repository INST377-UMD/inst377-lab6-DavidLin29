function createMap() {
    var map = L.map('map').setView([37.09024, -95.712891], 5);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    return map;


}


function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
}

function mapWithCordinates(){
    const map = createMap();
    const coordinates = [
        {lat: getRandomInRange(30, 35, 3), long: getRandomInRange(-90, -100, 3)},
        {lat: getRandomInRange(30, 35, 3), long: getRandomInRange(-90, -100, 3)},
        {lat: getRandomInRange(30, 35, 3), long: getRandomInRange(-90, -100, 3)}
    ];

    coordinates.forEach((coord, index) => {
        const marker = L.marker([coord.lat, coord.long]).addTo(map);
    document.getElementById(`latAndLong${index + 1}`).textContent = `Marker 1: Latitude: ${coord.lat}, Longitude: ${coord.long}`;

    fetch('https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en')
        .then(res => res.json())
        .then(data => {
            const locality = data.locality;
            document.getElementById(`locality${index + 1}`).textContent = `Locality: ${locality}`;
        })

    })

}

window.onload = mapWithCordinates;