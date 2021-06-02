let arr = [
    'images/two.png',
    'images/three.png',
    'images/four.png',
    'images/five.png',
    'images/six.jpg',
    'images/seven.png',
    'images/eight.png',
    'images/nine.png',
    'images/ten.png',
    'images/jack.png',
    'images/ten.png',
    'images/jack.png',
    'images/dama.jpg',
    'images/karol.jpg',
    'images/tuz.png',

    'images/ten.png',
    'images/jack.png',
    'images/dama.jpg',
    'images/karol.jpg',
]

const gamesParentDiv = document.querySelector('.games-div');
const buttons = document.querySelectorAll('.size-button');

// Vercnum enq data-size attributi tver@
function numberConvert(str) {
    return str[0] * str[2]
}

// Nkarner enq stextsum 
function createImages(imgCount, srcImages) {
    for (let i = 0; i < imgCount; i++) {
        const images = document.createElement('img');
        images.setAttribute("id", 'remove-images');
        images.setAttribute('src', 'images/joker.jpg');
        images.setAttribute("data_imag_name", srcImages[i])
        gamesParentDiv.append(images);
    }
}

// Shuffle
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

//   Attributner aveleacnelu funkcia
function imagesSrcAdd(arrGroup, imgCount) {
    let arrFour1 = arrGroup.slice(0, imgCount);
    let arrMain = arrFour1.concat(arrFour1);
    return arrMain;
}

let games = null;
let preventTarget = null;
let timeOutTime = false;
let startArr;
let imagesLength = null;
let initialButton = null;

buttons.forEach(element => {
    element.addEventListener('click', imagesFunction)
})

function imagesFunction(event, thisButton) {
    preventTarget = null;
    let arrShuffle = shuffle(arr)

    // Buttoni clicki hamar 
    let buttonSize = document.querySelectorAll('.size-button');
    buttonSize.forEach(elm => {
        elm.setAttribute('id', '')
    });

    if (event) {
        event.target.setAttribute('id', 'btn-main');
    } else {
        thisButton.setAttribute('id', 'btn-main');
    }

    // Nkarnern enq remove anum 
    let imagesRemove = document.querySelectorAll('#remove-images');

    for (let i = 0; i < imagesRemove.length; i++) {
        imagesRemove[i].remove();
    }

    let eventDataSize
    if (event) {
        eventDataSize = event.target.getAttribute('data-size');
        initialButton = event.target;
    } else {
        eventDataSize = thisButton.getAttribute('data-size');
        initialButton = thisButton;
    }

    let grid = eventDataSize[0];
    let imgConvertCount = numberConvert(eventDataSize);
    gamesParentDiv.style = "grid-template-columns: repeat(" + grid + ", 1fr)";

    let imagesCount = imgConvertCount / 2;
    let imagesAllSrc = imagesSrcAdd(arrShuffle, imagesCount);

    shuffle(imagesAllSrc);
    createImages(imgConvertCount, imagesAllSrc);

    games = document.querySelectorAll('.games img');
    imagesLength = imagesAllSrc.length;
    startArr = imagesAllSrc;

    /////////////////////////////////

    games.forEach(elm => {
        elm.addEventListener("click", function (event) {

            let imgAttrSrc = event.target.getAttribute("src");
            let imgAttrData = event.target.getAttribute("data_imag_name");

            if (timeOutTime) {
                return
            }

            if (imgAttrSrc != "images/joker.jpg") {
                // En depqna erb imag@ joker 4i, nshanakum e bacvats nkar e dra hamar vo4 mi ban 4enq anum
                return
            }

            if (preventTarget == null) {
                // Erb image 4ka bacvats kam bacvats en zuygov 
                preventTarget = event.target
                event.target.setAttribute("src", imgAttrData);
                return
            }

            if (imgAttrData == preventTarget.getAttribute("src")) {
                const arrList = document.querySelectorAll(".games img");
                let count = 0;

                arrList.forEach(elm => {
                    if (elm.getAttribute('src') != 'images/joker.jpg') {
                        count++;

                        if (count == imagesLength - 1) {

                            const end = document.querySelector('.end');
                            const start = document.querySelector('.start');
                            end.setAttribute('id', 'games-end');
                            start.setAttribute('id', 'games-start');

                            start.addEventListener('click', function (event) {

                                imagesFunction(null, initialButton);

                                arrList.forEach(elm => {
                                    elm.setAttribute('src', 'images/joker.jpg');
                                    end.removeAttribute('id');
                                    start.removeAttribute('id');

                                });
                            })
                        }
                    }
                });

                // Nkarner@ hamnkan aysinqn hin u nor arjeqner@
                preventTarget = null;
                event.target.setAttribute("src", imgAttrData);
            } else {
                // Nkarner@ 4en hamnknum
                event.target.setAttribute("src", imgAttrData);
                timeOutTime = true;

                setTimeout(function () {
                    if (preventTarget != null) {
                        event.target.setAttribute('src', 'images/joker.jpg');
                        preventTarget.setAttribute('src', 'images/joker.jpg');
                    }
                    preventTarget = null;
                    timeOutTime = false;
                }, 1000);
            }
        })
    });

}