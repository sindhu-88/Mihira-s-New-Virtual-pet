var dog;
var happyDog;
var database;
var foodS;
var foodStock;
var feed;
var addFood;
var fedTime, lastFed;
var foodObj, feedDog;

function preload()
{
  dogIMG = loadImage("Dog.png");
  happyDogIMG = loadImage("happyDog.png");
}

function setup() {
  database=firebase.database();
	createCanvas(900, 500);
  
  foodObj = new Food();
  dog = createSprite(250,270,60,60);
  dog.addImage(dogIMG);
  dog.scale = 0.2;

 
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  feed=createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  
  

}


function draw() {  
 background(46,139,87);

 foodObj.display();
 

 

 fedTime=database.ref('FeedTime');
 fedTime.on("value",function(data){
   lastFed=data.val();
 });

 fill(255,255,254);
 textSize(15);
 if(lastFed>=12){
   text("Last Feed:"+lastFed%12+"PM",350,30);
    } else if(lastFed===0){
      text("Last Feed: 12 AM", 350,30);
    }else{
      text("Last Feed:"+lastFed+"AM",350,30);
    }


    drawSprites();
}


function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}


function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food : x
  })
}


function feedDog(){
  dog.addImage(happyDogIMG);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}


//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

