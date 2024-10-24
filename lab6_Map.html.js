// Function to create the map
function createMap() {
    // This sets the original view when you see the map
    var map = L.map('map').setView([37.09024, -95.712891], 5);

    // This is how the map will look like visually and how far you can zoom in/out, the default zoom is set to 5
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    return map;


}

// Function you provided to randomly generate a number
function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
}

// Function to create the map with coordinates and text generated
function mapWithCordinates(){
    const map = createMap();

    // when function is called it generates 3 random coordinates 3 times. Could technically make this in a loop too but copy and paste was super quick
    const coordinates = [
        {lat: getRandomInRange(30, 35, 3), long: getRandomInRange(-90, -100, 3)},
        {lat: getRandomInRange(30, 35, 3), long: getRandomInRange(-90, -100, 3)},
        {lat: getRandomInRange(30, 35, 3), long: getRandomInRange(-90, -100, 3)}
    ];

    // This is to generate the little markers on each of the maps
    coordinates.forEach((coord, index) => {
        const marker = L.marker([coord.lat, coord.long]).addTo(map);
    document.getElementById(`latAndLong${index + 1}`).textContent = `Marker 1: Latitude: ${coord.lat}, Longitude: ${coord.long}`;

    // This is to generate the dynamic text that pops up at the bottom of the page using the api 
    fetch('https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en')
        .then(res => res.json())
        .then(data => {
            const locality = data.locality;
            document.getElementById(`locality${index + 1}`).textContent = `Locality: ${locality}`;
        })

    })

}
// Calls the function when window loads in
window.onload = mapWithCordinates;