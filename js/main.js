//Toma los eventos de data;

const readProducts = data.events;

//Escucha el search, y busca las tarjetas de acuerdo al filtro;

const searchInput = document.getElementById('search');

searchInput.addEventListener('input', function() {
    const filteredData = filterItems(readProducts);
    cardsCreate(filteredData);
});

//Crea un checkbox por cada category de los events;

let checks = document.getElementById("checks");
const categories = [...new Set(readProducts.map(events => events.category))];

function addCheckBoxes(categories) {
    for (let item of categories) {
        checks.innerHTML += ` <div class="form-check d-inline-flex mt-3 ms-3">
                                    <input class="form-check-input m-0 " type="checkbox" value="${item}" id="input${item}" name="category">
                                    <label class="form-check-label ps-2 pe-4 sm-ps-0 sm-pe-0" for="input${item}">
                                        ${item}
                                    </label>
                                </div>`;
    };
};

// Detectar cambios en los checkboxes y llama las funciones filterItems() y cardsCreate();

function changeCheckBox(){
    const checkboxes = document.querySelectorAll('input[type=checkbox]');
    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            const filteredData = filterItems(readProducts);
            cardsCreate(filteredData);
        });
    });
};

//Une las dos funciones para crear checkbox y detectar los cambios;

function checkBoxes (){
    addCheckBoxes(categories);
    changeCheckBox();
};

// Filtrar los eventos según las categorías seleccionadas;

function filterItems(readProducts) {
    const checkboxes = document.querySelectorAll('input[type=checkbox]');
    const selectedCategories = Array.from(checkboxes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
    const keyword = searchInput.value.toLowerCase();
    const filteredData = readProducts.filter(events => {
        const containsCategory = selectedCategories.length === 0 || selectedCategories.includes(events.category);
        const containsKeyword = keyword === '' || events.name.toLowerCase().includes(keyword) || events.description.toLowerCase().includes(keyword);
        return containsCategory && containsKeyword;
    });
    return filteredData;
};

//funcion actualYear de footer;

function actualYear(){
    const actualYear = new Date().getFullYear();
    document.getElementById("year").innerHTML = actualYear;
};

//Crea la tarjeta;

let cards = document.getElementById("cards");
function cardsDates(valor){
        cards.innerHTML += `<div class="col-sm-5 col-md-4 col-lg-4 col-xl-3">
                                <div class="card">
                                    <img src="${valor.image}" class="card-img-top m-4" alt="${valor.name}">
                                    <div class="card-body">
                                        <h5 class="card-title">${valor.name}</h5>
                                        <p class="card-text">${valor.description}</p>
                                    </div>
                                    <div class="card-footer d-inline-flex border-top-0">
                                        <p> Price:<span class="pe-2">${valor.price}.-</span></p>
                                        <a href="../pages/details.html?id=${valor.id}" class="btn btn-dark w-75 seeMore">See More</a>
                                    </div>  
                                </div>
                            </div>`;
};

//Crea tarjeta por cada elemento en filterdata, si este se encuentra vacío deja mensaje de error;

function cardsCreate(filteredData){
    let cards = document.getElementById("cards");
    cards.innerHTML = "";
    let noResults = document.getElementById("no-results");
    noResults.innerHTML = "";
    if (filteredData.length === 0) {
        noResults.innerHTML="Evento no encontrado";
    } else {
        for(let valor of filteredData){
            cardsDates(valor);
        };
    };
};

//Guardo todo lo necesario en una función principal;

function main(){
    actualYear();
    checkBoxes ();
    cardsCreate(readProducts);
};

//Ejecuto la función;

main();
