function drawBoard() {
  window.requestAnimationFrame(drawBoard);

  var canvas = document.getElementById('game-canvas');

  console.log("Drawing now...")

  if (!canvas) {
    return; // <canvas> doesn't exist yet, don't do anything
  }

  var ctx = canvas.getContext('2d')

  if (!ctx) {
    return; // browser doesn't support drawing
  }

  var width = 300;
  var height = 150;

  var foodRadius = 3;

  var niceColors = ['rgb(205, 0, 116)',
    'rgb(85, 43, 114)',
    'rgb(55, 139, 46)',
    'rgb(170, 57, 57)',
    'rgb(255, 219, 0)',
    'rgb(255, 124, 0)',
    'rgb(255, 19, 0)',
    'rgb(10, 101, 164)']


  var x = Math.round(Math.random() * width);
  var y = Math.round(Math.random() * height);
  ctx.fillStyle = niceColors[Math.floor(Math.random() * niceColors.length)]

  ctx.beginPath();
  ctx.arc(x, y, foodRadius, 0, Math.PI*2, false);
  ctx.closePath();
  ctx.fill();

};

window.requestAnimationFrame(drawBoard);
