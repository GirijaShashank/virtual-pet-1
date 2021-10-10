//Create variables here
var dog,dogImg,happyDog,foodS,foodStock;
var database;

function preload()
{
	dogImg = loadImage("images/dogimg.png");
  happyDog = loadImage("images/dogimg1.png");
}

function setup() {
  database = firebase.database();
	createCanvas(500, 500);
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  dog = createSprite(250,250,10,10);
  dog.addImage(dogImg);
  dog.scale=0.2
  
}


function draw() {  
background(46,139,87);
textSize(20);
fill(255);
stroke("black");
strokeWeight(2);
text("Note: Press UP_ARROW key to feed Drago milk!",50,50);
text("food remaining" + foodS,150,150);

if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage( happyDog );
}

if(keyWentUp(UP_ARROW)){
  dog.addImage(dogImg);
}

if(foodS === 0){
  foodS = 20;
}
  drawSprites();
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}



