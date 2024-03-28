
function Div(className){
  this.div = this.createDiv();
  
  this.setClassName(className);
}

Div.prototype.getDiv = function(){
  return this.div;
}

Div.prototype.createDiv = function(){
  return document.createElement("div");
}

Div.prototype.appendChild = function(child){
  return this.div.appendChild(child);
}

Div.prototype.removeChild = function(child){
  return this.div.removeChild(child);
}

Div.prototype.setId = function(id){
  this.div.id = id;
}

Div.prototype.setClassName = function(name){
  this.div.className = name;
}

Div.prototype.setLeft = function(left){
  this.div.style.left = String(left) + "px";
}

Div.prototype.setTop = function(top){
  this.div.style.top = String(top) + "px";
}

Div.prototype.setZIndex = function(zIndex){
  this.div.style.zIndex = String(zIndex);
}

Div.prototype.setWidth = function(width){
  this.div.style.width = String(width) + "px";
}

Div.prototype.setHeight = function(height){
  this.div.style.height = String(height) + "px";
}

Div.prototype.setBackgroundColor = function(color){
  this.div.style.backgroundColor = color;
}

Div.prototype.setColor = function(color){
  this.div.style.color = color;
}

Div.prototype.setBorder = function(border){
  this.div.style.border = border;
}

Div.prototype.setBorderLeft = function(border){
  this.div.style.borderLeft = border;
}

Div.prototype.setBorderTop = function(border){
  this.div.style.borderTop = border;
}

Div.prototype.setBorderRight = function(border){
  this.div.style.borderRight = border;
}

Div.prototype.setBorderBottom = function(border){
  this.div.style.borderBottom = border;
}

Div.prototype.setOpacity = function(opacity){
  this.div.style.opacity = opacity;
  this.div.style.filter = "alpha(opacity=" + (opacity * 100) + ")"; //IE stuff
}

Div.prototype.setFontFamily = function(family){
  this.div.style.fontFamily = family;
}

Div.prototype.setFontSize = function(size){
  this.div.style.fontSize = String(size) + "px";
}

Div.prototype.setFontStyle = function(style){
  this.div.style.fontStyle = style;
}

Div.prototype.setFontWeight = function(weight){
  this.div.style.fontWeight = weight;
}

Div.prototype.setTextAlign = function(align){
  this.div.style.textAlign = align;
}

Div.prototype.setTextTransform = function(transform){
  this.div.style.textTransform = transform;
}

Div.prototype.setClip = function(left, top, right, bottom){
  this.div.style.clip = "rect(" + String(left) + "px," + String(top) + "px," + String(right) + "px," + String(bottom) + "px)";
}

Div.prototype.setInnerHTML = function(html){
  this.div.innerHTML = html;
}

Div.prototype.getInnerHTML = function(){
  return this.div.innerHTML;
}
