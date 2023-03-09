const searchIn = document.getElementById('search');
searchIn.addEventListener('input', function() {
    const filteredData = filterPast(readProducts);
    cardsEventsPast(filteredData, new Date(data.currentDate));
});

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

function checkBoxesPast (){
    changeCheckBoxPast();
};


function cardsEventsPast(readProducts, currentDate) {
    cards.innerHTML = '';
    for (let event of readProducts) {
        let eventDate = new Date(event.date);
        if (eventDate < currentDate) {
            cardsDates(event);
        };
    };
};

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

function productsPast() {
    checkBoxesPast ();
    const pastData = filterPast(readProducts);
    cardsEventsPast(pastData, new Date(data.currentDate));
};


productsPast();