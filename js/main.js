'use strict'

$(init)


function init() {
    console.log('starting');
    setHomePage()
    getPlaces()
    renderPlaces()
}


function onSetPlace(ev) {
    ev.preventDefault();
    let name = $('[name="new-place"]').val()
    let currPlace = gPlaces[gPlaces.length - 1]
    currPlace.name = name
    $('.modal').hide('slow')
    savePlacesToStorage()
    renderPlaces()
}

function onCancel(ev) {
    ev.preventDefault()
    $('.modal').hide('slow')
}

function renderPlaces() {
    let places = getPlacesToShow();
    $('.places-to-render').html(places.map(place => {
        return `<tr>
            <td>${place.name}</td>
            <td>${place.date}</td>
            <td>
                <button onclick="onGoTo(${place.id})" class="btn btn-success read">Go!</button>
            </td>
            <td>
                <button onclick="onRemovePlace(${place.id})" class="delete btn btn-danger read">❌</button>
            </td>
        </tr>`
    }))
}


function onRemovePlace(id) {
    removePlace(id);
    renderPlaces()
}

function onGoTo(id) {
    goTo(id)
}