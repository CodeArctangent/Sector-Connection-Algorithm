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
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    margin = canvas.width / cellCount / 10;
    generateStructure();
    drawStructure();
    drawGrid();
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
let margin = 5;

function drawGrid() {
    let gx = canvas.width / cellCount;
    let gy = canvas.height / cellCount;
    for (let y = 0; y < cellCount; ++y) {
        for (let x = 0; x < cellCount; ++x) {
            ctx.fillStyle = 'white';
            ctx.fillRect(gx * (x + 1) - 0.5, gy * y - 0.5, 1, gy);
            ctx.fillRect(gx * x - 0.5, gy * (y + 1) - 0.5, gx, 1);
        }
    }
}

let originStructure = [];

function generateStructure() {
    originStructure = new Array(cellCount);
    for (var x = 0; x < cellCount; ++x) {
        originStructure[x] = new Array(cellCount);
    }
    for (let y = 0; y < cellCount; ++y) {
        for (var x = 0; x < cellCount; ++x) {
            originStructure[y][x] = Math.random() > 0.5 ? 1 : 0;
        }
    }
}

let position = [3, 3];

function valueChecker(val, y, x) {
    if (val[y])
        if (val[y][x])
            if (val[y][x] == 1) return true;
            else return false;
        else return false;
    else return false;
}

function drawStructure() {
    let gx = canvas.width / cellCount;
    let gxh = gx / 2;
    let gy = canvas.height / cellCount;
    let gyh = gy / 2;
    let width = originStructure[0].length;
    let height = originStructure.length;
    let objects = Secca.loadArray(originStructure, valueChecker);
    console.log(objects);
    for (let y = 0; y < height; ++y) {
        for (let x = 0; x < width; ++x) {
            if (originStructure[y][x] == 1) {
                let curObject = objects[`${x}_${y}`];
                ctx.fillStyle = 'white';
                let blockPos = [gx * (x + position[0]), gy * (y + position[1])];
                ctx.fillRect(blockPos[0], blockPos[1], gx, gy);
                ctx.fillStyle = 'rgb(255, 0, 0)';
                if (!curObject.n && curObject.e && curObject.w)
                    ctx.fillRect(blockPos[0], blockPos[1], gx, margin);
                if (!curObject.e && curObject.n && curObject.s)
                    ctx.fillRect(blockPos[0] + gx - margin, blockPos[1], margin, gy);
                if (!curObject.s && curObject.e && curObject.w)
                    ctx.fillRect(blockPos[0], blockPos[1] + gy - margin, gx, margin);
                if (!curObject.w && curObject.n && curObject.s)
                    ctx.fillRect(blockPos[0], blockPos[1], margin, gy);
                if (margin < gxh) {
                    if (!curObject.n)
                        if (!curObject.e && curObject.w)
                            ctx.fillRect(blockPos[0], blockPos[1], gx - margin, margin);
                        else if (!curObject.e && !curObject.w)
                            ctx.fillRect(blockPos[0] + margin, blockPos[1], gx - margin * 2, margin);
                        else if (curObject.e && !curObject.w)
                            ctx.fillRect(blockPos[0] + margin, blockPos[1], gx - margin, margin);
                    if (!curObject.e)
                        if (!curObject.n && curObject.s)
                            ctx.fillRect(blockPos[0] + gx - margin, blockPos[1] + margin, margin, gy - margin);
                        else if (!curObject.n && !curObject.s)
                            ctx.fillRect(blockPos[0] + gx - margin, blockPos[1] + margin, margin, gy - margin * 2);
                        else if (curObject.n && !curObject.s)
                            ctx.fillRect(blockPos[0] + gx - margin, blockPos[1], margin, gy - margin);
                    if (!curObject.s)
                        if (!curObject.e && curObject.w)
                            ctx.fillRect(blockPos[0], blockPos[1] + gy - margin, gx - margin, margin);
                        else if (!curObject.e && !curObject.w)
                            ctx.fillRect(blockPos[0] + margin, blockPos[1] + gy - margin, gx - margin * 2, margin);
                        else if (curObject.e && !curObject.w)
                            ctx.fillRect(blockPos[0] + margin, blockPos[1] + gy - margin, gx - margin, margin);
                    if (!curObject.w)
                        if (!curObject.n && curObject.s)
                            ctx.fillRect(blockPos[0], blockPos[1] + margin, margin, gy - margin);
                        else if (!curObject.n && !curObject.s)
                            ctx.fillRect(blockPos[0], blockPos[1] + margin, margin, gy - margin * 2);
                        else if (curObject.n && !curObject.s)
                            ctx.fillRect(blockPos[0], blockPos[1], margin, gy - margin);
                }
                ctx.fillStyle = 'rgb(0, 255, 0)';
                if (!curObject.n && !curObject.w)
                    ctx.fillRect(blockPos[0], blockPos[1], margin, margin);
                if (!curObject.n && !curObject.e)
                    ctx.fillRect(blockPos[0] + gx - margin, blockPos[1], margin, margin);
                if (!curObject.s && !curObject.e)
                    ctx.fillRect(blockPos[0] + gx - margin, blockPos[1] + gy - margin, margin, margin);
                if (!curObject.s && !curObject.w)
                    ctx.fillRect(blockPos[0], blockPos[1] + gy - margin, margin, margin);
                ctx.fillStyle = 'rgb(0, 0, 255)';
                if (!curObject.nw && curObject.n && curObject.w)
                    ctx.fillRect(blockPos[0], blockPos[1], margin, margin);
                if (!curObject.ne && curObject.n && curObject.e)
                    ctx.fillRect(blockPos[0] + gx - margin, blockPos[1], margin, margin);
                if (!curObject.se && curObject.s && curObject.e)
                    ctx.fillRect(blockPos[0] + gx - margin, blockPos[1] + gy - margin, margin, margin);
                if (!curObject.sw && curObject.s && curObject.w)
                    ctx.fillRect(blockPos[0], blockPos[1] + gy - margin, margin, margin);
            }
        }
    } 
}



console.log(seccaIsLoaded);
console.log(new Vector(0, 0, 0));
