var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var assert1 = require('assert');

var url = 'mongodb://localhost:27017/test';

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("kumari");
  res.render('test');
});

router.get('/test', function(req, res, next) {
  console.log("kumari1");
  res.render('test');
});

router.get('/index', function(req, res, next) {
  console.log("kumari2");
  res.render('index');
});

router.get('/event_schedule', function(req, res, next) {
  console.log("kumari3");
  res.render('event_schedule.hbs');
});

router.get('/event_guidelines', function(req, res, next) {
  console.log("kumari4");
  res.render('event_guidelines.hbs');
});

router.get('/contact_details', function(req, res, next) {
  console.log("kumari5");
  res.render('contact_details.hbs');
});

router.get('/confirmation', function(req, res, next) {
  console.log("kumari5");
  res.render('confirmation.hbs');
});

router.get('/football', function(req, res, next) {
  console.log("kumari5");
  res.render('football.hbs');
});

router.get('/get-data', function(req, res, next) {
  var resultArray = [];
   var resultArrayName = [];

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    //var cursor = db.collection('user-data').find();

    var cursor = db.collection('user-data').find( { SportingEvent: "Football Event" } );

    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
    }, function() {
      db.close();
      res.render('data', {items: resultArray});
      console.log(resultArray);
    });
  });
});

router.post('/insert', function(req, res, next) {
  var item = {
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    Age: req.body.Age,
    Gender: req.body.Gender,
    SportingEvent: req.body.SportingEvent,
    UnderCategory: req.body.UnderCategory,
    TeamSize: req.body.TeamSize,
    Student_ID: req.body.StudentID,
    Contact: req.body.Contact,
    email: req.body.email
  };
  console.log("testing");

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('user-data').insertOne(item, function(err, result) {
      assert.equal(null, err);
      console.log('Item inserted');
      db.close();
    });
  });

  res.redirect('/confirmation');
});

router.post('/update', function(req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };
  var id = req.body.id;

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('user-data').updateOne({"_id": objectId(id)}, {$set: item}, function(err, result) {
      assert.equal(null, err);
      console.log('Item updated');
      db.close();
    });
  });
});

router.post('/delete', function(req, res, next) {
  var id = req.body.id;

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('user-data').deleteOne({"_id": objectId(id)}, function(err, result) {
      assert.equal(null, err);
      console.log('Item deleted');
      db.close();
    });
  });
});

module.exports = router;

