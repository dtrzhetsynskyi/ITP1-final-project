/*

The Final Game Project

*/

/////////// INITIALIZE VARIABLES //////////
const SPACE_KEY = 32;

let cameraPosX = 0;
let floorPos_y;

let game_score;
let lives;

let character;
let blaster;
let scenery;
let backgroundMountains;
let recursiveTrees = [];
let rocket;
let cloud;
let flagpole;
let collectables;
let canyons;
let mountains;
let platforms;
let enemies = [];

let cloudGraphics;
let parallaxStarsGraphics;
let parallaxMountainsGraphics;
let recursiveTreeGraphics;

let cloudOffset = 0;

// Function to initialize variables and environment
function setup() {
	createCanvas(1024, 576);
	angleMode(DEGREES);

	// Initialize main game variables
	floorPos_y = height * 3 / 4;
	lives = 3;
	game_score = 0;

	// Initalize graphics layers
	parallaxStarsGraphics = createGraphics(1024, 150);
	parallaxMountainsGraphics = createGraphics(3000, 350);
	recursiveTreeGraphics = createGraphics(300, 560);
	cloudGraphics = createGraphics(6000, floorPos_y);

	// Initialize game objects
	cloud = new Cloud();
	stars = new Stars();
	backgroundMountains = new BackgroundMountains();
	scenery = new Scenery(floorPos_y);
	rocket = new Rocket(350, floorPos_y);
	flagpole = new Flagpole(4600, floorPos_y);

	// Initialize repeateble game objects
	platforms = [
		new Platform(930, floorPos_y - 70, 100, 50),
		new Platform(1140, floorPos_y - 150, 100, 0),
		new Platform(2200, floorPos_y - 70, 200, 0),
		new Platform(3000, floorPos_y - 70, 200, 0),
		new Platform(3200, floorPos_y - 140, 200, 0),
		new Platform(3500, floorPos_y - 210, 300, 0),
		new Platform(3800, floorPos_y - 140, 200, 0),
		new Platform(4000, floorPos_y - 70, 200, 0),
	];
	recursiveTrees = [
		{ x: width / 2 + 100, y: floorPos_y },
		{ x: 1500, y: floorPos_y },
		{ x: 2600, y: floorPos_y },
		{ x: 3500, y: floorPos_y - 210 },
		{ x: 4850, y: floorPos_y },
	];
	canyons = [
		new Canyon(-100, floorPos_y, 250, height - floorPos_y),
		new Canyon(800, floorPos_y, 250, height - floorPos_y),
		new Canyon(1600, floorPos_y, 200, height - floorPos_y),
		new Canyon(2000, floorPos_y, 400, height - floorPos_y),
		new Canyon(2800, floorPos_y, 1400, height - floorPos_y)
	];
	mountains = [new Mountain(200, floorPos_y, 200, 200)];

	// Render game objects to graphic layers
	stars.renderTo(parallaxStarsGraphics);
	backgroundMountains.renderTo(parallaxMountainsGraphics);
	new RecursiveTree(recursiveTreeGraphics).render();
	cloud.renderTo(cloudGraphics);

	// Start the game
	startGame();
}

// function to draw the scenery and character
function draw() {
	push();

	scenery.drawStatic();

	push();
	translate(cloudOffset, 0);
	image(cloudGraphics, -3000, 0);
	cloudOffset += 0.08;
	pop();

	push();
	translate(-character.x * 0.05, 0)
	image(parallaxStarsGraphics, 0, 0);
	pop();

	push();
	translate(-character.x * 0.2, 0)
	image(parallaxMountainsGraphics, -400, floorPos_y - BACKGROUND_MOUNTAINS_HEIGHT)
	pop();

	// update camera position
	updateCameraPosition();

	// draw trees
	for (let i = 0; i < recursiveTrees.length; i++) {
		const tree = recursiveTrees[i];
		if (tree.x + 140 >= character.x - width / 2 && tree.x - 140 <= character.x + width / 2) {
			image(recursiveTreeGraphics, tree.x - recursiveTreeGraphics.width / 2, tree.y - recursiveTreeGraphics.height / 2);
		}
	}

	rocket.render();

	// draw the mountains
	// for (let i = 0; i < mountains.length; i++) {
	// 	mountains[i].draw();
	// }

	// draw the platforms
	for (let i = 0; i < platforms.length; i++) {
		platforms[i].move();
		platforms[i].draw();
	}

	// draw the canyon
	for (let i = 0; i < canyons.length; i++) {
		canyons[i].draw();
		checkCanyon(canyons[i]);
	}

	// draw collectable
	// for (let i = 0; i < collectables.length; i++) {
	// 	drawCollectable(collectables[i]);
	// }

	// draw flagpole
	flagpole.draw();

	// draw the game character
	character.move();
	character.draw();

	enemies.map(enemy => {
		if (!enemy.isEliminated) {
			if (blaster.bullet && abs(blaster.bullet.x - enemy.x) <= 10) {
				enemy.isEliminated = true;
				blaster.bullet = null;
			}

			enemy.move();
			enemy.render();
		}
	});

	blaster.move();
	if (blaster.isFound) {
		if (character.isLeft) {
			blaster.x = character.x - 25;
			blaster.y = character.y - 35;
			blaster.blasterDirection = BLASTER_DIRECTIONS.left;
		} else if (character.isRight) {
			blaster.x = character.x + 27;
			blaster.y = character.y - 35;
			blaster.blasterDirection = BLASTER_DIRECTIONS.right;
		} else if (!character.isRight && !character.isLeft && !character.isFalling && !character.isPlummeting) {
			blaster.x = character.x + 17;
			blaster.y = character.y - 26;
			blaster.blasterDirection = BLASTER_DIRECTIONS.down;
		} else if (!character.isRight && !character.isLeft && character.isFalling && !character.isPlummeting) {
			blaster.x = character.x + 24;
			blaster.y = character.y - 30;
			blaster.blasterDirection = BLASTER_DIRECTIONS.down;
		} else if (character.isPlummeting) {
			blaster.blasterDirection = BLASTER_DIRECTIONS.fallingDown;
		}
	}
	blaster.draw();

	pop()

	push();
	stroke(220);
	fill(120, 120, 120, 180)
	rect(10, 10, 125, 110, 10);

	fill(255)
	textFont('Courier New', 20);

	let fps = parseInt(frameRate());
	text(`FPS ${fps}`, 30, 40);

	text(`SCORE ${game_score}`, 30, 70);
	text(`LIVES ${lives}`, 30, 100);

	pop();


	//A helpful mouse pointer
	push();
	fill(0);
	noStroke();
	text(mouseX + "," + mouseY, mouseX, mouseY);
	pop();

	///////////INTERACTION CODE//////////

	controlCharacterFall();
	restrictCharacterMovement();
	checkPlayerDie();

	// find collectible if the character is close to it
	// for (let i = 0; i < collectables.length; i++) {
	// 	checkCollectable(collectables[i]);
	// }

	checkBlaster();

	if (!flagpole.isReached) {
		checkFlagpole();
	}

	// if (lives < 1) {
	// 	fill(136, 8, 8)
	// 	textStyle(BOLD);
	// 	textSize(30);
	// 	push()
	// 	textAlign(CENTER)
	// 	text(`Game over. Press space to continue.`, width / 2, height / 2)
	// 	pop()

	// 	return;
	// }

	// if (flagpole.isReached) {
	// 	fill(255, 215, 0)

	// 	push()
	// 	textStyle(BOLD);
	// 	textSize(30);
	// 	textAlign(CENTER)
	// 	text(`Level complete. Press space to continue.`, width / 2, height / 2)
	// 	pop()

	// 	return;
	// }
}

// function to handle key press
function keyPressed() {
	if (character.isPlummeting) return; // disable input handling when plummeting 

	if (key === "a" && character.x > rocket.x + 130) {
		character.isLeft = true;
	} else if (key === "d") {
		character.isRight = true;
	} else if (keyCode === SPACE_KEY && !character.isFalling) {
		character.isJumping = true;
	} else if (key === "w" && blaster.isFound) {
		blaster.shoot();
	}
}

// function to handle key release
function keyReleased() {
	if (key === "a") {
		character.isLeft = false;
	} else if (key === "d") {
		character.isRight = false;
	}
}

function controlCharacterFall() {
	if (character.isJumping && character.jumpHeight >= JUMP_HEIGHT) {
		character.isFalling = true;
		character.isJumping = false;
	} else if (character.isFalling && character.y === floorPos_y) {
		character.jumpHeight = 0;
		character.isFalling = false;
	}

	for (let i = 0; i < platforms.length; i++) {
		const platform = platforms[i];

		if (character.isFalling && character.y === platform.y && abs(character.x - platform.x) <= platform.width / 2 + 10) {
			character.jumpHeight = 0;
			character.isFalling = false;
		} else if (character.y === platform.y && abs(character.x - platform.x) > platform.width / 2 + 10 && abs(character.x - platform.x) < platform.width && !character.isJumping && !character.isFalling) {
			character.isFalling = true;
		}
	}
}

function restrictCharacterMovement() {
	if (character.x <= rocket.x + 130) {
		character.isLeft = false;
	}
}

function checkCanyon(t_canyon) {
	if (character.x - 40 > t_canyon.x && character.x + 40 < t_canyon.x + t_canyon.width && character.y == floorPos_y) {
		character.isPlummeting = true;
		character.isLeft = false;
		character.isRight = false;
	}
}

function updateCameraPosition() {
	cameraPosX = character.x - width / 2;
	translate(-cameraPosX, 0)
}

function checkCollectable(t_collectable) {
	if (dist(character.x, character.y, t_collectable.x_pos, t_collectable.y_pos) <= 45 && !t_collectable.isFound) {
		t_collectable.isFound = true;
		game_score++;
	}
}

function checkBlaster() {
	if (!blaster.isFound && abs(character.x - blaster.x) <= 50 && abs(character.y - blaster.y) <= 40) {
		blaster.isFound = true;
		character.hasFoundBlaster = true;
	}
}

function drawCollectable(t_collectable) {
	if (t_collectable.isFound === false) {
		fill(233, 184, 36);
		ellipse(t_collectable.x_pos, t_collectable.y_pos, t_collectable.size, t_collectable.size);
		noStroke();
		fill(238, 147, 34)
		ellipse(t_collectable.x_pos, t_collectable.y_pos, 0.7 * t_collectable.size, 0.7 * t_collectable.size);
		fill(255)
		text("B", t_collectable.x_pos - 6, t_collectable.y_pos + 6);
	}
}

function checkFlagpole() {
	var distance = abs(character.x - flagpole.x);
	if (distance < 15) {
		flagpole.isReached = true;
	}
}

function checkPlayerDie() {
	if (character.y > height + 100) {
		lives -= 1;

		if (lives > 0) {
			startGame();
		}
	}

	// enemies.map((enemy, i) => {
	// 	if (
	// 		!enemy.isEliminated &&
	// 		abs(character.x - enemy.x) <= 30 &&
	// 		character.y - enemy.y <= 0 && character.y - enemy.y >= -70
	// 	) {
	// 		lives -= 1;
	// 		if (lives > 0) {
	// 			startGame();
	// 		}
	// 	}
	// })
}

function startGame() {
	character = new Character(width / 2, floorPos_y);

	// Initialize pickable and killable objects
	blaster = new Blaster(1400, character.y - 40);
	enemies = [
		new Enemy(1300, floorPos_y, 250, -1),
		new Enemy(1900, floorPos_y, 100, 1),
		new Enemy(2200, floorPos_y - 70, 90, -1),
		new Enemy(3500, floorPos_y - 210, 100, 1),
		new Enemy(4400, floorPos_y, 100, 1),
	];
	collectables = [
		{ x_pos: 255, y_pos: 350, size: 35, isFound: false },
		{ x_pos: 800, y_pos: 390, size: 35, isFound: false }
	];
}