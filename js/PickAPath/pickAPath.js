// start of wrapper (I will explain how this works later)
async function start() {
	// your code goes here! below this line

	let choice = 0; // initialize choice to 0, user has not made any choice yet
	let boughtABow = false;

	while (choice != null) {
		// while choice is not null (nothing)
		// null in this case indicates the player cancelled out of the prompt

		let msg = ''; // initialize message to empty String
		let options = [];

		if (choice == 0) {
			/* PART A0: Start your story! */
			msg =
				"Welcome to Ben's Emporium you can get all the stuff you need here!\n\n\t" +
				'1: Take a look at weapons\n\t' +
				'2: Take a look at food\n\t' +
				'3: Take a look at clothes and accessories\n\t' +
				"4: I'm done looking for items, thanks";
			options = [1, 2, 3, 4];
		} else if (choice == 1 && boughtABow == false) {
			/* PART A1: continue the story */
			msg =
				'What kind of weapons would you like to buy?\n\n\t' +
				'5: Can I buy a sword?\n\t' +
				'6: Can I buy a bow?\n\t' +
				'0: Nevermind, what else do you have?';
			options = [5, 6, 0];
		} else if (choice == 1 && boughtABow == true) {
			msg =
				'What kind of weapons would you like to buy?\n\n\t' +
				'5: Can I buy a sword?\n\t' +
				'13: Can I upgrade my bow?\n\t' +
				'0: Nevermind, what else do you have?';
			options = [5, 13, 0];
		} else if (choice == 13) {
			msg =
				'What upgrades would you like with your bow?\n\n\t' +
				'14: Can I buy 16 arrows?\n\t' +
				'15: Can I buy a advanced string\n\t' +
				'16: Can I buy a quiver for carrying my arrows?\n\t' +
				'0: Nevermind, what else do you have?';
			options = [14, 15, 16, 0];
		} else if (choice == 2) {
			msg =
				'What kind of food would you like to buy?\n\n\t' +
				'7: Can I buy 5 potatoes?\n\t' +
				'8: Can I buy 3 loafs of bread?\n\t' +
				'9: Can I buy 1 steak please?\n\t' +
				'0: Nevermind, what else do you have?';
			options = [7, 8, 9, 0];
		} else if (choice == 3) {
			msg =
				'What kind of cloths and accessories would you like to buy?\n\n\t' +
				'10: Can I buy a chain set of armor\n\t' +
				'11: Can I buy a emerald necklace\n\t' +
				'12: Can I buy a pair of leather boots\n\t' +
				'0: Nevermind, what else do you have?';
			options = [10, 11, 12, 0];
		} else if (choice == 5) {
			msg = "That'll be $12222222222222222\n\n\t" + "105: That's a deal\n\t" + '0: Nevermind, what else do you have?';
			options = [105, 0];
		} else if (choice == 6) {
			msg = "That'll be $0.0000000000001\n\n\t" + "106: That's a deal\n\t" + '0: Nevermind, what else do you have?';
			options = [106, 0];
		} else if (choice == 7) {
			msg = "That'll be $5\n\n\t" + "107:That's a deal\n\t" + '0: Nevermind, what else do you have?';
			options = [107, 0];
		} else if (choice == 8) {
			msg = "That'll be $15\n\n\t" + "108: That's a deal\n\t" + '0: Nevermind, what else do you have?';
			options = [108, 0];
		} else if (choice == 9) {
			msg = "That'll be $150\n\n\t" + "109: That's a deal\n\t" + '0: Nevermind, what else do you have?';
			options = [109, 0];
		} else if (choice == 10) {
			msg = "That'll be $299\n\n\t" + "110: That's a deal\n\t" + '0: Nevermind, what else do you have?';
			options = [110, 0];
		} else if (choice == 11) {
			msg = "That'll be $233\n\n\t" + "111: That's a deal\n\t" + '0: Nevermind, what else do you have?';
			options = [111, 0];
		} else if (choice == 12) {
			msg = "That'll be $155\n\n\t" + "112: That's a deal\n\t" + '0: Nevermind, what else do you have?';
			options = [112, 0];
		} else if (choice == 106) {
			boughtABow = true;
			msg = 'You have bought a bow!!!\n\n\t' + '0: What else do you have?';
			options = [0];
		} else if (choice == 14) {
			msg = "That'll be $16\n\n\t" + "116: That's a deal\n\t" + '0: Nevermind, what else do you have?';
			options = [116, 0];
		} else if (choice == 15) {
			msg = "That'll be $777\n\n\t" + "117: That's a deal\n\t" + '0: Nevermind, what else do you have?';
			options = [117, 0];
		} else if (choice == 16) {
			msg = "That'll be $250\n\n\t" + "118: That's a deal\n\t" + '0: Nevermind, what else do you have?';
			options = [118, 0];
		} else if (choice > 100) {
			msg = 'Thanks for buying!\n\n\t' + '0: What else do you have?';
			options = [0];
		} else if (choice == 4) {
			msg = "Thanks for coming to Ben's Emporium please come again!";
			options = [];
			choice = null;
		}

		if (options.length > 0) {
			// prompt the player to make choices
			let userInput = await prompt(msg);
			if (options.includes(userInput) == true) {
				choice = userInput;
			} else {
				await alert('You typed an invalid choice');
			}
		} else {
			await alert(msg);
		}
	}

	exit(); // exits the game
} // end wrapper
