
var CFT_BOOM_IMAGE = "boom.gif";
var CFT_BOOM_WIDTH = 30;
var CFT_BOOM_HEIGHT = 30;
var CFT_BOOM_COLOR = 0;
var CFT_BOOM_STAGE = 0;

function Boom(x, y){
  this.x = x;
  this.y = y;
  
  this.sprite = new Sprite(this, CFT_BOOM_IMAGE, CFT_BOOM_WIDTH, CFT_BOOM_HEIGHT, CFT_BOOM_COLOR, CFT_BOOM_STAGE);
  this.draw();
}

Boom.prototype.destroy = function(){
}

Boom.prototype.sameColor = function(color){
  return false;
}

Boom.prototype.draw = function(){
  this.sprite.draw(this.x, this.y);
}

Boom.prototype.animate = function(){
}

Boom.prototype.fall = function(y){
  this.y = y;
  this.draw();
}
