Game = new Mongo.Collection('game');
GameId = 'f8b0598ae644f113231eed4b1e5f7345';

Configuration = {
  simulation: {
    framePerSeconds: 30,
  },
  board: {
    width: 300,
    height: 150
  },
  food: {
    newPerSecond: 1,
    radius: 2,
    colors: ['rgb(205, 0, 116)',
      'rgb(85, 43, 114)',
      'rgb(55, 139, 46)',
      'rgb(170, 57, 57)',
      'rgb(255, 219, 0)',
      'rgb(255, 124, 0)',
      'rgb(255, 19, 0)',
      'rgb(10, 101, 164)']
  }

};
