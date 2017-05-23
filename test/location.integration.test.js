"use strict";

var request = require('supertest');
var api = request('http://localhost:3000');
var chai = require('chai');
var expect = chai.expect;
var should = chai.should;
var app = require('../server.js');
var mongoose = require('mongoose');
var Location = mongoose.model('Location', 'LocationSchema');

describe('Location CRUD integration testing', function() {

  describe('GET:/locations fetch all location', function() {

    it('should return a 200 response', function (done) {
			api.get('/api/locations')
         .set('Accept', 'application/json')
			   .expect(200, done);
		});

    it('should return locations as an array', function(done) {
      api.get('/api/locations')
         .set('Accept', 'application/json')
         .end(function(err, res) {
           expect(res.body.location).to.be.a('array');
           done();
         });
    });

    it('should return status as true', function(done) {
      api.get('/api/locations')
         .set('Accept', 'application/json')
         .end(function(err, res) {
           expect(res.body.status).to.be.true;
           done();
         });
    });
  });
});
