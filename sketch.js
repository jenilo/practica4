function setup() {
	createCanvas(windowWidth, windowHeight);
	frameRate(5);
}

function draw() {
	stroke('red');
	ecuPP(0,1,200,200);
	dda(200,1,400,200);
	br(400,1,600,200);

	stroke('blue');
	ecuPP(0,200,200,1);
	dda(200,200,400,1);
	br(400,200,600,1);

	stroke('yellow');
	ecuPP(0,100,200,100);
	dda(200,100,400,100);
	br(400,100,600,100);

	stroke('gray');
	ecuPP(100,0,100,200);
	dda(300,0,300,200);
	br(500,1,500,200);

	stroke('black');
	mpc(100,300,50);
	mpe(300, 300, 25, 50);

	noStroke();
	text("ecuPP",90,220);
	text("dda",290,220);
	text("bresen",490,220);
	text("mpc",90,380);
	text("mpe",290,380);

}

function ecuPP(x1,y1,x2,y2){
	let x = x1;
	let y = y1;
	let stepX = 1;
	let stepY = 1;
	const dx = x2 - x1;
	const dy = y2 - y1;

	if (dx == 0) {
		if (dy < 0) stepY = -1;

		while(y != y2){
			point(x,y);
			y += stepY;
		}
	}
	else{
		const m = dy / dx;
		const b = y1 - m * x1;

		if (dx < 0) stepX = -1;
		while(x != x2){
			point(x,y);
			x += stepX;
			y = m * x + b;
		}
	}
}

function dda(x1,y1,x2,y2){
	let x = x1;
	let y = y1;
	let stepX = 1;
	let stepY = 1;
	const dx = x2 - x1;
	const dy = y2 - y1;
	const m = dy / dx;

	if (m >= 0) {
		if (m <= 1) {
			if (dx > 0) {
				while(x < x2){
					point(x,y);
					x++;
					y = y + m;
				}
			}
			else{
				while(x > x2){
					point(x,y);
					x--;
					y = y - m;
				}
			}
		}
		else{
			while(y < y2){
				point(x,y);
				y++;
				x = x + 1/ m;
			}
		}
	}
	else{
		if (m <= -1) {
			while(x > x2){
				point(x,y);
				x--;
				y = y - m;
			}
		}
		else{
			while(y2 < y){
				point(x,y);
				y--;
				x = x - 1/ m;
			}
		}
	}
}

function br(x1,y1,x2,y2){
	let x = x1;
	let y = y1;
	var dx = Math.abs(x2 - x1);
    var dy = Math.abs(y2 - y1);
    var sx = (x1 < x2) ? 1 : -1;
    var sy = (y1 < y2) ? 1 : -1;
    var err = dx - dy;

    while (!((x == x2) && (y == y2))) {
    	point(x, y);
        var e2 = err *2;
        if (e2 > -dy) {
            err -= dy;
            x += sx;
        }
        if (e2 < dx) {
            err += dx;
            y += sy;
        }
    }
}

function mpc(xc, yc, r){
	let x = 0;
	let y = r;
	let p = Math.round(5/4 - r);
	
	printOct(xc, x, yc, y);

	while(x < y){
		x++;
		if (p < 0) {
			p = p + 2 * x +1;
		}
		else{
			y--;
			p = p + 2 * (x - y) + 1;
		}
		printOct(xc, x, yc, y);
	}
}

function printOct(xc, x, yc, y){
	printP1(xc, x, yc, y);
	point(xc + y, yc + x);
	point(xc - y, yc + x);
	point(xc - y, yc - x);
	point(xc + y, yc - x);
}
function printP1(xc, x, yc, y){
	point(xc + x, yc + y);
	point(xc + x, yc - y);
	point(xc - x, yc + y);
	point(xc - x, yc - y);
}

function mpe(xc, yc, rx, ry) {
	let x = 0;
	let y = ry;
	let p1 = (ry * ry) - (rx * rx * ry)+ (0.25 * rx * rx);
	let p2 = ((x + 0.5) * (x + 0.5) * ry * ry) + ((y - 1) * (y - 1) * rx * rx) - (rx * rx * ry * ry);

	printP1(xc, x, yc, y);

	while ((2 * ry * ry * x) <= (2 * rx * rx * y)) {
		if (p1 < 0) {
			x++;
			p1 += (2 * ry * ry * x) + (ry * ry);
		} else {
			x++;
			y--;
			p1 += (2 * ry * ry * x) - (2 * rx * rx * y) + (ry * ry);
		}
		printP1(xc, x, yc, y);
	}
	
	while (y != 0) {
		if (p2 > 0) {
			y += - 1;
			p2 += - (2 * y * rx * rx) + (rx * rx);
		} else {
			x++;
			y += - 1;
			p2 += - (2 * y * rx * rx) + (2 * x * ry * ry) + (rx * rx) ;
		}
		printP1(xc, x, yc, y);
	}
}