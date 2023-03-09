
//Escucha el search, y busca las tarjetas de acuerdo al filtro;

const searchInDos = document.getElementById('search');
searchInDos.addEventListener('input', function() {
    const filteredDataDos = filterUpcoming(readProducts);
    cardsEventsUpcoming(filteredDataDos, new Date(data.currentDate));
});

// Detectar cambios en los checkboxes y llama las funciones filterUpcoming() y cardsEventsUpcoming();

const checkboxes = document.querySelectorAll('input[type=checkbox]');
function changeCheckBoxUpcoming() {
    checkboxes.forEach(function(checkbox) {
        const isEvent = new Date(data.currentDate);
        checkbox.addEventListener('change', function() {
            const filteredData = filterUpcoming(readProducts);
            cardsEventsUpcoming(filteredData,isEvent);
        });
    });
};

//Une las dos funciones para crear checkbox y detectar los cambios;

function checkBoxesUpcoming (){
    changeCheckBoxUpcoming();
};

//Crea las tarjetas solo si son upcoming;

function cardsEventsUpcoming(readProducts, currentDate) {
    cards.innerHTML = '';
    for (let event of readProducts) {
        let eventDate = new Date(event.date);
        if (eventDate >= currentDate) {
            cardsDates(event);
        };
    };
};

// Filtrar los eventos según las categorías seleccionadas, solo sobre los upcoming events;

function filterUpcoming(readProducts) {
    const selectedCategories = Array.from(checkboxes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
    const keyword = searchInDos.value.toLowerCase();
    const isEvent = new Date(data.currentDate);
    const filteredData = readProducts.filter(event => {
        const containsCategory = selectedCategories.length === 0 || selectedCategories.includes(event.category);
        const containsKeyword = keyword === '' || event.name.toLowerCase().includes(keyword) || event.description.toLowerCase().includes(keyword);
        const isUpcoming = new Date(event.date) >= isEvent;
        return containsCategory && containsKeyword && isUpcoming;
    });
    return filteredData;
};

//Guardo todo lo necesario en una función principal;

function upcomingEvents() {
    checkBoxesUpcoming ();
    const upcomingData = filterUpcoming(readProducts);
    cardsEventsUpcoming(upcomingData, new Date(data.currentDate));   
};

//Ejecuto la función;

upcomingEvents();
