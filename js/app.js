/*
 * Create a list that holds all of your cards
 */
let cards=["fa-diamond","fa-diamond","fa-paper-plane-o","fa-paper-plane-o","fa-anchor","fa-anchor","fa-bolt","fa-bolt","fa-cube","fa-cube","fa-leaf","fa-leaf","fa-bicycle","fa-bicycle","fa-bomb","fa-bomb"]
//Define other global Variables
let openCards=[];
const moves = document.querySelector(".moves");
let moveCount = 0;
let time, countDownDate;
const restart = document.querySelector('.fa-repeat');
const modal = document.getElementById('myModal');
let stars = document.getElementsByClassName("fa-star");
let starList = document.querySelector('.stars');

// Display the cards on the page

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

//Loop through each card and create its HTML and add each card's HTML to the page
function display(array) {
	let listElement=0;
	const deck = document.querySelector('.deck');
	deck.innerHTML='';
	cards.forEach(function(value){
		let listElement=document.createElement('li');
		listElement.classList.add("card");
		listElement.innerHTML='<i class="fa ' + value + '"></i>';
		deck.appendChild(listElement);
	})
}


// Add an event Listener to each card
function turn() {
	let cardSign=document.querySelectorAll('.card');
	for( let i=0; i< cardSign.length; i++){
		cardSign[i].addEventListener('click', cardClick);
	}
}

//When a card is clicked, time starts counting and the card turns around plus is added to a openCards list
function cardClick(){
	if (!time) {
      countDownDate = new Date().getTime();
      time = setInterval(function(){myTimer(countDownDate) }, 1000);
    }
	this.classList.add("open","show");
	addToOpenCards(this);
}


// Add the clicked card to openCards list, remove the event Listener and check is the card is a match
function addToOpenCards(card) {
	card.removeEventListener('click', cardClick);
	openCards.push(card);
	doMatchCards(card);
}

/* Check if the card is a match only if there is already a card in the openCards list.
* If there are two cards in the openCards list and they match they remain turned. If they don't match they are send to doNotMatch function.
* Count moves and number of stars from the moment two card are clicked.
*/
function doMatchCards(card){
	if ( openCards.length ===2) {
		for(let i=0; i<openCards.length; i++){
			if (card.innerHTML === openCards[0].innerHTML){
				card.classList.remove("open","show");
				openCards[i].classList.remove("open","show");
				card.classList.add("match");
				openCards[i].classList.add("match");
				openCards = [];
				allCardsMatch()
			} else {
				setTimeout(doNotMatchCards, 0500);
			}
		}
		moveCount++;
		moves.innerHTML = moveCount;
		starCount();
	}
}

// If the cards in the openCards list do not match they turn back and a new event Listener is added
function doNotMatchCards() {
	for(let i=0; i<openCards.length; i++){
		openCards[i].classList.remove("open","show");
		openCards[i].addEventListener('click', cardClick);
	}
	openCards = [];
}

// The number of stars is counting according to the number of moves
function starCount() {
	const firstStar = document.querySelectorAll('.stars li')[0];
	if (moveCount == 5 || moveCount == 11 || moveCount == 18 ) {
        starList.removeChild(firstStar);
        }
}

// If all cards have matched, a message will be displayed with the final score (no. of moves and stars plus the time)
function allCardsMatch() {
	const btn = document.getElementById("myBtn");
	const span = document.getElementsByClassName("close")[0];
	const cardMatch = document.getElementsByClassName("match");
	const modalContent = document.getElementsByClassName("modal-content")[0];
	const winMessage = document.createElement("p");
	modalContent.appendChild(winMessage);
	const winTime= document.getElementById("timer").innerHTML;
	moves.innerHTML = moveCount;
    if (cardMatch.length === 2) {
		modal.style.display = "block";
		stopTime();
		if (moveCount <= 5) {
			winMessage.innerHTML='Your memory is great! <br>You won the game with only ' + moveCount + ' Moves,<br> in ' + winTime + ' Time and with ' + stars.length + ' Stars.';
		} else if (moveCount >5 && moveCount <= 9){
			winMessage.innerHTML='You are good! <br>You won the game with only ' + moveCount + ' Moves, <br> in ' + winTime + ' Time and with ' + stars.length + ' Stars.';
		} else if (moveCount >10){
			winMessage.innerHTML='Great! <br>You won the game with only ' + moveCount + ' Moves, <br> in ' + winTime + ' Time and with ' + stars.length + ' Stars.';
		}
		btn.onclick = function() {
		modal.style.display = "none";
		winMessage.innerHTML = "";
	    restartGame();
	 }
	}
	span.onclick = function() {
	    modal.style.display = "none";
	}
	window.onclick = function(event) {
	    if (event.target == modal) {
	        modal.style.display = "none";
	    }
	}

}

// Set up a  Timer
function myTimer(countDownDate) {
    let now = new Date().getTime();
    let distance = now - countDownDate;
	let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("timer").innerHTML = minutes + "m " + seconds + "s ";
}

// Stop time function
function stopTime() {
    	clearInterval(time);
    	time = null;
}

// Restart button functionalities
restart.addEventListener('click', restartGame);

function restartGame() {
	stopTime();
	document.getElementById("timer").innerHTML = "";
	moveCount = 0;
    moves.innerHTML = moveCount;
    starList.innerHTML = " ";
	for(let i=0; i < 3; i++){
		let listElement=document.createElement('li');
		listElement.classList.add("fa", "fa-star");
		listElement.innerHTML='<i></i>';
		starList.appendChild(listElement);
	}
    shuffle(cards);
    display(cards);
    turn();
}

shuffle(cards);
display(cards);
turn();





/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards matchionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
