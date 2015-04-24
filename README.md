spdx.js
=======

SPDX License Expression Syntax parser

Usage
-----

```javascript
var spdx = require('./');
```

### Simple License Expressions

```javascript
typeof spdx.valid === 'function'; // => true

spdx.valid('GPL-2.0'); // => true

spdx.valid('GPL-2.0+'); // => true

spdx.valid('LicenseRef-23'); // => true

spdx.valid('LicenseRef-MIT-Style-1'); // => true
```

### Composite License Expressions

#### Disjunctive `OR` Operator

```javascript
spdx.valid('(LGPL-2.1 OR MIT)'); // => true

spdx.valid('(LGPL-2.1 OR MIT OR BSD-3-Clause)'); // => true
```

#### Conjunctive `AND` Operator

```javascript
spdx.valid('(LGPL-2.1 AND MIT)'); // => true

spdx.valid('(LGPL-2.1 AND MIT AND BSD-2-Clause)'); // => true
```

#### Exception `WITH` Clause

```javascript
spdx.valid('(GPL-2.0+ WITH Bison-exception-2.2)'); // => true
```

// Order of precedence +, WITH, AND, OR

#### Order of Precedence and Parentheses

```javascript

spdx.valid('(LGPL-2.1 OR BSD-3-Clause AND MIT)'); // => true

spdx.valid('((LGPL-2.1+ OR BSD-3-Clause) AND MIT)'); // => true

spdx.valid('((LGPL-2.1+ OR BSD-3-Clause) AND MIT)'); // => true
```

### Identifier Lists

```javascript
Array.isArray(spdx.licenses); // => true

spdx.licenses.every(function(element) {
  return typeof element === 'string';
}); // => true

Array.isArray(spdx.exceptions); // => true

spdx.exceptions.every(function(element) {
  return typeof element === 'string';
}); // => true
```

### Version Metadata

```javascript
typeof spdx.licenseListVersion === 'string'; // => true

typeof spdx.specificationVersion === 'string'; // => true

typeof spdx.version === 'string'; // => true
```
