var assert = require('assert');
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


  var test = function (testFunc, callback) {
    browserPromise.then(function() {
      testFunc();
      callback();
    }).fail(function() {
      callback.fail();
    })
  };

  this.Given(/^the stock of "([^"]*)" bottles is (\d+)$/, function (bottleType, count, callback) {
    // Write code here that turns the phrase above into concrete actions
    test(function() {
      var elem = browser.query("body");
      assert(elem);
    }, callback);

    /*
    browserPromise.then(function() {
      // check if count field is 0
      // assert
      // callback
      assert(0 === 0);
      callback();
    }).fail(function() {
      callback.fail();
    });
    */

  });

  this.When(/^I add (\d+) "([^"]*)" bottles to the inventory$/, function (bottleType, count, callback) {
    // fill in bottle type, fill in count, submit

    test(function() {
      // if button is not found an exception is raised
      browser.pressButton("Google-Suche", function() {
        assert(0 === 1);
      });
    }, callback);

    /*
    browserPromise.then(function() {
      // check if count field is 0
      // assert
      // callback
      assert(0 === 1);
      callback();
    }).fail(function() {
      callback.fail();
    });
    */


  });

  this.Then(/^the stock of "([^"]*)" bottles should be (\d+)$/, function (bottleType, count, callback) {
    // Write code here that turns the phrase above into concrete actions

    browserPromise.then(function() {
      // check if count field is 0
      // assert
      // callback
      callback();
    });

  });

};
