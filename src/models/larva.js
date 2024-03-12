class Larva {
  constructor(game, posX, posY) {
    this.game = game;
    this.image = document.getElementById("larva");
    this.collisionRadius = 30;
    this.speedY = Math.random() + 1;
    this.spriteWidth = 150;
    this.spriteHeight = 150;
    this.width = this.spriteWidth;
    this.height = this.spriteHeight;
    this.collisionX = posX;
    this.collisionY = posY;
    this.spriteX = this.collisionX - this.width * 0.5;
    this.spriteY = this.collisionY - this.height * 0.5 - 30;
    this.frameX = 0;
    this.frameY = Math.floor(Math.random() * 2);
    this.markedForDeletion = false;
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
    this.spriteY = this.collisionY - this.height * 0.5 - 40;
    this.collisionY -= this.speedY;

    /**
     *  Check and remove #Larva when moves to safety
     */
    if (this.spriteY + (this.height - this.game.topMargin) < 0) {
      this.markedForDeletion = true;
      this.game.removeGameObjects();

      if (!this.game.over) this.game.score++;
    }

    /**
     *  Movement physics for #Larva on collision with #Player & #Obstacles
     */
    const collisionObjects = [...this.game.obstacles, this.game.player];
    collisionObjects.forEach((object) => {
      const { collision, distance, sumOfRadii, dx, dy } =
        this.game.checkCollision(this, object);
      if (collision) {
        const unitX = dx / distance;
        const unitY = dy / distance;
        this.collisionX = object.collisionX + (sumOfRadii + 1) * unitX;
        this.collisionY = object.collisionY + (sumOfRadii + 1) * unitY;
      }
    });

    /**
     *  Movement physics for #Larva on collision with #Toads
     */
    const collisionEnemies = [...this.game.toads];
    collisionEnemies.forEach((object) => {
      const { collision } = this.game.checkCollision(this, object);
      if (collision) {
        this.markedForDeletion = true;
        this.game.removeGameObjects();

        this.game.lostHatchlings++;
      }
    });
  }
}

export default Larva;
