let words, longWords, speech, letters;
let letterSounds, wordSounds, speechSounds;

function preload() {
	// words that are easier to spell
	easyWords =
		'I cool know over these about down large please they after drink learn put think again each little red this ago everything live right those all face location run three also far make same to always fast man sea together am father many seven try an find may shop turn and first meaning sit under any five men six until are fly mother sleep us as foot much small use from must smile want ask give never some we at go no sorry well away green not star what because has now stay when bed here ocean stop where black his of store which blue how old strong why bring in on tell will call into one thank with clean is only that yellow cold it or the yes color just our you come kind out there'.split(
			' '
		);

	// words that are harder to spell
	hardWords =
		"above coming hoof pleasure sugar abscess correct hooves plunger summers already corsage houses plural sure ancient couldn't inch poem surgeon angel county's inches poems swap another couple insects poets talk answer courage instead police ten anything cousin iron ponies terror armies danger jealous pony thief's army diamond journey potato thieves' ax diamonds lady's potatoes three axes discover language poultry to baby's does laugh priest today beach dollar laughter priests tomorrow beaches dollars learn promise touch beauty dungeon leisure pull treasure beige early lettuce puppies trouble believe earnest life puppy trucks bench earth lilies quiet two benches echo lily quotient typists blood eight linger rabbis uncles boss elf lives range union bosses elves loss ranger valley brother enough losses ready valleys built extra machine reindeer view bullet farmers man's relief village bureau feather measure remove villages bushel finger men's rhythm warm butcher five mercies rural was calf flood mercy says wash camel floor mice's scarf watch camels for minute scarves water canaries four mirror schedule welcome canary freight mother school wife candies front mouse's scissors winters candy glass navy's search witches canoe glasses niece serious wives canoes glories nine seven wolf's caravan glory ocean shield wolves carry greater oceans should woman's chalk guard once shoulder woman cheese guess one shovel women's cheeses guide other six wonder child gypsies outdoor ski word chimney half oven someone workman chimneys harbors ox's source worth chorus haste oxen's squad wrong choruses health period squat yacht circuit healthy pierce statue yield cities heaven pint stomach zero comfort heavy plague stranger".split(
			' '
		);

	/* Part B1: Load all the word sounds */

	speech = [
		'as_in',
		'here_is_your_score',
		'i_win',
		'is',
		'now_spell',
		'perfect_score',
		'plural_possessive',
		'say_it',
		'singular_possessive',
		'spell',
		'that_is_correct_now_spell',
		'that_is_incorrect_the_correct_spelling_of',
		'that_is_right_now_try',
		'the_number',
		'wrong_try_again',
		'you_are_correct',
		'you_are_correct_next_spell',
		'you_are_right_try',
		'you_win'
	];

	letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ'".split('');

	/* Part A0: Load all the letter sounds and apostrophe */
	letterSounds = {};

	for (let i = 0; i < letters.length; i++) {
		let letter = letters[i];
		letterSounds[letter] = loadSound('sounds/letters/' + letter + '.mp3');
		letterSounds[letter].setVolume(0.3);
	}

	// are all the letter sounds loaded correctly? check the JS console!
	log(letterSounds);

	wordSounds = {};

	/* Part B0: Load all the word sounds */
	for (let i = 0; i < easyWords.length; i++) {
		let word = easyWords[i];
		wordSounds[word] = loadSound('sounds/words/' + word + '.mp3');
		wordSounds[word].setVolume(0.3);
	}

	for (let word of hardWords) {
		wordSounds[word] = loadSound('sounds/words/' + word + '.mp3');
		wordSounds[word].setVolume(0.3);
	}

	speechSounds = {};
	/* Part B0: Load all the speech sounds */
	for (let i = 0; i < speech.length; i++) {
		let spech = speech[i];
		speechSounds[spech] = loadSound('sounds/speech/' + spech + '.mp3');
		speechSounds[spech].setVolume(0.3);
	}
}

let inp;
let chosenWord;
let wordsSpelled = 0;
let wordsCorrect = 0;
// value is the text the user entered in the input
let secondTry = true;
async function onSubmit(value) {
	wordsSpelled++;

	log(value, chosenWord);
	if (value == chosenWord) {
		wordsCorrect += 1;

		if (wordsSpelled > 2) {
			await play(speechSounds.you_are_correct);
			score();
			return;
		}

		let phrases = ['that_is_correct_now_spell', 'you_are_correct_next_spell', 'you_are_right_try'];
		let phrase = random(0, 2);
		phrase = round(phrase);
		await play(speechSounds[phrases[phrase]]);
		nextWord();
	} else {
		if (secondTry == true) {
			await play(speechSounds.wrong_try_again);
			await play(speechSounds.spell);
			await play(wordSounds[chosenWord]);
			secondTry = false;
			return;
		}
		await play(speechSounds.that_is_incorrect_the_correct_spelling_of);
		await play(wordSounds[chosenWord]);
		await play(speechSounds.is);

		for (let i = 0; i < chosenWord.length; i++) {
			const letter = chosenWord[i].toUpperCase();
			await play(letterSounds[letter]);
		}

		if (wordsSpelled > 10) {
			score();
			return;
		}

		await play(speechSounds.now_spell);
		letterIndex = 0;
		nextWord();
	}
}

async function score() {
	await play(speechSounds.here_is_your_score);
	await play(wordSounds[numbers[wordsCorrect]]);
	wordsSpelled = 0;
	// go to main menu
}

// called every time the user enters text in the input
function onChange(value) {
	let letter = value[value.length - 1].toUpperCase();
	log(letter);
	letterSounds[letter].play();
}

let numbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];

async function nextWord() {
	secondTry = true;
	erase(); // erase the screen

	let randomNum = Math.random() * words.length;
	randomNum = Math.floor(randomNum);
	chosenWord = words[randomNum];
	words.splice(randomNum, 1);

	log(chosenWord);
	wordSounds[chosenWord].play();

	// create the input for letters
	input('', 0, 0, onSubmit, onChange);
}

async function start() {
	txt('A = easy B = hard', 0, 0);
	input('', 2, 0, chooseMode);
}

function chooseMode(mode) {
	if (mode == 'a') {
		words = easyWords;
	} else {
		words = hardWords;
	}

	nextWord();
}
