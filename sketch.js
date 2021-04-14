var balloon,balloonImg;//balloonImage2;
var database,height;
var balloon,Position;
// create database and position variable here

function preload(){
   bg =loadImage("bg.png");
   //balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImg=loadAnimation("Hot Air Ballon-02.png",
   "Hot Air Ballon-03.png","Hot Air Ballon-04.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImg);
  balloon.scale=0.5;

  var balloonPosition=database.ref('balloon/position');
  balloonPosition.on("value",readPosition,showError);

  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImg);
    //write code to move air balloon in left direction
    changePosition(-1,0);
  }
  else if(keyDown(RIGHT_ARROW)){
   balloon.addAnimation("hotAirBalloon",balloonImg);
    //write code to move air balloon in right direction
    changePosition(1,0);
  }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImg);
    //write code to move air balloon in up direction
    changePosition(0,-1);
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImg);
    //write code to move air balloon in down direction
    changePosition(0,1);
  }

   if (keyDown(UP_ARROW)){
     changePosition(0,-10);
     balloon.addAnimation("hotAirBalloon",balloonImg);
     balloon.scale=balloon.scale-0.01;
   }

   if (keyDown(DOWN_ARROW)){
     changePosition(0,10);
     balloon.addAnimation("hotAirBalloon",balloonImg);
     balloon.scale=balloon.scale+0.01;
   }
   
  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

function changePosition(x,y){
  database.ref('balloon/position').set({
    'x':height.x + x,
    'y':height.y + y
  })
}

function readPosition(data){
  height = data.val();
  balloon.x=height.x;
  balloon.y=height.y;
}

function showError(){
  console.log("Error in writing to the database");
}