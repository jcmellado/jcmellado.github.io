
var CFT_IMAGE_DIR = "img/";

function Sprite(token, image, width, height, color, stage){
  this.width = width;
  this.height = height;
  this.color = color;
  this.stage = stage;
  
  this.div = this.createDiv(image, token);
}

Sprite.prototype.createDiv = function(image, token){
  var div = new Div("div-sprite");

  div.setInnerHTML("<image src='" + CFT_IMAGE_DIR + image + "' draggable='false'>");
  div.div.token = token;

  return div;
}

Sprite.prototype.draw = function(x, y){
  var u = this.width * this.stage;
  var v = this.height * this.color;

  this.div.setLeft(x - u);
  this.div.setTop(y - v);
  this.div.setClip(v, u + this.width, v + this.height, u);
}
