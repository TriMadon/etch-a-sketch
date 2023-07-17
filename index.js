const grid = document.querySelector(".grid");

function createSqaure() {
    let square = document.createElement("div");
    square.classList.add("square");
    return square;
}

function addSquare(squares) {
    squares.forEach(square => {
        grid.appendChild(square);
    })
}

function createGrid(numSqaures) {
    let sqaures = [];
    for (let i = 0; i < numSqaures**2; i++) {
        sqaures.push(createSqaure());
    }
    addSquare(sqaures);
}

createGrid(16);