(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/usr/lib/node_modules/babelify/node_modules/lodash/function/restParam.js":[function(require,module,exports){
/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Native method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates a function that invokes `func` with the `this` binding of the
 * created function and arguments from `start` and beyond provided as an array.
 *
 * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/Web/JavaScript/Reference/Functions/rest_parameters).
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var say = _.restParam(function(what, names) {
 *   return what + ' ' + _.initial(names).join(', ') +
 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
 * });
 *
 * say('hello', 'fred', 'barney', 'pebbles');
 * // => 'hello fred, barney, & pebbles'
 */
function restParam(func, start) {
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  start = nativeMax(start === undefined ? (func.length - 1) : (+start || 0), 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        rest = Array(length);

    while (++index < length) {
      rest[index] = args[start + index];
    }
    switch (start) {
      case 0: return func.call(this, rest);
      case 1: return func.call(this, args[0], rest);
      case 2: return func.call(this, args[0], args[1], rest);
    }
    var otherArgs = Array(start + 1);
    index = -1;
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = rest;
    return func.apply(this, otherArgs);
  };
}

module.exports = restParam;

},{}],"/usr/lib/node_modules/babelify/node_modules/lodash/internal/assignWith.js":[function(require,module,exports){
var keys = require('../object/keys');

/**
 * A specialized version of `_.assign` for customizing assigned values without
 * support for argument juggling, multiple sources, and `this` binding `customizer`
 * functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {Function} customizer The function to customize assigned values.
 * @returns {Object} Returns `object`.
 */
function assignWith(object, source, customizer) {
  var index = -1,
      props = keys(source),
      length = props.length;

  while (++index < length) {
    var key = props[index],
        value = object[key],
        result = customizer(value, source[key], key, object, source);

    if ((result === result ? (result !== value) : (value === value)) ||
        (value === undefined && !(key in object))) {
      object[key] = result;
    }
  }
  return object;
}

module.exports = assignWith;

},{"../object/keys":"/usr/lib/node_modules/babelify/node_modules/lodash/object/keys.js"}],"/usr/lib/node_modules/babelify/node_modules/lodash/internal/baseAssign.js":[function(require,module,exports){
var baseCopy = require('./baseCopy'),
    keys = require('../object/keys');

/**
 * The base implementation of `_.assign` without support for argument juggling,
 * multiple sources, and `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return source == null
    ? object
    : baseCopy(source, keys(source), object);
}

module.exports = baseAssign;

},{"../object/keys":"/usr/lib/node_modules/babelify/node_modules/lodash/object/keys.js","./baseCopy":"/usr/lib/node_modules/babelify/node_modules/lodash/internal/baseCopy.js"}],"/usr/lib/node_modules/babelify/node_modules/lodash/internal/baseCopy.js":[function(require,module,exports){
/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property names to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @returns {Object} Returns `object`.
 */
function baseCopy(source, props, object) {
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];
    object[key] = source[key];
  }
  return object;
}

module.exports = baseCopy;

},{}],"/usr/lib/node_modules/babelify/node_modules/lodash/internal/baseProperty.js":[function(require,module,exports){
/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

module.exports = baseProperty;

},{}],"/usr/lib/node_modules/babelify/node_modules/lodash/internal/bindCallback.js":[function(require,module,exports){
var identity = require('../utility/identity');

/**
 * A specialized version of `baseCallback` which only supports `this` binding
 * and specifying the number of arguments to provide to `func`.
 *
 * @private
 * @param {Function} func The function to bind.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {number} [argCount] The number of arguments to provide to `func`.
 * @returns {Function} Returns the callback.
 */
function bindCallback(func, thisArg, argCount) {
  if (typeof func != 'function') {
    return identity;
  }
  if (thisArg === undefined) {
    return func;
  }
  switch (argCount) {
    case 1: return function(value) {
      return func.call(thisArg, value);
    };
    case 3: return function(value, index, collection) {
      return func.call(thisArg, value, index, collection);
    };
    case 4: return function(accumulator, value, index, collection) {
      return func.call(thisArg, accumulator, value, index, collection);
    };
    case 5: return function(value, other, key, object, source) {
      return func.call(thisArg, value, other, key, object, source);
    };
  }
  return function() {
    return func.apply(thisArg, arguments);
  };
}

module.exports = bindCallback;

},{"../utility/identity":"/usr/lib/node_modules/babelify/node_modules/lodash/utility/identity.js"}],"/usr/lib/node_modules/babelify/node_modules/lodash/internal/createAssigner.js":[function(require,module,exports){
var bindCallback = require('./bindCallback'),
    isIterateeCall = require('./isIterateeCall'),
    restParam = require('../function/restParam');

/**
 * Creates a `_.assign`, `_.defaults`, or `_.merge` function.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return restParam(function(object, sources) {
    var index = -1,
        length = object == null ? 0 : sources.length,
        customizer = length > 2 ? sources[length - 2] : undefined,
        guard = length > 2 ? sources[2] : undefined,
        thisArg = length > 1 ? sources[length - 1] : undefined;

    if (typeof customizer == 'function') {
      customizer = bindCallback(customizer, thisArg, 5);
      length -= 2;
    } else {
      customizer = typeof thisArg == 'function' ? thisArg : undefined;
      length -= (customizer ? 1 : 0);
    }
    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, customizer);
      }
    }
    return object;
  });
}

module.exports = createAssigner;

},{"../function/restParam":"/usr/lib/node_modules/babelify/node_modules/lodash/function/restParam.js","./bindCallback":"/usr/lib/node_modules/babelify/node_modules/lodash/internal/bindCallback.js","./isIterateeCall":"/usr/lib/node_modules/babelify/node_modules/lodash/internal/isIterateeCall.js"}],"/usr/lib/node_modules/babelify/node_modules/lodash/internal/getLength.js":[function(require,module,exports){
var baseProperty = require('./baseProperty');

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * that affects Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

module.exports = getLength;

},{"./baseProperty":"/usr/lib/node_modules/babelify/node_modules/lodash/internal/baseProperty.js"}],"/usr/lib/node_modules/babelify/node_modules/lodash/internal/getNative.js":[function(require,module,exports){
var isNative = require('../lang/isNative');

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = object == null ? undefined : object[key];
  return isNative(value) ? value : undefined;
}

module.exports = getNative;

},{"../lang/isNative":"/usr/lib/node_modules/babelify/node_modules/lodash/lang/isNative.js"}],"/usr/lib/node_modules/babelify/node_modules/lodash/internal/isArrayLike.js":[function(require,module,exports){
var getLength = require('./getLength'),
    isLength = require('./isLength');

/**
 * Checks if `value` is array-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 */
function isArrayLike(value) {
  return value != null && isLength(getLength(value));
}

module.exports = isArrayLike;

},{"./getLength":"/usr/lib/node_modules/babelify/node_modules/lodash/internal/getLength.js","./isLength":"/usr/lib/node_modules/babelify/node_modules/lodash/internal/isLength.js"}],"/usr/lib/node_modules/babelify/node_modules/lodash/internal/isIndex.js":[function(require,module,exports){
/** Used to detect unsigned integer values. */
var reIsUint = /^\d+$/;

/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

module.exports = isIndex;

},{}],"/usr/lib/node_modules/babelify/node_modules/lodash/internal/isIterateeCall.js":[function(require,module,exports){
var isArrayLike = require('./isArrayLike'),
    isIndex = require('./isIndex'),
    isObject = require('../lang/isObject');

/**
 * Checks if the provided arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
      ? (isArrayLike(object) && isIndex(index, object.length))
      : (type == 'string' && index in object)) {
    var other = object[index];
    return value === value ? (value === other) : (other !== other);
  }
  return false;
}

module.exports = isIterateeCall;

},{"../lang/isObject":"/usr/lib/node_modules/babelify/node_modules/lodash/lang/isObject.js","./isArrayLike":"/usr/lib/node_modules/babelify/node_modules/lodash/internal/isArrayLike.js","./isIndex":"/usr/lib/node_modules/babelify/node_modules/lodash/internal/isIndex.js"}],"/usr/lib/node_modules/babelify/node_modules/lodash/internal/isLength.js":[function(require,module,exports){
/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;

},{}],"/usr/lib/node_modules/babelify/node_modules/lodash/internal/isObjectLike.js":[function(require,module,exports){
/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

module.exports = isObjectLike;

},{}],"/usr/lib/node_modules/babelify/node_modules/lodash/internal/shimKeys.js":[function(require,module,exports){
var isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray'),
    isIndex = require('./isIndex'),
    isLength = require('./isLength'),
    keysIn = require('../object/keysIn');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A fallback implementation of `Object.keys` which creates an array of the
 * own enumerable property names of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function shimKeys(object) {
  var props = keysIn(object),
      propsLength = props.length,
      length = propsLength && object.length;

  var allowIndexes = !!length && isLength(length) &&
    (isArray(object) || isArguments(object));

  var index = -1,
      result = [];

  while (++index < propsLength) {
    var key = props[index];
    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = shimKeys;

},{"../lang/isArguments":"/usr/lib/node_modules/babelify/node_modules/lodash/lang/isArguments.js","../lang/isArray":"/usr/lib/node_modules/babelify/node_modules/lodash/lang/isArray.js","../object/keysIn":"/usr/lib/node_modules/babelify/node_modules/lodash/object/keysIn.js","./isIndex":"/usr/lib/node_modules/babelify/node_modules/lodash/internal/isIndex.js","./isLength":"/usr/lib/node_modules/babelify/node_modules/lodash/internal/isLength.js"}],"/usr/lib/node_modules/babelify/node_modules/lodash/lang/isArguments.js":[function(require,module,exports){
var isArrayLike = require('../internal/isArrayLike'),
    isObjectLike = require('../internal/isObjectLike');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Native method references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is classified as an `arguments` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  return isObjectLike(value) && isArrayLike(value) &&
    hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
}

module.exports = isArguments;

},{"../internal/isArrayLike":"/usr/lib/node_modules/babelify/node_modules/lodash/internal/isArrayLike.js","../internal/isObjectLike":"/usr/lib/node_modules/babelify/node_modules/lodash/internal/isObjectLike.js"}],"/usr/lib/node_modules/babelify/node_modules/lodash/lang/isArray.js":[function(require,module,exports){
var getNative = require('../internal/getNative'),
    isLength = require('../internal/isLength'),
    isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var arrayTag = '[object Array]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeIsArray = getNative(Array, 'isArray');

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(function() { return arguments; }());
 * // => false
 */
var isArray = nativeIsArray || function(value) {
  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
};

module.exports = isArray;

},{"../internal/getNative":"/usr/lib/node_modules/babelify/node_modules/lodash/internal/getNative.js","../internal/isLength":"/usr/lib/node_modules/babelify/node_modules/lodash/internal/isLength.js","../internal/isObjectLike":"/usr/lib/node_modules/babelify/node_modules/lodash/internal/isObjectLike.js"}],"/usr/lib/node_modules/babelify/node_modules/lodash/lang/isFunction.js":[function(require,module,exports){
var isObject = require('./isObject');

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in older versions of Chrome and Safari which return 'function' for regexes
  // and Safari 8 which returns 'object' for typed array constructors.
  return isObject(value) && objToString.call(value) == funcTag;
}

module.exports = isFunction;

},{"./isObject":"/usr/lib/node_modules/babelify/node_modules/lodash/lang/isObject.js"}],"/usr/lib/node_modules/babelify/node_modules/lodash/lang/isNative.js":[function(require,module,exports){
var isFunction = require('./isFunction'),
    isObjectLike = require('../internal/isObjectLike');

/** Used to detect host constructors (Safari > 5). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (isFunction(value)) {
    return reIsNative.test(fnToString.call(value));
  }
  return isObjectLike(value) && reIsHostCtor.test(value);
}

module.exports = isNative;

},{"../internal/isObjectLike":"/usr/lib/node_modules/babelify/node_modules/lodash/internal/isObjectLike.js","./isFunction":"/usr/lib/node_modules/babelify/node_modules/lodash/lang/isFunction.js"}],"/usr/lib/node_modules/babelify/node_modules/lodash/lang/isObject.js":[function(require,module,exports){
/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

module.exports = isObject;

},{}],"/usr/lib/node_modules/babelify/node_modules/lodash/object/assign.js":[function(require,module,exports){
var assignWith = require('../internal/assignWith'),
    baseAssign = require('../internal/baseAssign'),
    createAssigner = require('../internal/createAssigner');

/**
 * Assigns own enumerable properties of source object(s) to the destination
 * object. Subsequent sources overwrite property assignments of previous sources.
 * If `customizer` is provided it's invoked to produce the assigned values.
 * The `customizer` is bound to `thisArg` and invoked with five arguments:
 * (objectValue, sourceValue, key, object, source).
 *
 * **Note:** This method mutates `object` and is based on
 * [`Object.assign`](http://ecma-international.org/ecma-262/6.0/#sec-object.assign).
 *
 * @static
 * @memberOf _
 * @alias extend
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {*} [thisArg] The `this` binding of `customizer`.
 * @returns {Object} Returns `object`.
 * @example
 *
 * _.assign({ 'user': 'barney' }, { 'age': 40 }, { 'user': 'fred' });
 * // => { 'user': 'fred', 'age': 40 }
 *
 * // using a customizer callback
 * var defaults = _.partialRight(_.assign, function(value, other) {
 *   return _.isUndefined(value) ? other : value;
 * });
 *
 * defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
 * // => { 'user': 'barney', 'age': 36 }
 */
var assign = createAssigner(function(object, source, customizer) {
  return customizer
    ? assignWith(object, source, customizer)
    : baseAssign(object, source);
});

module.exports = assign;

},{"../internal/assignWith":"/usr/lib/node_modules/babelify/node_modules/lodash/internal/assignWith.js","../internal/baseAssign":"/usr/lib/node_modules/babelify/node_modules/lodash/internal/baseAssign.js","../internal/createAssigner":"/usr/lib/node_modules/babelify/node_modules/lodash/internal/createAssigner.js"}],"/usr/lib/node_modules/babelify/node_modules/lodash/object/keys.js":[function(require,module,exports){
var getNative = require('../internal/getNative'),
    isArrayLike = require('../internal/isArrayLike'),
    isObject = require('../lang/isObject'),
    shimKeys = require('../internal/shimKeys');

/* Native method references for those with the same name as other `lodash` methods. */
var nativeKeys = getNative(Object, 'keys');

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
var keys = !nativeKeys ? shimKeys : function(object) {
  var Ctor = object == null ? undefined : object.constructor;
  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
      (typeof object != 'function' && isArrayLike(object))) {
    return shimKeys(object);
  }
  return isObject(object) ? nativeKeys(object) : [];
};

module.exports = keys;

},{"../internal/getNative":"/usr/lib/node_modules/babelify/node_modules/lodash/internal/getNative.js","../internal/isArrayLike":"/usr/lib/node_modules/babelify/node_modules/lodash/internal/isArrayLike.js","../internal/shimKeys":"/usr/lib/node_modules/babelify/node_modules/lodash/internal/shimKeys.js","../lang/isObject":"/usr/lib/node_modules/babelify/node_modules/lodash/lang/isObject.js"}],"/usr/lib/node_modules/babelify/node_modules/lodash/object/keysIn.js":[function(require,module,exports){
var isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray'),
    isIndex = require('../internal/isIndex'),
    isLength = require('../internal/isLength'),
    isObject = require('../lang/isObject');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  if (object == null) {
    return [];
  }
  if (!isObject(object)) {
    object = Object(object);
  }
  var length = object.length;
  length = (length && isLength(length) &&
    (isArray(object) || isArguments(object)) && length) || 0;

  var Ctor = object.constructor,
      index = -1,
      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
      result = Array(length),
      skipIndexes = length > 0;

  while (++index < length) {
    result[index] = (index + '');
  }
  for (var key in object) {
    if (!(skipIndexes && isIndex(key, length)) &&
        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = keysIn;

},{"../internal/isIndex":"/usr/lib/node_modules/babelify/node_modules/lodash/internal/isIndex.js","../internal/isLength":"/usr/lib/node_modules/babelify/node_modules/lodash/internal/isLength.js","../lang/isArguments":"/usr/lib/node_modules/babelify/node_modules/lodash/lang/isArguments.js","../lang/isArray":"/usr/lib/node_modules/babelify/node_modules/lodash/lang/isArray.js","../lang/isObject":"/usr/lib/node_modules/babelify/node_modules/lodash/lang/isObject.js"}],"/usr/lib/node_modules/babelify/node_modules/lodash/utility/identity.js":[function(require,module,exports){
/**
 * This method returns the first argument provided to it.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'user': 'fred' };
 *
 * _.identity(object) === object;
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

},{}],"/var/www/github/vue-freeze/master/src/freezer.min.js":[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

/*
freezer-js v0.10.0
https://github.com/arqex/freezer
MIT: https://github.com/arqex/freezer/raw/master/LICENSE
*/
!function (t, e) {
  "function" == typeof define && define.amd ? define([], e) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? module.exports = e() : t.Freezer = e();
}(undefined, function () {
  "use strict";
  var t = new Function("return this")(),
      e = { extend: function extend(t, e) {
      for (var n in e) {
        t[n] = e[n];
      }return t;
    }, createNonEnumerable: function createNonEnumerable(t, e) {
      var n = {};for (var r in t) {
        n[r] = { value: t[r] };
      }return Object.create(e || {}, n);
    }, error: function error(t) {
      var e = new Error(t);if (console) return console.error(e);throw e;
    }, each: function each(t, e) {
      var n, r, i;if (t && t.constructor == Array) for (n = 0, r = t.length; r > n; n++) {
        e(t[n], n);
      } else for (i = Object.keys(t), n = 0, r = i.length; r > n; n++) {
        e(t[i[n]], i[n]);
      }
    }, addNE: function addNE(t, e) {
      for (var n in e) {
        Object.defineProperty(t, n, { enumerable: !1, configurable: !0, writable: !0, value: e[n] });
      }
    }, createNE: function createNE(t) {
      var e = {};for (var n in t) {
        e[n] = { writable: !0, configurable: !0, enumerable: !1, value: t[n] };
      }return e;
    }, nextTick: function () {
      function e() {
        for (; r = i.shift();) {
          r();
        }o = !1;
      }function n(t) {
        i.push(t), o || (o = !0, f());
      }var r,
          i = [],
          o = !1,
          s = !!t.postMessage && "undefined" != typeof Window && t instanceof Window,
          a = "nexttick",
          f = function () {
        return s ? function () {
          t.postMessage(a, "*");
        } : function () {
          setTimeout(function () {
            c();
          }, 0);
        };
      }(),
          c = function () {
        return s ? function (n) {
          n.source === t && n.data === a && (n.stopPropagation(), e());
        } : e;
      }();return s && t.addEventListener("message", c, !0), n.removeListener = function () {
        t.removeEventListener("message", c, !0);
      }, n;
    }(), findPivot: function findPivot(t) {
      if (t && t.__) {
        if (t.__.pivot) return t;for (var e, n = 0, r = t.__.parents, i = 0; !n && i < r.length;) {
          e = r[i], e.__.pivot && (n = e), i++;
        }if (n) return n;for (i = 0; !n && i < r.length;) {
          n = this.findPivot(r[i]), i++;
        }return n;
      }
    }, isLeaf: function isLeaf(t) {
      var e = t && t.constructor;return !e || e == String || e == Number || e == Boolean;
    } },
      n = { init: function init(t) {
      var n = { set: function set(t, n) {
          var r = t,
              i = this.__.trans;if ("object" != (typeof t === "undefined" ? "undefined" : _typeof(t)) && (r = {}, r[t] = n), !i) {
            for (var o in r) {
              i = i || this[o] !== r[o];
            }if (!i) return e.findPivot(this) || this;
          }return this.__.store.notify("merge", this, r);
        }, reset: function reset(t) {
          return this.__.store.notify("replace", this, t);
        }, getListener: function getListener() {
          return t.createListener(this);
        }, toJS: function toJS() {
          var t;return t = this.constructor == Array ? new Array(this.length) : {}, e.each(this, function (e, n) {
            e && e.__ ? t[n] = e.toJS() : t[n] = e;
          }), t;
        }, transact: function transact() {
          return this.__.store.notify("transact", this);
        }, run: function run() {
          return this.__.store.notify("run", this);
        }, now: function now() {
          return this.__.store.notify("now", this);
        }, pivot: function pivot() {
          return this.__.store.notify("pivot", this);
        } },
          r = e.extend({ push: function push(t) {
          return this.append([t]);
        }, append: function append(t) {
          return t && t.length ? this.__.store.notify("splice", this, [this.length, 0].concat(t)) : this;
        }, pop: function pop() {
          return this.length ? this.__.store.notify("splice", this, [this.length - 1, 1]) : this;
        }, unshift: function unshift(t) {
          return this.prepend([t]);
        }, prepend: function prepend(t) {
          return t && t.length ? this.__.store.notify("splice", this, [0, 0].concat(t)) : this;
        }, shift: function shift() {
          return this.length ? this.__.store.notify("splice", this, [0, 1]) : this;
        }, splice: function splice(t, e, n) {
          return this.__.store.notify("splice", this, arguments);
        } }, n),
          i = Object.create(Array.prototype, e.createNE(r)),
          o = e.createNE(e.extend({ remove: function remove(t) {
          var e = [],
              n = t;t.constructor != Array && (n = [t]);for (var r = 0, i = n.length; i > r; r++) {
            this.hasOwnProperty(n[r]) && e.push(n[r]);
          }return e.length ? this.__.store.notify("remove", this, e) : this;
        } }, n)),
          s = Object.create(Object.prototype, o),
          a = function () {
        return [].__proto__ ? function (t) {
          var e = new Array(t);return e.__proto__ = i, e;
        } : function (t) {
          var e = new Array(t);for (var n in r) {
            e[n] = r[n];
          }return e;
        };
      }();this.clone = function (t) {
        var e = t.constructor;return e == Array ? a(t.length) : e === Object ? Object.create(s) : (console.log("instance"), Object.create(e.prototype, o));
      };
    } },
      r = "beforeAll",
      i = "afterAll",
      o = [r, i],
      s = { on: function on(t, e, n) {
      var r = this._events[t] || [];return r.push({ callback: e, once: n }), this._events[t] = r, this;
    }, once: function once(t, e) {
      return this.on(t, e, !0);
    }, off: function off(t, e) {
      if ("undefined" == typeof t) this._events = {};else if ("undefined" == typeof e) this._events[t] = [];else {
        var n,
            r = this._events[t] || [];for (n = r.length - 1; n >= 0; n--) {
          r[n].callback === e && r.splice(n, 1);
        }
      }return this;
    }, trigger: function trigger(t) {
      var e,
          n,
          s = [].slice.call(arguments, 1),
          a = this._events[t] || [],
          f = [],
          c = -1 != o.indexOf(t);for (c || this.trigger.apply(this, [r, t].concat(s)), e = 0; e < a.length; e++) {
        n = a[e], n.callback ? n.callback.apply(this, s) : n.once = !0, n.once && f.push(e);
      }for (e = f.length - 1; e >= 0; e--) {
        a.splice(f[e], 1);
      }return c || this.trigger.apply(this, [i, t].concat(s)), this;
    } },
      a = e.createNonEnumerable(s),
      f = { freeze: function freeze(t, r) {
      if (t && t.__) return t;var i = this,
          o = n.clone(t);return e.addNE(o, { __: { listener: !1, parents: [], store: r } }), e.each(t, function (t, n) {
        e.isLeaf(t) || (t = i.freeze(t, r)), t && t.__ && i.addParent(t, o), o[n] = t;
      }), r.freezeFn(o), o;
    }, merge: function merge(t, n) {
      var r = t.__,
          i = r.trans,
          n = e.extend({}, n);if (i) {
        for (var o in n) {
          i[o] = n[o];
        }return t;
      }var s,
          a,
          f,
          c = this,
          u = this.copyMeta(t),
          h = r.store;e.each(t, function (r, i) {
        return f = r && r.__, f && c.removeParent(r, t), (s = n[i]) ? (e.isLeaf(s) || (s = c.freeze(s, h)), s && s.__ && c.addParent(s, u), delete n[i], void (u[i] = s)) : (f && c.addParent(r, u), u[i] = r);
      });for (a in n) {
        s = n[a], e.isLeaf(s) || (s = c.freeze(s, h)), s && s.__ && c.addParent(s, u), u[a] = s;
      }return r.store.freezeFn(u), this.refreshParents(t, u), u;
    }, replace: function replace(t, n) {
      var r = this,
          i = t.__,
          o = n;return e.isLeaf(n) || (o = r.freeze(n, i.store), o.__.parents = i.parents, o.__.updateRoot = i.updateRoot, i.listener && (o.__.listener = i.listener)), o && this.fixChildren(o, t), this.refreshParents(t, o), o;
    }, remove: function remove(t, n) {
      var r = t.__.trans;if (r) {
        for (var i = n.length - 1; i >= 0; i--) {
          delete r[n[i]];
        }return t;
      }var o,
          s = this,
          a = this.copyMeta(t);return e.each(t, function (e, r) {
        o = e && e.__, o && s.removeParent(e, t), -1 == n.indexOf(r) && (o && s.addParent(e, a), a[r] = e);
      }), t.__.store.freezeFn(a), this.refreshParents(t, a), a;
    }, splice: function splice(t, n) {
      var r = t.__,
          i = r.trans;if (i) return i.splice.apply(i, n), t;var o,
          s = this,
          a = this.copyMeta(t),
          f = n[0],
          c = f + n[1];if (e.each(t, function (e, n) {
        e && e.__ && (s.removeParent(e, t), (f > n || n >= c) && s.addParent(e, a)), a[n] = e;
      }), n.length > 1) for (var u = n.length - 1; u >= 2; u--) {
        o = n[u], e.isLeaf(o) || (o = this.freeze(o, r.store)), o && o.__ && this.addParent(o, a), n[u] = o;
      }return Array.prototype.splice.apply(a, n), r.store.freezeFn(a), this.refreshParents(t, a), a;
    }, transact: function transact(t) {
      var n,
          r = this,
          i = t.__.trans;return i ? i : (n = t.constructor == Array ? [] : {}, e.each(t, function (t, e) {
        n[e] = t;
      }), t.__.trans = n, e.nextTick(function () {
        t.__.trans && r.run(t);
      }), n);
    }, run: function run(t) {
      var n = this,
          r = t.__.trans;if (!r) return t;e.each(r, function (e, r) {
        e && e.__ && n.removeParent(e, t);
      }), delete t.__.trans;var i = this.replace(t, r);return i;
    }, pivot: function pivot(t) {
      return t.__.pivot = 1, this.unpivot(t), t;
    }, unpivot: function unpivot(t) {
      e.nextTick(function () {
        t.__.pivot = 0;
      });
    }, refresh: function refresh(t, n, r) {
      var i = this,
          o = t.__.trans,
          s = 0;if (o) return e.each(o, function (e, a) {
        s || e === n && (o[a] = r, s = 1, r && r.__ && i.addParent(r, t));
      }), t;var a,
          f = this.copyMeta(t);e.each(t, function (e, o) {
        e === n && (e = r), e && (a = e.__) && (i.removeParent(e, t), i.addParent(e, f)), f[o] = e;
      }), t.__.store.freezeFn(f), this.refreshParents(t, f);
    }, fixChildren: function fixChildren(t, n) {
      var r = this;e.each(t, function (e) {
        if (e && e.__) {
          if (-1 != e.__.parents.indexOf(t)) return r.fixChildren(e);if (1 == e.__.parents.length) return e.__.parents = [t];n && r.removeParent(e, n), r.addParent(e, t);
        }
      });
    }, copyMeta: function copyMeta(t) {
      var r = n.clone(t),
          i = t.__;return e.addNE(r, { __: { store: i.store, updateRoot: i.updateRoot, listener: i.listener, parents: i.parents.slice(0), trans: i.trans, pivot: i.pivot } }), i.pivot && this.unpivot(r), r;
    }, refreshParents: function refreshParents(t, e) {
      var n,
          r = t.__,
          i = r.parents.length;if (t.__.updateRoot && t.__.updateRoot(t, e), e && this.trigger(e, "update", e, r.store.live), i) for (n = i - 1; n >= 0; n--) {
        this.refresh(r.parents[n], t, e);
      }
    }, removeParent: function removeParent(t, e) {
      var n = t.__.parents,
          r = n.indexOf(e);-1 != r && n.splice(r, 1);
    }, addParent: function addParent(t, e) {
      var n = t.__.parents,
          r = n.indexOf(e);-1 == r && (n[n.length] = e);
    }, trigger: function trigger(t, n, r, i) {
      var o = t.__.listener;if (o) {
        var s = o.ticking;if (i) return void ((s || r) && (o.ticking = 0, o.trigger(n, s || r)));o.ticking = r, s || e.nextTick(function () {
          if (o.ticking) {
            var t = o.ticking;o.ticking = 0, o.trigger(n, t);
          }
        });
      }
    }, createListener: function createListener(t) {
      var e = t.__.listener;return e || (e = Object.create(a, { _events: { value: {}, writable: !0 } }), t.__.listener = e), e;
    } };n.init(f);var c = function c(t, n) {
    var r,
        i = this,
        o = n || {},
        s = { live: o.live || !1 },
        a = [],
        c = 0,
        u = function u(t) {
      var e,
          n = t.__;for (n.listener && f.trigger(t, "update", 0, !0), e = 0; e < n.parents.length; e++) {
        n.store.notify("now", n.parents[e]);
      }
    },
        h = function h(t) {
      a.push(t), c || (c = 1, e.nextTick(function () {
        a = [], c = 0;
      }));
    };s.notify = function (t, n, r) {
      if ("now" == t) {
        if (a.length) for (; a.length;) {
          u(a.shift());
        } else u(n);return n;
      }var i = f[t](n, r);if ("pivot" != t) {
        var o = e.findPivot(i);if (o) return h(i), o;
      }return i;
    }, s.freezeFn = o.mutable === !0 ? function () {} : function (t) {
      Object.freeze(t);
    }, r = f.freeze(t, s), r.__.updateRoot = function (t, e) {
      t === r && (r = e);
    };var _ = r.getListener(),
        l = {};e.each(["on", "off", "once", "trigger"], function (t) {
      var n = {};n[t] = _[t].bind(_), e.addNE(i, n), e.addNE(l, n);
    }), e.addNE(this, { get: function get() {
        return r;
      }, set: function set(t) {
        console.log("setting"), r.reset(t);
      }, getEventHub: function getEventHub() {
        return l;
      } }), e.addNE(this, { getData: this.get, setData: this.set });
  };return c;
});

},{}],"/var/www/github/vue-freeze/master/src/vue-freeze.js":[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /*! Copyright (c) 2016 Naufal Rabbani (http://github.com/BosNaufal)
                                                                                                                                                                                                                                                  * Licensed Under MIT (http://opensource.org/licenses/MIT)
                                                                                                                                                                                                                                                  *
                                                                                                                                                                                                                                                  * [ Vue Freeze JS ]
                                                                                                                                                                                                                                                  *   Version 1.0.0
                                                                                                                                                                                                                                                  *
                                                                                                                                                                                                                                                  */


var _freezerMin = require('./freezer.min.js');

var _freezerMin2 = _interopRequireDefault(_freezerMin);

var _assign = require('../node_modules/babelify/node_modules/lodash/object/assign.js');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {

  var VueFreeze = {
    install: function install(Vue, opt) {

      // Check the Freezer
      if (typeof _freezerMin2.default == 'undefined') console.warn('[Vue Freeze]: You Must Install Freezer.js firs!');

      var plugin = this;

      // Plugin Store
      if (typeof opt == 'undefined') {
        console.warn('[Vue Freeze]: Please Specify the store! Via Vue.use Options!');
        return false;
      } else {
        // live update?
        var live = opt.live ? opt.live : true;

        // make our store!
        var store = new _freezerMin2.default(opt.state, { live: live });

        // binding the action
        opt.action(store);
      }

      // Make a data become mutable
      var mutable = function mutable(data) {
        return JSON.parse(JSON.stringify(data));
      };

      // Make a mixin
      plugin.mixin = {};

      // To make the state become watchable!
      plugin.mixin.data = function () {
        return {
          state: {}
        };
      };

      // Mixin Methods For vm instance
      plugin.mixin.methods = {
        // set the vm state to new state

        updateState: function updateState(old, val) {
          var newState = (0, _assign2.default)({}, this.state, store.get().toJS());
          this.$set('state', newState);
        }
      };

      // Mixin Created Event
      plugin.mixin.created = function () {
        var me = this;

        // set global state as internal state
        me.$set('state', mutable(store.get()));

        // Make Methods
        Vue.util.defineReactive(this, '$store', store);
        Vue.util.defineReactive(this, '$action', function (eventName, arg) {
          // trigger freezer event with pass the old value at the end
          store.trigger(eventName, arg, me.state);
        });

        // When Store Updated~
        me.$store.on('update', function (val) {
          // Update the state
          me.updateState(me.state, val);
        });
      };

      // Merge mixin to VM via vue options
      Vue.options = Vue.util.mergeOptions(Vue.options, plugin.mixin);
    } // install()

  }; // VueFreeze

  // If support node / ES6 module
  if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && module.exports) {
    module.exports = VueFreeze;
  }
  // if using require js
  if (typeof define === 'function' && define.amd) {
    define(function () {
      return VueFreeze;
    });
  }
  // if script loaded by script tag in HTML file
  if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== undefined) {
    return window.VueFreeze = VueFreeze;
  }
})();

},{"../node_modules/babelify/node_modules/lodash/object/assign.js":"/usr/lib/node_modules/babelify/node_modules/lodash/object/assign.js","./freezer.min.js":"/var/www/github/vue-freeze/master/src/freezer.min.js"}]},{},["/var/www/github/vue-freeze/master/src/vue-freeze.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Vzci9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi4uLy4uLy4uLy4uLy4uL3Vzci9saWIvbm9kZV9tb2R1bGVzL2JhYmVsaWZ5L25vZGVfbW9kdWxlcy9sb2Rhc2gvZnVuY3Rpb24vcmVzdFBhcmFtLmpzIiwiLi4vLi4vLi4vLi4vLi4vdXNyL2xpYi9ub2RlX21vZHVsZXMvYmFiZWxpZnkvbm9kZV9tb2R1bGVzL2xvZGFzaC9pbnRlcm5hbC9hc3NpZ25XaXRoLmpzIiwiLi4vLi4vLi4vLi4vLi4vdXNyL2xpYi9ub2RlX21vZHVsZXMvYmFiZWxpZnkvbm9kZV9tb2R1bGVzL2xvZGFzaC9pbnRlcm5hbC9iYXNlQXNzaWduLmpzIiwiLi4vLi4vLi4vLi4vLi4vdXNyL2xpYi9ub2RlX21vZHVsZXMvYmFiZWxpZnkvbm9kZV9tb2R1bGVzL2xvZGFzaC9pbnRlcm5hbC9iYXNlQ29weS5qcyIsIi4uLy4uLy4uLy4uLy4uL3Vzci9saWIvbm9kZV9tb2R1bGVzL2JhYmVsaWZ5L25vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvYmFzZVByb3BlcnR5LmpzIiwiLi4vLi4vLi4vLi4vLi4vdXNyL2xpYi9ub2RlX21vZHVsZXMvYmFiZWxpZnkvbm9kZV9tb2R1bGVzL2xvZGFzaC9pbnRlcm5hbC9iaW5kQ2FsbGJhY2suanMiLCIuLi8uLi8uLi8uLi8uLi91c3IvbGliL25vZGVfbW9kdWxlcy9iYWJlbGlmeS9ub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2NyZWF0ZUFzc2lnbmVyLmpzIiwiLi4vLi4vLi4vLi4vLi4vdXNyL2xpYi9ub2RlX21vZHVsZXMvYmFiZWxpZnkvbm9kZV9tb2R1bGVzL2xvZGFzaC9pbnRlcm5hbC9nZXRMZW5ndGguanMiLCIuLi8uLi8uLi8uLi8uLi91c3IvbGliL25vZGVfbW9kdWxlcy9iYWJlbGlmeS9ub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2dldE5hdGl2ZS5qcyIsIi4uLy4uLy4uLy4uLy4uL3Vzci9saWIvbm9kZV9tb2R1bGVzL2JhYmVsaWZ5L25vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvaXNBcnJheUxpa2UuanMiLCIuLi8uLi8uLi8uLi8uLi91c3IvbGliL25vZGVfbW9kdWxlcy9iYWJlbGlmeS9ub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2lzSW5kZXguanMiLCIuLi8uLi8uLi8uLi8uLi91c3IvbGliL25vZGVfbW9kdWxlcy9iYWJlbGlmeS9ub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2lzSXRlcmF0ZWVDYWxsLmpzIiwiLi4vLi4vLi4vLi4vLi4vdXNyL2xpYi9ub2RlX21vZHVsZXMvYmFiZWxpZnkvbm9kZV9tb2R1bGVzL2xvZGFzaC9pbnRlcm5hbC9pc0xlbmd0aC5qcyIsIi4uLy4uLy4uLy4uLy4uL3Vzci9saWIvbm9kZV9tb2R1bGVzL2JhYmVsaWZ5L25vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvaXNPYmplY3RMaWtlLmpzIiwiLi4vLi4vLi4vLi4vLi4vdXNyL2xpYi9ub2RlX21vZHVsZXMvYmFiZWxpZnkvbm9kZV9tb2R1bGVzL2xvZGFzaC9pbnRlcm5hbC9zaGltS2V5cy5qcyIsIi4uLy4uLy4uLy4uLy4uL3Vzci9saWIvbm9kZV9tb2R1bGVzL2JhYmVsaWZ5L25vZGVfbW9kdWxlcy9sb2Rhc2gvbGFuZy9pc0FyZ3VtZW50cy5qcyIsIi4uLy4uLy4uLy4uLy4uL3Vzci9saWIvbm9kZV9tb2R1bGVzL2JhYmVsaWZ5L25vZGVfbW9kdWxlcy9sb2Rhc2gvbGFuZy9pc0FycmF5LmpzIiwiLi4vLi4vLi4vLi4vLi4vdXNyL2xpYi9ub2RlX21vZHVsZXMvYmFiZWxpZnkvbm9kZV9tb2R1bGVzL2xvZGFzaC9sYW5nL2lzRnVuY3Rpb24uanMiLCIuLi8uLi8uLi8uLi8uLi91c3IvbGliL25vZGVfbW9kdWxlcy9iYWJlbGlmeS9ub2RlX21vZHVsZXMvbG9kYXNoL2xhbmcvaXNOYXRpdmUuanMiLCIuLi8uLi8uLi8uLi8uLi91c3IvbGliL25vZGVfbW9kdWxlcy9iYWJlbGlmeS9ub2RlX21vZHVsZXMvbG9kYXNoL2xhbmcvaXNPYmplY3QuanMiLCIuLi8uLi8uLi8uLi8uLi91c3IvbGliL25vZGVfbW9kdWxlcy9iYWJlbGlmeS9ub2RlX21vZHVsZXMvbG9kYXNoL29iamVjdC9hc3NpZ24uanMiLCIuLi8uLi8uLi8uLi8uLi91c3IvbGliL25vZGVfbW9kdWxlcy9iYWJlbGlmeS9ub2RlX21vZHVsZXMvbG9kYXNoL29iamVjdC9rZXlzLmpzIiwiLi4vLi4vLi4vLi4vLi4vdXNyL2xpYi9ub2RlX21vZHVsZXMvYmFiZWxpZnkvbm9kZV9tb2R1bGVzL2xvZGFzaC9vYmplY3Qva2V5c0luLmpzIiwiLi4vLi4vLi4vLi4vLi4vdXNyL2xpYi9ub2RlX21vZHVsZXMvYmFiZWxpZnkvbm9kZV9tb2R1bGVzL2xvZGFzaC91dGlsaXR5L2lkZW50aXR5LmpzIiwic3JjL2ZyZWV6ZXIubWluLmpzIiwic3JjL3Z1ZS1mcmVlemUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNmQSxDQUFDLFVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYTtBQUFDLGdCQUFZLE9B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QWhEOztBQXJGUyxNQXlGTCxRQUFPLHVEQUFQLEtBQWtCLFNBQWxCLEVBQTZCO0FBQy9CLFdBQU8sT0FBTyxTQUFQLEdBQW1CLFNBQW5CLENBRHdCO0dBQWpDO0NBekZELENBQUQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqIFVzZWQgYXMgdGhlIGBUeXBlRXJyb3JgIG1lc3NhZ2UgZm9yIFwiRnVuY3Rpb25zXCIgbWV0aG9kcy4gKi9cbnZhciBGVU5DX0VSUk9SX1RFWFQgPSAnRXhwZWN0ZWQgYSBmdW5jdGlvbic7XG5cbi8qIE5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlTWF4ID0gTWF0aC5tYXg7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBgZnVuY2Agd2l0aCB0aGUgYHRoaXNgIGJpbmRpbmcgb2YgdGhlXG4gKiBjcmVhdGVkIGZ1bmN0aW9uIGFuZCBhcmd1bWVudHMgZnJvbSBgc3RhcnRgIGFuZCBiZXlvbmQgcHJvdmlkZWQgYXMgYW4gYXJyYXkuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGlzIGJhc2VkIG9uIHRoZSBbcmVzdCBwYXJhbWV0ZXJdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9GdW5jdGlvbnMvcmVzdF9wYXJhbWV0ZXJzKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBhcHBseSBhIHJlc3QgcGFyYW1ldGVyIHRvLlxuICogQHBhcmFtIHtudW1iZXJ9IFtzdGFydD1mdW5jLmxlbmd0aC0xXSBUaGUgc3RhcnQgcG9zaXRpb24gb2YgdGhlIHJlc3QgcGFyYW1ldGVyLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBzYXkgPSBfLnJlc3RQYXJhbShmdW5jdGlvbih3aGF0LCBuYW1lcykge1xuICogICByZXR1cm4gd2hhdCArICcgJyArIF8uaW5pdGlhbChuYW1lcykuam9pbignLCAnKSArXG4gKiAgICAgKF8uc2l6ZShuYW1lcykgPiAxID8gJywgJiAnIDogJycpICsgXy5sYXN0KG5hbWVzKTtcbiAqIH0pO1xuICpcbiAqIHNheSgnaGVsbG8nLCAnZnJlZCcsICdiYXJuZXknLCAncGViYmxlcycpO1xuICogLy8gPT4gJ2hlbGxvIGZyZWQsIGJhcm5leSwgJiBwZWJibGVzJ1xuICovXG5mdW5jdGlvbiByZXN0UGFyYW0oZnVuYywgc3RhcnQpIHtcbiAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEZVTkNfRVJST1JfVEVYVCk7XG4gIH1cbiAgc3RhcnQgPSBuYXRpdmVNYXgoc3RhcnQgPT09IHVuZGVmaW5lZCA/IChmdW5jLmxlbmd0aCAtIDEpIDogKCtzdGFydCB8fCAwKSwgMCk7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cyxcbiAgICAgICAgaW5kZXggPSAtMSxcbiAgICAgICAgbGVuZ3RoID0gbmF0aXZlTWF4KGFyZ3MubGVuZ3RoIC0gc3RhcnQsIDApLFxuICAgICAgICByZXN0ID0gQXJyYXkobGVuZ3RoKTtcblxuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICByZXN0W2luZGV4XSA9IGFyZ3Nbc3RhcnQgKyBpbmRleF07XG4gICAgfVxuICAgIHN3aXRjaCAoc3RhcnQpIHtcbiAgICAgIGNhc2UgMDogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzLCByZXN0KTtcbiAgICAgIGNhc2UgMTogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzLCBhcmdzWzBdLCByZXN0KTtcbiAgICAgIGNhc2UgMjogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzLCBhcmdzWzBdLCBhcmdzWzFdLCByZXN0KTtcbiAgICB9XG4gICAgdmFyIG90aGVyQXJncyA9IEFycmF5KHN0YXJ0ICsgMSk7XG4gICAgaW5kZXggPSAtMTtcbiAgICB3aGlsZSAoKytpbmRleCA8IHN0YXJ0KSB7XG4gICAgICBvdGhlckFyZ3NbaW5kZXhdID0gYXJnc1tpbmRleF07XG4gICAgfVxuICAgIG90aGVyQXJnc1tzdGFydF0gPSByZXN0O1xuICAgIHJldHVybiBmdW5jLmFwcGx5KHRoaXMsIG90aGVyQXJncyk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVzdFBhcmFtO1xuIiwidmFyIGtleXMgPSByZXF1aXJlKCcuLi9vYmplY3Qva2V5cycpO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5hc3NpZ25gIGZvciBjdXN0b21pemluZyBhc3NpZ25lZCB2YWx1ZXMgd2l0aG91dFxuICogc3VwcG9ydCBmb3IgYXJndW1lbnQganVnZ2xpbmcsIG11bHRpcGxlIHNvdXJjZXMsIGFuZCBgdGhpc2AgYmluZGluZyBgY3VzdG9taXplcmBcbiAqIGZ1bmN0aW9ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgc291cmNlIG9iamVjdC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGN1c3RvbWl6ZXIgVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBhc3NpZ25lZCB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBhc3NpZ25XaXRoKG9iamVjdCwgc291cmNlLCBjdXN0b21pemVyKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcHJvcHMgPSBrZXlzKHNvdXJjZSksXG4gICAgICBsZW5ndGggPSBwcm9wcy5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIga2V5ID0gcHJvcHNbaW5kZXhdLFxuICAgICAgICB2YWx1ZSA9IG9iamVjdFtrZXldLFxuICAgICAgICByZXN1bHQgPSBjdXN0b21pemVyKHZhbHVlLCBzb3VyY2Vba2V5XSwga2V5LCBvYmplY3QsIHNvdXJjZSk7XG5cbiAgICBpZiAoKHJlc3VsdCA9PT0gcmVzdWx0ID8gKHJlc3VsdCAhPT0gdmFsdWUpIDogKHZhbHVlID09PSB2YWx1ZSkpIHx8XG4gICAgICAgICh2YWx1ZSA9PT0gdW5kZWZpbmVkICYmICEoa2V5IGluIG9iamVjdCkpKSB7XG4gICAgICBvYmplY3Rba2V5XSA9IHJlc3VsdDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG9iamVjdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhc3NpZ25XaXRoO1xuIiwidmFyIGJhc2VDb3B5ID0gcmVxdWlyZSgnLi9iYXNlQ29weScpLFxuICAgIGtleXMgPSByZXF1aXJlKCcuLi9vYmplY3Qva2V5cycpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmFzc2lnbmAgd2l0aG91dCBzdXBwb3J0IGZvciBhcmd1bWVudCBqdWdnbGluZyxcbiAqIG11bHRpcGxlIHNvdXJjZXMsIGFuZCBgY3VzdG9taXplcmAgZnVuY3Rpb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBzb3VyY2Ugb2JqZWN0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gYmFzZUFzc2lnbihvYmplY3QsIHNvdXJjZSkge1xuICByZXR1cm4gc291cmNlID09IG51bGxcbiAgICA/IG9iamVjdFxuICAgIDogYmFzZUNvcHkoc291cmNlLCBrZXlzKHNvdXJjZSksIG9iamVjdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUFzc2lnbjtcbiIsIi8qKlxuICogQ29waWVzIHByb3BlcnRpZXMgb2YgYHNvdXJjZWAgdG8gYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbS5cbiAqIEBwYXJhbSB7QXJyYXl9IHByb3BzIFRoZSBwcm9wZXJ0eSBuYW1lcyB0byBjb3B5LlxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3Q9e31dIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIHRvLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gYmFzZUNvcHkoc291cmNlLCBwcm9wcywgb2JqZWN0KSB7XG4gIG9iamVjdCB8fCAob2JqZWN0ID0ge30pO1xuXG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGtleSA9IHByb3BzW2luZGV4XTtcbiAgICBvYmplY3Rba2V5XSA9IHNvdXJjZVtrZXldO1xuICB9XG4gIHJldHVybiBvYmplY3Q7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUNvcHk7XG4iLCIvKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnByb3BlcnR5YCB3aXRob3V0IHN1cHBvcnQgZm9yIGRlZXAgcGF0aHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VQcm9wZXJ0eShrZXkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VQcm9wZXJ0eTtcbiIsInZhciBpZGVudGl0eSA9IHJlcXVpcmUoJy4uL3V0aWxpdHkvaWRlbnRpdHknKTtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VDYWxsYmFja2Agd2hpY2ggb25seSBzdXBwb3J0cyBgdGhpc2AgYmluZGluZ1xuICogYW5kIHNwZWNpZnlpbmcgdGhlIG51bWJlciBvZiBhcmd1bWVudHMgdG8gcHJvdmlkZSB0byBgZnVuY2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGJpbmQuXG4gKiBAcGFyYW0geyp9IHRoaXNBcmcgVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBmdW5jYC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbYXJnQ291bnRdIFRoZSBudW1iZXIgb2YgYXJndW1lbnRzIHRvIHByb3ZpZGUgdG8gYGZ1bmNgLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBjYWxsYmFjay5cbiAqL1xuZnVuY3Rpb24gYmluZENhbGxiYWNrKGZ1bmMsIHRoaXNBcmcsIGFyZ0NvdW50KSB7XG4gIGlmICh0eXBlb2YgZnVuYyAhPSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGlkZW50aXR5O1xuICB9XG4gIGlmICh0aGlzQXJnID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gZnVuYztcbiAgfVxuICBzd2l0Y2ggKGFyZ0NvdW50KSB7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgdmFsdWUpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24odmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKSB7XG4gICAgICByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbik7XG4gICAgfTtcbiAgICBjYXNlIDQ6IHJldHVybiBmdW5jdGlvbihhY2N1bXVsYXRvciwgdmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKSB7XG4gICAgICByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFjY3VtdWxhdG9yLCB2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pO1xuICAgIH07XG4gICAgY2FzZSA1OiByZXR1cm4gZnVuY3Rpb24odmFsdWUsIG90aGVyLCBrZXksIG9iamVjdCwgc291cmNlKSB7XG4gICAgICByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIHZhbHVlLCBvdGhlciwga2V5LCBvYmplY3QsIHNvdXJjZSk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpc0FyZywgYXJndW1lbnRzKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiaW5kQ2FsbGJhY2s7XG4iLCJ2YXIgYmluZENhbGxiYWNrID0gcmVxdWlyZSgnLi9iaW5kQ2FsbGJhY2snKSxcbiAgICBpc0l0ZXJhdGVlQ2FsbCA9IHJlcXVpcmUoJy4vaXNJdGVyYXRlZUNhbGwnKSxcbiAgICByZXN0UGFyYW0gPSByZXF1aXJlKCcuLi9mdW5jdGlvbi9yZXN0UGFyYW0nKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgYF8uYXNzaWduYCwgYF8uZGVmYXVsdHNgLCBvciBgXy5tZXJnZWAgZnVuY3Rpb24uXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGFzc2lnbmVyIFRoZSBmdW5jdGlvbiB0byBhc3NpZ24gdmFsdWVzLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYXNzaWduZXIgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUFzc2lnbmVyKGFzc2lnbmVyKSB7XG4gIHJldHVybiByZXN0UGFyYW0oZnVuY3Rpb24ob2JqZWN0LCBzb3VyY2VzKSB7XG4gICAgdmFyIGluZGV4ID0gLTEsXG4gICAgICAgIGxlbmd0aCA9IG9iamVjdCA9PSBudWxsID8gMCA6IHNvdXJjZXMubGVuZ3RoLFxuICAgICAgICBjdXN0b21pemVyID0gbGVuZ3RoID4gMiA/IHNvdXJjZXNbbGVuZ3RoIC0gMl0gOiB1bmRlZmluZWQsXG4gICAgICAgIGd1YXJkID0gbGVuZ3RoID4gMiA/IHNvdXJjZXNbMl0gOiB1bmRlZmluZWQsXG4gICAgICAgIHRoaXNBcmcgPSBsZW5ndGggPiAxID8gc291cmNlc1tsZW5ndGggLSAxXSA6IHVuZGVmaW5lZDtcblxuICAgIGlmICh0eXBlb2YgY3VzdG9taXplciA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjdXN0b21pemVyID0gYmluZENhbGxiYWNrKGN1c3RvbWl6ZXIsIHRoaXNBcmcsIDUpO1xuICAgICAgbGVuZ3RoIC09IDI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN1c3RvbWl6ZXIgPSB0eXBlb2YgdGhpc0FyZyA9PSAnZnVuY3Rpb24nID8gdGhpc0FyZyA6IHVuZGVmaW5lZDtcbiAgICAgIGxlbmd0aCAtPSAoY3VzdG9taXplciA/IDEgOiAwKTtcbiAgICB9XG4gICAgaWYgKGd1YXJkICYmIGlzSXRlcmF0ZWVDYWxsKHNvdXJjZXNbMF0sIHNvdXJjZXNbMV0sIGd1YXJkKSkge1xuICAgICAgY3VzdG9taXplciA9IGxlbmd0aCA8IDMgPyB1bmRlZmluZWQgOiBjdXN0b21pemVyO1xuICAgICAgbGVuZ3RoID0gMTtcbiAgICB9XG4gICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIHZhciBzb3VyY2UgPSBzb3VyY2VzW2luZGV4XTtcbiAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgYXNzaWduZXIob2JqZWN0LCBzb3VyY2UsIGN1c3RvbWl6ZXIpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqZWN0O1xuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVBc3NpZ25lcjtcbiIsInZhciBiYXNlUHJvcGVydHkgPSByZXF1aXJlKCcuL2Jhc2VQcm9wZXJ0eScpO1xuXG4vKipcbiAqIEdldHMgdGhlIFwibGVuZ3RoXCIgcHJvcGVydHkgdmFsdWUgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gaXMgdXNlZCB0byBhdm9pZCBhIFtKSVQgYnVnXShodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTQyNzkyKVxuICogdGhhdCBhZmZlY3RzIFNhZmFyaSBvbiBhdCBsZWFzdCBpT1MgOC4xLTguMyBBUk02NC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIFwibGVuZ3RoXCIgdmFsdWUuXG4gKi9cbnZhciBnZXRMZW5ndGggPSBiYXNlUHJvcGVydHkoJ2xlbmd0aCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdldExlbmd0aDtcbiIsInZhciBpc05hdGl2ZSA9IHJlcXVpcmUoJy4uL2xhbmcvaXNOYXRpdmUnKTtcblxuLyoqXG4gKiBHZXRzIHRoZSBuYXRpdmUgZnVuY3Rpb24gYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgbWV0aG9kIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBmdW5jdGlvbiBpZiBpdCdzIG5hdGl2ZSwgZWxzZSBgdW5kZWZpbmVkYC5cbiAqL1xuZnVuY3Rpb24gZ2V0TmF0aXZlKG9iamVjdCwga2V5KSB7XG4gIHZhciB2YWx1ZSA9IG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG4gIHJldHVybiBpc05hdGl2ZSh2YWx1ZSkgPyB2YWx1ZSA6IHVuZGVmaW5lZDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXROYXRpdmU7XG4iLCJ2YXIgZ2V0TGVuZ3RoID0gcmVxdWlyZSgnLi9nZXRMZW5ndGgnKSxcbiAgICBpc0xlbmd0aCA9IHJlcXVpcmUoJy4vaXNMZW5ndGgnKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNBcnJheUxpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgaXNMZW5ndGgoZ2V0TGVuZ3RoKHZhbHVlKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNBcnJheUxpa2U7XG4iLCIvKiogVXNlZCB0byBkZXRlY3QgdW5zaWduZWQgaW50ZWdlciB2YWx1ZXMuICovXG52YXIgcmVJc1VpbnQgPSAvXlxcZCskLztcblxuLyoqXG4gKiBVc2VkIGFzIHRoZSBbbWF4aW11bSBsZW5ndGhdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW51bWJlci5tYXhfc2FmZV9pbnRlZ2VyKVxuICogb2YgYW4gYXJyYXktbGlrZSB2YWx1ZS5cbiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSA5MDA3MTk5MjU0NzQwOTkxO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBpbmRleC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aD1NQVhfU0FGRV9JTlRFR0VSXSBUaGUgdXBwZXIgYm91bmRzIG9mIGEgdmFsaWQgaW5kZXguXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGluZGV4LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSW5kZXgodmFsdWUsIGxlbmd0aCkge1xuICB2YWx1ZSA9ICh0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgfHwgcmVJc1VpbnQudGVzdCh2YWx1ZSkpID8gK3ZhbHVlIDogLTE7XG4gIGxlbmd0aCA9IGxlbmd0aCA9PSBudWxsID8gTUFYX1NBRkVfSU5URUdFUiA6IGxlbmd0aDtcbiAgcmV0dXJuIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPCBsZW5ndGg7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNJbmRleDtcbiIsInZhciBpc0FycmF5TGlrZSA9IHJlcXVpcmUoJy4vaXNBcnJheUxpa2UnKSxcbiAgICBpc0luZGV4ID0gcmVxdWlyZSgnLi9pc0luZGV4JyksXG4gICAgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9sYW5nL2lzT2JqZWN0Jyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIHRoZSBwcm92aWRlZCBhcmd1bWVudHMgYXJlIGZyb20gYW4gaXRlcmF0ZWUgY2FsbC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIHZhbHVlIGFyZ3VtZW50LlxuICogQHBhcmFtIHsqfSBpbmRleCBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIGluZGV4IG9yIGtleSBhcmd1bWVudC5cbiAqIEBwYXJhbSB7Kn0gb2JqZWN0IFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgb2JqZWN0IGFyZ3VtZW50LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBhcmd1bWVudHMgYXJlIGZyb20gYW4gaXRlcmF0ZWUgY2FsbCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0l0ZXJhdGVlQ2FsbCh2YWx1ZSwgaW5kZXgsIG9iamVjdCkge1xuICBpZiAoIWlzT2JqZWN0KG9iamVjdCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHR5cGUgPSB0eXBlb2YgaW5kZXg7XG4gIGlmICh0eXBlID09ICdudW1iZXInXG4gICAgICA/IChpc0FycmF5TGlrZShvYmplY3QpICYmIGlzSW5kZXgoaW5kZXgsIG9iamVjdC5sZW5ndGgpKVxuICAgICAgOiAodHlwZSA9PSAnc3RyaW5nJyAmJiBpbmRleCBpbiBvYmplY3QpKSB7XG4gICAgdmFyIG90aGVyID0gb2JqZWN0W2luZGV4XTtcbiAgICByZXR1cm4gdmFsdWUgPT09IHZhbHVlID8gKHZhbHVlID09PSBvdGhlcikgOiAob3RoZXIgIT09IG90aGVyKTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNJdGVyYXRlZUNhbGw7XG4iLCIvKipcbiAqIFVzZWQgYXMgdGhlIFttYXhpbXVtIGxlbmd0aF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtbnVtYmVyLm1heF9zYWZlX2ludGVnZXIpXG4gKiBvZiBhbiBhcnJheS1saWtlIHZhbHVlLlxuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBpcyBiYXNlZCBvbiBbYFRvTGVuZ3RoYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtdG9sZW5ndGgpLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgbGVuZ3RoLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzTGVuZ3RoKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiYgdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzTGVuZ3RoO1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzT2JqZWN0TGlrZTtcbiIsInZhciBpc0FyZ3VtZW50cyA9IHJlcXVpcmUoJy4uL2xhbmcvaXNBcmd1bWVudHMnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi4vbGFuZy9pc0FycmF5JyksXG4gICAgaXNJbmRleCA9IHJlcXVpcmUoJy4vaXNJbmRleCcpLFxuICAgIGlzTGVuZ3RoID0gcmVxdWlyZSgnLi9pc0xlbmd0aCcpLFxuICAgIGtleXNJbiA9IHJlcXVpcmUoJy4uL29iamVjdC9rZXlzSW4nKTtcblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogQSBmYWxsYmFjayBpbXBsZW1lbnRhdGlvbiBvZiBgT2JqZWN0LmtleXNgIHdoaWNoIGNyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlXG4gKiBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gc2hpbUtleXMob2JqZWN0KSB7XG4gIHZhciBwcm9wcyA9IGtleXNJbihvYmplY3QpLFxuICAgICAgcHJvcHNMZW5ndGggPSBwcm9wcy5sZW5ndGgsXG4gICAgICBsZW5ndGggPSBwcm9wc0xlbmd0aCAmJiBvYmplY3QubGVuZ3RoO1xuXG4gIHZhciBhbGxvd0luZGV4ZXMgPSAhIWxlbmd0aCAmJiBpc0xlbmd0aChsZW5ndGgpICYmXG4gICAgKGlzQXJyYXkob2JqZWN0KSB8fCBpc0FyZ3VtZW50cyhvYmplY3QpKTtcblxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IFtdO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgcHJvcHNMZW5ndGgpIHtcbiAgICB2YXIga2V5ID0gcHJvcHNbaW5kZXhdO1xuICAgIGlmICgoYWxsb3dJbmRleGVzICYmIGlzSW5kZXgoa2V5LCBsZW5ndGgpKSB8fCBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaGltS2V5cztcbiIsInZhciBpc0FycmF5TGlrZSA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2lzQXJyYXlMaWtlJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKiogTmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlID0gb2JqZWN0UHJvdG8ucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgYXJndW1lbnRzYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhbMSwgMiwgM10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcmd1bWVudHModmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgaXNBcnJheUxpa2UodmFsdWUpICYmXG4gICAgaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgJ2NhbGxlZScpICYmICFwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHZhbHVlLCAnY2FsbGVlJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNBcmd1bWVudHM7XG4iLCJ2YXIgZ2V0TmF0aXZlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvZ2V0TmF0aXZlJyksXG4gICAgaXNMZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc0xlbmd0aCcpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJyYXlUYWcgPSAnW29iamVjdCBBcnJheV0nO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqVG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyogTmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVJc0FycmF5ID0gZ2V0TmF0aXZlKEFycmF5LCAnaXNBcnJheScpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYW4gYEFycmF5YCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheShmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0FycmF5ID0gbmF0aXZlSXNBcnJheSB8fCBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBpc0xlbmd0aCh2YWx1ZS5sZW5ndGgpICYmIG9ialRvU3RyaW5nLmNhbGwodmFsdWUpID09IGFycmF5VGFnO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBpc0FycmF5O1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pc09iamVjdCcpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmpUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgRnVuY3Rpb25gIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0Z1bmN0aW9uKF8pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNGdW5jdGlvbigvYWJjLyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIC8vIFRoZSB1c2Ugb2YgYE9iamVjdCN0b1N0cmluZ2AgYXZvaWRzIGlzc3VlcyB3aXRoIHRoZSBgdHlwZW9mYCBvcGVyYXRvclxuICAvLyBpbiBvbGRlciB2ZXJzaW9ucyBvZiBDaHJvbWUgYW5kIFNhZmFyaSB3aGljaCByZXR1cm4gJ2Z1bmN0aW9uJyBmb3IgcmVnZXhlc1xuICAvLyBhbmQgU2FmYXJpIDggd2hpY2ggcmV0dXJucyAnb2JqZWN0JyBmb3IgdHlwZWQgYXJyYXkgY29uc3RydWN0b3JzLlxuICByZXR1cm4gaXNPYmplY3QodmFsdWUpICYmIG9ialRvU3RyaW5nLmNhbGwodmFsdWUpID09IGZ1bmNUYWc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNGdW5jdGlvbjtcbiIsInZhciBpc0Z1bmN0aW9uID0gcmVxdWlyZSgnLi9pc0Z1bmN0aW9uJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBob3N0IGNvbnN0cnVjdG9ycyAoU2FmYXJpID4gNSkuICovXG52YXIgcmVJc0hvc3RDdG9yID0gL15cXFtvYmplY3QgLis/Q29uc3RydWN0b3JcXF0kLztcblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmblRvU3RyaW5nID0gRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaWYgYSBtZXRob2QgaXMgbmF0aXZlLiAqL1xudmFyIHJlSXNOYXRpdmUgPSBSZWdFeHAoJ14nICtcbiAgZm5Ub1N0cmluZy5jYWxsKGhhc093blByb3BlcnR5KS5yZXBsYWNlKC9bXFxcXF4kLiorPygpW1xcXXt9fF0vZywgJ1xcXFwkJicpXG4gIC5yZXBsYWNlKC9oYXNPd25Qcm9wZXJ0eXwoZnVuY3Rpb24pLio/KD89XFxcXFxcKCl8IGZvciAuKz8oPz1cXFxcXFxdKS9nLCAnJDEuKj8nKSArICckJ1xuKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24sIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc05hdGl2ZShBcnJheS5wcm90b3R5cGUucHVzaCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc05hdGl2ZShfKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTmF0aXZlKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChpc0Z1bmN0aW9uKHZhbHVlKSkge1xuICAgIHJldHVybiByZUlzTmF0aXZlLnRlc3QoZm5Ub1N0cmluZy5jYWxsKHZhbHVlKSk7XG4gIH1cbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgcmVJc0hvc3RDdG9yLnRlc3QodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzTmF0aXZlO1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGUgW2xhbmd1YWdlIHR5cGVdKGh0dHBzOi8vZXM1LmdpdGh1Yi5pby8jeDgpIG9mIGBPYmplY3RgLlxuICogKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdCgxKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIC8vIEF2b2lkIGEgVjggSklUIGJ1ZyBpbiBDaHJvbWUgMTktMjAuXG4gIC8vIFNlZSBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MjI5MSBmb3IgbW9yZSBkZXRhaWxzLlxuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICEhdmFsdWUgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc09iamVjdDtcbiIsInZhciBhc3NpZ25XaXRoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvYXNzaWduV2l0aCcpLFxuICAgIGJhc2VBc3NpZ24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9iYXNlQXNzaWduJyksXG4gICAgY3JlYXRlQXNzaWduZXIgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9jcmVhdGVBc3NpZ25lcicpO1xuXG4vKipcbiAqIEFzc2lnbnMgb3duIGVudW1lcmFibGUgcHJvcGVydGllcyBvZiBzb3VyY2Ugb2JqZWN0KHMpIHRvIHRoZSBkZXN0aW5hdGlvblxuICogb2JqZWN0LiBTdWJzZXF1ZW50IHNvdXJjZXMgb3ZlcndyaXRlIHByb3BlcnR5IGFzc2lnbm1lbnRzIG9mIHByZXZpb3VzIHNvdXJjZXMuXG4gKiBJZiBgY3VzdG9taXplcmAgaXMgcHJvdmlkZWQgaXQncyBpbnZva2VkIHRvIHByb2R1Y2UgdGhlIGFzc2lnbmVkIHZhbHVlcy5cbiAqIFRoZSBgY3VzdG9taXplcmAgaXMgYm91bmQgdG8gYHRoaXNBcmdgIGFuZCBpbnZva2VkIHdpdGggZml2ZSBhcmd1bWVudHM6XG4gKiAob2JqZWN0VmFsdWUsIHNvdXJjZVZhbHVlLCBrZXksIG9iamVjdCwgc291cmNlKS5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgbXV0YXRlcyBgb2JqZWN0YCBhbmQgaXMgYmFzZWQgb25cbiAqIFtgT2JqZWN0LmFzc2lnbmBdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW9iamVjdC5hc3NpZ24pLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAYWxpYXMgZXh0ZW5kXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0gey4uLk9iamVjdH0gW3NvdXJjZXNdIFRoZSBzb3VyY2Ugb2JqZWN0cy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGFzc2lnbmVkIHZhbHVlcy5cbiAqIEBwYXJhbSB7Kn0gW3RoaXNBcmddIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgY3VzdG9taXplcmAuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmFzc2lnbih7ICd1c2VyJzogJ2Jhcm5leScgfSwgeyAnYWdlJzogNDAgfSwgeyAndXNlcic6ICdmcmVkJyB9KTtcbiAqIC8vID0+IHsgJ3VzZXInOiAnZnJlZCcsICdhZ2UnOiA0MCB9XG4gKlxuICogLy8gdXNpbmcgYSBjdXN0b21pemVyIGNhbGxiYWNrXG4gKiB2YXIgZGVmYXVsdHMgPSBfLnBhcnRpYWxSaWdodChfLmFzc2lnbiwgZnVuY3Rpb24odmFsdWUsIG90aGVyKSB7XG4gKiAgIHJldHVybiBfLmlzVW5kZWZpbmVkKHZhbHVlKSA/IG90aGVyIDogdmFsdWU7XG4gKiB9KTtcbiAqXG4gKiBkZWZhdWx0cyh7ICd1c2VyJzogJ2Jhcm5leScgfSwgeyAnYWdlJzogMzYgfSwgeyAndXNlcic6ICdmcmVkJyB9KTtcbiAqIC8vID0+IHsgJ3VzZXInOiAnYmFybmV5JywgJ2FnZSc6IDM2IH1cbiAqL1xudmFyIGFzc2lnbiA9IGNyZWF0ZUFzc2lnbmVyKGZ1bmN0aW9uKG9iamVjdCwgc291cmNlLCBjdXN0b21pemVyKSB7XG4gIHJldHVybiBjdXN0b21pemVyXG4gICAgPyBhc3NpZ25XaXRoKG9iamVjdCwgc291cmNlLCBjdXN0b21pemVyKVxuICAgIDogYmFzZUFzc2lnbihvYmplY3QsIHNvdXJjZSk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBhc3NpZ247XG4iLCJ2YXIgZ2V0TmF0aXZlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvZ2V0TmF0aXZlJyksXG4gICAgaXNBcnJheUxpa2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc0FycmF5TGlrZScpLFxuICAgIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vbGFuZy9pc09iamVjdCcpLFxuICAgIHNoaW1LZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvc2hpbUtleXMnKTtcblxuLyogTmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVLZXlzID0gZ2V0TmF0aXZlKE9iamVjdCwgJ2tleXMnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogTm9uLW9iamVjdCB2YWx1ZXMgYXJlIGNvZXJjZWQgdG8gb2JqZWN0cy4gU2VlIHRoZVxuICogW0VTIHNwZWNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW9iamVjdC5rZXlzKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5rZXlzKG5ldyBGb28pO1xuICogLy8gPT4gWydhJywgJ2InXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICpcbiAqIF8ua2V5cygnaGknKTtcbiAqIC8vID0+IFsnMCcsICcxJ11cbiAqL1xudmFyIGtleXMgPSAhbmF0aXZlS2V5cyA/IHNoaW1LZXlzIDogZnVuY3Rpb24ob2JqZWN0KSB7XG4gIHZhciBDdG9yID0gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3QuY29uc3RydWN0b3I7XG4gIGlmICgodHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBDdG9yLnByb3RvdHlwZSA9PT0gb2JqZWN0KSB8fFxuICAgICAgKHR5cGVvZiBvYmplY3QgIT0gJ2Z1bmN0aW9uJyAmJiBpc0FycmF5TGlrZShvYmplY3QpKSkge1xuICAgIHJldHVybiBzaGltS2V5cyhvYmplY3QpO1xuICB9XG4gIHJldHVybiBpc09iamVjdChvYmplY3QpID8gbmF0aXZlS2V5cyhvYmplY3QpIDogW107XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGtleXM7XG4iLCJ2YXIgaXNBcmd1bWVudHMgPSByZXF1aXJlKCcuLi9sYW5nL2lzQXJndW1lbnRzJyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJy4uL2xhbmcvaXNBcnJheScpLFxuICAgIGlzSW5kZXggPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc0luZGV4JyksXG4gICAgaXNMZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc0xlbmd0aCcpLFxuICAgIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vbGFuZy9pc09iamVjdCcpO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gYW5kIGluaGVyaXRlZCBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLmtleXNJbihuZXcgRm9vKTtcbiAqIC8vID0+IFsnYScsICdiJywgJ2MnXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICovXG5mdW5jdGlvbiBrZXlzSW4ob2JqZWN0KSB7XG4gIGlmIChvYmplY3QgPT0gbnVsbCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuICBpZiAoIWlzT2JqZWN0KG9iamVjdCkpIHtcbiAgICBvYmplY3QgPSBPYmplY3Qob2JqZWN0KTtcbiAgfVxuICB2YXIgbGVuZ3RoID0gb2JqZWN0Lmxlbmd0aDtcbiAgbGVuZ3RoID0gKGxlbmd0aCAmJiBpc0xlbmd0aChsZW5ndGgpICYmXG4gICAgKGlzQXJyYXkob2JqZWN0KSB8fCBpc0FyZ3VtZW50cyhvYmplY3QpKSAmJiBsZW5ndGgpIHx8IDA7XG5cbiAgdmFyIEN0b3IgPSBvYmplY3QuY29uc3RydWN0b3IsXG4gICAgICBpbmRleCA9IC0xLFxuICAgICAgaXNQcm90byA9IHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgQ3Rvci5wcm90b3R5cGUgPT09IG9iamVjdCxcbiAgICAgIHJlc3VsdCA9IEFycmF5KGxlbmd0aCksXG4gICAgICBza2lwSW5kZXhlcyA9IGxlbmd0aCA+IDA7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICByZXN1bHRbaW5kZXhdID0gKGluZGV4ICsgJycpO1xuICB9XG4gIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICBpZiAoIShza2lwSW5kZXhlcyAmJiBpc0luZGV4KGtleSwgbGVuZ3RoKSkgJiZcbiAgICAgICAgIShrZXkgPT0gJ2NvbnN0cnVjdG9yJyAmJiAoaXNQcm90byB8fCAhaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkpKSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBrZXlzSW47XG4iLCIvKipcbiAqIFRoaXMgbWV0aG9kIHJldHVybnMgdGhlIGZpcnN0IGFyZ3VtZW50IHByb3ZpZGVkIHRvIGl0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgVXRpbGl0eVxuICogQHBhcmFtIHsqfSB2YWx1ZSBBbnkgdmFsdWUuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyBgdmFsdWVgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAndXNlcic6ICdmcmVkJyB9O1xuICpcbiAqIF8uaWRlbnRpdHkob2JqZWN0KSA9PT0gb2JqZWN0O1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpZGVudGl0eSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaWRlbnRpdHk7XG4iLCIvKlxuZnJlZXplci1qcyB2MC4xMC4wXG5odHRwczovL2dpdGh1Yi5jb20vYXJxZXgvZnJlZXplclxuTUlUOiBodHRwczovL2dpdGh1Yi5jb20vYXJxZXgvZnJlZXplci9yYXcvbWFzdGVyL0xJQ0VOU0VcbiovXG4hZnVuY3Rpb24odCxlKXtcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKFtdLGUpOlwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzP21vZHVsZS5leHBvcnRzPWUoKTp0LkZyZWV6ZXI9ZSgpfSh0aGlzLGZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7dmFyIHQ9bmV3IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSxlPXtleHRlbmQ6ZnVuY3Rpb24odCxlKXtmb3IodmFyIG4gaW4gZSl0W25dPWVbbl07cmV0dXJuIHR9LGNyZWF0ZU5vbkVudW1lcmFibGU6ZnVuY3Rpb24odCxlKXt2YXIgbj17fTtmb3IodmFyIHIgaW4gdCluW3JdPXt2YWx1ZTp0W3JdfTtyZXR1cm4gT2JqZWN0LmNyZWF0ZShlfHx7fSxuKX0sZXJyb3I6ZnVuY3Rpb24odCl7dmFyIGU9bmV3IEVycm9yKHQpO2lmKGNvbnNvbGUpcmV0dXJuIGNvbnNvbGUuZXJyb3IoZSk7dGhyb3cgZX0sZWFjaDpmdW5jdGlvbih0LGUpe3ZhciBuLHIsaTtpZih0JiZ0LmNvbnN0cnVjdG9yPT1BcnJheSlmb3Iobj0wLHI9dC5sZW5ndGg7cj5uO24rKyllKHRbbl0sbik7ZWxzZSBmb3IoaT1PYmplY3Qua2V5cyh0KSxuPTAscj1pLmxlbmd0aDtyPm47bisrKWUodFtpW25dXSxpW25dKX0sYWRkTkU6ZnVuY3Rpb24odCxlKXtmb3IodmFyIG4gaW4gZSlPYmplY3QuZGVmaW5lUHJvcGVydHkodCxuLHtlbnVtZXJhYmxlOiExLGNvbmZpZ3VyYWJsZTohMCx3cml0YWJsZTohMCx2YWx1ZTplW25dfSl9LGNyZWF0ZU5FOmZ1bmN0aW9uKHQpe3ZhciBlPXt9O2Zvcih2YXIgbiBpbiB0KWVbbl09e3dyaXRhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMCxlbnVtZXJhYmxlOiExLHZhbHVlOnRbbl19O3JldHVybiBlfSxuZXh0VGljazpmdW5jdGlvbigpe2Z1bmN0aW9uIGUoKXtmb3IoO3I9aS5zaGlmdCgpOylyKCk7bz0hMX1mdW5jdGlvbiBuKHQpe2kucHVzaCh0KSxvfHwobz0hMCxmKCkpfXZhciByLGk9W10sbz0hMSxzPSEhdC5wb3N0TWVzc2FnZSYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIFdpbmRvdyYmdCBpbnN0YW5jZW9mIFdpbmRvdyxhPVwibmV4dHRpY2tcIixmPWZ1bmN0aW9uKCl7cmV0dXJuIHM/ZnVuY3Rpb24oKXt0LnBvc3RNZXNzYWdlKGEsXCIqXCIpfTpmdW5jdGlvbigpe3NldFRpbWVvdXQoZnVuY3Rpb24oKXtjKCl9LDApfX0oKSxjPWZ1bmN0aW9uKCl7cmV0dXJuIHM/ZnVuY3Rpb24obil7bi5zb3VyY2U9PT10JiZuLmRhdGE9PT1hJiYobi5zdG9wUHJvcGFnYXRpb24oKSxlKCkpfTplfSgpO3JldHVybiBzJiZ0LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsYywhMCksbi5yZW1vdmVMaXN0ZW5lcj1mdW5jdGlvbigpe3QucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIixjLCEwKX0sbn0oKSxmaW5kUGl2b3Q6ZnVuY3Rpb24odCl7aWYodCYmdC5fXyl7aWYodC5fXy5waXZvdClyZXR1cm4gdDtmb3IodmFyIGUsbj0wLHI9dC5fXy5wYXJlbnRzLGk9MDshbiYmaTxyLmxlbmd0aDspZT1yW2ldLGUuX18ucGl2b3QmJihuPWUpLGkrKztpZihuKXJldHVybiBuO2ZvcihpPTA7IW4mJmk8ci5sZW5ndGg7KW49dGhpcy5maW5kUGl2b3QocltpXSksaSsrO3JldHVybiBufX0saXNMZWFmOmZ1bmN0aW9uKHQpe3ZhciBlPXQmJnQuY29uc3RydWN0b3I7cmV0dXJuIWV8fGU9PVN0cmluZ3x8ZT09TnVtYmVyfHxlPT1Cb29sZWFufX0sbj17aW5pdDpmdW5jdGlvbih0KXt2YXIgbj17c2V0OmZ1bmN0aW9uKHQsbil7dmFyIHI9dCxpPXRoaXMuX18udHJhbnM7aWYoXCJvYmplY3RcIiE9dHlwZW9mIHQmJihyPXt9LHJbdF09biksIWkpe2Zvcih2YXIgbyBpbiByKWk9aXx8dGhpc1tvXSE9PXJbb107aWYoIWkpcmV0dXJuIGUuZmluZFBpdm90KHRoaXMpfHx0aGlzfXJldHVybiB0aGlzLl9fLnN0b3JlLm5vdGlmeShcIm1lcmdlXCIsdGhpcyxyKX0scmVzZXQ6ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMuX18uc3RvcmUubm90aWZ5KFwicmVwbGFjZVwiLHRoaXMsdCl9LGdldExpc3RlbmVyOmZ1bmN0aW9uKCl7cmV0dXJuIHQuY3JlYXRlTGlzdGVuZXIodGhpcyl9LHRvSlM6ZnVuY3Rpb24oKXt2YXIgdDtyZXR1cm4gdD10aGlzLmNvbnN0cnVjdG9yPT1BcnJheT9uZXcgQXJyYXkodGhpcy5sZW5ndGgpOnt9LGUuZWFjaCh0aGlzLGZ1bmN0aW9uKGUsbil7ZSYmZS5fXz90W25dPWUudG9KUygpOnRbbl09ZX0pLHR9LHRyYW5zYWN0OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX18uc3RvcmUubm90aWZ5KFwidHJhbnNhY3RcIix0aGlzKX0scnVuOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX18uc3RvcmUubm90aWZ5KFwicnVuXCIsdGhpcyl9LG5vdzpmdW5jdGlvbigpe3JldHVybiB0aGlzLl9fLnN0b3JlLm5vdGlmeShcIm5vd1wiLHRoaXMpfSxwaXZvdDpmdW5jdGlvbigpe3JldHVybiB0aGlzLl9fLnN0b3JlLm5vdGlmeShcInBpdm90XCIsdGhpcyl9fSxyPWUuZXh0ZW5kKHtwdXNoOmZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLmFwcGVuZChbdF0pfSxhcHBlbmQ6ZnVuY3Rpb24odCl7cmV0dXJuIHQmJnQubGVuZ3RoP3RoaXMuX18uc3RvcmUubm90aWZ5KFwic3BsaWNlXCIsdGhpcyxbdGhpcy5sZW5ndGgsMF0uY29uY2F0KHQpKTp0aGlzfSxwb3A6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5sZW5ndGg/dGhpcy5fXy5zdG9yZS5ub3RpZnkoXCJzcGxpY2VcIix0aGlzLFt0aGlzLmxlbmd0aC0xLDFdKTp0aGlzfSx1bnNoaWZ0OmZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLnByZXBlbmQoW3RdKX0scHJlcGVuZDpmdW5jdGlvbih0KXtyZXR1cm4gdCYmdC5sZW5ndGg/dGhpcy5fXy5zdG9yZS5ub3RpZnkoXCJzcGxpY2VcIix0aGlzLFswLDBdLmNvbmNhdCh0KSk6dGhpc30sc2hpZnQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5sZW5ndGg/dGhpcy5fXy5zdG9yZS5ub3RpZnkoXCJzcGxpY2VcIix0aGlzLFswLDFdKTp0aGlzfSxzcGxpY2U6ZnVuY3Rpb24odCxlLG4pe3JldHVybiB0aGlzLl9fLnN0b3JlLm5vdGlmeShcInNwbGljZVwiLHRoaXMsYXJndW1lbnRzKX19LG4pLGk9T2JqZWN0LmNyZWF0ZShBcnJheS5wcm90b3R5cGUsZS5jcmVhdGVORShyKSksbz1lLmNyZWF0ZU5FKGUuZXh0ZW5kKHtyZW1vdmU6ZnVuY3Rpb24odCl7dmFyIGU9W10sbj10O3QuY29uc3RydWN0b3IhPUFycmF5JiYobj1bdF0pO2Zvcih2YXIgcj0wLGk9bi5sZW5ndGg7aT5yO3IrKyl0aGlzLmhhc093blByb3BlcnR5KG5bcl0pJiZlLnB1c2gobltyXSk7cmV0dXJuIGUubGVuZ3RoP3RoaXMuX18uc3RvcmUubm90aWZ5KFwicmVtb3ZlXCIsdGhpcyxlKTp0aGlzfX0sbikpLHM9T2JqZWN0LmNyZWF0ZShPYmplY3QucHJvdG90eXBlLG8pLGE9ZnVuY3Rpb24oKXtyZXR1cm5bXS5fX3Byb3RvX18/ZnVuY3Rpb24odCl7dmFyIGU9bmV3IEFycmF5KHQpO3JldHVybiBlLl9fcHJvdG9fXz1pLGV9OmZ1bmN0aW9uKHQpe3ZhciBlPW5ldyBBcnJheSh0KTtmb3IodmFyIG4gaW4gcillW25dPXJbbl07cmV0dXJuIGV9fSgpO3RoaXMuY2xvbmU9ZnVuY3Rpb24odCl7dmFyIGU9dC5jb25zdHJ1Y3RvcjtyZXR1cm4gZT09QXJyYXk/YSh0Lmxlbmd0aCk6ZT09PU9iamVjdD9PYmplY3QuY3JlYXRlKHMpOihjb25zb2xlLmxvZyhcImluc3RhbmNlXCIpLE9iamVjdC5jcmVhdGUoZS5wcm90b3R5cGUsbykpfX19LHI9XCJiZWZvcmVBbGxcIixpPVwiYWZ0ZXJBbGxcIixvPVtyLGldLHM9e29uOmZ1bmN0aW9uKHQsZSxuKXt2YXIgcj10aGlzLl9ldmVudHNbdF18fFtdO3JldHVybiByLnB1c2goe2NhbGxiYWNrOmUsb25jZTpufSksdGhpcy5fZXZlbnRzW3RdPXIsdGhpc30sb25jZTpmdW5jdGlvbih0LGUpe3JldHVybiB0aGlzLm9uKHQsZSwhMCl9LG9mZjpmdW5jdGlvbih0LGUpe2lmKFwidW5kZWZpbmVkXCI9PXR5cGVvZiB0KXRoaXMuX2V2ZW50cz17fTtlbHNlIGlmKFwidW5kZWZpbmVkXCI9PXR5cGVvZiBlKXRoaXMuX2V2ZW50c1t0XT1bXTtlbHNle3ZhciBuLHI9dGhpcy5fZXZlbnRzW3RdfHxbXTtmb3Iobj1yLmxlbmd0aC0xO24+PTA7bi0tKXJbbl0uY2FsbGJhY2s9PT1lJiZyLnNwbGljZShuLDEpfXJldHVybiB0aGlzfSx0cmlnZ2VyOmZ1bmN0aW9uKHQpe3ZhciBlLG4scz1bXS5zbGljZS5jYWxsKGFyZ3VtZW50cywxKSxhPXRoaXMuX2V2ZW50c1t0XXx8W10sZj1bXSxjPS0xIT1vLmluZGV4T2YodCk7Zm9yKGN8fHRoaXMudHJpZ2dlci5hcHBseSh0aGlzLFtyLHRdLmNvbmNhdChzKSksZT0wO2U8YS5sZW5ndGg7ZSsrKW49YVtlXSxuLmNhbGxiYWNrP24uY2FsbGJhY2suYXBwbHkodGhpcyxzKTpuLm9uY2U9ITAsbi5vbmNlJiZmLnB1c2goZSk7Zm9yKGU9Zi5sZW5ndGgtMTtlPj0wO2UtLSlhLnNwbGljZShmW2VdLDEpO3JldHVybiBjfHx0aGlzLnRyaWdnZXIuYXBwbHkodGhpcyxbaSx0XS5jb25jYXQocykpLHRoaXN9fSxhPWUuY3JlYXRlTm9uRW51bWVyYWJsZShzKSxmPXtmcmVlemU6ZnVuY3Rpb24odCxyKXtpZih0JiZ0Ll9fKXJldHVybiB0O3ZhciBpPXRoaXMsbz1uLmNsb25lKHQpO3JldHVybiBlLmFkZE5FKG8se19fOntsaXN0ZW5lcjohMSxwYXJlbnRzOltdLHN0b3JlOnJ9fSksZS5lYWNoKHQsZnVuY3Rpb24odCxuKXtlLmlzTGVhZih0KXx8KHQ9aS5mcmVlemUodCxyKSksdCYmdC5fXyYmaS5hZGRQYXJlbnQodCxvKSxvW25dPXR9KSxyLmZyZWV6ZUZuKG8pLG99LG1lcmdlOmZ1bmN0aW9uKHQsbil7dmFyIHI9dC5fXyxpPXIudHJhbnMsbj1lLmV4dGVuZCh7fSxuKTtpZihpKXtmb3IodmFyIG8gaW4gbilpW29dPW5bb107cmV0dXJuIHR9dmFyIHMsYSxmLGM9dGhpcyx1PXRoaXMuY29weU1ldGEodCksaD1yLnN0b3JlO2UuZWFjaCh0LGZ1bmN0aW9uKHIsaSl7cmV0dXJuIGY9ciYmci5fXyxmJiZjLnJlbW92ZVBhcmVudChyLHQpLChzPW5baV0pPyhlLmlzTGVhZihzKXx8KHM9Yy5mcmVlemUocyxoKSkscyYmcy5fXyYmYy5hZGRQYXJlbnQocyx1KSxkZWxldGUgbltpXSx2b2lkKHVbaV09cykpOihmJiZjLmFkZFBhcmVudChyLHUpLHVbaV09cil9KTtmb3IoYSBpbiBuKXM9blthXSxlLmlzTGVhZihzKXx8KHM9Yy5mcmVlemUocyxoKSkscyYmcy5fXyYmYy5hZGRQYXJlbnQocyx1KSx1W2FdPXM7cmV0dXJuIHIuc3RvcmUuZnJlZXplRm4odSksdGhpcy5yZWZyZXNoUGFyZW50cyh0LHUpLHV9LHJlcGxhY2U6ZnVuY3Rpb24odCxuKXt2YXIgcj10aGlzLGk9dC5fXyxvPW47cmV0dXJuIGUuaXNMZWFmKG4pfHwobz1yLmZyZWV6ZShuLGkuc3RvcmUpLG8uX18ucGFyZW50cz1pLnBhcmVudHMsby5fXy51cGRhdGVSb290PWkudXBkYXRlUm9vdCxpLmxpc3RlbmVyJiYoby5fXy5saXN0ZW5lcj1pLmxpc3RlbmVyKSksbyYmdGhpcy5maXhDaGlsZHJlbihvLHQpLHRoaXMucmVmcmVzaFBhcmVudHModCxvKSxvfSxyZW1vdmU6ZnVuY3Rpb24odCxuKXt2YXIgcj10Ll9fLnRyYW5zO2lmKHIpe2Zvcih2YXIgaT1uLmxlbmd0aC0xO2k+PTA7aS0tKWRlbGV0ZSByW25baV1dO3JldHVybiB0fXZhciBvLHM9dGhpcyxhPXRoaXMuY29weU1ldGEodCk7cmV0dXJuIGUuZWFjaCh0LGZ1bmN0aW9uKGUscil7bz1lJiZlLl9fLG8mJnMucmVtb3ZlUGFyZW50KGUsdCksLTE9PW4uaW5kZXhPZihyKSYmKG8mJnMuYWRkUGFyZW50KGUsYSksYVtyXT1lKX0pLHQuX18uc3RvcmUuZnJlZXplRm4oYSksdGhpcy5yZWZyZXNoUGFyZW50cyh0LGEpLGF9LHNwbGljZTpmdW5jdGlvbih0LG4pe3ZhciByPXQuX18saT1yLnRyYW5zO2lmKGkpcmV0dXJuIGkuc3BsaWNlLmFwcGx5KGksbiksdDt2YXIgbyxzPXRoaXMsYT10aGlzLmNvcHlNZXRhKHQpLGY9blswXSxjPWYrblsxXTtpZihlLmVhY2godCxmdW5jdGlvbihlLG4pe2UmJmUuX18mJihzLnJlbW92ZVBhcmVudChlLHQpLChmPm58fG4+PWMpJiZzLmFkZFBhcmVudChlLGEpKSxhW25dPWV9KSxuLmxlbmd0aD4xKWZvcih2YXIgdT1uLmxlbmd0aC0xO3U+PTI7dS0tKW89blt1XSxlLmlzTGVhZihvKXx8KG89dGhpcy5mcmVlemUobyxyLnN0b3JlKSksbyYmby5fXyYmdGhpcy5hZGRQYXJlbnQobyxhKSxuW3VdPW87cmV0dXJuIEFycmF5LnByb3RvdHlwZS5zcGxpY2UuYXBwbHkoYSxuKSxyLnN0b3JlLmZyZWV6ZUZuKGEpLHRoaXMucmVmcmVzaFBhcmVudHModCxhKSxhfSx0cmFuc2FjdDpmdW5jdGlvbih0KXt2YXIgbixyPXRoaXMsaT10Ll9fLnRyYW5zO3JldHVybiBpP2k6KG49dC5jb25zdHJ1Y3Rvcj09QXJyYXk/W106e30sZS5lYWNoKHQsZnVuY3Rpb24odCxlKXtuW2VdPXR9KSx0Ll9fLnRyYW5zPW4sZS5uZXh0VGljayhmdW5jdGlvbigpe3QuX18udHJhbnMmJnIucnVuKHQpfSksbil9LHJ1bjpmdW5jdGlvbih0KXt2YXIgbj10aGlzLHI9dC5fXy50cmFucztpZighcilyZXR1cm4gdDtlLmVhY2gocixmdW5jdGlvbihlLHIpe2UmJmUuX18mJm4ucmVtb3ZlUGFyZW50KGUsdCl9KSxkZWxldGUgdC5fXy50cmFuczt2YXIgaT10aGlzLnJlcGxhY2UodCxyKTtyZXR1cm4gaX0scGl2b3Q6ZnVuY3Rpb24odCl7cmV0dXJuIHQuX18ucGl2b3Q9MSx0aGlzLnVucGl2b3QodCksdH0sdW5waXZvdDpmdW5jdGlvbih0KXtlLm5leHRUaWNrKGZ1bmN0aW9uKCl7dC5fXy5waXZvdD0wfSl9LHJlZnJlc2g6ZnVuY3Rpb24odCxuLHIpe3ZhciBpPXRoaXMsbz10Ll9fLnRyYW5zLHM9MDtpZihvKXJldHVybiBlLmVhY2gobyxmdW5jdGlvbihlLGEpe3N8fGU9PT1uJiYob1thXT1yLHM9MSxyJiZyLl9fJiZpLmFkZFBhcmVudChyLHQpKX0pLHQ7dmFyIGEsZj10aGlzLmNvcHlNZXRhKHQpO2UuZWFjaCh0LGZ1bmN0aW9uKGUsbyl7ZT09PW4mJihlPXIpLGUmJihhPWUuX18pJiYoaS5yZW1vdmVQYXJlbnQoZSx0KSxpLmFkZFBhcmVudChlLGYpKSxmW29dPWV9KSx0Ll9fLnN0b3JlLmZyZWV6ZUZuKGYpLHRoaXMucmVmcmVzaFBhcmVudHModCxmKX0sZml4Q2hpbGRyZW46ZnVuY3Rpb24odCxuKXt2YXIgcj10aGlzO2UuZWFjaCh0LGZ1bmN0aW9uKGUpe2lmKGUmJmUuX18pe2lmKC0xIT1lLl9fLnBhcmVudHMuaW5kZXhPZih0KSlyZXR1cm4gci5maXhDaGlsZHJlbihlKTtpZigxPT1lLl9fLnBhcmVudHMubGVuZ3RoKXJldHVybiBlLl9fLnBhcmVudHM9W3RdO24mJnIucmVtb3ZlUGFyZW50KGUsbiksci5hZGRQYXJlbnQoZSx0KX19KX0sY29weU1ldGE6ZnVuY3Rpb24odCl7dmFyIHI9bi5jbG9uZSh0KSxpPXQuX187cmV0dXJuIGUuYWRkTkUocix7X186e3N0b3JlOmkuc3RvcmUsdXBkYXRlUm9vdDppLnVwZGF0ZVJvb3QsbGlzdGVuZXI6aS5saXN0ZW5lcixwYXJlbnRzOmkucGFyZW50cy5zbGljZSgwKSx0cmFuczppLnRyYW5zLHBpdm90OmkucGl2b3R9fSksaS5waXZvdCYmdGhpcy51bnBpdm90KHIpLHJ9LHJlZnJlc2hQYXJlbnRzOmZ1bmN0aW9uKHQsZSl7dmFyIG4scj10Ll9fLGk9ci5wYXJlbnRzLmxlbmd0aDtpZih0Ll9fLnVwZGF0ZVJvb3QmJnQuX18udXBkYXRlUm9vdCh0LGUpLGUmJnRoaXMudHJpZ2dlcihlLFwidXBkYXRlXCIsZSxyLnN0b3JlLmxpdmUpLGkpZm9yKG49aS0xO24+PTA7bi0tKXRoaXMucmVmcmVzaChyLnBhcmVudHNbbl0sdCxlKX0scmVtb3ZlUGFyZW50OmZ1bmN0aW9uKHQsZSl7dmFyIG49dC5fXy5wYXJlbnRzLHI9bi5pbmRleE9mKGUpOy0xIT1yJiZuLnNwbGljZShyLDEpfSxhZGRQYXJlbnQ6ZnVuY3Rpb24odCxlKXt2YXIgbj10Ll9fLnBhcmVudHMscj1uLmluZGV4T2YoZSk7LTE9PXImJihuW24ubGVuZ3RoXT1lKX0sdHJpZ2dlcjpmdW5jdGlvbih0LG4scixpKXt2YXIgbz10Ll9fLmxpc3RlbmVyO2lmKG8pe3ZhciBzPW8udGlja2luZztpZihpKXJldHVybiB2b2lkKChzfHxyKSYmKG8udGlja2luZz0wLG8udHJpZ2dlcihuLHN8fHIpKSk7by50aWNraW5nPXIsc3x8ZS5uZXh0VGljayhmdW5jdGlvbigpe2lmKG8udGlja2luZyl7dmFyIHQ9by50aWNraW5nO28udGlja2luZz0wLG8udHJpZ2dlcihuLHQpfX0pfX0sY3JlYXRlTGlzdGVuZXI6ZnVuY3Rpb24odCl7dmFyIGU9dC5fXy5saXN0ZW5lcjtyZXR1cm4gZXx8KGU9T2JqZWN0LmNyZWF0ZShhLHtfZXZlbnRzOnt2YWx1ZTp7fSx3cml0YWJsZTohMH19KSx0Ll9fLmxpc3RlbmVyPWUpLGV9fTtuLmluaXQoZik7dmFyIGM9ZnVuY3Rpb24odCxuKXt2YXIgcixpPXRoaXMsbz1ufHx7fSxzPXtsaXZlOm8ubGl2ZXx8ITF9LGE9W10sYz0wLHU9ZnVuY3Rpb24odCl7dmFyIGUsbj10Ll9fO2ZvcihuLmxpc3RlbmVyJiZmLnRyaWdnZXIodCxcInVwZGF0ZVwiLDAsITApLGU9MDtlPG4ucGFyZW50cy5sZW5ndGg7ZSsrKW4uc3RvcmUubm90aWZ5KFwibm93XCIsbi5wYXJlbnRzW2VdKX0saD1mdW5jdGlvbih0KXthLnB1c2godCksY3x8KGM9MSxlLm5leHRUaWNrKGZ1bmN0aW9uKCl7YT1bXSxjPTB9KSl9O3Mubm90aWZ5PWZ1bmN0aW9uKHQsbixyKXtpZihcIm5vd1wiPT10KXtpZihhLmxlbmd0aClmb3IoO2EubGVuZ3RoOyl1KGEuc2hpZnQoKSk7ZWxzZSB1KG4pO3JldHVybiBufXZhciBpPWZbdF0obixyKTtpZihcInBpdm90XCIhPXQpe3ZhciBvPWUuZmluZFBpdm90KGkpO2lmKG8pcmV0dXJuIGgoaSksb31yZXR1cm4gaX0scy5mcmVlemVGbj1vLm11dGFibGU9PT0hMD9mdW5jdGlvbigpe306ZnVuY3Rpb24odCl7T2JqZWN0LmZyZWV6ZSh0KX0scj1mLmZyZWV6ZSh0LHMpLHIuX18udXBkYXRlUm9vdD1mdW5jdGlvbih0LGUpe3Q9PT1yJiYocj1lKX07dmFyIF89ci5nZXRMaXN0ZW5lcigpLGw9e307ZS5lYWNoKFtcIm9uXCIsXCJvZmZcIixcIm9uY2VcIixcInRyaWdnZXJcIl0sZnVuY3Rpb24odCl7dmFyIG49e307blt0XT1fW3RdLmJpbmQoXyksZS5hZGRORShpLG4pLGUuYWRkTkUobCxuKX0pLGUuYWRkTkUodGhpcyx7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHJ9LHNldDpmdW5jdGlvbih0KXtjb25zb2xlLmxvZyhcInNldHRpbmdcIiksci5yZXNldCh0KX0sZ2V0RXZlbnRIdWI6ZnVuY3Rpb24oKXtyZXR1cm4gbH19KSxlLmFkZE5FKHRoaXMse2dldERhdGE6dGhpcy5nZXQsc2V0RGF0YTp0aGlzLnNldH0pfTtyZXR1cm4gY30pOyIsIi8qISBDb3B5cmlnaHQgKGMpIDIwMTYgTmF1ZmFsIFJhYmJhbmkgKGh0dHA6Ly9naXRodWIuY29tL0Jvc05hdWZhbClcbiogTGljZW5zZWQgVW5kZXIgTUlUIChodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUKVxuKlxuKiBbIFZ1ZSBGcmVlemUgSlMgXVxuKiAgIFZlcnNpb24gMS4wLjBcbipcbiovXG5pbXBvcnQgRnJlZXplciBmcm9tICcuL2ZyZWV6ZXIubWluLmpzJ1xuaW1wb3J0IGFzc2lnbiBmcm9tICcuLi9ub2RlX21vZHVsZXMvYmFiZWxpZnkvbm9kZV9tb2R1bGVzL2xvZGFzaC9vYmplY3QvYXNzaWduLmpzJ1xuXG4oZnVuY3Rpb24oKXtcblxuICB2YXIgVnVlRnJlZXplID0ge1xuXG4gICAgaW5zdGFsbChWdWUsb3B0KXtcblxuXG4gICAgICAvLyBDaGVjayB0aGUgRnJlZXplclxuICAgICAgaWYoIHR5cGVvZiBGcmVlemVyID09ICd1bmRlZmluZWQnICkgY29uc29sZS53YXJuKCdbVnVlIEZyZWV6ZV06IFlvdSBNdXN0IEluc3RhbGwgRnJlZXplci5qcyBmaXJzIScpXG5cbiAgICAgIHZhciBwbHVnaW4gPSB0aGlzXG5cbiAgICAgIC8vIFBsdWdpbiBTdG9yZVxuICAgICAgaWYodHlwZW9mIG9wdCAgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdbVnVlIEZyZWV6ZV06IFBsZWFzZSBTcGVjaWZ5IHRoZSBzdG9yZSEgVmlhIFZ1ZS51c2UgT3B0aW9ucyEnKVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICAvLyBsaXZlIHVwZGF0ZT9cbiAgICAgICAgdmFyIGxpdmUgPSBvcHQubGl2ZSA/IG9wdC5saXZlIDogdHJ1ZVxuXG4gICAgICAgIC8vIG1ha2Ugb3VyIHN0b3JlIVxuICAgICAgICB2YXIgc3RvcmUgPSAgbmV3IEZyZWV6ZXIob3B0LnN0YXRlLHtsaXZlOmxpdmV9KVxuXG4gICAgICAgIC8vIGJpbmRpbmcgdGhlIGFjdGlvblxuICAgICAgICBvcHQuYWN0aW9uKHN0b3JlKVxuICAgICAgfVxuXG4gICAgICAvLyBNYWtlIGEgZGF0YSBiZWNvbWUgbXV0YWJsZVxuICAgICAgdmFyIG11dGFibGUgPSAoZGF0YSkgPT4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShkYXRhKSlcblxuICAgICAgLy8gTWFrZSBhIG1peGluXG4gICAgICBwbHVnaW4ubWl4aW4gPSB7fVxuXG4gICAgICAvLyBUbyBtYWtlIHRoZSBzdGF0ZSBiZWNvbWUgd2F0Y2hhYmxlIVxuICAgICAgcGx1Z2luLm1peGluLmRhdGEgPSBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm57XG4gICAgICAgICAgc3RhdGU6IHt9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gTWl4aW4gTWV0aG9kcyBGb3Igdm0gaW5zdGFuY2VcbiAgICAgIHBsdWdpbi5taXhpbi5tZXRob2RzID0ge1xuICAgICAgICAvLyBzZXQgdGhlIHZtIHN0YXRlIHRvIG5ldyBzdGF0ZVxuICAgICAgICB1cGRhdGVTdGF0ZShvbGQsdmFsKXtcbiAgICAgICAgICBsZXQgbmV3U3RhdGUgPSBhc3NpZ24oe30sdGhpcy5zdGF0ZSxzdG9yZS5nZXQoKS50b0pTKCkpXG4gICAgICAgICAgdGhpcy4kc2V0KCdzdGF0ZScsbmV3U3RhdGUpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gTWl4aW4gQ3JlYXRlZCBFdmVudFxuICAgICAgcGx1Z2luLm1peGluLmNyZWF0ZWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG1lID0gdGhpc1xuXG4gICAgICAgIC8vIHNldCBnbG9iYWwgc3RhdGUgYXMgaW50ZXJuYWwgc3RhdGVcbiAgICAgICAgbWUuJHNldCgnc3RhdGUnLG11dGFibGUoc3RvcmUuZ2V0KCkpKVxuXG4gICAgICAgIC8vIE1ha2UgTWV0aG9kc1xuICAgICAgICBWdWUudXRpbC5kZWZpbmVSZWFjdGl2ZSh0aGlzLCckc3RvcmUnLHN0b3JlKVxuICAgICAgICBWdWUudXRpbC5kZWZpbmVSZWFjdGl2ZSh0aGlzLCckYWN0aW9uJywgZnVuY3Rpb24oZXZlbnROYW1lLGFyZyl7XG4gICAgICAgICAgLy8gdHJpZ2dlciBmcmVlemVyIGV2ZW50IHdpdGggcGFzcyB0aGUgb2xkIHZhbHVlIGF0IHRoZSBlbmRcbiAgICAgICAgICBzdG9yZS50cmlnZ2VyKGV2ZW50TmFtZSxhcmcsbWUuc3RhdGUpXG4gICAgICAgIH0pXG5cbiAgICAgICAgLy8gV2hlbiBTdG9yZSBVcGRhdGVkflxuICAgICAgICBtZS4kc3RvcmUub24oJ3VwZGF0ZScsIGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICAvLyBVcGRhdGUgdGhlIHN0YXRlXG4gICAgICAgICAgbWUudXBkYXRlU3RhdGUobWUuc3RhdGUsdmFsKVxuICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgICAvLyBNZXJnZSBtaXhpbiB0byBWTSB2aWEgdnVlIG9wdGlvbnNcbiAgICAgIFZ1ZS5vcHRpb25zID0gVnVlLnV0aWwubWVyZ2VPcHRpb25zKFZ1ZS5vcHRpb25zLCBwbHVnaW4ubWl4aW4pXG5cbiAgICB9IC8vIGluc3RhbGwoKVxuXG5cbiAgfSAvLyBWdWVGcmVlemVcblxuXG4gIC8vIElmIHN1cHBvcnQgbm9kZSAvIEVTNiBtb2R1bGVcbiAgaWYoIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzICl7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBWdWVGcmVlemVcbiAgfVxuICAvLyBpZiB1c2luZyByZXF1aXJlIGpzXG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoKCkgPT4geyByZXR1cm4gVnVlRnJlZXplIH0pXG4gIH1cbiAgLy8gaWYgc2NyaXB0IGxvYWRlZCBieSBzY3JpcHQgdGFnIGluIEhUTUwgZmlsZVxuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5WdWVGcmVlemUgPSBWdWVGcmVlemVcbiAgfVxuXG59KSgpO1xuIl19
