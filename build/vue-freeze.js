(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/var/www/github/vue-freeze/master/src/freezer.min.js":[function(require,module,exports){
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
				// binding the store
				opt.action(store);
			}

			// Make a mixin
			plugin.mixin = {};

			// Mixin Methods For vm instance
			plugin.mixin.methods = {
				// For mutable data

				mutable: function mutable(data) {
					return JSON.parse(JSON.stringify(data));
				},


				// set the vm $state to new state
				updateState: function updateState(old, val) {
					this.$set('$state', store.get());
				}
			};

			// Mixin Created Event
			plugin.mixin.created = function () {
				var me = this;

				// Make Methods
				Vue.util.defineReactive(this, '$store', store);
				Vue.util.defineReactive(this, '$state', store.get());
				Vue.util.defineReactive(this, '$action', function (eventName, args) {
					// trigger freeze event with pass the old value at the end
					store.trigger(eventName, args, me.$state);
				});

				// When Store Updated~
				this.$store.on('update', function (val) {
					// Update the state
					me.updateState(me.$state, val);
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
		window.VueFreeze = VueFreeze;
	}
})();

},{"./freezer.min.js":"/var/www/github/vue-freeze/master/src/freezer.min.js"}]},{},["/var/www/github/vue-freeze/master/src/vue-freeze.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Vzci9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsInNyYy9mcmVlemVyLm1pbi5qcyIsInNyYy92dWUtZnJlZXplLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FDS0EsQ0FBQyxVQUFTLENBQVQsRUFBVyxDQUFYLEVBQWE7QUFBQyxnQkFBWSxPQUFPLE1BQVAsSUFBZSxPQUFPLEdBQVAsR0FBVyxPQUFPLEVBQVAsRUFBVSxDQUFWLENBQXRDLEdBQW1ELG9CQUFpQix5REFBakIsR0FBeUIsT0FBTyxPQUFQLEdBQWUsR0FBZixHQUFtQixFQUFFLE9BQUYsR0FBVSxHQUFWLENBQWhHO0NBQWIsWUFBaUksWUFBVTtBQUFDLGVBQUQ7QUFBYyxNQUFJLElBQUUsSUFBSSxRQUFKLENBQWEsYUFBYixHQUFGO01BQWdDLElBQUUsRUFBQyxRQUFPLGdCQUFTLENBQVQsRUFBVyxDQUFYLEVBQWE7QUFBQyxXQUFJLElBQUksQ0FBSixJQUFTLENBQWI7QUFBZSxVQUFFLENBQUYsSUFBSyxFQUFFLENBQUYsQ0FBTDtPQUFmLE9BQWdDLENBQVAsQ0FBMUI7S0FBYixFQUFpRCxxQkFBb0IsNkJBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYTtBQUFDLFVBQUksSUFBRSxFQUFGLENBQUwsS0FBYyxJQUFJLENBQUosSUFBUyxDQUFiO0FBQWUsVUFBRSxDQUFGLElBQUssRUFBQyxPQUFNLEVBQUUsQ0FBRixDQUFOLEVBQU47T0FBZixPQUF3QyxPQUFPLE1BQVAsQ0FBYyxLQUFHLEVBQUgsRUFBTSxDQUFwQixDQUFQLENBQTNDO0tBQWIsRUFBdUYsT0FBTSxlQUFTLENBQVQsRUFBVztBQUFDLFVBQUksSUFBRSxJQUFJLEtBQUosQ0FBVSxDQUFWLENBQUYsQ0FBTCxJQUF1QixPQUFILEVBQVcsT0FBTyxRQUFRLEtBQVIsQ0FBYyxDQUFkLENBQVAsQ0FBWCxN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QWdDLE9BQU8sR0FBUCxFQUFZO0FBQy9DLFNBQU8sWUFBTTtBQUFFLFVBQU8sU0FBUCxDQUFGO0dBQU4sQ0FBUCxDQUQrQztFQUFoRDs7QUEzRVUsS0ErRU4sUUFBTyx1REFBUCxLQUFrQixTQUFsQixFQUE2QjtBQUNoQyxTQUFPLFNBQVAsR0FBbUIsU0FBbkIsQ0FEZ0M7RUFBakM7Q0EvRUEsQ0FBRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKlxuZnJlZXplci1qcyB2MC4xMC4wXG5odHRwczovL2dpdGh1Yi5jb20vYXJxZXgvZnJlZXplclxuTUlUOiBodHRwczovL2dpdGh1Yi5jb20vYXJxZXgvZnJlZXplci9yYXcvbWFzdGVyL0xJQ0VOU0VcbiovXG4hZnVuY3Rpb24odCxlKXtcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKFtdLGUpOlwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzP21vZHVsZS5leHBvcnRzPWUoKTp0LkZyZWV6ZXI9ZSgpfSh0aGlzLGZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7dmFyIHQ9bmV3IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSxlPXtleHRlbmQ6ZnVuY3Rpb24odCxlKXtmb3IodmFyIG4gaW4gZSl0W25dPWVbbl07cmV0dXJuIHR9LGNyZWF0ZU5vbkVudW1lcmFibGU6ZnVuY3Rpb24odCxlKXt2YXIgbj17fTtmb3IodmFyIHIgaW4gdCluW3JdPXt2YWx1ZTp0W3JdfTtyZXR1cm4gT2JqZWN0LmNyZWF0ZShlfHx7fSxuKX0sZXJyb3I6ZnVuY3Rpb24odCl7dmFyIGU9bmV3IEVycm9yKHQpO2lmKGNvbnNvbGUpcmV0dXJuIGNvbnNvbGUuZXJyb3IoZSk7dGhyb3cgZX0sZWFjaDpmdW5jdGlvbih0LGUpe3ZhciBuLHIsaTtpZih0JiZ0LmNvbnN0cnVjdG9yPT1BcnJheSlmb3Iobj0wLHI9dC5sZW5ndGg7cj5uO24rKyllKHRbbl0sbik7ZWxzZSBmb3IoaT1PYmplY3Qua2V5cyh0KSxuPTAscj1pLmxlbmd0aDtyPm47bisrKWUodFtpW25dXSxpW25dKX0sYWRkTkU6ZnVuY3Rpb24odCxlKXtmb3IodmFyIG4gaW4gZSlPYmplY3QuZGVmaW5lUHJvcGVydHkodCxuLHtlbnVtZXJhYmxlOiExLGNvbmZpZ3VyYWJsZTohMCx3cml0YWJsZTohMCx2YWx1ZTplW25dfSl9LGNyZWF0ZU5FOmZ1bmN0aW9uKHQpe3ZhciBlPXt9O2Zvcih2YXIgbiBpbiB0KWVbbl09e3dyaXRhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMCxlbnVtZXJhYmxlOiExLHZhbHVlOnRbbl19O3JldHVybiBlfSxuZXh0VGljazpmdW5jdGlvbigpe2Z1bmN0aW9uIGUoKXtmb3IoO3I9aS5zaGlmdCgpOylyKCk7bz0hMX1mdW5jdGlvbiBuKHQpe2kucHVzaCh0KSxvfHwobz0hMCxmKCkpfXZhciByLGk9W10sbz0hMSxzPSEhdC5wb3N0TWVzc2FnZSYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIFdpbmRvdyYmdCBpbnN0YW5jZW9mIFdpbmRvdyxhPVwibmV4dHRpY2tcIixmPWZ1bmN0aW9uKCl7cmV0dXJuIHM/ZnVuY3Rpb24oKXt0LnBvc3RNZXNzYWdlKGEsXCIqXCIpfTpmdW5jdGlvbigpe3NldFRpbWVvdXQoZnVuY3Rpb24oKXtjKCl9LDApfX0oKSxjPWZ1bmN0aW9uKCl7cmV0dXJuIHM/ZnVuY3Rpb24obil7bi5zb3VyY2U9PT10JiZuLmRhdGE9PT1hJiYobi5zdG9wUHJvcGFnYXRpb24oKSxlKCkpfTplfSgpO3JldHVybiBzJiZ0LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsYywhMCksbi5yZW1vdmVMaXN0ZW5lcj1mdW5jdGlvbigpe3QucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIixjLCEwKX0sbn0oKSxmaW5kUGl2b3Q6ZnVuY3Rpb24odCl7aWYodCYmdC5fXyl7aWYodC5fXy5waXZvdClyZXR1cm4gdDtmb3IodmFyIGUsbj0wLHI9dC5fXy5wYXJlbnRzLGk9MDshbiYmaTxyLmxlbmd0aDspZT1yW2ldLGUuX18ucGl2b3QmJihuPWUpLGkrKztpZihuKXJldHVybiBuO2ZvcihpPTA7IW4mJmk8ci5sZW5ndGg7KW49dGhpcy5maW5kUGl2b3QocltpXSksaSsrO3JldHVybiBufX0saXNMZWFmOmZ1bmN0aW9uKHQpe3ZhciBlPXQmJnQuY29uc3RydWN0b3I7cmV0dXJuIWV8fGU9PVN0cmluZ3x8ZT09TnVtYmVyfHxlPT1Cb29sZWFufX0sbj17aW5pdDpmdW5jdGlvbih0KXt2YXIgbj17c2V0OmZ1bmN0aW9uKHQsbil7dmFyIHI9dCxpPXRoaXMuX18udHJhbnM7aWYoXCJvYmplY3RcIiE9dHlwZW9mIHQmJihyPXt9LHJbdF09biksIWkpe2Zvcih2YXIgbyBpbiByKWk9aXx8dGhpc1tvXSE9PXJbb107aWYoIWkpcmV0dXJuIGUuZmluZFBpdm90KHRoaXMpfHx0aGlzfXJldHVybiB0aGlzLl9fLnN0b3JlLm5vdGlmeShcIm1lcmdlXCIsdGhpcyxyKX0scmVzZXQ6ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMuX18uc3RvcmUubm90aWZ5KFwicmVwbGFjZVwiLHRoaXMsdCl9LGdldExpc3RlbmVyOmZ1bmN0aW9uKCl7cmV0dXJuIHQuY3JlYXRlTGlzdGVuZXIodGhpcyl9LHRvSlM6ZnVuY3Rpb24oKXt2YXIgdDtyZXR1cm4gdD10aGlzLmNvbnN0cnVjdG9yPT1BcnJheT9uZXcgQXJyYXkodGhpcy5sZW5ndGgpOnt9LGUuZWFjaCh0aGlzLGZ1bmN0aW9uKGUsbil7ZSYmZS5fXz90W25dPWUudG9KUygpOnRbbl09ZX0pLHR9LHRyYW5zYWN0OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX18uc3RvcmUubm90aWZ5KFwidHJhbnNhY3RcIix0aGlzKX0scnVuOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX18uc3RvcmUubm90aWZ5KFwicnVuXCIsdGhpcyl9LG5vdzpmdW5jdGlvbigpe3JldHVybiB0aGlzLl9fLnN0b3JlLm5vdGlmeShcIm5vd1wiLHRoaXMpfSxwaXZvdDpmdW5jdGlvbigpe3JldHVybiB0aGlzLl9fLnN0b3JlLm5vdGlmeShcInBpdm90XCIsdGhpcyl9fSxyPWUuZXh0ZW5kKHtwdXNoOmZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLmFwcGVuZChbdF0pfSxhcHBlbmQ6ZnVuY3Rpb24odCl7cmV0dXJuIHQmJnQubGVuZ3RoP3RoaXMuX18uc3RvcmUubm90aWZ5KFwic3BsaWNlXCIsdGhpcyxbdGhpcy5sZW5ndGgsMF0uY29uY2F0KHQpKTp0aGlzfSxwb3A6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5sZW5ndGg/dGhpcy5fXy5zdG9yZS5ub3RpZnkoXCJzcGxpY2VcIix0aGlzLFt0aGlzLmxlbmd0aC0xLDFdKTp0aGlzfSx1bnNoaWZ0OmZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLnByZXBlbmQoW3RdKX0scHJlcGVuZDpmdW5jdGlvbih0KXtyZXR1cm4gdCYmdC5sZW5ndGg/dGhpcy5fXy5zdG9yZS5ub3RpZnkoXCJzcGxpY2VcIix0aGlzLFswLDBdLmNvbmNhdCh0KSk6dGhpc30sc2hpZnQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5sZW5ndGg/dGhpcy5fXy5zdG9yZS5ub3RpZnkoXCJzcGxpY2VcIix0aGlzLFswLDFdKTp0aGlzfSxzcGxpY2U6ZnVuY3Rpb24odCxlLG4pe3JldHVybiB0aGlzLl9fLnN0b3JlLm5vdGlmeShcInNwbGljZVwiLHRoaXMsYXJndW1lbnRzKX19LG4pLGk9T2JqZWN0LmNyZWF0ZShBcnJheS5wcm90b3R5cGUsZS5jcmVhdGVORShyKSksbz1lLmNyZWF0ZU5FKGUuZXh0ZW5kKHtyZW1vdmU6ZnVuY3Rpb24odCl7dmFyIGU9W10sbj10O3QuY29uc3RydWN0b3IhPUFycmF5JiYobj1bdF0pO2Zvcih2YXIgcj0wLGk9bi5sZW5ndGg7aT5yO3IrKyl0aGlzLmhhc093blByb3BlcnR5KG5bcl0pJiZlLnB1c2gobltyXSk7cmV0dXJuIGUubGVuZ3RoP3RoaXMuX18uc3RvcmUubm90aWZ5KFwicmVtb3ZlXCIsdGhpcyxlKTp0aGlzfX0sbikpLHM9T2JqZWN0LmNyZWF0ZShPYmplY3QucHJvdG90eXBlLG8pLGE9ZnVuY3Rpb24oKXtyZXR1cm5bXS5fX3Byb3RvX18/ZnVuY3Rpb24odCl7dmFyIGU9bmV3IEFycmF5KHQpO3JldHVybiBlLl9fcHJvdG9fXz1pLGV9OmZ1bmN0aW9uKHQpe3ZhciBlPW5ldyBBcnJheSh0KTtmb3IodmFyIG4gaW4gcillW25dPXJbbl07cmV0dXJuIGV9fSgpO3RoaXMuY2xvbmU9ZnVuY3Rpb24odCl7dmFyIGU9dC5jb25zdHJ1Y3RvcjtyZXR1cm4gZT09QXJyYXk/YSh0Lmxlbmd0aCk6ZT09PU9iamVjdD9PYmplY3QuY3JlYXRlKHMpOihjb25zb2xlLmxvZyhcImluc3RhbmNlXCIpLE9iamVjdC5jcmVhdGUoZS5wcm90b3R5cGUsbykpfX19LHI9XCJiZWZvcmVBbGxcIixpPVwiYWZ0ZXJBbGxcIixvPVtyLGldLHM9e29uOmZ1bmN0aW9uKHQsZSxuKXt2YXIgcj10aGlzLl9ldmVudHNbdF18fFtdO3JldHVybiByLnB1c2goe2NhbGxiYWNrOmUsb25jZTpufSksdGhpcy5fZXZlbnRzW3RdPXIsdGhpc30sb25jZTpmdW5jdGlvbih0LGUpe3JldHVybiB0aGlzLm9uKHQsZSwhMCl9LG9mZjpmdW5jdGlvbih0LGUpe2lmKFwidW5kZWZpbmVkXCI9PXR5cGVvZiB0KXRoaXMuX2V2ZW50cz17fTtlbHNlIGlmKFwidW5kZWZpbmVkXCI9PXR5cGVvZiBlKXRoaXMuX2V2ZW50c1t0XT1bXTtlbHNle3ZhciBuLHI9dGhpcy5fZXZlbnRzW3RdfHxbXTtmb3Iobj1yLmxlbmd0aC0xO24+PTA7bi0tKXJbbl0uY2FsbGJhY2s9PT1lJiZyLnNwbGljZShuLDEpfXJldHVybiB0aGlzfSx0cmlnZ2VyOmZ1bmN0aW9uKHQpe3ZhciBlLG4scz1bXS5zbGljZS5jYWxsKGFyZ3VtZW50cywxKSxhPXRoaXMuX2V2ZW50c1t0XXx8W10sZj1bXSxjPS0xIT1vLmluZGV4T2YodCk7Zm9yKGN8fHRoaXMudHJpZ2dlci5hcHBseSh0aGlzLFtyLHRdLmNvbmNhdChzKSksZT0wO2U8YS5sZW5ndGg7ZSsrKW49YVtlXSxuLmNhbGxiYWNrP24uY2FsbGJhY2suYXBwbHkodGhpcyxzKTpuLm9uY2U9ITAsbi5vbmNlJiZmLnB1c2goZSk7Zm9yKGU9Zi5sZW5ndGgtMTtlPj0wO2UtLSlhLnNwbGljZShmW2VdLDEpO3JldHVybiBjfHx0aGlzLnRyaWdnZXIuYXBwbHkodGhpcyxbaSx0XS5jb25jYXQocykpLHRoaXN9fSxhPWUuY3JlYXRlTm9uRW51bWVyYWJsZShzKSxmPXtmcmVlemU6ZnVuY3Rpb24odCxyKXtpZih0JiZ0Ll9fKXJldHVybiB0O3ZhciBpPXRoaXMsbz1uLmNsb25lKHQpO3JldHVybiBlLmFkZE5FKG8se19fOntsaXN0ZW5lcjohMSxwYXJlbnRzOltdLHN0b3JlOnJ9fSksZS5lYWNoKHQsZnVuY3Rpb24odCxuKXtlLmlzTGVhZih0KXx8KHQ9aS5mcmVlemUodCxyKSksdCYmdC5fXyYmaS5hZGRQYXJlbnQodCxvKSxvW25dPXR9KSxyLmZyZWV6ZUZuKG8pLG99LG1lcmdlOmZ1bmN0aW9uKHQsbil7dmFyIHI9dC5fXyxpPXIudHJhbnMsbj1lLmV4dGVuZCh7fSxuKTtpZihpKXtmb3IodmFyIG8gaW4gbilpW29dPW5bb107cmV0dXJuIHR9dmFyIHMsYSxmLGM9dGhpcyx1PXRoaXMuY29weU1ldGEodCksaD1yLnN0b3JlO2UuZWFjaCh0LGZ1bmN0aW9uKHIsaSl7cmV0dXJuIGY9ciYmci5fXyxmJiZjLnJlbW92ZVBhcmVudChyLHQpLChzPW5baV0pPyhlLmlzTGVhZihzKXx8KHM9Yy5mcmVlemUocyxoKSkscyYmcy5fXyYmYy5hZGRQYXJlbnQocyx1KSxkZWxldGUgbltpXSx2b2lkKHVbaV09cykpOihmJiZjLmFkZFBhcmVudChyLHUpLHVbaV09cil9KTtmb3IoYSBpbiBuKXM9blthXSxlLmlzTGVhZihzKXx8KHM9Yy5mcmVlemUocyxoKSkscyYmcy5fXyYmYy5hZGRQYXJlbnQocyx1KSx1W2FdPXM7cmV0dXJuIHIuc3RvcmUuZnJlZXplRm4odSksdGhpcy5yZWZyZXNoUGFyZW50cyh0LHUpLHV9LHJlcGxhY2U6ZnVuY3Rpb24odCxuKXt2YXIgcj10aGlzLGk9dC5fXyxvPW47cmV0dXJuIGUuaXNMZWFmKG4pfHwobz1yLmZyZWV6ZShuLGkuc3RvcmUpLG8uX18ucGFyZW50cz1pLnBhcmVudHMsby5fXy51cGRhdGVSb290PWkudXBkYXRlUm9vdCxpLmxpc3RlbmVyJiYoby5fXy5saXN0ZW5lcj1pLmxpc3RlbmVyKSksbyYmdGhpcy5maXhDaGlsZHJlbihvLHQpLHRoaXMucmVmcmVzaFBhcmVudHModCxvKSxvfSxyZW1vdmU6ZnVuY3Rpb24odCxuKXt2YXIgcj10Ll9fLnRyYW5zO2lmKHIpe2Zvcih2YXIgaT1uLmxlbmd0aC0xO2k+PTA7aS0tKWRlbGV0ZSByW25baV1dO3JldHVybiB0fXZhciBvLHM9dGhpcyxhPXRoaXMuY29weU1ldGEodCk7cmV0dXJuIGUuZWFjaCh0LGZ1bmN0aW9uKGUscil7bz1lJiZlLl9fLG8mJnMucmVtb3ZlUGFyZW50KGUsdCksLTE9PW4uaW5kZXhPZihyKSYmKG8mJnMuYWRkUGFyZW50KGUsYSksYVtyXT1lKX0pLHQuX18uc3RvcmUuZnJlZXplRm4oYSksdGhpcy5yZWZyZXNoUGFyZW50cyh0LGEpLGF9LHNwbGljZTpmdW5jdGlvbih0LG4pe3ZhciByPXQuX18saT1yLnRyYW5zO2lmKGkpcmV0dXJuIGkuc3BsaWNlLmFwcGx5KGksbiksdDt2YXIgbyxzPXRoaXMsYT10aGlzLmNvcHlNZXRhKHQpLGY9blswXSxjPWYrblsxXTtpZihlLmVhY2godCxmdW5jdGlvbihlLG4pe2UmJmUuX18mJihzLnJlbW92ZVBhcmVudChlLHQpLChmPm58fG4+PWMpJiZzLmFkZFBhcmVudChlLGEpKSxhW25dPWV9KSxuLmxlbmd0aD4xKWZvcih2YXIgdT1uLmxlbmd0aC0xO3U+PTI7dS0tKW89blt1XSxlLmlzTGVhZihvKXx8KG89dGhpcy5mcmVlemUobyxyLnN0b3JlKSksbyYmby5fXyYmdGhpcy5hZGRQYXJlbnQobyxhKSxuW3VdPW87cmV0dXJuIEFycmF5LnByb3RvdHlwZS5zcGxpY2UuYXBwbHkoYSxuKSxyLnN0b3JlLmZyZWV6ZUZuKGEpLHRoaXMucmVmcmVzaFBhcmVudHModCxhKSxhfSx0cmFuc2FjdDpmdW5jdGlvbih0KXt2YXIgbixyPXRoaXMsaT10Ll9fLnRyYW5zO3JldHVybiBpP2k6KG49dC5jb25zdHJ1Y3Rvcj09QXJyYXk/W106e30sZS5lYWNoKHQsZnVuY3Rpb24odCxlKXtuW2VdPXR9KSx0Ll9fLnRyYW5zPW4sZS5uZXh0VGljayhmdW5jdGlvbigpe3QuX18udHJhbnMmJnIucnVuKHQpfSksbil9LHJ1bjpmdW5jdGlvbih0KXt2YXIgbj10aGlzLHI9dC5fXy50cmFucztpZighcilyZXR1cm4gdDtlLmVhY2gocixmdW5jdGlvbihlLHIpe2UmJmUuX18mJm4ucmVtb3ZlUGFyZW50KGUsdCl9KSxkZWxldGUgdC5fXy50cmFuczt2YXIgaT10aGlzLnJlcGxhY2UodCxyKTtyZXR1cm4gaX0scGl2b3Q6ZnVuY3Rpb24odCl7cmV0dXJuIHQuX18ucGl2b3Q9MSx0aGlzLnVucGl2b3QodCksdH0sdW5waXZvdDpmdW5jdGlvbih0KXtlLm5leHRUaWNrKGZ1bmN0aW9uKCl7dC5fXy5waXZvdD0wfSl9LHJlZnJlc2g6ZnVuY3Rpb24odCxuLHIpe3ZhciBpPXRoaXMsbz10Ll9fLnRyYW5zLHM9MDtpZihvKXJldHVybiBlLmVhY2gobyxmdW5jdGlvbihlLGEpe3N8fGU9PT1uJiYob1thXT1yLHM9MSxyJiZyLl9fJiZpLmFkZFBhcmVudChyLHQpKX0pLHQ7dmFyIGEsZj10aGlzLmNvcHlNZXRhKHQpO2UuZWFjaCh0LGZ1bmN0aW9uKGUsbyl7ZT09PW4mJihlPXIpLGUmJihhPWUuX18pJiYoaS5yZW1vdmVQYXJlbnQoZSx0KSxpLmFkZFBhcmVudChlLGYpKSxmW29dPWV9KSx0Ll9fLnN0b3JlLmZyZWV6ZUZuKGYpLHRoaXMucmVmcmVzaFBhcmVudHModCxmKX0sZml4Q2hpbGRyZW46ZnVuY3Rpb24odCxuKXt2YXIgcj10aGlzO2UuZWFjaCh0LGZ1bmN0aW9uKGUpe2lmKGUmJmUuX18pe2lmKC0xIT1lLl9fLnBhcmVudHMuaW5kZXhPZih0KSlyZXR1cm4gci5maXhDaGlsZHJlbihlKTtpZigxPT1lLl9fLnBhcmVudHMubGVuZ3RoKXJldHVybiBlLl9fLnBhcmVudHM9W3RdO24mJnIucmVtb3ZlUGFyZW50KGUsbiksci5hZGRQYXJlbnQoZSx0KX19KX0sY29weU1ldGE6ZnVuY3Rpb24odCl7dmFyIHI9bi5jbG9uZSh0KSxpPXQuX187cmV0dXJuIGUuYWRkTkUocix7X186e3N0b3JlOmkuc3RvcmUsdXBkYXRlUm9vdDppLnVwZGF0ZVJvb3QsbGlzdGVuZXI6aS5saXN0ZW5lcixwYXJlbnRzOmkucGFyZW50cy5zbGljZSgwKSx0cmFuczppLnRyYW5zLHBpdm90OmkucGl2b3R9fSksaS5waXZvdCYmdGhpcy51bnBpdm90KHIpLHJ9LHJlZnJlc2hQYXJlbnRzOmZ1bmN0aW9uKHQsZSl7dmFyIG4scj10Ll9fLGk9ci5wYXJlbnRzLmxlbmd0aDtpZih0Ll9fLnVwZGF0ZVJvb3QmJnQuX18udXBkYXRlUm9vdCh0LGUpLGUmJnRoaXMudHJpZ2dlcihlLFwidXBkYXRlXCIsZSxyLnN0b3JlLmxpdmUpLGkpZm9yKG49aS0xO24+PTA7bi0tKXRoaXMucmVmcmVzaChyLnBhcmVudHNbbl0sdCxlKX0scmVtb3ZlUGFyZW50OmZ1bmN0aW9uKHQsZSl7dmFyIG49dC5fXy5wYXJlbnRzLHI9bi5pbmRleE9mKGUpOy0xIT1yJiZuLnNwbGljZShyLDEpfSxhZGRQYXJlbnQ6ZnVuY3Rpb24odCxlKXt2YXIgbj10Ll9fLnBhcmVudHMscj1uLmluZGV4T2YoZSk7LTE9PXImJihuW24ubGVuZ3RoXT1lKX0sdHJpZ2dlcjpmdW5jdGlvbih0LG4scixpKXt2YXIgbz10Ll9fLmxpc3RlbmVyO2lmKG8pe3ZhciBzPW8udGlja2luZztpZihpKXJldHVybiB2b2lkKChzfHxyKSYmKG8udGlja2luZz0wLG8udHJpZ2dlcihuLHN8fHIpKSk7by50aWNraW5nPXIsc3x8ZS5uZXh0VGljayhmdW5jdGlvbigpe2lmKG8udGlja2luZyl7dmFyIHQ9by50aWNraW5nO28udGlja2luZz0wLG8udHJpZ2dlcihuLHQpfX0pfX0sY3JlYXRlTGlzdGVuZXI6ZnVuY3Rpb24odCl7dmFyIGU9dC5fXy5saXN0ZW5lcjtyZXR1cm4gZXx8KGU9T2JqZWN0LmNyZWF0ZShhLHtfZXZlbnRzOnt2YWx1ZTp7fSx3cml0YWJsZTohMH19KSx0Ll9fLmxpc3RlbmVyPWUpLGV9fTtuLmluaXQoZik7dmFyIGM9ZnVuY3Rpb24odCxuKXt2YXIgcixpPXRoaXMsbz1ufHx7fSxzPXtsaXZlOm8ubGl2ZXx8ITF9LGE9W10sYz0wLHU9ZnVuY3Rpb24odCl7dmFyIGUsbj10Ll9fO2ZvcihuLmxpc3RlbmVyJiZmLnRyaWdnZXIodCxcInVwZGF0ZVwiLDAsITApLGU9MDtlPG4ucGFyZW50cy5sZW5ndGg7ZSsrKW4uc3RvcmUubm90aWZ5KFwibm93XCIsbi5wYXJlbnRzW2VdKX0saD1mdW5jdGlvbih0KXthLnB1c2godCksY3x8KGM9MSxlLm5leHRUaWNrKGZ1bmN0aW9uKCl7YT1bXSxjPTB9KSl9O3Mubm90aWZ5PWZ1bmN0aW9uKHQsbixyKXtpZihcIm5vd1wiPT10KXtpZihhLmxlbmd0aClmb3IoO2EubGVuZ3RoOyl1KGEuc2hpZnQoKSk7ZWxzZSB1KG4pO3JldHVybiBufXZhciBpPWZbdF0obixyKTtpZihcInBpdm90XCIhPXQpe3ZhciBvPWUuZmluZFBpdm90KGkpO2lmKG8pcmV0dXJuIGgoaSksb31yZXR1cm4gaX0scy5mcmVlemVGbj1vLm11dGFibGU9PT0hMD9mdW5jdGlvbigpe306ZnVuY3Rpb24odCl7T2JqZWN0LmZyZWV6ZSh0KX0scj1mLmZyZWV6ZSh0LHMpLHIuX18udXBkYXRlUm9vdD1mdW5jdGlvbih0LGUpe3Q9PT1yJiYocj1lKX07dmFyIF89ci5nZXRMaXN0ZW5lcigpLGw9e307ZS5lYWNoKFtcIm9uXCIsXCJvZmZcIixcIm9uY2VcIixcInRyaWdnZXJcIl0sZnVuY3Rpb24odCl7dmFyIG49e307blt0XT1fW3RdLmJpbmQoXyksZS5hZGRORShpLG4pLGUuYWRkTkUobCxuKX0pLGUuYWRkTkUodGhpcyx7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHJ9LHNldDpmdW5jdGlvbih0KXtjb25zb2xlLmxvZyhcInNldHRpbmdcIiksci5yZXNldCh0KX0sZ2V0RXZlbnRIdWI6ZnVuY3Rpb24oKXtyZXR1cm4gbH19KSxlLmFkZE5FKHRoaXMse2dldERhdGE6dGhpcy5nZXQsc2V0RGF0YTp0aGlzLnNldH0pfTtyZXR1cm4gY30pOyIsIi8qISBDb3B5cmlnaHQgKGMpIDIwMTYgTmF1ZmFsIFJhYmJhbmkgKGh0dHA6Ly9naXRodWIuY29tL0Jvc05hdWZhbClcbiogTGljZW5zZWQgVW5kZXIgTUlUIChodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUKVxuKlxuKiBbIFZ1ZSBGcmVlemUgSlMgXVxuKiAgIFZlcnNpb24gMS4wLjBcbipcbiovXG5pbXBvcnQgRnJlZXplciBmcm9tICcuL2ZyZWV6ZXIubWluLmpzJ1xuXG4oZnVuY3Rpb24oKXtcblxuXHR2YXIgVnVlRnJlZXplID0ge1xuXG5cdFx0aW5zdGFsbChWdWUsb3B0KXtcblxuXG5cdFx0XHQvLyBDaGVjayB0aGUgRnJlZXplclxuXHRcdFx0aWYoIHR5cGVvZiBGcmVlemVyID09ICd1bmRlZmluZWQnICkgY29uc29sZS53YXJuKCdbVnVlIEZyZWV6ZV06IFlvdSBNdXN0IEluc3RhbGwgRnJlZXplci5qcyBmaXJzIScpXG5cblx0XHRcdHZhciBwbHVnaW4gPSB0aGlzXG5cblx0XHRcdC8vIFBsdWdpbiBTdG9yZVxuICAgICAgaWYodHlwZW9mIG9wdCAgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdbVnVlIEZyZWV6ZV06IFBsZWFzZSBTcGVjaWZ5IHRoZSBzdG9yZSEgVmlhIFZ1ZS51c2UgT3B0aW9ucyEnKVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cblx0XHRcdGVsc2Uge1xuICAgICAgICAvLyBsaXZlIHVwZGF0ZT9cbiAgICAgICAgdmFyIGxpdmUgPSBvcHQubGl2ZSA/IG9wdC5saXZlIDogdHJ1ZVxuICAgICAgICAvLyBtYWtlIG91ciBzdG9yZSFcbiAgICAgICAgdmFyIHN0b3JlID0gIG5ldyBGcmVlemVyKG9wdC5zdGF0ZSx7bGl2ZTpsaXZlfSlcblx0XHRcdFx0Ly8gYmluZGluZyB0aGUgc3RvcmVcbiAgICAgICAgb3B0LmFjdGlvbihzdG9yZSlcbiAgICAgIH1cblxuXHRcdFx0Ly8gTWFrZSBhIG1peGluXG5cdFx0XHRwbHVnaW4ubWl4aW4gPSB7fVxuXG5cdFx0XHQvLyBNaXhpbiBNZXRob2RzIEZvciB2bSBpbnN0YW5jZVxuXHRcdFx0cGx1Z2luLm1peGluLm1ldGhvZHMgPSB7XG5cdFx0XHRcdC8vIEZvciBtdXRhYmxlIGRhdGFcblx0XHRcdFx0bXV0YWJsZShkYXRhKXtcblx0XHRcdFx0XHRyZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShkYXRhKSlcblx0XHRcdFx0fSxcblxuXHRcdFx0XHQvLyBzZXQgdGhlIHZtICRzdGF0ZSB0byBuZXcgc3RhdGVcblx0XHQgICAgdXBkYXRlU3RhdGUob2xkLHZhbCl7XG5cdFx0XHRcdFx0dGhpcy4kc2V0KCckc3RhdGUnLHN0b3JlLmdldCgpKVxuXHRcdCAgICB9XG5cdFx0XHR9XG5cblx0XHRcdC8vIE1peGluIENyZWF0ZWQgRXZlbnRcblx0XHRcdHBsdWdpbi5taXhpbi5jcmVhdGVkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBtZSA9IHRoaXNcblxuXHRcdFx0XHQvLyBNYWtlIE1ldGhvZHNcblx0XHRcdFx0VnVlLnV0aWwuZGVmaW5lUmVhY3RpdmUodGhpcywnJHN0b3JlJyxzdG9yZSlcblx0XHRcdFx0VnVlLnV0aWwuZGVmaW5lUmVhY3RpdmUodGhpcywnJHN0YXRlJyxzdG9yZS5nZXQoKSlcblx0XHQgICAgVnVlLnV0aWwuZGVmaW5lUmVhY3RpdmUodGhpcywnJGFjdGlvbicsIGZ1bmN0aW9uKGV2ZW50TmFtZSxhcmdzKXtcblx0XHRcdFx0XHQvLyB0cmlnZ2VyIGZyZWV6ZSBldmVudCB3aXRoIHBhc3MgdGhlIG9sZCB2YWx1ZSBhdCB0aGUgZW5kXG5cdFx0XHRcdFx0c3RvcmUudHJpZ2dlcihldmVudE5hbWUsYXJncyxtZS4kc3RhdGUpXG5cdFx0XHRcdH0pXG5cblx0XHRcdFx0Ly8gV2hlbiBTdG9yZSBVcGRhdGVkflxuXHRcdCAgICB0aGlzLiRzdG9yZS5vbigndXBkYXRlJywgZnVuY3Rpb24gKHZhbCkge1xuXHRcdFx0XHRcdC8vIFVwZGF0ZSB0aGUgc3RhdGVcblx0XHQgICAgICBtZS51cGRhdGVTdGF0ZShtZS4kc3RhdGUsdmFsKVxuXHRcdCAgICB9KVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBNZXJnZSBtaXhpbiB0byBWTSB2aWEgdnVlIG9wdGlvbnNcblx0XHRcdFZ1ZS5vcHRpb25zID0gVnVlLnV0aWwubWVyZ2VPcHRpb25zKFZ1ZS5vcHRpb25zLCBwbHVnaW4ubWl4aW4pXG5cblx0XHR9IC8vIGluc3RhbGwoKVxuXG5cblx0fSAvLyBWdWVGcmVlemVcblxuXG5cdC8vIElmIHN1cHBvcnQgbm9kZSAvIEVTNiBtb2R1bGVcblx0aWYoIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzICl7XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBWdWVGcmVlemVcblx0fVxuXHQvLyBpZiB1c2luZyByZXF1aXJlIGpzXG5cdGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcblx0XHRkZWZpbmUoKCkgPT4geyByZXR1cm4gVnVlRnJlZXplIH0pXG5cdH1cblx0Ly8gaWYgc2NyaXB0IGxvYWRlZCBieSBzY3JpcHQgdGFnIGluIEhUTUwgZmlsZVxuXHRpZiAodHlwZW9mIHdpbmRvdyAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0d2luZG93LlZ1ZUZyZWV6ZSA9IFZ1ZUZyZWV6ZVxuXHR9XG5cbn0pKCk7XG4iXX0=
