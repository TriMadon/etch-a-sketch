// #region constants

const GRID_WIDTH = 720;
const DEFAULT_COLOR = "brown";
const DEFAULT_BRUSH_COLOR = "aquamarine";
const DEFAULT_BRUSH_MODE = "solid";

const grid = document.querySelector(".grid");

const allButtons = document.querySelectorAll("button");
const resizeButton = document.getElementById("resize");
const clearButton = document.getElementById("clear");
const recolorButton = document.getElementById("recolor");
const customizeBrushButton = document.getElementById("brush");

const resizeModal = document.getElementById("resizeModal");
const resizeSlider = document.querySelector("#resizeModal input");
const rangeValue = document.querySelector("#resizeModal .rangeValue");
const resizeOk = document.querySelector("#resizeModal .submit");

const recolorModal = document.getElementById("colorModal");
const recolorPicker = document.querySelector("#colorModal .colorPicker");
const recolorOk = document.querySelector("#colorModal .submit");

const brushModal = document.getElementById("brushModal");
const brushColorMode = document.getElementById("colorMode");
const brushColorPicker = document.querySelector("#brushModal .colorPicker");
const darkEffectCheckbox = document.querySelector("#brushModal .checkbox");
const brushOk = document.querySelector("#brushModal .submit");

// #endregion

// #region variables

let gridColor = DEFAULT_COLOR;
let brushColor = DEFAULT_BRUSH_COLOR;
let brushMode = DEFAULT_BRUSH_MODE;
let darkeningEffect = false;
let brightnessTrackerMap = new Map();

// #endregion

// #region BrightnessTracker Class

class BrightnessTracker {
	constructor(element) {
		this.element = element;
		this.brightness = 1;
		this.visited = false;
	}

	resetBrightness() {
		this.brightness = 1;
		this.visited = false;
		this.applyBrightness();
	}

	changeBrightnessBy(delta) {
		if (!this.visited) {
			this.visited = true;
			return;
		}
		this.brightness = Math.max(0, this.brightness + delta);
		this.applyBrightness();
	}

	applyBrightness() {
		this.element.style.filter = `brightness(${this.brightness})`;
	}
}

// #endregion

// #region reusable functions

function createSqaure(width, color = gridColor) {
	let square = document.createElement("div");
	square.classList.add("square");
	square.style.width = `${width}px`;
	square.style.height = `${width}px`;
	square.style.backgroundColor = color;
	square.style.borderRadius = "15%";
	square.addEventListener("mouseover", changeColor);
	return square;
}

function changeColor(e) {
	if (brushMode === "solid") {
		e.target.style.backgroundColor = brushColor;
	} else if (brushMode === "random") {
		e.target.style.backgroundColor = generateRandomColor();
	}
	if (darkeningEffect) {
		brightnessTrackerMap.get(e.target).changeBrightnessBy(-0.1);
	} else {
		e.target.style.filter = "brightness(1)";
	}
}

function generateRandomColor() {
	return `RGB(${Math.floor(Math.random() * 255) + 1}, ${
		Math.floor(Math.random() * 255) + 1
	}, ${Math.floor(Math.random() * 255) + 1})`;
}

function addSquare(squares) {
	squares.forEach((square) => {
		grid.appendChild(square);
	});
}

function getAllSquares() {
	return document.querySelectorAll(".square");
}

function createGrid(numSquares) {
	const MAX_SIZE_FOR_POP_EFFECT = 26;
	const MAX_SIZE_FOR_ROUND_BORDER = 50;
	let squares = [];
	let gaps = numSquares - 1;
	let sqWidth = (GRID_WIDTH - gaps) / numSquares;
	for (let i = 0; i < numSquares ** 2; i++) {
		let square = createSqaure(sqWidth);
		if (numSquares < MAX_SIZE_FOR_POP_EFFECT) {
			makeElementPop(square);
		}
		if (numSquares > MAX_SIZE_FOR_ROUND_BORDER) {
			square.style.borderRadius = "";
		}
		squares.push(square);
	}
	squares.forEach((square) => {
		const tracker = new BrightnessTracker(square);
		brightnessTrackerMap.set(square, tracker);
	});
	addSquare(squares);
}

function makeElementPop(square) {
	square.addEventListener("mouseover", (e) => {
		e.target.classList.add("hovered");
	});
	square.addEventListener("mouseout", (e) => {
		e.target.classList.remove("hovered");
	});
}

function clearGrid() {
	getAllSquares().forEach((square) => {
		square.style.backgroundColor = gridColor;
	});
	brightnessTrackerMap.forEach((square) => {
		square.resetBrightness();
	});
}

function deleteGrid() {
	grid.replaceChildren();
}

function makeNewGrid(newSize) {
	deleteGrid();
	createGrid(newSize);
}

function recolorGrid(color) {
	gridColor = color;
	clearGrid();
}

// #endregion

// #region initialization functions

function initResize() {
	resizeButton.onclick = () => resizeModal.showModal();
	resizeSlider.onmousemove = () => showSliderValue(resizeSlider.value);
	resizeOk.onclick = () => makeNewGrid(resizeSlider.value);

	function showSliderValue(value) {
		rangeValue.textContent = value;
	}
}

function initClear() {
	clearButton.onclick = () => clearGrid();
}

function initRecolor() {
	recolorButton.onclick = () => recolorModal.showModal();
	recolorOk.onclick = () => recolorGrid(recolorPicker.value);
}

function initBrush() {
	customizeBrushButton.onclick = () => brushModal.showModal();
	brushColorMode.addEventListener("change", function () {
		if (brushColorMode.value === "solid") {
			brushColorPicker.style.display = "block";
		} else {
			brushColorPicker.style.display = "none";
		}
	});
	brushOk.onclick = () => {
		brushMode = brushColorMode.value
			? brushColorMode.value
			: DEFAULT_BRUSH_MODE;
		brushColor = brushColorPicker.value;
		darkeningEffect = darkEffectCheckbox.checked;
	};
}

function initializeGrid() {
	makeNewGrid(16);
	initResize();
	initClear();
	initRecolor();
	initBrush();
}

// #endregion

window.onload = () => {
	initializeGrid();
};
