
var CFT_SCORE_TICK = 200;
var CFT_SCORE_NUM_DIGITS = 8;
var CFT_SCORE_STEPS_TO_TARGET = 10;
var CFT_SCORE_MIN_DELTA = 5;

function Score(div){
  this.div = div;
  this.points = 0;
  this.target = 0;
  this.delta = 0;
  
  this.digits = this.createDigits();
  this.updateDigits();

  this.idTask = scheduler.createTask(this, "onTick", CFT_SCORE_TICK);
  this.lastTime = getCurrentTime();
}

Score.prototype.createDigits = function(){
  var digits = new Array();
  
  for (var i = 0; i < CFT_SCORE_NUM_DIGITS; ++ i){
    var digit = new Div("div-digit");
    digits.push(digit);
    this.div.appendChild( digit.getDiv() );
  }

  return digits;
}

Score.prototype.updateDigits = function(){
  var text = new String(this.points);
  
  for (var i = 0; i < CFT_SCORE_NUM_DIGITS; ++ i){
    var digit = "0";
    if ( text.length + i - CFT_SCORE_NUM_DIGITS >= 0 ){
      digit = text.charAt( text.length + i - CFT_SCORE_NUM_DIGITS );
    }
    if (digit != this.digits[i].getInnerHTML() ){
      this.digits[i].setTop( randomIndex(2) - 1 );
      this.digits[i].setInnerHTML(digit);
    }
  }
}

Score.prototype.onTick = function(task){
  if (this.target > this.points){
    this.points = Math.min(this.points + this.delta, this.target);
    this.updateDigits();
  }
}

Score.prototype.reset = function(){
  this.points = 0;
  this.target = 0;
  this.delta = 0;
  this.updateDigits();
}

Score.prototype.addPoints = function(points){
  this.target += points;
  this.delta = Math.max( Math.round( (this.target - this.points) / CFT_SCORE_STEPS_TO_TARGET), CFT_SCORE_MIN_DELTA);
}
