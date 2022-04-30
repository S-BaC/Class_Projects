
let boardSize, winningPoints, mode, difficulty;



//The DOM
//DOs
const playerTurn = document.getElementById('playerTurn');
const form = document.getElementById('settings');
const compDifficulyDiv = document.getElementsByClassName('compDifficulty')[0];
const startBtn = document.getElementsByClassName('startBtn')[0];
const board = document.getElementById('board');
//(the message div above the board)
const turns = document.getElementsByClassName('turns')[0];
const welcomeScr = document.getElementsByClassName('welcome')[0];
//Audio Tags
const startSound = document.getElementById('startSound');
const resetSound = document.getElementById('resetSound');
const winSound = document.getElementById('winSound');
const clickedSound1 = document.getElementById('clickedSound1');
const clickedSound2 = document.getElementById('clickedSound2');
const clickedSound3 = document.getElementById('clickedSound3');



//Players and Colors
let players = ['player1', 'player2'];
let dotColors = ['#F74420','#C520F7'];
let clickedSounds = [clickedSound1, clickedSound2];


//Modes:
function vsMode(pvp){
    //' Player Vs Player Mode' or not.
    if(pvp){
        compDifficulyDiv.style.display = 'none';
        document.getElementById('p2Name').style.display = 'block';
    }
    else{
        compDifficulyDiv.style.display = 'block';
        document.getElementById('p2Name').style.display = 'none';
    }
}

//Getting Inputs:

function startGame(){
    startSound.play();
    //Getting form data:
    form.addEventListener('submit',e => submitEvent(e));
    function submitEvent(e){
        e.preventDefault();
        players[0] = document.getElementById('p1Name').value;
        players[1] = document.getElementById('p2Name').value;
        boardSize = document.getElementById('boardSize').value;
        winningPoints = document.getElementById('winningPoint').value;
        pvpMode = document.getElementById('pvp').checked;
        easyMode = document.getElementById('easy').checked;
        normalMode = document.getElementById('normal').checked;
        
        if(!pvpMode){
            easyMode? players[1] = 'Steve': players[1] = 'Marc';
        }
        // console.log({
        //     'players': players,
        //     'boardSize': boardSize,
        //     'winningPoints': winningPoints,
        //     'pvpMode': pvpMode,
        //     'easyMode': easyMode,
        //     'normalMode': normalMode
        // });

        startBtn.disabled = true;
        startBtn.style.backgroundColor = 'var(--color6)';
        turns.style.display = 'block';
        welcomeScr.style.display = 'none';

        //Building the board:
        buildBoard(boardSize);
    }
}


//Initialization
let rowArr = []; // three temporary variables to help with building the 'circleArr'.
let column = 0;
let row = 0;
let filledSlots = 0;
let game = true; //Game running or not;

//Players and turns
let turn = 0; // 0 for player 1, 1 for player 2.
let circleArr = []; // 0 for player 1, 1 for player 2, -1 for empty slot.

//Functions to build the board
function buildBoard(n){
    board.innerHTML = '';
    
    let i = 0;
    while(i<n){
        board.innerHTML += "<div class='row flexbox'>"  
                            + buildBoardHelper(n);
                        + "</div>"; 
        
        row++;
        circleArr[i] = rowArr;
        rowArr = []; column = 0;
        i++;
    }

    const circleObjArr = Array.from(document.getElementsByClassName('circle'));
    circleObjArr.forEach(circleObj => setSize(circleObj));
}
function buildBoardHelper(n){
    if(n===0){return '';}
    rowArr[column] = -1; //Also filling in the circleArr.
    column++;
    return "<div class='circle' id='"+row+(column-1)+"' onclick='clickedCircle(this)'></div>" 
            + buildBoardHelper(n-1);
}
function setSize(circleObj){
    circleObj.style.padding = (10/boardSize)+'vw'; // total board size is 10vw-ish.
}

//Click events for circles:
function clickedCircle(obj){
    if(!game){
        clickedSound3.play();
        return;
    }  //'An || statement validating the turn' can be added, if necessary.
    
    //Getting row and column indices of the object:
    let objRow, objColumn;
    objRow = Number(obj.id[0]);
    objColumn = Number(obj.id[1]);

    //Validating and filling in the board:
    if(circleArr[objRow][objColumn] === -1){
        obj.style.backgroundColor = dotColors[turn];
        play(objRow,objColumn);
        if(!pvpMode){
            //Computer will play if not in pvpMode.
            compChoose();
        }
    }
    //console.log(circleArr);
}

//Updates the 'circleArr' and sees if someone wins.
function play(row,column){
    clickedSounds[turn].play();
    circleArr[row][column] = turn;
        filledSlots ++;
        //Checking if anybody wins:
        if(filledSlots >= (2*winningPoints-1)){
            checkStatus();
            }
        turn = 1 - turn; //Toggling player numbers.
        playerTurn.textContent = players[turn];
        playerTurn.style.color = dotColors[turn];
}

function compChoose(){
    let compSlotRow = 0;
    let compSlotColumn = 0;
    //Easy Mode
    if(easyMode){
        while(circleArr[compSlotRow][compSlotColumn] !== -1){
            compSlotRow = Math.floor(Math.random()*boardSize);
            compSlotColumn = Math.floor(Math.random()*boardSize);
        }
    }
    //Normal Mode
    else if(normalMode){
        let playerSlotsHor = []; 
        let playerSlotsVer = [];
        let playerSlot = 0; //Former is an array, latter is an element in that array.
        
        // let valueObj = {
        //     '-1' : 0,
        //     '0' : 0,
        //     '1' : 0
        // }   To keep record of the number of each value.
        // emptySlots[i] = valueObj['-1'];

        //Horizontally
        for(let i = 0; i<boardSize; i++){
            for(let j = 0; j<boardSize; j++){
                if(circleArr[i][j] === 0){
                    console.log(i,j);
                        playerSlot++;}
            }
            playerSlotsHor[i] = playerSlot;
            playerSlot=0;
        }
        //Vertically
        for(let i = 0; i<boardSize; i++){
            for(let j = 0; j<boardSize; j++){
                if(circleArr[j][i] === 0){playerSlot++};
            }
            playerSlotsVer[i] = playerSlot;
            playerSlot=0;
        }
        console.log("player Slots: ",playerSlotsHor, playerSlotsVer);
        
        //Choosing
        let maxSide, maxBothIndex;
        let maxHor = Math.max(...playerSlotsHor);
        let maxVer = Math.max(...playerSlotsVer);
        console.log('maxHor: ', maxHor);
        console.log('maxVer: ', maxVer);
        // if(maxHor > maxVer){
        //     maxSide = 0; //Horizontal is 0, as described above.
        //     maxBothIndex = playerSlots[0].indexOf(maxHor);
        // }
        // else{
        //     maxSide = 1;
        //     maxBothIndex = playerSlots[1].indexOf(maxVer);
        // }
        // console.log(maxSide, maxBothIndex);

    }

    compPlay(compSlotRow,compSlotColumn);
}

//Comp playing
function compPlay(row,column){
    let objID = row+''+column;
    console.log(objID);
    document.getElementById(objID).style.backgroundColor = dotColors[turn];
    play(row,column);
}

function checkStatus(){
    let score;
        //Checking for horizontal rows:
        for(let i = 0; i<boardSize; i++){
            score = 1;
            let candidate = circleArr[i][0]; //j === 0 condition is already taken into account.
            for(j = 1; j<boardSize; j++){
                if(circleArr[i][j] === candidate){
                    score++;}
                else if(j + winningPoints <= boardSize){
                    score=1; candidate = circleArr[i][j];}
                else{break;}
            }
            if(score >= winningPoints && candidate !== -1){
                game = false;
                winSound.play();
                setTimeout(()=>win(candidate), 1000);

                }
            }
        //Checking for vertical rows:
        for(let i = 0; i<boardSize; i++){
            score = 1;
            let candidate = circleArr[0][i]; //j === 0 condition is already taken into account.
            for(j = 1; j<boardSize; j++){
                if(circleArr[j][i] === candidate){
                    score++;}
                else if(j + winningPoints <= boardSize){
                    score=1; candidate = circleArr[j][i];}
                else{break;}
            }
            if(score >= winningPoints && candidate !== -1){
                game = false;
                winSound.play();
                setTimeout(()=>win(candidate), 1000);
                
                }
            }
}

function win(winnerIndex){
    
    turns.style.display = 'none';
    board.style.display = 'none';
    welcomeScr.innerHTML = 
            "<img src='medal.png' width='60vw'>"
        +   "<p text-align='center'> Congratualations to " + players[winnerIndex] + "</p>";
    welcomeScr.style.display = 'block';
    welcomeScr.style.color='white';
    document.getElementsByClassName('turn')[0].style.backgroundColor = dotColors[winnerIndex];
    document.getElementsByClassName('credit')[0].style.display = 'block';
}


/*------------------------------------------------------------------------------------------------
//Figure out how to make a function for checing Hor/Ver ?
//Diagonal Conditions?

----------------------------------------------------------------------------------------------------*/
