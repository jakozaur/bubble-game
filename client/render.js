OurPlayerId = null;

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

  var game = Game.findOne(GameId);

  if (!game) {
    return; // server has not create game yet
  }

  ctx.clearRect(0, 0, Configuration.board.width, Configuration.board.height);

  _.each(game.food, function (el) {
    ctx.fillStyle = Configuration.food.colors[el.color];
    ctx.beginPath();
    ctx.arc(el.x, el.y, Configuration.food.radius, 0, Math.PI*2, false);
    ctx.closePath();
    ctx.fill();
  });

  _.each(_.pairs(game.player), function (pair) {
    var id = pair[0];
    var el = pair[1];
    ctx.fillStyle = Configuration.player.colors[el.color];
    ctx.beginPath();
    ctx.arc(el.x, el.y, el.radius, 0, Math.PI*2, false);
    ctx.closePath();
    ctx.fill();
  });
};

Template.canvas.onRendered(function () {
  Meteor.call('createNewPlayer', [], function (error, result) {
    OurPlayerId = result;
  });
  window.requestAnimationFrame(drawBoard);

  var canvas = document.getElementById('game-canvas');
  canvas.width = Configuration.board.width;
  canvas.height = Configuration.board.height;
  canvas.addEventListener('mousemove', _.throttle(function (event) {
    if (OurPlayerId) {
      var cursorX = event.clientX * Configuration.board.width / $(document).width();
      var cursorY = event.clientY * Configuration.board.height / $(document).height();

      Meteor.call('setPlayerCursor', OurPlayerId, cursorX, cursorY);
    }
  }, 1000 / Configuration.player.cursorPerSecond));
});
