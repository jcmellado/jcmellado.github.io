
var CFT_MOUSE_LEFT_BUTTON = 1;

function Mouse(){
  this.observers = new Array();
  this.nextIdObserver = 0;
 
  this.registerEvents();
}

Mouse.prototype.registerEvents = function(){
  var self = this;
  document.onmousedown = function(e) { self.onMouseDown(e); };
}

Mouse.prototype.createObserver = function(self, callback){
  var fn = function(object) { self[callback](object); };
  return this.addObserver(fn);
}

Mouse.prototype.addObserver = function(callback){
  var observer = new Observer(++ this.nextIdObserver, callback);
  this.observers.push(observer);
  return observer.id;
}

Mouse.prototype.removeObserver = function(id){
  var index = this.getIndexById(id);
  if (index >= 0){
      this.observers.splice(index, 1);
  }
}

Mouse.prototype.onMouseDown = function(e){
  if ( this.getMouseButton(e) == CFT_MOUSE_LEFT_BUTTON ){
    var observers = this.observersOnMouseDown();
    for (var i in observers){
        if ( this.getIndexById( observers[i].id ) >= 0 ){
           observers[i].callback( this.getMouseObject(e) );
        }
    }
  }
}

Mouse.prototype.observersOnMouseDown = function(){
  var observers = new Array();
  for (var i in this.observers){
      observers.push( this.observers[i].clone() );
  }
  return observers;
}

Mouse.prototype.getIndexById = function(id){
  for (var i in this.observers){
    if (this.observers[i].id == id){
      return i;
    }
  }
  return -1;
}

Mouse.prototype.getMouseButton = function(e) {
  return e? e.which: window.event.button;
}

Mouse.prototype.getMouseObject = function(e) {
  return e? e.target: window.event.srcElement;
}

Mouse.prototype.getMouseX = function(e) {
  return e? e.layerX : window.event.offsetX;
}
  
Mouse.prototype.getMouseY = function(e) {
  return e? e.layerY: window.event.offsetY;
}
