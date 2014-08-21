'use strict';

var Treasure = require('../models/treasure'),
    mp       = require('multiparty');

exports.init = function(req, res){
  res.render('treasures/init');
};

exports.create = function(req, res){
  var form = new mp.Form();
  form.parse(req, function(err, fields, files){
    Treasure.create(fields, files, function(){
      res.redirect('/treasures');
    });
  });
};

exports.index = function(req, res){
  Treasure.all(function(treasures){
    console.log('controller - treasures: ', treasures);
    res.render('treasures/index', {treasures:treasures});
  });
};

