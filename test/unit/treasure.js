/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Treasure    = require('../../app/models/treasure'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    Mongo     = require('mongodb'),
    db        = 'treasures';

describe('Treasure', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new Treasure object', function(){
      var o = {name:'Silver', location:'piggy bank'},
          t = new Treasure(o);
      expect(t).to.be.instanceof(Treasure);
      expect(t.name).to.equal('Silver');
    });
  });

  describe('#save', function(){
    it('should save a treasure to the db', function(done){
      var o = {name:'Copper', location:'wires'},
          t = new Treasure(o);
      t.save(function(){
        expect(t._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });

  describe('.all', function(){
    it('should get all treasures', function(done){
      Treasure.all(function(treasures){
        expect(treasures).to.have.length(3);
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should return the treasure with the given id', function(done){
      Treasure.findById('000000000000000000000002', function(t){
        expect(t.name).to.equal('Diamond');
        done();
      });
    });
  });

});

