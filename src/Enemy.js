import MovingDirection from "./MovingDirection.js";
// paused work at 2:12:34
export default class Enemy {
  constructor(x, y, tileSize, velocity, tileMap) {
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
    this.velocity = velocity;
    this.tileMap = tileMap;

    this.movingDirection = Math.floor(
      Math.random() * Object.keys(MovingDirection).length
    );
    this.directionTimerDefault = this.#random(1, 3);
    this.directionTimer = this.directionTimerDefault;

    this.#loadImages();
  }
  draw(ctx, pause) {
    if (!pause) {

      this.#move();
      this.#changeDirection();
    }
    ctx.drawImage(this.image, this.x, this.y, this.tileSize, this.tileSize);
  }

  #loadImages() {
    this.normalGhost = new Image();
    this.normalGhost.src = "../images/ghost.png";
    this.scaredGhost = new Image();
    this.scaredGhost.src = "../images/scaredGhost.png";
    this.normalGhost2 = new Image();
    this.normalGhost2.src = "../images/scaredGhost2.png";

    this.image = this.normalGhost;
  }
  #random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  #move() {
    if (
      !this.tileMap.didCollideWithEnvironment(
        this.x,
        this.y,
        this.movingDirection
      )
    ) {
      switch (this.movingDirection) {
        case MovingDirection.up:
          this.y -= this.velocity;
          break;
        case MovingDirection.down:
          this.y += this.velocity;
          break;
        case MovingDirection.left:
          this.x -= this.velocity;
          break;
        case MovingDirection.right:
          this.x += this.velocity;
          break;
      }
    }
  }

  #changeDirection() {
    this.directionTimer--;
    let newMoveDirection = null;
    if (this.directionTimer == 0) {
      this.directionTimer = this.directionTimerDefault;
      newMoveDirection = Math.floor(
        Math.random() * Object.keys(MovingDirection).length
      );
    }

    if (newMoveDirection != null && newMoveDirection != this.movingDirection) {
      if (
        Number.isInteger(this.x / this.tileSize) &&
        Number.isInteger(this.y / this.tileSize)
      ) {
        if (
          !this.tileMap.didCollideWithEnvironment(
            this.x,
            this.y,
            newMoveDirection
          )
        ) {
          this.movingDirection = newMoveDirection;
        }
      }
    }
  }
}
