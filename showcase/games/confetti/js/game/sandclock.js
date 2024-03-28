
var CFT_SANDCLOCK_TICK = 50;
var CFT_SANDCLOCK_NUM_GRAINS = 50;
var CFT_SANDCLOCK_TIME_TO_NEW = 100;
var CFT_SANDCLOCK_PERCENT_TO_FLASH = 0.1;
var CFT_SANDCLOCK_OPACITY_DELTA = 0.1;
var CFT_SANDCLOCK_OPACITY_TO_RED = 0.5;
var CFT_SANDCLOCK_OPACITY_TO_UNFLASH = 0.2;

function SandClock(div){
  this.div = div;
  this.level = 0;
  this.floor = false;
  this.opacity = 1;
  
  this.grains = new Array();
  this.sand = this.createSand();

  this.idTask = scheduler.createTask(this, "onTick", CFT_SANDCLOCK_TICK);
  this.lastTime = getCurrentTime();
}

SandClock.prototype.createSand = function(){
  var sand = new Div("div-sand");

  sand.setTop(this.div.offsetHeight - this.level);
  sand.setWidth(this.div.offsetWidth);
  sand.setHeight(this.level);
  this.div.appendChild( sand.getDiv() );
  
  return sand;
}

SandClock.prototype.clear = function(){
  this.level = 0;
  this.floor = false;
  this.removeGrains();
  this.unflash();

  this.sand.setTop(this.div.offsetHeight);
  this.sand.setHeight(this.level);
}

SandClock.prototype.onTick = function(task){
  this.createGrains();
  this.updateGrains();
}

SandClock.prototype.createGrains = function(){
  if (this.grains.length < CFT_SANDCLOCK_NUM_GRAINS){
    var currentTime = getCurrentTime();
    if ( (currentTime - this.lastTime) >= CFT_SANDCLOCK_TIME_TO_NEW){
      this.lastTime = currentTime;
      this.grains.push( this.createGrain() );
    }
  }
}

SandClock.prototype.createGrain = function(){
  var grain = new Grain(this.div.offsetWidth);
  this.div.appendChild( grain.div.getDiv() );
  return grain;
}

SandClock.prototype.updateGrains = function(){
  for (var i = 0; i < this.grains.length; ++ i){
    this.floor |= this.grains[i].isDown(this.div.offsetHeight - this.level);
    this.grains[i].update(this.div.offsetWidth, this.div.offsetHeight, this.div.offsetHeight - this.level);
  }
}

SandClock.prototype.removeGrains = function(){
  for (var i = 0; i < this.grains.length; ++ i){
    this.div.removeChild( this.grains[i].div.getDiv() );
  }
  this.grains = new Array();
}

SandClock.prototype.update = function(){
  var full = false;

  this.sand.setTop(this.div.offsetHeight - this.level);
  this.sand.setHeight(this.level);

  if (this.floor){
    ++ this.level;

    this.flash();
  
    if (this.level == this.div.offsetHeight){
      this.unflash();
      this.removeGrains();
      this.floor = false;
      this.level = 0;
      
      full = true;
    }
  }
  
  return full;
}

SandClock.prototype.flash = function(){
  if ( (this.div.offsetHeight - this.level) <= (this.div.offsetHeight * CFT_SANDCLOCK_PERCENT_TO_FLASH) ){
    this.opacity -= CFT_SANDCLOCK_OPACITY_DELTA;

    if (this.opacity <= CFT_SANDCLOCK_OPACITY_TO_RED){
      this.redflash();
    }
    if (this.opacity <= CFT_SANDCLOCK_OPACITY_TO_UNFLASH){
      this.unflash();
    }

    this.sand.setOpacity(this.opacity);
  }
}

SandClock.prototype.redflash = function(){
  this.sand.setBackgroundColor("#FF0000");
}

SandClock.prototype.unflash = function(){
  this.opacity = 1;

  this.sand.setOpacity(this.opacity);
  this.sand.setBackgroundColor("#FFFF00");
}
