class Toad {
  constructor(game) {
    this.game = game;
    this.image = document.getElementById("toad");
    this.collisionRadius = 30;
    this.speedX = Math.random() * 3 + 0.5;
    this.margin = this.collisionRadius * 2;
    this.spriteWidth = 140;
    this.spriteHeight = 260;
    this.width = this.spriteWidth;
    this.height = this.spriteHeight;
    this.collisionX =
      this.game.width + this.width + Math.random() * this.game.width * 0.5;
    this.collisionY =
      this.game.topMargin +
      Math.random() * (this.game.height - this.game.topMargin - this.margin);
    this.spriteX = this.collisionX - this.width * 0.5;
    this.spriteY = this.collisionY - this.height * 0.5 - 30;
    this.frameX = 0;
    this.frameY = Math.floor(Math.random() * 4);
  }

  draw(context) {
    context.drawImage(
      this.image,
      this.frameX * this.spriteWidth,
      this.frameY * this.spriteHeight,
      this.spriteWidth,
      this.spriteHeight,
      this.spriteX,
      this.spriteY,
      this.spriteWidth,
      this.spriteHeight
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
      context.stroke();
    }
  }

  update() {
    this.spriteX = this.collisionX - this.width * 0.5;
    this.spriteY = this.collisionY - this.height * 0.5 - 60;
    this.collisionX -= this.speedX;

    if (this.spriteX + this.width < 0 && !this.game.over) {
      this.collisionX =
        this.game.width + this.width + Math.random() * this.game.width * 0.5;
      this.collisionY =
        this.game.topMargin +
        Math.random() * (this.game.height - this.game.topMargin - this.margin);
      this.frameY = Math.floor(Math.random() * 4);
    }

    const collisionObjects = [...this.game.obstacles, this.game.player];
    collisionObjects.forEach((obstacle) => {
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

export default Toad;
