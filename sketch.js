/*

The Final Game Project

*/

/////////// INITIALIZE VARIABLES //////////
const SPACE_KEY = 32;

// initialize main game variables
let cameraPosX = 0;
let floorPos_y;
let gameScore;
let lives;
let cloudOffset = 0;

// initialize game objects variables
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
let platforms;
let enemies = [];

// initialize graphics variables
let cloudGraphics;
let parallaxStarsGraphics;
let parallaxMountainsGraphics;
let recursiveTreeGraphics;

// initialize sound variables
let jumpSound;
let blasterSound;
let collectableSound;
let backgroundMusic;
let plummetSound;
let enemyDieSound;

// Preload game sfx
function preload() {
	soundFormats('mp3', 'wav');

	blasterSound = loadSound('assets/blaster.wav');

	collectableSound = loadSound('assets/collectable.wav');
	collectableSound.setVolume(0.5);

	jumpSound = loadSound('assets/jump.wav');

	plummetSound = loadSound('assets/plummet1.wav');
	plummetSound.setVolume(0.5);

	enemyDieSound = loadSound('assets/enemy-die.wav');

	backgroundMusic = loadSound('assets/background-music.mp3');
	backgroundMusic.setVolume(0.1);
}

// Function to initialize variables and environment
function setup() {
	createCanvas(1024, 576);
	angleMode(DEGREES);

	// Initialize main game variables
	floorPos_y = height * 3 / 4;
	lives = 3;
	gameScore = 0;

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

	// Render game objects to graphic layers
	stars.renderTo(parallaxStarsGraphics);
	backgroundMountains.renderTo(parallaxMountainsGraphics);
	new RecursiveTree(recursiveTreeGraphics).render();
	cloud.renderTo(cloudGraphics);

	// Loop background music
	backgroundMusic.loop();

	// Start the game
	startGame();
}

function startGame() {
	character = new Character(width / 2, floorPos_y);
	gameScore = 0;
	flagpole.isReached = false;

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
		new Collectable(930, floorPos_y - 200, 25),
		new Collectable(1140, floorPos_y - 180, 25),
		new Collectable(1700, floorPos_y - 100, 25),
		new Collectable(2200, floorPos_y - 200, 25),
		new Collectable(2600, floorPos_y - 120, 25),
		new Collectable(3000, floorPos_y - 120, 25),
		new Collectable(3200, floorPos_y - 180, 25),
		new Collectable(3800, floorPos_y - 270, 25),
		new Collectable(4000, floorPos_y - 220, 25),
	];
}

// function to draw the scenery and character
function draw() {
	push();

	scenery.drawStatic();

	// Draw clouds and offset them
	push();
	translate(cloudOffset, 0);
	image(cloudGraphics, -3000, 0);
	cloudOffset += 0.08;
	pop();

	// Draw parallax stars and offset them relative to character x position
	push();
	translate(-character.x * 0.05, 0)
	image(parallaxStarsGraphics, 0, 0);
	pop();

	// Draw parallax mountains and offset them relative to character x position
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

	// Render rocket
	rocket.render();

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
	for (let i = 0; i < collectables.length; i++) {
		const collectable = collectables[i];
		if (!collectable.isFound) {
			checkCollectable(collectable);

			collectable.move();
			collectable.draw();
		}
	}

	// draw flagpole
	flagpole.draw();

	// draw the game character
	character.move();
	character.draw();

	// Draw enemies
	enemies.map(enemy => {
		if (!enemy.isEliminated) {
			checkEnemyDie(enemy);

			enemy.move();
			enemy.render();
		}
	});

	// Draw blaster
	blaster.move();
	if (blaster.isFound) {
		updateBlasterPosition();
	}
	blaster.draw();

	pop()

	// Draw game statistics
	drawGameStats();

	// Show lose message when no lives left
	if (lives === 0) {
		showLoseText();
	}

	// Show win message when flagpole is reached
	if (flagpole.isReached) {
		showWinText();
	}

	///////////INTERACTION CODE//////////

	// Character checks
	controlCharacterFall();
	restrictCharacterMovement();
	checkPlayerDie();

	// Check blaster
	checkBlaster();

	// Check flagpole
	if (!flagpole.isReached) {
		checkFlagpole();
	}
}

// function to handle key press
function keyPressed() {
	if ((lives === 0 || flagpole.isReached) && keyCode === SPACE_KEY) {
		lives = 3;
		startGame();
		return;
	}

	if (character.isPlummeting || lives === 0 || flagpole.isReached) return; // disable input handling when plummeting or dead

	if (key === "a" && character.x > rocket.x + 130) {
		character.isLeft = true;
	} else if (key === "d") {
		character.isRight = true;
	} else if (keyCode === SPACE_KEY && !character.isFalling) {
		character.isJumping = true;
		jumpSound.play();
	} else if (key === "w" && blaster.isFound && !blaster.bullet && blaster.blasterDirection !== BLASTER_DIRECTIONS.down) {
		blaster.shoot();
		blasterSound.play();
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

// Function to update camera position
function updateCameraPosition() {
	cameraPosX = character.x - width / 2;
	translate(-cameraPosX, 0)
}

// Function to control character fall
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

// Function to restrict character movement
function restrictCharacterMovement() {
	if (character.x <= rocket.x + 130) {
		character.isLeft = false;
	}
}

// Function to check player die
function checkPlayerDie() {
	if (character.y > height + 100) {
		if (lives >= 1) {
			plummetSound.play();
			lives -= 1;
		}

		if (lives > 0) {
			startGame();
		}
	}

	enemies.map((enemy, i) => {
		if (
			!enemy.isEliminated &&
			abs(character.x - enemy.x) <= 30 &&
			character.y - enemy.y <= 0 && character.y - enemy.y >= -70
		) {
			if (lives >= 1) {
				lives -= 1;
			}

			if (lives > 0) {
				startGame();
			}
		}
	});
}

// Function to check canyon
function checkCanyon(t_canyon) {
	if (character.x - 40 > t_canyon.x && character.x + 40 < t_canyon.x + t_canyon.width && character.y == floorPos_y) {
		character.isPlummeting = true;
		character.isLeft = false;
		character.isRight = false;
	}
}

// Function to check collectable
function checkCollectable(collectable) {
	if (dist(character.x, character.y, collectable.x, collectable.y) <= 50) {
		collectable.isFound = true;
		collectableSound.play();
		gameScore += 100;
	}
}

// Function to check enemy die
function checkEnemyDie(enemy) {
	if (blaster.bullet && dist(blaster.bullet.x, blaster.bullet.y, enemy.x, enemy.y) <= 80) {
		enemy.isEliminated = true;
		blaster.bullet = null;
		enemyDieSound.play();
		gameScore += 50;
	}
}


// function to check flagpole
function checkFlagpole() {
	var distance = abs(character.x - flagpole.x);
	if (distance < 15) {
		flagpole.isReached = true;
	}
}

// Function to draw game stats
function drawGameStats() {
	push();
	stroke(220);
	fill(120, 120, 120, 180)
	rect(10, 10, 220, 150, 10);
	rect(10, 85, 220, 1);

	fill(255)
	textFont('Courier New', 20);

	let fps = parseInt(frameRate());
	text(`FPS ${fps}`, width - 100, floorPos_y + 100);

	text(`SCORE ${gameScore}`, 30, 40);
	text(`LIVES ${lives}`, 30, 70);

	text(`MOVEMENT A, D`, 30, 110);
	text(`SHOOT BLASTER W`, 30, 140);

	pop();
}

// Function to show text when lost
function showLoseText() {
	push()
	rectMode(CENTER);

	stroke(220);
	fill(120, 120, 120, 180)
	rect(width / 2, height / 2, 860, 80, 10);

	noStroke();
	textAlign(CENTER, CENTER);
	fill(255)
	textSize(50);
	text("Game over. Press space to continue.", width / 2, height / 2);
	pop();
}

// Function to shiw text when won
function showWinText() {
	push()
	rectMode(CENTER);

	stroke(220);
	fill(120, 120, 120, 180)
	rect(width / 2, height / 2, 950, 80, 10);

	noStroke();
	textAlign(CENTER, CENTER);
	fill(255)
	textSize(50);
	text("Level complete. Press space to continue.", width / 2, height / 2);
	pop();
}

// Function to check blaster
function checkBlaster() {
	if (!blaster.isFound && dist(character.x, character.y, blaster.x, blaster.y) <= 50) {
		blaster.isFound = true;
		character.hasFoundBlaster = true;
	}
}

// Function to update blaster position relative to character state and movement
function updateBlasterPosition() {
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