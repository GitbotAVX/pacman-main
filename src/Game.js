import TileMap from "./TileMap.js";

const tileSize = 32;
const velocity = 2;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const tileMap = new TileMap(tileSize);
const pacman = tileMap.getPacman(velocity)

function gameLoop() {
  tileMap.draw(ctx);
  pacman.draw(ctx)
}

tileMap.setCanvasSize(canvas); // custom method to determine canvas size by tilemap wid and hei

setInterval(gameLoop, 1000 / 75); // run gameLoop() 75 times per second
