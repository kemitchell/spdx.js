// spdx.js
// =======
// SPDX License Expression Syntax parser

// ### Validation Functions
var parser = require('./parser.generated.js').parser;
exports.valid = parser.parse.bind(parser);

// ### Reference Data
exports.licenses = require('./licenses.json');
exports.exceptions = require('./exceptions.json');

// ### Version Metadata
exports.specificationVersion = 'beta draft 0.98';
exports.licenseListVersion = '2.0rc-3';
exports.version = '0.1.2';
