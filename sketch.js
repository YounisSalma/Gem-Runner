/*

The Game Project 7 - Bring it all together

*/

var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;
var floor_length;
var show_canyon;
var game_gems;
var game_multiplier;
var lives;
var level;
var end_game;
var speed;
var bounce;
var death_sound;
var collectable_sound;
var shoot_sound;
var jump_sound;
var shooting;
var shot;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;

var clouds;
var mountains;
var cacti;
var mountains;
var canyons;
var collectables;

var cactus;
var cloud;
var mountain;
var canyon;
var collectable;
var jump;

function startGame() {
  // Initialising start variables
  gameChar_x = 250;
  gameChar_y = floorPos_y;
  floor_length = 6000 + width;
  show_canyon = true;
  show_waterfall = true;
  end_game = false;
  // Boolean variables to control the movement of the game character.
  isLeft = false;
  isRight = false;
  isFalling = false;
  isPlummeting = false;
  jump = false;

  // Variable to control the background scrolling.
  scrollPos = 0;

  // Variable to store the real position of the gameChar in the game world.
  gameChar_world_x = gameChar_x - scrollPos;

  // Initialise arrays of scenery objects.

  cacti = [];
  // Creating Cacti Object Array with for loop
  for (var i = 0; i < 20; i++) {
    cactus = {
      pos_x: random(300 + i * 300, 400 + i * 300),
      scale: random(1, 1.5),
      colour: color(random(25, 53), random(90, 130), random(0, 20)),
    };
    cacti.push(cactus);
  }

  trees = [];
  // Creating Trees Object Array with for loop
  for (var i = 0; i < 20; i++) {
    tree = {
      pos_x: random(300 + i * 300, 400 + i * 300),
      scale: random(1, 1.5),
      colour: color(random(25, 53), random(90, 130), random(0, 20)),
    };
    trees.push(tree);
  }

  fir_trees = [];
  // Creating Trees Object Array with for loop
  for (var i = 0; i < 20; i++) {
    fir = {
      pos_x: random(300 + i * 300, 400 + i * 300),
      colour: color(random(25, 53), random(90, 130), random(0, 20)),
    };
    fir_trees.push(fir);
  }

  clouds = [];
  // Creating Clouds Object Array with for loop
  for (var i = 0; i < 15; i++) {
    cloud = {
      pos_x: random(306000 + 400 * i, 400 + 400 * i),
      pos_y: random(50, 200),
      scale: random(1, 2.5),
    };
    clouds.push(cloud);
  }

  mountains = [];
  // Creating Mountains Object Array with for loop
  for (var i = 0; i < 12; i++) {
    mountain = {
      pos_x: random(300 + i * 500, 400 + i * 500),
      scale: random(1.25, 2),
      colour: color(random(150, 170), random(70, 100), random(5, 20)),
    };
    mountains.push(mountain);
  }

  canyons = [];
  // Creating Canyons Object Array with for loop
  for (var i = 0; i < 9; i++) {
    canyon = {
      pos_x: random(600 + i * 600, 700 + i * 600),
      scale: random(1, 1.5),
    };
    canyons.push(canyon);
  }

  waterfalls = [];
  // Creating Waterfalls Object Array with for loop
  for (var i = 0; i < 9; i++) {
    waterfall = {
      pos_x: random(600 + i * 600, 700 + i * 600),
      scale: random(1, 1.5),
    };
    waterfalls.push(waterfall);
  }

  collectables = [];
  // Creating Collectables Object Array with for loop
  for (var i = 0; i < 20; i++) {
    collectable = {
      pos_x: random(600 + i * 300, 700 + i * 300),
      isFound: false,
    };
    collectables.push(collectable);
  }

  monster_1 = [];
  // Creating Monster1 Object Array with for loop
  for (var i = 0; i < 10; i++) {
    monster = {
      pos_x: 600 + i * 500,
      initial_x: 600 + i * 500,
      isFound: false,
    };
    monster_1.push(monster);
  }
  bullet = { pos_x: gameChar_world_x, pos_y: gameChar_y - 100 };

  monster_2 = [];
  // Creating Monster2 Object Array with for loop
  for (var i = 0; i < 10; i++) {
    monster2 = {
      pos_x: 600 + i * 500,
      initial_x: 600 + i * 500,
      isFound: false,
    };
    monster_2.push(monster2);
  }
  bullet = { pos_x: gameChar_world_x, pos_y: gameChar_y - 100 };

  monster_3 = [];
  // Creating Monster3 Object Array with for loop
  for (var i = 0; i < 10; i++) {
    monster3 = {
      pos_x: 600 + i * 500,
      initial_x: 600 + i * 500,
      isFound: false,
    };
    monster_3.push(monster3);
  }
  // Creating Bullet object Array
  bullet = { pos_x: gameChar_world_x, pos_y: gameChar_y - 100 };
}

function setup() {
  createCanvas(1024, 576);
  floorPos_y = (height * 3) / 4;
  lives = 3;
  level = 1;
  game_multiplier = 1;
  game_gems = 0;
  speed = 1;
  bounce = false;
  shooting = false;
  shot = false;
  // Setting Volume
  masterVolume(0.15);
  startGame();
}

function draw() {
  if (end_game == true) {
    gameOver();
  } else if (level == 4) {
    gameWon();
  } else if (end_game == false) {
    push();
    translate(scrollPos, 0);
    level_scenery();
    level_objects();
    pop();
    drawGameChar();
  }

  // Logic to make the game character rise and fall.

  if (gameChar_y < floorPos_y && jump == false) {
    isFalling = true;
    gameChar_y += 5;
  } else {
    isFalling = false;
  }

  if (gameChar_y <= floorPos_y - 120) {
    jump = false;
  }
  if (gameChar_y < floorPos_y && jump == true) {
    isFalling = true;
    gameChar_y -= 5;
  }

  // Update real position of gameChar for collision detection.
  gameChar_world_x = gameChar_x - scrollPos;

  if (gameChar_world_x < 150 && gameChar_world_x > 100 && level == 1) {
    level--;
    startGame();
  }
  if (gameChar_world_x < 150 && gameChar_world_x > 100 && level != 1) {
    level--;
    startGame();
    gameChar_world_x = 6450;
    scrollPos = -5950;
  } else if (gameChar_world_x > 6450 && gameChar_world_x < 6550) {
    level++;
    level_complete.play();
    startGame();
  }

  if (gameChar_y >= 576 && lives > 0) {
    lives--;
    death_sound.play();
    startGame();
  }
  if (lives == 0) {
    end_game = true;
  }
}

// ---------------------
// Key control functions
// ---------------------

function keyPressed() {
  if (keyCode == 65 && gameChar_y <= floorPos_y) {
    // Logic to set isLeft to true when "A" is pressed
    isLeft = true;
  } else if (keyCode == 68 && gameChar_y <= floorPos_y) {
    // Logic to set isRight to true when "D" is pressed
    isRight = true;
  } else if (
    (keyCode == 87 || (keyCode == 32 && end_game == false)) &&
    gameChar_y == floorPos_y &&
    level < 4
  ) {
    // Logic to jump when "W" or "SPACE" is pressed
    jump = true;
    gameChar_y = gameChar_y - 10;
    jump_sound.play();
  } else if (keyCode == 88 && (show_canyon || show_waterfall) == true) {
    show_canyon = false;
    show_waterfall = false;
  } else if (keyCode == 88 && (show_canyon || show_waterfall) == false) {
    show_canyon = true;
    show_waterfall = true;
  } else if (keyCode == 32 && (end_game == true || level == 4)) {
    startGame();
    lives = 3;
    level = 1;
    game_gems = 0;
    game_multiplier = 1;
  }
}
function mousePressed() {
  if (lives > 0 && lives < 4) {
    shooting = true;
    if (bullet.pos_y > gameChar_y - 100) {
      shoot_sound.play();
    }
  }
}
function keyReleased() {
  if (keyCode == 65) {
    // Logic to set isLeft to false when "A" is released
    isLeft = false;
  } else if (keyCode == 68) {
    // Logic to set isRight to false when "A" is released
    isRight = false;
  }
}

// ------------------------------
// Game character render function
// ------------------------------

// Function to draw the game character.

function drawGameChar() {
  // draw game character

  if (isLeft == true && isFalling == true) {
    // Jumping-left code
    stroke(0);
    fill(137, 116, 252);
    ellipse(gameChar_x, gameChar_y - 62, 20, 20);
    triangle(
      gameChar_x,
      gameChar_y - 60,
      gameChar_x - 20,
      gameChar_y - 75,
      gameChar_x + 20,
      gameChar_y - 75
    );
    triangle(
      gameChar_x,
      gameChar_y - 65,
      gameChar_x - 22,
      gameChar_y - 80,
      gameChar_x + 22,
      gameChar_y - 80
    );
    fill(100, 95, 249);
    rect(gameChar_x - 5, gameChar_y - 52, 10, 25);
    rect(gameChar_x - 3, gameChar_y - 27, 7, 23);
    rect(gameChar_x - 12, gameChar_y - 34, 10, 20);
    rect(gameChar_x - 5, gameChar_y - 47, 10, 25);
  } else if (isRight == true && isFalling == true) {
    // Jumping-right code
    stroke(0);
    fill(137, 116, 252);
    ellipse(gameChar_x, gameChar_y - 62, 20, 20);
    triangle(
      gameChar_x,
      gameChar_y - 60,
      gameChar_x - 20,
      gameChar_y - 75,
      gameChar_x + 20,
      gameChar_y - 75
    );
    triangle(
      gameChar_x,
      gameChar_y - 65,
      gameChar_x - 22,
      gameChar_y - 80,
      gameChar_x + 22,
      gameChar_y - 80
    );
    fill(100, 95, 249);
    rect(gameChar_x - 5, gameChar_y - 52, 10, 25);
    rect(gameChar_x - 5, gameChar_y - 27, 7, 23);
    rect(gameChar_x + 2, gameChar_y - 34, 10, 20);
    rect(gameChar_x - 5, gameChar_y - 47, 10, 25);
  } else if (isLeft == true) {
    // Walking-left code
    stroke(0);
    fill(137, 116, 252);
    ellipse(gameChar_x, gameChar_y - 62, 20, 20);
    triangle(
      gameChar_x,
      gameChar_y - 60,
      gameChar_x - 20,
      gameChar_y - 75,
      gameChar_x + 20,
      gameChar_y - 75
    );
    triangle(
      gameChar_x,
      gameChar_y - 65,
      gameChar_x - 22,
      gameChar_y - 80,
      gameChar_x + 22,
      gameChar_y - 80
    );
    fill(100, 95, 249);
    rect(gameChar_x - 5, gameChar_y - 52, 10, 25);
    rect(gameChar_x - 3, gameChar_y - 27, 8, 25);
    rect(gameChar_x - 7, gameChar_y - 27, 8, 25);
    rect(gameChar_x - 5, gameChar_y - 47, 10, 25);
  } else if (isRight == true) {
    // Walking right-code
    stroke(0);
    fill(137, 116, 252);
    ellipse(gameChar_x, gameChar_y - 62, 20, 20);
    triangle(
      gameChar_x,
      gameChar_y - 60,
      gameChar_x - 20,
      gameChar_y - 75,
      gameChar_x + 20,
      gameChar_y - 75
    );
    triangle(
      gameChar_x,
      gameChar_y - 65,
      gameChar_x - 22,
      gameChar_y - 80,
      gameChar_x + 22,
      gameChar_y - 80
    );
    fill(100, 95, 249);
    rect(gameChar_x - 5, gameChar_y - 52, 10, 25);
    rect(gameChar_x - 5, gameChar_y - 27, 8, 25);
    rect(gameChar_x - 1, gameChar_y - 27, 8, 25);
    rect(gameChar_x - 5, gameChar_y - 47, 10, 25);
  } else if (isFalling == true || isPlummeting == true) {
    // Jumping facing forwards code
    stroke(0);
    fill(137, 116, 252);
    ellipse(gameChar_x, gameChar_y - 62, 20, 20);
    triangle(
      gameChar_x,
      gameChar_y - 60,
      gameChar_x - 20,
      gameChar_y - 75,
      gameChar_x + 20,
      gameChar_y - 75
    );
    triangle(
      gameChar_x,
      gameChar_y - 65,
      gameChar_x - 22,
      gameChar_y - 80,
      gameChar_x + 22,
      gameChar_y - 80
    );
    fill(100, 95, 249);
    rect(gameChar_x - 5, gameChar_y - 52, 10, 25);
    rect(gameChar_x - 10, gameChar_y - 37, 8, 23);
    rect(gameChar_x + 2, gameChar_y - 29, 7, 25);
    rect(gameChar_x - 20, gameChar_y - 47, 20, 6);
    rect(gameChar_x, gameChar_y - 43, 20, 6);
  } else {
    // Standing front facing code
    stroke(0);
    fill(100, 95, 249);
    rect(gameChar_x - 5, gameChar_y - 50, 10, 25);
    rect(gameChar_x - 8, gameChar_y - 27, 7, 25);
    rect(gameChar_x + 2, gameChar_y - 27, 7, 25);
    rect(gameChar_x - 20, gameChar_y - 43, 40, 6);
    fill(137, 116, 252);
    ellipse(gameChar_x, gameChar_y - 58, 20, 20);
    triangle(
      gameChar_x,
      gameChar_y - 60,
      gameChar_x - 20,
      gameChar_y - 75,
      gameChar_x + 20,
      gameChar_y - 75
    );
    triangle(
      gameChar_x,
      gameChar_y - 65,
      gameChar_x - 22,
      gameChar_y - 80,
      gameChar_x + 22,
      gameChar_y - 80
    );
  }
  // Logic to centre camera on player
  if (isLeft) {
    if (gameChar_x > width * 0.49) {
      gameChar_x -= 8;
    } else {
      scrollPos += 8;
    }
  }

  if (isRight) {
    if (gameChar_x < width * 0.51) {
      gameChar_x += 8;
    } else {
      scrollPos -= 8;
    }
  }

  if (gameChar_y > floorPos_y && jump == false) {
    // Logic to set isPlummeting to true
    isLeft = false;
    isRight = false;
    isPlummeting = true;
    gameChar_y += 10;
  }
}

// ---------------------------
// Background render functions
// ---------------------------

// Function to draw cloud objects.
function drawClouds() {
  for (var i = 0; i < clouds.length; i++) {
    noStroke();
    fill(255);
    ellipse(
      clouds[i].pos_x + 0 * clouds[i].scale,
      clouds[i].pos_y,
      50 * clouds[i].scale,
      15 * clouds[i].scale
    );
    ellipse(
      clouds[i].pos_x + 25 * clouds[i].scale,
      clouds[i].pos_y,
      50 * clouds[i].scale,
      15 * clouds[i].scale
    );
    ellipse(
      clouds[i].pos_x + 50 * clouds[i].scale,
      clouds[i].pos_y,
      50 * clouds[i].scale,
      15 * clouds[i].scale
    );
  }
}

// Function to draw mountains objects.
function drawMountains() {
  for (var i = 0; i < mountains.length; i++) {
    noStroke();
    fill(mountains[i].colour);
    triangle(
      mountains[i].pos_x + 0 * mountains[i].scale,
      floorPos_y,
      mountains[i].pos_x + 50 * mountains[i].scale,
      200,
      mountains[i].pos_x + 100 * mountains[i].scale,
      floorPos_y
    );
  }
}

// Function to draw cacti objects.
function drawCacti() {
  for (var i = 0; i < cacti.length; i++) {
    noStroke();
    fill(cacti[i].colour);
    ellipse(
      cacti[i].pos_x + 0 * cacti[i].scale,
      432 - 40 * cacti[i].scale,
      20 * cacti[i].scale,
      80 * cacti[i].scale
    );
    ellipse(
      cacti[i].pos_x + 0 * cacti[i].scale,
      405 - 7.5 * cacti[i].scale,
      45 * cacti[i].scale,
      15 * cacti[i].scale
    );
    ellipse(
      cacti[i].pos_x + 20 * cacti[i].scale,
      400 - 20 * cacti[i].scale,
      10 * cacti[i].scale,
      40 * cacti[i].scale
    );
    ellipse(
      cacti[i].pos_x - 20 * cacti[i].scale,
      400 - 20 * cacti[i].scale,
      10 * cacti[i].scale,
      40 * cacti[i].scale
    );
  }
}
// Function to draw Tree objects.
function drawTrees() {
  for (var i = 0; i < trees.length; i++) {
    noStroke();
    fill(trees[i].colour);
    ellipse(
      trees[i].pos_x + 0 * trees[i].scale,
      432 - 60 * trees[i].scale,
      20 * trees[i].scale,
      120 * trees[i].scale
    );
    for (var j = 0; j < 7; j++)
      ellipse(
        trees[i].pos_x + 0 * trees[i].scale,
        432 - 160 * trees[i].scale + 10 * j,
        20 * trees[i].scale + 10 * j,
        120 * trees[i].scale
      );
  }
}
// Function to draw Fir Tree objects.
function drawFirTrres() {
  for (var i = 0; i < fir_trees.length; i++) {
    noStroke();
    fill(56, 25, 0);
    rect(fir_trees[i].pos_x - 7, floorPos_y - 50, 14, 50);
    fill(fir_trees[i].colour);
    for (var j = 0; j < 15; j++) {
      triangle(
        fir_trees[i].pos_x,
        floorPos_y - 175 + 10 * j,
        fir_trees[i].pos_x - 8 * j,
        floorPos_y - 155 + 10 * j,
        fir_trees[i].pos_x + 8 * j,
        floorPos_y - 155 + 10 * j
      );
    }
  }
}
// Function to shoot bullet
function shoot_bullet() {
  if ((shooting && shot) == false) {
    bullet.pos_x = gameChar_world_x;
    bullet.pos_y = gameChar_y - 70;
    shot = true;
  }
  if ((shooting && shot) == true) {
    bullet.pos_y -= 10;
  }
  if (bullet.pos_y < 20) {
    shot = false;
    shooting = false;
  }
  if ((shot && shooting) == false) {
    bullet.pos_y = gameChar_y - 70;
    bullet.pos_x = gameChar_world_x;
  }
}

function drawBullet() {
  stroke(119, 31, 245);
  fill(240, 249, 59);
  ellipse(bullet.pos_x, bullet.pos_y, 4, 4);
}

// Function to draw teleporter objects
function drawTeleporter() {
  fill(221, 218, 0);
  rect(50, floorPos_y - 90, 20, 90);
  fill(193, 255, 0);
  rect(50, floorPos_y - 5, 20, 5);
  rect(50, floorPos_y - 90, 20, 5);
  rect(50 - 5, floorPos_y - 90, 5, 90);
  rect(50 + 20, floorPos_y - 90, 5, 90);
  fill(64, 255, 249);
  stroke(193, 255, 0);
  ellipse(50 + 10, floorPos_y - 25, 20, 40);
  ellipse(50 + 10, floorPos_y - 65, 20, 40);
  strokeWeight(5);
  fill(221, 218, 0);
  beginShape();
  vertex(50 + 25, floorPos_y - 85);
  vertex(50 + 65, floorPos_y - 110);
  vertex(50 - 40, floorPos_y - 110);
  vertex(50 - 5, floorPos_y - 85);
  vertex(50 + 25, floorPos_y - 85);
  endShape();
  fill(29, 146, 243);
  stroke(87, 0, 221);
  textSize(20);
  textFont("Verdana");
  textStyle(BOLD);
  text("<----\nPREVIOUS\nLEVEL\nTELEPORT", 50 - 40, floorPos_y - 190);

  fill(221, 218, 0);
  rect(6500, floorPos_y - 90, 20, 90);
  fill(193, 255, 0);
  rect(6500, floorPos_y - 5, 20, 5);
  rect(6500, floorPos_y - 90, 20, 5);
  rect(6500 - 5, floorPos_y - 90, 5, 90);
  rect(6500 + 20, floorPos_y - 90, 5, 90);
  fill(64, 255, 249);
  stroke(193, 255, 0);
  ellipse(6500 + 10, floorPos_y - 25, 20, 40);
  ellipse(6500 + 10, floorPos_y - 65, 20, 40);
  strokeWeight(5);
  fill(221, 218, 0);
  beginShape();
  vertex(6500 + 25, floorPos_y - 85);
  vertex(6500 + 65, floorPos_y - 110);
  vertex(6500 - 40, floorPos_y - 110);
  vertex(6500 - 5, floorPos_y - 85);
  vertex(6500 + 25, floorPos_y - 85);
  endShape();
  fill(29, 146, 243);
  stroke(87, 0, 221);
  textSize(20);
  textFont("Verdana");
  textStyle(BOLD);
  text("NEXT\nLEVEL\n---->\nTELEPORT", 6500 - 40, floorPos_y - 190);
}

// ---------------------------------
// Canyon render and check functions
// ---------------------------------

// Function to draw canyon objects.
function drawCanyon(t_canyon) {
  image(desert_canyon_left, t_canyon.pos_x, floorPos_y, 20, 148);
  image(
    desert_canyon_middle,
    t_canyon.pos_x + 20,
    floorPos_y,
    t_canyon.scale * 68,
    148
  );
  image(
    desert_canyon_right,
    t_canyon.pos_x + 20 + t_canyon.scale * 68,
    floorPos_y,
    20,
    148
  );
}

// Function to check character is over a canyon.
function checkCanyon(t_canyon) {
  if (
    gameChar_world_x > t_canyon.pos_x + 25 &&
    gameChar_world_x < t_canyon.pos_x - 60 + t_canyon.scale * 128 &&
    gameChar_y == floorPos_y
  ) {
    gameChar_y += 5;
  } else {
    return;
  }
}

// Function to draw waterfall objects.
function drawWaterfall(t_waterfall) {
  image(forest_waterfall_left, t_waterfall.pos_x, floorPos_y, 20, 148);
  image(
    forest_waterfall_right,
    t_waterfall.pos_x + 20 + t_waterfall.scale * 88,
    floorPos_y,
    20,
    148
  );
  image(
    forest_waterfall_bottom,
    t_waterfall.pos_x + 18,
    floorPos_y,
    t_waterfall.scale * 90,
    148
  );
  image(
    forest_waterfall_top,
    t_waterfall.pos_x + 18,
    floorPos_y,
    t_waterfall.scale * 90,
    70
  );
}

// Function to check character is over a canyon.
function checkWaterfall(t_waterfall) {
  if (
    gameChar_world_x > t_waterfall.pos_x + 25 &&
    gameChar_world_x < t_waterfall.pos_x - 30 + t_waterfall.scale * 128 &&
    gameChar_y == floorPos_y
  ) {
    gameChar_y += 5;
  } else {
    return;
  }
}

// ----------------------------------
// Collectable items render and check functions
// ----------------------------------

// Function to draw collectable objects.
function drawCollectable(t_collectable) {
  noStroke();
  fill(255, 37, 37);
  triangle(
    t_collectable.pos_x,
    floorPos_y - 75,
    t_collectable.pos_x - 10,
    floorPos_y - 90,
    t_collectable.pos_x,
    floorPos_y - 90
  );
  fill(255, 63, 63);
  triangle(
    t_collectable.pos_x,
    floorPos_y - 75,
    t_collectable.pos_x + 10,
    floorPos_y - 90,
    t_collectable.pos_x,
    floorPos_y - 90
  );
  fill(255, 86, 86);
  triangle(
    t_collectable.pos_x,
    floorPos_y - 105,
    t_collectable.pos_x - 10,
    floorPos_y - 90,
    t_collectable.pos_x,
    floorPos_y - 90
  );
  fill(253, 130, 130);
  triangle(
    t_collectable.pos_x,
    floorPos_y - 105,
    t_collectable.pos_x + 10,
    floorPos_y - 90,
    t_collectable.pos_x,
    floorPos_y - 90
  );
}

// Function to check character has collected an item.
function checkCollectable(t_collectable) {
  t_collectable.isFound = false;
  if (
    int(
      dist(gameChar_world_x, gameChar_y, t_collectable.pos_x, floorPos_y - 35) <
        40
    )
  ) {
    t_collectable.isFound = true;
    game_gems++;
    collectable_sound.play();
  } else {
    return;
  }
}
// Function to draw monster1 objects.
function drawMonster_1(t_monster) {
  if (t_monster.pos_x <= t_monster.initial_x + 100 && bounce == false) {
    t_monster.pos_x = t_monster.pos_x + speed;
  } else if (t_monster.pos_x > t_monster.initial_x && bounce == true) {
    t_monster.pos_x = t_monster.pos_x + speed;
  } else if (t_monster.pos_x >= t_monster.initial_x + 100 && bounce == false) {
    bounce = true;
    speed = -1 * speed;
    t_monster.pos_x = t_monster.pos_x + speed;
  } else if (t_monster.pos_x <= t_monster.initial_x && bounce == true) {
    bounce = false;
    speed = -1 * speed;
    t_monster.pos_x = t_monster.pos_x + speed;
  }
  image(forest_monster, t_monster.pos_x, 0, 240, 240);
}
// Function to check monster and bullet collision.
function checkMonster_1(t_monster) {
  t_monster.isFound = false;
  if (int(dist(bullet.pos_x, bullet.pos_y, t_monster.pos_x + 120, 0) < 65)) {
    t_monster.isFound = true;
    game_multiplier++;
    monster_death.play();
  } else {
    return;
  }
}
// Function to draw collectable objects.
function drawMonster_2(t_monster) {
  if (t_monster.pos_x <= t_monster.initial_x + 100 && bounce == false) {
    t_monster.pos_x = t_monster.pos_x + speed;
  } else if (t_monster.pos_x > t_monster.initial_x && bounce == true) {
    t_monster.pos_x = t_monster.pos_x + speed;
  } else if (t_monster.pos_x >= t_monster.initial_x + 100 && bounce == false) {
    bounce = true;
    speed = -1 * speed;
    t_monster.pos_x = t_monster.pos_x + speed;
  } else if (t_monster.pos_x <= t_monster.initial_x && bounce == true) {
    bounce = false;
    speed = -1 * speed;
    t_monster.pos_x = t_monster.pos_x + speed;
  }
  image(desert_monster, t_monster.pos_x, 0, 240, 240);
}
// Function to check monster and bullet collision.
function checkMonster_2(t_monster) {
  t_monster.isFound = false;
  if (int(dist(bullet.pos_x, bullet.pos_y, t_monster.pos_x + 100, 0) < 65)) {
    t_monster.isFound = true;
    game_multiplier++;
    monster_death.play();
  } else {
    return;
  }
}
// Function to draw collectable objects.
function drawMonster_3(t_monster) {
  if (t_monster.pos_x <= t_monster.initial_x + 100 && bounce == false) {
    t_monster.pos_x = t_monster.pos_x + speed;
  } else if (t_monster.pos_x > t_monster.initial_x && bounce == true) {
    t_monster.pos_x = t_monster.pos_x + speed;
  } else if (t_monster.pos_x >= t_monster.initial_x + 100 && bounce == false) {
    bounce = true;
    speed = -1 * speed;
    t_monster.pos_x = t_monster.pos_x + speed;
  } else if (t_monster.pos_x <= t_monster.initial_x && bounce == true) {
    bounce = false;
    speed = -1 * speed;
    t_monster.pos_x = t_monster.pos_x + speed;
  }
  image(winter_monster, t_monster.pos_x, 0, 240, 240);
}
// Function to check monster and bullet collision.
function checkMonster_3(t_monster) {
  t_monster.isFound = false;
  if (int(dist(bullet.pos_x, bullet.pos_y, t_monster.pos_x + 100, 0) < 65)) {
    t_monster.isFound = true;
    game_multiplier++;
    monster_death.play();
  } else {
    return;
  }
}

function gameOver() {
  image(game_over_screen, 0, 0, width, height);
}

function gameWon() {
  image(win_screen, 0, 0, width, height);
  fill(232, 145, 204);
  textSize(48);
  textFont("Brush Script MT");
  textStyle(BOLD);
  text(game_multiplier * game_gems, 395, 394);
  text(game_gems, 355, 435);
  text(game_multiplier, 550, 475);
}
// Loading in all pictures and sounds used
function preload() {
  death_sound = loadSound("assets/sounds/Hero_Dies.mp3");
  jump_sound = loadSound("assets/sounds/Jump.mp3");
  collectable_sound = loadSound("assets/sounds/Money.mp3");
  shoot_sound = loadSound("assets/sounds/Shoot.mp3");
  level_complete = loadSound("assets/sounds/Level_Complete.mp3");
  monster_death = loadSound("assets/sounds/Monster_Death.mp3");

  game_over_screen = loadImage("assets/images/General/game_over.png");
  win_screen = loadImage("assets/images/General/you_win.png");

  forest_monster = loadImage("assets/images/Level_1-Forest/forest_monster.png");
  desert_monster = loadImage("assets/images/Level_2-Desert/desert_monster.png");
  winter_monster = loadImage("assets/images/Level_3-Winter/winter_monster.png");

  forest_bg = loadImage("assets/images/Level_1-Forest/forest_bg.png");
  forest_floor = loadImage("assets/images/Level_1-Forest/forest_floor.png");
  forest_waterfall_top = loadImage(
    "assets/images/Level_1-Forest/water_top.png"
  );
  forest_waterfall_bottom = loadImage(
    "assets/images/Level_1-Forest/water_bottom.png"
  );
  forest_waterfall_right = loadImage(
    "assets/images/Level_1-Forest/water_right.png"
  );
  forest_waterfall_left = loadImage(
    "assets/images/Level_1-Forest/water_left.png"
  );

  desert_bg = loadImage("assets/images/Level_2-Desert/desert_bg.png");
  desert_floor = loadImage("assets/images/Level_2-Desert/desert_floor.png");
  desert_canyon_left = loadImage(
    "assets/images/Level_2-Desert/canyon_left.png"
  );
  desert_canyon_right = loadImage(
    "assets/images/Level_2-Desert/canyon_right.png"
  );
  desert_canyon_middle = loadImage(
    "assets/images/Level_2-Desert/canyon_middle.png"
  );

  winter_bg = loadImage("assets/images/Level_3-Winter/winter_bg.png");
  winter_floor = loadImage("assets/images/Level_3-Winter/winter_floor.png");
  winter_igloo = loadImage("assets/images/Level_3-Winter/winter_igloo.png");
}
// Loading in correct scenery
function level_scenery() {
  if (level == 0) {
    level_1_scenery();
    level++;
  } else if (level == 1) {
    level_1_scenery();
  } else if (level == 2) {
    level_2_scenery();
  } else if (level == 3) {
    level_3_scenery();
  }
}
// Loading in correct level objects
function level_objects() {
  if (level == 0) {
    level_1_objects();
  }
  if (level == 1) {
    level_1_objects();
  } else if (level == 2) {
    level_2_objects();
  } else if (level == 3) {
    level_3_objects();
  }
}
// initialising scenery
function level_1_scenery() {
  for (var i = 0; i < 12; i++) {
    image(forest_bg, -200 + i * 700, 0, 700, floorPos_y);
  }
  for (var i = 0; i < 60; i++) {
    image(forest_floor, -200 + i * 128, floorPos_y, 128, 148);
  }
}

function level_1_objects() {
  // Call object functions
  drawClouds();
  drawTrees();
  drawTeleporter();
  drawBullet();
  shoot_bullet();

  // Draw welcome post
  fill(255, 255, 255);
  stroke(155, 96, 5);
  rect(5, 80, 200, 275);
  fill(134, 82, 1);
  rect(45, 355, 30, 75);
  rect(130, 355, 30, 75);
  noStroke();
  fill(0);
  textSize(22);
  textFont("Helvetica");
  textStyle(BOLD);
  text("       Welcome to\n      Gem Runner!", 0, 110);
  textSize(18);
  text(
    " Collect Gems and Kill\n  the Enemies for an\n additional Multiplier\n          using the\n      Mouse Button!\n\n     For Easy Mode \n     Press:'X'!",
    10,
    180
  );

  // Draw waterfall.
  if (show_waterfall == true) {
    for (var i = 0; i < waterfalls.length; i++) {
      checkWaterfall(waterfalls[i]);
    }
    for (var i = 0; i < canyons.length; i++) {
      drawWaterfall(waterfalls[i]);
    }
  }

  noStroke();
  fill(55, 35, 0);
  textSize(36);
  textFont("Brush Script MT");
  textStyle(BOLD);
  text(
    "Your Score: " + game_gems * game_multiplier + " !",
    width - 250 - scrollPos,
    40
  );
  text("Your Gems: " + game_gems + " !", width - 250 - scrollPos, 80);
  text(
    "Your Multiplier: " + game_multiplier + " !",
    width - 280 - scrollPos,
    120
  );

  // Draw text of lives in the top left
  noStroke();
  fill(55, 35, 0);
  textSize(40);
  textFont("Brush Script MT");
  textStyle(BOLD);
  text("Your lives:", 20 - scrollPos, 40);

  noStroke();
  fill(55, 35, 0);
  textSize(35);
  textFont("Brush Script MT");
  textStyle(BOLD);
  text("Level:" + level + "!", 450 - scrollPos, 40);

  // Draw life tokens
  for (var i = 0; i < lives; i++) {
    noStroke();
    fill(255, 0, 255);
    ellipse(190 + i * 40 - scrollPos, 30, 15, 25);
    ellipse(190 + i * 40 - scrollPos, 30, 25, 15);
  }

  // Draw collectable items
  for (var i = 0; i < collectables.length; i++) {
    if (collectables[i].isFound == false) {
      checkCollectable(collectables[i]);
    } else {
      continue;
    }
  }
  for (var i = 0; i < collectables.length; i++) {
    if (collectables[i].isFound == false) {
      drawCollectable(collectables[i]);
    } else {
      continue;
    }
  }
  for (var i = 0; i < monster_1.length; i++) {
    if (monster_1[i].isFound == false) {
      checkMonster_1(monster_1[i]);
    } else {
      continue;
    }
  }
  for (var i = 0; i < monster_1.length; i++) {
    if (monster_1[i].isFound == false) {
      drawMonster_1(monster_1[i]);
    } else {
      continue;
    }
  }
}

function level_2_scenery() {
  for (var i = 0; i < 12; i++) {
    image(desert_bg, -200 + i * 700, 0, 700, floorPos_y);
  }
  for (var i = 0; i < 60; i++) {
    image(desert_floor, -200 + i * 128, floorPos_y, 128, 148);
  }
}

function level_2_objects() {
  // Call object functions
  drawMountains();
  drawClouds();
  drawCacti();
  drawTeleporter();
  drawBullet();
  shoot_bullet();

  // Draw canyon.
  if (show_canyon == true) {
    for (var i = 0; i < canyons.length; i++) {
      checkCanyon(canyons[i]);
    }
    for (var i = 0; i < canyons.length; i++) {
      drawCanyon(canyons[i]);
    }
  }
  noStroke();
  fill(55, 35, 0);
  textSize(36);
  textFont("Brush Script MT");
  textStyle(BOLD);
  text(
    "Your Score: " + game_gems * game_multiplier + " !",
    width - 250 - scrollPos,
    40
  );
  text("Your Gems: " + game_gems + " !", width - 250 - scrollPos, 80);
  text(
    "Your Multiplier: " + game_multiplier + " !",
    width - 280 - scrollPos,
    120
  );

  // Draw text of lives in the top left
  noStroke();
  fill(55, 35, 0);
  textSize(40);
  textFont("Brush Script MT");
  textStyle(BOLD);
  text("Your lives:", 20 - scrollPos, 40);

  noStroke();
  fill(55, 35, 0);
  textSize(35);
  textFont("Brush Script MT");
  textStyle(BOLD);
  text("Level:" + level + "!", 450 - scrollPos, 40);

  // Draw life tokens
  for (var i = 0; i < lives; i++) {
    noStroke();
    fill(255, 0, 255);
    ellipse(190 + i * 40 - scrollPos, 30, 15, 25);
    ellipse(190 + i * 40 - scrollPos, 30, 25, 15);
  }

  // Draw collectable items
  for (var i = 0; i < collectables.length; i++) {
    if (collectables[i].isFound == false) {
      checkCollectable(collectables[i]);
    } else {
      continue;
    }
  }
  for (var i = 0; i < collectables.length; i++) {
    if (collectables[i].isFound == false) {
      drawCollectable(collectables[i]);
    } else {
      continue;
    }
  }

  for (var i = 0; i < monster_2.length; i++) {
    if (monster_2[i].isFound == false) {
      checkMonster_2(monster_2[i]);
    } else {
      continue;
    }
  }
  for (var i = 0; i < monster_2.length; i++) {
    if (monster_2[i].isFound == false) {
      drawMonster_2(monster_2[i]);
    } else {
      continue;
    }
  }
}

function level_3_scenery() {
  for (var i = 0; i < 12; i++) {
    image(winter_bg, -200 + i * 700, 0, 700, floorPos_y);
  }
  for (var i = 0; i < 60; i++) {
    image(winter_floor, -200 + i * 128, floorPos_y, 128, 148);
  }
}

function level_3_objects() {
  // Call object functions
  drawClouds();
  drawFirTrres();
  drawTeleporter();
  drawBullet();
  shoot_bullet();
  image(winter_igloo, 6200, floorPos_y - 220, 510, 230);

  // Draw waterfall.
  if (show_waterfall == true) {
    for (var i = 0; i < waterfalls.length; i++) {
      checkWaterfall(waterfalls[i]);
    }
    for (var i = 0; i < waterfalls.length; i++) {
      drawWaterfall(waterfalls[i]);
    }
  }

  stroke(11, 61, 69);
  fill(174, 244, 255);
  textSize(36);
  textFont("Brush Script MT");
  textStyle(BOLD);
  text(
    "Your Score: " + game_gems * game_multiplier + " !",
    width - 250 - scrollPos,
    40
  );
  text("Your Gems: " + game_gems + " !", width - 250 - scrollPos, 80);
  text(
    "Your Multiplier: " + game_multiplier + " !",
    width - 280 - scrollPos,
    120
  );
  // Draw text of lives in the top left
  text("Your lives:", 20 - scrollPos, 40);
  text("Level:" + level + "!", 450 - scrollPos, 40);

  // Draw life tokens
  for (var i = 0; i < lives; i++) {
    noStroke();
    fill(255, 0, 255);
    ellipse(190 + i * 40 - scrollPos, 30, 15, 25);
    ellipse(190 + i * 40 - scrollPos, 30, 25, 15);
  }

  // Draw collectable items
  for (var i = 0; i < collectables.length; i++) {
    if (collectables[i].isFound == false) {
      checkCollectable(collectables[i]);
    } else {
      continue;
    }
  }
  for (var i = 0; i < collectables.length; i++) {
    if (collectables[i].isFound == false) {
      drawCollectable(collectables[i]);
    } else {
      continue;
    }
  }

  for (var i = 0; i < monster_3.length; i++) {
    if (monster_3[i].isFound == false) {
      checkMonster_3(monster_3[i]);
    } else {
      continue;
    }
  }
  for (var i = 0; i < monster_3.length; i++) {
    if (monster_3[i].isFound == false) {
      drawMonster_3(monster_3[i]);
    } else {
      continue;
    }
  }
}
