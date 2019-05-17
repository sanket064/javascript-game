  let canvas = document.getElementById('game');
  let ctx = canvas.getContext('2d');
  let isGameOn = false;

  // Making a 2d canvas here and calling it by id game
  // Wining conditions are score 600 
  // Player only have three lives 

  ctx.font = '20px Calibri';
  ctx.fillText("Press enter to start the game", 325, 250);


  // here you are pressing the keys to go left and right
  document.addEventListener('keydown', function(event) {
    if (event.keyCode == 13) {
      draw();
      isGameOn = true;
    }

    if (event.keyCode == 37) {
      base.pressingLeft = true;
      base.pressingRight = false;
    } else if (event.keyCode == 39) {
      base.pressingLeft = false;
      base.pressingRight = true;
    }

    // Defining the variables for the game
    // For changing the game speed you have to change the dx and dy

    var ballRadius = 10;
    var x = canvas.width / 2;
    var y = canvas.height - 30;
    var dx = 4;
    var dy = -4;
    var paddleHeight = 10;
    var paddleWidth = 85;
    var paddleX = (canvas.width - paddleWidth) / 1;
    var rightPressed = false;
    var leftPressed = false;
    var brickRowCount = 10;
    var brickColumnCount = 6;
    var brickWidth = 75;
    var brickHeight = 20;
    var brickPadding = 10;
    var brickOffsetTop = 30;
    var brickOffsetLeft = 30;
    var score = 0;
    var lives = 4;
    var livesText;
    var lifeLostText;



    var bricks = [];
    for (var c = 0; c < brickColumnCount; c++) {
      bricks[c] = [];
      for (var r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
      }
    }


    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    document.addEventListener("mousemove", mouseMoveHandler, false);

    // Using simple key handler functions provided in the notes

    function keyDownHandler(e) {
      if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
      } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
      }
    }

    function keyUpHandler(e) {
      if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
      } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
      }
    }

    function mouseMoveHandler(e) {
      var relativeX = e.clientX - canvas.offsetLeft;
      if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
      }
    }

    /*
    Here we are determining whether the ball touches the canvas or not 
    if it touches it reflects back or not .
    */

    function collisionDetection() {
      for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
          var b = bricks[c][r];
          if (b.status == 1) {
            if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
              dy = -dy; 
              b.status = 0;
              score += 10;
              if (score == 600) {
                alert("YOU WIN, CONGRATS!");
                document.location.reload();
              }
            }
          }
        }
      }
    }

    // Here we are creating the ball for the game
    // Here I make the game little difficut by changing the angle of the ball   
    function drawBall() {
      ctx.beginPath();
      ctx.arc(x, y, ballRadius, 0, Math.PI * 10);
      ctx.fillStyle = "#be6942";
      ctx.fill();
      ctx.closePath();
    }

    function drawPaddle() {
      ctx.beginPath();
      ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
      ctx.fillStyle = "black";
      ctx.fill();
      ctx.closePath();
    }

    // Here we are creating the bricks for the game

    function drawBricks() {
      for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
          if (bricks[c][r].status == 1) {
            var brickX = (r * (brickWidth + brickPadding)) + brickOffsetLeft;
            var brickY = (c * (brickHeight + brickPadding)) + brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#e7c894";
            ctx.fill();
            ctx.closePath();
          }
        }
      }
    }

    // Here we are drwaing the score for the game
    // score 8,20 is the position of the score text

    function drawScore() {
      ctx.font = "16px Arial";
      ctx.fillStyle = "#0095DD";
      ctx.fillText("Score: " + score, 8, 20);
    }

    // Here we are creating the lives for the game 

    function drawLives() {
      ctx.font = "16px Arial";
      ctx.fillStyle = "#0095DD";
      ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
    }

    // Here we are calling every function so far made to run the game

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBricks();
      drawBall();
      drawPaddle();
      drawScore();
      drawLives();
      collisionDetection();

      if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
      }
      if (y + dy < ballRadius) {
        dy = -dy;
      } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
          dy = -dy;
        } else {
          lives--;
          if (!lives) {
            alert("You loose try again");
            document.location.reload();
          } else {
            x = canvas.width / 2;
            y = canvas.height - 30;
            dx = 3;
            dy = -3;
            paddleX = (canvas.width - paddleWidth) / 1;
          }
        }
      }

      if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
      } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
      }

      x += dx;
      y += dy;
      requestAnimationFrame(draw);
    }
  });
  document.addEventListener('keyup', function(event) {
    if (event.keyCode == 37) {
      base.pressingLeft = false;
    } else if (event.keyCode == 39) {
      base.pressingRight = false;
    }

  });

  // This canvas game can be played by using mouse as well as the arrow keys
  // Pressing the enter key will restart the game
  // You can see on the backgound we have infinite loop so to give a warm feel nothing attatched to game
  