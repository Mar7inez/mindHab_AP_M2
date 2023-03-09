//Escucha el search, y busca las tarjetas de acuerdo al filtro;

const searchIn = document.getElementById('search');
searchIn.addEventListener('input', function() {
    const filteredData = filterPast(readProducts);
    cardsEventsPast(filteredData, new Date(data.currentDate));
});

// Detectar cambios en los checkboxes y llama las funciones filterPast() y cardsEventsPast();

const checkboxes = document.querySelectorAll('input[type=checkbox]');
function changeCheckBoxPast() {
    checkboxes.forEach(function(checkbox) {
        const isEvent = new Date(data.currentDate);
        checkbox.addEventListener('change', function() {
            const filteredData = filterPast(readProducts);
            cardsEventsPast(filteredData,isEvent);
        });
    });
};

//Une las dos funciones para crear checkbox y detectar los cambios;

function checkBoxesPast (){
    changeCheckBoxPast();
};

//Crea las tarjetas solo si son past events;

function cardsEventsPast(readProducts, currentDate) {
    cards.innerHTML = '';
    for (let event of readProducts) {
        let eventDate = new Date(event.date);
        if (eventDate < currentDate) {
            cardsDates(event);
        };
    };
};

// Filtrar los eventos según las categorías seleccionadas, solo sobre los past events;

function filterPast(readProducts) {
    const selectedCategories = Array.from(checkboxes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
    const keyword = searchIn.value.toLowerCase();
    const isEvent = new Date(data.currentDate);
    const filteredData = readProducts.filter(event => {
        const containsCategory = selectedCategories.length === 0 || selectedCategories.includes(event.category);
        const containsKeyword = keyword === '' || event.name.toLowerCase().includes(keyword) || event.description.toLowerCase().includes(keyword);
        const isPast = new Date(event.date) < isEvent;
        return containsCategory && containsKeyword && isPast;
    });
    return filteredData;
};

//Guardo todo lo necesario en una función principal;

function productsPast() {
    checkBoxesPast ();
    const pastData = filterPast(readProducts);
    cardsEventsPast(pastData, new Date(data.currentDate));
};

//Ejecuto la función;

productsPast();