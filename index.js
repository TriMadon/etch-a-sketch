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
    squares.forEach(square => {
        grid.appendChild(square);
    })
}

function createGrid(numSqaures) {
    let gaps = numSqaures - 1;
    let sqWidth = (720 - gaps)/numSqaures; 
    console.log(sqWidth);
    for (let i = 0; i < numSqaures**2; i++) {
        sqaures.push(createSqaure(sqWidth, "brown"));
    }
    addSquare(sqaures);
}

createGrid(16);

sqaures.forEach(square => {
    square.addEventListener("mouseover", (e) => {
        e.target.classList.add("colored", "hovered");
    })
    square.addEventListener("mouseout", (e) => {
        e.target.classList.remove("hovered");
    })
})