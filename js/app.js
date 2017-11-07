// Review the code and comments provided in app.js
// Identify the various classes you will need to write.
// Identify and code the properties each class must have to accomplish its tasks.
// Write the functions that provide functionality to each of your class instances.
// Review the project rubric to make sure your project is up to spec. 
// For example make sure the functions you write are object-oriented
//   - either class functions (like Player and Enemy) or class prototype functions such 
//   as Enemy.prototype.checkCollisions, and that the keyword 'this' is used appropriately 
//   within your class and class prototype functions. Also be sure that the readme.md file is
//   updated with your instructions on both how to 1. Run and 2. Play your arcade game.



// Enemies our player must avoid
var Enemy = function(x, y ,speed) {
	this.x = x;
	this.y = y;
	this.speed = speed;
	this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	if(this.x <= 550){
		this.x += this.speed;
	} else{
		this.x = -2;
	}
	// You should multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};




// Now write your own player class
var Player = function(x, y ,speed) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
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
	// You should multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.
};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(e) {
	this.ctlKey = e;
};



// This class requires an update(), render() and
// a handleInput() method.
function step() {
	update();
	render();
	handleInput();
	requestAnimationFrame(step);
}




// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
let player = new Player;

player.x = 200;
player.y = 380;


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});
