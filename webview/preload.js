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

console.log(seccaIsLoaded);
console.log(new Vector(0, 0, 0));
