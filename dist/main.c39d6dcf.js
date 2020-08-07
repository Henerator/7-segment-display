// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"display/classes/display-element-group.class.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var index_1 = require("./index");

var DisplayElementGroup =
/** @class */
function () {
  function DisplayElementGroup(position, segmentSize, elementPadding) {
    var firstElement = new index_1.DisplayElement(position, segmentSize);
    var secondElement = new index_1.DisplayElement({
      x: position.x + firstElement.width + elementPadding,
      y: position.y
    }, segmentSize);
    this.elements = [firstElement, secondElement];
  }

  DisplayElementGroup.prototype.draw = function (context) {
    this.elements.forEach(function (element) {
      element.draw(context);
    });
  };

  DisplayElementGroup.prototype.turnOff = function () {
    this.elements.forEach(function (element) {
      return element.turnOff();
    });
  };

  DisplayElementGroup.prototype.setValue = function (value) {
    var digits = this.getValueDigits(value);
    this.elements.forEach(function (element, index) {
      element.setValue(digits[index] || 0);
    });
  };

  DisplayElementGroup.prototype.getValueDigits = function (value) {
    return ("0" + value).slice(-2).split('').map(function (digit) {
      return Number.parseInt(digit);
    });
  };

  return DisplayElementGroup;
}();

exports.DisplayElementGroup = DisplayElementGroup;
},{"./index":"display/classes/index.ts"}],"display/classes/display.class.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var display_element_group_class_1 = require("./display-element-group.class");

var Display =
/** @class */
function () {
  function Display(options) {
    var position = options.position;
    var segmentSize = options.segmentSize;
    var secondSegmentSize = options.secondSegmentSize;
    var elementWidth = options.segmentSize.width + options.segmentSize.height;
    var elementHeight = 2 * options.segmentSize.width + options.segmentSize.height;
    var elementPadding = options.elementPadding;
    var elemengGroupWidth = 2 * elementWidth + elementPadding;
    var secondElementHeight = 2 * options.secondSegmentSize.width + options.secondSegmentSize.height;
    var secondElementPadding = options.secondElementPadding;
    var hoursGroupPosition = {
      x: position.x - elemengGroupWidth - 1.5 * elementPadding,
      y: position.y
    };
    var minutesGroupPosition = {
      x: position.x + 1.5 * elementPadding,
      y: position.y
    };
    var secondsGroupPosition = {
      x: position.x + elemengGroupWidth + 4.5 * elementPadding,
      y: position.y + elementHeight / 2 - secondElementHeight / 2
    };
    this.groups = [new display_element_group_class_1.DisplayElementGroup(hoursGroupPosition, segmentSize, elementPadding), new display_element_group_class_1.DisplayElementGroup(minutesGroupPosition, segmentSize, elementPadding), new display_element_group_class_1.DisplayElementGroup(secondsGroupPosition, secondSegmentSize, secondElementPadding)];
  }

  Display.prototype.draw = function (context) {
    this.groups.forEach(function (group) {
      group.draw(context);
    });
  };

  Display.prototype.setTime = function () {
    this.groups.forEach(function (group) {
      return group.turnOff();
    });
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    this.groups[0].setValue(hours);
    this.groups[1].setValue(minutes);
    this.groups[2].setValue(seconds);
  };

  return Display;
}();

exports.Display = Display;
},{"./display-element-group.class":"display/classes/display-element-group.class.ts"}],"display/models/display-options.model.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
},{}],"display/models/element-segment-state.enum.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ElementSegmentState;

(function (ElementSegmentState) {
  ElementSegmentState[ElementSegmentState["Off"] = 0] = "Off";
  ElementSegmentState[ElementSegmentState["On"] = 1] = "On";
})(ElementSegmentState = exports.ElementSegmentState || (exports.ElementSegmentState = {}));
},{}],"display/models/index.ts":[function(require,module,exports) {
"use strict";

function __export(m) {
  for (var p in m) {
    if (!exports.hasOwnProperty(p)) exports[p] = m[p];
  }
}

Object.defineProperty(exports, "__esModule", {
  value: true
});

__export(require("./display-options.model"));

__export(require("./element-segment-state.enum"));
},{"./display-options.model":"display/models/display-options.model.ts","./element-segment-state.enum":"display/models/element-segment-state.enum.ts"}],"display/classes/element-segment.class.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var models_1 = require("../models");

var ElementSegment =
/** @class */
function () {
  function ElementSegment(position, size, angle, state) {
    if (state === void 0) {
      state = models_1.ElementSegmentState.Off;
    }

    this.position = position;
    this.size = size;
    this.angle = angle;
    this.state = state;
    this.segmentPoints = [];
    this.generateSegmentPoints(size);
  }

  ElementSegment.prototype.draw = function (context) {
    context.save();
    context.translate(this.position.x, this.position.y);
    context.rotate(this.angle);

    if (this.state === models_1.ElementSegmentState.On) {
      context.shadowColor = '#fff';
      context.shadowBlur = 12;
      context.fillStyle = '#eee';
    } else {
      context.fillStyle = '#373737';
    }

    context.beginPath();
    var points = this.segmentPoints.slice();
    var startPoint = points.shift();
    context.moveTo(startPoint.x, startPoint.y);

    while (points.length > 0) {
      var nextPoint = points.shift();
      context.lineTo(nextPoint.x, nextPoint.y);
    }

    context.fill();
    context.restore();
  };

  ElementSegment.prototype.generateSegmentPoints = function (segmentSize) {
    var width = segmentSize.width;
    var height = segmentSize.height;
    this.segmentPoints = [{
      x: 0,
      y: 0
    }, {
      x: height / 2,
      y: -height / 2
    }, {
      x: width - height / 2,
      y: -height / 2
    }, {
      x: width,
      y: 0
    }, {
      x: width - height / 2,
      y: height / 2
    }, {
      x: height / 2,
      y: height / 2
    }, {
      x: 0,
      y: 0
    }];
  };

  return ElementSegment;
}();

exports.ElementSegment = ElementSegment;
},{"../models":"display/models/index.ts"}],"display/classes/element.class.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var element_segment_class_1 = require("./element-segment.class");

var element_segment_state_enum_1 = require("../models/element-segment-state.enum");

var DisplayElement =
/** @class */
function () {
  function DisplayElement(position, segmentSize) {
    this.segments = [];
    this.states = [{
      value: 0,
      activeSegments: [0, 1, 2, 3, 4, 5]
    }, {
      value: 1,
      activeSegments: [1, 2]
    }, {
      value: 2,
      activeSegments: [0, 1, 3, 4, 6]
    }, {
      value: 3,
      activeSegments: [0, 1, 2, 3, 6]
    }, {
      value: 4,
      activeSegments: [1, 2, 5, 6]
    }, {
      value: 5,
      activeSegments: [0, 2, 3, 5, 6]
    }, {
      value: 6,
      activeSegments: [0, 2, 3, 4, 5, 6]
    }, {
      value: 7,
      activeSegments: [0, 1, 2]
    }, {
      value: 8,
      activeSegments: [0, 1, 2, 3, 4, 5, 6]
    }, {
      value: 9,
      activeSegments: [0, 1, 2, 3, 5, 6]
    }];
    this.segmentSize = segmentSize;
    var width = segmentSize.width;
    this.position = {
      x: position.x,
      y: position.y - segmentSize.width - segmentSize.height / 2
    };
    this.segments = [new element_segment_class_1.ElementSegment({
      x: 0,
      y: 0
    }, segmentSize, 0), new element_segment_class_1.ElementSegment({
      x: width,
      y: 0
    }, segmentSize, Math.PI / 2), new element_segment_class_1.ElementSegment({
      x: width,
      y: width
    }, segmentSize, Math.PI / 2), new element_segment_class_1.ElementSegment({
      x: 0,
      y: 2 * width
    }, segmentSize, 0), new element_segment_class_1.ElementSegment({
      x: 0,
      y: width
    }, segmentSize, Math.PI / 2), new element_segment_class_1.ElementSegment({
      x: 0,
      y: 0
    }, segmentSize, Math.PI / 2), new element_segment_class_1.ElementSegment({
      x: 0,
      y: width
    }, segmentSize, 0)];
  }

  Object.defineProperty(DisplayElement.prototype, "width", {
    get: function get() {
      return this.segmentSize.width + this.segmentSize.height;
    },
    enumerable: true,
    configurable: true
  });

  DisplayElement.prototype.draw = function (context) {
    var height = this.segmentSize.height;
    context.save();
    context.translate(this.position.x + height / 2, this.position.y + height / 2);
    var sortedSegments = this.segments.slice().sort(function (a, b) {
      return a.state < b.state ? -1 : 1;
    });
    sortedSegments.forEach(function (segment) {
      segment.draw(context);
    });
    context.restore();
  };

  DisplayElement.prototype.setValue = function (value) {
    var _this = this;

    this.turnOff();
    var state = this.states.find(function (st) {
      return st.value === value;
    }) || this.states[0];
    state.activeSegments.forEach(function (index) {
      _this.segments[index].state = element_segment_state_enum_1.ElementSegmentState.On;
    });
  };

  DisplayElement.prototype.turnOff = function () {
    this.segments.forEach(function (segment) {
      return segment.state = element_segment_state_enum_1.ElementSegmentState.Off;
    });
  };

  return DisplayElement;
}();

exports.DisplayElement = DisplayElement;
},{"./element-segment.class":"display/classes/element-segment.class.ts","../models/element-segment-state.enum":"display/models/element-segment-state.enum.ts"}],"display/classes/index.ts":[function(require,module,exports) {
"use strict";

function __export(m) {
  for (var p in m) {
    if (!exports.hasOwnProperty(p)) exports[p] = m[p];
  }
}

Object.defineProperty(exports, "__esModule", {
  value: true
});

__export(require("./display.class"));

__export(require("./element.class"));

__export(require("./display-element-group.class"));

__export(require("./element-segment.class"));
},{"./display.class":"display/classes/display.class.ts","./element.class":"display/classes/element.class.ts","./display-element-group.class":"display/classes/display-element-group.class.ts","./element-segment.class":"display/classes/element-segment.class.ts"}],"main.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var classes_1 = require("./display/classes");

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var width;
var height;
var centerPoint;
var display;
window.addEventListener('resize', resizeCanvas, false);
resizeCanvas();
createDisplay();
updateDisplay();

function updateDisplay() {
  clear();
  display.setTime();
  display.draw(context);
  setTimeout(function () {
    return updateDisplay();
  }, 1000);
}

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  centerPoint = {
    x: width / 2,
    y: height / 2
  };
  createDisplay();
}

function clear() {
  context.fillStyle = '#333';
  context.fillRect(0, 0, width, height);
}

function createDisplay() {
  display = new classes_1.Display({
    position: centerPoint,
    segmentSize: {
      width: 100,
      height: 25
    },
    secondSegmentSize: {
      width: 25,
      height: 6
    },
    elementPadding: 20,
    secondElementPadding: 5
  });
}
},{"./display/classes":"display/classes/index.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49201" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.ts"], null)
//# sourceMappingURL=/main.c39d6dcf.map