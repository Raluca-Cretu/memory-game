/*
 * Create a list that holds all of your cards
 */
let cards=["fa-diamond","fa-diamond","fa-paper-plane-o","fa-paper-plane-o","fa-anchor","fa-anchor","fa-bolt","fa-bolt","fa-cube","fa-cube","fa-leaf","fa-leaf","fa-bicycle","fa-bicycle","fa-bomb","fa-bomb"]
let openCards=[];
const moves = document.querySelector(".moves");
let moveCount = 0;
let time, countDownDate;
const restart = document.querySelector('.fa-repeat');
const modal = document.getElementById('myModal');
let stars = document.getElementsByClassName("fa-star");
let starList = document.querySelector('.stars');

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



function turn() {
	let cardSign=document.querySelectorAll('.card');
	console.log(cardSign);
	for( let i=0; i< cardSign.length; i++){
		cardSign[i].addEventListener('click', cardClick);
	}

}

function cardClick(){
	if (!time) {
      countDownDate = new Date().getTime();
      time = setInterval(function(){myTimer(countDownDate) }, 1000);
    }
	this.classList.add("open","show");
	addToOpenCards(this);
}



function addToOpenCards(card) {
	card.removeEventListener('click', cardClick);
	openCards.push(card);
	doMatchCards(card);
}

function doMatchCards(card){
	if ( openCards.length ===2) {
		for(let i=0; i<openCards.length; i++){
			console.log(card.innerHTML +"/"+ openCards[i].innerHTML);
			if (card.innerHTML === openCards[0].innerHTML){
				card.classList.remove("open","show");
				openCards[i].classList.remove("open","show");
				card.classList.add("match");
				openCards[i].classList.add("match");
				openCards = [];
				allCardsMatch()
				console.log('matched');
			} else {
				setTimeout(doNotMatchCards, 0500);
			}
		}
		moveCount++;
		moves.innerHTML = moveCount;
		starCount();
	}
}

function doNotMatchCards() {
	for(let i=0; i<openCards.length; i++){
		console.log('no match');
		openCards[i].classList.remove("open","show");
		openCards[i].addEventListener('click', cardClick);
	}
	openCards = [];
}

function starCount() {
	const firstStar = document.querySelectorAll('.stars li')[0];
	if (moveCount == 5 || moveCount == 11 || moveCount == 18 ) {
        starList.removeChild(firstStar);
        }
}

//modal.style.display = "block";
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
		if (moveCount <= 5 ) {
			console.log('la');
			winMessage.textContent='Your memory is great! \nYou won the game with only ' + moveCount + ' Moves, in ' + winTime + ' Time and with ' + stars.length + ' Stars.';
		} else if (moveCount >= 11 ){
			console.log('lala');
			winMessage.innerHTML='You are good! \nYou won the game with only ' + moveCount + ' Moves, in ' + winTime + ' Time and with ' + stars.length + ' Stars.';
		} else if (moveCount >= 18 ){
			console.log('lalala');
			winMessage.innerHTML='Great! \nYou won the game with only' + moveCount + ' Moves, in ' + winTime + ' Time and with ' + stars.length + ' Stars.';
		}
		btn.onclick = function() {
		modal.style.display = "none";
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



function myTimer(countDownDate) {
    let now = new Date().getTime();
    let distance = now - countDownDate;
	let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("timer").innerHTML = minutes + "m " + seconds + "s ";
}

restart.addEventListener('click', restartGame);

function stopTime() {
    	clearInterval(time);
    	time = null;
}

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
allCardsMatch();




/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards matchionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
