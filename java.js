var canHeight = 200;
var size = 20;
var score = 0;
var hiScore = 0;

var player = {
  posX: 50,
  posY: canHeight - size,
  jump:false,
  jumpHeight: 80,
  jumpSpeed: 5,
  color:[Math.random() * 255, Math.random() * 255, Math.random() * 255],
  alive:1
}
var obstacles = [];
var standardY = player.posY;


function setup() {
  createCanvas(windowWidth-20, canHeight);
  frameRate(60);

  for (var i=0; i < (windowWidth-20)/size; i++) {
    obstacles.push(0);
  }
}

function draw() {
  hit(player.posX, player.posY);
  render();
  jump();
  move()
  score += 1;

}

function render() {
  background(220);
  fill(player.color);
  ellipse(player.posX, player.posY, size, size);

  fill(0);
  for (var i=0; i < obstacles.length; i++){
    if (obstacles[i] == 1) {
      rect(i*size, canHeight-30, 20, 30)
    }
  }
  textSize(20);
  fill(0);
  text(score, 36, 30);
  text("HI:" + hiScore, 10, 50);
}

function keyPressed() {
  if(keyCode == 32 && player.posY >= standardY){
    player.jump=true;
  }
}

function touchStarted() {
  if(player.posY >= standardY){
    player.jump=true;
  }
}

function jump() {
  if(player.jump == true && player.posY >> standardY - player.JumpHeight){
    player.posY -= player.jumpSpeed;
  }
  if (player.jump == true && player.posY <= standardY - player.jumpHeight) {
    player.jump = false;
  }
  if (player.posY <= standardY && player.jump==false) {
    player.posY += player.jumpSpeed;
  }
}

function move() {
  if (Math.floor(Math.random() * 100) < 1){
    obstacles.push(1);
    //console.log(1);
  } else {
    obstacles.push(0);
    //console.log(0);
  }

  return obstacles.shift();
}

function hit(x, y) {
  let obst = [];

  fill(0);
  for (var i=0; i < obstacles.length; i++){
    if (obstacles[i] == 1) {
      obst = [i*size, canHeight-30, 20, 30];

      if ((obst[0]-obst[2]) < x && x < (obst[0]+obst[2]))
        { if (player.posY > obst[1]) {
          // player.alive=0;
          score = 0;
          player.color = [Math.random() * 255, Math.random() * 255, Math.random() * 255];
          return true;
        } else if (player.alive==1){
          score += 100;
          if (score > hiScore) {
              hiScore=score;
          }
          return false;
        }
      }
    }
  }


}
