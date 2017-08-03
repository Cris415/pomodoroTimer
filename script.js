var myVar = setInterval(myTimer, 1000);
var secondsElapsed = 0;
var seconds = 0;
var minutes = 0;
var hours = 0;
var lengthOfTimer = 5; //seconds;


function myTimer() {
  secondsElapsed++;
  seconds++;
  timerDone(lengthOfTimer);
  if (seconds === 60) {
    seconds = 0;
    minutes++;
  }
  if (minutes === 60) {
    minutes = 0;
    hours++;
  }

  console.log(twoDigits(hours) + ':' +
    twoDigits(minutes) + ':' +
    twoDigits(seconds));
}

function twoDigits(num) {
  if (num.toString().length < 2) {
    num = "0" + num;
    //num = parseInt(num);
    return num;
  }
  return num;
}

function timerDone(lengthOfTime) {
  if (lengthOfTime === secondsElapsed) {
    clearTimeout(myVar);
  }
}
