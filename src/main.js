import { Game } from "./models/game";

window.addEventListener("load", function () {
  const canvas = document.getElementById("game-canvas");
  const context = canvas.getContext("2d");

  canvas.width = 1280;
  canvas.height = 720;

  context.fillStyle = "white";
  context.strokeStyle = "white";

  const game = new Game(canvas);
  game.init();

  function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    game.render(context);
    window.requestAnimationFrame(animate);
  }

  animate();
});
