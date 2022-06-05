const canvas = document.querySelector("#my-canvas");
const c = canvas.getContext("2d");
const lightPrimary = "#c4c4c4";
const bgDark = "#333";
const ww = window.innerWidth;
const wh = window.innerHeight;

canvas.width = ww;
canvas.height = wh;

function clearCanvas() {
  c.clearRect(0, 0, ww, wh);
}

function customRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

class Ball {
  constructor(x, y) {
    this.baseR = 30;
    this.r = this.baseR;
    this.x = x || customRandom(0 + this.r, ww - this.r);
    this.y = y || customRandom(0 + this.r, wh - this.r);
    this.xs = (Math.random() - 0.5) * 10;
    this.ys = (Math.random() - 0.5) * 10;
    this.draw();
  }

  draw() {
    c.beginPath();
    c.fillStyle = lightPrimary;
    c.strokeStyle = bgDark;
    c.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    c.fill();
    c.stroke();
  }

  update() {
    if (this.x + 40 > ww || this.x - 40 < 0) {
      this.xs = -this.xs;
    }
    if (this.y + 40 > wh || this.y - 40 < 0) {
      this.ys = -this.ys;
    }
    this.x += this.xs;
    this.y += this.ys;
    this.draw();
  }
}

const balls = [];
for (let i = 0; i < 100; i++) {
  balls.push(new Ball());
}

function animate() {
  clearCanvas();
  balls.forEach((b) => b.update());
  requestAnimationFrame(animate);
}
animate();

//add another ball on click
window.addEventListener("click", (e) => {
  balls.push(new Ball(e.x, e.y));
});

//change balls near to the mouse like a hover effect
// window.addEventListener("mousemove", (event) => {
//   balls.forEach((b) => {
//     const distance = Math.sqrt(
//       Math.pow(event.x - b.x, 2) + Math.pow(event.y - b.y, 2)
//     );

//     if (distance < 150 && b.r < b.baseR * 2.4) {
//       b.r += 5;
//     } else if (distance > 150 && b.r > b.baseR) {
//       b.r -= 2;
//     }
//   });
// });
