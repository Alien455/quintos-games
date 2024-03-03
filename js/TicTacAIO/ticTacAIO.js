const title = `
TTTTT IIIII   CCC
  T     I    C
  T     I    C
  T     I    C
  T   IIIII   CCC

TTTTT  AAA    CCC
  T   A   A  C
  T   AAAAA  C
  T   A   A  C
  T   A   A   CCC

TTTTT  OOO   EEEE
  T   O   O  E
  T   O   O  EEE
  T   O   O  E
  T    OOO   EEEE`;

const bigSpace = '        \n'.repeat(7);

const bigO = `
 OOOOOO
OO    OO
OO    OO
OO    OO
OO    OO
OO    OO
 OOOOOO`;

const bigX = `
XX    XX
 XX  XX
  XXXX
   XX
  XXXX
 XX  XX
XX    XX`;

const gridRow = 3;
const gridCol = 26;
let board = [
	[' ', ' ', ' '],
	[' ', ' ', ' '],
	[' ', ' ', ' ']
];

let gameMode = 1;
let difficulty = 1;
let isFinished;

function start() {
	button('1 player', 14, 30, difficultySelect);
	button('2 player', 14, 43, () => {
		gameMode = 2;
		setupGame();
	});
}

function difficultySelect() {
	erase();
	button('Baby Mode', 14, 30, () => {
		difficulty = 0;
		setupGame();
	});
	button('Teen', 14, 43, setupGame);
	button('Adult', 17, 36, () => {
		difficulty = 2;
		setupGame();
	});
}

function setupGame() {
	erase();

	txt(title, 5, 6);
	txt('Player O: ' + scoreO, 4, 55);
	txt('player X: ' + scoreX, 6, 55);

	/* Part A: finish the grid of 9x8 spaces */
	txt('─'.repeat(26), gridRow + 7, gridCol);
	txt('─'.repeat(26), gridRow + 15, gridCol); // draw another horizontal line

	txt('│\n'.repeat(23), gridRow, gridCol + 8);
	txt('│\n'.repeat(23), gridRow, gridCol + 17); // draw another vertical line

	/* Part A: Make the buttons in the grid */

	for (let row = 0; row < 3; row++) {
		for (let col = 0; col < 3; col++) {
			button(bigSpace, gridRow + row * 8, gridCol + col * 9, () => {
				takeTurn(row, col);
			});
		}
	}
	pickRandomTurn();
	showTurn();
	startNewGame();
}

function startNewGame() {
	isFinished = false;
	for (let row = 0; row < 3; row++) {
		for (let col = 0; col < 3; col++) {
			txt(bigSpace, gridRow + row * 8, gridCol + col * 9);
			board[row][col] = ' ';
		}
	}
	if (gameMode == 1) {
		if (turn == 'o') {
			aiTakeTurn();
		}
	}
}

let turn = 'x';
let scoreO = 0;
let scoreX = 0;

function pickRandomTurn() {
	let xOrO = round(random(1, 2));
	if (xOrO == 1) {
		turn = 'x';
	} else {
		turn = 'o';
	}
}

function showTurn() {
	txt('Player ' + turn + " it's your turn", 8, 55);
}

async function takeTurn(r, c) {
	if (board[r][c] != ' ' || isFinished) {
		return;
	}
	if (turn == 'x') {
		txt(bigX, gridRow + r * 8, gridCol + c * 9);
		board[r][c] = 'x';
	} else {
		txt(bigO, gridRow + r * 8, gridCol + c * 9);
		board[r][c] = 'o';
	}
	if (checkForWinner(turn)) {
		isFinished = true;
		await alert('Congrats Player ' + turn, 20, 56, 18);
		if (turn == 'x') {
			scoreX += 1;
			txt('player X: ' + scoreX, 6, 55);
			turn = 'o';
		} else {
			scoreO += 1;
			txt('Player O: ' + scoreO, 4, 55);
			turn = 'x';
		}
		startNewGame();
		showTurn();
		return;
	}
	if (checkForDraw()) {
		await alert('Draw', 20, 56, 18);
		pickRandomTurn();
		startNewGame();
		return;
	}
	if (turn == 'x') {
		turn = 'o';
		if (gameMode == 1) {
			aiTakeTurn();
		}
	} else {
		turn = 'x';
	}
	log(board);
	showTurn();
}

function aiTakeTurn() {
	// hard mode AI
	if (difficulty == 2 || (difficulty == 1 && random() < 0.75)) {
		log('hard mode algorithm');
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (board[i][j] != ' ') continue;

				board[i][j] = 'o';
				if (checkForWinner('o')) {
					board[i][j] = ' ';
					log('win');
					takeTurn(i, j);
					return;
				}

				board[i][j] = 'x';
				if (checkForWinner('x')) {
					board[i][j] = ' ';
					log('block');
					takeTurn(i, j);
					return;
				}
				board[i][j] = ' ';
			}
		}
	}

	// easy mode AI
	let open = [];
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (board[i][j] == ' ') {
				open.push([i, j]);
			}
		}
	}
	let num = round(random(0, open.length - 1));
	// open = [[0,0],[1,1],[0,2]]
	takeTurn(open[num][0], open[num][1]);
}

function checkForWinner(mark) {
	for (let i = 0; i < 3; i++) {
		if (board[i][0] == mark && board[i][1] == mark && board[i][2] == mark) {
			return true;
		}
		if (board[0][i] == mark && board[1][i] == mark && board[2][i] == mark) {
			return true;
		}
	}
	if (board[0][0] == mark && board[1][1] == mark && board[2][2] == mark) {
		return true;
	}
	if (board[0][2] == mark && board[1][1] == mark && board[2][0] == mark) {
		return true;
	}
	return false;
}
function checkForDraw() {
	for (let row = 0; row < 3; row++) {
		for (let col = 0; col < 3; col++) {
			if (board[row][col] == ' ') {
				return false;
			}
		}
	}
	return true;
}
