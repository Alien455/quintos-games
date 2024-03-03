// screen width is 256, height is 192

let imgBall = spriteArt(
	`
..urmg..
.mg..cy.
ur....ur
y......m
c......g
mg....cy
.ur..ur.
..ycgm..`
);

let imgPaddle = spriteArt('.wwwwww.\nwwwwwwww\n' + 'ww....ww\n'.repeat(42) + 'wwwwwwww\n.wwwwww.');

/* PART B: make image for the wall */

let imgWall = spriteArt('r'.repeat(width), 2);

let paddles = new Group();
paddles.img = imgPaddle;
paddles.collider = 'k';

let topPaddle = new paddles.Sprite();
topPaddle.rotation = 90;
topPaddle.x = 120;
topPaddle.y = 20;

let bottomPaddle = new paddles.Sprite();
bottomPaddle.rotation = 90;
bottomPaddle.x = 120;
bottomPaddle.y = 170;

let paddleL = new paddles.Sprite();
paddleL.x = 5;
paddleL.y = 90;

let paddleR = new paddles.Sprite();
paddleR.x = 242;
paddleR.y = 90;

let balls = new Group();
balls.img = imgBall;
balls.rotationLock = true;
balls.x = canvas.w / 2;
balls.y = canvas.h / 2;
balls.bounciness = 1;
balls.friction = 0;

let onScreen = [];
serve();
async function serve() {
	// places a ball in center of the screen
	for (let i = 0; i < 4; i++) {
		let ball = new balls.Sprite();
		let random = Math.random();
		let random2 = Math.random();
		if (random < 0.5) {
			ball.velocity.y = Math.random() / 2 + 0.5;
		} else {
			ball.velocity.y = Math.random() / 2 - 1;
		}
		if (random2 < 0.5) {
			ball.velocity.x = Math.random() / 2 + 0.5;
		} else {
			ball.velocity.x = Math.random() / 2 - 1;
		}
		onScreen.push(i);
		await delay(3000);
	}
}

balls.overlaps(balls);
let score = 0;

txt(score, 3, 26);
ballsLost = 0;

function draw() {
	background(0);
	/* PART A1: make the ball move */
	// top wall

	if (kb.pressing('w') && paddleR.y > 8) {
		paddleR.y -= 2;
	}

	if (kb.pressing('s') && paddleR.y + paddleR.h < 190) {
		paddleR.y += 2;
	}

	if (kb.pressing('w') && paddleL.y > 8) {
		paddleL.y -= 2;
	}

	if (kb.pressing('s') && paddleL.y + paddleL.h < 190) {
		paddleL.y += 2;
	}
	if (kb.pressing('d') && bottomPaddle.x + 30 < paddleR.x) {
		bottomPaddle.x += 2;
	}
	if (kb.pressing('a') && bottomPaddle.x - 30 > paddleL.x) {
		bottomPaddle.x -= 2;
	}
	if (kb.pressing('d') && topPaddle.x + 30 < paddleR.x) {
		topPaddle.x += 2;
	}
	if (kb.pressing('a') && topPaddle.x - 30 > paddleL.x) {
		topPaddle.x -= 2;
	}

	if (balls.colliding(paddles)) {
		score++;
		txt(score, 3, 26);
	}
	for (let i = 0; i < 4; i++) {
		let ball = balls[i];
		if (onScreen.includes(i)) {
			if (ball.x < 0 || ball.x > width || ball.y < 0 || ball.y > height) {
				onScreen[i] = -1;
				ballsLost += 1;
				log(i, ballsLost);
			}
		}
	}

	if (ballsLost >= 3) {
		gameOver();
	}
}

async function gameOver() {
	ballsLost = 0;
	await alert('YOU LOST... continue?');
	score = 0;
	onScreen = [];

	newGame();
}

function newGame() {
	balls.removeAll();
	serve();
}
