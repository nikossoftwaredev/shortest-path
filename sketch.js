const w = 50;
const h = 50;
const lineG = 15;


var start = false;
var sNode, eNode, curNode;
var grids = [];
var closedSet = [];
var openSet = [];
var path = [];
var phase = 0;

var info = "Chose the start";

class node {
    constructor(x, y, i, j) {
        this.x = x;
        this.y = y;
        this.i = i;
        this.j = j;
        this.g = 1;
        this.previous = undefined;
        this.closestN = null;
        this.start = false;
        this.end = false;
        this.isObstacle = false;
        this.neighbors = [];

    }

    addNeighbors(i, j) {
        if (i < lineG - 1)
            this.neighbors.push(grids[i + 1][j]);
        if (i > 0)
            this.neighbors.push(grids[i - 1][j]);
        if (j < lineG - 1)
            this.neighbors.push(grids[i][j + 1]);
        if (j > 0)
            this.neighbors.push(grids[i][j - 1]);

    }

    show() {
        rect(this.x, this.y, w, h);     
        fill(0)
        //text(this.g, this.x, this.y + h/2)
        //text(this.i + "-" + this.j, this.x, this.y + h);

    }
}

function setup() {
    createCanvas(w * lineG + 1, h * lineG + 40)
    strokeWeight(1)
    background(255);
    
    for (let i = 0; i < lineG; i++) {
        for (let j = 0; j < lineG; j++) {
            grids[i] = [];
        }

    }
    //Initialize grids
    for (let i = 0; i < lineG; i++) {
        for (let j = 0; j < lineG; j++) {
            grids[i][j] = new node(j * w, i * h, i, j);
        }
    }

}

//Pick Neighbors and obstacles then start the game
function mouseClicked() {
    phase++;
    for (let i = 0; i < lineG; i++) {
        for (let j = 0; j < lineG; j++) {
            if (mouseX < grids[i][j].x + w && mouseX >grids[i][j].x && mouseY > grids[i][j].y && mouseY < grids[i][j].y + h) {
                if (phase == 1) {                   
                    grids[i][j].start = true;
                    sNode = grids[i][j];
                    info = "Chose the end";
                } else if (phase == 2) {
                    grids[i][j].end = true;
                    eNode = grids[i][j]; 
                    info = "Make obstacles and press Enter!"                 
                }else if(phase >= 3){                    
                    grids[i][j].isObstacle = true;                 
                }
            }
        }
    }

}

function keyPressed(){
    if (keyCode === RETURN) {        
        start = true;
        init();
    }
    
}

function initWeights(cur) {   

    if(cur.isObstacle)
        return;

    for (let i = 0; i < cur.neighbors.length; i++) {
        var nei = cur.neighbors[i]; //For cur node every single neighbor
        tmpG = cur.g + 1;

        if(nei.isObstacle)
            continue;

        if (!closedSet.includes(nei)) { //If neighbor doesnt exist in the closed set
            if (!openSet.includes(nei)) { //If neighbor doesnt exist in the open set
                nei.g = tmpG;
                openSet.push(nei);
            } else {
                if (tmpG < nei.g)
                    nei.g = tmpG;
            }
            nei.previous = cur;
        }

    }
}

function manhattanD(cur) {
    return (abs(cur.x - eNode.x) + abs(cur.y - eNode.y));
}

function removeFromArray(cur) {
    for (let i = openSet.length - 1; i >= 0; i--) {
        if (openSet[i] == cur)
            openSet.splice(i, 1);
    }
}

function init() {

    for (let i = 0; i < lineG; i++) {
        for (let j = 0; j < lineG; j++) {
            grids[i][j].addNeighbors(i, j);
        }
    }
    

    curNode = sNode;
    openSet.push(sNode);
}

function draw() {
    fill(255)
    stroke(0);    
    
    rect(0,height-45,width,height)
    fill(0);
    textSize(35)
    text(info,0,height-10)
    

    for (let i = 0; i < lineG; i++) {
        for (let j = 0; j < lineG; j++) {
            if (grids[i][j].start || grids[i][j].end || grids[i][j].isObstacle)
                fill(0);  
            else
                fill(255)
             
                grids[i][j].show();
                     
        }
    }

    

    if (start) {       
        if (openSet.length == 0) {
            //no solution
            info = "No solution";
            console.log("No solution");            
        }        
        initWeights(curNode);           

        lowI = 0;
        for (let i = 0; i < openSet.length; i++) {
            fill(255, 0, 0);
            if (openSet[i].g < openSet[lowI].g)
                lowI = i;
        }

        //openSet.previous = curNode;
        curNode = openSet[lowI];

        removeFromArray(curNode);
        closedSet.push(curNode);

        /*--- Drawing on screen --- */        
        for (let i = 0; i < closedSet.length; i++) {
            fill(0, 255, 0);
            closedSet[i].show();
        }


        for (let i = 0; i < openSet.length; i++) {
            fill(255, 0, 0);
            openSet[i].show();
        }

        for (let i = 0; i < lineG; i++) {
            for (let j = 0; j < lineG; j++) {
                if (grids[i][j].start || grids[i][j].end || grids[i][j].isObstacle){
                    fill(0);
                    grids[i][j].show();
                }
                    
            }
        }

        //path
        path = [];
        tmp = curNode;            
        path.push(tmp);       
        
        //saveme = 0;
        while (tmp.previous) {
            //saveme ++;
            //console.log(tmp.i + "-" + tmp.j)            
            path.push(tmp.previous)
            tmp = tmp.previous;
            //if(saveme >= 20)
               // break;
        }

        for (let i = 0; i < path.length; i++) {
            fill(0, 0, 255)
            path[i].show();
        }
        
        if (curNode === eNode) {
            info = "Finished";           
            console.log(`eNode previous : ${eNode.previous.i} - ${eNode.previous.j}`);
            fill(255);
            rect(0,height-45,width,height)
            fill(0);
            textSize(35)
            text(info,0,height-10)
            //console.log(path)
            noLoop();

        }

    }


}