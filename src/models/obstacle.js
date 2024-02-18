class Obstacle {
  constructor(game, position) {
    this.game = game;
    this.collisionX = position.posX;
    this.collisionY = position.posY;
    this.collisionRadius = 60;
  }

  draw(context) {
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
