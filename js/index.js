
const thePuzzle15Game = (function () {
    
    const difficultyLevelEasy = 10;
    const difficultyLevelMed = 100;
    const difficultyLevelHard = 1000;
    
    
    const cells = [];
    const cellSize = 80;
    const cellSizeInternal = cellSize - 3;
    const tableSize =  cellSize * 4
    const pictureElement = document.createElement("img");
    const accessKey = "ZpPmuN7qbgLY0rHUaL0dpbwTmI1hOwGTqic9l74w_0g";
    const getRequest = `https://api.unsplash.com/photos?page=1&per_page=30&client_id=${accessKey}`;
    const pictureUrls = [];
    let currentPictureID = 0;
    let pictureURL = `https://picsum.photos/id/237/${tableSize}/${tableSize}`
    pictureElement.src = pictureURL;
    
    let modalView = "";
    let modalViewOffline = "";
    let totalMovesPlayed = 0;
    let gameStarted = false;
    let gameLocked = true;
    let gameTypeIsNumbers = true;
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
            } else if (minutes === 1) {
                minutes = `${minutes} minute and `
            } else if (minutes === 0) {
                minutes = "";
            }  

            if (seconds > 1  ) {
                seconds = `${seconds} seconds`;
            } else if (seconds === 1) {
                seconds = `${seconds} second`
            } else if (seconds === 0) {
                seconds = `${seconds} seconds`
            }  
            
            return `${minutes}${seconds}`;
        }
    }

    const cellWithNumberColour = "#44CAF0";
    const cellEmptyColour = "#79DEF5";

    let emptyCell = 15;

    class Cell {
        #id;
        #element;
        #value;

        constructor (id, element) {
            this.#id = id;
            this.#element = element;
            this.#element.style.color = "white";
            if (id !== 15) {
                this.#value = id + 1;
            } else {
                this.#value = "";
            }
            
            this.#element.innerHTML = `<canvas id="canvas_${this.#id}" width="${cellSizeInternal}px" height="${cellSizeInternal}px" style="border:0px solid #d3d3d3; display: inline; visibility: hidden; top: 0; left: 0; border-radius: 4px; position: absolute;">
            Your browser does not support the HTML5 canvas tag.
            </canvas><span id="value_${this.#id}" style="visibility: visible;">${this.#value}</span>`;

            this.renderCell();   
        }
        // getters and setters
        get id() {
            return this.#id;
        }

        get element() {
            return this.#element;
        }

        get value () {
            return this.#value;
        }

        set value (value) {
            return this.#value = value;
        }

        renderCell () {
            document.getElementById(`value_${this.#id}`).innerText = this.#value;

            if (this.#id === emptyCell || gameLocked) {
                this.#element.style.background = cellEmptyColour;
            } else {
                this.#element.style.background = cellWithNumberColour;
            } 
            
            if (!gameTypeIsNumbers && this.#id !== emptyCell) {
                document.getElementById(`canvas_${this.#id}`).style.visibility = "visible";
                var c = document.getElementById(`canvas_${this.#id}`);
                var ctx = c.getContext("2d");
                
                const x_offset = ((this.#value - 1) % 4) * cellSize;
                const y_offset = ~~((this.#value - 1) / 4) * cellSize;
                
                let trials = 1;
                let success = false;
                
                function renderImageIfLoaded(id) {
                    if (trials < 50) {
                        if(id === 0) {
                            console.log("Trial number: ", trials);
                        }
                        if (pictureElement.naturalHeight) {
                            ctx.drawImage(pictureElement, x_offset, y_offset, cellSizeInternal, cellSizeInternal, 0, 0, cellSizeInternal, cellSizeInternal);
                            if(id === 0) {
                                console.log("The image loaded! Trials: ", trials);
                                success = true;
                            }
                        } else {
                            if(id === 0) {
                                console.log("The image does not exist yet. Times tryied so far: ", trials++);
                            }setTimeout(function(){                            
                                renderImageIfLoaded(id);    
                            },50);
                            
                        } 
                        
                    } else if (!success) {
                        console.log("Difficulties loading image!");
                        //alert("You are offlene! Switching to Numbers");
                        showModalOffline ();
                        handleOptNumbers (document.getElementById("opt-numbers"));
                    }  
                }

                renderImageIfLoaded(this.#id);
               
            } else {
                document.getElementById(`canvas_${this.#id}`).style.visibility = "hidden";
            }

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
            emptyCell = this.#id; 
            cells[newId].value = this.#value;
            this.#value = "";
            
            cells[newId].renderCell();
            this.renderCell();
                       
            totalMovesPlayed++;
            
            // console.log(totalMovesPlayed);
            if(gameStarted) {
                document.getElementById("totalMoves").innerText = totalMovesPlayed;
                this.isGameOver();
            }            
        }

        isGameOver() {
            if (!isGameOver()) {
                return false;
            }

            // the game is over, lets lock it and show a modal window with the outcomes.
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
                this.#value = "";
            } else {
                this.#value = this.#id + 1;
            }

            this.renderCell();
        }
    }



    // initializing array of Cell class instances 
    function initialize () {
        
        pictureElement.style.verticalAlign = "top";
        pictureElement.style.borderRadius = "4px";
        pictureElement.style.display = "inline";
        pictureElement.style.position = "absolute";
        pictureElement.style.top = 0;
        pictureElement.style.left = 0;

        const tableElement = document.getElementById("puzzle15game");
        tableElement.style.width = tableSize + "px";
        tableElement.style.height = tableSize + "px";
        
        for (let id = 0; id < 16; id++) {
            const element = document.getElementById(`cell_${id}`);
            cells[id] = new Cell(id, element);
        }

        initPicturesArray ();
    }
    
    initialize();

    function resetGame () {
        gameStarted = false;
        gameLocked = true;
        timer.reset();
        emptyCell = 15;
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
            let scorePartOne = (25 - moves/8) * 0.025;
            if (scorePartOne < 0) {
                scorePartOne = 0;
            }
            let scorePartTwo = 0.5 / 100 * (110 - time);
            if (scorePartTwo < 0) {
                scorePartTwo = 0;
            }

            score = scorePartOne + scorePartTwo;
        }

        if (difficultyLevel === difficultyLevelHard) {
            let  scorePartOne = (25 - moves/10) * 0.025;
            if (scorePartOne < 0) {
                scorePartOne = 0;
            }
            let scorePartTwo = 1/100 * (110 - time);
            if (scorePartTwo < 0) {
                scorePartTwo = 0;
            }

            score = scorePartOne + scorePartTwo;
        }


        if(gameTypeIsNumbers) {
            return ~~(score*100);    
        } 

        return ~~(score*100) * 2;
    }

    
    //event listener for windows resize (probably need to remove this functionality)
    //window.addEventListener("resize", handleWindowResize);

    // even listener for modal close button
    document.getElementById("colseModal").addEventListener("click", handlerModalClose);
    document.getElementById("closeModal_offline").addEventListener("click", handlerOfflineModalClose)

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

    const optNumbers = document.getElementById("opt-numbers");
    optNumbers.addEventListener("click", handleOptNumbers);

    const optPictures = document.getElementById("opt-pictures");
    optPictures.addEventListener("click", handleOptPictures);

    const bttnPrev = document.getElementById("bttn_prev");
    bttnPrev.addEventListener("click", handlerBttnPrev);

    const bttnRandom = document.getElementById("bttn_random");
    bttnRandom.addEventListener("click", handlerBttnRandom);

    const bttnNext = document.getElementById("bttn_next");
    bttnNext.addEventListener("click", handlerBttnNext);

    


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

    function handleOptNumbers (element) {
        bttnPrev.parentElement.classList.add("disabled");
        bttnRandom.parentElement.classList.add("disabled");
        bttnNext.parentElement.classList.add("disabled");
        optNumbers.parentElement.classList.add("active");
        optPictures.parentElement.classList.remove("active");
        gameTypeIsNumbers = true;
        //resetGame();
        if (optHard.parentElement.classList.contains("active")) {
            handlerOptHard();
        }
        if (optEasy.parentElement.classList.contains("active")) {
            handlerOptEasy();
        }
        if (optMed.parentElement.classList.contains("active")) {
            handlerOptMed();
        }

        cells.forEach(element => element.renderCell());
        displayReferencePicture ();
    }

    function handleOptPictures (element) {
        bttnPrev.parentElement.classList.remove("disabled");
        bttnRandom.parentElement.classList.remove("disabled");
        bttnNext.parentElement.classList.remove("disabled");
        optNumbers.parentElement.classList.remove("active");
        optPictures.parentElement.classList.add("active");
        gameTypeIsNumbers = false;
        //resetGame();
        if (optHard.parentElement.classList.contains("active")) {
            handlerOptHard();
        }
        if (optEasy.parentElement.classList.contains("active")) {
            handlerOptEasy();
        }
        if (optMed.parentElement.classList.contains("active")) {
            handlerOptMed();
        }
        
        cells.forEach(element => element.renderCell());
        displayReferencePicture ();
    }

    function handlerBttnPrev () {
        console.log("handling PREV button");
        if (currentPictureID > 0) {
            currentPictureID--;    
        } else {
            currentPictureID = 29;
        }

        updatePictureElement(currentPictureID);
        renderAll();
        renderAll();
    }

    function handlerBttnRandom () {
        console.log("handling RANDOM button");
        currentPictureID = getRandomPictureID();
        updatePictureElement(currentPictureID);
        renderAll();
    }

    function handlerBttnNext () {
        console.log("handling NEXT button");
        if (currentPictureID < 29) {
            currentPictureID++;    
        } else {
            currentPictureID = 0;
        }

        updatePictureElement(currentPictureID);
        renderAll();
        renderAll();
    }


    // hide modal view
    function handlerModalClose (element) {
        modalView.hide();

    }

    function handlerOfflineModalClose (element) {
        modalViewOffline.hide();
    }



    // functionalities


    function getRandomPictureID () {
        return ~~(Math.random() * 29);
    }

    function initPicturesArray () {
        fetch(getRequest)
            .then(response => response.json())
            .then(data => {
                console.log("That is our API response: ", data)
                data.forEach (element => {
                    const data = {};
                    data.url = (element.urls.full.split("?")[0]) + `?w=${tableSize}&h=${tableSize}&fm=jpg&fit=crop`;
                    data.credits = "Photo credits: " + `<a href=${(element.user.links.html)} target="_blank">${element.user.first_name}</a>`;
                    pictureUrls.push(data);
                });
                console.log("This is our pictures URLs: ", pictureUrls); 
                currentPictureID = getRandomPictureID();
                updatePictureElement(currentPictureID);
                
            })
            .catch(error => console.log("We have an error geting the list from API: ", error));   
    }

    function updatePictureElement(pictureID) {
        pictureURL = pictureUrls[pictureID].url;
        pictureElement.src = pictureURL;
        document.getElementById("credits").innerHTML = pictureUrls[pictureID].credits;
        // console.log("We are showing picture number: ", currentPictureID);
    }
    
    function renderAll () {
        setTimeout(() => {
            cells.forEach (element => element.renderCell());
        }, 10)
        
        displayReferencePicture();
        console.log("Current photo id: ", currentPictureID);
    }
 
    function displayReferencePicture () {
        const imgReference = document.getElementById("refImage");  
        const imgReferenceCredits = document.getElementById("credits");
        imgReference.src = pictureURL;
        imgReference.style.width = (tableSize - 4) + "px";
        imgReference.style.height = (tableSize - 4) + "px";
        imgReference.style.borderRadius = "4px";
        if (gameTypeIsNumbers) {
            imgReference.style.display = "none";
            imgReferenceCredits.style.display = "none";
        } else {
            imgReference.style.display = "block";
            imgReferenceCredits.style.display = "block";
        }
       
    }


    function isGameOver() {
        for (let i = 0; i < 15; i++) {
            if (parseInt(cells[i].value, 10) !== i + 1) {
                // console.log("Game not finished yet");
                return false;
            }
        }
        return true;
    }

    function randomizePuzzle () {

        resetGame();
        gameLocked = false;
        renderAll();
        

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
        while (isGameOver()) {
            console.log("Randomized moves solved the game, radomizing again!");
            for (let i = 0; i < difficultyLevel; i++) {
                performRandomMove();
            }
        }
        

        totalMovesPlayed = 0;
        document.getElementById("totalMoves").innerText = totalMovesPlayed;
        timer.startTimer();
        gameStarted = true;
        
        
    }

 

   // handling modal views
    function showModalOffline () {
        modalViewOffline = new bootstrap.Modal(document.getElementById("offlineModal"), {});
        modalViewOffline.show();
    }

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


