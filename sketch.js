var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var gameOver

//Estados do jogo
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadImage("gameOver.png");
}

function setup(){
  
  createCanvas(400,600);
// Movendo plano de fundo
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;


//criar menino correndo 
boy = createSprite(70,580,20,20);
boy.addAnimation("correr",boyImg);
boy.scale=0.08;
//boy.debug = true  
//boy.setCollider("circle", 0,0,500)
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

gameOver = createSprite(width/2,height/2)
gameOver.addImage(endImg)
gameOver.scale = 0.8
gameOver.visible = false;

}

function draw() {

  if(gameState===PLAY){

  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //código para redefinir plano de fundo
  if(path.y > 1000 ){
    path.y = height/2;
  }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      
      treasureCollection=treasureCollection+50;
      //treasureCollection += 50
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
            treasureCollection += 100
   
    }
    else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
            treasureCollection += 150

          }
    else{
      if(swordGroup.isTouching(boy)) {
//Mude o gameState (estado do jogo) para End
        gameState = END
//destrua todos os grupos
        jwelleryG.destroyEach()
        swordGroup.destroyEach()
        cashG.destroyEach()
        diamondsG.destroyEach()
// defina setvelocityEach como 0 para todos os grupos
        jwelleryG.setVelocityYEach(0)
        cashG.setVelocityYEach(0)
        diamondsG.setVelocityYEach(0)
        swordGroup.setVelocityYEach(0)
        gameOver.visible = true
    }

  }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Tesouro: "+ treasureCollection,150,30);
  }

}

function createCash() {
  if (World.frameCount % 200 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 200;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 200;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 410 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 200;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 530 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 200;
  swordGroup.add(sword);
  }
}
