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

			var cleanUpData = function cleanUpData(data) {
				return JSON.parse(JSON.stringify(data));
			};

			// Make a mixin
			plugin.mixin = {};

			// Mixin Methods For vm instance
			plugin.mixin.methods = {
				// set the vm $state to new state

				updateState: function updateState(old, val) {
					this.$set('$state', cleanUpData(store.get()));
				}
			};

			// Mixin Created Event
			plugin.mixin.created = function () {
				var me = this;

				// Make Methods
				Vue.util.defineReactive(this, '$store', store);
				Vue.util.defineReactive(this, '$state', cleanUpData(store.get()));
				Vue.util.defineReactive(this, '$action', function (eventName, args) {
					// trigger freeze event with pass the old value at the end
					store.trigger(eventName, args, me.$state);
				});

				// When Store Updated~
				this.$store.on('update', function (val) {
					// Update the state
					me.updateState(cleanUpData(me.$state), val);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Vzci9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsInNyYy9mcmVlemVyLm1pbi5qcyIsInNyYy92dWUtZnJlZXplLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FDS0EsQ0FBQyxVQUFTLENBQVQsRUFBVyxDQUFYLEVBQWE7QUFBQyxnQkFBWSxPQUFPLE1BQVAsSUFBZSxPQUFPLEdBQVAsR0FBVyxPQUFPLEVBQVAsRUFBVSxDQUFWLENBQXRDLEdBQW1ELG9CQUFpQix5REFBakIsR0FBeUIsT0FBTyxPQUFQLEdBQWUsR0FBZixHQUFtQixFQUFFLE9BQUYsR0FBVSxHQUFWLENBQWhHO0NBQWIsWUFBaUksWUFBVTtBQUFDLGVBQUQ7QUFBYyxNQUFJLElBQUUsSUFBSSxRQUFKLENBQWEsYUFBYixHQUFGO01BQWdDLElBQUUsRUFBQyxRQUFPLGdCQUFTLENBQVQsRUFBVyxDQUFYLEVBQWE7QUFBQyxXQUFJLElBQUksQ0FBSixJQUFTLENBQWI7QUFBZSxVQUFFLENBQUYsSUFBSyxFQUFFLENBQUYsQ0FBTDtPQUFmLE9BQWdDLENBQVAsQ0FBMUI7S0FBYixFQUFpRCxxQkFBb0IsNkJBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYTtBQUFDLFVBQUksSUFBRSxFQUFGLENBQUwsS0FBYyxJQUFJLENBQUosSUFBUyxDQUFiO0FBQWUsVUFBRSxDQUFGLElBQUssRUFBQyxPQUFNLEVBQUUsQ0FBRixDQUFOLEVBQU47T0FBZixPQUF3QyxPQUFPLE1BQVAsQ0FBYyxLQUFHLEVBQUgsRUFBTSxDQUFwQixDQUFQLENBQTNDO0tBQWIsRUFBdUYsT0FBTSxlQUFTLENBQVQsRUFBVztBQUFDLFVBQUksSUFBRSxJQUFJLEtBQUosQ0FBVSxDQUFWLENBQUYsQ0FBTCxJQUF1QixPQUFILEVBQVcsT0FBTyxRQUFRLEtBQVIsQ0FBYyxDQUFkLENBQVAsQ0FBWCxNQUF5QyxDQUFOLENBQXZEO0tBQVgsRUFBMkUsTUFBSyxjQUFTLENBQVQsRUFBVyxDQUFYLEVBQWE7QUFBQyxVQUFJLENBQUosRUFBTSxDQUFOLEVBQVEsQ0FBUixDQUFELElBQWMsS0FBRyxFQUFFLFdBQUYsSUFBZSxLQUFmLEVBQXFCLEtBQUksSUFBRSxDQUFGLEVBQUksSUFBRSxFQUFFLE1BQUYsRUFBUyxJQUFFLENBQUYsRUFBSSxHQUF2QjtBQUEyQixVQUFFLEVBQUUsQ0FBRixDQUFGLEVBQU8sQ0FBUDtPQUEzQixNQUEwQyxLQUFJLElBQUUsT0FBTyxJQUFQLENBQVksQ0FBWixDQUFGLEVBQWlCLElBQUUsQ0FBRixFQUFJLElBQUUsRUFBRSxNQUFGLEVBQVMsSUFBRSxDQUFGLEVBQUksR0FBeEM7QUFBNEMsVUFBRSxFQUFFLEVBQUUsQ0FBRixDQUFGLENBQUYsRUFBVSxFQUFFLENBQUYsQ0FBVjtPQUE1QztLQUE3RixFQUEwSixPQUFNLGVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYTtBQUFDLFdBQUksSUFBSSxDQUFKLElBQVMsQ0FBYjtBQUFlLGVBQU8sY0FBUCxDQUFzQixDQUF0QixFQUF3QixDQUF4QixFQUEwQixFQUFDLFlBQVcsQ0FBQyxDQUFELEVBQUcsY0FBYSxDQUFDLENBQUQsRUFBRyxVQUFTLENBQUMsQ0FBRCxFQUFHLE9BQU0sRUFBRSxDQUFGLENBQU4sRUFBckU7T0FBZjtLQUFkLEVBQWdILFVBQVMsa0JBQVMsQ0FBVCxFQUFXO0FBQUMsVUFBSSxJQUFFLEVBQUYsQ0FBTCxLQUFjLElBQUksQ0FBSixJQUFTLENBQWI7QUFBZSxVQUFFLENBQUYsSUFBSyxFQUFDLFVBQVMsQ0FBQyxDQUFELEVBQUcsY0FBYSxDQUFDLENBQUQsRUFBRyxZQUFXLENBQUMsQ0FBRCxFQUFHLE9BQU0sRUFBRSxDQUFGLENBQU4sRUFBaEQ7T0FBZixPQUFrRixDQUFQLENBQXJGO0tBQVgsRUFBMEcsVUFBUyxZQUFVO0FBQUMsZUFBUyxDQUFULEdBQVk7QUFBQyxlQUFLLElBQUUsRUFBRSxLQUFGLEVBQUY7QUFBYTtTQUFsQixDQUFzQixHQUFFLENBQUMsQ0FBRCxDQUF6QjtPQUFaLFNBQWlELENBQVQsQ0FBVyxDQUFYLEVBQWE7QUFBQyxVQUFFLElBQUYsQ0FBTyxDQUFQLEdBQVUsTUFBSSxJQUFFLENBQUMsQ0FBRCxFQUFHLEdBQUwsQ0FBSixDQUFYO09BQWIsSUFBMEMsQ0FBSjtVQUFNLElBQUUsRUFBRjtVQUFLLElBQUUsQ0FBQyxDQUFEO1VBQUcsSUFBRSxDQUFDLENBQUMsRUFBRSxXQUFGLElBQWUsZUFBYSxPQUFPLE1BQVAsSUFBZSxhQUFhLE1BQWI7VUFBb0IsSUFBRSxVQUFGO1VBQWEsSUFBRSxZQUFVO0FBQUMsZUFBTyxJQUFFLFlBQVU7QUFBQyxZQUFFLFdBQUYsQ0FBYyxDQUFkLEVBQWdCLEdBQWhCLEVBQUQ7U0FBVixHQUFpQyxZQUFVO0FBQUMscUJBQVcsWUFBVTtBQUFDLGdCQUFEO1dBQVYsRUFBZ0IsQ0FBM0IsRUFBRDtTQUFWLENBQTNDO09BQVYsRUFBRjtVQUFvRyxJQUFFLFlBQVU7QUFBQyxlQUFPLElBQUUsVUFBUyxDQUFULEVBQVc7QUFBQyxZQUFFLE1BQUYsS0FBVyxDQUFYLElBQWMsRUFBRSxJQUFGLEtBQVMsQ0FBVCxLQUFhLEVBQUUsZUFBRixJQUFvQixHQUFwQixDQUEzQixDQUFEO1NBQVgsR0FBaUUsQ0FBbkUsQ0FBUjtPQUFWLEVBQUYsQ0FBblIsT0FBc1gsS0FBRyxFQUFFLGdCQUFGLENBQW1CLFNBQW5CLEVBQTZCLENBQTdCLEVBQStCLENBQUMsQ0FBRCxDQUFsQyxFQUFzQyxFQUFFLGNBQUYsR0FBaUIsWUFBVTtBQUFDLFVBQUUsbUJBQUYsQ0FBc0IsU0FBdEIsRUFBZ0MsQ0FBaEMsRUFBa0MsQ0FBQyxDQUFELENBQWxDLENBQUQ7T0FBVixFQUFrRCxDQUF6RyxDQUF0WDtLQUFWLEVBQVQsRUFBdWYsV0FBVSxtQkFBUyxDQUFULEVBQVc7QUFBQyxVQUFHLEtBQUcsRUFBRSxFQUFGLEVBQUs7QUFBQyxZQUFHLEVBQUUsRUFBRixDQUFLLEtBQUwsRUFBVyxPQUFPLENBQVAsQ0FBZCxLQUEyQixJQUFJLENBQUosRUFBTSxJQUFFLENBQUYsRUFBSSxJQUFFLEVBQUUsRUFBRixDQUFLLE9BQUwsRUFBYSxJQUFFLENBQUYsRUFBSSxDQUFDLENBQUQsSUFBSSxJQUFFLEVBQUUsTUFBRjtBQUFVLGNBQUUsRUFBRSxDQUFGLENBQUYsRUFBTyxFQUFFLEVBQUYsQ0FBSyxLQUFMLEtBQWEsSUFBRSxDQUFGLENBQWIsRUFBa0IsR0FBekI7U0FBakQsSUFBaUYsQ0FBSCxFQUFLLE9BQU8sQ0FBUCxDQUFMLEtBQWtCLElBQUUsQ0FBRixFQUFJLENBQUMsQ0FBRCxJQUFJLElBQUUsRUFBRSxNQUFGO0FBQVUsY0FBRSxLQUFLLFNBQUwsQ0FBZSxFQUFFLENBQUYsQ0FBZixDQUFGLEVBQXVCLEdBQXZCO1NBQXhCLE9BQTBELENBQVAsQ0FBdks7T0FBWDtLQUFaLEVBQXlNLFFBQU8sZ0JBQVMsQ0FBVCxFQUFXO0FBQUMsVUFBSSxJQUFFLEtBQUcsRUFBRSxXQUFGLENBQVYsT0FBOEIsQ0FBQyxDQUFELElBQUksS0FBRyxNQUFILElBQVcsS0FBRyxNQUFILElBQVcsS0FBRyxPQUFILENBQXhEO0tBQVgsRUFBaDFDO01BQWc2QyxJQUFFLEVBQUMsTUFBSyxjQUFTLENBQVQsRUFBVztBQUFDLFVBQUksSUFBRSxFQUFDLEtBQUksYUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhO0FBQUMsY0FBSSxJQUFFLENBQUY7Y0FBSSxJQUFFLEtBQUssRUFBTCxDQUFRLEtBQVIsQ0FBWCxJQUE0QixvQkFBaUIsNkNBQWpCLEtBQXFCLElBQUUsRUFBRixFQUFLLEVBQUUsQ0FBRixJQUFLLENBQUwsQ0FBMUIsRUFBa0MsQ0FBQyxDQUFELEVBQUc7QUFBQyxpQkFBSSxJQUFJLENBQUosSUFBUyxDQUFiO0FBQWUsa0JBQUUsS0FBRyxLQUFLLENBQUwsTUFBVSxFQUFFLENBQUYsQ0FBVjthQUFwQixJQUFzQyxDQUFDLENBQUQsRUFBRyxPQUFPLEVBQUUsU0FBRixDQUFZLElBQVosS0FBbUIsSUFBbkIsQ0FBYjtXQUE1RSxPQUF3SCxLQUFLLEVBQUwsQ0FBUSxLQUFSLENBQWMsTUFBZCxDQUFxQixPQUFyQixFQUE2QixJQUE3QixFQUFrQyxDQUFsQyxDQUFQLENBQTFJO1NBQWIsRUFBb00sT0FBTSxlQUFTLENBQVQsRUFBVztBQUFDLGlCQUFPLEtBQUssRUFBTCxDQUFRLEtBQVIsQ0FBYyxNQUFkLENBQXFCLFNBQXJCLEVBQStCLElBQS9CLEVBQW9DLENBQXBDLENBQVAsQ0FBRDtTQUFYLEVBQTJELGFBQVksdUJBQVU7QUFBQyxpQkFBTyxFQUFFLGNBQUYsQ0FBaUIsSUFBakIsQ0FBUCxDQUFEO1NBQVYsRUFBMEMsTUFBSyxnQkFBVTtBQUFDLGNBQUksQ0FBSixDQUFELE9BQWMsSUFBRSxLQUFLLFdBQUwsSUFBa0IsS0FBbEIsR0FBd0IsSUFBSSxLQUFKLENBQVUsS0FBSyxNQUFMLENBQWxDLEdBQStDLEVBQS9DLEVBQWtELEVBQUUsSUFBRixDQUFPLElBQVAsRUFBWSxVQUFTLENBQVQsRUFBVyxDQUFYLEVBQWE7QUFBQyxpQkFBRyxFQUFFLEVBQUYsR0FBSyxFQUFFLENBQUYsSUFBSyxFQUFFLElBQUYsRUFBTCxHQUFjLEVBQUUsQ0FBRixJQUFLLENBQUwsQ0FBdkI7V0FBYixDQUFoRSxFQUE2RyxDQUE3RyxDQUFkO1NBQVYsRUFBd0ksVUFBUyxvQkFBVTtBQUFDLGlCQUFPLEtBQUssRUFBTCxDQUFRLEtBQVIsQ0FBYyxNQUFkLENBQXFCLFVBQXJCLEVBQWdDLElBQWhDLENBQVAsQ0FBRDtTQUFWLEVBQXlELEtBQUksZUFBVTtBQUFDLGlCQUFPLEtBQUssRUFBTCxDQUFRLEtBQVIsQ0FBYyxNQUFkLENBQXFCLEtBQXJCLEVBQTJCLElBQTNCLENBQVAsQ0FBRDtTQUFWLEVBQW9ELEtBQUksZUFBVTtBQUFDLGlCQUFPLEtBQUssRUFBTCxDQUFRLEtBQVIsQ0FBYyxNQUFkLENBQXFCLEtBQXJCLEVBQTJCLElBQTNCLENBQVAsQ0FBRDtTQUFWLEVBQW9ELE9BQU0saUJBQVU7QUFBQyxpQkFBTyxLQUFLLEVBQUwsQ0FBUSxLQUFSLENBQWMsTUFBZCxDQUFxQixPQUFyQixFQUE2QixJQUE3QixDQUFQLENBQUQ7U0FBVixFQUF2b0I7VUFBOHJCLElBQUUsRUFBRSxNQUFGLENBQVMsRUFBQyxNQUFLLGNBQVMsQ0FBVCxFQUFXO0FBQUMsaUJBQU8sS0FBSyxNQUFMLENBQVksQ0FBQyxDQUFELENBQVosQ0FBUCxDQUFEO1NBQVgsRUFBcUMsUUFBTyxnQkFBUyxDQUFULEVBQVc7QUFBQyxpQkFBTyxLQUFHLEVBQUUsTUFBRixHQUFTLEtBQUssRUFBTCxDQUFRLEtBQVIsQ0FBYyxNQUFkLENBQXFCLFFBQXJCLEVBQThCLElBQTlCLEVBQW1DLENBQUMsS0FBSyxNQUFMLEVBQVksQ0FBYixFQUFnQixNQUFoQixDQUF1QixDQUF2QixDQUFuQyxDQUFaLEdBQTBFLElBQTFFLENBQVI7U0FBWCxFQUFtRyxLQUFJLGVBQVU7QUFBQyxpQkFBTyxLQUFLLE1BQUwsR0FBWSxLQUFLLEVBQUwsQ0FBUSxLQUFSLENBQWMsTUFBZCxDQUFxQixRQUFyQixFQUE4QixJQUE5QixFQUFtQyxDQUFDLEtBQUssTUFBTCxHQUFZLENBQVosRUFBYyxDQUFmLENBQW5DLENBQVosR0FBa0UsSUFBbEUsQ0FBUjtTQUFWLEVBQTBGLFNBQVEsaUJBQVMsQ0FBVCxFQUFXO0FBQUMsaUJBQU8sS0FBSyxPQUFMLENBQWEsQ0FBQyxDQUFELENBQWIsQ0FBUCxDQUFEO1NBQVgsRUFBc0MsU0FBUSxpQkFBUyxDQUFULEVBQVc7QUFBQyxpQkFBTyxLQUFHLEVBQUUsTUFBRixHQUFTLEtBQUssRUFBTCxDQUFRLEtBQVIsQ0FBYyxNQUFkLENBQXFCLFFBQXJCLEVBQThCLElBQTlCLEVBQW1DLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBTSxNQUFOLENBQWEsQ0FBYixDQUFuQyxDQUFaLEdBQWdFLElBQWhFLENBQVI7U0FBWCxFQUF5RixPQUFNLGlCQUFVO0FBQUMsaUJBQU8sS0FBSyxNQUFMLEdBQVksS0FBSyxFQUFMLENBQVEsS0FBUixDQUFjLE1BQWQsQ0FBcUIsUUFBckIsRUFBOEIsSUFBOUIsRUFBbUMsQ0FBQyxDQUFELEVBQUcsQ0FBSCxDQUFuQyxDQUFaLEdBQXNELElBQXRELENBQVI7U0FBVixFQUE4RSxRQUFPLGdCQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlO0FBQUMsaUJBQU8sS0FBSyxFQUFMLENBQVEsS0FBUixDQUFjLE1BQWQsQ0FBcUIsUUFBckIsRUFBOEIsSUFBOUIsRUFBbUMsU0FBbkMsQ0FBUCxDQUFEO1NBQWYsRUFBdGUsRUFBNmlCLENBQTdpQixDQUFGO1VBQWtqQixJQUFFLE9BQU8sTUFBUCxDQUFjLE1BQU0sU0FBTixFQUFnQixFQUFFLFFBQUYsQ0FBVyxDQUFYLENBQTlCLENBQUY7VUFBK0MsSUFBRSxFQUFFLFFBQUYsQ0FBVyxFQUFFLE1BQUYsQ0FBUyxFQUFDLFFBQU8sZ0JBQVMsQ0FBVCxFQUFXO0FBQUMsY0FBSSxJQUFFLEVBQUY7Y0FBSyxJQUFFLENBQUYsQ0FBVixDQUFjLENBQUUsV0FBRixJQUFlLEtBQWYsS0FBdUIsSUFBRSxDQUFDLENBQUQsQ0FBRixDQUF2QixDQUFkLEtBQWdELElBQUksSUFBRSxDQUFGLEVBQUksSUFBRSxFQUFFLE1BQUYsRUFBUyxJQUFFLENBQUYsRUFBSSxHQUEzQjtBQUErQixpQkFBSyxjQUFMLENBQW9CLEVBQUUsQ0FBRixDQUFwQixLQUEyQixFQUFFLElBQUYsQ0FBTyxFQUFFLENBQUYsQ0FBUCxDQUEzQjtXQUEvQixPQUE4RSxFQUFFLE1BQUYsR0FBUyxLQUFLLEVBQUwsQ0FBUSxLQUFSLENBQWMsTUFBZCxDQUFxQixRQUFyQixFQUE4QixJQUE5QixFQUFtQyxDQUFuQyxDQUFULEdBQStDLElBQS9DLENBQTFIO1NBQVgsRUFBakIsRUFBNE0sQ0FBNU0sQ0FBWCxDQUFGO1VBQTZOLElBQUUsT0FBTyxNQUFQLENBQWMsT0FBTyxTQUFQLEVBQWlCLENBQS9CLENBQUY7VUFBb0MsSUFBRSxZQUFVO0FBQUMsZUFBTSxHQUFHLFNBQUgsR0FBYSxVQUFTLENBQVQsRUFBVztBQUFDLGNBQUksSUFBRSxJQUFJLEtBQUosQ0FBVSxDQUFWLENBQUYsQ0FBTCxPQUEyQixFQUFFLFNBQUYsR0FBWSxDQUFaLEVBQWMsQ0FBZCxDQUEzQjtTQUFYLEdBQXVELFVBQVMsQ0FBVCxFQUFXO0FBQUMsY0FBSSxJQUFFLElBQUksS0FBSixDQUFVLENBQVYsQ0FBRixDQUFMLEtBQXdCLElBQUksQ0FBSixJQUFTLENBQWI7QUFBZSxjQUFFLENBQUYsSUFBSyxFQUFFLENBQUYsQ0FBTDtXQUFmLE9BQWdDLENBQVAsQ0FBN0M7U0FBWCxDQUEzRTtPQUFWLEVBQUYsQ0FBcmlELElBQWlzRCxDQUFLLEtBQUwsR0FBVyxVQUFTLENBQVQsRUFBVztBQUFDLFlBQUksSUFBRSxFQUFFLFdBQUYsQ0FBUCxPQUE0QixLQUFHLEtBQUgsR0FBUyxFQUFFLEVBQUUsTUFBRixDQUFYLEdBQXFCLE1BQUksTUFBSixHQUFXLE9BQU8sTUFBUCxDQUFjLENBQWQsQ0FBWCxJQUE2QixRQUFRLEdBQVIsQ0FBWSxVQUFaLEdBQXdCLE9BQU8sTUFBUCxDQUFjLEVBQUUsU0FBRixFQUFZLENBQTFCLENBQXhCLENBQTdCLENBQWpEO09BQVgsQ0FBNXNEO0tBQVgsRUFBUjtNQUFpM0QsSUFBRSxXQUFGO01BQWMsSUFBRSxVQUFGO01BQWEsSUFBRSxDQUFDLENBQUQsRUFBRyxDQUFILENBQUY7TUFBUSxJQUFFLEVBQUMsSUFBRyxZQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlO0FBQUMsVUFBSSxJQUFFLEtBQUssT0FBTCxDQUFhLENBQWIsS0FBaUIsRUFBakIsQ0FBUCxPQUFrQyxFQUFFLElBQUYsQ0FBTyxFQUFDLFVBQVMsQ0FBVCxFQUFXLE1BQUssQ0FBTCxFQUFuQixHQUE0QixLQUFLLE9BQUwsQ0FBYSxDQUFiLElBQWdCLENBQWhCLEVBQWtCLElBQTlDLENBQWxDO0tBQWYsRUFBcUcsTUFBSyxjQUFTLENBQVQsRUFBVyxDQUFYLEVBQWE7QUFBQyxhQUFPLEtBQUssRUFBTCxDQUFRLENBQVIsRUFBVSxDQUFWLEVBQVksQ0FBQyxDQUFELENBQW5CLENBQUQ7S0FBYixFQUFzQyxLQUFJLGFBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYTtBQUFDLFVBQUcsZUFBYSxPQUFPLENBQVAsRUFBUyxLQUFLLE9BQUwsR0FBYSxFQUFiLENBQXpCLEtBQThDLElBQUcsZUFBYSxPQUFPLENBQVAsRUFBUyxLQUFLLE9BQUwsQ0FBYSxDQUFiLElBQWdCLEVBQWhCLENBQXpCLEtBQWdEO0FBQUMsWUFBSSxDQUFKO1lBQU0sSUFBRSxLQUFLLE9BQUwsQ0FBYSxDQUFiLEtBQWlCLEVBQWpCLENBQVQsS0FBaUMsSUFBRSxFQUFFLE1BQUYsR0FBUyxDQUFULEVBQVcsS0FBRyxDQUFILEVBQUssR0FBdEI7QUFBMEIsWUFBRSxDQUFGLEVBQUssUUFBTCxLQUFnQixDQUFoQixJQUFtQixFQUFFLE1BQUYsQ0FBUyxDQUFULEVBQVcsQ0FBWCxDQUFuQjtTQUExQjtPQUE3RSxPQUErSSxJQUFQLENBQXZMO0tBQWIsRUFBaU4sU0FBUSxpQkFBUyxDQUFULEVBQVc7QUFBQyxVQUFJLENBQUo7VUFBTSxDQUFOO1VBQVEsSUFBRSxHQUFHLEtBQUgsQ0FBUyxJQUFULENBQWMsU0FBZCxFQUF3QixDQUF4QixDQUFGO1VBQTZCLElBQUUsS0FBSyxPQUFMLENBQWEsQ0FBYixLQUFpQixFQUFqQjtVQUFvQixJQUFFLEVBQUY7VUFBSyxJQUFFLENBQUMsQ0FBRCxJQUFJLEVBQUUsT0FBRixDQUFVLENBQVYsQ0FBSixDQUFuRSxLQUF3RixLQUFHLEtBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsSUFBbkIsRUFBd0IsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFNLE1BQU4sQ0FBYSxDQUFiLENBQXhCLENBQUgsRUFBNEMsSUFBRSxDQUFGLEVBQUksSUFBRSxFQUFFLE1BQUYsRUFBUyxHQUEvRDtBQUFtRSxZQUFFLEVBQUUsQ0FBRixDQUFGLEVBQU8sRUFBRSxRQUFGLEdBQVcsRUFBRSxRQUFGLENBQVcsS0FBWCxDQUFpQixJQUFqQixFQUFzQixDQUF0QixDQUFYLEdBQW9DLEVBQUUsSUFBRixHQUFPLENBQUMsQ0FBRCxFQUFHLEVBQUUsSUFBRixJQUFRLEVBQUUsSUFBRixDQUFPLENBQVAsQ0FBUjtPQUF4SCxLQUE4SSxJQUFFLEVBQUUsTUFBRixHQUFTLENBQVQsRUFBVyxLQUFHLENBQUgsRUFBSyxHQUF0QjtBQUEwQixVQUFFLE1BQUYsQ0FBUyxFQUFFLENBQUYsQ0FBVCxFQUFjLENBQWQ7T0FBMUIsT0FBa0QsS0FBRyxLQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLElBQW5CLEVBQXdCLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBTSxNQUFOLENBQWEsQ0FBYixDQUF4QixDQUFILEVBQTRDLElBQTVDLENBQWhSO0tBQVgsRUFBblg7TUFBaXNCLElBQUUsRUFBRSxtQkFBRixDQUFzQixDQUF0QixDQUFGO01BQTJCLElBQUUsRUFBQyxRQUFPLGdCQUFTLENBQVQsRUFBVyxDQUFYLEVBQWE7QUFBQyxVQUFHLEtBQUcsRUFBRSxFQUFGLEVBQUssT0FBTyxDQUFQLENBQVgsSUFBd0IsSUFBRSxJQUFGO1VBQU8sSUFBRSxFQUFFLEtBQUYsQ0FBUSxDQUFSLENBQUYsQ0FBaEMsT0FBb0QsRUFBRSxLQUFGLENBQVEsQ0FBUixFQUFVLEVBQUMsSUFBRyxFQUFDLFVBQVMsQ0FBQyxDQUFELEVBQUcsU0FBUSxFQUFSLEVBQVcsT0FBTSxDQUFOLEVBQTNCLEVBQVgsR0FBaUQsRUFBRSxJQUFGLENBQU8sQ0FBUCxFQUFTLFVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYTtBQUFDLFVBQUUsTUFBRixDQUFTLENBQVQsTUFBYyxJQUFFLEVBQUUsTUFBRixDQUFTLENBQVQsRUFBVyxDQUFYLENBQUYsQ0FBZCxFQUErQixLQUFHLEVBQUUsRUFBRixJQUFNLEVBQUUsU0FBRixDQUFZLENBQVosRUFBYyxDQUFkLENBQVQsRUFBMEIsRUFBRSxDQUFGLElBQUssQ0FBTCxDQUExRDtPQUFiLENBQTFELEVBQTBJLEVBQUUsUUFBRixDQUFXLENBQVgsQ0FBMUksRUFBd0osQ0FBeEosQ0FBcEQ7S0FBYixFQUE0TixPQUFNLGVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYTtBQUFDLFVBQUksSUFBRSxFQUFFLEVBQUY7VUFBSyxJQUFFLEVBQUUsS0FBRjtVQUFRLElBQUUsRUFBRSxNQUFGLENBQVMsRUFBVCxFQUFZLENBQVosQ0FBRixDQUF0QixJQUEwQyxDQUFILEVBQUs7QUFBQyxhQUFJLElBQUksQ0FBSixJQUFTLENBQWI7QUFBZSxZQUFFLENBQUYsSUFBSyxFQUFFLENBQUYsQ0FBTDtTQUFmLE9BQWdDLENBQVAsQ0FBMUI7T0FBTCxJQUE0QyxDQUFKO1VBQU0sQ0FBTjtVQUFRLENBQVI7VUFBVSxJQUFFLElBQUY7VUFBTyxJQUFFLEtBQUssUUFBTCxDQUFjLENBQWQsQ0FBRjtVQUFtQixJQUFFLEVBQUUsS0FBRixDQUFySCxDQUE2SCxDQUFFLElBQUYsQ0FBTyxDQUFQLEVBQVMsVUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhO0FBQUMsZUFBTyxJQUFFLEtBQUcsRUFBRSxFQUFGLEVBQUssS0FBRyxFQUFFLFlBQUYsQ0FBZSxDQUFmLEVBQWlCLENBQWpCLENBQUgsRUFBdUIsQ0FBQyxJQUFFLEVBQUUsQ0FBRixDQUFGLENBQUQsSUFBVSxFQUFFLE1BQUYsQ0FBUyxDQUFULE1BQWMsSUFBRSxFQUFFLE1BQUYsQ0FBUyxDQUFULEVBQVcsQ0FBWCxDQUFGLENBQWQsRUFBK0IsS0FBRyxFQUFFLEVBQUYsSUFBTSxFQUFFLFNBQUYsQ0FBWSxDQUFaLEVBQWMsQ0FBZCxDQUFULEVBQTBCLE9BQU8sRUFBRSxDQUFGLENBQVAsRUFBWSxNQUFLLEVBQUUsQ0FBRixJQUFLLENBQUwsQ0FBTCxDQUEvRSxJQUE4RixLQUFHLEVBQUUsU0FBRixDQUFZLENBQVosRUFBYyxDQUFkLENBQUgsRUFBb0IsRUFBRSxDQUFGLElBQUssQ0FBTCxDQUFsSCxDQUF6QztPQUFiLENBQVQsQ0FBN0gsS0FBNFQsQ0FBSixJQUFTLENBQVQ7QUFBVyxZQUFFLEVBQUUsQ0FBRixDQUFGLEVBQU8sRUFBRSxNQUFGLENBQVMsQ0FBVCxNQUFjLElBQUUsRUFBRSxNQUFGLENBQVMsQ0FBVCxFQUFXLENBQVgsQ0FBRixDQUFkLEVBQStCLEtBQUcsRUFBRSxFQUFGLElBQU0sRUFBRSxTQUFGLENBQVksQ0FBWixFQUFjLENBQWQsQ0FBVCxFQUEwQixFQUFFLENBQUYsSUFBSyxDQUFMO09BQTNFLE9BQXlGLEVBQUUsS0FBRixDQUFRLFFBQVIsQ0FBaUIsQ0FBakIsR0FBb0IsS0FBSyxjQUFMLENBQW9CLENBQXBCLEVBQXNCLENBQXRCLENBQXBCLEVBQTZDLENBQTdDLENBQWpaO0tBQWIsRUFBOGMsU0FBUSxpQkFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhO0FBQUMsVUFBSSxJQUFFLElBQUY7VUFBTyxJQUFFLEVBQUUsRUFBRjtVQUFLLElBQUUsQ0FBRixDQUFuQixPQUE4QixFQUFFLE1BQUYsQ0FBUyxDQUFULE1BQWMsSUFBRSxFQUFFLE1BQUYsQ0FBUyxDQUFULEVBQVcsRUFBRSxLQUFGLENBQWIsRUFBc0IsRUFBRSxFQUFGLENBQUssT0FBTCxHQUFhLEVBQUUsT0FBRixFQUFVLEVBQUUsRUFBRixDQUFLLFVBQUwsR0FBZ0IsRUFBRSxVQUFGLEVBQWEsRUFBRSxRQUFGLEtBQWEsRUFBRSxFQUFGLENBQUssUUFBTCxHQUFjLEVBQUUsUUFBRixDQUEzQixDQUF4RixFQUFnSSxLQUFHLEtBQUssV0FBTCxDQUFpQixDQUFqQixFQUFtQixDQUFuQixDQUFILEVBQXlCLEtBQUssY0FBTCxDQUFvQixDQUFwQixFQUFzQixDQUF0QixDQUF6SixFQUFrTCxDQUFsTCxDQUE5QjtLQUFiLEVBQWdPLFFBQU8sZ0JBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYTtBQUFDLFVBQUksSUFBRSxFQUFFLEVBQUYsQ0FBSyxLQUFMLENBQVAsSUFBcUIsQ0FBSCxFQUFLO0FBQUMsYUFBSSxJQUFJLElBQUUsRUFBRSxNQUFGLEdBQVMsQ0FBVCxFQUFXLEtBQUcsQ0FBSCxFQUFLLEdBQTFCO0FBQThCLGlCQUFPLEVBQUUsRUFBRSxDQUFGLENBQUYsQ0FBUDtTQUE5QixPQUFvRCxDQUFQLENBQTlDO09BQUwsSUFBZ0UsQ0FBSjtVQUFNLElBQUUsSUFBRjtVQUFPLElBQUUsS0FBSyxRQUFMLENBQWMsQ0FBZCxDQUFGLENBQTNGLE9BQXFILEVBQUUsSUFBRixDQUFPLENBQVAsRUFBUyxVQUFTLENBQVQsRUFBVyxDQUFYLEVBQWE7QUFBQyxZQUFFLEtBQUcsRUFBRSxFQUFGLEVBQUssS0FBRyxFQUFFLFlBQUYsQ0FBZSxDQUFmLEVBQWlCLENBQWpCLENBQUgsRUFBdUIsQ0FBQyxDQUFELElBQUksRUFBRSxPQUFGLENBQVUsQ0FBVixDQUFKLEtBQW1CLEtBQUcsRUFBRSxTQUFGLENBQVksQ0FBWixFQUFjLENBQWQsQ0FBSCxFQUFvQixFQUFFLENBQUYsSUFBSyxDQUFMLENBQXZDLENBQWxDO09BQWIsQ0FBVCxFQUF5RyxFQUFFLEVBQUYsQ0FBSyxLQUFMLENBQVcsUUFBWCxDQUFvQixDQUFwQixDQUF6RyxFQUFnSSxLQUFLLGNBQUwsQ0FBb0IsQ0FBcEIsRUFBc0IsQ0FBdEIsQ0FBaEksRUFBeUosQ0FBekosQ0FBckg7S0FBYixFQUE4UixRQUFPLGdCQUFTLENBQVQsRUFBVyxDQUFYLEVBQWE7QUFBQyxVQUFJLElBQUUsRUFBRSxFQUFGO1VBQUssSUFBRSxFQUFFLEtBQUYsQ0FBZCxJQUF5QixDQUFILEVBQUssT0FBTyxFQUFFLE1BQUYsQ0FBUyxLQUFULENBQWUsQ0FBZixFQUFpQixDQUFqQixHQUFvQixDQUFwQixDQUFaLElBQXNDLENBQUo7VUFBTSxJQUFFLElBQUY7VUFBTyxJQUFFLEtBQUssUUFBTCxDQUFjLENBQWQsQ0FBRjtVQUFtQixJQUFFLEVBQUUsQ0FBRixDQUFGO1VBQU8sSUFBRSxJQUFFLEVBQUUsQ0FBRixDQUFGLENBQWpHLElBQTJHLEVBQUUsSUFBRixDQUFPLENBQVAsRUFBUyxVQUFTLENBQVQsRUFBVyxDQUFYLEVBQWE7QUFBQyxhQUFHLEVBQUUsRUFBRixLQUFPLEVBQUUsWUFBRixDQUFlLENBQWYsRUFBaUIsQ0FBakIsR0FBb0IsQ0FBQyxJQUFFLENBQUYsSUFBSyxLQUFHLENBQUgsQ0FBTixJQUFhLEVBQUUsU0FBRixDQUFZLENBQVosRUFBYyxDQUFkLENBQWIsQ0FBOUIsRUFBNkQsRUFBRSxDQUFGLElBQUssQ0FBTCxDQUE5RDtPQUFiLENBQVQsRUFBNkYsRUFBRSxNQUFGLEdBQVMsQ0FBVCxFQUFXLEtBQUksSUFBSSxJQUFFLEVBQUUsTUFBRixHQUFTLENBQVQsRUFBVyxLQUFHLENBQUgsRUFBSyxHQUExQjtBQUE4QixZQUFFLEVBQUUsQ0FBRixDQUFGLEVBQU8sRUFBRSxNQUFGLENBQVMsQ0FBVCxNQUFjLElBQUUsS0FBSyxNQUFMLENBQVksQ0FBWixFQUFjLEVBQUUsS0FBRixDQUFoQixDQUFkLEVBQXdDLEtBQUcsRUFBRSxFQUFGLElBQU0sS0FBSyxTQUFMLENBQWUsQ0FBZixFQUFpQixDQUFqQixDQUFULEVBQTZCLEVBQUUsQ0FBRixJQUFLLENBQUw7T0FBMUcsT0FBd0gsTUFBTSxTQUFOLENBQWdCLE1BQWhCLENBQXVCLEtBQXZCLENBQTZCLENBQTdCLEVBQStCLENBQS9CLEdBQWtDLEVBQUUsS0FBRixDQUFRLFFBQVIsQ0FBaUIsQ0FBakIsQ0FBbEMsRUFBc0QsS0FBSyxjQUFMLENBQW9CLENBQXBCLEVBQXNCLENBQXRCLENBQXRELEVBQStFLENBQS9FLENBQTNVO0tBQWIsRUFBMGEsVUFBUyxrQkFBUyxDQUFULEVBQVc7QUFBQyxVQUFJLENBQUo7VUFBTSxJQUFFLElBQUY7VUFBTyxJQUFFLEVBQUUsRUFBRixDQUFLLEtBQUwsQ0FBaEIsT0FBa0MsSUFBRSxDQUFGLElBQUssSUFBRSxFQUFFLFdBQUYsSUFBZSxLQUFmLEdBQXFCLEVBQXJCLEdBQXdCLEVBQXhCLEVBQTJCLEVBQUUsSUFBRixDQUFPLENBQVAsRUFBUyxVQUFTLENBQVQsRUFBVyxDQUFYLEVBQWE7QUFBQyxVQUFFLENBQUYsSUFBSyxDQUFMLENBQUQ7T0FBYixDQUF0QyxFQUE2RCxFQUFFLEVBQUYsQ0FBSyxLQUFMLEdBQVcsQ0FBWCxFQUFhLEVBQUUsUUFBRixDQUFXLFlBQVU7QUFBQyxVQUFFLEVBQUYsQ0FBSyxLQUFMLElBQVksRUFBRSxHQUFGLENBQU0sQ0FBTixDQUFaLENBQUQ7T0FBVixDQUFyRixFQUF1SCxDQUF2SCxDQUFMLENBQWxDO0tBQVgsRUFBNkssS0FBSSxhQUFTLENBQVQsRUFBVztBQUFDLFVBQUksSUFBRSxJQUFGO1VBQU8sSUFBRSxFQUFFLEVBQUYsQ0FBSyxLQUFMLENBQWQsSUFBNEIsQ0FBQyxDQUFELEVBQUcsT0FBTyxDQUFQLENBQU4sQ0FBZSxDQUFFLElBQUYsQ0FBTyxDQUFQLEVBQVMsVUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhO0FBQUMsYUFBRyxFQUFFLEVBQUYsSUFBTSxFQUFFLFlBQUYsQ0FBZSxDQUFmLEVBQWlCLENBQWpCLENBQVQsQ0FBRDtPQUFiLENBQVQsRUFBc0QsT0FBTyxFQUFFLEVBQUYsQ0FBSyxLQUFMLENBQXJHLElBQW9ILElBQUUsS0FBSyxPQUFMLENBQWEsQ0FBYixFQUFlLENBQWYsQ0FBRixDQUFwSCxPQUErSSxDQUFQLENBQXhJO0tBQVgsRUFBNkosT0FBTSxlQUFTLENBQVQsRUFBVztBQUFDLGFBQU8sRUFBRSxFQUFGLENBQUssS0FBTCxHQUFXLENBQVgsRUFBYSxLQUFLLE9BQUwsQ0FBYSxDQUFiLENBQWIsRUFBNkIsQ0FBN0IsQ0FBUjtLQUFYLEVBQW1ELFNBQVEsaUJBQVMsQ0FBVCxFQUFXO0FBQUMsUUFBRSxRQUFGLENBQVcsWUFBVTtBQUFDLFVBQUUsRUFBRixDQUFLLEtBQUwsR0FBVyxDQUFYLENBQUQ7T0FBVixDQUFYLENBQUQ7S0FBWCxFQUFrRCxTQUFRLGlCQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlO0FBQUMsVUFBSSxJQUFFLElBQUY7VUFBTyxJQUFFLEVBQUUsRUFBRixDQUFLLEtBQUw7VUFBVyxJQUFFLENBQUYsQ0FBekIsSUFBZ0MsQ0FBSCxFQUFLLE9BQU8sRUFBRSxJQUFGLENBQU8sQ0FBUCxFQUFTLFVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYTtBQUFDLGFBQUcsTUFBSSxDQUFKLEtBQVEsRUFBRSxDQUFGLElBQUssQ0FBTCxFQUFPLElBQUUsQ0FBRixFQUFJLEtBQUcsRUFBRSxFQUFGLElBQU0sRUFBRSxTQUFGLENBQVksQ0FBWixFQUFjLENBQWQsQ0FBVCxDQUFuQixDQUFKO09BQWIsQ0FBVCxFQUEwRSxDQUExRSxDQUFaLElBQTRGLENBQUo7VUFBTSxJQUFFLEtBQUssUUFBTCxDQUFjLENBQWQsQ0FBRixDQUEzSCxDQUE4SSxDQUFFLElBQUYsQ0FBTyxDQUFQLEVBQVMsVUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhO0FBQUMsY0FBSSxDQUFKLEtBQVEsSUFBRSxDQUFGLENBQVIsRUFBYSxNQUFJLElBQUUsRUFBRSxFQUFGLENBQU4sS0FBYyxFQUFFLFlBQUYsQ0FBZSxDQUFmLEVBQWlCLENBQWpCLEdBQW9CLEVBQUUsU0FBRixDQUFZLENBQVosRUFBYyxDQUFkLENBQXBCLENBQWQsRUFBb0QsRUFBRSxDQUFGLElBQUssQ0FBTCxDQUFsRTtPQUFiLENBQVQsRUFBaUcsRUFBRSxFQUFGLENBQUssS0FBTCxDQUFXLFFBQVgsQ0FBb0IsQ0FBcEIsQ0FBakcsRUFBd0gsS0FBSyxjQUFMLENBQW9CLENBQXBCLEVBQXNCLENBQXRCLENBQXhILENBQTlJO0tBQWYsRUFBK1MsYUFBWSxxQkFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhO0FBQUMsVUFBSSxJQUFFLElBQUYsQ0FBTCxDQUFZLENBQUUsSUFBRixDQUFPLENBQVAsRUFBUyxVQUFTLENBQVQsRUFBVztBQUFDLFlBQUcsS0FBRyxFQUFFLEVBQUYsRUFBSztBQUFDLGNBQUcsQ0FBQyxDQUFELElBQUksRUFBRSxFQUFGLENBQUssT0FBTCxDQUFhLE9BQWIsQ0FBcUIsQ0FBckIsQ0FBSixFQUE0QixPQUFPLEVBQUUsV0FBRixDQUFjLENBQWQsQ0FBUCxDQUEvQixJQUEwRCxLQUFHLEVBQUUsRUFBRixDQUFLLE9BQUwsQ0FBYSxNQUFiLEVBQW9CLE9BQU8sRUFBRSxFQUFGLENBQUssT0FBTCxHQUFhLENBQUMsQ0FBRCxDQUFiLENBQWpDLENBQWtELElBQUcsRUFBRSxZQUFGLENBQWUsQ0FBZixFQUFpQixDQUFqQixDQUFILEVBQXVCLEVBQUUsU0FBRixDQUFZLENBQVosRUFBYyxDQUFkLENBQXZCLENBQTFHO1NBQVg7T0FBWixDQUFULENBQVo7S0FBYixFQUErTSxVQUFTLGtCQUFTLENBQVQsRUFBVztBQUFDLFVBQUksSUFBRSxFQUFFLEtBQUYsQ0FBUSxDQUFSLENBQUY7VUFBYSxJQUFFLEVBQUUsRUFBRixDQUFwQixPQUFnQyxFQUFFLEtBQUYsQ0FBUSxDQUFSLEVBQVUsRUFBQyxJQUFHLEVBQUMsT0FBTSxFQUFFLEtBQUYsRUFBUSxZQUFXLEVBQUUsVUFBRixFQUFhLFVBQVMsRUFBRSxRQUFGLEVBQVcsU0FBUSxFQUFFLE9BQUYsQ0FBVSxLQUFWLENBQWdCLENBQWhCLENBQVIsRUFBMkIsT0FBTSxFQUFFLEtBQUYsRUFBUSxPQUFNLEVBQUUsS0FBRixFQUE3RyxFQUFYLEdBQW1JLEVBQUUsS0FBRixJQUFTLEtBQUssT0FBTCxDQUFhLENBQWIsQ0FBVCxFQUF5QixDQUE1SixDQUFoQztLQUFYLEVBQTBNLGdCQUFlLHdCQUFTLENBQVQsRUFBVyxDQUFYLEVBQWE7QUFBQyxVQUFJLENBQUo7VUFBTSxJQUFFLEVBQUUsRUFBRjtVQUFLLElBQUUsRUFBRSxPQUFGLENBQVUsTUFBVixDQUFoQixJQUFvQyxFQUFFLEVBQUYsQ0FBSyxVQUFMLElBQWlCLEVBQUUsRUFBRixDQUFLLFVBQUwsQ0FBZ0IsQ0FBaEIsRUFBa0IsQ0FBbEIsQ0FBakIsRUFBc0MsS0FBRyxLQUFLLE9BQUwsQ0FBYSxDQUFiLEVBQWUsUUFBZixFQUF3QixDQUF4QixFQUEwQixFQUFFLEtBQUYsQ0FBUSxJQUFSLENBQTdCLEVBQTJDLENBQWpGLEVBQW1GLEtBQUksSUFBRSxJQUFFLENBQUYsRUFBSSxLQUFHLENBQUgsRUFBSyxHQUFmO0FBQW1CLGFBQUssT0FBTCxDQUFhLEVBQUUsT0FBRixDQUFVLENBQVYsQ0FBYixFQUEwQixDQUExQixFQUE0QixDQUE1QjtPQUFuQjtLQUFwSSxFQUF1TCxjQUFhLHNCQUFTLENBQVQsRUFBVyxDQUFYLEVBQWE7QUFBQyxVQUFJLElBQUUsRUFBRSxFQUFGLENBQUssT0FBTDtVQUFhLElBQUUsRUFBRSxPQUFGLENBQVUsQ0FBVixDQUFGLENBQXBCLENBQW9DLENBQUQsSUFBSSxDQUFKLElBQU8sRUFBRSxNQUFGLENBQVMsQ0FBVCxFQUFXLENBQVgsQ0FBUCxDQUFuQztLQUFiLEVBQXNFLFdBQVUsbUJBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYTtBQUFDLFVBQUksSUFBRSxFQUFFLEVBQUYsQ0FBSyxPQUFMO1VBQWEsSUFBRSxFQUFFLE9BQUYsQ0FBVSxDQUFWLENBQUYsQ0FBcEIsQ0FBb0MsQ0FBRCxJQUFJLENBQUosS0FBUSxFQUFFLEVBQUUsTUFBRixDQUFGLEdBQVksQ0FBWixDQUFSLENBQW5DO0tBQWIsRUFBd0UsU0FBUSxpQkFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCO0FBQUMsVUFBSSxJQUFFLEVBQUUsRUFBRixDQUFLLFFBQUwsQ0FBUCxJQUF3QixDQUFILEVBQUs7QUFBQyxZQUFJLElBQUUsRUFBRSxPQUFGLENBQVAsSUFBb0IsQ0FBSCxFQUFLLE9BQU8sTUFBSyxDQUFDLEtBQUcsQ0FBSCxDQUFELEtBQVMsRUFBRSxPQUFGLEdBQVUsQ0FBVixFQUFZLEVBQUUsT0FBRixDQUFVLENBQVYsRUFBWSxLQUFHLENBQUgsQ0FBeEIsQ0FBVCxDQUFMLENBQVosQ0FBMEQsQ0FBRSxPQUFGLEdBQVUsQ0FBVixFQUFZLEtBQUcsRUFBRSxRQUFGLENBQVcsWUFBVTtBQUFDLGNBQUcsRUFBRSxPQUFGLEVBQVU7QUFBQyxnQkFBSSxJQUFFLEVBQUUsT0FBRixDQUFQLENBQWlCLENBQUUsT0FBRixHQUFVLENBQVYsRUFBWSxFQUFFLE9BQUYsQ0FBVSxDQUFWLEVBQVksQ0FBWixDQUFaLENBQWpCO1dBQWI7U0FBWCxDQUFkLENBQXZGO09BQUw7S0FBdEMsRUFBeU4sZ0JBQWUsd0JBQVMsQ0FBVCxFQUFXO0FBQUMsVUFBSSxJQUFFLEVBQUUsRUFBRixDQUFLLFFBQUwsQ0FBUCxPQUE0QixNQUFJLElBQUUsT0FBTyxNQUFQLENBQWMsQ0FBZCxFQUFnQixFQUFDLFNBQVEsRUFBQyxPQUFNLEVBQU4sRUFBUyxVQUFTLENBQUMsQ0FBRCxFQUEzQixFQUFqQixDQUFGLEVBQW9ELEVBQUUsRUFBRixDQUFLLFFBQUwsR0FBYyxDQUFkLENBQXhELEVBQXlFLENBQXpFLENBQTVCO0tBQVgsRUFBbDRHLENBQWxrSSxDQUF3alAsQ0FBRSxJQUFGLENBQU8sQ0FBUCxFQUF4alAsSUFBc2tQLElBQUUsV0FBUyxDQUFULEVBQVcsQ0FBWCxFQUFhO0FBQUMsUUFBSSxDQUFKO1FBQU0sSUFBRSxJQUFGO1FBQU8sSUFBRSxLQUFHLEVBQUg7UUFBTSxJQUFFLEVBQUMsTUFBSyxFQUFFLElBQUYsSUFBUSxDQUFDLENBQUQsRUFBaEI7UUFBb0IsSUFBRSxFQUFGO1FBQUssSUFBRSxDQUFGO1FBQUksSUFBRSxTQUFGLENBQUUsQ0FBUyxDQUFULEVBQVc7QUFBQyxVQUFJLENBQUo7VUFBTSxJQUFFLEVBQUUsRUFBRixDQUFULEtBQWtCLEVBQUUsUUFBRixJQUFZLEVBQUUsT0FBRixDQUFVLENBQVYsRUFBWSxRQUFaLEVBQXFCLENBQXJCLEVBQXVCLENBQUMsQ0FBRCxDQUFuQyxFQUF1QyxJQUFFLENBQUYsRUFBSSxJQUFFLEVBQUUsT0FBRixDQUFVLE1BQVYsRUFBaUIsR0FBbEU7QUFBc0UsVUFBRSxLQUFGLENBQVEsTUFBUixDQUFlLEtBQWYsRUFBcUIsRUFBRSxPQUFGLENBQVUsQ0FBVixDQUFyQjtPQUF0RTtLQUF6QjtRQUFtSSxJQUFFLFNBQUYsQ0FBRSxDQUFTLENBQVQsRUFBVztBQUFDLFFBQUUsSUFBRixDQUFPLENBQVAsR0FBVSxNQUFJLElBQUUsQ0FBRixFQUFJLEVBQUUsUUFBRixDQUFXLFlBQVU7QUFBQyxZQUFFLEVBQUYsRUFBSyxJQUFFLENBQUYsQ0FBTjtPQUFWLENBQWYsQ0FBSixDQUFYO0tBQVgsQ0FBMUwsQ0FBMlAsQ0FBRSxNQUFGLEdBQVMsVUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZTtBQUFDLFVBQUcsU0FBTyxDQUFQLEVBQVM7QUFBQyxZQUFHLEVBQUUsTUFBRixFQUFTLE9BQUssRUFBRSxNQUFGO0FBQVUsWUFBRSxFQUFFLEtBQUYsRUFBRjtTQUFmLE1BQWlDLEVBQUUsQ0FBRixFQUE3QyxPQUF5RCxDQUFQLENBQW5EO09BQVosSUFBNEUsSUFBRSxFQUFFLENBQUYsRUFBSyxDQUFMLEVBQU8sQ0FBUCxDQUFGLENBQTdFLElBQTRGLFdBQVMsQ0FBVCxFQUFXO0FBQUMsWUFBSSxJQUFFLEVBQUUsU0FBRixDQUFZLENBQVosQ0FBRixDQUFMLElBQXlCLENBQUgsRUFBSyxPQUFPLEVBQUUsQ0FBRixHQUFLLENBQUwsQ0FBWjtPQUFwQyxPQUE4RCxDQUFQLENBQWhKO0tBQWYsRUFBeUssRUFBRSxRQUFGLEdBQVcsRUFBRSxPQUFGLEtBQVksQ0FBQyxDQUFELEdBQUcsWUFBVSxFQUFWLEdBQWEsVUFBUyxDQUFULEVBQVc7QUFBQyxhQUFPLE1BQVAsQ0FBYyxDQUFkLEVBQUQ7S0FBWCxFQUE4QixJQUFFLEVBQUUsTUFBRixDQUFTLENBQVQsRUFBVyxDQUFYLENBQUYsRUFBZ0IsRUFBRSxFQUFGLENBQUssVUFBTCxHQUFnQixVQUFTLENBQVQsRUFBVyxDQUFYLEVBQWE7QUFBQyxZQUFJLENBQUosS0FBUSxJQUFFLENBQUYsQ0FBUixDQUFEO0tBQWIsQ0FBbGhCLElBQWtqQixJQUFFLEVBQUUsV0FBRixFQUFGO1FBQWtCLElBQUUsRUFBRixDQUFwa0IsQ0FBeWtCLENBQUUsSUFBRixDQUFPLENBQUMsSUFBRCxFQUFNLEtBQU4sRUFBWSxNQUFaLEVBQW1CLFNBQW5CLENBQVAsRUFBcUMsVUFBUyxDQUFULEVBQVc7QUFBQyxVQUFJLElBQUUsRUFBRixDQUFMLENBQVUsQ0FBRSxDQUFGLElBQUssRUFBRSxDQUFGLEVBQUssSUFBTCxDQUFVLENBQVYsQ0FBTCxFQUFrQixFQUFFLEtBQUYsQ0FBUSxDQUFSLEVBQVUsQ0FBVixDQUFsQixFQUErQixFQUFFLEtBQUYsQ0FBUSxDQUFSLEVBQVUsQ0FBVixDQUEvQixDQUFWO0tBQVgsQ0FBckMsRUFBd0csRUFBRSxLQUFGLENBQVEsSUFBUixFQUFhLEVBQUMsS0FBSSxlQUFVO0FBQUMsZUFBTyxDQUFQLENBQUQ7T0FBVixFQUFxQixLQUFJLGFBQVMsQ0FBVCxFQUFXO0FBQUMsZ0JBQVEsR0FBUixDQUFZLFNBQVosR0FBdUIsRUFBRSxLQUFGLENBQVEsQ0FBUixDQUF2QixDQUFEO09BQVgsRUFBK0MsYUFBWSx1QkFBVTtBQUFDLGVBQU8sQ0FBUCxDQUFEO09BQVYsRUFBdEcsQ0FBeEcsRUFBcU8sRUFBRSxLQUFGLENBQVEsSUFBUixFQUFhLEVBQUMsU0FBUSxLQUFLLEdBQUwsRUFBUyxTQUFRLEtBQUssR0FBTCxFQUF2QyxDQUFyTyxDQUF6a0I7R0FBYixDQUF4a1AsT0FBNjdRLENBQVAsQ0FBdDdRO0NBQVYsQ0FBbEk7Ozs7Ozs7Ozs7Ozs7O0FDRUE7Ozs7OztBQUVBLENBQUMsWUFBVTs7QUFFVixLQUFJLFlBQVk7QUFFZiw0QkFBUSxLQUFJLEtBQUk7OztBQUlmLE9BQUksK0JBQWtCLFdBQWxCLEVBQWdDLFFBQVEsSUFBUixDQUFhLGlEQUFiLEVBQXBDOztBQUVBLE9BQUksU0FBUyxJQUFUOzs7QUFOVyxPQVNULE9BQU8sR0FBUCxJQUFlLFdBQWYsRUFBNEI7QUFDN0IsWUFBUSxJQUFSLENBQWEsOERBQWIsRUFENkI7QUFFN0IsV0FBTyxLQUFQLENBRjZCO0lBQS9CLE1BSUU7O0FBRUEsUUFBSSxPQUFPLElBQUksSUFBSixHQUFXLElBQUksSUFBSixHQUFXLElBQXRCOztBQUZYLFFBSUksUUFBUyx5QkFBWSxJQUFJLEtBQUosRUFBVSxFQUFDLE1BQUssSUFBTCxFQUF2QixDQUFUOztBQUpKLE9BTUEsQ0FBSSxNQUFKLENBQVcsS0FBWCxFQU5BO0lBSkY7O0FBYUgsT0FBSSxjQUFjLFNBQWQsV0FBYyxDQUFDLElBQUQsRUFBVTtBQUMzQixXQUFPLEtBQUssS0FBTCxDQUFXLEtBQUssU0FBTCxDQUFlLElBQWYsQ0FBWCxDQUFQLENBRDJCO0lBQVY7OztBQXRCSCxTQTJCZixDQUFPLEtBQVAsR0FBZSxFQUFmOzs7QUEzQmUsU0E4QmYsQ0FBTyxLQUFQLENBQWEsT0FBYixHQUF1Qjs7O0FBRXBCLHNDQUFZLEtBQUksS0FBSTtBQUNyQixVQUFLLElBQUwsQ0FBVSxRQUFWLEVBQW1CLFlBQVksTUFBTSxHQUFOLEVBQVosQ0FBbkIsRUFEcUI7S0FGQTtJQUF2Qjs7O0FBOUJlLFNBc0NmLENBQU8sS0FBUCxDQUFhLE9BQWIsR0FBdUIsWUFBVztBQUM3QixRQUFJLEtBQUssSUFBTDs7O0FBRHlCLE9BSWpDLENBQUksSUFBSixDQUFTLGNBQVQsQ0FBd0IsSUFBeEIsRUFBNkIsUUFBN0IsRUFBc0MsS0FBdEMsRUFKaUM7QUFLakMsUUFBSSxJQUFKLENBQVMsY0FBVCxDQUF3QixJQUF4QixFQUE2QixRQUE3QixFQUFzQyxZQUFZLE1BQU0sR0FBTixFQUFaLENBQXRDLEVBTGlDO0FBTS9CLFFBQUksSUFBSixDQUFTLGNBQVQsQ0FBd0IsSUFBeEIsRUFBNkIsU0FBN0IsRUFBd0MsVUFBUyxTQUFULEVBQW1CLElBQW5CLEVBQXdCOztBQUVqRSxXQUFNLE9BQU4sQ0FBYyxTQUFkLEVBQXdCLElBQXhCLEVBQTZCLEdBQUcsTUFBSCxDQUE3QixDQUZpRTtLQUF4QixDQUF4Qzs7O0FBTitCLFFBWS9CLENBQUssTUFBTCxDQUFZLEVBQVosQ0FBZSxRQUFmLEVBQXlCLFVBQVUsR0FBVixFQUFlOztBQUV0QyxRQUFHLFdBQUgsQ0FBZSxZQUFZLEdBQUcsTUFBSCxDQUEzQixFQUFzQyxHQUF0QyxFQUZzQztLQUFmLENBQXpCLENBWitCO0lBQVg7OztBQXRDUixNQXlEZixDQUFJLE9BQUosR0FBYyxJQUFJLElBQUosQ0FBUyxZQUFULENBQXNCLElBQUksT0FBSixFQUFhLE9BQU8sS0FBUCxDQUFqRCxDQXpEZTs7O0FBRkQsRUFBWjs7O0FBRk0sS0FzRU4sUUFBTyx1REFBUCxLQUFrQixRQUFsQixJQUE4QixPQUFPLE9BQVAsRUFBZ0I7QUFDakQsU0FBTyxPQUFQLEdBQWlCLFNBQWpCLENBRGlEO0VBQWxEOztBQXRFVSxLQTBFTixPQUFPLE1BQVAsS0FBa0IsVUFBbEIsSUFBZ0MsT0FBTyxHQUFQLEVBQVk7QUFDL0MsU0FBTyxZQUFNO0FBQUUsVUFBTyxTQUFQLENBQUY7R0FBTixDQUFQLENBRCtDO0VBQWhEOztBQTFFVSxLQThFTixRQUFPLHVEQUFQLEtBQWtCLFNBQWxCLEVBQTZCO0FBQ2hDLFNBQU8sU0FBUCxHQUFtQixTQUFuQixDQURnQztFQUFqQztDQTlFQSxDQUFEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qXG5mcmVlemVyLWpzIHYwLjEwLjBcbmh0dHBzOi8vZ2l0aHViLmNvbS9hcnFleC9mcmVlemVyXG5NSVQ6IGh0dHBzOi8vZ2l0aHViLmNvbS9hcnFleC9mcmVlemVyL3Jhdy9tYXN0ZXIvTElDRU5TRVxuKi9cbiFmdW5jdGlvbih0LGUpe1wiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoW10sZSk6XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHM/bW9kdWxlLmV4cG9ydHM9ZSgpOnQuRnJlZXplcj1lKCl9KHRoaXMsZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjt2YXIgdD1uZXcgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpLGU9e2V4dGVuZDpmdW5jdGlvbih0LGUpe2Zvcih2YXIgbiBpbiBlKXRbbl09ZVtuXTtyZXR1cm4gdH0sY3JlYXRlTm9uRW51bWVyYWJsZTpmdW5jdGlvbih0LGUpe3ZhciBuPXt9O2Zvcih2YXIgciBpbiB0KW5bcl09e3ZhbHVlOnRbcl19O3JldHVybiBPYmplY3QuY3JlYXRlKGV8fHt9LG4pfSxlcnJvcjpmdW5jdGlvbih0KXt2YXIgZT1uZXcgRXJyb3IodCk7aWYoY29uc29sZSlyZXR1cm4gY29uc29sZS5lcnJvcihlKTt0aHJvdyBlfSxlYWNoOmZ1bmN0aW9uKHQsZSl7dmFyIG4scixpO2lmKHQmJnQuY29uc3RydWN0b3I9PUFycmF5KWZvcihuPTAscj10Lmxlbmd0aDtyPm47bisrKWUodFtuXSxuKTtlbHNlIGZvcihpPU9iamVjdC5rZXlzKHQpLG49MCxyPWkubGVuZ3RoO3I+bjtuKyspZSh0W2lbbl1dLGlbbl0pfSxhZGRORTpmdW5jdGlvbih0LGUpe2Zvcih2YXIgbiBpbiBlKU9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LG4se2VudW1lcmFibGU6ITEsY29uZmlndXJhYmxlOiEwLHdyaXRhYmxlOiEwLHZhbHVlOmVbbl19KX0sY3JlYXRlTkU6ZnVuY3Rpb24odCl7dmFyIGU9e307Zm9yKHZhciBuIGluIHQpZVtuXT17d3JpdGFibGU6ITAsY29uZmlndXJhYmxlOiEwLGVudW1lcmFibGU6ITEsdmFsdWU6dFtuXX07cmV0dXJuIGV9LG5leHRUaWNrOmZ1bmN0aW9uKCl7ZnVuY3Rpb24gZSgpe2Zvcig7cj1pLnNoaWZ0KCk7KXIoKTtvPSExfWZ1bmN0aW9uIG4odCl7aS5wdXNoKHQpLG98fChvPSEwLGYoKSl9dmFyIHIsaT1bXSxvPSExLHM9ISF0LnBvc3RNZXNzYWdlJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgV2luZG93JiZ0IGluc3RhbmNlb2YgV2luZG93LGE9XCJuZXh0dGlja1wiLGY9ZnVuY3Rpb24oKXtyZXR1cm4gcz9mdW5jdGlvbigpe3QucG9zdE1lc3NhZ2UoYSxcIipcIil9OmZ1bmN0aW9uKCl7c2V0VGltZW91dChmdW5jdGlvbigpe2MoKX0sMCl9fSgpLGM9ZnVuY3Rpb24oKXtyZXR1cm4gcz9mdW5jdGlvbihuKXtuLnNvdXJjZT09PXQmJm4uZGF0YT09PWEmJihuLnN0b3BQcm9wYWdhdGlvbigpLGUoKSl9OmV9KCk7cmV0dXJuIHMmJnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIixjLCEwKSxuLnJlbW92ZUxpc3RlbmVyPWZ1bmN0aW9uKCl7dC5yZW1vdmVFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLGMsITApfSxufSgpLGZpbmRQaXZvdDpmdW5jdGlvbih0KXtpZih0JiZ0Ll9fKXtpZih0Ll9fLnBpdm90KXJldHVybiB0O2Zvcih2YXIgZSxuPTAscj10Ll9fLnBhcmVudHMsaT0wOyFuJiZpPHIubGVuZ3RoOyllPXJbaV0sZS5fXy5waXZvdCYmKG49ZSksaSsrO2lmKG4pcmV0dXJuIG47Zm9yKGk9MDshbiYmaTxyLmxlbmd0aDspbj10aGlzLmZpbmRQaXZvdChyW2ldKSxpKys7cmV0dXJuIG59fSxpc0xlYWY6ZnVuY3Rpb24odCl7dmFyIGU9dCYmdC5jb25zdHJ1Y3RvcjtyZXR1cm4hZXx8ZT09U3RyaW5nfHxlPT1OdW1iZXJ8fGU9PUJvb2xlYW59fSxuPXtpbml0OmZ1bmN0aW9uKHQpe3ZhciBuPXtzZXQ6ZnVuY3Rpb24odCxuKXt2YXIgcj10LGk9dGhpcy5fXy50cmFucztpZihcIm9iamVjdFwiIT10eXBlb2YgdCYmKHI9e30sclt0XT1uKSwhaSl7Zm9yKHZhciBvIGluIHIpaT1pfHx0aGlzW29dIT09cltvXTtpZighaSlyZXR1cm4gZS5maW5kUGl2b3QodGhpcyl8fHRoaXN9cmV0dXJuIHRoaXMuX18uc3RvcmUubm90aWZ5KFwibWVyZ2VcIix0aGlzLHIpfSxyZXNldDpmdW5jdGlvbih0KXtyZXR1cm4gdGhpcy5fXy5zdG9yZS5ub3RpZnkoXCJyZXBsYWNlXCIsdGhpcyx0KX0sZ2V0TGlzdGVuZXI6ZnVuY3Rpb24oKXtyZXR1cm4gdC5jcmVhdGVMaXN0ZW5lcih0aGlzKX0sdG9KUzpmdW5jdGlvbigpe3ZhciB0O3JldHVybiB0PXRoaXMuY29uc3RydWN0b3I9PUFycmF5P25ldyBBcnJheSh0aGlzLmxlbmd0aCk6e30sZS5lYWNoKHRoaXMsZnVuY3Rpb24oZSxuKXtlJiZlLl9fP3Rbbl09ZS50b0pTKCk6dFtuXT1lfSksdH0sdHJhbnNhY3Q6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fXy5zdG9yZS5ub3RpZnkoXCJ0cmFuc2FjdFwiLHRoaXMpfSxydW46ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fXy5zdG9yZS5ub3RpZnkoXCJydW5cIix0aGlzKX0sbm93OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX18uc3RvcmUubm90aWZ5KFwibm93XCIsdGhpcyl9LHBpdm90OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX18uc3RvcmUubm90aWZ5KFwicGl2b3RcIix0aGlzKX19LHI9ZS5leHRlbmQoe3B1c2g6ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMuYXBwZW5kKFt0XSl9LGFwcGVuZDpmdW5jdGlvbih0KXtyZXR1cm4gdCYmdC5sZW5ndGg/dGhpcy5fXy5zdG9yZS5ub3RpZnkoXCJzcGxpY2VcIix0aGlzLFt0aGlzLmxlbmd0aCwwXS5jb25jYXQodCkpOnRoaXN9LHBvcDpmdW5jdGlvbigpe3JldHVybiB0aGlzLmxlbmd0aD90aGlzLl9fLnN0b3JlLm5vdGlmeShcInNwbGljZVwiLHRoaXMsW3RoaXMubGVuZ3RoLTEsMV0pOnRoaXN9LHVuc2hpZnQ6ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMucHJlcGVuZChbdF0pfSxwcmVwZW5kOmZ1bmN0aW9uKHQpe3JldHVybiB0JiZ0Lmxlbmd0aD90aGlzLl9fLnN0b3JlLm5vdGlmeShcInNwbGljZVwiLHRoaXMsWzAsMF0uY29uY2F0KHQpKTp0aGlzfSxzaGlmdDpmdW5jdGlvbigpe3JldHVybiB0aGlzLmxlbmd0aD90aGlzLl9fLnN0b3JlLm5vdGlmeShcInNwbGljZVwiLHRoaXMsWzAsMV0pOnRoaXN9LHNwbGljZTpmdW5jdGlvbih0LGUsbil7cmV0dXJuIHRoaXMuX18uc3RvcmUubm90aWZ5KFwic3BsaWNlXCIsdGhpcyxhcmd1bWVudHMpfX0sbiksaT1PYmplY3QuY3JlYXRlKEFycmF5LnByb3RvdHlwZSxlLmNyZWF0ZU5FKHIpKSxvPWUuY3JlYXRlTkUoZS5leHRlbmQoe3JlbW92ZTpmdW5jdGlvbih0KXt2YXIgZT1bXSxuPXQ7dC5jb25zdHJ1Y3RvciE9QXJyYXkmJihuPVt0XSk7Zm9yKHZhciByPTAsaT1uLmxlbmd0aDtpPnI7cisrKXRoaXMuaGFzT3duUHJvcGVydHkobltyXSkmJmUucHVzaChuW3JdKTtyZXR1cm4gZS5sZW5ndGg/dGhpcy5fXy5zdG9yZS5ub3RpZnkoXCJyZW1vdmVcIix0aGlzLGUpOnRoaXN9fSxuKSkscz1PYmplY3QuY3JlYXRlKE9iamVjdC5wcm90b3R5cGUsbyksYT1mdW5jdGlvbigpe3JldHVybltdLl9fcHJvdG9fXz9mdW5jdGlvbih0KXt2YXIgZT1uZXcgQXJyYXkodCk7cmV0dXJuIGUuX19wcm90b19fPWksZX06ZnVuY3Rpb24odCl7dmFyIGU9bmV3IEFycmF5KHQpO2Zvcih2YXIgbiBpbiByKWVbbl09cltuXTtyZXR1cm4gZX19KCk7dGhpcy5jbG9uZT1mdW5jdGlvbih0KXt2YXIgZT10LmNvbnN0cnVjdG9yO3JldHVybiBlPT1BcnJheT9hKHQubGVuZ3RoKTplPT09T2JqZWN0P09iamVjdC5jcmVhdGUocyk6KGNvbnNvbGUubG9nKFwiaW5zdGFuY2VcIiksT2JqZWN0LmNyZWF0ZShlLnByb3RvdHlwZSxvKSl9fX0scj1cImJlZm9yZUFsbFwiLGk9XCJhZnRlckFsbFwiLG89W3IsaV0scz17b246ZnVuY3Rpb24odCxlLG4pe3ZhciByPXRoaXMuX2V2ZW50c1t0XXx8W107cmV0dXJuIHIucHVzaCh7Y2FsbGJhY2s6ZSxvbmNlOm59KSx0aGlzLl9ldmVudHNbdF09cix0aGlzfSxvbmNlOmZ1bmN0aW9uKHQsZSl7cmV0dXJuIHRoaXMub24odCxlLCEwKX0sb2ZmOmZ1bmN0aW9uKHQsZSl7aWYoXCJ1bmRlZmluZWRcIj09dHlwZW9mIHQpdGhpcy5fZXZlbnRzPXt9O2Vsc2UgaWYoXCJ1bmRlZmluZWRcIj09dHlwZW9mIGUpdGhpcy5fZXZlbnRzW3RdPVtdO2Vsc2V7dmFyIG4scj10aGlzLl9ldmVudHNbdF18fFtdO2ZvcihuPXIubGVuZ3RoLTE7bj49MDtuLS0pcltuXS5jYWxsYmFjaz09PWUmJnIuc3BsaWNlKG4sMSl9cmV0dXJuIHRoaXN9LHRyaWdnZXI6ZnVuY3Rpb24odCl7dmFyIGUsbixzPVtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLDEpLGE9dGhpcy5fZXZlbnRzW3RdfHxbXSxmPVtdLGM9LTEhPW8uaW5kZXhPZih0KTtmb3IoY3x8dGhpcy50cmlnZ2VyLmFwcGx5KHRoaXMsW3IsdF0uY29uY2F0KHMpKSxlPTA7ZTxhLmxlbmd0aDtlKyspbj1hW2VdLG4uY2FsbGJhY2s/bi5jYWxsYmFjay5hcHBseSh0aGlzLHMpOm4ub25jZT0hMCxuLm9uY2UmJmYucHVzaChlKTtmb3IoZT1mLmxlbmd0aC0xO2U+PTA7ZS0tKWEuc3BsaWNlKGZbZV0sMSk7cmV0dXJuIGN8fHRoaXMudHJpZ2dlci5hcHBseSh0aGlzLFtpLHRdLmNvbmNhdChzKSksdGhpc319LGE9ZS5jcmVhdGVOb25FbnVtZXJhYmxlKHMpLGY9e2ZyZWV6ZTpmdW5jdGlvbih0LHIpe2lmKHQmJnQuX18pcmV0dXJuIHQ7dmFyIGk9dGhpcyxvPW4uY2xvbmUodCk7cmV0dXJuIGUuYWRkTkUobyx7X186e2xpc3RlbmVyOiExLHBhcmVudHM6W10sc3RvcmU6cn19KSxlLmVhY2godCxmdW5jdGlvbih0LG4pe2UuaXNMZWFmKHQpfHwodD1pLmZyZWV6ZSh0LHIpKSx0JiZ0Ll9fJiZpLmFkZFBhcmVudCh0LG8pLG9bbl09dH0pLHIuZnJlZXplRm4obyksb30sbWVyZ2U6ZnVuY3Rpb24odCxuKXt2YXIgcj10Ll9fLGk9ci50cmFucyxuPWUuZXh0ZW5kKHt9LG4pO2lmKGkpe2Zvcih2YXIgbyBpbiBuKWlbb109bltvXTtyZXR1cm4gdH12YXIgcyxhLGYsYz10aGlzLHU9dGhpcy5jb3B5TWV0YSh0KSxoPXIuc3RvcmU7ZS5lYWNoKHQsZnVuY3Rpb24ocixpKXtyZXR1cm4gZj1yJiZyLl9fLGYmJmMucmVtb3ZlUGFyZW50KHIsdCksKHM9bltpXSk/KGUuaXNMZWFmKHMpfHwocz1jLmZyZWV6ZShzLGgpKSxzJiZzLl9fJiZjLmFkZFBhcmVudChzLHUpLGRlbGV0ZSBuW2ldLHZvaWQodVtpXT1zKSk6KGYmJmMuYWRkUGFyZW50KHIsdSksdVtpXT1yKX0pO2ZvcihhIGluIG4pcz1uW2FdLGUuaXNMZWFmKHMpfHwocz1jLmZyZWV6ZShzLGgpKSxzJiZzLl9fJiZjLmFkZFBhcmVudChzLHUpLHVbYV09cztyZXR1cm4gci5zdG9yZS5mcmVlemVGbih1KSx0aGlzLnJlZnJlc2hQYXJlbnRzKHQsdSksdX0scmVwbGFjZTpmdW5jdGlvbih0LG4pe3ZhciByPXRoaXMsaT10Ll9fLG89bjtyZXR1cm4gZS5pc0xlYWYobil8fChvPXIuZnJlZXplKG4saS5zdG9yZSksby5fXy5wYXJlbnRzPWkucGFyZW50cyxvLl9fLnVwZGF0ZVJvb3Q9aS51cGRhdGVSb290LGkubGlzdGVuZXImJihvLl9fLmxpc3RlbmVyPWkubGlzdGVuZXIpKSxvJiZ0aGlzLmZpeENoaWxkcmVuKG8sdCksdGhpcy5yZWZyZXNoUGFyZW50cyh0LG8pLG99LHJlbW92ZTpmdW5jdGlvbih0LG4pe3ZhciByPXQuX18udHJhbnM7aWYocil7Zm9yKHZhciBpPW4ubGVuZ3RoLTE7aT49MDtpLS0pZGVsZXRlIHJbbltpXV07cmV0dXJuIHR9dmFyIG8scz10aGlzLGE9dGhpcy5jb3B5TWV0YSh0KTtyZXR1cm4gZS5lYWNoKHQsZnVuY3Rpb24oZSxyKXtvPWUmJmUuX18sbyYmcy5yZW1vdmVQYXJlbnQoZSx0KSwtMT09bi5pbmRleE9mKHIpJiYobyYmcy5hZGRQYXJlbnQoZSxhKSxhW3JdPWUpfSksdC5fXy5zdG9yZS5mcmVlemVGbihhKSx0aGlzLnJlZnJlc2hQYXJlbnRzKHQsYSksYX0sc3BsaWNlOmZ1bmN0aW9uKHQsbil7dmFyIHI9dC5fXyxpPXIudHJhbnM7aWYoaSlyZXR1cm4gaS5zcGxpY2UuYXBwbHkoaSxuKSx0O3ZhciBvLHM9dGhpcyxhPXRoaXMuY29weU1ldGEodCksZj1uWzBdLGM9ZituWzFdO2lmKGUuZWFjaCh0LGZ1bmN0aW9uKGUsbil7ZSYmZS5fXyYmKHMucmVtb3ZlUGFyZW50KGUsdCksKGY+bnx8bj49YykmJnMuYWRkUGFyZW50KGUsYSkpLGFbbl09ZX0pLG4ubGVuZ3RoPjEpZm9yKHZhciB1PW4ubGVuZ3RoLTE7dT49Mjt1LS0pbz1uW3VdLGUuaXNMZWFmKG8pfHwobz10aGlzLmZyZWV6ZShvLHIuc3RvcmUpKSxvJiZvLl9fJiZ0aGlzLmFkZFBhcmVudChvLGEpLG5bdV09bztyZXR1cm4gQXJyYXkucHJvdG90eXBlLnNwbGljZS5hcHBseShhLG4pLHIuc3RvcmUuZnJlZXplRm4oYSksdGhpcy5yZWZyZXNoUGFyZW50cyh0LGEpLGF9LHRyYW5zYWN0OmZ1bmN0aW9uKHQpe3ZhciBuLHI9dGhpcyxpPXQuX18udHJhbnM7cmV0dXJuIGk/aToobj10LmNvbnN0cnVjdG9yPT1BcnJheT9bXTp7fSxlLmVhY2godCxmdW5jdGlvbih0LGUpe25bZV09dH0pLHQuX18udHJhbnM9bixlLm5leHRUaWNrKGZ1bmN0aW9uKCl7dC5fXy50cmFucyYmci5ydW4odCl9KSxuKX0scnVuOmZ1bmN0aW9uKHQpe3ZhciBuPXRoaXMscj10Ll9fLnRyYW5zO2lmKCFyKXJldHVybiB0O2UuZWFjaChyLGZ1bmN0aW9uKGUscil7ZSYmZS5fXyYmbi5yZW1vdmVQYXJlbnQoZSx0KX0pLGRlbGV0ZSB0Ll9fLnRyYW5zO3ZhciBpPXRoaXMucmVwbGFjZSh0LHIpO3JldHVybiBpfSxwaXZvdDpmdW5jdGlvbih0KXtyZXR1cm4gdC5fXy5waXZvdD0xLHRoaXMudW5waXZvdCh0KSx0fSx1bnBpdm90OmZ1bmN0aW9uKHQpe2UubmV4dFRpY2soZnVuY3Rpb24oKXt0Ll9fLnBpdm90PTB9KX0scmVmcmVzaDpmdW5jdGlvbih0LG4scil7dmFyIGk9dGhpcyxvPXQuX18udHJhbnMscz0wO2lmKG8pcmV0dXJuIGUuZWFjaChvLGZ1bmN0aW9uKGUsYSl7c3x8ZT09PW4mJihvW2FdPXIscz0xLHImJnIuX18mJmkuYWRkUGFyZW50KHIsdCkpfSksdDt2YXIgYSxmPXRoaXMuY29weU1ldGEodCk7ZS5lYWNoKHQsZnVuY3Rpb24oZSxvKXtlPT09biYmKGU9ciksZSYmKGE9ZS5fXykmJihpLnJlbW92ZVBhcmVudChlLHQpLGkuYWRkUGFyZW50KGUsZikpLGZbb109ZX0pLHQuX18uc3RvcmUuZnJlZXplRm4oZiksdGhpcy5yZWZyZXNoUGFyZW50cyh0LGYpfSxmaXhDaGlsZHJlbjpmdW5jdGlvbih0LG4pe3ZhciByPXRoaXM7ZS5lYWNoKHQsZnVuY3Rpb24oZSl7aWYoZSYmZS5fXyl7aWYoLTEhPWUuX18ucGFyZW50cy5pbmRleE9mKHQpKXJldHVybiByLmZpeENoaWxkcmVuKGUpO2lmKDE9PWUuX18ucGFyZW50cy5sZW5ndGgpcmV0dXJuIGUuX18ucGFyZW50cz1bdF07biYmci5yZW1vdmVQYXJlbnQoZSxuKSxyLmFkZFBhcmVudChlLHQpfX0pfSxjb3B5TWV0YTpmdW5jdGlvbih0KXt2YXIgcj1uLmNsb25lKHQpLGk9dC5fXztyZXR1cm4gZS5hZGRORShyLHtfXzp7c3RvcmU6aS5zdG9yZSx1cGRhdGVSb290OmkudXBkYXRlUm9vdCxsaXN0ZW5lcjppLmxpc3RlbmVyLHBhcmVudHM6aS5wYXJlbnRzLnNsaWNlKDApLHRyYW5zOmkudHJhbnMscGl2b3Q6aS5waXZvdH19KSxpLnBpdm90JiZ0aGlzLnVucGl2b3Qocikscn0scmVmcmVzaFBhcmVudHM6ZnVuY3Rpb24odCxlKXt2YXIgbixyPXQuX18saT1yLnBhcmVudHMubGVuZ3RoO2lmKHQuX18udXBkYXRlUm9vdCYmdC5fXy51cGRhdGVSb290KHQsZSksZSYmdGhpcy50cmlnZ2VyKGUsXCJ1cGRhdGVcIixlLHIuc3RvcmUubGl2ZSksaSlmb3Iobj1pLTE7bj49MDtuLS0pdGhpcy5yZWZyZXNoKHIucGFyZW50c1tuXSx0LGUpfSxyZW1vdmVQYXJlbnQ6ZnVuY3Rpb24odCxlKXt2YXIgbj10Ll9fLnBhcmVudHMscj1uLmluZGV4T2YoZSk7LTEhPXImJm4uc3BsaWNlKHIsMSl9LGFkZFBhcmVudDpmdW5jdGlvbih0LGUpe3ZhciBuPXQuX18ucGFyZW50cyxyPW4uaW5kZXhPZihlKTstMT09ciYmKG5bbi5sZW5ndGhdPWUpfSx0cmlnZ2VyOmZ1bmN0aW9uKHQsbixyLGkpe3ZhciBvPXQuX18ubGlzdGVuZXI7aWYobyl7dmFyIHM9by50aWNraW5nO2lmKGkpcmV0dXJuIHZvaWQoKHN8fHIpJiYoby50aWNraW5nPTAsby50cmlnZ2VyKG4sc3x8cikpKTtvLnRpY2tpbmc9cixzfHxlLm5leHRUaWNrKGZ1bmN0aW9uKCl7aWYoby50aWNraW5nKXt2YXIgdD1vLnRpY2tpbmc7by50aWNraW5nPTAsby50cmlnZ2VyKG4sdCl9fSl9fSxjcmVhdGVMaXN0ZW5lcjpmdW5jdGlvbih0KXt2YXIgZT10Ll9fLmxpc3RlbmVyO3JldHVybiBlfHwoZT1PYmplY3QuY3JlYXRlKGEse19ldmVudHM6e3ZhbHVlOnt9LHdyaXRhYmxlOiEwfX0pLHQuX18ubGlzdGVuZXI9ZSksZX19O24uaW5pdChmKTt2YXIgYz1mdW5jdGlvbih0LG4pe3ZhciByLGk9dGhpcyxvPW58fHt9LHM9e2xpdmU6by5saXZlfHwhMX0sYT1bXSxjPTAsdT1mdW5jdGlvbih0KXt2YXIgZSxuPXQuX187Zm9yKG4ubGlzdGVuZXImJmYudHJpZ2dlcih0LFwidXBkYXRlXCIsMCwhMCksZT0wO2U8bi5wYXJlbnRzLmxlbmd0aDtlKyspbi5zdG9yZS5ub3RpZnkoXCJub3dcIixuLnBhcmVudHNbZV0pfSxoPWZ1bmN0aW9uKHQpe2EucHVzaCh0KSxjfHwoYz0xLGUubmV4dFRpY2soZnVuY3Rpb24oKXthPVtdLGM9MH0pKX07cy5ub3RpZnk9ZnVuY3Rpb24odCxuLHIpe2lmKFwibm93XCI9PXQpe2lmKGEubGVuZ3RoKWZvcig7YS5sZW5ndGg7KXUoYS5zaGlmdCgpKTtlbHNlIHUobik7cmV0dXJuIG59dmFyIGk9Zlt0XShuLHIpO2lmKFwicGl2b3RcIiE9dCl7dmFyIG89ZS5maW5kUGl2b3QoaSk7aWYobylyZXR1cm4gaChpKSxvfXJldHVybiBpfSxzLmZyZWV6ZUZuPW8ubXV0YWJsZT09PSEwP2Z1bmN0aW9uKCl7fTpmdW5jdGlvbih0KXtPYmplY3QuZnJlZXplKHQpfSxyPWYuZnJlZXplKHQscyksci5fXy51cGRhdGVSb290PWZ1bmN0aW9uKHQsZSl7dD09PXImJihyPWUpfTt2YXIgXz1yLmdldExpc3RlbmVyKCksbD17fTtlLmVhY2goW1wib25cIixcIm9mZlwiLFwib25jZVwiLFwidHJpZ2dlclwiXSxmdW5jdGlvbih0KXt2YXIgbj17fTtuW3RdPV9bdF0uYmluZChfKSxlLmFkZE5FKGksbiksZS5hZGRORShsLG4pfSksZS5hZGRORSh0aGlzLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gcn0sc2V0OmZ1bmN0aW9uKHQpe2NvbnNvbGUubG9nKFwic2V0dGluZ1wiKSxyLnJlc2V0KHQpfSxnZXRFdmVudEh1YjpmdW5jdGlvbigpe3JldHVybiBsfX0pLGUuYWRkTkUodGhpcyx7Z2V0RGF0YTp0aGlzLmdldCxzZXREYXRhOnRoaXMuc2V0fSl9O3JldHVybiBjfSk7IiwiLyohIENvcHlyaWdodCAoYykgMjAxNiBOYXVmYWwgUmFiYmFuaSAoaHR0cDovL2dpdGh1Yi5jb20vQm9zTmF1ZmFsKVxuKiBMaWNlbnNlZCBVbmRlciBNSVQgKGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQpXG4qXG4qIFsgVnVlIEZyZWV6ZSBKUyBdXG4qICAgVmVyc2lvbiAxLjAuMFxuKlxuKi9cbmltcG9ydCBGcmVlemVyIGZyb20gJy4vZnJlZXplci5taW4uanMnXG5cbihmdW5jdGlvbigpe1xuXG5cdHZhciBWdWVGcmVlemUgPSB7XG5cblx0XHRpbnN0YWxsKFZ1ZSxvcHQpe1xuXG5cblx0XHRcdC8vIENoZWNrIHRoZSBGcmVlemVyXG5cdFx0XHRpZiggdHlwZW9mIEZyZWV6ZXIgPT0gJ3VuZGVmaW5lZCcgKSBjb25zb2xlLndhcm4oJ1tWdWUgRnJlZXplXTogWW91IE11c3QgSW5zdGFsbCBGcmVlemVyLmpzIGZpcnMhJylcblxuXHRcdFx0dmFyIHBsdWdpbiA9IHRoaXNcblxuXHRcdFx0Ly8gUGx1Z2luIFN0b3JlXG4gICAgICBpZih0eXBlb2Ygb3B0ICA9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjb25zb2xlLndhcm4oJ1tWdWUgRnJlZXplXTogUGxlYXNlIFNwZWNpZnkgdGhlIHN0b3JlISBWaWEgVnVlLnVzZSBPcHRpb25zIScpXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuXHRcdFx0ZWxzZSB7XG4gICAgICAgIC8vIGxpdmUgdXBkYXRlP1xuICAgICAgICB2YXIgbGl2ZSA9IG9wdC5saXZlID8gb3B0LmxpdmUgOiB0cnVlXG4gICAgICAgIC8vIG1ha2Ugb3VyIHN0b3JlIVxuICAgICAgICB2YXIgc3RvcmUgPSAgbmV3IEZyZWV6ZXIob3B0LnN0YXRlLHtsaXZlOmxpdmV9KVxuXHRcdFx0XHQvLyBiaW5kaW5nIHRoZSBzdG9yZVxuICAgICAgICBvcHQuYWN0aW9uKHN0b3JlKVxuICAgICAgfVxuXG5cdFx0XHR2YXIgY2xlYW5VcERhdGEgPSAoZGF0YSkgPT4ge1xuXHRcdFx0XHRyZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShkYXRhKSlcblx0XHRcdH1cblxuXHRcdFx0Ly8gTWFrZSBhIG1peGluXG5cdFx0XHRwbHVnaW4ubWl4aW4gPSB7fVxuXG5cdFx0XHQvLyBNaXhpbiBNZXRob2RzIEZvciB2bSBpbnN0YW5jZVxuXHRcdFx0cGx1Z2luLm1peGluLm1ldGhvZHMgPSB7XG5cdFx0XHRcdC8vIHNldCB0aGUgdm0gJHN0YXRlIHRvIG5ldyBzdGF0ZVxuXHRcdCAgICB1cGRhdGVTdGF0ZShvbGQsdmFsKXtcblx0XHRcdFx0XHR0aGlzLiRzZXQoJyRzdGF0ZScsY2xlYW5VcERhdGEoc3RvcmUuZ2V0KCkpKVxuXHRcdCAgICB9XG5cdFx0XHR9XG5cblx0XHRcdC8vIE1peGluIENyZWF0ZWQgRXZlbnRcblx0XHRcdHBsdWdpbi5taXhpbi5jcmVhdGVkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBtZSA9IHRoaXNcblxuXHRcdFx0XHQvLyBNYWtlIE1ldGhvZHNcblx0XHRcdFx0VnVlLnV0aWwuZGVmaW5lUmVhY3RpdmUodGhpcywnJHN0b3JlJyxzdG9yZSlcblx0XHRcdFx0VnVlLnV0aWwuZGVmaW5lUmVhY3RpdmUodGhpcywnJHN0YXRlJyxjbGVhblVwRGF0YShzdG9yZS5nZXQoKSkpXG5cdFx0ICAgIFZ1ZS51dGlsLmRlZmluZVJlYWN0aXZlKHRoaXMsJyRhY3Rpb24nLCBmdW5jdGlvbihldmVudE5hbWUsYXJncyl7XG5cdFx0XHRcdFx0Ly8gdHJpZ2dlciBmcmVlemUgZXZlbnQgd2l0aCBwYXNzIHRoZSBvbGQgdmFsdWUgYXQgdGhlIGVuZFxuXHRcdFx0XHRcdHN0b3JlLnRyaWdnZXIoZXZlbnROYW1lLGFyZ3MsbWUuJHN0YXRlKVxuXHRcdFx0XHR9KVxuXG5cdFx0XHRcdC8vIFdoZW4gU3RvcmUgVXBkYXRlZH5cblx0XHQgICAgdGhpcy4kc3RvcmUub24oJ3VwZGF0ZScsIGZ1bmN0aW9uICh2YWwpIHtcblx0XHRcdFx0XHQvLyBVcGRhdGUgdGhlIHN0YXRlXG5cdFx0ICAgICAgbWUudXBkYXRlU3RhdGUoY2xlYW5VcERhdGEobWUuJHN0YXRlKSx2YWwpXG5cdFx0ICAgIH0pXG5cdFx0XHR9XG5cblx0XHRcdC8vIE1lcmdlIG1peGluIHRvIFZNIHZpYSB2dWUgb3B0aW9uc1xuXHRcdFx0VnVlLm9wdGlvbnMgPSBWdWUudXRpbC5tZXJnZU9wdGlvbnMoVnVlLm9wdGlvbnMsIHBsdWdpbi5taXhpbilcblxuXHRcdH0gLy8gaW5zdGFsbCgpXG5cblxuXHR9IC8vIFZ1ZUZyZWV6ZVxuXG5cblx0Ly8gSWYgc3VwcG9ydCBub2RlIC8gRVM2IG1vZHVsZVxuXHRpZiggdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMgKXtcblx0XHRtb2R1bGUuZXhwb3J0cyA9IFZ1ZUZyZWV6ZVxuXHR9XG5cdC8vIGlmIHVzaW5nIHJlcXVpcmUganNcblx0aWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuXHRcdGRlZmluZSgoKSA9PiB7IHJldHVybiBWdWVGcmVlemUgfSlcblx0fVxuXHQvLyBpZiBzY3JpcHQgbG9hZGVkIGJ5IHNjcmlwdCB0YWcgaW4gSFRNTCBmaWxlXG5cdGlmICh0eXBlb2Ygd2luZG93ICE9PSB1bmRlZmluZWQpIHtcblx0XHR3aW5kb3cuVnVlRnJlZXplID0gVnVlRnJlZXplXG5cdH1cblxufSkoKTtcbiJdfQ==
