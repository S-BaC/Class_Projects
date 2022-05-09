/*
    - Two classes: keyboard and display.
    - Three primary functions: starting the game, ending the game and keyboard-listener.
    - Two helper functions for time-keeping.
*/
class Keyboard{
    keyArr = [];
    constructor(arr){

        //Builds the keyboard.
        for(let i = 0; i<arr.length; i++){
            $('.keys').append(`<div class='key keyrow${Math.floor(i/10)}'>${arr[i]}</div>`);
        }
        //Some styling to make the second and third rows appear so.
        $('.keyrow1').css('margin-left','3.5vh');
        $('.keyrow1').eq(9).css('display','none');
        $('.keyrow2').eq(4).css('width','14.75vh'); //Depends on where the spacebar is.
        $('.keyrow2').eq(4).css('grid-column','auto/span 2');
        $('.keyrow2').css('grid-row', '3/4');
        //Building keyArr.
        $.each($('.key'), (i,v)=>{
            this.keyArr.push(v);
        });
        //Event Listener.
        this.listen();
    }
    listen(){
        $('.key').mousedown((e)=>{
            Keyboard.pressedKey(e.target);
        });
    }
    static pressedKey(keyObj){
        $(keyObj).css('backgroundColor','#ffd166ff');
        $(keyObj).css('transform', 'scale(0.8)');
        setTimeout(() => {
            $(keyObj).css('backgroundColor','#fcfcfc');
            $(keyObj).css('transform', 'scale(1.0)');
        }, 150);
    }
    getKeyArr(){
        return this.keyArr;
    }
}   

class Display{
    currentLetter;
    constructor(wordLength){
        $('#display').html('');
        $('#inputKeys').html('');
        this.currentLetter = 0;
        this.wordLength=wordLength;
        //Shows the word and input boxes:
        for(let i = 0; i<wordLength; i++){
           $('#inputKeys').prepend("<input type='text' disabled/>")
           $('#display').append(`<p>${String.fromCharCode(Math.floor
                                                    (Math.random()*26)+65+
                                                    (Math.floor(Math.random()*2)*32))}</p>`);
        }
        //Listen to form submission event.
        this.listen();
    }
    add(letter){
        $('#inputKeys input').eq(this.currentLetter).val(letter);
        this.currentLetter++;
        //Filling in the last box would end the game.
        if(this.currentLetter === this.wordLength){
            let winStatus = true;
            for(let i = 0; i<this.wordLength; i++){
                if($('#inputKeys input').eq(i).val() !== $('#display p').eq(i).html()){
                    console.log("not the same at ",i);
                    winStatus = false;
                    break;
                }
            }
            //Showing the message:
            let msg = winStatus? "Correct, congrats. Score: " + ++winCount: "Oops. Your Score is now 0.";
            $('#result').html(msg);
            endGame(winStatus);
        }
    }
    listen(){
        $('#inputKeys').submit((e)=>{
            e.preventDefault();
            
        });
    }
}

let keyBoard, display, winCount;
let second = 0; let minute = 0;
let qwerty = 
        [  'q','w','e','r','t','y','u','i','o','p',
            'a','s','d','f','g','h','j','k','l',';',
            'Shift','z','x','c',' ','v','b','n','m'];

function start(){
    $('.welcomeScr').css('display','none');
    $('.gameScr').css('display','grid');
    winCount = 0;
    display = new Display(5);
    keyBoard = new Keyboard(qwerty);
    listenToKeyboard(keyBoard.getKeyArr(),display);
    //Adding the stopwatch.
    setInterval(()=>{
        $('#inputKeysClock').html(`<div>${stopwatch()}</div>`);
    },1000);
}

function endGame(winStatus){
    if(winStatus){
        display = new Display(5);
        listenToKeyboard(keyBoard.getKeyArr(),display);
    }
    else{
        //For setting high score mode.
        $('.gameScr').css('display','none');
        $('#result').css('margin-top', '10vh');
        $('#result').css('border', '0.5vmin dotted #333');
        $('#result').css('border-radius', '2vmin');
        $('#result').css('padding', '3vmin');
        $('#result').append(`<h3>You scored ${winCount} in ${minute}:${second}</h3>`)
        $('#result').append("<button onclick='location.reload()'>Restart</button>")
        
        //For just playing around mode.
        winCount=0;
        $('#inputKeys input').val('');
        display.currentLetter = 0;   
    }
}

//Real keyboard events to match the pressedKey:
function listenToKeyboard(keyArr,display){
    window.addEventListener('keydown',e=>{
        let keyIndex = qwerty.indexOf(e.key.toLowerCase());
        if(keyIndex === -1 || keyIndex === 20){return;}
        Keyboard.pressedKey(keyArr[keyIndex]);
        display.add(e.key);
    })
}

//For time-keeping:
//For appending a real-time clock
function clock(){
    currentTime = new Date();
    hour = currentTime.getHours();
    minute = currentTime.getMinutes();
    second = currentTime.getSeconds();
    second = second>10? second : '0'+second;
    minute = minute>10? minute : '0'+minute;
    return `${hour} : ${minute} : ${second}`;
}
//For adding a stopwatch
function stopwatch(){
    if(second === 60){
        minute++;
        second = -1;
    }
    second++;
    second = second>9? second : '0'+second;
    return `${minute} : ${second}`;
}