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

let wall = new Sprite(imgWall);
wall.x = 0;
wall.y = 8;
wall.collider = 'n';

let wall2 = new Sprite(imgWall);
wall2.x = 0;
wall2.y = 190;
wall2.collider = 'n';
// places a ball in center of the screen
let ball = new Sprite(imgBall);
ball.x = width / 2;
ball.y = height / 2;
ball.bounciness = 1;
ball.friction = 0;
ball.rotationLock = true;

if (Math.random() >= 0.5) {
	ball.velocity.x = 1.5;
} else {
	ball.velocity.x = -1.5;
}
ball.velocity.y = 1.5;
/* PART A0: create two paddles, place on each end of the screen */
let paddleL = new Sprite(imgPaddle);
paddleL.x = 5;
paddleL.y = 5;
paddleL.collider = 'k';

let paddleR = new Sprite(imgPaddle);
paddleR.x = 242;
paddleR.y = 5;
paddleR.collider = 'k';

let scoreL = 0;
let scoreR = 0;

txt(scoreL, 3, 5);
txt(scoreR, 3, 26);

function draw() {
	background(0);
	/* PART A1: make the ball move */
	// top wall
	if (ball.y <= wall.y) {
		ball.velocity.y = -ball.velocity.y + 0.1;
	}
	// bottom wall
	if (ball.y >= wall2.y) {
		ball.velocity.y = -ball.velocity.y - 0.1;
	}
	// ball touches either wall
	if (ball.y <= wall.y || ball.y >= wall2.y) {
		// if the ball is going right, make it go faster to the right
		if (ball.velocity.x > 0) {
			ball.velocity.x += 0.1;
		} else {
			ball.velocity.x -= 0.1;
		}
	}

	log(ball.speed);

	if (kb.pressing('ArrowUp') && paddleR.y > wall.y) {
		paddleR.y -= 2;
	}

	if (kb.pressing('ArrowDown') && paddleR.y + paddleR.h < wall2.y) {
		paddleR.y += 2;
	}

	if (kb.pressing('w') && paddleL.y > wall.y) {
		paddleL.y -= 2;
	}

	if (kb.pressing('s') && paddleL.y + paddleL.h < wall2.y) {
		paddleL.y += 2;
	}

	// ball went off the left side of the screenS
	if (ball.x < 0) {
		scoreR += 1;
		txt(scoreR, 3, 26);
		ball.velocity.x = 1.5;
	}
	if (ball.x > width) {
		scoreL += 1;
		txt(scoreL, 3, 5);
		ball.velocity.x = -1.5;
	}
	if (ball.x < 0 || ball.x > width) {
		ball.x = width / 2;
		ball.y = height / 2;
		if (Math.random() >= 0.5) {
			ball.velocity.y = 1.5;
		} else {
			ball.velocity.y = -1.5;
		}
	}
}
