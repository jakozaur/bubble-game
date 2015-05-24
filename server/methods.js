Meteor.methods({
  createNewPlayer: function () {
    var newPlayerId = Random.hexString(23);
    var modify = {$set: {}};
    modify['$set']['player.' + newPlayerId] = {
      x: Configuration.board.width / 2,
      y: Configuration.board.height / 2,
      size: Configuration.player.initialSize,
      color: Math.floor(Math.random() * Configuration.player.colors.length)
    }
    Game.update(GameId, modify);
    return newPlayerId;
  }
});
