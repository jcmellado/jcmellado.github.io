
var CFT_FACE_IMAGE = "face.gif";
var CFT_FACE_WIDTH = 30;
var CFT_FACE_HEIGHT = 30;
var CFT_FACE_NUM_COLORS = 5;
var CFT_FACE_NUM_STAGES = 6;
var CFT_FACE_DEFAULT_STAGE = 0;
var CFT_FACE_ANIMATION_TICK = 1000;

function Face(x, y, color, stage){
  this.x = x;
  this.y = y;
  this.idTask = null;
  
  this.sprite = new Sprite(this, CFT_FACE_IMAGE, CFT_FACE_WIDTH, CFT_FACE_HEIGHT, color, stage);
  this.draw();
}

Face.prototype.destroy = function(){
  if (null != this.idTask){
    scheduler.removeTask(this.idTask);
  }
}

Face.generateColor = function(){
  return randomIndex(CFT_FACE_NUM_COLORS - 1);
}

Face.getDefaultStage = function(){
  return CFT_FACE_DEFAULT_STAGE;
}

Face.prototype.sameColor = function(color){
  return this.sprite.color == color;
}

Face.prototype.draw = function(){
  this.sprite.draw(this.x, this.y);
}

Face.prototype.animate = function(){
  if (null == this.idTask){
    this.changeStage( randomIndex(CFT_FACE_NUM_STAGES - 1) );
    this.idTask = scheduler.createTask(this, "onTick", CFT_FACE_ANIMATION_TICK + randomIndex(CFT_FACE_ANIMATION_TICK) );
  }
}

Face.prototype.onTick = function(task){
  this.changeStage(CFT_FACE_DEFAULT_STAGE);
  scheduler.removeTask(task.id);
  this.idTask = null;
}

Face.prototype.changeStage = function(stage){
  this.sprite.stage = stage;
  this.draw();
}

Face.prototype.fall = function(y){
  this.y = y;
  this.draw();
}
