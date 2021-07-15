//selectors
const playersDiv = document.querySelector("#players")
const diceDiv = document.querySelector("#dice")
const winDiv = document.querySelector("#win")
const playerRollButton = document.querySelector("#rollButton")
const table = document.querySelector("#grid >  table > tbody")

const colorPicker = new ColorPicker()
const players = initPlayers(+prompt("Enter number of players"))
const cells = initGrid();
let ladders = [];
let snakes = [];
gameLoop()

//p5
function setup() {
    const canvas = createCanvas(table.clientHeight, table.clientHeight);
    canvas.parent("grid"); 
    ladders = [
        new Ladder(46,3),
        new Ladder(93,72),
        new Ladder(84,27),
        new Ladder(67,32),
        new Ladder(69,44),
        new Ladder(85,59),
        new Ladder(60,38)
    ]
    canvas.parent("grid"); 
    snakes = [
        new Snake(99,23,64,39),
        new Snake(96,71,86,74),
        new Snake(86,21,61,42),
        new Snake(90,11,52,31),
        new Snake(47,2,33,16),
        new Snake(57,8,25,12),
        new Snake(26,7,15,14),

    ]
    frameRate(10)
} 

function draw() {
    clear()
    ladders.forEach(ladder=>ladder.show())
    snakes.forEach(snake=>snake.show())
    players.forEach(player=>player.show())
}   

function keyPressed(){
    if(keyCode == 32 && !playerRollButton.getAttribute("disabled")){
        rollTheDice()
    }
}

//gameloop
async function gameLoop(){
    let turn = Math.floor(Math.random()*players.length + 1)
    while (!checkWinner()) {
        turn = 1 + (turn)%players.length
        playerRollButton.children.item(0).innerHTML = turn
        playerRollButton.style.background = `rgb(${players[turn-1].color.join(",")})`
        playerRollButton.removeAttribute("disabled")
        const score = await waitForRoll();
        players[turn - 1].pos += score
        updateScores()
        if(players[turn - 1].pos > 100)
            players[turn - 1].trail.push({
                x: (width/10)*(cells[100].x-1)+(width/20), 
                y: (width/10)*(cells[100].y-1)+(width/20)
            })
        else
            players[turn - 1].trail.push({
                x: (width/10)*(cells[players[turn - 1].pos].x-1)+(width/20), 
                y: (width/10)*(cells[players[turn - 1].pos].y-1)+(width/20)
            })
        diceDiv.style.color = `rgb(${players[turn-1].color.join(",")})`
        checkSnadder(turn - 1)
        updateScores()
    }   
    winDiv.innerHTML = `Player_${turn} won the match`
    winDiv.style.background = `rgb(${players[turn-1].color.join(",")})`
}

//helpers
function initPlayers(numPlayers){
    const players = []
    for(let i = 0; i < numPlayers; i++) {
        players.push(new Player())
        const player = document.createElement("div")
        player.innerHTML = `<p>Player_${i+1}</p><span>${players[i].pos}</span>`
        player.children.item(0).style.background = `rgb(${players[i].color.join(",")})`
        player.children.item(1).style.background = `rgb(${players[i].color.join(",")})`
        playersDiv.appendChild(player)
    }    
    return players
}

function initGrid(){
    const cells = {};
    for (let i = 1; i <= 10; i++) {
        const row = document.createElement("tr");
        let num = 100 - (i-1) * 10
        if(i%2 == 0) num -= 9;
        for (let j = 1; j <= 10; j++) {
            const cell = document.createElement("td")
            cell.innerText = num;
            row.appendChild(cell);
            cells[num] = {   
                x: j,
                y: i,
                d: cell
            };
            if(i%2 != 0) num--;
            else num++;
        } 
        table.appendChild(row);
    }
    return cells;
} 

function checkSnadder(i){
    for (let idx = 0; idx < ladders.length; idx++) {
        if(ladders[idx].end[0] == players[i].pos){
            players[i].pos = ladders[idx].start[0];
            players[i].trail.push({
                x: (width/10)*(cells[players[i].pos].x-1)+(width/20), 
                y: (width/10)*(cells[players[i].pos].y-1)+(width/20)
            })
            return players[i];
        }
    } 
    for (let idx = 0; idx < snakes.length; idx++) {
        if(snakes[idx].start[0] == players[i].pos){
            players[i].pos = snakes[idx].end[0];
            players[i].trail.push({
                x: (width/10)*(cells[players[i].pos].x-1)+(width/20), 
                y: (width/10)*(cells[players[i].pos].y-1)+(width/20)
            })
            return players[i];
        }
    } 
    return false;
}


//Dice roll
function rollTheDice(){
    const score = Math.floor(Math.random()*6 + 1)
    const die = ["&#x2680;", "&#x2681;", "&#x2682;", "&#x2683;", "&#x2684;", "&#x2685;"]
    const diceDiv = document.querySelector("#dice")
    diceDiv.innerHTML = ""
    diceDiv.innerHTML = die[score-1]
    diceDiv.classList = score 
    playerRollButton.setAttribute("disabled", true)

}
function waitForRoll(){
    return new Promise((resolve, reject) => {
        const score = +diceDiv.classList;
        if(!score){
            setTimeout(function () {
                resolve(waitForRoll());
            }, 500);
        }else{   
            diceDiv.classList = ""
            resolve(+score)
        }
    })
}


//gameloop helpers
function checkWinner(){
    for (let i = 0; i < players.length; i++) {
        const player = players[i];
        if(player.pos > 100) return player;
    }
    return false;
}

function updateScores() {
    playersDiv.childNodes.forEach((playerDiv,idx) => {
        playerDiv.children.item(1).innerHTML = players[idx].pos
    });
}