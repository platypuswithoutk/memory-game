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

    checkForMathch()
}

function checkForMathch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unFlipCards();
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
    }, 1500)
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

