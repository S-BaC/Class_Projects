
let boardSize = 4;
let winningPoints = 4;

//Initialization
let rowArr = []; // three temporary variables to help with building the 'circleArr'.
let column = 0;
let row = 0;
let filledSlots = 0;
let game = true; //Game running or not;

//Players and turns
let turn = 0; // 0 for player 1, 1 for player 2.
let circleArr = []; // 0 for player 1, 1 for player 2, -1 for empty slot.

//Dot Colors
let dotColors = ['orangered', 'teal'];
let players = ['player1', 'player2'];

//Building the board:
const board = document.getElementById('board');
buildBoard(boardSize);

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
}
function buildBoardHelper(n){
    if(n===0){return '';}
    rowArr[column] = -1; //Also filling in the circleArr.
    column++;
    return "<div class='circle' id='"+row+(column-1)+"' onclick='clickedCircle(this)'></div>" 
            + buildBoardHelper(n-1);
}

//Click events for circles:
function clickedCircle(obj){
    if(!game){return;}
    //Getting row and column indices of the object:
    let objRow, objColumn;
    objRow = Number(obj.id[0]);
    objColumn = Number(obj.id[1]);

    //Validating and filling in the board:
    if(circleArr[objRow][objColumn] === -1){
        obj.style.backgroundColor = dotColors[turn];
        circleArr[objRow][objColumn] = turn;
        turn = 1 - turn; //Toggling player numbers.
        filledSlots ++;
    }

    //Checking if anybody wins:
    if(filledSlots >= 7){
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
                console.log(players[candidate], "wins!");
                game = false;
                return;
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
                console.log(players[candidate], "wins!");
                game = false;
                return;
                }
            }
        }
    }

/*------------------------------------------------------------------------------------------------
//NOTE: Figure out how to make a function.....?

function checkWinningState(){
    for(let i = 0; i<boardSize; i++){
        let j = 0; //this is a
        let candidate = circleArr[j][i]; //j === 0 condition is already taken into account.
        let flag = true;
        for(j = a+1; j<boardSize; j++){
            if(candidate === -1 || (circleArr[j][i] !== candidate)){
                flag = false; 
                break;}
        }
        if(flag===true && candidate !== -1){
            console.log(players[candidate], "wins!");
            game = false;
            return;
            }
        }
}
----------------------------------------------------------------------------------------------------*/
