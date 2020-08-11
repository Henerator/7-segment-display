/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/script.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/display/display.ts":
/*!********************************!*\
  !*** ./src/display/display.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Display = void 0;
const models_1 = __webpack_require__(/*! ../models */ "./src/models/index.ts");
const element_group_1 = __webpack_require__(/*! ./element-group */ "./src/display/element-group.ts");
class Display {
    constructor(options) {
        this.options = options;
        this.groups = [];
        this.updatePosition(this.options.position);
    }
    updatePosition(position) {
        const { segmentSize, secondSegmentSize, elementPadding, secondElementPadding } = this.options;
        const elementWidth = segmentSize.width + segmentSize.height;
        const elementHeight = 2 * segmentSize.width + segmentSize.height;
        const elemengGroupWidth = 2 * elementWidth + elementPadding;
        const secondElementHeight = 2 * secondSegmentSize.width + secondSegmentSize.height;
        const hoursGroupPosition = {
            x: position.x - elemengGroupWidth - 1.5 * elementPadding,
            y: position.y,
        };
        const minutesGroupPosition = {
            x: position.x + 1.5 * elementPadding,
            y: position.y,
        };
        const secondsGroupPosition = {
            x: position.x + elemengGroupWidth + 4.5 * elementPadding,
            y: position.y + elementHeight / 2 - secondElementHeight / 2,
        };
        this.groups = [
            new element_group_1.ElementGroup(hoursGroupPosition, segmentSize, elementPadding),
            new element_group_1.ElementGroup(minutesGroupPosition, segmentSize, elementPadding),
            new element_group_1.ElementGroup(secondsGroupPosition, secondSegmentSize, secondElementPadding),
        ];
    }
    updateTheme(theme) {
        this.options.theme = theme;
    }
    update() {
        this.groups.forEach(group => group.turnOff());
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        this.groups[0].setValue(hours);
        this.groups[1].setValue(minutes);
        this.groups[2].setValue(seconds);
    }
    draw(context) {
        const { segmentOnColor, segmentOffColor, shadowColor, shadowSize } = this.options.theme;
        this.groups.forEach(group => {
            group.elements.forEach(element => {
                const height = element.segmentSize.height;
                context.save();
                context.translate(element.position.x + height / 2, element.position.y + height / 2);
                const sortedSegments = element.segments.slice().sort((a, b) => a.state - b.state);
                sortedSegments.forEach(segment => {
                    context.save();
                    context.translate(segment.position.x, segment.position.y);
                    context.rotate(segment.angle);
                    if (segment.state === models_1.SegmentState.On) {
                        context.shadowColor = shadowColor;
                        context.shadowBlur = shadowSize;
                        context.fillStyle = segmentOnColor;
                    }
                    else {
                        context.fillStyle = segmentOffColor;
                    }
                    context.beginPath();
                    const points = segment.segmentPoints.slice();
                    const startPoint = points.shift();
                    context.moveTo(startPoint.x, startPoint.y);
                    while (points.length > 0) {
                        const nextPoint = points.shift();
                        context.lineTo(nextPoint.x, nextPoint.y);
                    }
                    context.fill();
                    context.restore();
                });
                context.restore();
            });
        });
    }
}
exports.Display = Display;


/***/ }),

/***/ "./src/display/element-group.ts":
/*!**************************************!*\
  !*** ./src/display/element-group.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ElementGroup = void 0;
const element_1 = __webpack_require__(/*! ./element */ "./src/display/element.ts");
class ElementGroup {
    constructor(position, segmentSize, elementPadding) {
        const firstElement = new element_1.DisplayElement(position, segmentSize);
        const secondElement = new element_1.DisplayElement({
            x: position.x + firstElement.width + elementPadding,
            y: position.y,
        }, segmentSize);
        this.elements = [
            firstElement,
            secondElement,
        ];
    }
    turnOff() {
        this.elements.forEach(element => element.turnOff());
    }
    setValue(value) {
        const digits = this.getValueDigits(value);
        this.elements.forEach((element, index) => {
            element.setValue(digits[index] || 0);
        });
    }
    getValueDigits(value) {
        return `0${value}`.slice(-2)
            .split('')
            .map(digit => Number.parseInt(digit));
    }
}
exports.ElementGroup = ElementGroup;


/***/ }),

/***/ "./src/display/element.ts":
/*!********************************!*\
  !*** ./src/display/element.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayElement = void 0;
const models_1 = __webpack_require__(/*! ../models */ "./src/models/index.ts");
const segment_1 = __webpack_require__(/*! ./segment */ "./src/display/segment.ts");
class DisplayElement {
    constructor(position, segmentSize) {
        this.segments = [];
        this.states = [
            {
                value: 0,
                activeSegments: [0, 1, 2, 3, 4, 5],
            },
            {
                value: 1,
                activeSegments: [1, 2],
            },
            {
                value: 2,
                activeSegments: [0, 1, 3, 4, 6],
            },
            {
                value: 3,
                activeSegments: [0, 1, 2, 3, 6],
            },
            {
                value: 4,
                activeSegments: [1, 2, 5, 6],
            },
            {
                value: 5,
                activeSegments: [0, 2, 3, 5, 6],
            },
            {
                value: 6,
                activeSegments: [0, 2, 3, 4, 5, 6],
            },
            {
                value: 7,
                activeSegments: [0, 1, 2],
            },
            {
                value: 8,
                activeSegments: [0, 1, 2, 3, 4, 5, 6],
            },
            {
                value: 9,
                activeSegments: [0, 1, 2, 3, 5, 6],
            },
        ];
        this.segmentSize = segmentSize;
        const width = segmentSize.width;
        this.position = {
            x: position.x,
            y: position.y - segmentSize.width - segmentSize.height / 2,
        };
        this.segments = [
            new segment_1.Segment({ x: 0, y: 0 }, segmentSize, 0),
            new segment_1.Segment({ x: width, y: 0 }, segmentSize, Math.PI / 2),
            new segment_1.Segment({ x: width, y: width }, segmentSize, Math.PI / 2),
            new segment_1.Segment({ x: 0, y: 2 * width }, segmentSize, 0),
            new segment_1.Segment({ x: 0, y: width }, segmentSize, Math.PI / 2),
            new segment_1.Segment({ x: 0, y: 0 }, segmentSize, Math.PI / 2),
            new segment_1.Segment({ x: 0, y: width }, segmentSize, 0),
        ];
    }
    get width() {
        return this.segmentSize.width + this.segmentSize.height;
    }
    setValue(value) {
        this.turnOff();
        const state = this.states.find(st => st.value === value)
            || this.states[0];
        state.activeSegments.forEach(index => {
            this.segments[index].state = models_1.SegmentState.On;
        });
    }
    turnOff() {
        this.segments.forEach(segment => segment.state = models_1.SegmentState.Off);
    }
}
exports.DisplayElement = DisplayElement;


/***/ }),

/***/ "./src/display/index.ts":
/*!******************************!*\
  !*** ./src/display/index.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(__webpack_require__(/*! ./display */ "./src/display/display.ts"), exports);
__exportStar(__webpack_require__(/*! ./element */ "./src/display/element.ts"), exports);
__exportStar(__webpack_require__(/*! ./element-group */ "./src/display/element-group.ts"), exports);
__exportStar(__webpack_require__(/*! ./segment */ "./src/display/segment.ts"), exports);


/***/ }),

/***/ "./src/display/segment.ts":
/*!********************************!*\
  !*** ./src/display/segment.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Segment = void 0;
const models_1 = __webpack_require__(/*! ../models */ "./src/models/index.ts");
class Segment {
    constructor(position, size, angle, state = models_1.SegmentState.Off) {
        this.position = position;
        this.size = size;
        this.angle = angle;
        this.state = state;
        this.segmentPoints = [];
        this.generateSegmentPoints(size);
    }
    generateSegmentPoints(segmentSize) {
        const width = segmentSize.width;
        const height = segmentSize.height;
        this.segmentPoints = [
            { x: 0, y: 0 },
            { x: height / 2, y: -height / 2 },
            { x: width - height / 2, y: -height / 2 },
            { x: width, y: 0 },
            { x: width - height / 2, y: height / 2 },
            { x: height / 2, y: height / 2 },
            { x: 0, y: 0 },
        ];
    }
}
exports.Segment = Segment;


/***/ }),

/***/ "./src/models/display-options.model.ts":
/*!*********************************************!*\
  !*** ./src/models/display-options.model.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./src/models/index.ts":
/*!*****************************!*\
  !*** ./src/models/index.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(__webpack_require__(/*! ./point.model */ "./src/models/point.model.ts"), exports);
__exportStar(__webpack_require__(/*! ./size.model */ "./src/models/size.model.ts"), exports);
__exportStar(__webpack_require__(/*! ./display-options.model */ "./src/models/display-options.model.ts"), exports);
__exportStar(__webpack_require__(/*! ./segment-state.enum */ "./src/models/segment-state.enum.ts"), exports);


/***/ }),

/***/ "./src/models/point.model.ts":
/*!***********************************!*\
  !*** ./src/models/point.model.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./src/models/segment-state.enum.ts":
/*!******************************************!*\
  !*** ./src/models/segment-state.enum.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SegmentState = void 0;
var SegmentState;
(function (SegmentState) {
    SegmentState[SegmentState["Off"] = 0] = "Off";
    SegmentState[SegmentState["On"] = 1] = "On";
})(SegmentState = exports.SegmentState || (exports.SegmentState = {}));


/***/ }),

/***/ "./src/models/size.model.ts":
/*!**********************************!*\
  !*** ./src/models/size.model.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./src/script.ts":
/*!***********************!*\
  !*** ./src/script.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const display_1 = __webpack_require__(/*! ./display */ "./src/display/index.ts");
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
let width;
let height;
let centerPoint;
let display;
const themes = {
    day: {
        window: {
            background: '#fff',
        },
        display: {
            segmentOnColor: '#000',
            segmentOffColor: '#e4e4e4',
            shadowColor: '#000',
            shadowSize: 3,
        },
    },
    night: {
        window: {
            background: '#222',
        },
        display: {
            segmentOnColor: '#fff',
            segmentOffColor: '#262626',
            shadowColor: '#fff',
            shadowSize: 3,
        },
    },
};
let currentTheme = themes.day;
window.addEventListener('resize', resizeCanvas, false);
function createDisplay() {
    display = new display_1.Display({
        position: centerPoint,
        segmentSize: { width: 100, height: 25 },
        secondSegmentSize: { width: 25, height: 6 },
        elementPadding: 20,
        secondElementPadding: 5,
        theme: currentTheme.display,
    });
}
function updateTheme() {
    const now = new Date();
    const hours = now.getHours();
    if (hours >= 5 && hours < 19) {
        currentTheme = themes.day;
    }
    else {
        currentTheme = themes.night;
    }
}
function update() {
    updateTheme();
    display.updateTheme(currentTheme.display);
    display.update();
}
function updateCanvasSize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    centerPoint = {
        x: width / 2,
        y: height / 2,
    };
}
function resizeCanvas() {
    updateCanvasSize();
    display.updatePosition(centerPoint);
    update();
    draw();
}
function clear() {
    context.fillStyle = currentTheme.window.background;
    context.fillRect(0, 0, width, height);
}
function drawDisplay() {
    display.draw(context);
}
function draw() {
    clear();
    drawDisplay();
}
function mainLoop() {
    update();
    draw();
    setTimeout(mainLoop, 1000);
}
function setup() {
    updateCanvasSize();
    createDisplay();
}
setup();
mainLoop();


/***/ })

/******/ });