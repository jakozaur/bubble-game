Meteor.methods({
  createNewPlayer: function (name) {
    var newPlayerId = Random.hexString(23);
    var modify = {$set: {}};
    var initialRadius = Configuration.player.foodSizeToRadius(
      Configuration.player.initialFoodSize);
    var x = Math.floor(Math.random() * Configuration.board.width -
      2 * initialRadius) + initialRadius;
    var y = Math.floor(Math.random() * Configuration.board.height -
      2 * initialRadius) + initialRadius;
    modify['$set']['player.' + newPlayerId] = {
      x: x,
      y: y,
      name: name,
      size: Configuration.player.initialFoodSize,
      color: Math.floor(Math.random() * Configuration.player.colors.length)
    }
    Game.update(GameId, modify);
    return newPlayerId;
  },

  setPlayerCursor: function(playerId, x, y) {
    var modify = {$set: {}};
    modify['$set']['cursor.' + playerId] = {
      x: x,
      y: y
    }
    Game.update(GameId, modify);
  }
});
