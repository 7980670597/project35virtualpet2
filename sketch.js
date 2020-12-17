//Create variables here
var dog;
var happydog;
var dogImg;
var happydogImg;
var foodStock;
var database;
var Stock;
var foodS;
var fedTime;
var foodObj;
var lastFed;
var feedDog;
var milk;
var milkImg;

function preload()
{
  //load images here
  dogImg = loadImage("dogImg.png");
  console.log(database);
  happydogImg = loadImage("dogImg1.png")
  milkImg = loadImage("Milk.png")

}

function setup() {
  createCanvas(800, 800);
  database = firebase.database();
  foodObj = new Object(Food);
  

  dog = createSprite(250,400,20,20);
  dog.addImage(dogImg)
  dog.scale = 0.2;
  
  
  feed = createButton("Feed the dog");
  feed.position(450,100);
  feed.mousePressed(feedDog)

  addFood  = createButton("Add Food")
  addFood.position(550,100);
  
 
  addFood.mousePressed(addFoodS)
  
  foodStock = database.ref('Food')
  foodStock.on("value",readStock)

  fedTime = database.ref('FeedTime')
  fedTime.on("value",function(data){
    lastFed = data.val;
  })
  
}



function draw() {  
  background(255,144,85)
  textSize(35);
  fill("white");
  text("Food Remaining:"+foodS,100,150)

  fill(255,255,254);
  textSize(15)
  if(lastFed>=12){
    text("Last Feed : "+lastFed%12 + "PM",100,30);
    
  }else if(lastFed ==0){
    text("Last Feed : 12 AM", 100,30);
    
  }else{
    text("Last Feed :  "+lastFed + " AM", 100,30)
    
  }

  
  
 
  
  drawSprites();
  //add styles here

}
function readStock(data){
  foodS = data.val();
}
function writeStock(x){
database.ref('/').update({
Food:x
})
}

function addFoodS(){
  foodS++;
  
  for (var i = 50; i < 720; i=i+50) 
{
   milk = createSprite(i,220,20,20);
  milk.addImage(milkImg)
  milk.scale = 0.1;
 
}
  database.ref('/').update({
    Food:foodS
    
  })
}
function feedDog(){
  dog.addImage(happydogImg);
  foodS--;
  for (var i = 50; i < 720; i=i+50) 
{
   milk = createSprite(i,220,20,20);
  milk.addImage(milkImg)
  milk.scale = 0.1;
 
}
  foodObj = updatefoodStock(foodObj.getfoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getfoodStock(),
    FeedTime:hour()
  })
}




