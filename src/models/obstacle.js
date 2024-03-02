class Obstacle {
  constructor(game, position) {
    this.game = game;
    this.image = document.getElementById("obstacles");
    this.collisionX = position.posX;
    this.collisionY = position.posY;
    this.obstacleWidth = 250;
    this.obstacleHeight = 250;
    this.width = this.obstacleWidth;
    this.height = this.obstacleHeight;
    this.spriteX = this.collisionX - this.width * 0.5;
    this.spriteY = this.collisionY - this.width * 0.5 - 80;
    this.frameX = Math.floor(Math.random() * 4);
    this.frameY = Math.floor(Math.random() * 3);
    this.collisionRadius = this.game.collisionRadius;
  }

  draw(context) {
    console.log("===", context);
    context.drawImage(
      this.image,
      this.frameX * this.obstacleWidth,
      this.frameY * this.obstacleHeight,
      this.obstacleWidth,
      this.obstacleHeight,
      this.spriteX,
      this.spriteY,
      this.width,
      this.height
    );

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

export default Obstacle;
