var timer = setInterval(myTimer, 1000);
var secondsElapsed = 0;
var seconds = 0;
var minutes = 0;
var hours = 0;
var sessionLength = 1500; //seconds;
var breakLength = 300;
var repeat = false;
var displayTime = document.getElementById('timer');
// displayTime.innerHTML = "15:23";

function myTimer() {
  secondsElapsed++;
  seconds++;
  timerDone(sessionLength);
  if (seconds === 60) {
    seconds = 0;
    minutes++;
  }
  if (minutes === 60) {
    minutes = 0;
    hours++;
  }
  //display stuff
  if (hours == 0) {
    displayTime.innerHTML = twoDigits(minutes) + ':' +
      twoDigits(seconds);
  } else {
    displayTime.innerHTML = twoDigits(hours) + ':' +
      twoDigits(minutes) + ':' +
      twoDigits(seconds);
  }

}



function timerDone(lengthOfTime) {
  if (lengthOfTime === secondsElapsed) {
    clearInterval(timer);
  }
}

function reset() {
  sessionLength = 1500;
  breakLength = 300;
  clearInterval(timer);
}

function ssnAdjst() {
  sessionLength++;
}

function brkAdjst() {
  breakLength++;
}

//adds a zero infront of a number with one digit
function twoDigits(num) {
  if (num.toString().length < 2) {
    num = "0" + num;
    //num = parseInt(num);
    return num;
  }
  return num;
}
