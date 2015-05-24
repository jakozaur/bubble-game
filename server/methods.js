Meteor.methods({
  createNewPlayer: function () {
    var newPlayerId = Random.hexString(23);
    var modify = {$set: {}};
    modify['$set']['player.' + newPlayerId] = {
      x: Configuration.board.width / 2,
      y: Configuration.board.height / 2,
      radius: Configuration.player.initialRadius,
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
