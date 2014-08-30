var assert = require('assert');
var Q = require('Q');
var Browser = require('zombie');

var browser = new Browser();

// Browser.visit returns a promise
var browserPromise;

module.exports = function() {

  this.Before(function(callback) {
    browserPromise = browser.visit("http://www.google.de", function() {
      callback();
    });
  });

  this.After(function(callback) {
    browser.close();
    callback();
  });


  var test = function(testFunc, callback) {
    browserPromise.then(function() {
      testFunc();
    })
    .then(callback)
    .fail(function() {
      callback.fail();
    });
  };

  var pressButton = function(testCallback, clickCallback, selector) {
    try {
      browser.pressButton(selector, function() {
        try {
          clickCallback();
          testCallback();
        } catch (e) {
          testCallback.fail();
        }
      });
    } catch (e) {
      testCallback.fail();
    }
  };

  this.Given(/^the stock of "([^"]*)" bottles is (\d+)$/, function (bottleType, count, callback) {
    // Write code here that turns the phrase above into concrete actions

    test(function() {
      var elem = browser.query("body");
      assert(elem);
    }, callback);

  });

  this.When(/^I add (\d+) "([^"]*)" bottles to the inventory$/, function (bottleType, count, callback) {
    // fill in bottle type, fill in count, submit
    pressButton(callback, function() {
      assert(0 === 1);
    }, "Google-Suche");

  });

  this.Then(/^the stock of "([^"]*)" bottles should be (\d+)$/, function (bottleType, count, callback) {
    // Write code here that turns the phrase above into concrete actions

    browserPromise.then(function() {
      callback();
    });

  });

};
