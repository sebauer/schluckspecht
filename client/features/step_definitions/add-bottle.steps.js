process.env.NODE_ENV = 'test';

var assert = require('assert');
var Browser = require('zombie');
var http = require('http');
var config = require('../../acceptance-test.config');

var browser = new Browser();

// Browser.visit returns a promise
var browserPromise;

module.exports = function() {

  this.Before(function(done) {
    browserPromise = browser.visit("http://localhost:" + config.testWebServerPort + "/app.html#/home", done);
  });

  this.After(function(done) {
    browser.close();
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

  var getDataNameSelector = function(make, name) {
    return '[data-name="' + make + name + '"]';
  };

  var getBottleStock = function(make, name) {
    var selector = getDataNameSelector(make, name) + " .stock";
    return browser.text(selector);
  };

  var getBottleCountSelector = function(make, name) {
    return getDataNameSelector(make, name) + " .count";
  };

  var getBottleAddSelector = function(make, name) {
    return getDataNameSelector(make, name) + " .add";
  };


  this.Given(/^the stock of "([^"]*)" "([^"]*)" bottles is (\d+)$/, function (make, name, count, callback) {

    test(function() {
      var stock = getBottleStock(make, name);
      assert(stock == count);
    }, callback);

  });

  this.When(/^I add (\d+) "([^"]*)" "([^"]*)" bottles to the inventory$/, function (count, make, name, callback) {
    try {
      browser.fill(getBottleCountSelector(make, name), count).pressButton(getBottleAddSelector(make, name), function() {
        callback();
      });
    } catch (e) {
      callback.fail();
    }
  });

  this.Then(/^the stock of "([^"]*)" "([^"]*)" bottles should be (\d+)$/, function (make, name, count, callback) {

    test(function() {
      var stock = getBottleStock(make, name);
      assert(stock == count);
    }, callback);

  });

};
