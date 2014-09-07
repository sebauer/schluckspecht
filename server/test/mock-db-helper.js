var assert = require('assert');
var mockDBHelper = require('../helper/mock-db-helper');
var mongoose = require('mongoose');

describe("mockDBHelper", function() {

  describe("mockDBIfNecessary", function() {

    afterEach(function() {
      delete mongoose.isMocked;
    });

    it("should mock db, when --mock-db is provided in args", function() {
      var argv = [ 'node', 'D:\\private\\schluckspecht\\server\\app.js', '--mock-db' ];

      mockDBHelper.mockDBIfNecessary(mongoose, argv);
      assert(mongoose.isMocked);
    });

    it("should not mock db, when --mock-db is not provided in args", function() {
      var argv = [ 'node', 'D:\\private\\schluckspecht\\server\\app.js'];

      mockDBHelper.mockDBIfNecessary(mongoose, argv);
      assert(mongoose.isMocked === false);
    });
    
  });

});
