module.exports = function() {

  this.Given(/^the stock of "([^"]*)" bottles is (\d+)$/, function (bottleType, count, callback) {
    // Write code here that turns the phrase above into concrete actions
    callback.pending();
  });

  this.When(/^I add (\d+) "([^"]*)" bottles to the inventory$/, function (bottleType, count, callback) {
    // Write code here that turns the phrase above into concrete actions
    callback.pending();
  });

  this.Then(/^the stock of "([^"]*)" bottles should be (\d+)$/, function (bottleType, count, callback) {
    // Write code here that turns the phrase above into concrete actions
    callback.pending();
  });

};
