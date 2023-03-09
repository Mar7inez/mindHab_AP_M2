const searchInDos = document.getElementById('search');
searchInDos.addEventListener('input', function() {
    const filteredDataDos = filterUpcoming(readProducts);
    cardsEventsUpcoming(filteredDataDos, new Date(data.currentDate));
});

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


function checkBoxesUpcoming (){
    changeCheckBoxUpcoming();
};


function cardsEventsUpcoming(readProducts, currentDate) {
    cards.innerHTML = '';
    for (let event of readProducts) {
        let eventDate = new Date(event.date);
        if (eventDate >= currentDate) {
            cardsDates(event);
        };
    };
};


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


function upcomingEvents() {
    checkBoxesUpcoming ();
    const upcomingData = filterUpcoming(readProducts);
    cardsEventsUpcoming(upcomingData, new Date(data.currentDate));   
};


upcomingEvents();
