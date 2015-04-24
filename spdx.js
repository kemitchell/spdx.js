// spdx.js
// =======
// spdxSPDX License Expression Syntax parser

// Universal Module Definition
// ---------------------------

(function(root, factory) {
  /* globals define, exports */
  var MODULE_NAME = 'spdx';
  if (typeof define === 'function' && define.amd) {
    define(MODULE_NAME, [], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root[MODULE_NAME] = factory();
  }
})(this, function() {
  var root = this;

  // ABNF Utility Functions
  // ----------------------

  var normalizePredicate = function(predicate) {
    if (typeof predicate === 'function') {
      return predicate;
    } else if (predicate instanceof RegExp) {
      return function(string) {
        return predicate.test(string);
      };
    } else if (typeof predicate === 'string') {
      return function(string) {
        return predicate === string;
      };
    } else {
      throw new Error();
    }
  };

  var alternatives = function() {
    var predicates = Array.prototype.slice.call(arguments)
      .map(normalizePredicate);
    return function(argument) {
      return predicates.some(function(predicate) {
        return predicate(argument);
      });
    };
  };

  var oneOrMore = function(predicate) {
    function infinite() {
      return root.concatenation(predicate, infinite)
        .apply(this, arguments);
    }
    return alternatives(predicate, infinite);
  };

  var consume = function(string, predicates) {
    var predicate = predicates[0];
    var remaining = predicates.slice(1);
    for (var i = string.length; i >= 0; i--) {
      var slice = string.slice(0, i);
      if (predicate(slice)) {
        if (remaining.length === 0) {
          return true;
        } else {
          var further = consume(string.slice(i), remaining);
          if (further) {
            return true;
          }
        }
      }
    }
    return false;
  };

  var concatenation = root.concatenation = function() {
    var predicates = Array.prototype.slice.call(arguments)
      .map(normalizePredicate);
    return function(argument) {
      return consume(argument, predicates);
    };
  };

  // ABNF Grammar
  // ------------

  var appendixI1 = [
    'AAL', 'ADSL', 'AFL-1.1', 'AFL-1.2', 'AFL-2.0', 'AFL-2.1',
    'AFL-3.0', 'AGPL-1.0', 'AGPL-3.0', 'AMDPLPA', 'AML', 'AMPAS',
    'ANTLR-PD', 'APAFML', 'APL-1.0', 'APSL-1.0', 'APSL-1.1',
    'APSL-1.2', 'APSL-2.0', 'Abstyles', 'Adobe-2006', 'Adobe-Glyph',
    'Afmparse', 'Aladdin', 'Apache-1.0', 'Apache-1.1', 'Apache-2.0',
    'Artistic-1.0', 'Artistic-1.0-Perl', 'Artistic-1.0-cl8',
    'Artistic-2.0', 'BSD-2-Clause', 'BSD-2-Clause-FreeBSD',
    'BSD-2-Clause-NetBSD', 'BSD-3-Clause', 'BSD-3-Clause-Attribution',
    'BSD-3-Clause-Clear', 'BSD-3-Clause-LBNL', 'BSD-4-Clause',
    'BSD-4-Clause-UC', 'BSD-Protection', 'BSL-1.0', 'Bahyph', 'Barr',
    'Beerware', 'BitTorrent-1.0', 'BitTorrent-1.1', 'Borceux',
    'CATOSL-1.1', 'CC0-1.0', 'CC-BY-1.0', 'CC-BY-2.0', 'CC-BY-2.5',
    'CC-BY-3.0', 'CC-BY-4.0', 'CC-BY-NC-1.0', 'CC-BY-NC-2.0',
    'CC-BY-NC-2.5', 'CC-BY-NC-3.0', 'CC-BY-NC-4.0', 'CC-BY-NC-ND-1.0',
    'CC-BY-NC-ND-2.0', 'CC-BY-NC-ND-2.5', 'CC-BY-NC-ND-3.0',
    'CC-BY-NC-ND-4.0', 'CC-BY-NC-SA-1.0', 'CC-BY-NC-SA-2.0',
    'CC-BY-NC-SA-2.5', 'CC-BY-NC-SA-3.0', 'CC-BY-NC-SA-4.0',
    'CC-BY-ND-1.0', 'CC-BY-ND-2.0', 'CC-BY-ND-2.5', 'CC-BY-ND-3.0',
    'CC-BY-ND-4.0', 'CC-BY-SA-1.0', 'CC-BY-SA-2.0', 'CC-BY-SA-2.5',
    'CC-BY-SA-3.0', 'CC-BY-SA-4.0', 'CDDL-1.0', 'CDDL-1.1',
    'CECILL-1.0', 'CECILL-1.1', 'CECILL-2.0', 'CECILL-B', 'CECILL-C',
    'CNRI-Jython', 'CNRI-Python', 'CNRI-Python-GPL-Compatible',
    'CPAL-1.0', 'CPL-1.0', 'CPOL-1.02', 'CUA-OPL-1.0', 'Caldera',
    'ClArtistic', 'Condor-1.1', 'Crossword', 'Cube', 'DOC', 'DSDP',
    'Dotseqn', 'D-FSL-1.0', 'ECL-1.0', 'ECL-2.0', 'EFL-1.0',
    'EFL-2.0', 'EPL-1.0', 'EUDatagrid', 'EUPL-1.0', 'EUPL-1.1',
    'Entessa', 'ErlPL-1.1', 'Eurosym', 'FSFUL', 'FSFULLR', 'FTL',
    'Fair', 'Frameworx-1.0', 'FreeImage', 'GFDL-1.1', 'GFDL-1.2',
    'GFDL-1.3', 'GL2PS', 'GPL-1.0', 'GPL-2.0', 'GPL-3.0', 'Giftware',
    'Glide', 'Glulxe', 'HPND', 'HaskellReport', 'IBM-pibs', 'ICU',
    'IJG', 'IPA', 'IPL-1.0', 'ISC', 'ImageMagick', 'Imlib2', 'Intel',
    'Intel-ACPI', 'JSON', 'JasPer-2.0', 'LGPL-2.0', 'LGPL-2.1',
    'LGPL-3.0', 'LPL-1.0', 'LPL-1.02', 'LPPL-1.0', 'LPPL-1.1',
    'LPPL-1.2', 'LPPL-1.3a', 'LPPL-1.3c', 'Latex2e', 'Leptonica',
    'Libpng', 'MIT', 'MITNFA', 'MIT-CMU', 'MIT-advertising',
    'MIT-enna', 'MIT-feh', 'MPL-1.0', 'MPL-1.1', 'MPL-2.0',
    'MPL-2.0-no-copyleft-exception', 'MS-PL', 'MS-RL', 'MTLL',
    'MakeIndex', 'MirOS', 'Motosoto', 'Multics', 'Mup', 'NASA-1.3',
    'NBPL-1.0', 'NCSA', 'NGPL', 'NLPL', 'NOSL', 'NPL-1.0', 'NPL-1.1',
    'NPOSL-3.0', 'NRL', 'NTP', 'Naumen', 'NetCDF', 'Newsletr',
    'Nokia', 'Noweb', 'Nunit', 'OCLC-2.0', 'ODbL-1.0', 'OFL-1.0',
    'OFL-1.1', 'OGTSL', 'OLDAP-1.1', 'OLDAP-1.2', 'OLDAP-1.3',
    'OLDAP-1.4', 'OLDAP-2.0', 'OLDAP-2.0.1', 'OLDAP-2.1', 'OLDAP-2.2',
    'OLDAP-2.2.1', 'OLDAP-2.2.2', 'OLDAP-2.3', 'OLDAP-2.4',
    'OLDAP-2.5', 'OLDAP-2.6', 'OLDAP-2.7', 'OLDAP-2.8', 'OML',
    'OPL-1.0', 'OSL-1.0', 'OSL-1.1', 'OSL-2.0', 'OSL-2.1', 'OSL-3.0',
    'OpenSSL', 'PDDL-1.0', 'PHP-3.0', 'PHP-3.01', 'Plexus',
    'PostgreSQL', 'Python-2.0', 'QPL-1.0', 'Qhull', 'README',
    'RHeCos-1.1', 'RPL-1.1', 'RPL-1.5', 'RPSL-1.0', 'RSA-MD', 'RSCPL',
    'Rdisc', 'Ruby', 'SAX-PD', 'SCEA', 'SGI-B-1.0', 'SGI-B-1.1',
    'SGI-B-2.0', 'SISSL', 'SISSL-1.2', 'SMLNJ', 'SNIA', 'SPL-1.0',
    'SWL', 'Saxpath', 'SimPL-2.0', 'Sleepycat', 'SugarCRM-1.1.3',
    'TCL', 'TMate', 'TORQUE-1.1', 'TOSL', 'Unicode-TOU', 'Unlicense',
    'VOSTROM', 'VSL-1.0', 'Vim', 'W3C', 'W3C-19980720', 'WTFPL',
    'Watcom-1.0', 'Wsuipa', 'X11', 'XFree86-1.1', 'XSkat', 'Xerox',
    'Xnet', 'YPL-1.0', 'YPL-1.1', 'ZPL-1.1', 'ZPL-2.0', 'ZPL-2.1',
    'Zed', 'Zend-2.0', 'Zimbra-1.3', 'Zimbra-1.4', 'Zlib',
    'bzip2-1.0.5', 'bzip2-1.0.6', 'diffmark', 'dvipdfm', 'eGenix',
    'gSOAP-1.3b', 'gnuplot', 'iMatix', 'libtiff', 'mpich2', 'psfrag',
    'psutils', 'xinetd', 'xpp', 'zlib-acknowledgement'
  ];

  var licenseID = function(argument) {
    return appendixI1.indexOf(argument) > -1;
  };

  var appendixI2 = [
    'Autoconf-exception-2.0', 'Autoconf-exception-3.0',
    'Bison-exception-2.2', 'Classpath-exception-2.0',
    'eCos-exception-2.0', 'Font-exception-2.0', 'GCC-exception-2.0',
    'GCC-exception-3.1', 'WxWindows-exception-3.1',
  ];

  var licenseExceptionID = function(argument) {
    return appendixI2.indexOf(argument) > -1;
  };

  var idString = (function() {
    var regularExpression = /[a-zA-Z0-9-+\.]+/;
    return function(argument) {
      return regularExpression.test(argument);
    };
  })();

  var licenseRef = concatenation('LicenseRef', idString);

  var simpleLicenseIdentifier = oneOrMore(
    alternatives(
      licenseID,
      concatenation(licenseID, '+'),
      licenseRef
    )
  );

  var deferredLicenseExpression = function() {
    return root.licenseExpression.apply(this, arguments);
  };

  var licenseExpression = root.licenseExpression = alternatives(
    simpleLicenseIdentifier,
    concatenation(
      '(', simpleLicenseIdentifier, ' WITH ', licenseExceptionID, ')'
    ),
    concatenation(
      '(',
      deferredLicenseExpression,
      oneOrMore(
        concatenation(
          alternatives(' AND ', ' OR '),
          deferredLicenseExpression
        )
      ),
      ')'
    )
  );

  // Module Exports
  // --------------

  var spdx = {};

  // ### Validation Functions

  spdx.valid = licenseExpression;

  // ### Reference Data

  spdx.licenses = appendixI1;

  spdx.exceptions = appendixI2;

  // ### Version Metadata

  spdx.specificationVersion = 'beta draft 0.98';

  spdx.licenseListVersion = '2.0rc-3';

  spdx.version = '0.1.0';

  return spdx;
});
