let clouds = [];
let birdPos = [];
let flapUp = true;

class cloud {
	constructor(x, y) {
		this.startX = x;
		this.x = x;
		this.y = y;
		this.size = 1.0;
		this.left = floor(random(0, 2));
		this.larger = floor(random(0,2));
	}

	drawCloud() {
		push();
		stroke(148);
		fill(150, 150, 150, 100);
		scale(this.size);
		ellipse(this.x, this.y, 120, 50);
		ellipse(this.x-15, this.y-16, 40, 35);
		ellipse(this.x-7, this.y-23, 35, 30);
		ellipse(this.x+3, this.y-19, 42, 25);
		if(this.larger === 1) {
			this.size += 0.01;
			this.y -= this.size;
		}else {
			this.size -= 0.01;
			this.y += this.size;
		}

		if(this.left === 1) {
			this.x += floor(random(1,3));
		}else {
			this.x -= floor(random(1,3));
		}
		
		if(this.x > this.startX+200 || this.x > 400-120) {
			this.left = 0;
		}else if(this.x < this.startX-200 || this.x < 0+120) {
			this.left = 1;
		}

		if(this.size > 1.5) {
			this.larger = 0;
		}else if(this.size < 0.5) {
			this.larger = 1;
		}
		pop();
	}
}

function setup() {
	createCanvas(400, 400);
	ellipseMode(CENTER);
	colorMode(RGB, 255, 255, 255, 100);
	frameRate(10);
	makeClouds();
}

function draw() {
	background(135);
	birdPos[0] = mouseX;
	birdPos[1] = mouseY;
	push();
	noStroke();
	fill(35, 115, 90, 100);
	ellipse(60, 290, 300, 165);

	fill(35, 115, 80, 100);
	ellipse(320, 320, 330, 170);

	fill(35, 115, 75, 100);
	ellipse(75, 360, 400, 190);

	fill(35, 115, 65, 100);
	ellipse(300, 380, 440, 200);
	pop();
	for(let i = 0; i < (clouds.length/2); i++) {
		clouds[i].drawCloud();
	}

	push();
	stroke(20);
	fill(18);
	if(flapUp === true) {
		triangle(birdPos[0]-5, birdPos[1], birdPos[0]+5, birdPos[1], birdPos[0], birdPos[1]-8);
		flapUp = false;
	}else {
		triangle(birdPos[0]-5, birdPos[1], birdPos[0]+5, birdPos[1], birdPos[0], birdPos[1]+8);
		flapUp = true;
	}
	ellipse(birdPos[0], birdPos[1], 10, 6);
	fill(22);
	if(pmouseX - mouseX > 0) {
		triangle(birdPos[0]-7, birdPos[1]-2, birdPos[0]-7, birdPos[1]+2, birdPos[0]-10, birdPos[1]);
	}else {
		triangle(birdPos[0]+7, birdPos[1]-2, birdPos[0]+7, birdPos[1]+2, birdPos[0]+10, birdPos[1]);
	}
	pop();

	for(let j = ceil(clouds.length/2); j < clouds.length; j++) {
		clouds[j].drawCloud();
	}
}

function makeClouds() {
	for(let i = 0; i < 3; i++) {
		clouds[i] = new cloud(random(5, 396), random(60, 180))
	}
	print(clouds.length);
}