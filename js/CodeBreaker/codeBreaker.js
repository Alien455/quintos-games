async function start() {
	let fileMessage = await prompt('File or Message?');
	fileMessage = fileMessage.toLowerCase();
	let message;

	if (fileMessage == 'message') {
		message = await prompt('Write Message Here...');
	} else if (fileMessage == 'file') {
		// TODO ask user for file name
		let fileName = await prompt('Enter File Name Here...');
		let filePath = QuintOS.dir + '/' + fileName + '.txt';
		let data = await fetch(filePath);
		message = await data.text();
	}

	let shift = await prompt('Do you know the shift amount? Yes/No');
	shift = shift.toLowerCase();
	if (shift == 'yes') {
		let amount = await prompt('Write Shift Amount Here');
		alert(ceasarCipher(message, amount));
	} else {
		for (let i = 0; i < 26; i++) {
			let text = ceasarCipher(message.slice(0, 74) + '...', i);
			button(text, i + 1, 1, () => {
				erase();
				alert(ceasarCipher(message, i));
			});
		}
	}
}

function ceasarCipher(message, shiftAmount) {
	let result = '';
	let alphabet = 'abcdefghijklmnopqrstuvwxyz'.repeat(2);
	let capAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.repeat(2);

	for (let i = 0; i < message.length; i++) {
		let character = message[i];

		let isLetter = false;
		// goes through the whole alphabet
		for (let j = 0; j < 26; j++) {
			let letter = alphabet[j];
			let capLetter = capAlphabet[j];

			if (character == letter) {
				result += alphabet[j + shiftAmount];
				isLetter = true;
				break;
			}

			if (character == capLetter) {
				result += capAlphabet[j + shiftAmount];
				isLetter = true;
				break;
			}
		}
		if (isLetter == false) {
			result += character;
		}
	}
	return result;
}
