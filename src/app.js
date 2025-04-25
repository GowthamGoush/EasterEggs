import { Game } from "./models/game";

window.addEventListener("load", function () {
  const canvas = document.getElementById("game-canvas");
  const context = canvas.getContext("2d");

  canvas.width = 1280;
  canvas.height = 720;

  function resizeCanvasAndGame() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if (game) {
      game.topMargin = Math.max(200, Math.floor(canvas.height * 0.18)); // adjust margin responsively
      if (typeof game.restart === "function") {
        game.restart();
      }
    }
    context.font = Math.floor(canvas.height * 0.04) + "px Helvetica";
  }

  let game;
  let lastTimeStamp = 0;
  function animate(timestamp) {
    const deltaTime = timestamp - lastTimeStamp;
    lastTimeStamp = timestamp;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "white";
    context.strokeStyle = "white";
    context.font = "40px Helvetica";
    context.textAlign = "center";
    if (game) game.render(context, deltaTime);
    window.requestAnimationFrame(animate);
  }
  function startGame() {
    game = new Game(canvas);
    game.init();
    resizeCanvasAndGame();
    lastTimeStamp = 0;
    animate(0);
  }

  window.addEventListener("resize", resizeCanvasAndGame);

  startGame();
});
