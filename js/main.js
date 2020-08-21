// ----     Timer Animation      ----//
const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 15;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};
      
const TIME_LIMIT = 30;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;
let acceptOrder = false;

document.getElementById("countdown-timer-label").innerHTML = TIME_LIMIT;

startTimer();

function onTimesUp() {
  clearInterval(timerInterval);
}

function startTimer() {
    timerInterval = setInterval(() => {
      timePassed = timePassed += 1;
      timeLeft = TIME_LIMIT - timePassed;
      document.getElementById("countdown-timer-label").innerHTML = formatTime(
        timeLeft
      );
      setCircleDasharray();
      setRemainingPathColor(timeLeft);
  
      if (timeLeft === 0) {
        onTimesUp();
      }
    }, 1000);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${seconds}`;
}

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
    if (timeLeft <= alert.threshold) {
      document
        .getElementById("countdown-timer-path-remaining")
        .classList.remove(warning.color);
      document
        .getElementById("countdown-timer-path-remaining")
        .classList.add(alert.color);
    } else if (timeLeft <= warning.threshold) {
      document
        .getElementById("countdown-timer-path-remaining")
        .classList.remove(info.color);
      document
        .getElementById("countdown-timer-path-remaining")
        .classList.add(warning.color);
    }
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("countdown-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}



//----    Accept Order      ----//
const acceptButton    = document.querySelector("[data-selector='accept']");
const declineButton   = document.querySelector("[data-selector='decline']");
const countdownPath   = document.querySelector('#countdown-timer-path-remaining');
const countdownLabel  = document.querySelector('#countdown-timer-label');
const ctas            = document.querySelector('.ctas');
const check           = document.querySelector('.success');
const pulse           = document.querySelector('.countdown-timer');
const footerText      = document.querySelector('footer > p')


function orderAccepted() {
  clearInterval(timerInterval);

  countdownPath.setAttribute("stroke-dasharray", 283);
  countdownPath.style.color = "#00C853";
  countdownLabel.style.display = "none";
  pulse.style.animation = "none";
  ctas.style.display = "none";
  check.style.display = "block";
  document.querySelector('.accept-text').style.display = "none";
  document.querySelector('h1').innerHTML = "Let's Go!";
  footerText.innerHTML = "Loading your delivery";
  footerText.style.marginLeft = "50px";
}

function orderDeclined() {
  clearInterval(timerInterval);
  document.querySelector('h1').innerHTML = "Order Declined!";
  countdownPath.style.color = "#FF0000";
  pulse.style.animation = "none";
  timeLeft = 0;
}

acceptButton.addEventListener("click", orderAccepted);
declineButton.addEventListener("click", orderDeclined);
