"use strict";

var request = require('supertest');
var api = request('http://localhost:3000');
var chai = require('chai');
var expect = chai.expect;
var should = chai.should;
var app = require('../server.js');
var mongoose = require('mongoose');
var Location = mongoose.model('Location', 'LocationSchema');
var faker = require('faker');

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


  describe('GET:/locations/:id fetch a location by id', function() {

    var response = {};

    before(function(done) {
      var newLocation = {
        name: faker.address.streetName(),
        loc: [faker.address.longitude(), faker.address.latitude()]
      };
      api.post('/api/locations')
         .set('Accept', 'application/x-www-form-urlencoded')
         .send(newLocation)
         .expect('Content-Type', '/json/')
         .expect(200)
         .end(function(err, res) {
           response = res.body;
            done();
          });
    });

    it('should return a 200 response', function (done) {
			api.get('/api/locations/' + response.location._id)
         .set('Accept', 'application/json')
			   .expect(200, done);
		});

    it('should return an object with keys and values', function(done) {
      api.get('/api/locations/' + response.location._id)
         .set('Accept', 'application/json')
         .end(function(err, res) {
           expect(res.body).to.have.property('status');
           expect(res.body.status).to.not.equal(null);
           expect(res.body.location).to.be.a('object');
           expect(res.body.location).to.have.property('name');
           expect(res.body.location.name).to.not.equal(null);
           expect(res.body.location).to.have.property('loc');
           expect(res.body.location.loc).to.not.equal(null);
           expect(res.body.location.loc).to.be.a('array');
           done();
         });
    });

    it('should return status as true', function(done) {
      api.get('/api/locations/' + response.location._id)
         .set('Accept', 'application/json')
         .end(function(err, res) {
           expect(res.body.status).to.be.true;
           done();
         });
    });
  });


  describe('POST:/locations save a new location', function() {

    it('should be able to save a new location', function(done) {
      var newLocation = {
        name: faker.address.streetName(),
        loc: [faker.address.longitude(), faker.address.latitude()]
      };
      api.post('/api/locations')
         .set('Accept', 'application/x-www-form-urlencoded')
         .send(newLocation)
         .expect('Content-Type', '/json/')
         .expect(200)
         .end(function(err, res) {
            expect(res.body).to.be.a('object');
            expect(res.body.status).to.be.true;
            expect(res.body.location).to.be.a('object');
            expect(res.body.location.loc).to.be.a('array');
            done();
          });
    });
  });


  describe('PUT:/locations/:id update a location', function() {

    var response = {};

    before(function(done) {
      var newLocation = {
        name: faker.address.streetName(),
        loc: [faker.address.longitude(), faker.address.latitude()]
      };
      api.post('/api/locations')
         .set('Accept', 'application/x-www-form-urlencoded')
         .send(newLocation)
         .expect('Content-Type', '/json/')
         .expect(200)
         .end(function(err, res) {
           response = res.body;
            done();
          });
    });

    it('should be able to update a location using id', function(done) {
      var updatedLocation = {name: 'Lane 26'};
      api.put('/api/locations/' + response.location._id)
         .set('Accept', 'application/x-www-form-urlencoded')
         .send(updatedLocation)
         .expect('Content-Type', '/json/')
         .expect(200)
         .end(function(err, res) {
           expect(res.body.status).to.be.true;
           expect(res.body.location.name).to.be.equal('Lane 26');
           done();
         });
    });
  });


  describe('DELETE:/locations/:id delete a location', function() {

    var response = {};

    before(function(done) {
      var newLocation = {
        name: faker.address.streetName(),
        loc: [faker.address.longitude(), faker.address.latitude()]
      };
      api.post('/api/locations')
         .set('Accept', 'application/x-www-form-urlencoded')
         .send(newLocation)
         .expect('Content-Type', '/json/')
         .expect(200)
         .end(function(err, res) {
           response = res.body;
            done();
          });
    });

    it('should be able to delete a location using id', function(done) {
      api.delete('/api/locations/' + response.location._id)
         .expect(200)
         .end(function(err, res) {
           expect(res.body.status).to.be.true;
           expect(res.body.message).to.be.equal('Location was successfully deleted!');
           done();
         });
    });
  });


  describe('POST:/locations/geofiltering/rectangle Return a subset S of coordinates from N that are within a rectangle of width w and length l around the user’s location L', function() {

    it('should return a set of coordinates that are within a rectangle of width w and length l around location L', function(done) {
      var input = {
        longitude: faker.address.longitude(),
        latitude: faker.address.latitude(),
        length: faker.random.number(1, 15),
        width: faker.random.number(1, 15)
      };
      api.post('/api/locations/geofiltering/rectangle')
         .set('Accept', 'application/x-www-form-urlencoded')
         .send(input)
         .expect('Content-Type', '/json/')
         .expect(200)
         .end(function(err, res) {
           console.log(res.body);
            expect(res.body).to.be.a('object');
            expect(res.body.location).to.be.a('array');
            done();
          });
    });
  });

//
  describe('POST:/locations/geofiltering/polygon Return a subset S of coordinates from N that are within a polygon defined by a series of GPS coordinates', function() {

    it('should return a set of coordinates that are within a polygon defined by a series of GPS coordinates', function(done) {
      var input = {
        longitudes: [faker.address.longitude(),faker.address.longitude(),faker.address.longitude(),faker.address.longitude(),faker.address.longitude()],
        latitudes: [faker.address.latitude(),faker.address.latitude(),faker.address.latitude(),faker.address.latitude(),faker.address.latitude()]
      }
      api.post('/api/locations/geofiltering/polygon')
         .set('Accept', 'application/x-www-form-urlencoded')
         .send(input)
         .expect('Content-Type', '/json/')
         .expect(200)
         .end(function(err, res) {
           console.log(res.body);
            expect(res.body).to.be.a('object');
            expect(res.body.location).to.be.a('array');
            done();
          });
    });
  });


  describe('POST:/locations/geofencing Return a subset S of coordinates from N that are within a Radius R meters around the user’s L', function() {

    it('should return a set of coordinates that are within radius R of location L', function(done) {
      var input = {longitude: faker.address.longitude(), latitude: faker.address.latitude(), radius: faker.random.number(1, 15)};
      api.post('/api/locations/geofencing')
         .set('Accept', 'application/x-www-form-urlencoded')
         .send(input)
         .expect('Content-Type', '/json/')
         .expect(200)
         .end(function(err, res) {
            expect(res.body).to.be.a('object');
            expect(res.body.location).to.be.a('array');
            done();
          });
    });
  });


  describe('POST:/locations/seed auto-populate DB with locations around arbitary location L', function() {

    before(function (done) {
      console.log('Deleting test database');
      mongoose.connection.db.dropDatabase(done);
    });

    it('should be able to seed the DB with random locations', function(done) {
      var airbitaryLocationL = {longitude: faker.address.longitude(), latitude: faker.address.latitude()};
      api.post('/api/locations/seed')
         .set('Accept', 'application/x-www-form-urlencoded')
         .send(airbitaryLocationL)
         .expect('Content-Type', '/json/')
         .expect(200)
         .end(function(err, res) {
            expect(res.body).to.be.a('object');
            expect(res.body.location).to.be.a('array');
            expect(res.body.location).to.have.lengthOf(100);
            done();
          });
    });
  });
});
