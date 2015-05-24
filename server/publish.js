Meteor.publish(null, function () {
  return Game.find({}, {fields: {cursor: 0}});
});
