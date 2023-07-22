const GRID_WIDTH = 720;
const DEFAULT_COLOR = "brown";
const DEFAULT_BRUSH_COLOR = "aquamarine";
const DEFAULT_BRUSH_MODE = "solid";
const grid = document.querySelector(".grid");

let gridColor = DEFAULT_COLOR;
let brushColor = DEFAULT_BRUSH_COLOR;
let brushMode = DEFAULT_BRUSH_MODE;

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

function createGrid(numSqaures) {
	let sqaures = [];
	let gaps = numSqaures - 1;
	let sqWidth = (720 - gaps) / numSqaures;
	for (let i = 0; i < numSqaures ** 2; i++) {
		let square = createSqaure(sqWidth);
		if (numSqaures < 26) {
			makeItPop(square);
		}
		if (numSqaures > 50) {
			square.style.borderRadius = "";
		}
		sqaures.push(square);
	}
	addSquare(sqaures);
}

function makeItPop(square) {
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
}

function deleteGrid() {
	grid.replaceChildren();
}

function makeNewGrid(newSize) {
	deleteGrid();
	createGrid(newSize);
}

function promptUserForSize() {
	let newSize = +prompt("Type the new size of the grid (1-100)");
	if (
		!Number.isInteger(newSize) ||
		!newSize ||
		newSize < 0 ||
		newSize > 100
	) {
		return;
	}
	makeNewGrid(newSize);
}

function recolorGrid(color) {
	gridColor = color;
	clearGrid();
}

makeNewGrid(16);

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
const brushOk = document.querySelector("#brushModal .submit");

resizeButton.onclick = () => resizeModal.showModal();
resizeSlider.onmousemove = () => showSliderValue(resizeSlider.value);
resizeOk.onclick = () => makeNewGrid(resizeSlider.value);

function showSliderValue(value) {
	rangeValue.textContent = value;
}

clearButton.onclick = () => clearGrid();

recolorButton.onclick = () => recolorModal.showModal();
recolorOk.onclick = () => recolorGrid(recolorPicker.value);

customizeBrushButton.onclick = () => brushModal.showModal();
brushColorMode.addEventListener("change", function () {
	if (brushColorMode.value === "solid") {
		brushColorPicker.style.display = "block";
	} else {
		brushColorPicker.style.display = "none";
	}
});
brushOk.onclick = () => {
	brushMode = brushColorMode.value;
	brushColor = brushColorPicker.value;
};
