
const thePuzzle15Game = (function () {
    
    const difficultyLevelEasy = 5;
    const difficultyLevelMed = 100;
    const difficultyLevelHard = 200;
    
    
    const cells = [];
    let modalView = "";
    let totalMovesPlayed = 0;
    let gameStarted = false;
    let gameLocked = true;
    let difficultyLevel = 100; // the higher the number the longer the randumization process


    const timer = {
        timePlayed: 0,
        timerId: 0,
        startTimer () {
            this.reset();
            this.timerId = setInterval(() => {
                // stop at 99:59
                if (this.timePlayed < 5999) {
                    document.getElementById("timePlayed").innerText = this.pretty(this.timePlayed++);
                }
            }, 1000);
        },
        reset () {
            this.timePlayed = 0;
            this.stopTimer ();
            document.getElementById("timePlayed").innerText = "00:00";
        },

        stopTimer() {
            clearInterval(this.timerId);
        },

        pretty () {
            let minutes = parseInt(this.timePlayed / 60);
            let seconds = this.timePlayed - minutes*60;

            if (minutes < 10 ) {
                minutes = `0${minutes}`;
            }

            if (seconds < 10) {
                seconds = `0${seconds}`;
            }
            
            return `${minutes}:${seconds}`;
        },

        timeString () {
            let minutes = parseInt(this.timePlayed / 60);
            let seconds = this.timePlayed - minutes*60;
            
            if (minutes > 1  ) {
                minutes = `${minutes} minutes and `;
            } else if (minutes = 1) {
                minutes = `${minutes} minute and `
            } else if (minutes = 0) {
                minutes = "";
            }  

            if (seconds > 1  ) {
                seconds = `${seconds} seconds`;
            } else if (seconds = 1) {
                seconds = `${seconds} second`
            } else if (seconds = 0) {
                seconds = "";
            }  

            if (seconds > 0) {
                seconds = `0${seconds}`;
            }
            
            return `${minutes}${seconds}`;
        }
    }

    const cellWithNumberColour = "#44CAF0";
    const cellEmptyColour = "#79DEF5";

    let emptyCell;

    class Cell {
        #id;
        #element;

        constructor (id, element) {
            this.#id = id;
            this.#element = element;

            if (id === 15) {
                emptyCell = id;
                this.#element.style.background = cellEmptyColour;
                this.#element.style.color = "white";
                this.#element.innerText = "";
            } else {
                this.#element.style.background = cellWithNumberColour;
                this.#element.style.color = "white";
                this.#element.innerText = id + 1;
            }
        }

        get id() {
            return this.#id;
        }

        get element() {
            return this.#element;
        }

        clicked() {

            if (gameLocked){
                return;
            }
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
            // console.log(totalMovesPlayed);
            if(gameStarted) {
                document.getElementById("totalMoves").innerText = totalMovesPlayed;
            }
            if(gameStarted) {
                this.isGameOver();
            }
            
        }

        isGameOver() {
            for (let i = 0; i < 15; i++) {
                if (parseInt(cells[i].element.innerText, 10) !== i + 1) {
                    // console.log("Game not finished yet");
                    return false;
                }

            }
            gameLocked = true;
            gameStarted = false;
            timer.stopTimer();
            for (let i = 0; i < 16; i++) {
                cells[i].element.style.background = "#86DEF5";
            }
            console.log("The game is over!");
            const score = getScore();
            console.log("Score is:", score);
            showModal(score);
            return true;
        }

        reset () {
            if (this.#id === 15) {
                emptyCell = this.#id;
                this.#element.style.background = cellEmptyColour;
                this.#element.innerText = "";
            } else {
                this.#element.style.background = cellWithNumberColour;
                this.#element.innerText = this.#id + 1;
            }
        }
    }



    // initializing array of Cell class instances 
    for (let id = 0; id < 16; id++) {
        const element = document.getElementById(`cell_${id}`);
        cells[id] = new Cell(id, element);
    }
    
    function resetGame () {
        gameStarted = false;
        gameLocked = false;
        timer.reset();
        for (let id = 0; id < 16; id++) {
            cells[id].reset();
        }

    }

    function getScore () {
        const time = timer.timePlayed;
        const moves = totalMovesPlayed;
        let score = 0;
        if (difficultyLevel === difficultyLevelEasy) {
            score = (25 - moves) * 0.025/2;
            if (score < 0) {
                score = 0;
            }
        }

        if (difficultyLevel === difficultyLevelMed) {
            const scorePartOne = (25 - moves/8) * 0.025;
            if (scorePartOne < 0) {
                scorePartOne = 0;
            }
            const scorePartTwo = 0.5 / 100 * (110 - time);
            if (scorePartTwo < 0) {
                scorePartTwo = 0;
            }

            score = scorePartOne + scorePartTwo;
        }

        if (difficultyLevel === difficultyLevelHard) {
            const scorePartOne = (25 - moves/10) * 0.025;
            if (scorePartOne < 0) {
                scorePartOne = 0;
            }
            const scorePartTwo = 1/100 * (110 - time);
            if (scorePartTwo < 0) {
                scorePartTwo = 0;
            }

            score = scorePartOne + scorePartTwo;
        }

        return ~~(score*100);
    }

    
    //event listener for windows resize
    window.addEventListener("resize", handleWindowResize);

    // even listener for modal close button
    document.getElementById("colseModal").addEventListener("click", handlerModalClose);

    // Add event listeners to all cells in the table
    for (let id = 0; id < 16; id++) {
        cells[id].element.addEventListener("click", clickHandler);
    }

    // event listeners for buttons
    const optEasy = document.getElementById("opt-easy");
    optEasy.addEventListener("click", handlerOptEasy);
    
    const optMed = document.getElementById("opt-med"); 
    optMed.addEventListener("click", handlerOptMed);
    
    const optHard = document.getElementById("opt-hard");
    optHard.addEventListener("click", handlerOptHard);


    


    // event handlers
    function clickHandler(element) {
        const id = parseInt((element.target.id.split("_")[1]), 10);
        cells[id].clicked();
    }

    function handlerOptEasy(element){
        optEasy.parentElement.classList.add("active");
        optMed.parentElement.classList.remove("active");
        optHard.parentElement.classList.remove("active");
        difficultyLevel = difficultyLevelEasy;
        randomizePuzzle ();
    }
    function handlerOptMed(element){
        optEasy.parentElement.classList.remove("active");
        optMed.parentElement.classList.add("active");
        optHard.parentElement.classList.remove("active");
        difficultyLevel = difficultyLevelMed;
        randomizePuzzle ();
    }
    function handlerOptHard(element){
        optEasy.parentElement.classList.remove("active");
        optMed.parentElement.classList.remove("active");
        optHard.parentElement.classList.add("active");
        difficultyLevel = difficultyLevelHard;
        randomizePuzzle ();
    }

    // fix for the window width 
    function handleWindowResize() {
        if (window.innerWidth < 475){
            document.getElementById("puzzle15game").style.width = ~~(window.innerWidth  * 0.8) + "px";
            document.getElementById("puzzle15game").style.height = ~~(window.innerWidth  * 0.8) + "px";
        }
    
        document.querySelectorAll("td").forEach(element => { 
            if (window.innerWidth < 475) {
                element.style.fontSize = "2em";
            }
            
            
        });
            
    }

    handleWindowResize();

    // hide modal view
    function handlerModalClose (element) {
        modalView.hide();

    }



    // functionalities

 
 
    function randomizePuzzle () {

        resetGame();
        

        function performRandomMove () {
            const randomNumber = Math.random();
            // if we have a cell above us
            if (emptyCell - 4 >= 0) {
                if (randomNumber >= 0 && randomNumber < 0.25) {
                    cells[emptyCell - 4].clicked();
                }
            }
    
            // if we have a cell below us
            if (emptyCell + 4 <= 15) {
                if (randomNumber >= 0.25 && randomNumber < 0.5) {
                    cells[emptyCell+ 4].clicked();
                }
            }
    
            // if we have a cell on the left or riht
            const normalizedEmptyCell = emptyCell % 4;
            if (normalizedEmptyCell - 1 >= 0) {
                if (randomNumber >= 0.5 && randomNumber < 0.75) {
                    cells[emptyCell - 1].clicked();
                }
            }
    
            if (normalizedEmptyCell + 1 < 4) {
                if (randomNumber >= 0.75 && randomNumber < 1) {
                    cells[emptyCell + 1].clicked();
                }
            }
    
    
        }

        for (let i = 0; i < difficultyLevel; i++) {
            performRandomMove();
        }

        totalMovesPlayed = 0;
        document.getElementById("totalMoves").innerText = totalMovesPlayed;
        timer.startTimer();
        gameStarted = true;
        
    }

 

   // handling modal view
function showModal (score) {
    
    

    modalView = new bootstrap.Modal(document.getElementById("gameDoneModal"), {});

    let scoreText = "";
    if (score > 0 ) {
        scoreText = ` Your score is ${score}!`
    } 

    let movesText = "";
    if (totalMovesPlayed > 1) {
        movesText = `${totalMovesPlayed} moves`;
    } else {
        movesText = `${totalMovesPlayed} move`;
    }


    let bodyMessage = `You solved the puzzle in ${movesText} in just ${timer.timeString()}!${scoreText}`;
    console.log(bodyMessage);
    document.getElementById("modalBodyMessage").innerText = bodyMessage;
    modalView.show();

}

 
/* document.getElementById("cell_0").innerHTML = `<img src="https://picsum.photos/97" style="vertical-align: top; display: inline; border-radius: 4px; position: absolute; top: 0; left: 0;">`;
document.getElementById("cell_0").style.padding ="0";
document.getElementById("cell_0").style.margin ="0";
document.getElementById("cell_0").style.height = 100; */


})(document);


