'use strict'


const PLACES_KEY = 'placesDB'
var gPlaces = []





function getPosition() {
    if (!navigator.geolocation) {
        alert("HTML5 Geolocation is not supported in your browser.");
        return;
    }
    // One shot position getting or continus watch
    navigator.geolocation.getCurrentPosition(showLocation, handleLocationError);
    // navigator.geolocation.watchPosition(showLocation, handleLocationError);
}


function showLocation(position) {
    console.log(position);
    initMap(position.coords.latitude, position.coords.longitude);
}


function handleLocationError(error) {
    var locationError = document.getElementById("locationError");

    switch (error.code) {
        case 0:
            locationError.innerHTML = "There was an error while retrieving your location: " + error.message;
            break;
        case 1:
            locationError.innerHTML = "The user didn't allow this page to retrieve a location.";
            break;
        case 2:
            locationError.innerHTML = "The browser was unable to determine your location: " + error.message;
            break;
        case 3:
            locationError.innerHTML = "The browser timed out before retrieving the location.";
            break;
    }
}


function initMap(lat, lng) {
    //            if (!lat) lat = 32.0749831;
    //            if (!lng) lat = 34.9120554;
    var elMap = document.querySelector('#map');
    var options = {
        center: { lat, lng },
        zoom: 15
    };

    var map = new google.maps.Map(
        elMap,
        options
    );

    // var marker = new google.maps.Marker({
    //     position: { lat, lng },
    //     map,
    //     title: 'Hello World!'
    // });

    map.addListener("click", (mapsMouseEvent) => {
        // Create a new InfoWindow.
        let chosenPos = new google.maps.InfoWindow({
            position: mapsMouseEvent.latLng,
        });
        chosenPos.setContent(
            JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
        );
        // infoWindow.open(map);
        let lat = chosenPos.position.lat();
        // console.log('lat:', lat)
        let lng = chosenPos.position.lng();
        // console.log('lng:', lng)
        $('.modal').show('slow')
        setPlace(lat, lng)
    });
}


function mapReady() {
    console.log('Map is ready');
}



function setPlace(lat, lng) {
    var date = new Date();
    date = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
    let newPlace = {
        id: makeId(),
        name: 'none',
        lat,
        lng,
        date
    }
    gPlaces.push(newPlace);
    console.log('gPlaces:', gPlaces)
}


function savePlacesToStorage() {
    saveToStorage(PLACES_KEY, gPlaces)
}


function getPlacesToShow() {
    return gPlaces.slice()
}


function removePlace(id) {
    var idx = gPlaces.findIndex(place => +place.id === id)
    gPlaces.splice(idx, 1)
    if (!gPlaces.length) createPlaces()
    console.log('idx:', idx)
    savePlacesToStorage();
}


function goTo(id) {
    var place = gPlaces.find(place => +place.id === id)
    initMap(place.lat, place.lng)
}


function getPlaces() {
    let places = loadFromStorage(PLACES_KEY)
    if (!places || !places.length) {
        createPlaces()
        return
    }
    gPlaces = places
}


function createPlaces() {
    gPlaces = [
        {
            id: makeId(),
            name: 'Jerusalim',
            lat: 31.776646,
            lng: 35.234522,
            date: '01.01.2021'
        },
        {
            id: makeId(),
            name: 'Eilat',
            lat: 29.549876,
            lng: 34.953250,
            date: '01.01.2021'
        },
        {
            id: makeId(),
            name: 'Tel Aviv',
            lat: 32.081423,
            lng: 34.767582,
            date: '01.01.2021'
        }
    ]
}