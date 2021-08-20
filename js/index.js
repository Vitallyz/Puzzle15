const cells = [];

class Cell {
    #id;
    #value;
    #element;
    #isEmpty;

    constructor (id, element) {
        this.#id = id;
        (id === 15) ? this.#value = "": this.#value = id + 1;
        (id === 15) ? this.#isEmpty = true : this.#isEmpty = false;
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

// Add event listeners to all cells in the table
for (let id = 0; id < 16; id++) {
    cells[id].element.addEventListener("click", clickHandler);
}



function clickHandler(element) {
    console.log("Thecolor before is ", element.target.style.background);
// temporary for the toggle test only!
    if (element.target.style.background === "rgb(255, 174, 0)" || element.target.style.background === "") {
        element.target.style.background = "rgb(255, 94, 0)";
    } else {
        element.target.style.background = "rgb(255, 174, 0)";
    }
    console.log("Thecolor after is ", element.target.style.background);
    console.log("Registered click on element", element);
}

console.log(cells[15].element);

// console.log("array of cells", cells);