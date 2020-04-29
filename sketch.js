

//const zoom = 10;
const w = 50;
const h = 50;
const lineG = 10;
var path = [];
var grids;

var sNode,eNode,curNode;

var closedSet = [];
var openSet = [];

class node{
    constructor(x,y,i,j,previous){
        this.x = x;
        this.y = y;
        this.i = i;
        this.j = j;
        this.previous = this.previous;
        this.closestN;
        
    }

    setClosestN(closestN){
        this.closestN = closestN;
    }

    show() {
        rect(this.x,this.y,w,h);        
    }
}

function setup() {   

    createCanvas(w*lineG + 1,h*lineG +1)
    strokeWeight(1)
    background(255);       

    grids = [];
    for( let  i =0 ; i < lineG ; i++){
        for (let j =0 ; j < lineG ; j++){
            grids[i] = [];
        }
        
    }

    for( let  i =0 ; i < lineG ; i++){
        for (let j =0 ; j < lineG ; j++){
            grids[i][j] = new node(j*w,i*h,i,j,null);
        }        
    }
    sNode = grids [0][0]
    eNode = grids [lineG-1][lineG-1];

    for( let  i =0 ; i < lineG ; i++){
        for (let j =0 ; j < lineG ; j++){            
            grids[i][j].setClosestN(pickNeighbor(grids[i][j]));
        }        
    }
    

    
    curNode = sNode;

    openSet.push(sNode);
    
}

function pickNeighbor(cur) {
    var distance = Infinity;
    var tmp;
    var closestN = null;

    if(cur.i == 0){        
        //koita katw
        tmp = manhattanD(grids[cur.i + 1][cur.j]); //down neighbor
        if(tmp < distance){
            distance  = tmp;
            closestN = grids[cur.i + 1][cur.j];
        }
    }else if(cur.i == 9){
        //koita panw
        tmp = manhattanD(grids[cur.i - 1][cur.j]); //up neighbor
        if(tmp < distance){
            distance  = tmp;
            closestN = grids[cur.i - 1][cur.j];
        }
    }else{
        tmp = manhattanD(grids[cur.i - 1][cur.j]); //up neighbor
        if(tmp < distance){
            distance  = tmp;
            closestN = grids[cur.i - 1][cur.j];
        }
        tmp = manhattanD(grids[cur.i + 1][cur.j]); //down neighbor
        if(tmp < distance){
            distance  = tmp;
            closestN = grids[cur.i + 1][cur.j];  
        }
    }

    if(cur.j  == 0 ){
        //koita de3ia   
        tmp = manhattanD(grids[cur.i][cur.j+1]); //right neighbor
        if(tmp < distance){
            distance  = tmp;
            closestN = grids[cur.i][cur.j+1];
        }    
    }else if(cur.j == 9){
        //koita aristera
        tmp = manhattanD(grids[cur.i][cur.j-1]); //left
        if(tmp < distance){
            distance  = tmp;
            closestN = grids[cur.i][cur.j-1];
        }
    }else{
        tmp = manhattanD(grids[cur.i][cur.j+1]); //right neighbor
        if(tmp < distance){
            distance  = tmp;
            closestN = grids[cur.i][cur.j+1];
        }   

        //koita aristera
        tmp = manhattanD(grids[cur.i][cur.j-1]); //left neighbor
        if(tmp < distance){
            distance  = tmp;
            closestN = grids[cur.i][cur.j-1];
        }

    }

  
    if(cur.i == 1 && cur.j == 0){
        console.log("Closet nei for 1-0 is " + closestN.i + "-" + closestN.j);
        console.log("distance" + distance)
    }
        

    return closestN;


}

function manhattanD(cur) {    
    return (abs(cur.x-eNode.x) + abs(cur.y-eNode.y));
}

function draw() {       
    fill(255)
    stroke(0);
     
    for( let  i =0 ; i < lineG ; i++){
        for (let j =0 ; j < lineG ; j++){            
            grids[i][j].show();
        }        
    } 
    
    
    for(let  i =0 ; i < lineG ; i++){
        for (let j =0 ; j < lineG ; j++){  
            fill(255)
            grids[i][j].closestN.show(); 
                   
        }        
    } 

    if(curNode != eNode){        
        curNode = curNode.closestN;
        openSet.push(curNode)
    }

    for(let i =0 ;i < openSet.length ; i ++){
        fill(0,255,0);
        if(i == openSet.length -1)
            fill(0,0,255);
        openSet[i].show();
    }
        
    
  
}

