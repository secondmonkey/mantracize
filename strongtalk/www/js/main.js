var timeoutHandle;

var mantrasArray = [];
var mantras = $('.mantra');
var mantrasdiv = $('#mantras');
var mantrasList = $('#mantraslist');

var INTERVAL = 120;
var DELAY = 10;

for (var i = 0; i < mantras.length; i++) {
  mantrasArray.push(mantras[i].innerHTML);
}

function timer(timerid, timeInSeconds, callback) {

  var t = timeInSeconds;
  var countdown = document.getElementById(timerid);

  countdown.innerHTML = formatTime(t);

  if (t > 0) {
    t--;
    countdown.innerHTML = formatTime(t);   
    timeoutHandle = window.setTimeout(function() {timer(timerid, t, callback)},DELAY);
  }
  else if (t == 0) {
    callback();
    timer(timerid, INTERVAL, callback);
  }

  function formatTime() {
    var formatted = t.toString();
    return formatted;
  }
}

function nextMantra() {
  var currentMantra = document.getElementById('currentmantra');
  var i = mantrasArray.indexOf(currentMantra.innerHTML);
  var numMantras = mantrasArray.length;
  if (numMantras == 0) {
    currentMantra.innerHTML = "There aren't any mantras";
    }
  else if (i < numMantras - 1) {
    currentMantra.innerHTML = mantrasArray[i + 1];
    }
  else if (i == numMantras - 1) {
    currentMantra.innerHTML = mantrasArray[0];
  }
}

function submit() {
  var field = $('#custommantra');
  var custom = field.val();
  var numMantras = mantrasList.length;
  var newMantraIndex = numMantras + 1;
  if (custom) {
    mantrasArray.push(custom);
    mantrasList.append( "<li id='mantra" + newMantraIndex + "' data-icon='delete'><a class='mantra' href='#play'>" + custom + "</a> <a class='deleteButton' href='#delete'>Delete</a></li>");
    $('#mantraslist').listview('refresh');
    field.val('');
  }
  else {
    alert('Please enter a mantra');
  }
  field.focus();
}

function deleteMantra(mantraId) {
  var targetmantraContainer = $('#' + mantraId);
  var targetmantraText = $('#' + mantraId + " .mantra")[0].innerHTML;
  var targetMantraIndex = mantrasArray.indexOf(targetmantraText);
  mantrasArray.splice(targetMantraIndex, targetMantraIndex + 1);
  targetmantraContainer.remove();
}

$("#mantraslist").on("click", ".deleteButton", (function() {
  deleteMantra( $(this).parent().attr('id'));
  }));

timer('countdown', INTERVAL, function() {nextMantra()});
