const config = require('../config.json');
const console = require('electron-log');
const URL = require('url-polyfill');
const { seccaIsLoaded, Secca } = require('../algorithms/secca');
const { Vector } = require('arctan.meridian');

let body;
let canvas;
let ctx;
let img;

window.addEventListener('DOMContentLoaded', () => {
    body = document.querySelector('body');
    canvas = document.querySelector('.canvas');
    ctx = canvas.getContext('2d');
    body.insertBefore(titlebar(), body.firstChild);
    makeButtonsUsable();
    canvas.width = config.simulation.width;
    canvas.height = config.simulation.height;
    img = ctx.createImageData(canvas.width, canvas.height);
    drawGrid();
    drawStructure();
});

const dir = (n) => Math.round(n) >= 0 ? 1 : -1;

function titlebar() {
    const div = document.createElement('div');
    div.classList.add('tb');
    const title = document.createElement('span');
    title.classList.add('tb-title');
    title.innerText = document.querySelector("title").innerText;
    const close = document.createElement('button');
    close.classList.add('tb-close', 'tb-button');
    close.innerText = '✕';
    const hide = document.createElement('button');
    hide.classList.add('tb-hide', 'tb-button');
    hide.innerText = '−';
    div.append(title);
    div.append(close);
    div.append(hide);
    return div;
}

function makeButtonsUsable() {
    document.querySelector('.tb-close').addEventListener('click', () => {
        window.close();
    });
}

let cellCount = 10;
let margin = 3;

function drawGrid() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    let gx = canvas.width / cellCount;
    let gy = canvas.height / cellCount;
    for (let y = 0; y < cellCount; ++y) {
        for (let x = 0; x < cellCount; ++x) {
            ctx.fillStyle = 'white';
            ctx.fillRect(gx * (x + 1), gy * y, 1, gy);
            ctx.fillRect(gx * x, gy * (y + 1), gx, 1);
        }
    }
}

let originStructure = [
    [0, 0, 1, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 1],
    [1, 0, 1, 0]
];
let position = [3, 3];

function drawStructure() {
    let gx = canvas.width / cellCount;
    let gy = canvas.height / cellCount;
    let width = originStructure[0].length;
    let height = originStructure.length;
    let objects = Secca.loadArray(originStructure, (val) => val == 1 ? true : false);
    for (let y = 0; y < height; ++y) {
        for (let x = 0; x < width; ++x) {
            if (originStructure[y][x] == 1) {
                ctx.fillRect(gx * (x + position[0]) + margin, gy * (y + position[1]) + margin, gx - margin * 2, gy - margin * 2);
            }
        }
    } 
}

console.log(seccaIsLoaded);
console.log(new Vector(0, 0, 0));
