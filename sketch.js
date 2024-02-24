/*

The Game Project midterm

*/

/////////// INITIALIZE VARIABLES //////////
var cameraPosX = 0;

var gameChar_x;
var gameChar_y;
var floorPos_y;

var isLeft = false;
var isRight = false;
var isFalling = false;
var isPlummeting = false;
var isShift = false;

var canyons;
var trees_x;
var clouds;
var mountains;
var collectables;
var flagpole;

var game_score;
var lives;

// function to initialize variables and environment
function setup() {
	createCanvas(1024, 576);

	angleMode(DEGREES)

	floorPos_y = height * 3 / 4;
	lives = 3;

	startGame();
}

// function to draw the scenery and character
function draw() {
	///////////DRAWING CODE//////////
	background(100, 155, 255); //fill the sky blue

	noStroke();
	fill(0, 155, 0);
	//draw some green ground
	rect(0, floorPos_y, width, height - floorPos_y);

	// draw life score
	drawLifeScore();

	// draw score
	drawScore(game_score);

	push();

	// update camera position
	updateCameraPosition();

	// draw clouds
	drawClouds()

	// draw the mountains
	drawMountains()

	// draw the canyon
	for (let i = 0; i < canyons.length; i++) {
		drawCanyon(canyons[i]);
		checkCanyon(canyons[i]);
	}

	// draw trees
	drawTrees();

	// draw collectable
	for (let i = 0; i < collectables.length; i++) {
		drawCollectable(collectables[i]);
	}

	// draw the game character
	drawCharacter()
	checkPlayerDie();

	// draw flagpole
	renderFlagpole();

	if (!flagpole.isReached) {
		checkFlagpole();
	}

	pop()

	if (lives < 1) {
		fill(136, 8, 8)
		textStyle(BOLD);
		textSize(30);
		push()
		textAlign(CENTER)
		text(`Game over. Press space to continue.`, width / 2, height / 2)
		pop()

		return;
	}

	if (flagpole.isReached) {
		fill(255, 215, 0)

		push()
		textStyle(BOLD);
		textSize(30);
		textAlign(CENTER)
		text(`Level complete. Press space to continue.`, width / 2, height / 2)
		pop()

		return;
	}

	///////////INTERACTION CODE//////////

	// set isFalling depending on current game character position
	checkFalling();

	// changing y of game character when plummeting or falling
	updateCharacterY();

	// -------------- start customization for running using shift

	// handle character's horizontal movement
	updateCharacterX();

	// -------------- end customization for running using shift

	// find collectible if the character is close to it
	for (let i = 0; i < collectables.length; i++) {
		checkCollectable(collectables[i]);
	}
}

// function to handle key press
function keyPressed() {
	if (isPlummeting) return;


	// -------------- start customization for running using shift
	if (key === "ArrowLeft") {
		isLeft = true;
	} else if (key === "ArrowRight") {
		isRight = true;
	} else if (key === "Shift" && !isFalling) {
		isShift = true;
	} else if (keyCode === 32 && !isFalling) { // handle space bar press
		gameChar_y -= 100;
	}
	// -------------- end customization for running using shift
}

// function to handle key release
function keyReleased() {
	// -------------- start customization for running using shift
	if (key === "ArrowLeft") {
		isLeft = false;
	} else if (key === "ArrowRight") {
		isRight = false;
	} else if (key === "Shift") {
		isShift = false;
	}
	// -------------- end customization for running using shift
}

function updateCharacterY() {
	if (isPlummeting) {
		gameChar_y += 3;
	} else if (isFalling) {
		gameChar_y += 2;
	}
}

function updateCharacterX() {
	// -------------- start customization for running using shift
	// determine velocity based on isShift
	var velocity = isShift ? 1.5 : 1;
	// -------------- end customization for running using shift

	if (isLeft && !isPlummeting) {
		gameChar_x -= 3 * velocity;
	} else if (isRight && !isPlummeting) {
		gameChar_x += 3 * velocity;
	} else if (isRight && !isPlummeting) {
		gameChar_x += 3 * velocity;
	}
}

function checkFalling() {
	if (gameChar_y < floorPos_y) {
		isFalling = true;
	} else {
		isFalling = false;
	}
}

function drawCharacter() {
	if (isLeft && isFalling) {
		// jumping-left code
		strokeWeight(3);
		stroke(0);
		fill(246, 244, 88);
		rect(gameChar_x + 3, gameChar_y - 27 + 7 - 10, 10, 20, 3);
		push()
		translate(gameChar_x - 13, gameChar_y - 35)
		rotate(1);
		rect(0, 0, 10, 20, 3);
		pop()
		rect(gameChar_x + 12, gameChar_y - 50 + 7 - 10, 10, 25, 2);
		ellipse(gameChar_x - 2, gameChar_y - 40 + 7 - 10, 33, 45);

		fill(149, 202, 218)
		ellipse(gameChar_x - 10 - 2, gameChar_y - 45 + 5 - 10, 20, 15);

		noStroke()
		fill(255)
		ellipse(gameChar_x - 14, gameChar_y - 41 - 10, 10, 5);

		strokeWeight(1);
	}
	else if (isRight && isFalling) {
		// jumping-right code
		strokeWeight(3);
		stroke(0);
		fill(246, 244, 88);
		rect(gameChar_x - 13 + 2, gameChar_y - 27 + 7 - 10, 10, 20, 3);
		push()
		translate(gameChar_x + 7, gameChar_y - 24)
		rotate(-1);
		rect(0, 0, 10, 20, 3);
		pop()
		rect(gameChar_x - 23 + 2, gameChar_y - 50 + 7 - 10, 10, 25, 2);
		ellipse(gameChar_x + 2, gameChar_y - 40 + 7 - 10, 33, 45);

		fill(149, 202, 218)
		ellipse(gameChar_x + 10 + 2, gameChar_y - 45 + 5 - 10, 20, 15);

		noStroke()
		fill(255)
		ellipse(gameChar_x + 14, gameChar_y - 41 - 10, 10, 5);

		strokeWeight(1);
	}
	else if (isLeft) {
		// walking left code
		strokeWeight(3);
		stroke(0);
		fill(246, 244, 88);
		rect(gameChar_x + 3, gameChar_y - 27 + 7, 10, 20, 3);
		push()
		translate(gameChar_x - 13, gameChar_y - 27 + 7 - 3)
		rotate(1);
		rect(0, 0, 10, 20, 3);
		pop()
		rect(gameChar_x + 12, gameChar_y - 50 + 7, 10, 25, 2);
		ellipse(gameChar_x - 2, gameChar_y - 40 + 7, 33, 45);

		fill(149, 202, 218)
		ellipse(gameChar_x - 10 - 2, gameChar_y - 45 + 5, 20, 15);

		noStroke()
		fill(255)
		ellipse(gameChar_x - 14, gameChar_y - 41, 10, 5);

		strokeWeight(1);
	}
	else if (isRight) {
		// walking right code
		strokeWeight(3);
		stroke(0);
		fill(246, 244, 88);
		rect(gameChar_x - 13 + 2, gameChar_y - 27 + 7, 10, 20, 3);
		push()
		translate(gameChar_x + 10, gameChar_y - 27 + 10)
		rotate(-1);
		rect(0, 0, 10, 20, 3);
		pop()
		rect(gameChar_x - 23 + 2, gameChar_y - 50 + 7, 10, 25, 2);
		ellipse(gameChar_x + 2, gameChar_y - 40 + 7, 33, 45);

		fill(149, 202, 218)
		ellipse(gameChar_x + 10 + 2, gameChar_y - 45 + 5, 20, 15);

		noStroke()
		fill(255)
		ellipse(gameChar_x + 14, gameChar_y - 41, 10, 5);

		strokeWeight(1);
	}
	else if (isFalling || isPlummeting) {
		// jumping facing forwards code
		strokeWeight(3);
		stroke(0);
		fill(246, 244, 88);
		push()
		translate(gameChar_x - 7, gameChar_y - 27 + 7 - 3)
		rotate(1);
		rect(0, 0, 10, 20, 3);
		pop()
		push()
		translate(gameChar_x + 7, gameChar_y - 27 + 10)
		rotate(-1);
		rect(0, 0, 10, 20, 3);
		pop()
		ellipse(gameChar_x + 2, gameChar_y - 40 + 7, 33, 45);

		fill(149, 202, 218)
		ellipse(gameChar_x + 3, gameChar_y - 45 + 5, 20, 15);

		noStroke()
		fill(255)
		ellipse(gameChar_x + 4, gameChar_y - 41, 10, 5);

		strokeWeight(1);
	}
	else {
		// standing front facing code
		fill(255)
		stroke(0)
		rect(gameChar_x - 11, gameChar_y - 87, 0.1, 50)
		rect(gameChar_x - 17.5, gameChar_y - 52, 35, 30, 5);

		// Left arm
		noStroke()
		fill(244, 60, 31)
		push()
		translate(gameChar_x - 15, gameChar_y - 35)
		rotate(20)
		ellipse(0, 0, 7, 30)
		pop()

		// Right arm
		push()
		translate(gameChar_x + 15, gameChar_y - 35)
		rotate(-20)
		ellipse(0, 0, 7, 30)
		pop()

		// Body and legs
		rect(gameChar_x - 11, gameChar_y - 31, 8, 33, 5)
		rect(gameChar_x + 4, gameChar_y - 31, 8, 33, 5)
		rect(gameChar_x - 11, gameChar_y - 49, 23, 30, 5)

		// Helmet
		fill(255)
		stroke(0)
		ellipse(gameChar_x, gameChar_y - 60, 30, 30);
		fill(0)
		ellipse(gameChar_x, gameChar_y - 59, 20, 20);

		// Sun reflection on helmet
		fill(255)
		noStroke()
		push()
		translate(gameChar_x + 5, gameChar_y - 63)
		rotate(150)
		ellipse(0, 0, 3, 5)
		pop()

		// Ukrainian flag
		fill(1, 87, 183)
		rect(gameChar_x + 1, gameChar_y - 42, 8, 3)
		fill(255, 215, 1)
		rect(gameChar_x + 1, gameChar_y - 39, 8, 3)
	}
}

function updateCameraPosition() {
	cameraPosX = gameChar_x - width / 2;
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

function drawMountains() {
	for (var i = 0; i < mountains.length; i++) {
		const mountain = mountains[i];

		fill(97, 103, 122);
		triangle(mountain.x_pos, mountain.y_pos, mountain.x_pos + mountain.width, mountain.y_pos, (2 * mountain.x_pos + mountain.width) / 2, mountain.y_pos - mountain.height);
		fill(255)
		push()
		translate((2 * mountain.x_pos + mountain.width) / 2 * 0.8, (mountain.y_pos - mountain.height) * 0.8)
		scale(0.2)
		triangle(mountain.x_pos, mountain.y_pos, mountain.x_pos + mountain.width, mountain.y_pos, (2 * mountain.x_pos + mountain.width) / 2, mountain.y_pos - mountain.height);
		translate(0, 0)
		pop()
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
	if (dist(gameChar_x, gameChar_y, t_collectable.x_pos, t_collectable.y_pos) <= 45 && t_collectable.isFound == false) {
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

function checkCanyon(t_canyon) {
	if (gameChar_x - 30 > t_canyon.x_pos && gameChar_x + 30 < t_canyon.x_pos + t_canyon.width && gameChar_y == floorPos_y) {
		isPlummeting = true;
		isLeft = false;
		isRight = false;
	}
}

function drawCanyon(t_canyon) {
	fill(92, 73, 73);
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
	var distance = abs(gameChar_x - flagpole.x_pos);
	if (distance < 15) {
		flagpole.isReached = true;
	}
}

function checkPlayerDie() {
	if (gameChar_y > height + 100) {
		lives -= 1;

		if (lives > 0) {
			startGame();
		}
	}
}

function startGame() {
	gameChar_x = width / 2;
	gameChar_y = floorPos_y;

	// initialize scenery
	canyons = [{ x_pos: -200, width: 100 }, { x_pos: 200, width: 100 }, { x_pos: 600, width: 100 }]
	collectables = [{ x_pos: 255, y_pos: 350, size: 35, isFound: false }, { x_pos: 800, y_pos: 390, size: 35, isFound: false }, { x_pos: 1000, y_pos: 390, size: 35, isFound: false }, { x_pos: -800, y_pos: 390, size: 35, isFound: false }]
	trees_x = [100, 500, 800, 1200];
	clouds = [{ x_pos: -200, y_pos: 200 }, { x_pos: 200, y_pos: 100 }, { x_pos: 500, y_pos: 100 }, { x_pos: 800, y_pos: 100 }, { x_pos: 1000, y_pos: 100 }, { x_pos: 1200, y_pos: 100 }]
	mountains = [{ x_pos: 500, y_pos: floorPos_y, width: 300, height: 200 }, { x_pos: 600, y_pos: floorPos_y, width: 300, height: 200 }, { x_pos: -100, floorPos_y: 435, width: 300, height: 200 }];
	flagpole = { isReached: false, x_pos: 1200 }

	game_score = 0;

	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;
	isShift = false;
}