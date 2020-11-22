//Create variables here
var dog,happyDog,database,foodS,foodStock;
var dogI,happyD;
var gar;
function preload()
{
  //load images here
  dogI = loadImage("images/dog.png");
  happyD = loadImage("images/dogHappy.png"); 
  gar = loadImage("images/garden.jpg");
}

function setup() {
  createCanvas(500,500);
  
  database = firebase.database();

  dog = createSprite(250,350,50,50);
  dog.addImage(dogI);
  dog.scale=0.1;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
   background(gar);

if(keyDown(UP_ARROW))
{
  writeStock(foodS);
  dog.addImage(happyD);
}

if(keyDown(DOWN_ARROW))
{
reStock(foodS);
}

  drawSprites();
  //add styles here
  fill("red");
  textSize(15);
  text("Food remaining: "+foodS,10,100);
  text("Please press UP ARROW to feed the dog",200,30);
  text("Please press DOWN ARROW to get food",20,400);
}
function readStock(data)
{
  foodS = data.val();
}

function writeStock(x)
{
  if(x<=0)
  {
       x = 0;
  }else{
      x = x-1;
  }
database.ref('/').update({
  Food:x
})
}


function reStock(x)
{
  if(x<=0)
  {
       x = 20;
  }
  dog.addImage(dogI);
database.ref('/').update({
  Food:x
})
}
