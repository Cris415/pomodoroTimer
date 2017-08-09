var secondsElapsed = 0;
var sessionLength = 1500; //seconds;
var breakLength = 300;
var repeat = false; //A toggle to repeat clock
var displayTime = document.getElementById("timer");
var timerRunning = false;
var breakRunning = false;
var newSession;
var session = 1;
var pauseFlag = false;
var audio = new Audio('http://www.accesscontrolsales.com/Ingram_Products/mp3/pb525dch-x.mp3');

function myTimer() {
	secondsElapsed++;
	displayTime.innerHTML = secToClock(secondsElapsed);
	if (timerRunning) {
		move.frame(secondsElapsed, sessionLength);
		timerDone(sessionLength, secondsElapsed);
	} else if (breakRunning) {
		move.frame(secondsElapsed, breakLength);
		timerDone(breakLength, secondsElapsed);
	}
}
function breakDisplay(){
	if(breakRunning){
		document.getElementById("running").innerHTML = "break!";
	}
}
//end of timer
function timerDone(lengthOfTimer, timePassed) {
	breakDisplay();
	if (lengthOfTimer === timePassed) {
		secondsElapsed = 0;
		if (timerRunning) {
			timerRunning = false;
			breakRunning = true;
			audio.play();
			move.clear();
		} else {
			timerRunning = true;
			breakRunning = false;
			audio.play();
			move.clear();
			if (!repeat) {
				clearInterval(newSession);
				timerRunning = false;
				displayTime.innerHTML = "done";
			} else if (repeat) {
				ssnCounter();
			}
		}
	}
}

document.getElementById("start").addEventListener("click", timerStart);

function timerStart() {
	if (!timerRunning && !breakRunning && session === 1) {
		timerRunning = true;
		newSession = setInterval(myTimer, 1000);
	} else if (pauseFlag) {
		pauseFlag = false;
		newSession = setInterval(myTimer, 1000);
	}
}

document.getElementById("pause").addEventListener("click", pause);

function pause() {
	pauseFlag = true;
	clearInterval(newSession);
}

document.getElementById("reset").addEventListener("click", reset);
function reset() {
	timerRunning = false;
	breakRunning = false;
	sessionLength = 1500;
	breakLength = 300;
	secondsElapsed = 0;
	session = 1;
	move.clear();
	displayTime.innerHTML = secToClock(secondsElapsed); //update the timer with 00:00
	document.getElementById("ssnLength").innerHTML =
		"session " + sessionLength / 60 + "min";
	document.getElementById("brkLength").innerHTML =
		"break " + breakLength / 60 + "min";
	clearInterval(newSession);
}

document.getElementById("repeat").addEventListener("click", repeatFn);
function repeatFn() {
	if (!repeat) {
		//Add a class to button to show "on" status
		repeat = true;
		document.getElementById("repeat").classList.add("repeatActive");
	} else {
		repeat = false;
		document.getElementById("repeat").classList.remove("repeatActive");
	}
}

document.getElementById("ssnAdd").addEventListener("click", ssnUp);
function ssnUp() {
	if (!timerRunning && !breakRunning) {
		sessionLength += 60;
		document.getElementById("ssnLength").innerHTML =
			"session " + sessionLength / 60 + "min";
	}
}

document.getElementById("brkUp").addEventListener("click", brkUp);
function brkUp() {
	if (!timerRunning && !breakRunning) {
		breakLength += 60;
		document.getElementById("brkLength").innerHTML =
			"break " + breakLength / 60 + "min";
	}
}

document.getElementById("ssnDown").addEventListener("click", ssnDown);
function ssnDown() {
	if (!timerRunning && !breakRunning) {
		if (sessionLength !== 0 && sessionLength > 0) {
			sessionLength -= 60;
			document.getElementById("ssnLength").innerHTML =
				"session " + sessionLength / 60 + "min";
		}
	}
}
document.getElementById("brkDown").addEventListener("click", brkDown);
function brkDown() {
	if (!timerRunning && !breakRunning) {
		if (breakLength !== 0 && breakLength > 0) {
			breakLength -= 60;
			document.getElementById("brkLength").innerHTML =
				"break " + breakLength / 60 + "min";
		}
	}
}

function ssnCounter() {
	session++;
	var ssnDis = document.getElementById("ssnCounter");
	ssnDis.innerHTML = "session: " + session;
}

//seconds  to hh:mm:ss
function secToClock(seconds) {
	var hr = seconds / 3600;
	var rem = seconds % 3600;
	var mn = rem / 60;
	var sec = rem % 60;
	var hrStr = (hr < 10 ? "0" : "") + Math.trunc(hr);
	var mnStr = (mn < 10 ? "0" : "") + Math.trunc(mn);
	var secStr = (sec < 10 ? "0" : "") + Math.trunc(sec);
	if (Math.trunc(hr) === 0) {
		return mnStr + ":" + secStr;
	} else {
		return hrStr + ":" + mnStr + ":" + secStr;
	}
}

var move = (function() {
	var elem = document.getElementById("myBar");
	var width = 0;
	return {
		frame: function(secs, lengthOfTime) {
			width = secs;
			width = width / lengthOfTime * 100;
			elem.style.width = width + "%";
		},
		clear: function() {
			width = 0;
			elem.style.width = width + "%";
		}
	};
})();

