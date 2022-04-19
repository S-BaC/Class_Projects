/* Initializing */
var count = 0;
//The Bomb
var x = Math.floor(Math.random() * 6 + 1);
var y = Math.floor(Math.random() * 6 + 1);
var c0 = x + "" + y;
//It works this way: 1 2 3 - 4 0 5 - 6 7 8 
var c1 = surrounder(-1, -1);
var c2 = surrounder(0, -1);
var c3 = surrounder(1, -1);
var c4 = surrounder(-1, 0);
var c5 = surrounder(1, 0);
var c6 = surrounder(-1, 1);
var c7 = surrounder(0, 1);
var c8 = surrounder(1, 1);
function surrounder(xOffset, yOffset) {
    return (x + xOffset) + "" + (y + yOffset);
}
console.log(c0);

function pressed(obj) {
    if (++count === 35) {
        win();
    }
    if (obj.id == c0) {
        lose();
    }
    else if (obj.id == c1 || obj.id == c2 || obj.id == c3 || obj.id == c4 ||
        obj.id == c5 || obj.id == c6 || obj.id == c7 || obj.id == c8) {
        document.getElementById('h' + obj.id).style.backgroundColor = 'brown';
        obj.style.visibility = 'hidden';
        document.getElementById('clickBrownSound').play();
    }
    else {
        document.getElementById('h' + obj.id).style.backgroundColor = 'aquamarine';
        obj.style.visibility = 'hidden';
        document.getElementById('clickSound').play();
    }
    
}

function win() {
    document.getElementById('table').style.visibility = 'hidden';

    for(var i = 0; i<36; i++){
        document.getElementsByClassName('hTableCell')[i].style.backgroundColor='aqua';
    }

    document.getElementById('h32').innerHTML = 'W';
    document.getElementById('h33').innerHTML = 'E';
    document.getElementById('h34').innerHTML = 'L';
    document.getElementById('h35').innerHTML = 'L';
    document.getElementById('h42').innerHTML = 'D';
    document.getElementById('h43').innerHTML = 'O';
    document.getElementById('h44').innerHTML = 'N';
    document.getElementById('h45').innerHTML = 'E';

    document.getElementById('winSound').play();
}

function lose() {

    document.getElementById('table').style.visibility = 'hidden';

    for(var i = 0; i<36; i++){
        document.getElementsByClassName('hTableCell')[i].style.backgroundColor='brown';
    }

    document.getElementById('hTable').style.color = 'white';

    document.getElementById('h32').innerHTML = 'G';
    document.getElementById('h33').innerHTML = 'A';
    document.getElementById('h34').innerHTML = 'M';
    document.getElementById('h35').innerHTML = 'E';
    document.getElementById('h42').innerHTML = 'O';
    document.getElementById('h43').innerHTML = 'V';
    document.getElementById('h44').innerHTML = 'E';
    document.getElementById('h45').innerHTML = 'R';

    document.getElementById('h' + c0).innerHTML = '&#128163';
    document.getElementById('h' + c0).style.backgroundColor = 'red';
    
    document.getElementById('loseSound').play();
}

//Notes: using classLists will be far easier.

