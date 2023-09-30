async function start() {
	// your code goes here
	let choice = await prompt('B2D or D2B?');

	if (choice == 'B2D' || choice == 'b2d') {
		let binaryNumber = await prompt('Enter Binary Number');
		binaryNumber = binaryNumber.toString();

		let decimalNumber = 0;
		for (let i = 0; i < 4; i++) {
			if (binaryNumber[i] == 1) {
				decimalNumber += 2 ** (3 - i);
			}
		}

		await alert(decimalNumber);
	} else {
		let decimalNumber = await prompt('Enter Decimal Number');

		let binaryNumber = '';
		for (let i = 15; i >= 0; i--) {
			let x = 2 ** i;
			if (x <= decimalNumber) {
				binaryNumber += '1';
				decimalNumber -= x;
			} else {
				binaryNumber += '0';
			}
		}

		await alert(binaryNumber);
	}
}
