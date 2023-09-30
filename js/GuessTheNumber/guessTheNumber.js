// start of wrapper (I will explain how this works later)
async function start() {
	// your code goes here! below this line

	let num = round(random(1, 100));
	let guess;

	for (let guessCount = 7; guess != num; guessCount--) {
		guess = await prompt('guess a number 1 to 100');
		if (guess > 100 || guess <= 0) {
			await alert('invalid guess...');
			guessCount++;
		} else if (guess > num) {
			await alert('Your guess is too high');
		} else if (guess < num) {
			await alert('your guess is too low');
		} else {
			await alert('Correct');
		}

		if (guessCount == 0) {
			await alert('You ran out of guesses');
			break;
		}
	}

	exit(); // this function exits the game
} // end
