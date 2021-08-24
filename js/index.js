
const thePuzzle15Game = (function () {
    const cells = [];
    let totalMovesPlayed = 0;

    const cellWithNumberColour = "#e9c111";
    const cellEmptyColour = "#d4d4d4";

    let emptyCell;

    class Cell {
        #id;
        #element;

        constructor (id, element) {
            this.#id = id;
            this.#element = element;

            if (id === 15) {
                // this.#value = "";
                emptyCell = id;
                this.#element.style.background = cellEmptyColour;
                this.#element.style.color = "white";
                this.#element.innerText = "";
            } else {
                this.#element.style.background = cellWithNumberColour;
                this.#element.style.color = "white";
                this.#element.innerText = id + 1;
                // this.#value = id + 1;
            }

           
        }

        get id() {
            return this.#id;
        }

        get element() {
            return this.#element;
        }

        clicked() {
            // Lets check if clicked on empty cell
            if (this.#id === emptyCell) {
                console.log("Clicked on empty cell");
                return;
            }

            // Lets check if we have an empty space above us
            if ((this.#id - 4 === emptyCell)) {
                const newId = this.#id - 4;
                this.swapCells(newId);
                return;  
            }

            if ((this.#id - 8 === emptyCell)) {
                let newId = this.#id - 8;
                cells[this.#id - 4].swapCells(newId);
                newId = this.#id - 4;
                this.swapCells(newId);
                return;  
            }

            if ((this.#id - 12 === emptyCell)) {
                let newId = this.#id - 12;
                cells[this.#id - 8].swapCells(newId);
                newId = this.#id - 8;
                cells[this.#id - 4].swapCells(newId);
                newId = this.#id - 4;
                this.swapCells(newId);
                return;  
            }

            // Lets check if we have an empty space below us
            if (this.#id + 4 === emptyCell) {
                const newId = this.#id + 4;
                this.swapCells(newId);
                return;
            }

            if ((this.#id + 8 === emptyCell)) {
                let newId = this.#id + 8;
                cells[this.#id + 4].swapCells(newId);
                newId = this.#id + 4;
                this.swapCells(newId);
                return;  
            }

            if ((this.#id + 12 === emptyCell)) {
                let newId = this.#id + 12;
                cells[this.#id + 8].swapCells(newId);
                newId = this.#id + 8;
                cells[this.#id + 4].swapCells(newId);
                newId = this.#id + 4;
                this.swapCells(newId);
                return;  
            }
    
            // Checking if the clicked cell is on the same line as the empty cell
            
            if (parseInt(this.#id / 4, 10) === parseInt(emptyCell / 4, 10)) {
    
                // Lets check if we have an empty cell on the right
                if (this.#id + 1 === emptyCell) {
                    const newId = this.#id + 1;
                    this.swapCells(newId);
                    return;
                }
                
                if (this.#id + 2 === emptyCell) {
                    let newId = this.#id + 2;
                    cells[this.#id + 1].swapCells(newId);
                    newId = this.#id + 1;
                    this.swapCells(newId);
                    return;
                }

                if (this.#id + 3 === emptyCell) {
                    let newId = this.#id + 3;
                    cells[this.#id + 2].swapCells(newId);
                    newId = this.#id + 2;
                    cells[this.#id + 1].swapCells(newId);
                    newId = this.#id + 1;
                    this.swapCells(newId);
                    return;
                }

                // Lets check if there is an empty cell on the Left
                if (this.#id - 1 === emptyCell) {
                    const newId = this.#id - 1;
                    this.swapCells(newId);
                    return;   
                }

                if (this.#id - 2 === emptyCell) {
                    let newId = this.#id - 2;
                    cells[this.#id - 1].swapCells(newId);
                    newId = this.#id - 1;
                    this.swapCells(newId);
                }

                if (this.#id - 3 === emptyCell) {
                    let newId = this.#id - 3;
                    cells[this.#id - 2].swapCells(newId);
                    newId = this.#id - 2;
                    cells[this.#id - 1].swapCells(newId);
                    newId = this.#id - 1;
                    this.swapCells(newId);
                    return;
                }
            }

        }

        swapCells (newId) {
            cells[newId].element.innerText = this.#element.innerText;
            this.#element.innerText = "";
            this.#element.style.background = cellEmptyColour;
            cells[newId].element.style.background = cellWithNumberColour;
            emptyCell = this.#id;
            totalMovesPlayed++;
            console.log(totalMovesPlayed);
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
        const id = parseInt((element.target.id.split("_")[1]), 10);
        cells[id].clicked();
    }

})(document);


