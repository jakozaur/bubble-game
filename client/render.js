function drawBoard () {
  window.requestAnimationFrame(drawBoard);

  var canvas = document.getElementById('game-canvas');

  //console.log("Drawing now...")

  if (!canvas) {
    return; // <canvas> doesn't exist yet, don't do anything
  }

  var ctx = canvas.getContext('2d')

  if (!ctx) {
    return; // browser doesn't support drawing
  }

  var width = 300;
  var height = 150;

  var game = Game.findOne(GameId);

  if (!game) {
    return; // server has not create game yet
  }

  ctx.clearRect(0, 0, width, height);
  _.each(game.food, function (el) {
    ctx.fillStyle = Configuration.food.colors[el.color];
    ctx.beginPath();
    ctx.arc(el.x, el.y, Configuration.food.radius, 0, Math.PI*2, false);
    ctx.closePath();
    ctx.fill();
  });
};

window.requestAnimationFrame(drawBoard);
