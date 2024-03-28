
var CFT_ROCK_IMAGE = "rock.gif";
var CFT_ROCK_WIDTH = 30;
var CFT_ROCK_HEIGHT = 30;
var CFT_ROCK_COLOR = 0;
var CFT_ROCK_STAGE = 0;

function Rock(x, y){
  this.x = x;
  this.y = y;
  
  this.sprite = new Sprite(this, CFT_ROCK_IMAGE, CFT_ROCK_WIDTH, CFT_ROCK_HEIGHT, CFT_ROCK_COLOR, CFT_ROCK_STAGE);
  this.draw();
}

Rock.prototype.destroy = function(){
}

Rock.prototype.sameColor = function(color){
  return 5 == color; //Argh!!!
}

Rock.prototype.draw = function(){
  this.sprite.draw(this.x, this.y);
}

Rock.prototype.animate = function(){
}

Rock.prototype.fall = function(y){
  this.y = y;
  this.draw();
}
