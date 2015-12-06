var R = require('ramda');
var md5 = require('md5');

var trace = R.tap(console.log);
var startsWith = R.invoker(1, 'startsWith');

var integers = R.times(R.identity, 1999999);
var solution = R.compose(R.find(R.__, integers), R.curry(R.compose(startsWith('000000'), md5, R.concat)));
module.exports = solution;