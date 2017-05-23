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
});
