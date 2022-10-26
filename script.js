const imagesLinks = {
    one: './images/1.jpg',
    two: './images/2.jpg',
    three: './images/3.jpg',
    four: './images/4.jpg',
    five: './images/5.jpg',
    six: './images/6.jpg',
    seven: './images/7.jpg',
    eight: './images/8.jpg',
}

const winCounterDiv = document.querySelector('.win-counter')
let winCounter = 0
let timerCounter = 0;
let userTry = {}
let counter = 0;
let seconds = 0;
let disableField = true;
const currentStateField = {}
let isBeginGame = false;

winCounterDiv.textContent = winCounter
const gameField = document.querySelector('.game-window')
const gameCardsArray = document.querySelector('.game-window__card')
const timerDiv = document.querySelector('.timer')

function intervalFunc() {
    seconds += 1;
    timerDiv.textContent = seconds;
}


let interval;



gameField.addEventListener('click', (e) => {
    if (e.target.classList[0] === 'game-window__card' && disableField) {
        if (!isBeginGame) {
            timerDiv.textContent = seconds;
            isBeginGame = true;
            interval = setInterval(intervalFunc, 1000)
        }
        if (userTry.hasOwnProperty(e.target.classList[1])) {
            const ImageClassName = e.target.classList[1]
            timerCounter += 1;
            e.target.style.background = `url(${imagesLinks[ImageClassName]})`
            userTry = {}
            counter = 0
        } else {
            userTry[e.target.classList[1]] = e.target
            const ImageClassName = e.target.classList[1]
            e.target.style.background = `url(${imagesLinks[ImageClassName]})`
            counter += 1
            if (counter > 1) {
                disableField = false;
                const failedTry = Object.values(userTry)
                setTimeout(() => {
                    failedTry.forEach((el) => {
                        el.style.background = ''
                        disableField = true;
                    })
                }, 1000)
                counter = 0
                userTry = {}
                winCounter += 1
                winCounterDiv.textContent = winCounter
            }
        }
        if (timerCounter === Object.keys(imagesLinks).length) {
            clearInterval(interval)
        }
    }

})


