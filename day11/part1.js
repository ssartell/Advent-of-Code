var R = require('ramda');
var trace = R.tap(console.log);

var replaceAt = function(str, index, character) {
    return str.substr(0, index) + character + str.substr(index+character.length);
};

var zCode = ('z').charCodeAt(0);
var stringInc = (password) => {
	var i = password.length - 1;
	var carry = false;
	
	do {
		var code = password.charCodeAt(i) + 1;
		carry = code > zCode;
		code = carry ? 97 : code;
		password = replaceAt(password, i, String.fromCharCode(code));
		i--;
	} while(carry)
	
	return password;	
};

var increasingStraight = R.compose(
	R.lte(1),
	R.length,
	R.match(/abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz/g)	
);

var noConfusingChars = (password) => !(/i|o|l/g).test(password);

var twoPairs = R.compose(R.lte(2), R.length, R.uniq, R.match(/(.)\1/g));

var isValid = R.allPass([noConfusingChars, increasingStraight, twoPairs]);

var solution = (input) => {
	var password = input;
	while(!isValid(password)) {
		password = stringInc(password);
	}
	
	return password;
};

module.exports = solution;