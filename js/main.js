const cards = document.querySelectorAll('.memory-card');

let hasFilippedCard = false;
let lockBoard = false;
let firstCard;
let secondCard;

function flipCard() {
    if(lockBoard) return;
    if(this===firstCard) return;
    this.classList.add('flip');
    

    if(!hasFilippedCard) {
        hasFilippedCard = true;
        firstCard = this;

        return;
    } 
    
    hasFilippedCard = false;
    secondCard = this;

    checkForMathch();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready());
    } else {
        ready();
    }

function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));

    overlays.forEach(welcome => {
        welcome.addEventListener('click', () => {
            welcome.classList.remove('visible');
            counting();
        })
    })
}

function checkForMathch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unFlipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    firstCard.style.backgroundColor = "yellow";

    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unFlipCards() {
    lockBoard = true;

    setTimeout(()=> {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1000)
}

function resetBoard() {
    [hasFilippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let random = Math.floor(Math.random() * 12);
        card.style.order = random;
    });
})(); //IIFE

cards.forEach(card => card.addEventListener('click', flipCard));

function counting() {
    var timeLeft = 30;
    var elem = document.getElementById('time-remaining');
    var timerId = setInterval(countdown, 1000);

    function countdown() {
        if (timeLeft == -1) {
            clearTimeout(timerId);
            gameOver()
        } else {
            elem.innerHTML = timeLeft;
            timeLeft--;
        }
    }
}

function gameOver() {
    document.getElementById('game-over-text').classList.add('visible');

}
function victory() {
    document.getElementById('victory-text').classList.add('visible');
} 


    

