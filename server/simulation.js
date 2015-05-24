Meteor.startup(function () {
  Game.update(GameId, {$set: {
    lastNewFood: Date.now(),
    food: [],
    player: {},
    cursor: {}
  }}, {
    upsert: true
  });
});

Meteor.setInterval(function () {
  var game = Game.findOne(GameId);
  var lastNewFood = game.lastNewFood;
  var now = Date.now();

  if ((now - game.lastNewFood) >= 1000 / Configuration.food.newPerSecond &&
      game.food.length < Configuration.food.maximumItems) {
    // Add new food
    var foodRadius = Configuration.food.radius;
    var x = Math.round(foodRadius +
      Math.random() * (Configuration.board.width - 2 * foodRadius));
    var y = Math.round(foodRadius +
      Math.random() * (Configuration.board.height - 2 * foodRadius));
    var color = Math.floor(Math.random() * Configuration.food.colors.length);
    game.food.push({x: x, y: y, color: color});
    lastNewFood = now;
  }

  var newPlayers = {};
  _.each(_.pairs(game.player), function (pair) {
    var id = pair[0];
    var player = pair[1];

    var cursor = game.cursor[id];
    if (cursor) {
      var move = {
        x: cursor.x - player.x,
        y: cursor.y - player.y
      };
      var cursorMaxMove = Configuration.player.cursorMaxMove;
      move.x = Math.min(Math.max(-cursorMaxMove, move.x), cursorMaxMove) / cursorMaxMove;
      move.y = Math.min(Math.max(-cursorMaxMove, move.y), cursorMaxMove) / cursorMaxMove;

      player.x += move.x;
      player.y += move.y;
      player.x = Math.min(Math.max(player.x, 0), Configuration.board.width);
      player.y = Math.min(Math.max(player.y, 0), Configuration.board.height);
    }

    var eatDistance2 = Math.pow(player.radius, 2);
    for (var i = 0; i < game.food.length; ) {
      var food = game.food[i];
      var distance2 = Math.pow(food.x - player.x, 2) + Math.pow(food.y - player.y, 2);
      if (distance2 <= eatDistance2) {
        var last = game.food.pop();
        if (i < game.food.length) {
          game.food[i] = last;
        }
        player.size += 1;
        player.radius = Math.sqrt(player.size);
      } else {
        i++;
      }
    }

    newPlayers[id] = player;
  });

  Game.update(GameId, {$set: {
    food: game.food,
    lastNewFood: lastNewFood,
    player: newPlayers
  }});

}, 1000 / Configuration.simulation.framePerSeconds);
