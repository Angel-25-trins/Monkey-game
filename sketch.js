
var monkey , monkey_running, monkey_collided;

var banana ,bananaImage, obstacle, obstacleImage;

var bananaGroup, obstacleGroup;

var score;

var survivalTime = 0;

var ground;

var PLAY = 1;

var gameState = PLAY;

var END = 0;

function preload(){
  
  //monkey running animation
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  //monkey collided animation
  monkey_collided = loadAnimation("sprite_0.png");
  
  //loading the image for banana and obstacle
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  //creating the food and obstacle group
  bananaGroup = new Group();
  obstacleGroup = new Group();
}



function setup() {
  createCanvas(600,500);
  
  //creating ground
  ground = createSprite(300,450,1500,20);
  
  score = 0;
  
  //creating the monkey
  monkey = createSprite(50,400,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.addAnimation("collided",monkey_collided);
  monkey.scale = 0.15;
  
}


function draw() {
  
  background("lightgreen");
  
 
  //making monkey collide with the ground
  monkey.collide(ground);
  
  monkey.debug = false;
  
  //creating the scoring system
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 500,50);
  
  //creating the survival time
  stroke("black");
  textSize(20);
  fill("black");
  text("Survival Time: " + survivalTime, 100,50)
  
  //making the 2 gameStates
  if (gameState === PLAY){
    
    
    //making the ground scroll like never ending
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8;
    
    //adding velocity to the ground when gameState is PLAY
    ground.velocityX = -4;
    
    //when monkey collides with an obstacle
    if(monkey.isTouching(obstacleGroup)){
      gameState = END;
    }
    
    //when monkey touches banana then add score
    if (monkey.isTouching(bananaGroup)){
      bananaGroup.destroyEach();
      score = score + 1;
    }
    
    //making the survival time increase
    survivalTime = Math.ceil(frameCount/frameRate());
    
      //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 100) {
    monkey.velocityY = -12;
    }
    
     //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
    
    
    //spawning the obstacles and the food
    spawnObstacles();
    spawnFood();
  }
  
  
  else if (gameState === END){
    
    //changing monkey's animation
    monkey.changeAnimation("collided",monkey_collided);
    
    //making the velocity to 0
    ground.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
    //changing lifeTime so they never end
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
    //making the text to restart the game
    stroke("red");
    textSize(20);
    fill("red");
    text("Press R to restart",200,100);
    
    //Press R to restart the game
    if (keyDown("r") && gameState === END){
      reset();
    }
  }
  
  
  drawSprites();
  
}
//making the spawnFood function
function spawnFood(){
  if (frameCount % 80 === 0){
  var banana = createSprite(Math.round(random(550,600)), Math.round((random(120,200))),20,20);
  banana.addImage(bananaImage);
  banana.velocityX = -3;
  banana.scale = 0.12;
  banana.lifeTime = 150;
  bananaGroup.add(banana);
    
  }
}

//making the spawnObstacles function
function spawnObstacles(){
  
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(Math.round(random(550,600)),400);
  obstacle.addImage(obstacleImage);
  obstacle.velocityX = -4;
  obstacle.scale = 0.25;
  obstacle.lifeTime = 150;
  obstacleGroup.add(obstacle);
  }
}

//creating a function to restart the same
function reset(){
  
  gameState = PLAY;
  
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
  
  monkey.changeAnimation("running",monkey_running);
  
  survivalTime = 0;
  score = 0;
  
}
