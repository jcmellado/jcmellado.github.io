
var CFT_GRAIN_MIN_SIZE = 1;
var CFT_GRAIN_MAX_SIZE = 4;
var CFT_GRAIN_MIN_SPEED = 3;
var CFT_GRAIN_MAX_SPEED = 7;
var CFT_GRAIN_MIN_ALPHA = 0.25;
var CFT_GRAIN_MAX_ALPHA = 0.90;

function Grain(offsetWidth){
  this.div = new Div("div-grain");
  this.x = 0;
  this.y = 0;
  this.size = 0;
  this.speed = 0;
  this.alpha = 0;
  
  this.born(offsetWidth);
}

Grain.prototype.born = function(offsetWidth){
  this.x = this.generateX(offsetWidth);
  this.y = this.generateY();
  this.size = this.generateSize();
  this.speed = this.generateSpeed();
  this.alpha = this.generateAlpha();

  this.setStyle();
}

Grain.prototype.generateX = function(offsetWidth){
  return randomIndex(offsetWidth - CFT_GRAIN_MAX_SIZE);
}

Grain.prototype.generateY = function(){
  return 0;
}

Grain.prototype.generateSize = function(){
  return CFT_GRAIN_MIN_SIZE + randomIndex(CFT_GRAIN_MAX_SIZE - CFT_GRAIN_MIN_SIZE);
}

Grain.prototype.generateSpeed = function(){
  return CFT_GRAIN_MIN_SPEED + randomIndex(CFT_GRAIN_MAX_SPEED - CFT_GRAIN_MIN_SPEED);
}

Grain.prototype.generateAlpha = function(){
  return CFT_GRAIN_MIN_ALPHA + random(CFT_GRAIN_MAX_ALPHA - CFT_GRAIN_MIN_ALPHA);
}

Grain.prototype.setStyle = function(){
  this.div.setLeft(this.x);
  this.div.setTop(this.y);
  this.div.setWidth(this.size);
  this.div.setHeight(this.size);
  this.div.setOpacity(this.alpha);
}

Grain.prototype.isDown = function(level){
  return (this.y + this.speed) >= level;
}

Grain.prototype.update = function(offsetWidth, offsetHeight, level){
  this.y += this.speed;
  this.div.setTop(this.y);

  this.onFloor(level);
  this.outOfBounds(offsetWidth, offsetHeight);
}

Grain.prototype.onFloor = function(level){
  if ( this.isOnFloor(level) ){
    this.div.setOpacity(0);
  }
}

Grain.prototype.isOnFloor = function(level){
  return this.y >= level;
}

Grain.prototype.outOfBounds = function(offsetWidth, offsetHeight){
  if ( this.isOutOfBounds(offsetHeight) ){
    this.born(offsetWidth);
  }
}

Grain.prototype.isOutOfBounds = function(offsetHeight){
  return this.y >= offsetHeight;
}
