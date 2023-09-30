let frog, lilypads;

let littleJump, bigJump, sadFall;

function preload() {
	frog = new Sprite();
	frog.addAni('frog_jump.png', { size: [32, 16], frames: 7 });
	frog.ani.stop();
	frog.layer = 1;

	lilypads = new Group();
	lilypads.addAni('lilypads.png', { size: [16, 16], frames: 12 });
	lilypads.layer = 0;

	littleJump = loadSound('sounds/retro_jump_bounce_12.wav');
	littleJump.setVolume(0.2);

	bigJump = loadSound('sounds/retro_jump_bounce_08.wav');
	bigJump.setVolume(0.2);

	sadFall = loadSound('sounds/retro_jump_bounce_09.wav');
	sadFall.setVolume(0.4);
}

function setup() {
	world.gravity.y = 10;
	noStroke();

	frog.x = 0;
	frog.y = 80;
	frog.w = 10;
	frog.h = 8;
	frog.rotationLock = true;

	lilypads.y = 90;
	lilypads.w = 10;
	lilypads.h = 2;
	lilypads.collider = 'static';

	makeLilyPads();
}

function makeLilyPads() {
	/* Part A: Use a loop to make more lily pads. */
	for (let i = 0; i < 1000; i++) {
		let lily = new lilypads.Sprite();
		lily.ani.frame = round(random(0, 11));
		lily.ani.frameDelay = round(random(80, 120));
		lily.x = i * 16;

		let num = random(1, 100);
		if (num < 50) {
			i++;
		}
	}
}

function draw() {
	background('0');
	fill('3');
	rect(0, 0, width, 90);

	log(frog.velocity.y);

	// when the frog is not in the air or falling
	if (frog.y > 83 && frog.velocity.y <= 0) {
		frog.x = round(frog.x / 16) * 16; // round to lilypad pos
		frog.ani.stop();
		frog.ani.frame = 0;
		if (kb.presses('ArrowUp')) {
			// little jump
			frog.velocity.y = -1.4;
			frog.velocity.x = 0.975;
			frog.ani.frameDelay = 3;
			frog.ani.play();
			littleJump.play();
		} else if (kb.presses('ArrowRight')) {
			// BIG jump!
			frog.velocity.y = -2;
			frog.velocity.x = 1.4;
			frog.ani.play();
			frog.ani.frameDelay = 4;
			bigJump.play();
		}
	}
	if (frog.y > 200) {
		sadFall.play();
		frog.x = 0;
		frog.y = 80;
	}
	camera.x = frog.x + 64;
}
