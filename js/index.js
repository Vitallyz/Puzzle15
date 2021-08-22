const cells = [];

const cellWithNumberColour = "#e9c111";
const cellEmptyColour = "#d4d4d4";

let emptyCell;

class Cell {
    #id;
    #value;
    #element;
    #isEmpty;

    constructor (id, element) {
        this.#id = id;
        (id === 15) ? this.#value = "": this.#value = id + 1;

        if (id === 15) {
            this.#isEmpty = true;
            emptyCell = id;
        }

        this.#element = element;
    }

    get id() {
        return this.#id;
    }

    get value() {
        return this.#value;
    }

    get element() {
        return this.#element;
    }
    set value(value) {
        if (value >= 0 && value <= 15) {
            this.#value = value;
        }
    } 

    clicked() {

    }
}

// initializing array of Cell class instances 
for (let id = 0; id < 16; id++) {
    const element = document.getElementById(`cell_${id}`);
    cells[id] = new Cell(id, element);

}

// Render on screen initial state
for (let id = 0; id < 16; id++) {
    if (id !== 15) {
        console.log(cells[id].element.style.background);
        cells[id].element.style.background = cellWithNumberColour;
        cells[id].element.style.color = "white";
        cells[id].element.innerText = cells[id].value;
    } else {
        cells[id].element.style.background = cellEmptyColour;
        cells[id].element.style.color = "white";
        cells[id].element.innerText = cells[id].value;
    }
    
}

// Add event listeners to all cells in the table
for (let id = 0; id < 16; id++) {
    cells[id].element.addEventListener("click", clickHandler);
}

function clickHandler(element) {
    //console.log("Registered click on element", element.target);
    const id = parseInt((element.target.id.split("_")[1]), 10);
    // console.log("Our id is ", id);
    // Lets check if we have an empty space above us
    if (id === emptyCell) {
        console.log("Clicked on empty cell");
        return;
    }
    
    if ((id - 4 === emptyCell)) {
        let newId = id - 4;
        cells[newId].element.innerText = cells[id].element.innerText;
        cells[id].element.innerText = "";
        cells[id].element.style.background = cellEmptyColour;
        cells[newId].element.style.background = cellWithNumberColour;

        emptyCell = id;
        console.log("new empty cell is ", emptyCell);
        console.log("We have empty cell above!");
        return;
        
    }

    // Let s check i we have an empty space below us
    if (id + 4 === emptyCell) {
        console.log("We have empty cell below!");
        let newId = id + 4;
        cells[newId].element.innerText = cells[id].element.innerText;
        cells[id].element.innerText = "";
        cells[id].element.style.background = cellEmptyColour;
        cells[newId].element.style.background = cellWithNumberColour;
        
        emptyCell = id;
        console.log("new empty cell is ", emptyCell);
        return;
    }
    // console.log("parseInt(id + 4, 10) is ", parseInt(id + 4, 10))
    // console.log("Our empty cell is ", emptyCell)
    

}

