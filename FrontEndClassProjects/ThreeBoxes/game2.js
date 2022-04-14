//2-3-4 digits: LEVEL_SELECTOR, Randomizes 

var ans;
var correctBox;
var scoreG = 0;
var timeG = 0;

function startButton(){
    document.getElementById("startBtn").disabled=true;
    document.getElementById("startBtn").setAttribute("class", "changedBtn");
    document.getElementById("stopBtn").disabled=false;
    document.getElementById("stopBtn").setAttribute("class", "stopBtn");
    document.getElementById("startSound").play();
    qGenerator();
}

function stopButton(){
    document.getElementById("startBtn").disabled=false;
    document.getElementById("startBtn").setAttribute("class", "startBtn");
    document.getElementById("stopBtn").disabled=true;
    document.getElementById("stopBtn").setAttribute("class", "changedBtn");
    document.getElementById("stopSound").play();
    resetter();
}

//Resets everything to initial state.
function resetter(){
    
    if(scoreG>0){
        document.getElementById("record").innerHTML="<br> Congratulations for scoring " + scoreG +" after "+ timeG +" tries.";
        document.getElementById("goodScore").play();
    }
    else{
        document.getElementById("record").innerHTML="<br> You played "+ timeG + " times and got a " + scoreG +"&#128518"; 
        document.getElementById("badScore").play();
    }

    document.getElementById("choices0").innerHTML = "";
    document.getElementById("choices1").innerHTML = "";
    document.getElementById("choices2").innerHTML = "";
    document.getElementById("question").innerHTML="";
   
    scoreG=0;
    timeG=0;
    recorder(scoreG,timeG);
    boxStateSetter(true);
}



//Generates and shows the question statement.
function qGenerator(){

    var difficulty = document.getElementById("difficulty").value;
    var num1 = Math.floor((Math.random()*((10**difficulty)-1))+1);
    var num2 = Math.floor((Math.random()*((10**difficulty)-1))+1);

    //So that it never gets any easier than the chosen level.
    if(num1 < 10**(difficulty-1)){
        num1 *= 10;
    }
    if(num2 < 10**(difficulty-1)){
        num2 *= 10;
    }
    
    var operator = Math.floor(Math.random()*4);

    switch(operator){
        case(0): {
            document.getElementById("question").innerHTML = num1 + "+" + num2 + "=";
            ans = num1+num2;
            break;
        }
        case(1): {
            document.getElementById("question").innerHTML = num1 + "-" + num2 + "=";
            ans = num1-num2;
            break;
        }
        case(2): {
            document.getElementById("question").innerHTML = num1 + "*" + num2 + "=";
            ans = num1*num2;
            break;
        }
        case(3): {
            document.getElementById("question").innerHTML = num1 + "/" + num2 + "=";
            ans = (num1/num2).toFixed(2);
            break;
        }
    }

    boxFiller();
}

//Randomizes and places the boxes.
function boxFiller(){
    correctBox = Math.floor(Math.random()*3);
    switch(correctBox){
        case(0):
            document.getElementById("choices0").innerHTML = ans;
            document.getElementById("choices1").innerHTML = ((ans*Math.random())+Math.random()+1).toFixed(2)+1;
            document.getElementById("choices2").innerHTML = Math.floor(ans*Math.random()+1)+2;
            break;
        case(1):
            document.getElementById("choices1").innerHTML = ans;
            document.getElementById("choices0").innerHTML = Math.ceil(ans*Math.random()+1)+1.5;
            document.getElementById("choices2").innerHTML = (10*(Math.random()*ans)-5).toFixed(2)-0.5;
            break;   
        case(2):
            document.getElementById("choices2").innerHTML = ans;
            document.getElementById("choices1").innerHTML = Math.ceil(ans*Math.random()*5)+2;
            document.getElementById("choices0").innerHTML = ((ans/Math.random())/7).toFixed(2)+1;         
    }
    boxStateSetter(false);
}

//Comparing the user's answer with the correct answer. Goes back to qGenerator.
function chose(boxNum){
    if(boxNum === correctBox){
        document.getElementById("correctSound").play();
        recorder(scoreG+15, timeG+1);
    }
    else{
        document.getElementById("wrongSound").play();
        recorder(scoreG-10, timeG+1);
    }
    qGenerator();
}

//Records and displays score and time.
function recorder (score, time){
    scoreG = score;
    timeG = time;
    document.getElementById("score").innerHTML = score;
    document.getElementById("time").innerHTML = time;
}

//Enabling/disabling boxes as necessary.
function boxStateSetter(state){
    document.getElementById("choices0").disabled=state;
    document.getElementById("choices1").disabled=state;
    document.getElementById("choices2").disabled=state;
}