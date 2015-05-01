// spdx.js
// =======
// SPDX License Expression Syntax parser

// ### Validation Functions

// Require the generated parser.
var parser = require('./parser.generated.js').parser;

exports.parse = function(argument) {
  return parser.parse(argument);
};

exports.valid = function(argument) {
  try {
    parser.parse(argument);
    return true;
  } catch (e) {
    // jison generates parsers that throw errors, while this function
    // mimics `semver.valid` by returning null.
    return null;
  }
};

// ### Reference Data

// Require the same license and exception data used by the parser.
exports.licenses = require('./licenses.json');
exports.exceptions = require('./exceptions.json');

// ### Version Metadata

// This module's semantic version
exports.version = '0.1.2';

// The SPDX Package Data Exchange Specification version
exports.licenseListVersion = '2.0rc3-20150303';

// The License Expression Syntax version
exports.specificationVersion = 'beta draft 0.98';
