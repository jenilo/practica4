function setup() {
	createCanvas(windowWidth, windowHeight);
	frameRate(5);
}

function draw() {
	stroke('red');
	//ecuPP(0,0,width,height);
	//dda(0,0,width,height);
	br(0,0,width,height);

	stroke('blue');
	//ecuPP(width,0,0,height);
	//dda(0,height,width,0);
	br(0,height,width,0);

	stroke('yellow');
	//ecuPP(0,height/2,width,height/2);
	//dda(0,height/2,width,height/2);
	br(0,height/2,width,height/2);

	stroke('gray');
	//ecuPP(width/2,0,width/2,height);
	//dda(width/2,0,width/2,height);
	br(width/2,0,width/2,height);

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