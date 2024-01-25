// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var gameLoop = setInterval(draw, 10);
var score = 0;
var gameStarted = false;
var gamePaused = false;
canvas.id = "gameCanvas";
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);

// Define the bar
var bar = {
    x: 350,
    y: 500,
    dx: 0,
    height: 50,
    width: 150
  };

  // Draw the bar
  function drawBar() {
    //ctx.beginPath();
    ctx.rect(bar.x, bar.y, bar.width, bar.height);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }

  function updateBar() {
    if (bar.x + bar.dx > canvas.width-bar.width || bar.x + bar.dx < 0) {
      bar.dx = 0;
    }
    bar.x += bar.dx;
  }

// Define the cube
var cube = {
    x: canvas.width / 2, // Half the canvas width
    y: canvas.height / 2, // Half the canvas height
    dx: 2,
    dy: -2,
    size: 50
};

  // Draw the cube
function drawCube() {
    ctx.beginPath();
    ctx.rect(cube.x, cube.y, cube.size, cube.size);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }
  
  // Update the cube's position
  function updateCube() {
    if (cube.x + cube.dx > canvas.width-cube.size || cube.x + cube.dx < 0) {
      cube.dx = -cube.dx;
    }
    if (cube.y + cube.dy > canvas.height-cube.size) {
      // Game over
      clearInterval(gameLoop);
      //alert("Game Over");
    } else if (cube.y + cube.dy < 0) {
      cube.dy = -cube.dy;
    } else if (cube.y + cube.dy > bar.y - cube.size && cube.x + cube.size > bar.x && cube.x < bar.x + bar.width) {
      // Collision with bar
      cube.dy = -cube.dy;
    }
    cube.x += cube.dx;
    cube.y += cube.dy;
  }

// Define the blocks
var blocks = [];
for (var i = 0; i < 4; i++) {
  for (var j = 0; j < canvas.width / cube.size; j++) {
    blocks.push({ x: j * cube.size, y: i * cube.size, size: cube.size });
  }
}

// Draw the blocks
function drawBlocks() {
  blocks.forEach(function(block) {
    ctx.beginPath();
    ctx.rect(block.x, block.y, block.size, block.size);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  });
}

// Check for collisions
function checkCollisions() {
    if (!gamePaused) {
        for (var i = 0; i < blocks.length; i++) {
            if (cube.x < blocks[i].x + blocks[i].size &&
                    cube.x + cube.size > blocks[i].x &&
                    cube.y < blocks[i].y + blocks[i].size &&
                    cube.y + cube.size > blocks[i].y) {
                // collision detected!
                blocks.splice(i, 1);
                cube.dy = -cube.dy;
                cube.dx = -cube.dx;
                score++; // Increase the score
                document.getElementById('scoreBox').innerText = 'Score: ' + score; // Update the score box
                break;
            }
        }
    }
}

// Draw everything
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCube();
    drawBlocks();
    drawBar();
    
    if (gameStarted && !gamePaused) {
        updateBar();
        updateCube();
        checkCollisions();
    }

    //requestAnimationFrame(draw);
}

// The main game loop
setInterval(draw, 10);


// Keyboard controls
// Start the game when the space bar is pressed
window.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
      gameStarted = true;
    }
  });

// Pause the game when the space bar is pressed
window.addEventListener('keydown', function(event) {
    if (event.key === 'p' || event.key === 'P') {
        gamePaused = !gamePaused;
    }
});

// Bar controls
window.addEventListener('keydown', function(e) {
    switch(e.key) {
      case 'ArrowLeft':
        bar.dx = -2;
        break;
      case 'ArrowRight':
        bar.dx = 2;
        break;
    }
  });

  window.addEventListener('keyup', function(e) {
    if (e.key == 'ArrowLeft' || e.key == 'ArrowRight') {
      bar.dx = 0;
    }
  });

// // Keyboard controls for the cube
// window.addEventListener('keydown', function(e) {
//   switch(e.key) {
//     case 'ArrowUp':
//       cube.dy = -2;
//       cube.dx = 0;
//       break;
//     case 'ArrowDown':
//       cube.dy = 2;
//       cube.dx = 0;
//       break;
//     case 'ArrowLeft':
//       cube.dx = -2;
//       cube.dy = 0;
//       break;
//     case 'ArrowRight':
//       cube.dx = 2;
//       cube.dy = 0;
//       break;
//   }
// });