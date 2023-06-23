const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
context.fillStyle = "#00FF00";
const UNIT = 20;

const direction = {
    UP:"UP",
    LEFT:"LEFT",
    DOWN:"DOWN",
    RIGHT:"RIGHT",
};

let position = {
    x:40,
    y:0
};

let snake = [
    [40, 0], [20, 0], [0, 0]
];

let way = direction.RIGHT;
let frame = 0;
let skipframes = 10;
let shouldMove = true;

window.addEventListener("keydown", (e) => {
    
    if (e.code === "ArrowDown" && way != direction.UP) {
        way = direction.DOWN
    } else if (e.code === "ArrowLeft" && way != direction.RIGHT) {
        way = direction.LEFT
    } else if (e.code === "ArrowUp" && way != direction.DOWN) {
        way = direction.UP
    } else if (e.code === "ArrowRight" && way != direction.LEFT) {
        way = direction.RIGHT
    }
  }, false
);

function loop() {

    frame++;
    if (frame >= skipframes) {
        frame = 0;
    }

    if(!frame){
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawSnake();
        
        if(shouldMove){

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
            updateSnake();
            checkBounds();
        } else {
            resetSnake();
            shouldMove=true;
        }
    }
    requestAnimationFrame(loop);
}

function updateSnake(){
    snake.pop();
    snake.unshift([position.x, position.y]);
}

function drawSnake(){
    for (let i = 0; i < snake.length; i++) {
        context.fillRect(snake[i][0], snake[i][1], UNIT-2, UNIT-2);
        console.log(snake[i]);
    }
}

function checkBounds(){
    if(
        (position.x + UNIT > canvas.width && way == direction.RIGHT) ||
        (position.y + UNIT > canvas.height && way == direction.DOWN) ||
        (position.x < 0 && way == direction.LEFT) ||
        (position.y < 0 && way == direction.UP)) {
        resetSnake();
    }
}

function resetSnake(){
    way = direction.RIGHT
    position = {
        x:40,
        y:0
    };
    snake = [
        [40, 0], [20, 0], [0, 0]
    ];
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