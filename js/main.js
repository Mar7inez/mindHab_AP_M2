let urlApi = 'https://mindhub-xj03.onrender.com/api/amazing';
let checks = document.getElementById("checks");
let cards = document.getElementById("cards");

async function dataApi() {
    try {
        const response = await fetch(urlApi);
        const datos = await response.json();
        return datos;
    } catch (error) {
        console.error('Error:', error);
    }
};

export const data = await dataApi();
export const readProducts = data.events;

function main() {
    try {
        actualYear();
        checkBoxes();
        cardsCreate(readProducts);
    } catch (error) {
        console.log(error)
    }
};

export const searchInput = document.getElementById('search');
if (searchInput) {
    searchInput.addEventListener('input', function () {
        const filteredData = filterItems(readProducts);
        cardsCreate(filteredData);
    });
}

const categories = [...new Set(readProducts.map(events => events.category))];

function addCheckBoxes(categories) {
    for (let item of categories) {
        checks.innerHTML += ` <div class="form-check d-inline-flex mt-3 ms-3">
                                    <input class="form-check-input m-0 " type="checkbox" value="${item}" id="input-${item}" name="category">
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
    if (filteredData == 0) {
        noResults.innerHTML = "No se Encontró el evento!!";
    } else {
        noResults.innerHTML = '';
    }
    return filteredData;
};

export function cardsDates(valor) {
    cards.innerHTML += `<div class="col-sm-5 col-md-4 col-lg-4 col-xl-3">
                                <div class="card">
                                    <img src="${valor.image}" class="card-img-top m-4" alt="${valor.name}">
                                    <div class="card-body">
                                        <h5 class="card-title">${valor.name}</h5>
                                        <p class="card-text">${valor.description}</p>
                                    </div>
                                    <div class="card-footer d-inline-flex border-top-0">
                                        <p> Price:<span class="pe-2">${valor.price}.-</span></p>
                                        <a href="../pages/details.html?id=${valor._id}" class="btn btn-dark w-75 seeMore">See More</a>
                                    </div>  
                                </div>
                            </div>`;
};

export const noResults = document.getElementById("no-results");
function cardsCreate(filteredData) {
    let cards = document.getElementById("cards");
    cards.innerHTML = "";
    noResults.innerHTML = "";
    if (filteredData.length == 0) {
        noResults.innerHTML = "No se Encontró el evento!!";
    } else {
        for (let valor of filteredData) {
            cardsDates(valor);
        };
    };
};

function actualYear() {
    const actualYear = new Date().getFullYear();
    document.getElementById("year").innerHTML = actualYear;
};

main();
