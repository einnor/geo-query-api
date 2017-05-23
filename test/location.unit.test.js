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
});
