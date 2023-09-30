const target = `
 .d88b. 
.8P  Y8.
88    88
88    88
 8b  d8 
 'Y88P' `;

const faketarget = `
 .d88d. 
.8P  Y8.
88    88
88    88
 8b  d8 
 'Y88P' `;

/* Part A: find the range of row and column values the target can be placed at */

let targetRow;
let targetCol;
let times = [];

async function instructions() {
	await alert('Press the correct target and avoid the imposter ones', 10, 27, 30);
}
async function gameOver() {
	erase();
	txt(target, targetRow, targetCol);
	await delay(2000);
	await alert('GAME OVER', 10, 27, 30);
	erase();
	makeTargets();
}
async function calcStats() {
	let speeds = [];
	for (let i = 0; i < 9; i++) {
		speeds.push(times[i + 1] - times[i]);
	}
	log(speeds);

	let sum = 0;
	for (let i = 0; i < 9; i++) {
		sum += speeds[i];
	}
	let average = sum / 9;
	let fastest = speeds[0];
	let slowest = 0;

	for (let i = 0; i < 9; i++) {
		if (speeds[i] > slowest) {
			slowest = speeds[i];
		}
		if (speeds[i] < fastest) {
			fastest = speeds[i];
		}
	}

	await alert(
		'Your average click speed was: ' +
			round(average) +
			'\nyour fastest click speed was: ' +
			fastest +
			'\nyour slowest click speed was: ' +
			slowest,
		15,
		27,
		40
	);
}
function makeTargets() {
	times.push(Date.now());
	log(times);
	if (times.length >= 10) {
		calcStats();
	} else {
		erase();
		for (let fakeCount = 0; fakeCount < 4; fakeCount++) {
			let row = round(random(1, 23));
			let col = round(random(1, 72));
			button(faketarget, row, col, gameOver);
		}
		targetRow = round(random(1, 23));
		targetCol = round(random(1, 72));
		button(target, targetRow, targetCol, makeTargets);
	}
}

async function start() {
	await instructions();
	makeTargets();
}
