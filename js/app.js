



// CONSTRUCTORS & INPUT

// Enemies constructor class
const Enemy = function(x, y ,speed) {
	this.x = x;
	this.y = y;
	this.speed = speed;
	this.sprite = 'images/enemy-bug.png';
};

// Player constructor class
const Player = function(x, y ,speed) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

// Player handle input
Player.prototype.handleInput = function(e) {
	this.ctlKey = e;
};




// DRAW ON SCREEN

// Draw the enemy on the screen
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Draw the player on the screen
Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Update enemy locations
Enemy.prototype.update = function(dt) {
	
	// Make enemy move each frame
	this.x += this.speed;

	// Make enemies reappear after moving offscreen
	if (this.x >= 550) {
		this.x = -100;

		// Generate new random speed
		this.speed = Math.floor(Math.random() * 6) + 3 ;
	}

	// Check for collisions
	if (player.x < this.x + 60 &&
		player.x + 37 > this.x &&
		player.y < this.y + 25 &&
		30 + player.y > this.y) {
		player.x = 200;
		player.y = 380;
	}
};

// Update the player's position
Player.prototype.update = function(dt) {
	if(this.ctlKey === 'left' && this.x > 0){
		this.x -= 100;
		//if r ight key is pressed and player is not on edge of map increment x
	} else if(this.ctlKey === 'right' && this.x != 400){
		this.x += 100;
		//if up key is pressed increment y
	} else if(this.ctlKey === 'up'){
		this.y -= 83;
		//if down key is pressed and player is not on edge of map decrement y
	} else if (this.ctlKey === 'down' && this.y != 400){
		this.y += 83;
	}
	this.ctlKey = null;

	// Prevent player from moving beyond canvas wall boundaries
	if (this.y > 380) {
		this.y = 380;
	}
	if (this.x > 400) {
		this.x = 400;
	}
	if (this.x < 0) {
		this.x = 0;
	}

	// Check for player reaching water and winning
	if (this.y < 0) {
		alert("YOU WIN!!!")
		this.x = 200;
		this.y = 380;
	}
};

// Animate each step
function step() {
	update();
	render();
	handleInput();
	requestAnimationFrame(step);
}



// INSTANTIATE NEW GAME OBJECTS

// Intantiate new enemy array with enemies from contructor
let allEnemies = [new Enemy(-50,220, 3), new Enemy(-50, 138, 5), new Enemy(-50, 53, 4)];

// Instantiate new player from constructor
let player = new Player();

// Player's beginning position
player.x = 200;
player.y = 380;



// GAME LISTENERS

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
	let allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});
