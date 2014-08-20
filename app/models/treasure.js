'use strict';

var _     = require('lodash'),
    Mongo = require('mongodb');

function Treasure(o){
  this.name = o.name;
  this.location = o.location;
  this.lat = parseFloat(o.lat);
  this.lng = parseFloat(o.lng);
}

Object.defineProperty(Treasure, 'collection', {
  get: function(){return global.mongodb.collection('treasures');}
});

Treasure.prototype.save = function(cb){
  Treasure.collection.save(this, cb);
};

Treasure.all = function(cb){
  Treasure.collection.find().toArray(function(err,objects){
    var treasures = objects.map(function(o){
      return rePrototype(o);
    });

    cb (treasures);
  });
};

Treasure.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);

  Treasure.collection.findOne({_id:_id}, function(err, obj){
    var t = rePrototype(obj);

    cb(t);
  });
};

module.exports = Treasure;

// PRIVATE FUNCTIONS

function rePrototype(obj){
  var t = _.create(Treasure.prototype, obj);
  return t;
}
