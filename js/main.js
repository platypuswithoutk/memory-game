const cards = document.querySelectorAll('.memory-card');

let hasFilippedCard = false;
let lockBoard = false;
let initTimeLeft = 30;
let timeLeft = initTimeLeft;
let timerId;
let firstCard;
let secondCard;

function flipCard() {
    console.log('xd')
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

    checkForMatch();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready());
    } else {
        ready();
    }

function addCardsEventListener(){
    cards.forEach(card => card.addEventListener('click', flipCard));
}

function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));

    overlays.forEach(overlayText => {
        overlayText.addEventListener('click', () => {
            overlayText.classList.remove('visible');
            unFlipAllCards();
            timeLeft = initTimeLeft;
            timerId = setInterval(counting, 1000);
            counting();
            addCardsEventListener()
        })
    })
    cards.forEach(card => {
        let random = Math.floor(Math.random() * 12);
        card.style.order = random;
    });
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    if (isMatch) {
        disableCards();
        if (isVictory()) {
            victory();
        }
    } else {
        unFlipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
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

function unFlipAllCards() {
    lockBoard = true;
    cards.forEach(card => card.classList.remove('flip'));
    resetBoard();
}

function resetBoard() {
    [hasFilippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function counting() {
    var elem = document.getElementById('time-remaining');

    if (timeLeft == -1) {
        clearInterval(timerId);
        gameOver()
    } else {
        elem.innerHTML = timeLeft;
        timeLeft--;
    }
}

function gameOver() {
    document.getElementById('game-over-text').classList.add('visible');
}

function victory() {
    document.getElementById('victory-text').classList.add('visible');
    clearInterval(timerId);
} 

function isVictory() {
    for (const card of cards) {
        if(!card.classList.contains('flip')) {
            return false;
        }
    }
    return true;
}

    

