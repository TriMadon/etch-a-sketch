const GRID_WIDTH = 720;
const grid = document.querySelector(".grid");
let sqaures = [];

function createSqaure(width, color = "brown") {
	let square = document.createElement("div");
	square.classList.add("square");
	square.style.width = `${width}px`;
	square.style.height = `${width}px`;
	square.style.color = color;
	return square;
}

function addSquare(squares) {
	squares.forEach((square) => {
		grid.appendChild(square);
	});
}

function createGrid(numSqaures) {
	let gaps = numSqaures - 1;
	let sqWidth = (720 - gaps) / numSqaures;
	for (let i = 0; i < numSqaures ** 2; i++) {
		sqaures.push(createSqaure(sqWidth, "brown"));
	}
	addSquare(sqaures);
}

function clearGrid() {
	sqaures.forEach((sqaure) => {
		sqaure.classList.remove("colored");
	});
}

function deleteGrid() {
	sqaures = [];
	grid.replaceChildren();
}

function makeNewGrid(newSize) {
	deleteGrid();
	createGrid(newSize);
	grid.addEventListener("mouseover", (e) => {
		if (e.target.classList.contains("square")) {
			e.target.classList.add("colored");
		}
	});
}

makeNewGrid(16);

const button = document.querySelector(".controls button");

button.addEventListener("click", () => {
	button.classList.add("pulse");
	promptUserForSize();
});

button.addEventListener("animationend", () => {
	button.classList.remove("pulse");
});

function promptUserForSize() {
	let newSize = +prompt("Type the new size of the grid (0-100)");
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
