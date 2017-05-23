"use strict";

var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

var mongoose = require('mongoose');
require('sinon-mongoose');

// import our location model for unit testing
// var Location = mongoose.model('Location', 'LocationSchema');
var Location = require('../app/models/location.model');

describe('Location Unit Testing', function() {

  describe('find() method to fetch all the locations', function() {

    // test will pass if the method find() exists and returns an array of locations
    it('should return an array of locations', function(done) {
      var LocationMock = sinon.mock(Location);
      var expectedResult = [];
      LocationMock.expects('find').yields(null, expectedResult);

      Location.find(function(err, result) {
        LocationMock.verify();
        LocationMock.restore();
        expect(result).to.be.a('array');
        done();
      });
    });
  });


  describe('save() method to save a new location', function() {

    // test will pass if the method save() exists and returns the saved object
    it('should create a new location and return it', function(done) {
      var LocationMock = sinon.mock(new Location({
        name: 'Ruaka Town',
        loc: [26.418, 14.9706]
      }));
      var location = LocationMock.object;
      var expectedResult = {
        name: 'Ruaka Town',
        loc: [26.418, 14.9706]
      };
      LocationMock.expects('save').yields(null, expectedResult);

      location.save(function(err, result) {
        LocationMock.verify();
        LocationMock.restore();
        expect(result).to.be.a('object');
        expect(result.loc).to.be.a('array');
        expect(result.name).to.be.equal('Ruaka Town');
        done();
      });
    });
  });


  describe('save() method to update an existing location and return object', function() {

    // test will pass if the method save() exists and updates an existing location
    it('should update a an existing location', function(done) {
      var LocationMock = sinon.mock(new Location({
        name: 'Ruaka Town',
        loc: [26.418, 14.9706]
      }));
      var location = LocationMock.object;
      var expectedResult = {
        name: 'New Ruaka Town',
        loc: [26.418, 14.9706]
      };
      LocationMock.expects('save').withArgs({name: 'New Ruaka Town'}).yields(null, expectedResult);

      location.save({name: 'New Ruaka Town'}, function(err, result) {
        LocationMock.verify();
        LocationMock.restore();
        expect(result).to.be.a('object');
        expect(result.loc).to.be.a('array');
        expect(result.name).to.be.equal('New Ruaka Town');
        done();
      });
    });
  });


  describe('remove() method to delete an existing location and return object', function() {

    // it will pass if the method remove() exists and the location is deleted
    it('should delete a location by id', function(done) {
      var LocationMock = sinon.mock(new Location({
        _id: 12345,
        name: 'Ruaka Town',
        loc: [26.418, 14.9706]
      }));
      var location = LocationMock.object;
      var expectedResult = {
        _id: 12345,
        name: 'Ruaka Town',
        loc: [26.418, 14.9706]
      };
      LocationMock.expects('remove').withArgs({_id: location._id}).yields(null, expectedResult);

      location.remove({_id: location._id}, function(err, result) {
        LocationMock.verify();
        LocationMock.restore();
        expect(result).to.be.a('object');
        expect(result.loc).to.be.a('array');
        expect(result.name).to.be.equal('Ruaka Town');
        done();
      });
    });
  });


  describe('seed() method to auto-populate the DB with random locations about an arbitary location L', function() {

    it('should add 10 random locations about location L', function(done) {
      var LocationMock = sinon.mock(new Location({
        name: '',
        loc: [26.418, 14.9706]
      }));
      var location = LocationMock.object;
      var expectedResult = [];
      LocationMock.expects('seed').yields(null, expectedResult);

      location.seed(function(err, result) {
        console.log(result);
        LocationMock.verify();
        LocationMock.restore();
        expect(result).to.be.a('array');
        expect(result).to.have.lengthOf(10);
        done();
      });
    });
  });
});
