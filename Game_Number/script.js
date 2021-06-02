const arrSecond = [0.5, 1, 1.5]
const parentSecond = document.querySelector('.second');

// Create button
for (let i = 0; i < arrSecond.length; i++) {
    let buttonSecond = document.createElement("button");
    buttonSecond.setAttribute('class', 'btn btn-warning mx-1');
    buttonSecond.setAttribute('data-second', arrSecond[i]);
    buttonSecond.innerHTML = `${arrSecond[i]} second`;
    parentSecond.append(buttonSecond);
}

// Random number
function randomInter(a, b) {
    let delta = b - a;
    let randomNum = delta * Math.random();
    return Math.floor(a + randomNum);
}

const buttonTime = document.querySelectorAll('.btn-warning');
const buttonDificulty = document.querySelectorAll('.btn-secondary');
const start = document.querySelector('.start');
let second = null; dificultData = null;
let fiveRandomNumber = [];
let startBool = true;

// Click Time button
buttonTime.forEach(element => {
    element.addEventListener('click', function () {

        buttonTime.forEach(elm => {
            elm.setAttribute('id', '')
        });
        element.setAttribute('id', 'btn-time');
        second = element.getAttribute('data-second');
    })
});

// Click Dificulty button
buttonDificulty.forEach(element => {
    element.addEventListener('click', function (event) {
       
        fiveRandomNumber = [];
        buttonDificulty.forEach(elm => {
            elm.setAttribute('id', '')
        });
        element.setAttribute('id', 'btn-dificulty');

        dificultData = element.getAttribute('data-dificulty');
        let singleDigit = 0;
        let twoDigits = 0;
        
        if (dificultData == "ease") {
            singleDigit = 5;
        } else if (dificultData == "medium") {
            singleDigit = 3; twoDigits = 2;
        } else { 
            twoDigits = 5;
         }

        for (let i = 0; i < singleDigit; i++) {
            fiveRandomNumber.push(randomInter(1, 10));
        }
        for (let i = 0; i < twoDigits; i++) {
            fiveRandomNumber.push(randomInter(10, 100));
        }
       shuffle(fiveRandomNumber);
    });
});

let randomNumberSum = 0;
const inputGroup = document.querySelector('.input-group');
const numberInput = document.querySelector('.numberInput');
const add = document.querySelector('.add');
const displaySecond = document.querySelector('.displaySecond');

// Start interval
start.addEventListener('click', function () {
    if (startBool) {
        randomNumberSum = 0
        let i = 0;
        let timer = setInterval(function () {
            displaySecond.classList.add('fade');
            if (i > 4) {
                displaySecond.innerHTML = "";
                inputGroup.style = "display: flex!important;opacity:1";
                console.log(randomNumberSum);
                clearInterval(timer);
                return;
            }

            setTimeout(function(){
                randomNumberSum += fiveRandomNumber[i];
                displaySecond.innerHTML = fiveRandomNumber[i];
                displaySecond.classList.remove('fade');
                i++;
            }, 400)
        }, 1000 * second);

    }
    startBool = false;
})
const buttAgain = document.querySelector('.start-again');
const h2 = document.querySelector('h2');

// Inputi chisht ev sxal@
add.addEventListener('click', function () {
    if (randomNumberSum == numberInput.value) {
        h2.innerHTML = "True";
    } else {
        h2.innerHTML = "False";
    }
    buttAgain.style = "display: block!important";
})

// Start again
buttAgain.addEventListener('click', function () {
    displaySecond.innerHTML = "";
    h2.innerHTML = "";
    inputGroup.style = "display: none";
    startBool = true;
    numberInput.value = "";
    buttAgain.style = "display: none!important;";
})

// Shuffle
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}