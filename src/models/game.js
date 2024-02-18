import { Player } from "./player";

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.mouse = {
      posX: this.width * 0.5,
      posY: this.height * 0.5,
      pressed: false,
    };
    this.player = new Player(this);

    canvas.addEventListener("mousedown", (e) => {
      this.mouse.posX = e.offsetX;
      this.mouse.posY = e.offsetY;
      this.mouse.pressed = true;
    });
    canvas.addEventListener("mousemove", (e) => {
      if (this.mouse.pressed) {
        this.mouse.posX = e.offsetX;
        this.mouse.posY = e.offsetY;
      }
    });
    canvas.addEventListener("mouseup", (e) => {
      this.mouse.posX = e.offsetX;
      this.mouse.posY = e.offsetY;
      this.mouse.pressed = false;
    });
  }

  render(context) {
    this.player.draw(context);
    this.player.update();
  }
}
