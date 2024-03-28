
function random(n){
  return Math.random() * n;
}

function randomIndex(n){
  return Math.min( Math.floor( random(n + 1) ), n);
}

 function getCurrentTime(){
  return new Date().getTime();
}

function isBlank(c){
  return String(" \t").indexOf(c) != -1;
}
