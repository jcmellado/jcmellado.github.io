
function Task(id, callback, tick){
  this.id = id;
  this.callback = callback;
  this.tick = tick;
  this.lastTime = getCurrentTime();
}

Task.prototype.clone = function(){
  var task = new Task(this.id, this.callback, this.tick);
  task.lastTime = this.lastTime;
  return task;
}
