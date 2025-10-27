/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/validator/lib/isByteLength.js":
/*!****************************************************!*\
  !*** ./node_modules/validator/lib/isByteLength.js ***!
  \****************************************************/
/***/ ((module, exports, __webpack_require__) => {

eval("{\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = isByteLength;\nvar _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ \"./node_modules/validator/lib/util/assertString.js\"));\nfunction _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\n/* eslint-disable prefer-rest-params */\nfunction isByteLength(str, options) {\n  (0, _assertString.default)(str);\n  var min;\n  var max;\n  if (_typeof(options) === 'object') {\n    min = options.min || 0;\n    max = options.max;\n  } else {\n    // backwards compatibility: isByteLength(str, min [, max])\n    min = arguments[1];\n    max = arguments[2];\n  }\n  var len = encodeURI(str).split(/%..|./).length - 1;\n  return len >= min && (typeof max === 'undefined' || len <= max);\n}\nmodule.exports = exports.default;\nmodule.exports[\"default\"] = exports.default;\n\n//# sourceURL=webpack://validacao-form-ts/./node_modules/validator/lib/isByteLength.js?\n}");

/***/ }),

/***/ "./node_modules/validator/lib/isEmail.js":
/*!***********************************************!*\
  !*** ./node_modules/validator/lib/isEmail.js ***!
  \***********************************************/
/***/ ((module, exports, __webpack_require__) => {

eval("{\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = isEmail;\nvar _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ \"./node_modules/validator/lib/util/assertString.js\"));\nvar _checkHost = _interopRequireDefault(__webpack_require__(/*! ./util/checkHost */ \"./node_modules/validator/lib/util/checkHost.js\"));\nvar _isByteLength = _interopRequireDefault(__webpack_require__(/*! ./isByteLength */ \"./node_modules/validator/lib/isByteLength.js\"));\nvar _isFQDN = _interopRequireDefault(__webpack_require__(/*! ./isFQDN */ \"./node_modules/validator/lib/isFQDN.js\"));\nvar _isIP = _interopRequireDefault(__webpack_require__(/*! ./isIP */ \"./node_modules/validator/lib/isIP.js\"));\nvar _merge = _interopRequireDefault(__webpack_require__(/*! ./util/merge */ \"./node_modules/validator/lib/util/merge.js\"));\nfunction _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }\nvar default_email_options = {\n  allow_display_name: false,\n  allow_underscores: false,\n  require_display_name: false,\n  allow_utf8_local_part: true,\n  require_tld: true,\n  blacklisted_chars: '',\n  ignore_max_length: false,\n  host_blacklist: [],\n  host_whitelist: []\n};\n\n/* eslint-disable max-len */\n/* eslint-disable no-control-regex */\nvar splitNameAddress = /^([^\\x00-\\x1F\\x7F-\\x9F\\cX]+)</i;\nvar emailUserPart = /^[a-z\\d!#\\$%&'\\*\\+\\-\\/=\\?\\^_`{\\|}~]+$/i;\nvar gmailUserPart = /^[a-z\\d]+$/;\nvar quotedEmailUser = /^([\\s\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x7f\\x21\\x23-\\x5b\\x5d-\\x7e]|(\\\\[\\x01-\\x09\\x0b\\x0c\\x0d-\\x7f]))*$/i;\nvar emailUserUtf8Part = /^[a-z\\d!#\\$%&'\\*\\+\\-\\/=\\?\\^_`{\\|}~\\u00A1-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]+$/i;\nvar quotedEmailUserUtf8 = /^([\\s\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x7f\\x21\\x23-\\x5b\\x5d-\\x7e\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]|(\\\\[\\x01-\\x09\\x0b\\x0c\\x0d-\\x7f\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]))*$/i;\nvar defaultMaxEmailLength = 254;\n/* eslint-enable max-len */\n/* eslint-enable no-control-regex */\n\n/**\n * Validate display name according to the RFC2822: https://tools.ietf.org/html/rfc2822#appendix-A.1.2\n * @param {String} display_name\n */\nfunction validateDisplayName(display_name) {\n  var display_name_without_quotes = display_name.replace(/^\"(.+)\"$/, '$1');\n  // display name with only spaces is not valid\n  if (!display_name_without_quotes.trim()) {\n    return false;\n  }\n\n  // check whether display name contains illegal character\n  var contains_illegal = /[\\.\";<>]/.test(display_name_without_quotes);\n  if (contains_illegal) {\n    // if contains illegal characters,\n    // must to be enclosed in double-quotes, otherwise it's not a valid display name\n    if (display_name_without_quotes === display_name) {\n      return false;\n    }\n\n    // the quotes in display name must start with character symbol \\\n    var all_start_with_back_slash = display_name_without_quotes.split('\"').length === display_name_without_quotes.split('\\\\\"').length;\n    if (!all_start_with_back_slash) {\n      return false;\n    }\n  }\n  return true;\n}\nfunction isEmail(str, options) {\n  (0, _assertString.default)(str);\n  options = (0, _merge.default)(options, default_email_options);\n  if (options.require_display_name || options.allow_display_name) {\n    var display_email = str.match(splitNameAddress);\n    if (display_email) {\n      var display_name = display_email[1];\n\n      // Remove display name and angle brackets to get email address\n      // Can be done in the regex but will introduce a ReDOS (See  #1597 for more info)\n      str = str.replace(display_name, '').replace(/(^<|>$)/g, '');\n\n      // sometimes need to trim the last space to get the display name\n      // because there may be a space between display name and email address\n      // eg. myname <address@gmail.com>\n      // the display name is `myname` instead of `myname `, so need to trim the last space\n      if (display_name.endsWith(' ')) {\n        display_name = display_name.slice(0, -1);\n      }\n      if (!validateDisplayName(display_name)) {\n        return false;\n      }\n    } else if (options.require_display_name) {\n      return false;\n    }\n  }\n  if (!options.ignore_max_length && str.length > defaultMaxEmailLength) {\n    return false;\n  }\n  var parts = str.split('@');\n  var domain = parts.pop();\n  var lower_domain = domain.toLowerCase();\n  if (options.host_blacklist.length > 0 && (0, _checkHost.default)(lower_domain, options.host_blacklist)) {\n    return false;\n  }\n  if (options.host_whitelist.length > 0 && !(0, _checkHost.default)(lower_domain, options.host_whitelist)) {\n    return false;\n  }\n  var user = parts.join('@');\n  if (options.domain_specific_validation && (lower_domain === 'gmail.com' || lower_domain === 'googlemail.com')) {\n    /*\n    Previously we removed dots for gmail addresses before validating.\n    This was removed because it allows `multiple..dots@gmail.com`\n    to be reported as valid, but it is not.\n    Gmail only normalizes single dots, removing them from here is pointless,\n    should be done in normalizeEmail\n    */\n    user = user.toLowerCase();\n\n    // Removing sub-address from username before gmail validation\n    var username = user.split('+')[0];\n\n    // Dots are not included in gmail length restriction\n    if (!(0, _isByteLength.default)(username.replace(/\\./g, ''), {\n      min: 6,\n      max: 30\n    })) {\n      return false;\n    }\n    var _user_parts = username.split('.');\n    for (var i = 0; i < _user_parts.length; i++) {\n      if (!gmailUserPart.test(_user_parts[i])) {\n        return false;\n      }\n    }\n  }\n  if (options.ignore_max_length === false && (!(0, _isByteLength.default)(user, {\n    max: 64\n  }) || !(0, _isByteLength.default)(domain, {\n    max: 254\n  }))) {\n    return false;\n  }\n  if (!(0, _isFQDN.default)(domain, {\n    require_tld: options.require_tld,\n    ignore_max_length: options.ignore_max_length,\n    allow_underscores: options.allow_underscores\n  })) {\n    if (!options.allow_ip_domain) {\n      return false;\n    }\n    if (!(0, _isIP.default)(domain)) {\n      if (!domain.startsWith('[') || !domain.endsWith(']')) {\n        return false;\n      }\n      var noBracketdomain = domain.slice(1, -1);\n      if (noBracketdomain.length === 0 || !(0, _isIP.default)(noBracketdomain)) {\n        return false;\n      }\n    }\n  }\n  if (options.blacklisted_chars) {\n    if (user.search(new RegExp(\"[\".concat(options.blacklisted_chars, \"]+\"), 'g')) !== -1) return false;\n  }\n  if (user[0] === '\"' && user[user.length - 1] === '\"') {\n    user = user.slice(1, user.length - 1);\n    return options.allow_utf8_local_part ? quotedEmailUserUtf8.test(user) : quotedEmailUser.test(user);\n  }\n  var pattern = options.allow_utf8_local_part ? emailUserUtf8Part : emailUserPart;\n  var user_parts = user.split('.');\n  for (var _i = 0; _i < user_parts.length; _i++) {\n    if (!pattern.test(user_parts[_i])) {\n      return false;\n    }\n  }\n  return true;\n}\nmodule.exports = exports.default;\nmodule.exports[\"default\"] = exports.default;\n\n//# sourceURL=webpack://validacao-form-ts/./node_modules/validator/lib/isEmail.js?\n}");

/***/ }),

/***/ "./node_modules/validator/lib/isFQDN.js":
/*!**********************************************!*\
  !*** ./node_modules/validator/lib/isFQDN.js ***!
  \**********************************************/
/***/ ((module, exports, __webpack_require__) => {

eval("{\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = isFQDN;\nvar _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ \"./node_modules/validator/lib/util/assertString.js\"));\nvar _merge = _interopRequireDefault(__webpack_require__(/*! ./util/merge */ \"./node_modules/validator/lib/util/merge.js\"));\nfunction _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }\nvar default_fqdn_options = {\n  require_tld: true,\n  allow_underscores: false,\n  allow_trailing_dot: false,\n  allow_numeric_tld: false,\n  allow_wildcard: false,\n  ignore_max_length: false\n};\nfunction isFQDN(str, options) {\n  (0, _assertString.default)(str);\n  options = (0, _merge.default)(options, default_fqdn_options);\n\n  /* Remove the optional trailing dot before checking validity */\n  if (options.allow_trailing_dot && str[str.length - 1] === '.') {\n    str = str.substring(0, str.length - 1);\n  }\n\n  /* Remove the optional wildcard before checking validity */\n  if (options.allow_wildcard === true && str.indexOf('*.') === 0) {\n    str = str.substring(2);\n  }\n  var parts = str.split('.');\n  var tld = parts[parts.length - 1];\n  if (options.require_tld) {\n    // disallow fqdns without tld\n    if (parts.length < 2) {\n      return false;\n    }\n    if (!options.allow_numeric_tld && !/^([a-z\\u00A1-\\u00A8\\u00AA-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]{2,}|xn[a-z0-9-]{2,})$/i.test(tld)) {\n      return false;\n    }\n\n    // disallow spaces\n    if (/\\s/.test(tld)) {\n      return false;\n    }\n  }\n\n  // reject numeric TLDs\n  if (!options.allow_numeric_tld && /^\\d+$/.test(tld)) {\n    return false;\n  }\n  return parts.every(function (part) {\n    if (part.length > 63 && !options.ignore_max_length) {\n      return false;\n    }\n    if (!/^[a-z_\\u00a1-\\uffff0-9-]+$/i.test(part)) {\n      return false;\n    }\n\n    // disallow full-width chars\n    if (/[\\uff01-\\uff5e]/.test(part)) {\n      return false;\n    }\n\n    // disallow parts starting or ending with hyphen\n    if (/^-|-$/.test(part)) {\n      return false;\n    }\n    if (!options.allow_underscores && /_/.test(part)) {\n      return false;\n    }\n    return true;\n  });\n}\nmodule.exports = exports.default;\nmodule.exports[\"default\"] = exports.default;\n\n//# sourceURL=webpack://validacao-form-ts/./node_modules/validator/lib/isFQDN.js?\n}");

/***/ }),

/***/ "./node_modules/validator/lib/isIP.js":
/*!********************************************!*\
  !*** ./node_modules/validator/lib/isIP.js ***!
  \********************************************/
/***/ ((module, exports, __webpack_require__) => {

eval("{\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = isIP;\nvar _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ \"./node_modules/validator/lib/util/assertString.js\"));\nfunction _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\n/**\n11.3.  Examples\n\n   The following addresses\n\n             fe80::1234 (on the 1st link of the node)\n             ff02::5678 (on the 5th link of the node)\n             ff08::9abc (on the 10th organization of the node)\n\n   would be represented as follows:\n\n             fe80::1234%1\n             ff02::5678%5\n             ff08::9abc%10\n\n   (Here we assume a natural translation from a zone index to the\n   <zone_id> part, where the Nth zone of any scope is translated into\n   \"N\".)\n\n   If we use interface names as <zone_id>, those addresses could also be\n   represented as follows:\n\n            fe80::1234%ne0\n            ff02::5678%pvc1.3\n            ff08::9abc%interface10\n\n   where the interface \"ne0\" belongs to the 1st link, \"pvc1.3\" belongs\n   to the 5th link, and \"interface10\" belongs to the 10th organization.\n * * */\nvar IPv4SegmentFormat = '(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])';\nvar IPv4AddressFormat = \"(\".concat(IPv4SegmentFormat, \"[.]){3}\").concat(IPv4SegmentFormat);\nvar IPv4AddressRegExp = new RegExp(\"^\".concat(IPv4AddressFormat, \"$\"));\nvar IPv6SegmentFormat = '(?:[0-9a-fA-F]{1,4})';\nvar IPv6AddressRegExp = new RegExp('^(' + \"(?:\".concat(IPv6SegmentFormat, \":){7}(?:\").concat(IPv6SegmentFormat, \"|:)|\") + \"(?:\".concat(IPv6SegmentFormat, \":){6}(?:\").concat(IPv4AddressFormat, \"|:\").concat(IPv6SegmentFormat, \"|:)|\") + \"(?:\".concat(IPv6SegmentFormat, \":){5}(?::\").concat(IPv4AddressFormat, \"|(:\").concat(IPv6SegmentFormat, \"){1,2}|:)|\") + \"(?:\".concat(IPv6SegmentFormat, \":){4}(?:(:\").concat(IPv6SegmentFormat, \"){0,1}:\").concat(IPv4AddressFormat, \"|(:\").concat(IPv6SegmentFormat, \"){1,3}|:)|\") + \"(?:\".concat(IPv6SegmentFormat, \":){3}(?:(:\").concat(IPv6SegmentFormat, \"){0,2}:\").concat(IPv4AddressFormat, \"|(:\").concat(IPv6SegmentFormat, \"){1,4}|:)|\") + \"(?:\".concat(IPv6SegmentFormat, \":){2}(?:(:\").concat(IPv6SegmentFormat, \"){0,3}:\").concat(IPv4AddressFormat, \"|(:\").concat(IPv6SegmentFormat, \"){1,5}|:)|\") + \"(?:\".concat(IPv6SegmentFormat, \":){1}(?:(:\").concat(IPv6SegmentFormat, \"){0,4}:\").concat(IPv4AddressFormat, \"|(:\").concat(IPv6SegmentFormat, \"){1,6}|:)|\") + \"(?::((?::\".concat(IPv6SegmentFormat, \"){0,5}:\").concat(IPv4AddressFormat, \"|(?::\").concat(IPv6SegmentFormat, \"){1,7}|:))\") + ')(%[0-9a-zA-Z.]{1,})?$');\nfunction isIP(ipAddress) {\n  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n  (0, _assertString.default)(ipAddress);\n\n  // accessing 'arguments' for backwards compatibility: isIP(ipAddress [, version])\n  // eslint-disable-next-line prefer-rest-params\n  var version = (_typeof(options) === 'object' ? options.version : arguments[1]) || '';\n  if (!version) {\n    return isIP(ipAddress, {\n      version: 4\n    }) || isIP(ipAddress, {\n      version: 6\n    });\n  }\n  if (version.toString() === '4') {\n    return IPv4AddressRegExp.test(ipAddress);\n  }\n  if (version.toString() === '6') {\n    return IPv6AddressRegExp.test(ipAddress);\n  }\n  return false;\n}\nmodule.exports = exports.default;\nmodule.exports[\"default\"] = exports.default;\n\n//# sourceURL=webpack://validacao-form-ts/./node_modules/validator/lib/isIP.js?\n}");

/***/ }),

/***/ "./node_modules/validator/lib/util/assertString.js":
/*!*********************************************************!*\
  !*** ./node_modules/validator/lib/util/assertString.js ***!
  \*********************************************************/
/***/ ((module, exports) => {

eval("{\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = assertString;\nfunction assertString(input) {\n  if (input === undefined || input === null) throw new TypeError(\"Expected a string but received a \".concat(input));\n  if (input.constructor.name !== 'String') throw new TypeError(\"Expected a string but received a \".concat(input.constructor.name));\n}\nmodule.exports = exports.default;\nmodule.exports[\"default\"] = exports.default;\n\n//# sourceURL=webpack://validacao-form-ts/./node_modules/validator/lib/util/assertString.js?\n}");

/***/ }),

/***/ "./node_modules/validator/lib/util/checkHost.js":
/*!******************************************************!*\
  !*** ./node_modules/validator/lib/util/checkHost.js ***!
  \******************************************************/
/***/ ((module, exports) => {

eval("{\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = checkHost;\nfunction isRegExp(obj) {\n  return Object.prototype.toString.call(obj) === '[object RegExp]';\n}\nfunction checkHost(host, matches) {\n  for (var i = 0; i < matches.length; i++) {\n    var match = matches[i];\n    if (host === match || isRegExp(match) && match.test(host)) {\n      return true;\n    }\n  }\n  return false;\n}\nmodule.exports = exports.default;\nmodule.exports[\"default\"] = exports.default;\n\n//# sourceURL=webpack://validacao-form-ts/./node_modules/validator/lib/util/checkHost.js?\n}");

/***/ }),

/***/ "./node_modules/validator/lib/util/merge.js":
/*!**************************************************!*\
  !*** ./node_modules/validator/lib/util/merge.js ***!
  \**************************************************/
/***/ ((module, exports) => {

eval("{\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = merge;\nfunction merge() {\n  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n  var defaults = arguments.length > 1 ? arguments[1] : undefined;\n  for (var key in defaults) {\n    if (typeof obj[key] === 'undefined') {\n      obj[key] = defaults[key];\n    }\n  }\n  return obj;\n}\nmodule.exports = exports.default;\nmodule.exports[\"default\"] = exports.default;\n\n//# sourceURL=webpack://validacao-form-ts/./node_modules/validator/lib/util/merge.js?\n}");

/***/ }),

/***/ "./src/formValidator.ts":
/*!******************************!*\
  !*** ./src/formValidator.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   setupValidatorForm: () => (/* binding */ setupValidatorForm)\n/* harmony export */ });\n/* harmony import */ var validator_lib_isEmail__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! validator/lib/isEmail */ \"./node_modules/validator/lib/isEmail.js\");\n/* harmony import */ var validator_lib_isEmail__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(validator_lib_isEmail__WEBPACK_IMPORTED_MODULE_0__);\n\nconst setupValidatorForm = () => {\n    const form = document.querySelector('form');\n    const inputName = document.getElementById('inputName');\n    const inputEmail = document.getElementById('inputEmail');\n    const inputConfirmEmail = document.getElementById('inputConfirmEmail');\n    const inputPassword = document.getElementById('inputPassword');\n    const inputConfirmPassword = document.getElementById('inputConfirmPassword');\n    const validarInput = (input, condicaoErro, mensagem) => {\n        var _a;\n        const spanMsg = (_a = input.closest('.container-input')) === null || _a === void 0 ? void 0 : _a.querySelector('span');\n        if (!spanMsg)\n            return console.warn('Span de mensagem não encontrado para:', input.id);\n        if (condicaoErro) {\n            spanMsg.textContent = mensagem;\n            spanMsg.classList.add('msg', 'text-red-500');\n        }\n        else {\n            spanMsg.textContent = '';\n            spanMsg.classList.remove('msg', 'text-red-500');\n        }\n    };\n    inputName.addEventListener('input', () => validarInput(inputName, inputName.value.trim() === '', 'Por favor, insira seu nome.'));\n    inputEmail.addEventListener('input', () => validarInput(inputEmail, !validator_lib_isEmail__WEBPACK_IMPORTED_MODULE_0___default()(inputEmail.value), 'Por favor, insira um email válido.'));\n    inputConfirmEmail.addEventListener('input', () => validarInput(inputConfirmEmail, inputConfirmEmail.value !== inputEmail.value, 'Os emails não coincidem.'));\n    inputPassword.addEventListener('input', () => validarInput(inputPassword, inputPassword.value.trim().length < 8, 'A senha deve ter no mínimo 8 caracteres.'));\n    inputConfirmPassword.addEventListener('input', () => validarInput(inputConfirmPassword, inputConfirmPassword.value !== inputPassword.value, 'As senhas não coincidem.'));\n    form.addEventListener('submit', (e) => {\n        e.preventDefault();\n        validarInput(inputName, inputName.value.trim() === '', 'Por favor, insira seu nome.');\n        validarInput(inputEmail, !validator_lib_isEmail__WEBPACK_IMPORTED_MODULE_0___default()(inputEmail.value), 'Por favor, insira um email válido.');\n        validarInput(inputConfirmEmail, inputConfirmEmail.value !== inputEmail.value, 'Os emails não coincidem.');\n        validarInput(inputPassword, inputPassword.value.trim().length < 8, 'A senha deve ter no mínimo 8 caracteres.');\n        validarInput(inputConfirmPassword, inputConfirmPassword.value !== inputPassword.value, 'As senhas não coincidem.');\n        const formValido = !document.querySelectorAll('.msg:not(:empty)').length;\n        if (formValido) {\n            alert('Formulário enviado com sucesso!');\n            form.reset();\n        }\n    });\n};\n\n\n//# sourceURL=webpack://validacao-form-ts/./src/formValidator.ts?\n}");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _formValidator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./formValidator */ \"./src/formValidator.ts\");\n\ndocument.addEventListener('DOMContentLoaded', () => {\n    (0,_formValidator__WEBPACK_IMPORTED_MODULE_0__.setupValidatorForm)();\n});\n\n\n//# sourceURL=webpack://validacao-form-ts/./src/main.ts?\n}");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;