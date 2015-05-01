var Generator = require('jison').Generator;
var options = {
  type: 'slr',
  moduleType: 'commonjs',
  moduleName: 'spdxparse'
};

var words = ['AND', 'OR', 'WITH'];

var quote = function(argument) {
  return '\'' + argument + '\'';
};

var ret = function(token) {
  return function(character) {
    return [character, 'return ' +  quote(token) + ';'];
  };
};

var grammar = {
  comment: 'SPDX Expression Syntax',
  author: 'K.E. Mitchell',
  lex: {
    macros: {},
    rules: [
      ['\\s+', '/* skip whitespace */'],
      ['\\+', 'return ' + quote('PLUS') + ';'],
      ['\\(', 'return ' + quote('OPEN') + ';'],
      ['\\)', 'return ' + quote('CLOSE') + ';'],
      [
        'LicenseRef-([0-9A-Za-z-+.]+)',
        'return ' + quote('LICENSEREF') + ';'
      ]
    ]
      .concat(words.map(function(word) {
        return [word, 'return ' + quote(word) + ';'];
      }))
      .concat(require('../source/licenses').map(ret('LICENSE')))
      .concat(require('../source/exceptions').map(ret('EXCEPTION')))
  },
  operators: [
    ['left', 'OR', 'AND', 'WITH', 'PLUS']
  ],
  tokens: [
    'CLOSE',
    'EXCEPTION',
    'LICENSE',
    'LICENSEREF',
    'OPEN',
    'PLUS'
  ]
    .concat(words)
    .join(' '),
  start: 'license-expression',
  bnf: {
    'and-or': [
      'AND',
      'OR'
    ],
    'and-ors': [
      'and-or simple-license-identifier',
      'and-ors and-or simple-license-identifier'
    ],
    'license-expression': [
      'simple-license-identifier',
      'simple-license-identifier WITH EXCEPTION',
      'OPEN license-expression and-ors CLOSE'
    ],
    'simple-license-identifier': [
      'LICENSE',
      'LICENSE PLUS',
      'LICENSEREF'
    ]
  }
};

console.log(new Generator(grammar, options).generate());
