/*

The Final Game Project

*/

/////////// INITIALIZE VARIABLES //////////
const SPACE_KEY = 32;

let cameraPosX = 0;

let floorPos_y;

let canyons;
let trees_x;
let clouds;
let mountains;
let collectables;
let flagpole;

let game_score;
let lives;

let character;
let scenery;
let backgroundMountains;
let recursiveTrees = [];
let rocket;

let parallaxStarsGraphics;
let parallaxMountainsGraphics;
let recursiveTreeGraphics;

// function to initialize variables and environment
function setup() {
	createCanvas(1024, 576);
	angleMode(DEGREES)

	floorPos_y = height * 3 / 4;
	lives = 3;

	// frameRate(60);

	parallaxStarsGraphics = createGraphics(1024, 150);
	parallaxMountainsGraphics = createGraphics(3000, 350);
	recursiveTreeGraphics = createGraphics(300, 560);

	stars = new Stars();
	backgroundMountains = new BackgroundMountains();
	scenery = new Scenery(floorPos_y);
	mountains = [new Mountain(200, floorPos_y, 200, 200)];
	rocket = new Rocket(250, floorPos_y);
	const recursiveTree = new RecursiveTree(recursiveTreeGraphics);
	recursiveTrees = [{ x: width / 2, y: floorPos_y }];
	canyons = [new Canyon(800, floorPos_y, 300, height - floorPos_y)]

	stars.renderTo(parallaxStarsGraphics);
	backgroundMountains.renderTo(parallaxMountainsGraphics);
	recursiveTree.render();

	startGame();
}

// function to draw the scenery and character
function draw() {
	push();

	scenery.drawStatic();

	let fps = parseInt(frameRate());
	textSize(20)
	text(fps, 50, 50);

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

	// draw clouds
	// drawClouds()

	// draw the mountains
	// for (let i = 0; i < mountains.length; i++) {
	// 	mountains[i].draw();
	// }

	// draw the canyon
	for (let i = 0; i < canyons.length; i++) {
		canyons[i].draw();
		checkCanyon(canyons[i]);
	}

	// draw collectable
	// for (let i = 0; i < collectables.length; i++) {
	// 	drawCollectable(collectables[i]);
	// }

	// draw the game character
	character.move();
	character.draw();

	// draw flagpole
	renderFlagpole();

	pop()

	///////////INTERACTION CODE//////////

	controlCharacterFall();
	restrictCharacterMovement();
	checkPlayerDie();

	// find collectible if the character is close to it
	for (let i = 0; i < collectables.length; i++) {
		checkCollectable(collectables[i]);
	}

	// if (!flagpole.isReached) {
	// 	checkFlagpole();
	// }

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

	//A helpful mouse pointer
	push();
	fill(0);
	noStroke();
	text(mouseX + "," + mouseY, mouseX, mouseY);
	pop();
}

// function to handle key press
function keyPressed() {
	// -------------- start customization for running using shift
	if (character.isPlummeting) return; // disable input handling when plummeting 

	if (keyCode === LEFT_ARROW && character.x > rocket.x + 130) {
		character.isLeft = true;
	} else if (keyCode === RIGHT_ARROW) {
		character.isRight = true;
	} else if (keyCode === SHIFT) {
		character.isShift = true;
	} else if (keyCode === SPACE_KEY && !character.isFalling) {
		character.isJumping = true;
	}
	// -------------- end customization for running using shift
}

// function to handle key release
function keyReleased() {
	if (keyCode === LEFT_ARROW) {
		character.isLeft = false;
	} else if (keyCode === RIGHT_ARROW) {
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

function drawClouds() {
	for (var i = 0; i < clouds.length; i++) {
		var cloud = clouds[i];

		noStroke();
		fill(221, 242, 253);
		ellipse(cloud.x_pos - 20, cloud.y_pos - 20, 50, 50);
		ellipse(cloud.x_pos + 30, cloud.y_pos - 20, 60, 60);
		ellipse(cloud.x_pos + 60, cloud.y_pos + 5, 50, 50);
		ellipse(cloud.x_pos - 60, cloud.y_pos, 60, 60);
		ellipse(cloud.x_pos - 30, cloud.y_pos + 25, 50, 50);
		ellipse(cloud.x_pos + 20, cloud.y_pos + 25, 50, 50);
		ellipse(cloud.x_pos + 10, cloud.y_pos + 10, 60, 60);
	}
}

function drawTrees() {
	for (var i = 0; i < trees_x.length; i++) {
		var treePos_x = trees_x[i];

		fill(139, 69, 19);
		beginShape();
		vertex(treePos_x, floorPos_y);
		vertex(treePos_x + 20, floorPos_y);
		vertex(treePos_x + 20, floorPos_y - 125);
		vertex(treePos_x, floorPos_y - 125);
		endShape();

		beginShape()
		vertex(treePos_x, floorPos_y - 55)
		vertex(treePos_x - 30, floorPos_y - 105);
		vertex(treePos_x, floorPos_y - 70);
		endShape();

		beginShape()
		vertex(treePos_x + 20, floorPos_y - 55)
		vertex(treePos_x + 50, floorPos_y - 105);
		vertex(treePos_x + 20, floorPos_y - 70);
		endShape();

		fill(55, 146, 55)
		ellipse(treePos_x + 10, floorPos_y - 145, 90, 90);
		ellipse(treePos_x - 30, floorPos_y - 125, 70, 70);
		ellipse(treePos_x + 50, floorPos_y - 125, 60, 60);
	}
}

function checkCollectable(t_collectable) {
	if (dist(character.x, character.y, t_collectable.x_pos, t_collectable.y_pos) <= 45 && t_collectable.isFound == false) {
		t_collectable.isFound = true;
		game_score++;
	}
}

function drawCollectable(t_collectable) {
	if (t_collectable.isFound == false) {
		fill(233, 184, 36);
		ellipse(t_collectable.x_pos, t_collectable.y_pos, t_collectable.size, t_collectable.size);
		noStroke();
		fill(238, 147, 34)
		ellipse(t_collectable.x_pos, t_collectable.y_pos, 0.7 * t_collectable.size, 0.7 * t_collectable.size);
		fill(255)
		text("B", t_collectable.x_pos - 6, t_collectable.y_pos + 6);
	}
}

function drawCanyon(t_canyon) {
	fill(148, 84, 36);
	rect(t_canyon.x_pos, floorPos_y, t_canyon.width, height)
}

function drawScore(t_score) {
	fill(255, 215, 0)
	textStyle(BOLD);
	textSize(16);
	text(`Game score: ${t_score}`, 50, 50)
}

function drawLifeScore() {
	fill(170, 74, 68)
	for (var i = 0; i < lives; i++) {
		ellipse(65 + i * 40, 100, 30, 30);
	}
};

function renderFlagpole() {
	push();
	strokeWeight(5);
	stroke(180);
	line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 250);

	fill(255, 0, 255);
	noStroke();

	if (flagpole.isReached) {
		rect(flagpole.x_pos, floorPos_y - 250, 50, 50);
	} else {
		rect(flagpole.x_pos, floorPos_y - 50, 50, 50);
	}
	pop();
}

function checkFlagpole() {
	var distance = abs(character.x - flagpole.x_pos);
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
}

function startGame() {
	character = new Character(width / 2, floorPos_y);

	// initialize scenery
	collectables = [{ x_pos: 255, y_pos: 350, size: 35, isFound: false }, { x_pos: 800, y_pos: 390, size: 35, isFound: false }, { x_pos: 1000, y_pos: 390, size: 35, isFound: false }, { x_pos: -800, y_pos: 390, size: 35, isFound: false }]
	trees_x = [100, 500, 800, 1200];
	clouds = [{ x_pos: -200, y_pos: 200 }, { x_pos: 200, y_pos: 100 }, { x_pos: 500, y_pos: 100 }, { x_pos: 800, y_pos: 100 }, { x_pos: 1000, y_pos: 100 }, { x_pos: 1200, y_pos: 100 }]
	flagpole = { isReached: false, x_pos: 1200 }

	game_score = 0;
}