
class Area
{
    constructor(box,isClicked,id,val)
    {
    this.box = box;
    this.isClicked = isClicked;
    this.id = id;
    this.val = val;
    }
}

let squares = [];
let player = "X";
let turns = 0;
let boxes =document.getElementsByClassName("box");
let info = document.getElementById("info");
let winner = false;
let values = [];

StartGame();

function StartGame()
{
    player= "X";
    info.textContent = "\"" + player +"\" Turn";
    turns = 0;
    boxes =document.getElementsByClassName("box");
    info = document.getElementById("info");
    winner = false;
    squares = [];
    var i =0;
    for(box of boxes)
    {
        var temp = new Area(box,0,i,"I");
        squares.push(temp);
        i++; 
    }

    Game(squares);

}

function Game(){
    for (const spot of squares)
    {
        if(spot.isClicked!=1)
        {
            var temp = spot.box;
            temp.onclick = function(){clicked(spot)};
        }
    }
}

function clicked(spot)
{
    if(spot.box.innerHTML != "X" && spot.box.innerHTML !="O")
    {
        spot.box.innerHTML= player
        spot.val =player
        if(player =="X")
        {
            player ="O";
        }
        else
        {
            player = "X";
        }

        info.textContent = "\"" + player +"\" Turn";
        //var id = spot.id;
        //spot.isClicked=1;
        //squares.splice(id,1);
        //squares.splice(id,0,spot);
        turns++;
        //console.log(turns);
    }
    if(winner == true)
    {
        GameOver();
    }
    else
    {
        Checkwin();
    }
}

function Checkwin()
{
    let values = [];
    let checkX = [];
    let checkO= [];
    const winning = [[0,1,2],[3,4,5],[6,7,8],[0,4,8],[2,4,6],[0,3,6],[1,4,7],[2,5,8]];
    for(i of squares)
    {
        values.push(i.val);
    }
    console.log(values)
    var x = 0;
    temparr = [];
    temp=0;
    //console.log(temparr)

    while(x<values.length)
    {
        if(values[x]=="X")
        {
            checkX.push(x);
        }
        else if(values[x]=="O")
        {
            checkO.push(x);
        }
        x++
    }
    
    //console.log("checkO,",checkO);
    //console.log("checkx,",checkX);

    x = 0;
    while(x < winning.length)
    {
        if(checkX.includes(winning[x][0]))
        {
            if(checkX.includes(winning[x][1]))
            {
                if(checkX.includes(winning[x][2]))
                {
                    GameOver("X Wins");
                    return;
                }
            }
            
        }
        x++;
    }

    x = 0;
    while(x < winning.length)
    {
        if(checkO.includes(winning[x][0]))
        {
            if(checkO.includes(winning[x][1]))
            {
                if(checkO.includes(winning[x][2]))
                {
                    GameOver("O Wins");
                    return;
                }
            }
            
        }
        x++;
    }

    if(turns == 9)
    {
        GameOver("Nobody Wins Tie Game");
    }
}

function GameOver(winPlayer)
{
    info.textContent = winPlayer;
    addStuff();
}

function Reset()
{
    var curBoard = document.getElementById("boards");
    curBoard.style.pointerEvents = 'all';

    for(x of squares)
    {
    x.box.innerHTML = "";
    x.box.val = "I";
    }
    var resetBut = document.getElementById("resetBut");
    resetBut.remove();
    StartGame()
}


function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function addStuff()
{
    var curBoard = document.getElementById("boards");
    curBoard.style.pointerEvents = 'none';

    var resetBut = document.createElement("button");
    var resetText = document.createTextNode("Reset Game");
    resetBut.appendChild(resetText);
    var ins = document.getElementById("infoBox");

    resetBut.style.display="flex";
    resetBut.style.justifyContent="center";
    resetBut.style.margin="auto";
    resetBut.style.alignContent="center";
    resetBut.setAttribute("id","resetBut")
    resetBut.setAttribute("onClick", "javascript: Reset();")
    insertAfter(resetBut,ins)
    
}