var STORY1=0;
var STORY2=1;
var STORY3=2;
var PLAY=3;
var END=4;
var WIN=5;
var gameState=STORY1;
var Player,player_img;
var enemy;
var bgImg;
var bg;
var crinimal,crinimalImg;
var speed = 1;
var food,foodGroup;
var invground;
var foodImg
var stone,Stone_img;
var stoneGroup;
var arrow,arrow_img,arrowGroup,Invarrow,InvarrowImg;
var energy,energy_img,EnergyGroup;
var distance = 0;
function preload(){
  player_img = loadAnimation("Images/Runner1.png","Images/Runner2.png","Images/Runner3.png","Images/Runner4.png","Images/Runner5.png","Images/Runner6.png","Images/Runner7.png","Images/Runner8.png","Images/Runner9.png","Images/Runner10.png");
  crinimalImg = loadAnimation("Images/Crinimal1.png","Images/Crinimal2.png","Images/Crinimal3.png","Images/Crinimal4.png","Images/Crinimal5.png","Images/Crinimal6.png","Images/Crinimal7.png","Images/Crinimal7.png","Images/Crinimal9.png")
  bgImg = loadImage("Images/bg.jpg")
  foodImg = loadImage("Images/Apple..png")
  Stone_img = loadImage("Images/Obstacle.png")
  arrow_img=loadImage("Images/arrow2.png")
  InvarrowImg=loadImage("Images/arrow.png")
  energy_img = loadImage("Images/Energy.png")
}
function setup() {
  createCanvas(displayWidth,displayHeight);

  EnergyGroup = createGroup();

  bg = createSprite(displayWidth/2.95384615385,displayHeight/2.88)
  bg.addImage(bgImg)
  bg.x=bg.width/(displayWidth/960);
  

  Player = createSprite(displayWidth/1.92,displayHeight/1.83673469388)
  Player.addAnimation("Hello",player_img)
  Player.visible = false;
  Player.scale = (displayWidth*displayHeight/1382400);

  crinimal = createSprite(displayWidth/23.1325301205,displayHeight/1.58125915081)
  crinimal.addAnimation("hello",crinimalImg);
  crinimal.scale = (displayWidth*displayHeight/545684.210526);
  crinimal.visible = false;

  invground = createSprite(displayWidth/2.95384615385,displayHeight/1.50417827298,displayWidth,displayHeight/96)
  invground.visible = false;
  foodGroup = createGroup()
  stoneGroup = createGroup();
  arrowGroup = createGroup();

}

function draw() {
  background(225,225,225);  
  crinimal.debug = true;
  if (gameState===3){
    Player.visible = true;
    bg.velocityX = (displayWidth/-192);
    crinimal.visible=true;
    

    if (bg.x < (width/(displayWidth/240))){
      bg.x = bg.width/(displayWidth/960);
    } 
  
    speed = speed + Math.round(getFrameRate()/60);
    if(Player.x>(displayWidth/10.1052631579))
    Player.x = (Player.x-speed/100);
    
    if (touches.length > 0 || keyDown("space")&&Player.y >= (displayHeight/1.8)){
      Player.velocityY = (displayHeight/-50.2727272727);
      touches = [];
    }
    
    Player.velocityY = Player.velocityY+(displayHeight/720)
    Player.collide(invground)

    console.log(Player.x)
    foodGroup.debug = true;

  //  bg.velocityX = (bg.velocityX+speed);
    if(Player.isTouching(foodGroup)){
      foodGroup.destroyEach();
      Player.x = Player.x +80;
    }
    if(Player.isTouching(EnergyGroup)){
      EnergyGroup.destroyEach();
      Player.x = Player.x +115;
    }
    if(Player.isTouching(stoneGroup)&&Player.x>190){
      Player.x = Player.x-30;
      stoneGroup.destroyEach();
    }
    if(Player.isTouching(arrowGroup)&&Player.x>190){
      Player.x = Player.x-40;
      arrowGroup.destroyEach();
    }
    //if()

    if(Player.x<190){
      gameState=4;
    }
    if(foodGroup.x===200){
      foodGroup.destroyEach();
      crinimal.x = crinimal.x +50; 
    }
    if(crinimal.isTouching(stoneGroup)){
      stoneGroup.destroyEach();
      Player.x = Player.x +70;
    }
    console.log(foodGroup.x)

    
  textSize(25)
  Food();
  Stone();
  Arrow()
  drawSprites();
  text(mouseX+","+mouseY,mouseX,mouseY)
  text("Distance Covered:- "+distance,900,100)

 if(frameCount%2===0){
   distance = distance+1;
 }
 console.log(distance)
 if(distance===400){
  gameState = WIN;
}


  }
  if(gameState===4){
      Player.destroy();
      crinimal.destroy();
      bg.destroy();
      foodGroup.lifetime = 0;
      stoneGroup.lifetime = 0;
      foodGroup.destroyEach();
      stoneGroup.destroyEach();
      textSize(100);
      text("You lost",550,400)
  }
  if(gameState===5){
    Player.destroy();
    crinimal.destroy();
    bg.destroy();
    foodGroup.lifetime = 0;
    stoneGroup.lifetime = 0;
    foodGroup.destroyEach();
    stoneGroup.destroyEach();
    textSize(100);
    text("You Won",550,400)

  }
  

    if(gameState===1){
      fill("red")
      textSize(50)
      text("Now u need to save yourself from him",305,240)
      text("Your speed will decrease by the time",301,310)
      text("You need to collect food in order to increase your speed",30,380)
      text("If you touch the stone your speed will decrese",160,460)
      text("Also the crinimal will throw arrows at you",250,550)
      text("To decrese your speed",490,630)
      textSize(20)
      text("Press 3 To Continue " ,994,695)

      if(keyCode === 51){
      
        gameState=2;
      }

    }
    if(gameState===2){
      fill("red")
      textSize(50)
      text("Press Space for jump",485,340)
      
      textSize(20)
      text("Press P to start" ,994,655)

      if(keyCode === 112||keyCode === 80){
      
        gameState=3;
      }
textSize(25)
    } 
    if(gameState===0){
      fill("red")
      textSize(displayWidth*displayHeight/41472)
      text("Now i am making the game little easier for you",displayWidth/10.9714285714,displayHeight/4.5)
      text("If u dodge the stones then it will hit the crinimal",displayWidth/11.2941176471,displayHeight/3.48387096774)
      text("And decrese his speed",displayWidth/4.17391304348,displayHeight/2.84210526316)
      text("Also Enrgy drink will also come to increse your speed",displayWidth/21.3333333333,displayHeight/2.4)
      text("If u cover a distance of 400m you will won",displayWidth/9.6,displayHeight/2)

      textSize((displayWidth*displayHeight/103680))
      text("Press P to start" ,displayWidth/1.93158953722,displayHeight/1.53158953722)
      if(touches.length > 0 || keyCode === 112||keyCode === 80){
        
        gameState=3;
        touches = [];

      }
    }
  
     
     
 
      

    }
  
    function Food(){
      if(frameCount%120===0){
     food = createSprite(displayWidth/1.47692307692,displayHeight/2.38938053097)
     food.addImage("Hello",foodImg)
     food.velocityX = (displayWidth/-192);
     food.scale = (displayWidth/960);
     foodGroup.add(food)
     food.lifetime = (displayWidth);

      }
      if(frameCount%175===0){
        energy = createSprite(displayWidth/1.47692307692,displayHeight/2.38938053097)
        energy.addImage("Hello",energy_img)
        energy.velocityX = (displayWidth/-192);
        energy.scale = (displayWidth/6400);
        EnergyGroup.add(energy)
        energy.lifetime = (displayWidth);
   
         }
    }
    function Stone(){
      if (frameCount%190===0){
        stone = createSprite(displayWidth/1.47692307692,displayHeight/1.58823529412)
        stone.addImage(Stone_img)
        stone.velocityX =(displayWidth/-192);
        stone.lifetime = (displayWidth);
        stoneGroup.add(stone)
        stone.scale =(displayWidth/6400);
      }
    }
    function Arrow(){
      if (frameCount%280===0){
      arrow = createSprite(crinimal.x,crinimal.y)
      arrow.addImage(arrow_img)
      arrow.velocityX = (displayWidth/120);
      arrow.lifetime = (displayWidth);
      arrowGroup.add(arrow)
      arrow.scale = (displayWidth/1476.92307692);
      console.log(arrow.log)
      }
    }
    

     
    