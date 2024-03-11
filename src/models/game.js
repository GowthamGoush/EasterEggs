import { Player } from "./player";
import Obstacle from "./obstacle";
import Egg from "./egg";
import Toad from "./toad";

import { getRandomPositionArray } from "../utils/game_utils";

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.debug = false;
    this.topMargin = 260;
    this.obstaclesCount = 5;
    this.collisionRadius = 60;
    this.obstacleMinSpacing = 200;
    this.obstacles = [];
    this.eggs = [];
    this.toads = [];
    this.hatchlings = [];
    this.eggTimer = 0;
    this.eggInterval = 1000;
    this.eggCountMax = 10;
    this.toadCountMax = 5;
    this.score = 0;
    this.lostHatchlings = 0;
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
      verticalMargin: this.topMargin,
      size: this.collisionRadius,
      count: this.obstaclesCount,
      distanceBuffer: this.obstacleMinSpacing,
    });

    obstaclesPositions.forEach((position) => {
      this.obstacles.push(new Obstacle(this, position));
    });

    this.addToads();
  }

  addEgg() {
    this.eggs.push(new Egg(this));
  }

  addToads() {
    for (let count = 0; count < this.toadCountMax; count++) {
      this.toads.push(new Toad(this));
    }
  }

  removeGameObjects() {
    this.eggs = this.eggs.filter((egg) => !egg.markedForDeletion);
    this.hatchlings = this.hatchlings.filter(
      (hatchling) => !hatchling.markedForDeletion
    );
  }

  checkCollision(objectA, objectB) {
    const dx = objectA.collisionX - objectB.collisionX;
    const dy = objectA.collisionY - objectB.collisionY;

    const distance = Math.hypot(dy, dx);
    const sumOfRadii = objectA.collisionRadius + objectB.collisionRadius;

    return { collision: distance < sumOfRadii, distance, sumOfRadii, dx, dy };
  }

  render(context, deltaTime) {
    const gameObjects = [
      ...this.obstacles,
      ...this.eggs,
      ...this.toads,
      ...this.hatchlings,
      this.player,
    ];

    /**
     *  Orders the rendering of objects based on Y-axis to provide pseudo 3D effect
     */
    gameObjects.sort(
      (objectA, objectB) => objectA.collisionY - objectB.collisionY
    );

    gameObjects.forEach((object) => {
      object.draw(context);
      object.update(deltaTime);
    });

    if (
      this.eggTimer > this.eggInterval &&
      this.eggs.length < this.eggCountMax
    ) {
      this.addEgg();
      this.eggTimer = 0;
    } else {
      this.eggTimer += deltaTime;
    }

    context.save();
    context.textAlign = "left";
    context.fillText(`Score: ${this.score}`, 25, 50);

    if (this.debug) {
      context.fillText(`Lost: ${this.lostHatchlings}`, 25, 100);
    }

    context.restore();
  }
}
