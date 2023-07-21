const GRID_WIDTH = 720;
const DEFAULT_COLOR = "brown";
const NEW_COLOR = "aquamarine";
const grid = document.querySelector(".grid");

let gridColor = DEFAULT_COLOR;

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
	e.target.style.backgroundColor = NEW_COLOR;
}

function addSquare(squares) {
	squares.forEach((square) => {
		grid.appendChild(square);
	});
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
	const squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
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

const resizeModal = document.getElementById("resizeModal");
const resizeSlider = document.querySelector("#resizeModal input");
const rangeValue = document.querySelector("#resizeModal .rangeValue");
const resizeOk = document.querySelector("#resizeModal .submit");

const recolorModal = document.getElementById("colorModal");
const recolorSwatch = document.querySelector("#colorModal input");
const recolorOk = document.querySelector("#colorModal .submit");

resizeButton.onclick = () => resizeModal.showModal();
resizeSlider.onmousemove = () => showSliderValue(resizeSlider.value);
resizeOk.onclick = () => makeNewGrid(resizeSlider.value);

function showSliderValue(value) {
    rangeValue.textContent = value;
}

clearButton.onclick = () => clearGrid();

recolorButton.onclick = () => recolorModal.showModal();
recolorOk.onclick = () => recolorGrid(recolorSwatch.value);
