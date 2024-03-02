import { Player } from "./player";
import Obstacle from "./obstacle";
import { getRandomPositionArray } from "../utils/game_utils";

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.debug = false;
    this.obstaclesCount = 5;
    this.collisionRadius = 60;
    this.obstacleMinSpacing = 200;
    this.obstacles = [];
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
    window.addEventListener("keydown", (e) => {
      if (e.key === "d") this.debug = !this.debug;
    });
  }

  init() {
    const obstaclesPositions = getRandomPositionArray({
      gameWidth: this.width,
      gameHeight: this.height,
      verticalMargin: 260,
      size: this.collisionRadius,
      count: this.obstaclesCount,
      distanceBuffer: this.obstacleMinSpacing,
    });

    obstaclesPositions.forEach((position) => {
      this.obstacles.push(new Obstacle(this, position));
    });
  }

  checkCollision(objectA, objectB) {
    const dx = objectA.collisionX - objectB.collisionX;
    const dy = objectA.collisionY - objectB.collisionY;

    const distance = Math.hypot(dy, dx);
    const sumOfRadii = objectA.collisionRadius + objectB.collisionRadius;

    return { collision: distance < sumOfRadii, distance, sumOfRadii, dx, dy };
  }

  render(context) {
    this.obstacles.forEach((obstacle) => obstacle.draw(context));
    this.player.update();
    this.player.draw(context);
  }
}
