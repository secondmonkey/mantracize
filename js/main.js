var timeoutHandle;
var encourageInterval = 10
var mantrasArray = [];
var mantras = document.getElementsByClassName('mantra');

for (var i = 0; i < mantras.length; i++) {
  mantrasArray.push(mantras[i].innerHTML);
}

console.log(mantrasArray);

function timer(timerid, timeInSeconds, callback) {

  var t = timeInSeconds;
  var countdown = document.getElementById(timerid);

  countdown.innerHTML = formatTime(t);

  if (t > 0) {
    t--;
    countdown.innerHTML = formatTime(t);   
    timeoutHandle = window.setTimeout(function() {timer(timerid, t, callback)},100);
  }
  else if (t == 0) {
    callback();
    timer(timerid, encourageInterval, callback);
  }

  function formatTime() {
    var formatted = t.toString();
    return formatted;
  }
}

function switchMantra() {
  var currentMantra = document.getElementById('mantra');
  var i = mantrasArray.indexOf(currentMantra.innerHTML);
  if (i == mantras.length - 1) {
    currentMantra.innerHTML = mantrasArray[0];
    }
  else {
    currentMantra.innerHTML = mantrasArray[i + 1];
  }
}

timer('countdown', encourageInterval, function() {switchMantra()});
