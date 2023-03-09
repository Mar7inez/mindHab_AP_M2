const readProducts = data.events;


const searchInput = document.getElementById('search');

searchInput.addEventListener('input', function () {
    const filteredData = filterItems(readProducts);
    cardsCreate(filteredData);
});


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


function changeCheckBox() {
    const checkboxes = document.querySelectorAll('input[type=checkbox]');
    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            const filteredData = filterItems(readProducts);
            cardsCreate(filteredData);
        });
    });
};


function checkBoxes() {
    addCheckBoxes(categories);
    changeCheckBox();
};


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


function actualYear() {
    const actualYear = new Date().getFullYear();
    document.getElementById("year").innerHTML = actualYear;
};


let cards = document.getElementById("cards");
function cardsDates(valor) {
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

function cardsCreate(filteredData) {
    let cards = document.getElementById("cards");
    cards.innerHTML = "";
    let noResults = document.getElementById("no-results");
    noResults.innerHTML = "";
    if (filteredData.length === 0) {
        noResults.innerHTML = "Evento no encontrado";
    } else {
        for (let valor of filteredData) {
            cardsDates(valor);
        };
    };
};


function main() {
    actualYear();
    checkBoxes();
    cardsCreate(readProducts);
};


main();
