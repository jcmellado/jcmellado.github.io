
var CFT_GAME_TICK_GRID = 350;
var CFT_GAME_TICK_SANDCLOCK = 150;
var CFT_GAME_TICK_SPECIAL_MIN = 10000;
var CFT_GAME_TICK_SPECIAL_DELTA = 5000;
var CFT_GAME_POINTS_TOKEN = 15;
var CFT_GAME_POINTS_ROW = 100;
var CFT_GAME_POINTS_SAND = 250; 

function Game(app){
  this.app = app;

  this.score = new Score( document.getElementById("div-score") );
  this.grid = new Grid( document.getElementById("div-grid") );
  this.sandClock = new SandClock( document.getElementById("div-sandclock") );

  this.idGridTask = null;
  this.idSandClockTask = null;
  this.idMouseDown = null;

  this.specialTime = 0;
}  

Game.prototype.start = function(){
  this.score.reset();
  this.sandClock.removeGrains();
  this.grid.pregenerateRow(CFT_GRID_ROWS - 1);
  this.grid.pregenerateRow(CFT_GRID_ROWS - 2);

  this.createTasks();
  this.idMouseDown = mouse.createObserver(this, "onMouseDown");
}

Game.prototype.stop = function(){
  mouse.removeObserver(this.idMouseDown);
  this.destroyTasks();
  this.storeScore();
}

Game.prototype.storeScore = function(){
  var highScore = Cookie.getValue("highscore");
  if ( (highScore == null) || (highScore < this.score.target) ){
    Cookie.setValue("highscore", this.score.target);
  }
}

Game.prototype.clear = function(){
  this.grid.clear();
  this.sandClock.clear();
}

Game.prototype.createTasks = function(){
  this.idGridTask = scheduler.createTask(this, "updateGrid", CFT_GAME_TICK_GRID);
  this.idSandClockTask = scheduler.createTask(this, "updateSandClock", CFT_GAME_TICK_SANDCLOCK);
}

Game.prototype.destroyTasks = function(){
  scheduler.removeTask(this.idGridTask);
  scheduler.removeTask(this.idSandClockTask);
}

Game.prototype.updateGrid = function(task){
  this.grid.update( this.specialToken(task.lastTime) );

  if ( this.grid.isFreeRowFull() ){
    this.score.addPoints(CFT_GAME_POINTS_ROW);
  }

  if ( this.grid.isGameOver() ){
    this.app.gameOver();
  }
}

Game.prototype.specialToken = function(lastTime){
  this.specialTime += getCurrentTime() - lastTime;
  if (this.specialTime >= CFT_GAME_TICK_SPECIAL_MIN + randomIndex(CFT_GAME_TICK_SPECIAL_DELTA) ){
    this.specialTime = 0;
  }
  return 0 == this.specialTime;
}

Game.prototype.updateSandClock = function(task){
  if ( this.sandClock.update() ){
    this.score.addPoints(CFT_GAME_POINTS_SAND);
    this.grid.changeFreeTokenToRock();
  }
}

Game.prototype.onMouseDown = function(object){
  if (object){
    if (object.parentNode){
      if (object.parentNode.token){
        this.score.addPoints( this.grid.clickToken(object.parentNode.token) * CFT_GAME_POINTS_TOKEN);
      }
    }
  }
}
