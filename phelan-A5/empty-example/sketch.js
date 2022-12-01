let alphabet = ['1','2','3','4','5','6','7','8','9','0','Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M'];
let keyboard = [];
let keySize = 50;
let textToDraw = "";
let shouldDrawText = true;
let screenRGB = [42, 51, 128, 255];
function setup() {
  	createCanvas(600, 600);
	colorMode(RGB, 255);
  	ellipseMode(CENTER);
  	rectMode(CENTER);
  	textAlign(CENTER, CENTER);
}

function draw() {
	background(0);
	//setup keyboard
	textSize(keySize - 2);
	strokeWeight(2);
  	stroke(0);
  	setupKeyboard();

  	//draw screen
  	strokeWeight(5);
  	stroke(255);
  	fill(screenRGB[0], screenRGB[1], screenRGB[2], screenRGB[3]);
  	rect(270, 150, 480, 250);

  	//draw power button
  	fill(161, 170, 255, 255);
  	ellipse(500, 275, 50, 50);

  	//draw on screen
  	if(shouldDrawText === true) {
  		drawCharacter(textToDraw);
  	}
  	
	if(mouseX >= 30 && mouseX <= 510 && mouseY >= 125 && mouseY <= 275 && keyIsPressed === true) {
		textToDraw = "Key Pressed";
	}
}

function mouseClicked() {
	if(dist(500, 275, mouseX, mouseY) <= 25) {
		if(shouldDrawText === true) {
			screenRGB[0] = 0;
			screenRGB[1] = 0;
			screenRGB[2] = 0;
			shouldDrawText = false;
		}else {
			screenRGB[0] = 42;
			screenRGB[1] = 51;
			screenRGB[2] = 128;
			shouldDrawText = true;
		}
	}
	for(let i = 0; i < 36; i++) {
		if(mouseX >= keyboard[i].sX && mouseX <= keyboard[i].eX && mouseY >= keyboard[i].sY && mouseY <= keyboard[i].eY) {
			textToDraw = keyboard[i].char;
		}
	}
}

function drawCharacter(string) {
	textSize(72);
	strokeWeight(2);
	stroke(0);
	fill(161, 170, 255, 255);
	text(string, 270, 150);
}

function setupKeyboard() {
	for(let i = 0; i < 4; i++) {
  		let k = i + 1;
  		for(let j = 0; j < 9; j++) {
  			let hash = (9*i)+j;
  			let l = j + 1;
  			let key = {
  				sX: (keySize*l) + (3*l),
  				sY: (keySize*k) + (3*k) + 300,
  				eX: (keySize*l) + (3*l) + keySize,
  				eY: (keySize*k) + (3*k) + keySize + 300,
  				char: alphabet[hash]
  			};
  			keyboard[hash] = key;
  			fill(115, 117, 135, 255);
  			rect((keySize*l) + (3*l), (keySize*k) + (3*k) + 300, keySize, keySize);
  			fill(68, 81, 204, 255);
  			text(alphabet[hash], (keySize*l) + (3*l), (keySize*k) + (3*k) + 304);
  		}
  	}
}