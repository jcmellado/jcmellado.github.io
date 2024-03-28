
function Observer(id, callback){
  this.id = id;
  this.callback = callback;
}

Observer.prototype.clone = function(){
  var observer = new Task(this.id, this.callback);
  return observer;
}
