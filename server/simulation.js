Meteor.startup(function () {
  Game.update(GameId, {$set: {
    lastNewFood: Date.now(),
    food: [],
    player: {}
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
    Game.update(GameId, {$push: {
      food: {x: x, y: y, color: color}
    }, $set: {
      lastNewFood: now
    }});
  }

}, 1000 / Configuration.simulation.framePerSeconds);
