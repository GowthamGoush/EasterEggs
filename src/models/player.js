import { getPlayerPositionIndex } from "../utils/player_utils";

export class Player {
  constructor(game) {
    this.game = game;
    this.image = document.getElementById("bull");
    this.collisionX = game.mouse.posX;
    this.collisionY = game.mouse.posY;
    this.collisionRadius = 20;
    this.dx = 0;
    this.dy = 0;
    this.speedX = 0;
    this.speedY = 0;
    this.speedModifier = 15;
    this.playerWidth = 255;
    this.playerheight = 255;
    this.width = this.playerWidth;
    this.height = this.playerheight;
    this.spriteX;
    this.spriteY;
    this.frameX = 0;
    this.frameY = 0;
  }

  draw(context) {
    context.drawImage(
      this.image,
      this.frameX * this.playerWidth,
      this.frameY * this.playerheight,
      this.playerWidth,
      this.playerheight,
      this.spriteX,
      this.spriteY,
      this.width,
      this.height
    );

    if (this.game.debug) {
      context.beginPath();
      context.arc(
        this.collisionX,
        this.collisionY,
        this.collisionRadius,
        0,
        Math.PI * 2
      );
      context.save();

      context.globalAlpha = 0.5;

      context.fill();

      context.restore();
      context.moveTo(this.game.mouse.posX, this.game.mouse.posY);
      context.lineTo(this.collisionX, this.collisionY);
      context.stroke();
    }
  }

  update() {
    this.dx = this.game.mouse.posX - this.collisionX;
    this.dy = this.game.mouse.posY - this.collisionY;

    this.frameY = getPlayerPositionIndex(this.dx, this.dy);

    const distance = Math.hypot(this.dx, this.dy);

    if (distance > this.speedModifier) {
      this.speedX = this.dx / distance || 0;
      this.speedY = this.dy / distance || 0;
    } else {
      this.speedX = 0;
      this.speedY = 0;
    }

    this.collisionX += this.speedX * this.speedModifier;
    this.collisionY += this.speedY * this.speedModifier;

    this.spriteX = this.collisionX - this.width * 0.5;
    this.spriteY = this.collisionY - this.height * 0.5 - 100;

    this.game.obstacles.forEach((obstacle) => {
      const { collision, distance, sumOfRadii, dx, dy } =
        this.game.checkCollision(this, obstacle);

      if (collision) {
        const unitX = dx / distance;
        const unitY = dy / distance;

        this.collisionX = obstacle.collisionX + (sumOfRadii + 1) * unitX;
        this.collisionY = obstacle.collisionY + (sumOfRadii + 1) * unitY;
      }
    });
  }
}
