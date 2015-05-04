// Parser Generator
// ================
// Use jison to generate an SPDX Expression parser based on a
// Bison-style BNF grammar.

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
  comment: 'SPDX Expression Syntax 2.0rc3',
  author: 'Kyle E. Mitchell',
  lex: {
    macros: {},
    rules: [
      ['$', 'return ' + quote('EOS') + ';'],
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
      .concat(require('spdx-license-ids').map(ret('LICENSE')))
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
  start: 'start',
  bnf: {
    'start': [
      ['expression EOS', 'return $$ = $1;']
    ],
    // The ABNF grammar on page 84 of the 2.0rc3 draft appears to have
    // some problems, and doesn't validate some of the examples that
    // follow on subsequent pages. This gramar allows arbitrary nesting
    // and grouping, akin to a classic Bison calculator example.
    'expression': [
      [
        'expression OR expression',
        '$$ = { conjunction: \'or\', left: $1, right: $3 };'
      ],
      [
        'expression AND expression',
        '$$ = { conjunction: \'and\', left: $1, right: $3 };'
      ],
      [
        'OPEN expression CLOSE',
        '$$ = $2'
      ],
      [
        'expression WITH EXCEPTION',
        '$$ = { expression: $1, exception: $3 };'
      ],
      [
        'LICENSE',
        '$$ = { license: yytext };'
      ],
      [
        'LICENSE PLUS',
        '$$ = { license: $1, plus: true };'
      ],
      [
        'LICENSEREF',
        '$$ = { license: yytext };'
      ]
    ]
  }
};

console.log(new Generator(grammar, options).generate());
