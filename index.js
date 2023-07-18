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
    square.style.borderRadius = '15%';
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
	grid.innerHTML = "";
}

function deleteGrid() {
	grid.replaceChildren();
}

function makeNewGrid(newSize) {
	deleteGrid();
	createGrid(newSize);
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
