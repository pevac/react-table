'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

//
exports.default = {
  get: get,
  set: set,
  takeRight: takeRight,
  last: last,
  orderBy: orderBy,
  range: range,
  remove: remove,
  clone: clone,
  leaves: leaves,
  iterTree: iterTree,
  getFirstDefined: getFirstDefined,
  sum: sum,
  makeTemplateComponent: makeTemplateComponent,
  groupBy: groupBy,
  isArray: isArray,
  splitProps: splitProps,
  compactObject: compactObject,
  isSortingDesc: isSortingDesc,
  normalizeComponent: normalizeComponent,
  asPx: asPx
};


function get(obj, path, def) {
  if (!path) {
    return obj;
  }
  var pathObj = makePathArray(path);
  var val = void 0;
  try {
    val = pathObj.reduce(function (current, pathPart) {
      return current[pathPart];
    }, obj);
  } catch (e) {
    // continue regardless of error
  }
  return typeof val !== 'undefined' ? val : def;
}

function set() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var path = arguments[1];
  var value = arguments[2];

  var keys = makePathArray(path);
  var keyPart = void 0;
  var cursor = obj;
  while ((keyPart = keys.shift()) && keys.length) {
    if (!cursor[keyPart]) {
      cursor[keyPart] = {};
    }
    cursor = cursor[keyPart];
  }
  cursor[keyPart] = value;
  return obj;
}

function takeRight(arr, n) {
  var start = n > arr.length ? 0 : arr.length - n;
  return arr.slice(start);
}

function last(arr) {
  return arr[arr.length - 1];
}

function range(n) {
  var arr = [];
  for (var i = 0; i < n; i += 1) {
    arr.push(n);
  }
  return arr;
}

function orderBy(arr, funcs, dirs, indexKey) {
  return arr.sort(function (rowA, rowB) {
    for (var i = 0; i < funcs.length; i += 1) {
      var comp = funcs[i];
      var desc = dirs[i] === false || dirs[i] === 'desc';
      var sortInt = comp(rowA, rowB);
      if (sortInt) {
        return desc ? -sortInt : sortInt;
      }
    }
    // Use the row index for tie breakers
    return dirs[0] ? rowA[indexKey] - rowB[indexKey] : rowB[indexKey] - rowA[indexKey];
  });
}

function remove(a, b) {
  return a.filter(function (o, i) {
    var r = b(o);
    if (r) {
      a.splice(i, 1);
      return true;
    }
    return false;
  });
}

function clone(a) {
  try {
    return JSON.parse(JSON.stringify(a, function (key, value) {
      if (typeof value === 'function') {
        return value.toString();
      }
      return value;
    }));
  } catch (e) {
    return a;
  }
}

function leaves(root, childProperty) {
  if (Object.prototype.hasOwnProperty.call(root, childProperty)) {
    var _ref;

    var children = root[childProperty].map(function (child) {
      return leaves(child, childProperty);
    });
    return (_ref = []).concat.apply(_ref, _toConsumableArray(children));
  }

  return [root];
}

function iterTree(root, childProperty) {
  if (Object.prototype.hasOwnProperty.call(root, childProperty)) {
    var _ref2;

    var children = root[childProperty].map(function (child) {
      return leaves(child, childProperty);
    });
    return (_ref2 = []).concat.apply(_ref2, [root].concat(_toConsumableArray(children)));
  }

  return [root];
}

function getFirstDefined() {
  for (var i = 0; i < arguments.length; i += 1) {
    if (typeof (arguments.length <= i ? undefined : arguments[i]) !== 'undefined') {
      return arguments.length <= i ? undefined : arguments[i];
    }
  }
}

function sum(arr) {
  return arr.reduce(function (a, b) {
    return a + b;
  }, 0);
}

function makeTemplateComponent(compClass, displayName) {
  if (!displayName) {
    throw new Error('No displayName found for template component:', compClass);
  }
  var cmp = function cmp(_ref3) {
    var children = _ref3.children,
        className = _ref3.className,
        rest = _objectWithoutProperties(_ref3, ['children', 'className']);

    return _react2.default.createElement(
      'div',
      _extends({ className: (0, _classnames2.default)(compClass, className) }, rest),
      children
    );
  };
  cmp.displayName = displayName;
  return cmp;
}

function groupBy(xs, key) {
  return xs.reduce(function (rv, x, i) {
    var resKey = typeof key === 'function' ? key(x, i) : x[key];
    rv[resKey] = isArray(rv[resKey]) ? rv[resKey] : [];
    rv[resKey].push(x);
    return rv;
  }, {});
}

function asPx(value) {
  value = Number(value);
  return Number.isNaN(value) ? null : value + 'px';
}

function isArray(a) {
  return Array.isArray(a);
}

// ########################################################################
// Non-exported Helpers
// ########################################################################

function makePathArray(obj) {
  return flattenDeep(obj).join('.').replace(/\[/g, '.').replace(/\]/g, '').split('.');
}

function flattenDeep(arr) {
  var newArr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (!isArray(arr)) {
    newArr.push(arr);
  } else {
    for (var i = 0; i < arr.length; i += 1) {
      flattenDeep(arr[i], newArr);
    }
  }
  return newArr;
}

function splitProps(_ref4) {
  var className = _ref4.className,
      style = _ref4.style,
      rest = _objectWithoutProperties(_ref4, ['className', 'style']);

  return {
    className: className,
    style: style,
    rest: rest || {}
  };
}

function compactObject(obj) {
  var newObj = {};
  if (obj) {
    Object.keys(obj).map(function (key) {
      if (Object.prototype.hasOwnProperty.call(obj, key) && obj[key] !== undefined && typeof obj[key] !== 'undefined') {
        newObj[key] = obj[key];
      }
      return true;
    });
  }
  return newObj;
}

function isSortingDesc(d) {
  return !!(d.sort === 'desc' || d.desc === true || d.asc === false);
}

function normalizeComponent(Comp) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var fallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Comp;

  return typeof Comp === 'function' ? _react2.default.createElement(Comp, params) : fallback;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlscy5qcyJdLCJuYW1lcyI6WyJnZXQiLCJzZXQiLCJ0YWtlUmlnaHQiLCJsYXN0Iiwib3JkZXJCeSIsInJhbmdlIiwicmVtb3ZlIiwiY2xvbmUiLCJsZWF2ZXMiLCJpdGVyVHJlZSIsImdldEZpcnN0RGVmaW5lZCIsInN1bSIsIm1ha2VUZW1wbGF0ZUNvbXBvbmVudCIsImdyb3VwQnkiLCJpc0FycmF5Iiwic3BsaXRQcm9wcyIsImNvbXBhY3RPYmplY3QiLCJpc1NvcnRpbmdEZXNjIiwibm9ybWFsaXplQ29tcG9uZW50IiwiYXNQeCIsIm9iaiIsInBhdGgiLCJkZWYiLCJwYXRoT2JqIiwibWFrZVBhdGhBcnJheSIsInZhbCIsInJlZHVjZSIsImN1cnJlbnQiLCJwYXRoUGFydCIsImUiLCJ2YWx1ZSIsImtleXMiLCJrZXlQYXJ0IiwiY3Vyc29yIiwic2hpZnQiLCJsZW5ndGgiLCJhcnIiLCJuIiwic3RhcnQiLCJzbGljZSIsImkiLCJwdXNoIiwiZnVuY3MiLCJkaXJzIiwiaW5kZXhLZXkiLCJzb3J0Iiwicm93QSIsInJvd0IiLCJjb21wIiwiZGVzYyIsInNvcnRJbnQiLCJhIiwiYiIsImZpbHRlciIsIm8iLCJyIiwic3BsaWNlIiwiSlNPTiIsInBhcnNlIiwic3RyaW5naWZ5Iiwia2V5IiwidG9TdHJpbmciLCJyb290IiwiY2hpbGRQcm9wZXJ0eSIsIk9iamVjdCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsImNoaWxkcmVuIiwibWFwIiwiY2hpbGQiLCJjb25jYXQiLCJjb21wQ2xhc3MiLCJkaXNwbGF5TmFtZSIsIkVycm9yIiwiY21wIiwiY2xhc3NOYW1lIiwicmVzdCIsInhzIiwicnYiLCJ4IiwicmVzS2V5IiwiTnVtYmVyIiwiaXNOYU4iLCJBcnJheSIsImZsYXR0ZW5EZWVwIiwiam9pbiIsInJlcGxhY2UiLCJzcGxpdCIsIm5ld0FyciIsInN0eWxlIiwibmV3T2JqIiwidW5kZWZpbmVkIiwiZCIsImFzYyIsIkNv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Q1A0QyxXQUFPakMsSUFBUCxDQUFZWCxHQUFaLEVBQWlCaUQsR0FBakIsQ0FBcUIsZUFBTztBQUMxQixVQUNFTCxPQUFPQyxTQUFQLENBQWlCQyxjQUFqQixDQUFnQ0MsSUFBaEMsQ0FBcUMvQyxHQUFyQyxFQUEwQ3dDLEdBQTFDLEtBQ0F4QyxJQUFJd0MsR0FBSixNQUFhZ0MsU0FEYixJQUVBLE9BQU94RSxJQUFJd0MsR0FBSixDQUFQLEtBQW9CLFdBSHRCLEVBSUU7QUFDQStCLGVBQU8vQixHQUFQLElBQWN4QyxJQUFJd0MsR0FBSixDQUFkO0FBQ0Q7QUFDRCxhQUFPLElBQVA7QUFDRCxLQVREO0FBVUQ7QUFDRCxTQUFPK0IsTUFBUDtBQUNEOztBQUVELFNBQVMxRSxhQUFULENBQXdCNEUsQ0FBeEIsRUFBMkI7QUFDekIsU0FBTyxDQUFDLEVBQUVBLEVBQUVoRCxJQUFGLEtBQVcsTUFBWCxJQUFxQmdELEVBQUU1QyxJQUFGLEtBQVcsSUFBaEMsSUFBd0M0QyxFQUFFQyxHQUFGLEtBQVUsS0FBcEQsQ0FBUjtBQUNEOztBQUVELFNBQVM1RSxrQkFBVCxDQUE2QjZFLElBQTdCLEVBQWlFO0FBQUEsTUFBOUJDLE1BQThCLHVFQUFyQixFQUFxQjtBQUFBLE1BQWpCQyxRQUFpQix1RUFBTkYsSUFBTTs7QUFDL0QsU0FBTyxPQUFPQSxJQUFQLEtBQWdCLFVBQWhCLEdBQ0wsOEJBQUMsSUFBRCxFQUFVQyxNQUFWLENBREssR0FHTEMsUUFIRjtBQUtEIiwiZmlsZSI6InV0aWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJ1xyXG4vL1xyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgZ2V0LFxyXG4gIHNldCxcclxuICB0YWtlUmlnaHQsXHJcbiAgbGFzdCxcclxuICBvcmRlckJ5LFxyXG4gIHJhbmdlLFxyXG4gIHJlbW92ZSxcclxuICBjbG9uZSxcclxuICBsZWF2ZXMsXHJcbiAgaXRlclRyZWUsXHJcbiAgZ2V0Rmlyc3REZWZpbmVkLFxyXG4gIHN1bSxcclxuICBtYWtlVGVtcGxhdGVDb21wb25lbnQsXHJcbiAgZ3JvdXBCeSxcclxuICBpc0FycmF5LFxyXG4gIHNwbGl0UHJvcHMsXHJcbiAgY29tcGFjdE9iamVjdCxcclxuICBpc1NvcnRpbmdEZXNjLFxyXG4gIG5vcm1hbGl6ZUNvbXBvbmVudCxcclxuICBhc1B4LFxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXQgKG9iaiwgcGF0aCwgZGVmKSB7XHJcbiAgaWYgKCFwYXRoKSB7XHJcbiAgICByZXR1cm4gb2JqXHJcbiAgfVxyXG4gIGNvbnN0IHBhdGhPYmogPSBtYWtlUGF0aEFycmF5KHBhdGgpXHJcbiAgbGV0IHZhbFxyXG4gIHRyeSB7XHJcbiAgICB2YWwgPSBwYXRoT2JqLnJlZHVjZSgoY3VycmVudCwgcGF0aFBhcnQpID0+IGN1cnJlbnRbcGF0aFBhcnRdLCBvYmopXHJcbiAgfSBjYXRjaCAoZSkge1xyXG4gICAgLy8gY29udGludWUgcmVnYXJkbGVzcyBvZiBlcnJvclxyXG4gIH1cclxuICByZXR1cm4gdHlwZW9mIHZhbCAhPT0gJ3VuZGVmaW5lZCcgPyB2YWwgOiBkZWZcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0IChvYmogPSB7fSwgcGF0aCwgdmFsdWUpIHtcclxuICBjb25zdCBrZXlzID0gbWFrZVBhdGhBcnJheShwYXRoKVxyXG4gIGxldCBrZXlQYXJ0XHJcbiAgbGV0IGN1cnNvciA9IG9ialxyXG4gIHdoaWxlICgoa2V5UGFydCA9IGtleXMuc2hpZnQoKSkgJiYga2V5cy5sZW5ndGgpIHtcclxuICAgIGlmICghY3Vyc29yW2tleVBhcnRdKSB7XHJcbiAgICAgIGN1cnNvcltrZXlQYXJ0XSA9IHt9XHJcbiAgICB9XHJcbiAgICBjdXJzb3IgPSBjdXJzb3Jba2V5UGFydF1cclxuICB9XHJcbiAgY3Vyc29yW2tleVBhcnRdID0gdmFsdWVcclxuICByZXR1cm4gb2JqXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRha2VSaWdodCAoYXJyLCBuKSB7XHJcbiAgY29uc3Qgc3RhcnQgPSBuID4gYXJyLmxlbmd0aCA/IDAgOiBhcnIubGVuZ3RoIC0gblxyXG4gIHJldHVybiBhcnIuc2xpY2Uoc3RhcnQpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxhc3QgKGFycikge1xyXG4gIHJldHVybiBhcnJbYXJyLmxlbmd0aCAtIDFdXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJhbmdlIChuKSB7XHJcbiAgY29uc3QgYXJyID0gW11cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkgKz0gMSkge1xyXG4gICAgYXJyLnB1c2gobilcclxuICB9XHJcbiAgcmV0dXJuIGFyclxyXG59XHJcblxyXG5mdW5jdGlvbiBvcmRlckJ5IChhcnIsIGZ1bmNzLCBkaXJzLCBpbmRleEtleSkge1xyXG4gIHJldHVybiBhcnIuc29ydCgocm93QSwgcm93QikgPT4ge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmdW5jcy5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICBjb25zdCBjb21wID0gZnVuY3NbaV1cclxuICAgICAgY29uc3QgZGVzYyA9IGRpcnNbaV0gPT09IGZhbHNlIHx8IGRpcnNbaV0gPT09ICdkZXNjJ1xyXG4gICAgICBjb25zdCBzb3J0SW50ID0gY29tcChyb3dBLCByb3dCKVxyXG4gICAgICBpZiAoc29ydEludCkge1xyXG4gICAgICAgIHJldHVybiBkZXNjID8gLXNvcnRJbnQgOiBzb3J0SW50XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIFVzZSB0aGUgcm93IGluZGV4IGZvciB0aWUgYnJlYWtlcnNcclxuICAgIHJldHVybiBkaXJzWzBdID8gcm93QVtpbmRleEtleV0gLSByb3dCW2luZGV4S2V5XSA6IHJvd0JbaW5kZXhLZXldIC0gcm93QVtpbmRleEtleV1cclxuICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmUgKGEsIGIpIHtcclxuICByZXR1cm4gYS5maWx0ZXIoKG8sIGkpID0+IHtcclxuICAgIGNvbnN0IHIgPSBiKG8pXHJcbiAgICBpZiAocikge1xyXG4gICAgICBhLnNwbGljZShpLCAxKVxyXG4gICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlXHJcbiAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gY2xvbmUgKGEpIHtcclxuICB0cnkge1xyXG4gICAgcmV0dXJuIEpTT04ucGFyc2UoXHJcbiAgICAgIEpTT04uc3RyaW5naWZ5KGEsIChrZXksIHZhbHVlKSA9PiB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKClcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlXHJcbiAgICAgIH0pXHJcbiAgICApXHJcbiAgfSBjYXRjaCAoZSkge1xyXG4gICAgcmV0dXJuIGFcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxlYXZlcyAocm9vdCwgY2hpbGRQcm9wZXJ0eSkge1xyXG4gIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocm9vdCwgY2hpbGRQcm9wZXJ0eSkpIHtcclxuICAgIGNvbnN0IGNoaWxkcmVuID0gcm9vdFtjaGlsZFByb3BlcnR5XS5tYXAoY2hpbGQgPT4gbGVhdmVzKGNoaWxkLCBjaGlsZFByb3BlcnR5KSlcclxuICAgIHJldHVybiBbXS5jb25jYXQoLi4uY2hpbGRyZW4pXHJcbiAgfVxyXG5cclxuICByZXR1cm4gW3Jvb3RdXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGl0ZXJUcmVlIChyb290LCBjaGlsZFByb3BlcnR5KSB7XHJcbiAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChyb290LCBjaGlsZFByb3BlcnR5KSkge1xyXG4gICAgY29uc3QgY2hpbGRyZW4gPSByb290W2NoaWxkUHJvcGVydHldLm1hcChjaGlsZCA9PiBsZWF2ZXMoY2hpbGQsIGNoaWxkUHJvcGVydHkpKVxyXG4gICAgcmV0dXJuIFtdLmNvbmNhdChyb290LCAuLi5jaGlsZHJlbilcclxuICB9XHJcblxyXG4gIHJldHVybiBbcm9vdF1cclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0Rmlyc3REZWZpbmVkICguLi5hcmdzKSB7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICBpZiAodHlwZW9mIGFyZ3NbaV0gIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIHJldHVybiBhcmdzW2ldXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzdW0gKGFycikge1xyXG4gIHJldHVybiBhcnIucmVkdWNlKChhLCBiKSA9PiBhICsgYiwgMClcclxufVxyXG5cclxuZnVuY3Rpb24gbWFrZVRlbXBsYXRlQ29tcG9uZW50IChjb21wQ2xhc3MsIGRpc3BsYXlOYW1lKSB7XHJcbiAgaWYgKCFkaXNwbGF5TmFtZSkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdObyBkaXNwbGF5TmFtZSBmb3VuZCBmb3IgdGVtcGxhdGUgY29tcG9uZW50OicsIGNvbXBDbGFzcylcclxuICB9XHJcbiAgY29uc3QgY21wID0gKHsgY2hpbGRyZW4sIGNsYXNzTmFtZSwgLi4ucmVzdCB9KSA9PiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NuYW1lcyhjb21wQ2xhc3MsIGNsYXNzTmFtZSl9IHsuLi5yZXN0fT5cclxuICAgICAge2NoaWxkcmVufVxyXG4gICAgPC9kaXY+XHJcbiAgKVxyXG4gIGNtcC5kaXNwbGF5TmFtZSA9IGRpc3BsYXlOYW1lXHJcbiAgcmV0dXJuIGNtcFxyXG59XHJcblxyXG5mdW5jdGlvbiBncm91cEJ5ICh4cywga2V5KSB7XHJcbiAgcmV0dXJuIHhzLnJlZHVjZSgocnYsIHgsIGkpID0+IHtcclxuICAgIGNvbnN0IHJlc0tleSA9IHR5cGVvZiBrZXkgPT09ICdmdW5jdGlvbicgPyBrZXkoeCwgaSkgOiB4W2tleV1cclxuICAgIHJ2W3Jlc0tleV0gPSBpc0FycmF5KHJ2W3Jlc0tleV0pID8gcnZbcmVzS2V5XSA6IFtdXHJcbiAgICBydltyZXNLZXldLnB1c2goeClcclxuICAgIHJldHVybiBydlxyXG4gIH0sIHt9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBhc1B4ICh2YWx1ZSkge1xyXG4gIHZhbHVlID0gTnVtYmVyKHZhbHVlKVxyXG4gIHJldHVybiBOdW1iZXIuaXNOYU4odmFsdWUpID8gbnVsbCA6IGAke3ZhbHVlfXB4YFxyXG59XHJcblxyXG5mdW5jdGlvbiBpc0FycmF5IChhKSB7XHJcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkoYSlcclxufVxyXG5cclxuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXHJcbi8vIE5vbi1leHBvcnRlZCBIZWxwZXJzXHJcbi8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xyXG5cclxuZnVuY3Rpb24gbWFrZVBhdGhBcnJheSAob2JqKSB7XHJcbiAgcmV0dXJuIGZsYXR0ZW5EZWVwKG9iailcclxuICAgIC5qb2luKCcuJylcclxuICAgIC5yZXBsYWNlKC9cXFsvZywgJy4nKVxyXG4gICAgLnJlcGxhY2UoL1xcXS9nLCAnJylcclxuICAgIC5zcGxpdCgnLicpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZsYXR0ZW5EZWVwIChhcnIsIG5ld0FyciA9IFtdKSB7XHJcbiAgaWYgKCFpc0FycmF5KGFycikpIHtcclxuICAgIG5ld0Fyci5wdXNoKGFycilcclxuICB9IGVsc2Uge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgZmxhdHRlbkRlZXAoYXJyW2ldLCBuZXdBcnIpXHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBuZXdBcnJcclxufVxyXG5cclxuZnVuY3Rpb24gc3BsaXRQcm9wcyAoeyBjbGFzc05hbWUsIHN0eWxlLCAuLi5yZXN0IH0pIHtcclxuICByZXR1cm4ge1xyXG4gICAgY2xhc3NOYW1lLFxyXG4gICAgc3R5bGUsXHJcbiAgICByZXN0OiByZXN0IHx8IHt9LFxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY29tcGFjdE9iamVjdCAob2JqKSB7XHJcbiAgY29uc3QgbmV3T2JqID0ge31cclxuICBpZiAob2JqKSB7XHJcbiAgICBPYmplY3Qua2V5cyhvYmopLm1hcChrZXkgPT4ge1xyXG4gICAgICBpZiAoXHJcbiAgICAgICAgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSAmJlxyXG4gICAgICAgIG9ialtrZXldICE9PSB1bmRlZmluZWQgJiZcclxuICAgICAgICB0eXBlb2Ygb2JqW2tleV0gIT09ICd1bmRlZmluZWQnXHJcbiAgICAgICkge1xyXG4gICAgICAgIG5ld09ialtrZXldID0gb2JqW2tleV1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgfSlcclxuICB9XHJcbiAgcmV0dXJuIG5ld09ialxyXG59XHJcblxyXG5mdW5jdGlvbiBpc1NvcnRpbmdEZXNjIChkKSB7XHJcbiAgcmV0dXJuICEhKGQuc29ydCA9PT0gJ2Rlc2MnIHx8IGQuZGVzYyA9PT0gdHJ1ZSB8fCBkLmFzYyA9PT0gZmFsc2UpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIG5vcm1hbGl6ZUNvbXBvbmVudCAoQ29tcCwgcGFyYW1zID0ge30sIGZhbGxiYWNrID0gQ29tcCkge1xyXG4gIHJldHVybiB0eXBlb2YgQ29tcCA9PT0gJ2Z1bmN0aW9uJyA/IChcclxuICAgIDxDb21wIHsuLi5wYXJhbXN9IC8+XHJcbiAgKSA6IChcclxuICAgIGZhbGxiYWNrXHJcbiAgKVxyXG59XHJcbiJdfQ==