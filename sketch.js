var grant
var score = 0
var gameState="start"
function preload(){
  apple=loadImage("Apple.png")
  banana=loadImage("banana.png")
  snakeImg=loadImage("snake.png")
  grape=loadImage("grape.png")
  orange=loadImage("Orange.png")
  poisonImg=loadImage("poison.png")
  resetButtonImg=loadImage("Reset.png")
}
function setup() {
  createCanvas(800,800);
  database = firebase.database()
  resetButton=createSprite(400,450)
  resetButton.addImage(resetButtonImg)
  resetButton.scale=0.5
  resetButton.visible=false
  foodGroup=new Group()
  lineGroup=new Group()
  snake1=new snake()
  food1=new food(random(100,700),random(100,700))
  poison1=new poison()
  redLine1=new redLine(400,20,800,40)
  redLine2=new redLine(400,780,800,40)
  redLine3=new redLine(20,400,40,800)
  redLine4=new redLine(780,400,40,800)
  foodGroup.add(food1.body)
  lineGroup.add(redLine1.body)
  lineGroup.add(redLine2.body)
  lineGroup.add(redLine3.body)
  lineGroup.add(redLine4.body)
  database.ref("gameState").on("value",(data)=>{
    gameState = data.val()
  })
  database.ref("Snake1").on("value",(data)=>{
    var position = data.val()
    snake1.body.x = position.x
    snake1.body.y = position.y
  })
}

function draw() {
  background("black");  
  drawSprites();
  snake1.body.overlap(foodGroup,eaten)
  
  if(snake1.body.collide(lineGroup) || snake1.body.overlap(poison1.body)){
    gameState="die"
  }
 //snake1.body.collide(lineGroup, die)
  if(gameState==="start"){
  textSize(20)
  text("score:"+score,100,100)
  }
  if(gameState==="die"){
    database.ref("/").update({
      gameState: gameState
    })
    textSize(30)
    text("Game Over! Your score is "+score,250,400)
    snake1.body.visible=false
    resetButton.visible=true

    if(mousePressedOver(resetButton)){
      gameState="start"
      database.ref("/").update({
        gameState: gameState
      })
      score=0
      resetButton.visible=false
      snake1.body.visible=true
      snake1.body.position.x=400
      snake1.body.position.y=400
    }
  }
  if(gameState==="start"){
  if(frameCount%70 === 0){
    food1=new food(random(100,700),random(100,700))
    foodGroup.add(food1.body)
  }
  if(frameCount%100 === 0){
    poison1=new poison()
  }
}
if(gameState==="start")
  keyPressed()
}

function eaten(snake1,food1){
  food1.destroy()
  score=score+1
}

function keyPressed(){
  if(keyCode===RIGHT_ARROW){
    snake1.body.velocityX=+10
    snake1.body.rotation=-90
    snake1.body.velocityY=0
  } else if(keyCode===LEFT_ARROW){
    snake1.body.velocityX=-10
    snake1.body.rotation=90
    snake1.body.velocityY=0
  }else if(keyCode===UP_ARROW){
    snake1.body.velocityY=-10
    snake1.body.rotation=180
    snake1.body.velocityX=0
  }else if(keyCode===DOWN_ARROW){
    snake1.body.velocityY=+10
    snake1.body.rotation=0
    snake1.body.velocityX=0
  }
  database.ref("Snake1").update({
    x:snake1.body.x,
    y:snake1.body.y
  })
}
function die(snake1,foodGroup){
  snake1.destroy()
  foodGroup.destroy()
  gameState="die"
}
