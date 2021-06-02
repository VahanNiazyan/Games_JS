const buttonCount = 5;
const buttonRow = document.querySelector('.buttonParent');
let arrNumber = [0, 0, 0, 0, 0]

// Create a anum button-ner
function createButton() {
    for (let i = 0; i < buttonCount; i++) {
        let parentDiv = document.createElement("div");
        const numberButton = document.createElement("button");
        numberButton.setAttribute('class', 'm-1 btn btn-primary number');
        numberButton.innerHTML = arrNumber[i];
        const plusButton = document.createElement("button");
        plusButton.setAttribute('class', 'btn btn-primary plus');
        plusButton.innerHTML = '+'
        const minusButton = document.createElement("button");
        minusButton.setAttribute('class', 'm-1 btn btn-secondary minus');
        minusButton.innerHTML = '-';
        minusButton.disabled = true;
        const deleteButton = document.createElement("button");
        deleteButton.setAttribute('class', 'btn btn-danger delete');
        const iconDelete = document.createElement('i');
        iconDelete.setAttribute('class', "fa fa-trash");
        deleteButton.append(iconDelete);
        parentDiv.append(numberButton, plusButton, minusButton, deleteButton);
        buttonRow.append(parentDiv);
    }
}
createButton();

let showNumber = document.querySelectorAll('.number');
let plusNumber = document.querySelectorAll('.plus');
let minusNumber = document.querySelectorAll('.minus');
let deleteNumber = document.querySelectorAll('.delete');
const items = document.querySelector('.items');
items.innerHTML = 0;
let deleteCount = 0;
let itemsCount = 0;

cardFunc();

function increaseDecrease(plus, minus, ind) {
    let minusButton = minusNumber[ind];
    if (plus) {
        arrNumber[ind]++;
        minusButton.disabled = false;
        if (arrNumber[ind] == 1) {
            itemsCount++;
        }
    } else if (minus) {
        arrNumber[ind]--;
        if (arrNumber[ind] == 0) {
            minusButton.disabled = true;
            itemsCount--;
        }
    }
    showNumber[ind].innerHTML = arrNumber[ind];
    items.innerHTML = itemsCount;
}

function cardFunc() {

    // Plusi hamar
    plusNumber.forEach(function (elm, index) {
        elm.addEventListener('click', function () { increaseDecrease(true, null, index); });
    });
    // Minusi hamar
    minusNumber.forEach(function (elm, index) {
        elm.addEventListener('click', function () { increaseDecrease(null, true, index) });
    });

    // Deleti hamar
    deleteNumber.forEach((elm) => {
        elm.addEventListener('click', function () {

            let elmItem = elm.parentElement.childNodes[0];
            if (elmItem.textContent != 0) {
                itemsCount--
                items.innerHTML = itemsCount;
            }
            deleteCount++;
            elm.parentElement.remove();
            if (deleteCount == buttonCount) {
                restore.disabled = false;
                deleteCount = 0;
            }
        });
    });
}

const refresh = document.querySelector('.refresh');
// Refreshi hamar
refresh.addEventListener('click', function () {
    arrNumber = [0, 0, 0, 0, 0];
    itemsCount = 0;
    items.innerHTML = itemsCount;

    showNumber.forEach(function (elm, ind) {
        elm.innerHTML = arrNumber[ind];
    });
    minusNumber.forEach(elm => {
        elm.disabled = true;
    });
});

const restore = document.querySelector('.restore');
restore.disabled = true;
// Restore hamar
restore.addEventListener('click', function () {

    buttonRow.innerHTML = "";
    arrNumber = [0, 0, 0, 0, 0];
    showNumber.forEach(function (elm, ind) {
        elm.innerHTML = arrNumber[ind];
    });
    createButton();
    restore.disabled = true;

    showNumber = document.querySelectorAll('.number');
    plusNumber = document.querySelectorAll('.plus');
    minusNumber = document.querySelectorAll('.minus');
    deleteNumber = document.querySelectorAll('.delete');
    cardFunc();
});