const GRID_WIDTH = 720;
const DEFAULT_COLOR = "brown";
const NEW_COLOR = "aquamarine";
const grid = document.querySelector(".grid");

function createSqaure(width, color = DEFAULT_COLOR) {
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
        square.style.backgroundColor = DEFAULT_COLOR;
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

makeNewGrid(16);

const allButtons = document.querySelectorAll("button");
const resizeButton = document.querySelector("#resize");
const clearButton = document.querySelector("#clear");

allButtons.forEach((button) => {
	button.onclick = () => button.classList.add("pulse");
	button.onanimationend = () => button.classList.remove("pulse");
});

resizeButton.onclick = () => promptUserForSize();
clearButton.onclick = () => clearGrid();
