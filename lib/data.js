Game = new Mongo.Collection('game');
GameId = 'f8b0598ae644f113231eed4b1e5f7345';

Configuration = {
  simulation: {
    framePerSeconds: 30,
  },
  board: {
    width: 600,
    height: 300
  },
  food: {
    newPerSecond: 1,
    maximumItems: 150,
    radius: 4,
    colors: ['rgb(205, 0, 116)',
      'rgb(85, 43, 114)',
      'rgb(55, 139, 46)',
      'rgb(170, 57, 57)',
      'rgb(255, 219, 0)',
      'rgb(255, 124, 0)',
      'rgb(255, 19, 0)',
      'rgb(10, 101, 164)']
  },
  player: {
    cursorMaxMove: 20,
    cursorPerSecond: 10,
    initialRadius: 10,
    foodSizeToReal: 50,
    initialFoodSize: 10,
    bigEnoughToEat: 1.1,
    foodSizeToRadius: function (foodSize) {
      return Math.sqrt(foodSize * Configuration.player.foodSizeToReal) / Math.PI;
    },
    colors: ['rgb(247, 0, 0)',
      'rgb(243, 246, 48)',
      'rgb(119, 219, 42)',
      'rgb(30, 189, 211)',
      'rgb(53, 72, 219)',
      'rgb(218, 27, 202)',
      'rgb(153, 37, 217)',
      'rgb(255, 32, 32)']
  }

};
