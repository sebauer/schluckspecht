var assert = require('assert');
var Browser = require('zombie');

var browser = new Browser();

// Browser.visit returns a promise
var browserPromise;

module.exports = function() {

  this.Before(function(callback) {
    browserPromise = browser.visit("http://localhost:3000/app.html#/home", function() {
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

  var getBottleStock = function(bottleType) {
    var selector = "#" + bottleType + "Stock";
    return browser.text(selector);
  };

  var getBottleCountSelector = function(bottleType) {
    return "#" + bottleType + "Count";
  };

  var getBottleAddSelector = function(bottleType) {
    return "#" + bottleType + "Add";
  };

  this.Given(/^the stock of "([^"]*)" bottles is (\d+)$/, function (bottleType, count, callback) {
    // Write code here that turns the phrase above into concrete actions

    test(function() {
      var stock = getBottleStock(bottleType);
      assert(stock == count);
    }, callback);

  });

  this.When(/^I add (\d+) "([^"]*)" bottles to the inventory$/, function (count, bottleType, callback) {
    try {
      browser.fill(getBottleCountSelector(bottleType), count).pressButton(getBottleAddSelector(bottleType), function() {
        callback();
      });
    } catch (e) {
      callback.fail();
    }
  });

  this.Then(/^the stock of "([^"]*)" bottles should be (\d+)$/, function (bottleType, count, callback) {
    // Write code here that turns the phrase above into concrete actions

    test(function() {
      var stock = getBottleStock(bottleType);
      assert(stock == count);
    }, callback);

  });

};
