class Egg {
  constructor(game) {
    this.game = game;
    this.image = document.getElementById("egg");
    this.collisionRadius = 40;
    this.margin = this.collisionRadius * 2;
    this.collisionX =
      this.margin + Math.random() * (this.game.width - this.margin * 2);
    this.collisionY =
      this.game.topMargin +
      Math.random() * (this.game.height - this.game.topMargin - this.margin);
    this.spriteWidth = 110;
    this.spriteHeight = 135;
    this.width = this.spriteWidth;
    this.height = this.spriteHeight;
    this.spriteX;
    this.spriteY;
  }

  draw(context) {
    context.drawImage(this.image, this.spriteX, this.spriteY);

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
    this.spriteY = this.collisionY - this.height * 0.5 - 30;

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

export default Egg;
