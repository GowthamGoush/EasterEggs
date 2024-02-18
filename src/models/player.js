export class Player {
  constructor(game) {
    this.game = game;
    this.collisionX = game.mouse.posX;
    this.collisionY = game.mouse.posY;
    this.collisionRadius = 20;
    this.dx = 0;
    this.dy = 0;
    this.speedX = 0;
    this.speedY = 0;
    this.speedModifier = 15;
  }

  draw(context) {
    context.beginPath();
    context.arc(this.collisionX, this.collisionY, 15, 0, Math.PI * 2);
    context.save();

    context.globalAlpha = 0.5;

    context.fill();

    context.restore();
    context.moveTo(this.game.mouse.posX, this.game.mouse.posY);
    context.lineTo(this.collisionX, this.collisionY);
    context.stroke();
  }

  update() {
    this.dx = this.game.mouse.posX - this.collisionX;
    this.dy = this.game.mouse.posY - this.collisionY;

    const distance = Math.hypot(this.dx, this.dy);

    console.log(distance, this.speedModifier);

    if (distance > this.speedModifier) {
      this.speedX = this.dx / distance || 0;
      this.speedY = this.dy / distance || 0;
    } else {
      this.speedX = 0;
      this.speedY = 0;
    }

    this.collisionX += this.speedX * this.speedModifier;
    this.collisionY += this.speedY * this.speedModifier;
  }
}
