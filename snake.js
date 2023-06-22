const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
context.fillStyle = "#00FF00";
const UNIT = 20;

let position = {
    x:0,
    y:0
};

let direction = {
    UP:"UP",
    LEFT:"LEFT",
    DOWN:"DOWN",
    RIGHT:"RIGHT",
};

let way = direction.RIGHT;
let fps = 0;
let second = -1;

function loop() {

    let nextSecond = new Date().getSeconds();
    if (second != nextSecond) {
        second = nextSecond;
        console.log(fps);
        fps = 1;
    } else {
        fps++;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(position.x, position.y, UNIT, UNIT);

    switch (way) {

        case direction.UP:
            moveUp();
            break;
        case direction.RIGHT:
            moveRight();
            break;
        case direction.DOWN:
            moveDown();
            break;
        case direction.LEFT:
            moveLeft();
            break;
    }
    
    checkBounds();
    requestAnimationFrame(loop);
}

function checkBounds(){
    if(position.x + UNIT >= canvas.width && way == "RIGHT"){
        way = direction.DOWN;
    } else if(position.y + UNIT >= canvas.height && way == "DOWN"){
        way = direction.LEFT;
    } else if(position.x <= 0 && way == "LEFT"){
        way = direction.UP;
    } else if(position.y <= 0 && way == "UP"){
        way = direction.RIGHT;
    }
}

function moveUp(){
    position.y -= UNIT;
}

function moveRight(){
    position.x += UNIT;
}

function moveDown(){
    position.y += UNIT;
}

function moveLeft(){
    position.x -= UNIT;
}

  requestAnimationFrame(loop);