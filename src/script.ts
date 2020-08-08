import { Display } from './display';
import { Point } from './models';

const canvas = <HTMLCanvasElement>document.getElementById('canvas');
const context = <CanvasRenderingContext2D>canvas.getContext('2d');

let width: number;
let height: number;
let centerPoint: Point;

let display: Display;

const themes = {
    day: {
        window: {
            background: '#fff',
        },
        display: {
            segmentOnColor: '#222',
            segmentOffColor: '#e6e6e6',
            shadowColor: '#000',
            shadowSize: 3,
        },
    },
    night: {
        window: {
            background: '#222',
        },
        display: {
            segmentOnColor: '#eee',
            segmentOffColor: '#262626',
            shadowColor: '#fff',
            shadowSize: 3,
        },
    },
};
let currentTheme = themes.day;

window.addEventListener('resize', resizeCanvas, false);

function createDisplay() {
    display = new Display({
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
    } else {
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