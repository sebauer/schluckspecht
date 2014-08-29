var express = require('express');
var bunyan = require('bunyan');

var log = bunyan.createLogger(
  {
    name: 'schluckspecht'
  }
);
