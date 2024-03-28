
function Scheduler(tick){
  this.tasks = new Array();
  this.nextIdTask = 0;

  this.active(tick)
}

Scheduler.prototype.active = function(tick){
  var self = this;
  var fn = function() { self.onTick(); };
  new Timer(tick, fn);
}

Scheduler.prototype.onTick = function(){
  var tasks = this.tasksOnTick();
  for (var i in tasks){
      if ( this.getIndexById( tasks[i].id ) >= 0){
         tasks[i].callback(tasks[i]);
      }
  }
}  
  
Scheduler.prototype.tasksOnTick = function(){
  var tasks = new Array();

  var currentTime = getCurrentTime();
  for (var i in this.tasks){
    if ( (currentTime - this.tasks[i].lastTime) >= this.tasks[i].tick ){
      tasks.push( this.tasks[i].clone() );
      this.tasks[i].lastTime = currentTime;
    }
  }
  
  return tasks;
}

Scheduler.prototype.createTask = function(self, callback, tick){
  var fn = function(task) { self[callback](task); };
  return this.addTask(fn, tick);
}

Scheduler.prototype.addTask = function(callback, tick){
  var task = new Task(++ this.nextIdTask, callback, tick);
  this.tasks.push(task);
  return task.id;
}

Scheduler.prototype.removeTask = function(id){
  var index = this.getIndexById(id);
  if (index >= 0){
      this.tasks.splice(index, 1);
  }
}

Scheduler.prototype.getIndexById = function(id){
  for (var i in this.tasks){
    if (this.tasks[i].id == id){
      return i;
    }
  }
  return -1;
}
