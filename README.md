spdx.js
=======

[![npm version](https://img.shields.io/npm/v/spdx.svg)](https://www.npmjs.com/package/spdx)
[![license](https://img.shields.io/badge/license-Apache--2.0-303284.svg)](http://www.apache.org/licenses/LICENSE-2.0)
[![build status](https://img.shields.io/travis/kemitchell/spdx.js.svg)](http://travis-ci.org/kemitchell/spdx.js)


SPDX License Expression Syntax parser

<!--js
var spdx = require('./');
-->

Simple License Expressions
--------------------------

```js
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
spdx.valid('(GPL-2.0+ WITH Bison-exception-2.2)'); // => true
```

### Order of Precedence and Parentheses

```js
spdx.valid('(LGPL-2.1 OR BSD-3-Clause AND MIT)'); // => true
spdx.valid('((LGPL-2.1+ OR BSD-3-Clause) AND MIT)'); // => true
spdx.valid('((LGPL-2.1+ OR BSD-3-Clause) AND MIT)'); // => true
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
