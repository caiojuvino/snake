const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const UNIT = 20;
const GAP = UNIT/5;

const direction = {
    UP:"UP",
    LEFT:"LEFT",
    DOWN:"DOWN",
    RIGHT:"RIGHT",
};

const initialSnake = [
    [UNIT * 2, UNIT], [UNIT, UNIT], [0, UNIT]
];

let snake = [...initialSnake];

let food = {
    x: 0,
    y: 0
}

setRandomFoodPosition();

let way = direction.RIGHT;
let frame = 0;
let skipframes = 6;
let shouldGrow = false;
let isPaused = true;
let hasMoved = true;

window.addEventListener("keydown", (e) => {
    if (!hasMoved) {
        return
    }
    
    if (e.code === "ArrowDown" && way != direction.UP) {
        way = direction.DOWN
        hasMoved = false;
    } else if (e.code === "ArrowLeft" && way != direction.RIGHT) {
        way = direction.LEFT
        hasMoved = false;
    } else if (e.code === "ArrowUp" && way != direction.DOWN) {
        way = direction.UP
        hasMoved = false;
    } else if (e.code === "ArrowRight" && way != direction.LEFT) {
        way = direction.RIGHT
        hasMoved = false;
    } else if (e.code === "Space") {
        isPaused = !isPaused;
        if (isPaused) {
            writeTip();
        }
    }
  }, false
);

drawSnake();
writeTip();

function loop() {

    frame++;
    if (frame >= skipframes) {
        frame = 0;
    }

    if(!frame && !isPaused){
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawSnake();
        drawFood();

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
        checkCollision();
        if(isPosInPiece(food.x, food.y, snake[0])){
            shouldGrow = true;
            setRandomFoodPosition();
        }
    }
    requestAnimationFrame(loop);
}

function writeTip(){
    context.fillStyle = "#0000FF";
    context.font = "30px Arial";
    context.fillText("Press Space to Play", 250, 50);
}

function updateSnake(x,y){
    snake.unshift([x, y]);
    hasMoved = true;
    
    if(!shouldGrow){
        snake.pop();
    } else {
        shouldGrow = false;
    }
}

function drawSnake(){
    context.fillStyle = "#00FF00";
    for (let i = 0; i < snake.length; i++) {
        context.fillRect(snake[i][0], snake[i][1], UNIT-GAP, UNIT-GAP);
    }
    //console.log(snake.toString());
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function isPosInPiece(x, y, piece){
    return piece[0] == x && piece[1] == y;
}

function isPosInSnake(x, y, isFood) {
    let eaten = false;
    let i = isFood ? 0 : 1;
    for (; i < snake.length; i++) {
        if (isPosInPiece(x, y, snake[i])){
            return true;
        }
    }
    return eaten;
}

function setRandomFoodPosition(){
    let tempX = food.x;
    let tempY = food.y;
    while (isPosInSnake(food.x, food.y, true) || (tempX == food.x && tempY == food.y)){
        food.x = getRandomInt(0, canvas.width/UNIT - 1) * UNIT;
        food.y = getRandomInt(0, canvas.height/UNIT - 1) * UNIT;
    }
}

function drawFood(){
    context.fillStyle = "#FF0000";
    context.fillRect(food.x, food.y, UNIT-GAP, UNIT-GAP);
}

function checkCollision(){
    if(
        (snake[0][0] + UNIT > canvas.width && way == direction.RIGHT) ||
        (snake[0][1] + UNIT > canvas.height && way == direction.DOWN) ||
        (snake[0][0] < 0 && way == direction.LEFT) ||
        (snake[0][1] < 0 && way == direction.UP) ||
        isPosInSnake(snake[0][0], snake[0][1], false)) {
        resetSnake();
        isPaused = true;
        writeTip();
    }
}

function resetSnake(){
    way = direction.RIGHT;
    snake =  [...initialSnake];
    setRandomFoodPosition();
}

function moveUp(){
    let y = snake[0][1] - UNIT;
    updateSnake(snake[0][0], y)
}

function moveRight(){
    let x = snake[0][0] + UNIT;
    updateSnake(x, snake[0][1] )
}

function moveDown(){
    let y = snake[0][1] + UNIT;
    updateSnake(snake[0][0], y)
}

function moveLeft(){
    let x = snake[0][0] - UNIT;
    updateSnake(x, snake[0][1])
}

requestAnimationFrame(loop);