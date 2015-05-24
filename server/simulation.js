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

  if ((now - game.lastNewFood) >= 1000 / Configuration.food.newPerSecond) {
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
    var el = pair[1];

    var cursor = game.cursor[id];
    if (cursor) {
      el.x += cursor.x;
      el.y += cursor.y;
    }
    
    newPlayers[id] = el;
  });

  Game.update(GameId, {$set: {
    food: game.food,
    lastNewFood: lastNewFood,
    player: newPlayers
  }});

}, 1000 / Configuration.simulation.framePerSeconds);
