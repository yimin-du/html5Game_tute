var canvas = document.getElementById("mainCanvas");
var context = canvas.getContext("2d");
var WIDTH = 500, HEIGHT = 400, SPEED = 8;
var UP = 38, DOWN = 40, LEFT = 37, RIGHT = 39;
var score = 0;
var player = {
	x: 30,
	y: 30,
	width: 20,
	height: 20
};
var cube = {
	x: Math.random() * (WIDTH - 20),
	y: Math.random() * (HEIGHT - 20),
	width: 20,
	height: 20
};


keys = [];
window.addEventListener("keydown", function(e){
	keys[e.keyCode] = true;
});

window.addEventListener("keyup", function(e){
	delete keys[e.keyCode];
});

function process(){
	score++;
	cube.x = Math.random() * (WIDTH - 20);
	cube.y = Math.random() * (HEIGHT - 20);
}
function collision(obj1, obj2){
	return !(obj1.x + obj1.width < obj2.x ||
		obj1.x > obj2.x + obj2.width ||
		obj1.y + obj1.height < obj2.y ||
		obj1.y > obj2.y + obj2.height);
}

function update() {
	if(keys[UP])	player.y -= SPEED;
	if(keys[DOWN])	player.y += SPEED;
	if(keys[LEFT])	player.x -= SPEED;
	if(keys[RIGHT])	player.x += SPEED;

	if(player.x < 0)	player.x = 0;
	if(player.y < 0)	player.y = 0;
	if(player.x >= WIDTH - player.width)	player.x = WIDTH - player.width;
	if(player.y >= HEIGHT - player.height)	player.y = HEIGHT - player.height;

	if(collision(player, cube)){
		console.log("collision!");
		process();
	}

}

function render() {
	context.clearRect(0, 0, WIDTH, HEIGHT);
	context.fillStyle = "black";

	context.fillRect(player.x, player.y, player.width, player.height);

	context.fillStyle = "white";
	context.fillRect(cube.x, cube.y, cube.width, cube.height);

	context.fillStyle = "blue"
	context.font = "bold 30px monospace";
	context.fillText(score, 10, 30);

}

setInterval(function(){
	update();
	render();
}, 1000 / 30);