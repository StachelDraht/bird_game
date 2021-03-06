var cvs = document.getElementById("game");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var carrot = new Image();
var cake = new Image();
var cabbage = new Image();
var target = [];
var points = "0";
var audio = new Audio("gavkanje.mp3");

target[0] = {
  x: cvs.width,
  y: 50
};

bg.src = "background.png";
bird.src = "bird2.png";
bird.width = 35;
bird.height = 35;
carrot.src = "carrot.png";
cake.src = "cake.png";
cabbage.src = "cabbage.png";

birdXPos = 30;
birdYPos = 30;
grav = 1;
targetSpeed = 2;

document.addEventListener("keydown", function() {
  if (event.key == "ArrowDown") {
    birdYPos += 20;
  } else if (event.key == "ArrowUp") {
    birdYPos -= 20;
  } else if (event.key == "ArrowLeft") {
    birdXPos -= 20;
  } else if (event.key == "ArrowRight") {
    birdXPos += 20;
  }
});

function targetRand() {
  let targetArray = [carrot, cake, cabbage];
  //setTimeout()
  return targetArray[Math.floor(Math.random() * targetArray.length)];
}
var targets = [targetRand()];

function checkLive() {
  var lives = document.getElementById("lives");
  if (lives.querySelectorAll(".live").length > 0) {
    var elem = lives.querySelector(".live");
    elem.parentNode.removeChild(elem);
  } else if (lives.querySelectorAll(".live").length == 0) {
    alert("Game Over :(");
    location.reload();
  }
}

function draw() {
  ctx.drawImage(bg, 0, 0);
  ctx.drawImage(bird, birdXPos, birdYPos, bird.width, bird.height);

  for (let i = 0; i < target.length; i++) {
    ctx.drawImage(targets[i], target[i].x, target[i].y, 35, 35);
    target[i].x -= targetSpeed;
    if (target[i].x == 450 && target.length < 10) {
      target.push({
        x: cvs.width,
        y: Math.floor(Math.random() * 450) + 1
      });
      targets.push(targetRand());
    }

    if (target[i].x == 0 || target.length == 0) {
      this.checkLive();
    }

    if (
      birdXPos + bird.width >= target[i].x &&
      birdXPos <= target[i].x + 35 &&
      birdYPos + bird.height >= target[i].y &&
      birdYPos <= target[i].y + 35
    ) {
      points++;
      target[i].x = cvs.width+1000;
      target[i].y = Math.floor(Math.random() * 450) + 1;
      /*target.push({
        x: cvs.width,
        y: Math.floor(Math.random() * 450) + 1
      });*/
      targets.push(targetRand());
      //target.splice(i, 1);
      //audio.play();
    }
    if (birdYPos + 30 >= cvs.height - 85) {
      birdYPos -= 400;
      this.checkLive();
    }
  }

  birdYPos += grav;
  ctx.fillStyle = "#fff";
  ctx.font = "48px";
  ctx.fillText("Points " + points, 10, 580);
  ctx.fillText(`Array Length: ${target.length}`, 60, 580);
  ctx.fillText(`Pos Length: ${targets.length}`, 150, 580);
  requestAnimationFrame(draw);
}
cabbage.onload = draw();