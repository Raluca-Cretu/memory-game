/*
 * Create a list that holds all of your cards
 */
let cards=["fa-diamond","fa-diamond","fa-paper-plane-o","fa-paper-plane-o","fa-anchor","fa-anchor","fa-bolt","fa-bolt","fa-cube","fa-cube","fa-leaf","fa-leaf","fa-bicycle","fa-bicycle","fa-bomb","fa-bomb"]
let openCards=[];
const moves = document.querySelector('.moves');
moves.innerHTML=0;


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
	this.classList.add("open","show");
	addToOpenCards(this);
}


function addToOpenCards(card) {
	card.removeEventListener('click', cardClick);
	doMatchCards(card);
	openCards.push(card);
}

function doMatchCards(card){
	if ( openCards.length > 0) {
		for(let i=0; i<openCards.length; i++){
			console.log(card.innerHTML +"/"+ openCards[i].innerHTML);
			if (card.innerHTML === openCards[i].innerHTML){
					card.classList.remove("open","show");
					openCards[i].classList.remove("open","show");
					card.classList.add("match");
					openCards[i].classList.add("match");
					openCards = [];
					moves.innerHTML++;
					starCount();
					console.log('matched');
			} else {
				setTimeout(doNotMatchCards, 0500);
			}
		}
	}
}

function doNotMatchCards() {
	for(let i=0; i<openCards.length; i++){
		console.log('no match');
		openCards[i].classList.remove("open","show");
		openCards[i].addEventListener('click', cardClick);
	}
	openCards = [];
	moves.innerHTML++;
	starCount();
}


function starCount() {
	const firstStar = document.querySelectorAll('.fa.fa-star')[0];
	const secondStar= document.querySelectorAll('.fa.fa-star')[1];
	const thirdStar= document.querySelectorAll('.fa.fa-star')[2];
		if (moves.innerHTML >= 8 && moves.innerHTML <=13) {
			firstStar.style.display="none";
		} else if (moves.innerHTML > 13 && moves.innerHTML <=15) {
    		secondStar.style.display="none";
    	} else if (moves.innerHTML > 15) {
    		thirdStar.style.display="none"
    	}
}

shuffle(cards);
display(cards);
turn();
//starCount();



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards matchionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
