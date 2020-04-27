//const zoom = 10;
const w = 500;
const h = 500;
var path = [];

var start,end,cur;
function setup() {    
      
    createCanvas(w,h)
    strokeWeight(2)
    background(200);    
    start = {x:parseInt(random(w)),y:parseInt(random(h))};
    end = {x:parseInt(random(w)),y:parseInt(random(h))};
    cur = start;
    
}


function draw() {    
    
    point(start.x,start.y);
    point(end.x,end.y);
    fill(255,0,0);
     
    
    for(let i = 0 ; i < path.length ; i++){        
        point(path[i].x,path[i].y);
    }

    findNext();   




  
  
}

const calc = [{x:0,y:1},{x:0,y:-1},{x:1,y:0},{x:1,y:-1},{x:1,y:1},{x:-1,y:0},{x:-1,y:1},{x:-1,y:-1}]
function findNext(){
    //for all the possible directions
    let minD = 1000;
    for(var i =0; i< 8 ; i++){  
        let possibleMove =  {x : cur.x + calc[i].x , y:cur.y + calc[i].y};  
        if(abs(possibleMove.x - end.x) + abs(possibleMove.y - end.y) < minD){
            minD = abs(possibleMove.x - end.x) + abs(possibleMove.y - end.y);
            var nextMove = possibleMove;
        }
        //point(cur.x + calc[i].x ,cur.y + calc[i].y);
    }
   
    path.push(nextMove);
    cur = nextMove;
    
}