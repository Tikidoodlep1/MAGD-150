class raindrop {
	constructor() {
		this.x = random(0, 111) + 190;
		this.y = random(0, 26) + 150;
		this.startY = this.y;
		this.width = this.y / 23;
		this.height = this.width + 3;
		this.shouldFall = true;
	}

	fall() {
		this.y += 1;
		if(this.y >= 300) {
			createSplash(this.x, this.y, this.width, this.height);
			this.shouldFall = false;
		}
	}

	create() {
		push();
		scale(this.y/300);
		translate((this.x*(300/this.y))-250, 160);
		ellipse(this.x, this.y, this.width, this.height);
		pop();
	}
}

let rain = [];
let raindrops = 0;
let counter = 0;
let pRot = 0;
let rotLeft = false;

function setup() {
	createCanvas(600, 600);
	colorMode(RGB, 255);
	ellipseMode(CENTER);
	rectMode(CORNERS);
	angleMode(DEGREES);
}

function draw() {
	background(50, 100, 255, 255);
	push();
	ground();
	cloud();
	pop();
	push();
	boat(pRot);
	pop();

	counter++;
	if(counter === 3) {
		counter = 0;
		if(pRot === 15) {
			rotLeft = true;
		}else if(pRot === -15) {
			rotLeft = false;
		}
		if(rotLeft === true) {
			pRot--;
		}else {
			pRot++;
		}

		for(let i = 0; i < 1; i++) {
			let drops = new raindrop();
			if(raindrops >= 50) {
				raindrops = 0;
			}
			rain[raindrops++] = drops;
		}
	}
	
	for(let j = 0; j < 50; j++) {
		if(rain[j] != null) {
			if(rain[j].shouldFall === true) {
				rain[j].create();
				rain[j].fall();
			}
		}
	}
}

function ground() {
	fill(30, 150, 40, 255);
	rect(0, 250, width, height);
	fill(70, 100, 255, 255);
	ellipse(300, 420, 380, 250);
}

function cloud() {
	noStroke();
	fill(255, 255, 255, 255);
	ellipse(250, 100, 75, 75);
	ellipse(230, 140, 100, 50);
	ellipse(290, 130, 50, 50);
}

function boat(rot) {
	push();
	noStroke();
	translate(335, 370);
	rotate(rot);
	fill(255, 130, 60, 255);
	triangle(-45, 15, 0, 32, 0, 18);
	triangle(0, 32, 0, 18, 45, 15);
	rect(-4, -25, 4, 20);
	fill(255, 255, 255, 255);
	triangle(-35, 10, 0, -32, 0, 10);
}

function createSplash(x, y, width, height) {
	push();
	scale(y/300);
	translate((x*(300/y))-250, 160);
	strokeWeight(2);
	stroke(225, 225, 255, 255);
	fill(30, 150, 40, 255);
	ellipse(x, y, width + 3, height - 2);
	pop();
}