spdx.js
=======

[![npm version](https://img.shields.io/npm/v/spdx.svg)](https://www.npmjs.com/package/spdx)
[![SPDX License Expression Syntax version](https://img.shields.io/badge/SPDX--LES-beta%20draft%200.98-blue.svg)](http://spdx.org/SPDX-specifications/spdx-version-2.0)
[![license](https://img.shields.io/badge/license-Apache--2.0-303284.svg)](http://www.apache.org/licenses/LICENSE-2.0)
[![build status](https://img.shields.io/travis/kemitchell/spdx.js.svg)](http://travis-ci.org/kemitchell/spdx.js)

SPDX License Expression Syntax parser

<!--js
  // The fenced code blocks below are run as tests with `jsmd`.
  // The following `require` call brings the module.
  // Use `require ('spdx')` in your own code.
  var spdx = require('./');
-->

Simple License Expressions
--------------------------
```js
spdx.valid('Invalid-Identifier'); // => null
spdx.valid('GPL-2.0'); // => true
spdx.valid('GPL-2.0+'); // => true
spdx.valid('LicenseRef-23'); // => true
spdx.valid('LicenseRef-MIT-Style-1'); // => true
```

Composite License Expressions
-----------------------------

### Disjunctive `OR` Operator
```js
spdx.valid('(LGPL-2.1 OR MIT)'); // => true
spdx.valid('(LGPL-2.1 OR MIT OR BSD-3-Clause)'); // => true
```

### Conjunctive `AND` Operator
```js
spdx.valid('(LGPL-2.1 AND MIT)'); // => true
spdx.valid('(LGPL-2.1 AND MIT AND BSD-2-Clause)'); // => true
```

### Exception `WITH` Clause
```js
spdx.valid('GPL-2.0+ WITH Bison-exception-2.2'); // => true
spdx.valid('(GPL-2.0+ WITH Bison-exception-2.2)'); // => true
```

### Order of Precedence and Parentheses
```js
spdx.valid('(LGPL-2.1 OR BSD-3-Clause AND MIT)'); // => true
spdx.valid('((LGPL-2.1+ OR BSD-3-Clause) AND MIT)'); // => true
```

Strict Whitespace Rules
-----------------------
```js
spdx.valid('MIT '); // => false
spdx.valid(' MIT'); // => false
spdx.valid('MIT  AND  BSD-3-Clause'); // => false
```

Identifier Lists
----------------
```js
Array.isArray(spdx.licenses); // => true
spdx.licenses.indexOf('ISC') > -1; // => true
spdx.licenses.indexOf('Apache-1.7') > -1; // => false
spdx.licenses.every(function(element) {
  return typeof element === 'string';
}); // => true

Array.isArray(spdx.exceptions); // => true
spdx.exceptions.indexOf('GCC-exception-3.1') > -1; // => true
spdx.exceptions.every(function(element) {
  return typeof element === 'string';
}); // => true
```

Version Metadata
----------------
```js
typeof spdx.licenseListVersion === 'string'; // => true
typeof spdx.specificationVersion === 'string'; // => true
typeof spdx.version === 'string'; // => true
```

Abstract Syntax Tree
--------------------
```js
var exampleAST = {
  left: {
    left: {
      expression: {
        license: 'MIT'
      },
      exception: 'Autoconf-exception-2.0'
    },
    conjunction: 'and',
    right: {
      license: 'Apache-2.0'
    }
  },
  conjunction: 'or',
  right: {
    left: {
      license: 'LGPL-2.1'
    },
    conjunction: 'or',
    right: {
      license: 'GPL-3.0',
      plus: true
    }
  }
};

spdx.parse(
  '(' +
    '(MIT WITH Autoconf-exception-2.0 AND Apache-2.0)' +
    ' OR '+
    '(LGPL-2.1 OR GPL-3.0+)'+
  ')'
); // => exampleAST
```

Comparison
----------

```js
spdx.gt('GPL-3.0', 'GPL-2.0'); // => true
spdx.lt('MPL-1.0', 'MPL-2.0'); // => true
spdx.gt('LPPL-1.3a', 'LPPL-1.0'); // => true
spdx.gt('LPPL-1.3a', 'LPPL-1.3a'); // => false
spdx.gt('MIT', 'ISC'); // => false
try {
  spdx.gt('(MIT OR ISC)', 'GPL-3.0');
} catch (error) {
  error.message; // => '"(MIT OR ISC)" is not a simple license identifier'
}
```
