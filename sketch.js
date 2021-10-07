var bow , enemyBow, enemyArrow, arrow,  background;
var bowImage, enemyBowImage, arrowImage, enemyArrowImage, green_balloonImage, red_balloonImage, pink_balloonImage ,blue_balloonImage, bonus_balloonAnimation, backgroundImage;
var balloons, bBalloons, arrows, enemyArrows;
var score, gameState, health1, health2, arrowCount;
function preload(){
  
  backgroundImage = loadImage("background0.png");
  arrowImage = loadImage("arrow0.png");
  enemyArrowImage = loadImage("enemyArrow.png");
  bowImage = loadImage("bow0.png");
  enemyBowImage = loadImage("enemyBow.png");
  red_balloonImage = loadImage("red_balloon0.png");
  green_balloonImage = loadImage("green_balloon0.png");
  pink_balloonImage = loadImage("pink_balloon0.png");
  blue_balloonImage = loadImage("blue_balloon0.png");
  bonus_balloonAnimation = loadAnimation("bonus_balloon0.png", "bonus_balloon1.png", "bonus_balloon2.png", "bonus_balloon3.png", "bonus_balloon4.png", "bonus_balloon5.png", "bonus_balloon6.png", "bonus_balloon7.png")
}

function setup() {
  createCanvas(400, 400);
  
  //creating background
  scene = createSprite(0,0,400,400);
  scene.addImage(backgroundImage);
  scene.scale = 2.5
  
  // creating bow to shoot arrow
  bow = createSprite(380,220,20,50);
  bow.addImage(bowImage); 
  bow.scale = 1;

  // creating enemy bow
  enemyBow = createSprite(20,220,20,50);
  enemyBow.addImage(enemyBowImage); 
  enemyBow.scale = 1;
  enemyBow.visible = false;
  
  //creating group for all the balloons
  balloons = createGroup();
  bBalloons = createGroup();
  arrows = createGroup();
  enemyArrows = createGroup();

  //creating gamestate variable.
  gameState = "start";

  //creating score variable
  score = 0;

  //creating health
  health1 = 100;
  health2 = 100;

  //creating arrow count
  arrowCount = 0;
}

function draw() {
 background(0);
  
  drawSprites();
  
  // moving ground
    scene.velocityX = -3 

    if (scene.x < 0){
      scene.x = scene.width/2;
    }

  if(gameState=="start"){
    fill("blue");
    textSize(20);
    text("Welcome to Balloon Busters!", 70, 200);
    textSize(15);
    text("Shoot balloons to score points. Shoot the flashing balloon to score 10 points. Gain 50 points to move on to the boss level. Press space to start.", 60, 230, 300, 400);
    
    if(keyDown("space")){
      gameState = "play";
    }
  }

  if(gameState=="play"){
    

    arrowCount -= 0.4;

    //moving bow
    bow.y = World.mouseY
    
    // release arrow when space key is pressed
    if (keyWentDown("space") && arrowCount<=0) {
      createArrow();
      arrowCount = 10;
    }

    //Check if balloon is popped
    if(balloons.isTouching(arrows)){
      balloons.destroyEach();
      score+=1;
    }

    if(bBalloons.isTouching(arrows)){
      bBalloons.destroyEach();
      score+= 10;
    }

    if(score>=50){
      gameState = "boss";
    }
    
    textSize(15);
    fill("darkBlue");
    text("Score: " + score, 10, 20);

    //creating continous balloons
    spawnBalloon()

  }

  
  if(gameState=="boss"){
    //moving bow
    bow.y = World.mouseY
    
    // release arrow when space key is pressed
    arrowCount -= 0.4;

    if (keyWentDown("space") && arrowCount<=0) {
      createArrow();
      arrowCount = 10;
    }

    enemyBow.visible = true;

    if(frameCount%60==2){
      enemyBow.velocityY = Math.round(random(-10, 10));
    }
    
    edges= createEdgeSprites();
    enemyBow.bounceOff(edges);

    createEnemyArrow();

    if(enemyArrows.isTouching(bow)){
      health1 -= 10;
      enemyArrows.destroyEach();
    }

    if(arrows.isTouching(enemyBow)){
      health2 -= 10;
      arrows.destroyEach();
    }

    if(health1==0){
      gameState = "lost";
      bow.destroy();
      enemyBow.velocityY = 0;
    }

    if(health2==0){
      gameState = "win";
      enemyBow.destroy();
    }

    fill("green");
    text("Health: " + health1, bow.x-50, bow.y-70);
    text("Health: " + health2, enemyBow.x-10, enemyBow.y-70);
  }
  
  if(gameState=="lost"){
    textSize(50);
    fill("red");
    text("You died!", 100, 200);
  }

  if(gameState=="win"){
    textSize(50);
    fill("darkGreen");
    text("You won!", 100, 200);
  }
  
  
}


// Creating  arrows for bow
 function createArrow() {
  arrow= createSprite(100, 100, 60, 10);
  arrow.addImage(arrowImage);
  arrow.x = 360;
  arrow.y=bow.y;
  arrow.velocityX = -30;
  arrow.lifetime = 100;
  arrow.scale = 0.3;
  arrows.add(arrow);
}

// Creating  enemy arrows for enemy bow
function createEnemyArrow() {
  if(frameCount%30==0){
    enemyArrow= createSprite(100, 100, 60, 10);
    enemyArrow.addImage(enemyArrowImage);
    enemyArrow.x = 40;
    enemyArrow.y=enemyBow.y;
    enemyArrow.velocityX = 30;
    enemyArrow.lifetime = 100;
    enemyArrow.scale = 0.3;
    enemyArrows.add(enemyArrow);
  }

}


function spawnBalloon() {

  if(frameCount%60===0){
    var balloon = createSprite(0,Math.round(random(20, 370)), 10, 10);
    balloon.velocityX = 5;

    rand = Math.round(random(1, 5));
    switch(rand){
      case 1:
        balloon.addImage(red_balloonImage);
        balloon.scale = 0.075;
        balloons.add(balloon);
        break;

      case 2:
        balloon.addImage(green_balloonImage);
        balloon.scale = 0.075;
        balloons.add(balloon);
        break;

      case 3:
        balloon.addImage(pink_balloonImage);
        balloons.add(balloon);
        break;

      case 4:
        balloon.addImage(blue_balloonImage);
        balloon.scale = 0.075;
        balloons.add(balloon);
        break;

      case 5:
        balloon.addAnimation("animation", bonus_balloonAnimation);
        balloon.scale = 0.075;
        if(balloon.y<200){
          balloon.velocityY = 3;
        }else{
          balloon.velocityY = -3;
        }

        balloon.velocityX = 10;

        bBalloons.add(balloon);

        break;

      default: break;
    }
    
    balloon.lifetime = 200;
    
  }
}
