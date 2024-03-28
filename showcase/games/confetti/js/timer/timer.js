
function Timer(timeout, callback){
  this.timeout = timeout;
  this.callback = callback;
  this.lastTime = getCurrentTime();

  this.onTimeout();
}

Timer.prototype.onTimeout = function(){
  this.callback();
  this.active();
}

Timer.prototype.active = function(){
  var self = this;
  var fn = function() { self.onTimeout(); };
  setTimeout(fn, this.getInterval() );

  this.lastTime = getCurrentTime();
}

Timer.prototype.getInterval = function(){
  return Math.max(this.timeout - ( getCurrentTime() - this.lastTime), 1);
}
