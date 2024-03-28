
var CFT_COOKIE_MONTH = 31 * 24 * 60 * 60 * 1000;

function Cookie(){
}

Cookie.getValue = function(name){
  var values = document.cookie.split("; ");
  for (var i = 0; i < values.length; ++ i){
    var pair = values[i].split("=");
    if ( unescape(pair[0]) == name){
      return unescape(pair[1]);
    }
  }
  return null;
}

Cookie.setValue = function(name, value){
  var expires = new Date( getCurrentTime() + CFT_COOKIE_MONTH );
  document.cookie = name + "=" + escape(value) + "; expires=" + expires.toGMTString() + "; path=/";
}
