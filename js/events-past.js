import { readProducts, data, cardsDates, noResults } from "./main.js";

const searchInputIn = document.getElementById("searchP");

if (searchInputIn) {
    searchInputIn.addEventListener('input', function () {
        const filteredData = filterPast(readProducts);
        cardsEventsPast(filteredData, new Date(data.currentDate));
    });

}

const checkboxes = document.querySelectorAll('input[type=checkbox]');
function changeCheckBoxPast() {
    checkboxes.forEach(function (checkbox) {
        const isEvent = new Date(data.currentDate);
        checkbox.addEventListener('change', function () {
            const filteredData = filterPast(readProducts);
            cardsEventsPast(filteredData, isEvent);
        });
    });
};

function checkBoxesPast() {
    changeCheckBoxPast();
};

function cardsEventsPast(readProducts, currentDate) {
    cards.innerHTML = '';
    for (let event of readProducts) {
        let eventDate = new Date(event.date);
        if (eventDate < currentDate) {
            cardsDates(event);
        }
    };
};

function filterPast(readProducts) {
    const selectedCategories = Array.from(checkboxes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
    const keyword = searchInputIn.value.toLowerCase();
    const isEvent = new Date(data.currentDate);
    const filteredData = readProducts.filter(event => {
        const containsCategory = selectedCategories.length === 0 || selectedCategories.includes(event.category);
        const containsKeyword = keyword === '' || event.name.toLowerCase().includes(keyword) || event.description.toLowerCase().includes(keyword);
        const isPast = new Date(event.date) < isEvent;
        return containsCategory && containsKeyword && isPast;
    });
    if (filteredData == 0) {
        noResults.innerHTML = "No se Encontró el evento!!";
    } else {
        noResults.innerHTML = '';
    }
    return filteredData;
};

function productsPast() {
    checkBoxesPast();
    const pastData = filterPast(readProducts);
    cardsEventsPast(pastData, new Date(data.currentDate));
};

productsPast();