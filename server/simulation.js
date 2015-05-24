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

  var players = _.pairs(game.player);
  for (var j = 0; j < players.length; j++) {
    var id = players[j][0];
    var player = players[j][1];

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

    var eatDistance2 = Math.pow(Configuration.player.foodSizeToRadius(player.size), 2);

    // Eating food :)
    for (var i = 0; i < game.food.length; ) {
      var food = game.food[i];
      var distance2 = Math.pow(food.x - player.x, 2) +
        Math.pow(food.y - player.y, 2);
      if (distance2 <= eatDistance2) {
        var last = game.food.pop();
        if (i < game.food.length) {
          game.food[i] = last;
        }
        player.size += 1;
      } else {
        i++;
      }
    }

    // Eating players :)
    for (var i = 0; i < players.length; i++) {
      if (i == j) continue;

      var distance2 = Math.pow(players[i][1].x - player.x, 2) +
        Math.pow(players[i][1].y - player.y, 2);

      // Eat only if inside me and radius is large enough
      if (distance2 <= eatDistance2) {
        var radiusToEat =
          Configuration.player.foodSizeToRadius(players[i][1].size) * Configuration.player.bigEnoughToEat;
        if (radiusToEat < Configuration.player.foodSizeToRadius(player.size)) {
          player.size += players[i][1].size;
          var last = players.pop();
          if (i < players.length) {
            players[i] = last;
            i--;
          }
        }
      }
    }
  }

  game.player = {};
  _.each(players, function (pair) {
    game.player[pair[0]] = pair[1];
  });

  Game.update(GameId, {$set: {
    food: game.food,
    lastNewFood: lastNewFood,
    player: game.player
  }});

}, 1000 / Configuration.simulation.framePerSeconds);
