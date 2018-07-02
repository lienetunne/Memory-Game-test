const container = document.querySelector('.container');
const deck = document.querySelector('.deck');
// Array for Cards
let cards = Array.from(document.querySelectorAll('.deck>li'));
console.log(cards);
// Log moves
let gameMoves = document.querySelector('.moves');
// log first mover
let first = document.querySelector('.first');
// log stars
let stars = Array.from(document.querySelectorAll('.stars>li'));
// log restart button
const button = document.querySelector('.restart');
// log closing button
const closeB = document.querySelector('.exit');
// log winning message
const winM = document.querySelector('.popup');
// log matched cards
const matchedCards = document.getElementsByClassName('match');
// log timer
var seconds=0, minutes=0, hours=0;
var counter;
var stop,start;
var counting = false;
counter = document.getElementById('counter');
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// Generate a new game
window.onload = newGame;
function newGame(){
  cards = shuffle(cards);
    for(var i=0; i < cards.length; i++){
      deck.innerHTML = "";
      [].forEach.call(cards, function(item) {
          deck.appendChild(item);
      });
      // remove existing classes from cards
      cards[i].classList.remove('show', 'open', 'match','doesNotMatch', 'noClick');
      clickedCards=[];
    }

// reset moves
    moves = 0;
    gameMoves.innerHTML = moves;
// reset stars
    for (var i = 0; i < stars.length; i++) {
      stars[i].style.color='black';
    }
// reset timer
  first = 0;
//  firstgameMove.innerHTML = first;
// log timer
    seconds=0;
    minutes=0;
    hours=0;
    timerStops();
    myTimer();
}
// restart button
 button.addEventListener('click', function(){
  newGame();
 });
 // timer js from --->https://stackoverflow.com/questions/24155788/timer-to-be-displayed-on-a-webpage
function timerStops(){
  counting = false;
}
function timerStarts(){
  counting = true;
  myTimer();
}
 function myTimer() {
     if (seconds >= 60) {
         minutes++;
         seconds = 0;
     }
     if (minutes >= 60) {
         hours++;
         minutes = 0;
     }
     /*if (minutes < 10) minutes = "0" + minutes;
     if (seconds < 10) seconds = "0" + seconds;
     if (hours < 10) hours = "0" + hours;*/
     counter.innerHTML = hours + ":" + minutes + ":" + seconds;
     if (counting) {
         seconds++;
         setTimeout(myTimer, 1000);
     }
 };


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cardaddEventListeners do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


// game strats
let clickedCards = [];
for(let i=0; i<cards.length;i++){
  game = cards[i]
// if a card is clicked, start the game
  game.addEventListener('click', gameStarts);
  game.addEventListener('click',gameWon);
}

function gameStarts(){
// when the card is clicked, show classes for cards
    this.classList.add('open');
    this.classList.add('show');
    this.classList.add('noClick');

    clickedCards.push(this);
    checkMatch = clickedCards.length;
      firstMove();
// if two cards are open, count moves, check if they match or doesnt match, then continue
      if (checkMatch === 2){
        countMoves();
        if (clickedCards[0].innerHTML === clickedCards[1].innerHTML){
          cardsMatch()
        }
        else {
            cardsDoesNotMatch()
          }
      }
}
// when cards match
function cardsMatch(){
  clickedCards[0].classList.add('match');
  clickedCards[1].classList.add('match');
  clickedCards=[];
}
// when cards doesnt match
function cardsDoesNotMatch() {
  clickedCards[0].classList.add('doesNotMatch');
  clickedCards[1].classList.add('doesNotMatch');
    container.classList.add('noClick');
    setTimeout(function() {
      clickedCards[0].classList.remove('show', 'doesNotMatch', 'open', 'noClick');
      clickedCards[1].classList.remove('show', 'doesNotMatch', 'open', 'noClick');
      container.classList.remove('noClick');

      clickedCards=[];
    }, 500);

}

// count mover for timer to stop and stars to change
function countMoves(){
  moves+=1;
  gameMoves.innerHTML = moves;
// if moves count is more than 16 but less than 26, remove one star
  if (moves > 10 && moves < 12) {
    for (i=0;i<3;i++){
      stars[2].style.color='#c5c4c4';
    }
  }
// if moves ir more than 26, remove one more star
  else if (moves > 12 && moves < 16) {
    for (i=0;i<3;i++){
      stars[1].style.color='#c5c4c4';
    }
  }
  else if (moves > 16) {
    for (i=0;i<3;i++){
      stars[0].style.color='#c5c4c4';
    }
  }
}

// timer starts when user starts playing
function firstMove(){
    first+=1;
  //  firstgameMove.innerHTML = first;
    if(first == 1){
      timerStarts();
    }
}

// when all the cards is matched - congratulations card!
function gameWon() {
  if(matchedCards.length == 16){
  // add or remove css styles
    winM.classList.remove('hide');
    document.querySelector('.container').classList.add('fade');
  // add moves
    document.querySelector('.countMoves').innerHTML = moves;
  // add stars
    document.querySelector('.countStars').innerHTML = document.querySelector(".stars").innerHTML;
// add timer
    timerStops();
    document.querySelector('.gameTimer').innerHTML = document.querySelector("#counter").innerHTML;;
  // close button
    closeB.addEventListener('click', function(){
  // add or removes css styles
    winM.classList.add('hide');
    document.querySelector('.container').classList.remove('fade');
  // starts new game
    newGame()
    });
  }
}
