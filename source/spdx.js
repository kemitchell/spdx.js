// spdx.js
// =======
// SPDX License Expression Syntax parser

// Validation
// ----------

// Require the generated parser.
var parser = require('./parser.generated.js').parser;

exports.parse = function(argument) {
  return parser.parse(argument);
};

var containsRepeatedSpace = /\s{2,}/;

exports.valid = function(argument) {
  if (
    argument.trim() !== argument ||
    containsRepeatedSpace.test(argument)
  ) {
    return false;
  }
  try {
    parser.parse(argument);
    return true;
  } catch (e) {
    // jison generates parsers that throw errors, while this function
    // mimics `semver.valid` by returning null.
    return null;
  }
};

// Comparison
// ----------

var ranges = require('./ranges.json');

var notALicenseIdentifier = ' is not a simple license identifier';

var rangeComparison = function(comparison) {
  return function(first, second) {
    var firstAST = exports.parse(first);
    if (!firstAST.hasOwnProperty('license')) {
      throw new Error('"' + first + '"' + notALicenseIdentifier);
    }
    var secondAST = exports.parse(second);
    if (!secondAST.hasOwnProperty('license')) {
      throw new Error('"' + second + '"' + notALicenseIdentifier);
    }
    return ranges.some(function(range) {
      var indexOfFirst = range.indexOf(firstAST.license);
      if (indexOfFirst < 0) {
        return false;
      }
      var indexOfSecond = range.indexOf(secondAST.license);
      if (indexOfSecond < 0) {
        return false;
      }
      return comparison(indexOfFirst, indexOfSecond);
    });
  };
};

exports.gt = rangeComparison(function(first, second) {
  return first > second;
});

exports.lt = rangeComparison(function(first, second) {
  return first < second;
});

// Reference Data
// --------------

// Require the same license and exception data used by the parser.
exports.licenses = require('./licenses.json');
exports.exceptions = require('./exceptions.json');

// Version Metadata
// ----------------

// This module's semantic version
exports.version = '0.2.1';

// The SPDX Package Data Exchange Specification version
exports.licenseListVersion = '2.0rc3-20150303';

// The License Expression Syntax version
exports.specificationVersion = 'beta draft 0.98';
