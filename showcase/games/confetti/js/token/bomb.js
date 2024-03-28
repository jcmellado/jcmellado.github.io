
var CFT_BOMB_IMAGE = "bomb.gif";
var CFT_BOMB_WIDTH = 30;
var CFT_BOMB_HEIGHT = 30;
var CFT_BOMB_STAGE = 0;
var CFT_BOMB_NUM_COLORS = 6;

function Bomb(x, y, color){
  this.x = x;
  this.y = y;
  
  this.sprite = new Sprite(this, CFT_BOMB_IMAGE, CFT_BOMB_WIDTH, CFT_BOMB_HEIGHT, color, CFT_BOMB_STAGE);
  this.draw();
}

Bomb.prototype.destroy = function(){
}

Bomb.generateColor = function(){
  return randomIndex(CFT_BOMB_NUM_COLORS - 1);
}

Bomb.prototype.sameColor = function(color){
  return this.sprite.color == color;
}

Bomb.prototype.draw = function(){
  this.sprite.draw(this.x, this.y);
}

Bomb.prototype.animate = function(){
}

Bomb.prototype.fall = function(y){
  this.y = y;
  this.draw();
}
