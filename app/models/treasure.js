'use strict';

var _     = require('lodash'),
    Mongo = require('mongodb');

function Treasure(o){
  console.log('CONSTRUCTOR: o', o);
  this.name       = o.name;
  this.loc        = o.location;
  this.lat        = parseFloat(o.lat);
  this.lng        = parseFloat(o.lng);
  this.difficulty = o.difficulty;
  this.hint       = o.hint;
  this.found      = false;
  /*
  this.photos     = o.photos;
  */
  console.log('CONSTRUCTOR:', this);
}

Object.defineProperty(Treasure, 'collection', {
  get: function(){return global.mongodb.collection('treasures');}
});

Treasure.prototype.save = function(cb){
  Treasure.collection.save(this, cb);
};

Treasure.create = function(fields, files, cb){
  console.log('model-create fields:', fields);
  console.log('model-create files:', files);
  console.log('model-create fields.name[0]:', fields.name[0]);
  console.log('model-create fields.difficulty:', fields.difficulty);
  var o = {name: fields.name[0],
        loc: fields.location[0],
        lat: fields.lat[0],
        lng: fields.lng[0],
        difficulty: fields.difficulty[0],
      hint: fields.hint[0]},
      t = new Treasure(o);
  Treasure.collection.save(t, cb);
};

Treasure.all = function(cb){
  Treasure.collection.find().toArray(function(err,objects){
    var treasures = objects.map(function(o){
      console.log('T.all o', o);
      return rePrototype(o);
    });

    console.log('Treasure.all - treasures: ', treasures);
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
