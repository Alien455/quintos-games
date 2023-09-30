// start of wrapper (I will explain how this works later)
async function start() {
	// your code goes here! below this line

	const hangman = [
		`
      
      
			
			
			
			
=========`,
		`
      +
      |
			|
			|
			|
			|
=========`,
		`
  +---+
      |
			|
			|
			|
			|
=========`,
		`
  +---+
  |   |
			|
			|
			|
			|
=========`,
		`
  +---+
  |   |
  O   |
			|
			|
			|
=========`,
		`
  +---+
  |   |
  O   |
  |   |
			|
			|
=========`,
		`
  +---+
  |   |
  O   |
 /|   |
			|
			|
=========`,
		`
  +---+
  |   |
  O   |
 /|\\  |
			|
			|
=========`,
		`
  +---+
  |   |
  O   |
 /|\\  |
 /    |
    	|
=========`,
		`
  +---+
  |   |
  O   |
 /|\\  |
 / \\  |
    	|
=========`
	];

	let wordsList =
		'abruptly absurd abyss affix askew avenue awkward axiom azure bagpipes bandwagon banjo bayou beekeeper bikini blitz blizzard boggle bookworm boxcar buckaroo buffalo buffoon buzzard buzzing buzzwords beans cobweb croquet crypt cycle disavow dizzying duplex dwarves embezzle equip espionage euouae exodus faking fishhook fixable fjord flapjack flopping fluffiness flyby foxglove frazzled frizzled funny gabby galaxy galvanize gazebo gizmo glow glyph gnarly gnostic gossip grogginess haiku haphazard hyphen icebox injury ivory ivy jackpot jawbreaker jaywalk jazzy jelly jigsaw jinx jiujitsu jockey jogging joking jovial joyful juicy jukebox jumbo kayak kazoo keyhole kilobyte kiosk kitsch kiwifruit klutz knapsack lengths lucky luxury marquee matrix megahertz microwave mnemonic mystify nightclub nowadays oxidize oxygen pajama phlegm pixel pizazz polka psyche puppy puzzling quartz queue quip quiz quizzes razzmatazz rhythm scratch snazzy squawk staff strength stretch stronghold stymie subway swivel syndrome thrift thumb topaz transcript transgress transplant twelfth unknown unzip vaporize voodoo vortex walkway waltz wave wavy waxy well whomever witch wizard wristwatch xylophone yacht youthful yummy zigzag zilch zipper zodiac zombie';

	/* Part A: split the wordsList String into an array called words, then choose a random word */
	let words = wordsList.split(' ');
	log(words);

	let num = Math.random() * words.length;
	num = Math.floor(num);
	log(num);
	let word = words[num];
	log(word);

	/* Part B: make an array with a line for each letter in the word */
	// Example word: 'quiz'
	// lines -> ['_', '_', '_', '_']
	let lines = '_'.repeat(word.length).split('');
	log(lines);

	let wrong = 0;

	/* Part C: show the lines for the word below the hangman art */
	while (lines.includes('_')) {
		let guess = await prompt(hangman[wrong] + '\n' + lines.join(' '));
		if (guess == word) {
			break;
		}

		let isCorrect = false;

		// loop goes through each letter in the word
		// starting with the first letter and ending with the last
		for (let i = 0; i < word.length; i++) {
			log(word[i]);
			let letter = word[i];
			if (guess == letter) {
				isCorrect = true;
				lines[i] = letter;
			}
		}

		if (isCorrect == false) {
			wrong = wrong + 1;
		}
		if (wrong > 9) {
			break;
		}
	}

	if (wrong < 9) {
		await alert('you won');
	} else {
		await alert('you lose the word was ' + word);
	}
	exit(); // exits the game
} // end
