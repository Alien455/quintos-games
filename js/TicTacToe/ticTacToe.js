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
	['', '', ''],
	['', '', ''],
	['', '', '']
];
function start() {
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
}

function startNewGame() {
	for (let row = 0; row < 3; row++) {
		for (let col = 0; col < 3; col++) {
			txt(bigSpace, gridRow + row * 8, gridCol + col * 9);
			board[row][col] = '';
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
	if (board[r][c] != 'x' && board[r][c] != 'o') {
		if (turn == 'x') {
			txt(bigX, gridRow + r * 8, gridCol + c * 9);
			board[r][c] = 'x';
		} else {
			txt(bigO, gridRow + r * 8, gridCol + c * 9);
			board[r][c] = 'o';
		}
		if (checkForWinner(turn)) {
			await alert('Congrats Player ' + turn, 20, 56, 18);
			startNewGame();
			if (turn == 'x') {
				scoreX += 1;
				txt('player X: ' + scoreX, 6, 55);
				turn = 'o';
			} else {
				scoreO += 1;
				txt('Player O: ' + scoreO, 4, 55);
				turn = 'x';
			}
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
		} else {
			turn = 'x';
		}
		log(board);
		showTurn();
	}
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
			if (board[row][col] == '') {
				return false;
			}
		}
	}
	return true;
}
