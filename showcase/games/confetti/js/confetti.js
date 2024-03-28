
var CFT_CONFETTI_TICK_PLAY = 100;
var CFT_CONFETTI_TICK_GAMEOVER = 5000;

function Confetti(){
  this.div = document.getElementById("div-container");
  this.game = new Game(this);
  
  this.divPlay = null;
  this.divHighScore = null;
  this.divGameOver = null;

  this.idOnMouseDown = null;
  this.idPlayTask = null;
  this.opacity = 1;
}

Confetti.prototype.menu = function(){
  this.createPlay();
  this.createHighScore( Cookie.getValue("highscore") );
}

Confetti.prototype.createPlay = function(){
  this.divPlay = this.appendDiv("div-play");
  this.idOnMouseDown = mouse.createObserver(this, "onMouseDown");
  this.idPlayTask = scheduler.createTask(this, "updatePlay", CFT_CONFETTI_TICK_PLAY);
}

Confetti.prototype.removePlay = function(){
  scheduler.removeTask(this.idPlayTask);
  mouse.removeObserver(this.idOnMouseDown);
  this.div.removeChild( this.divPlay.getDiv() );
}

Confetti.prototype.createHighScore = function(score){
  this.divHighScore = this.appendDiv("div-highscore");
  if (score){
    this.divHighScore.setInnerHTML("Score: " + score)
  }
}

Confetti.prototype.removeHighScore = function(){
  this.div.removeChild( this.divHighScore.getDiv() );
}

Confetti.prototype.createGameOver = function(){
  this.divGameOver = this.appendDiv("div-gameover");
  scheduler.createTask(this, "removeGameOver", CFT_CONFETTI_TICK_GAMEOVER);
}

Confetti.prototype.removeGameOver = function(task){
  scheduler.removeTask(task.id);
  this.div.removeChild( this.divGameOver.getDiv() );

  this.game.clear();
  this.menu();
}

Confetti.prototype.appendDiv = function(classname){
  var div = new Div(classname);
  this.div.appendChild( div.getDiv() );
  return div;
}

Confetti.prototype.updatePlay = function(task){
  this.opacity -= 0.1;
  if (this.opacity < 0.5){
    this.opacity = 1;
  }
  this.divPlay.setOpacity(this.opacity);
}

Confetti.prototype.onMouseDown = function(e){
  if (e && e.className && (e.className == "div-play") ){
    this.play();
  }
}

Confetti.prototype.play = function(){
  this.removePlay();
  this.removeHighScore();
  this.game.start();
}

Confetti.prototype.gameOver = function(){
  this.game.stop();
  this.createGameOver();
}

var scheduler = new Scheduler(10);
var mouse = new Mouse();

new Confetti().menu();
