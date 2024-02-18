import { Player } from "./player";
import Obstacle from "./obstacle";
import { getRandomPositionArray } from "../utils";

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.obstaclesCount = 5;
    this.obstacleRadius = 60;
    this.obstacleMinSpacing = 200;
    this.obstacles = [];
    this.mouse = {
      posX: this.width * 0.5,
      posY: this.height * 0.5,
      pressed: false,
    };
    this.player = new Player(this);
    this.image = document.getElementById("obstacles");

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
    this.obstacles.forEach((obstacle) => obstacle.draw(context));
  }

  init() {
    const obstaclesPositions = getRandomPositionArray({
      gameWidth: this.width,
      gameHeight: this.height,
      verticalMargin: 260,
      size: this.obstacleRadius,
      count: this.obstaclesCount,
      distanceBuffer: this.obstacleMinSpacing,
    });

    obstaclesPositions.forEach((position) => {
      this.obstacles.push(new Obstacle(this, position));
    });
  }
}
