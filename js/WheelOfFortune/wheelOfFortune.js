let phrases, phrase, words;
let shown;
let score = 0;
let lettersShown;

async function setup() {
	// the category of theses phrases is "Fun and Games"
	let data = await fetch(QuintOS.dir + '/phrases.txt');
	let phrasesList = await data.text();

	phrases = phrasesList.split('\n');

	log(phrases);

	startRound();
}

function startRound() {
	erase();
	shown = [];
	lettersShown = 0;

	let num = Math.random() * phrases.length;
	num = Math.floor(num);

	phrase = phrases[num];
	log(phrase);

	words = phrase.split(' ');
	log(words);

	/* Create the buzzer button */
	button(bigBuzzer, 18, 5, buzz);

	displayBoxes();
	addLetter();
	showScore();
}

function showScore() {
	txt('score: ' + score + '   ', 15, 5);
}
/* Make an array of phrases, pick a random phrase, and split pharse into an array of words */

/* Display all the boxes for the phrase */
function displayBoxes() {
	for (let i = 0; i < words.length; i++) {
		let word = words[i];
		for (let j = 0; j < word.length; j++) {
			txtRect(2 + i * 3, 1 + j * 3, 3, 3); // make a 3x3 rect
			if (word[j] == '-' || word[j] == '&') {
				txt(word[j], 3 + i * 3, 2 + j * 3, 6, 6);
				lettersShown++;
				shown.push(i, j);
			}
		}
	}
}
let bigBuzzer = `
|⎺|__  _   _ ___________ _ __
| '_ \\| | | |_  /_  / _ \\ '__|
| |_) | |_| |/ / / /  __/ |
|_.__/ \\__,_/___/___\\___|_|`.slice(1);

let showLetters = true;

async function buzz() {
	showLetters = false;
	guess = await prompt('What is the phrase?', 17, 2);
	showLetters = true;
	if (guess.toLowerCase() == phrase.toLowerCase()) {
		score += phrase.length - lettersShown;
		startRound();
	} else {
		score -= lettersShown;
		addLetter();
		button(bigBuzzer, 18, 5, buzz);
	}
	showScore();
}

/* Add a letter to a random empty box */
async function addLetter() {
	if (!showLetters) return;

	let i = Math.floor(Math.random() * words.length);
	let word = words[i];

	let j = Math.floor(Math.random() * word.length);
	let letter = word[j];
	for (let k = 0; k <= shown.length; k += 2) {
		if (i == shown[k] && j == shown[k + 1]) {
			addLetter();
			return;
		}
	}
	txt(letter, i * 3 + 3, j * 3 + 2);
	lettersShown++;
	shown.push(i, j);

	let amountOfLetters = phrase.length - words.length + 1;

	if (shown.length == amountOfLetters * 2) {
		await alert('Better Luck Next Time ):', 17, 2);
		startRound();
		return;
	}
	await delay(2000);
	// letters shown is less than the amount of non-space characters in the phrase
	if (lettersShown < amountOfLetters) {
		addLetter();
	}
}
