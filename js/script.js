window.onload = function () {
    setup("MyCanvas",0);

    function setup(id) {
        var snake = {
            fruitX: 0,
            fruitY: 0,
            tailElements:[],
            resetMySnake: function () {
                alert("Game Over");
            },
        };
        var arena = drawArena(900,900, id);
        snakePlace(arena,0,0,id,snake);
    }

    function drawArena(width, height, idOfElement) {
        var canvasDiv = document.getElementById(idOfElement);
        var arena = canvasDiv.getContext("2d");
        arena.canvas.width = width;
        arena.canvas.height = height;
        for(var i = 0; i < height; i += 50){
            for(var j = 0; j < width; j += 50){
                prepareCanvasProp(arena,"grey");
                arena.rect(i,j,50,50);
                arena.fill();
                arena.stroke();
            }
        }
        return arena;
    }


    function snakePlace(snake, x , y,id,objSnake) {


        showFruit(snake,objSnake);
        var direction="down";
        document.onkeydown = function(e){
            if(e.keyCode == '39' && direction != "left"){
                direction = "right";
            }else if(e.keyCode == '37' && direction != "right"){
                direction = "left";
            }else if(e.keyCode == '38' && direction != "down"){
                direction = "top";
            }else if(e.keyCode == '40' && direction != "top"){
                direction = "down";
            }
        };
        var posXtoRemove;
        var posYtoRemove;
        var interval = setInterval(function () {
        var hitWall= false;
            for(var i = objSnake.tailElements.length-1; i >= 0; i--){
                if( i == objSnake.tailElements.length-1) {
                    posXtoRemove = objSnake.tailElements[i].x;
                    posYtoRemove = objSnake.tailElements[i].y;
                }
                objSnake.tailElements[0].x = x;
                objSnake.tailElements[0].y = y;
                if(i != 0){
                    objSnake.tailElements[i].x = objSnake.tailElements[i-1].x;
                    objSnake.tailElements[i].y = objSnake.tailElements[i-1].y;
                }
             }
            prepareCanvasProp(snake,"grey");
            if(objSnake.tailElements.length == 0){
                snake.rect(x,y,50,50);
            }
            if(objSnake.tailElements.length > 0){
                snake.rect(posXtoRemove,posYtoRemove,50,50);
            }
            snake.fill();
            snake.stroke();
            prepareCanvasProp(snake,"black");
            if(x+50 > 900 || y+50 > 900 || direction == "left" && x== 0 || direction == "top" && y == 0){
                clearInterval(interval);
                hitWall = true;
                snake.clearRect(0,0,snake.width, snake.height);
                objSnake.resetMySnake();
                setup(id);
            }
            else if(direction == "down"){
                snake.rect(x,y+=50,50,50);
            }
            else if(direction == "top"){
                snake.rect(x,y-=50,50,50);
            }
            else if(direction == "right"){
                snake.rect(x+=50,y,50,50);
            }
            else if(direction == "left"){
                snake.rect(x-=50,y,50,50);
            }
            for(var i = 0; i<objSnake.tailElements.length; i++){
                if(x == objSnake.tailElements[i].x && y==objSnake.tailElements[i].y && !hitWall){
                    clearInterval(interval);
                    snake.clearRect(0,0,snake.width, snake.height);
                    objSnake.resetMySnake();
                    setup(id);
                    break;
                }
            }
            snake.fill();
            snake.stroke();
            if(x == objSnake.fruitX && y == objSnake.fruitY){
                objSnake.tailElements.unshift(new tailPos(x,y));
                showFruit(snake,objSnake);
            }
        }, 100)
    }

    function showFruit(canvas, objSnake) {
        var findPlaceWithoutSnake = false;
        while(!findPlaceWithoutSnake){
            objSnake.fruitX = Math.floor((Math.random() * 18)) * 50;
            objSnake.fruitY = Math.floor((Math.random() * 18)) * 50;
            findPlaceWithoutSnake = true;
            for(var i = 0; i < objSnake.tailElements.length; i++){
                if(objSnake.fruitX == objSnake.tailElements[i].x && objSnake.fruitY == objSnake.tailElements[i].y ){
                    findPlaceWithoutSnake = false;
                }
            }
        }
        prepareCanvasProp(canvas,"red");
        canvas.rect(objSnake.fruitX,objSnake.fruitY,50,50);
        canvas.fill();
        canvas.stroke();
    }
    function tailPos(x,y) {
        this.x = x;
        this.y = y;
    }

    function prepareCanvasProp(canvas,color) {
        canvas.beginPath();
        canvas.fillStyle = color;
    }
}

