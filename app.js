const timer = document.getElementById('stopwatch');
const seconds = document.querySelector('#seconds')
const miliseconds = document.querySelector('#miliseconds')

const startStopBtn = document.querySelector('#startStopBtn')
const resultsList = document.querySelector('#resultsList')

const boxScore = document.querySelector('#boxScore')
const awayRuns = document.querySelector('#awayRuns')
const boxAwayHits = document.querySelector('#awayHits')
const homeRuns = document.querySelector('#homeRuns')
const boxHomeHits = document.querySelector('#homeHits')
const boxHomeLOB = document.querySelector('#homeLeftOnBase')
const boxAwayLOB = document.querySelector('#awayLeftOnBase')


const outsContainer = document.querySelector('#outsContainer')
const inningCount = document.querySelector('#inning')
const first = document.querySelector('#first-base')
const second = document.querySelector('#second-base')
const third = document.querySelector('#third-base')

let secs = 00;
let milis = 00;
let stoptime = true;
var Interval ;
let lastResult = 00;
let results = []
let resultText = ""


let homeAtBat = false
let homeScore = 0
let homeHits = 0
let awayScore = 0
let awayHits = 0
let inning = 1
let outs = 0
let outsTotal = 0

let runnerOnFirst = false
let runnerOnSecond = false
let runnerOnThird = false

let inningHits = 0
let inningRuns = 0
let awayLOB = 0
let homeLOB = 0

function updateScoreboard() {
  awayRuns.textContent = awayScore
  boxAwayHits.textContent = awayHits
  homeRuns.textContent = homeScore
  boxHomeHits.textContent = homeHits
  outsContainer.textContent = outs
  inningCount.textContent = inning
  boxAwayLOB.textContent = awayLOB
  boxHomeLOB.textContent = homeLOB
  checkWinner()
  runnerState()
}

startStopBtn.addEventListener("click", function() {
  if (stoptime == false) {
    stop()
  } else {
    start()
    }
    change();
});

function timerCycle() {
  if (stoptime == false) {
    resultText = ""
    milis = parseInt(milis);
    secs = parseInt(secs);

    milis++;

    if (milis <= 9) {
      miliseconds.innerHTML = "0" + milis
    }

    if (milis > 9) {
      miliseconds.innerHTML = milis
    }
    
    if (milis > 99) {
      secs++
      seconds.innerHTML = "0" + secs
      // min = min + 1;
      milis = 0;
      miliseconds.innerHTML = "0" + milis
    }

    if (secs <= 9) {
      seconds.innerHTML = "0" + secs
    }
  }
}

function resetTimer() {
  clearInterval(Interval)
    stoptime = true;
    secs = 00
    milis = 00
    seconds.innerHTML = '00'
    miliseconds.innerHTML = '00'
    resultText = ""
}

change = function() {
  if (startStopBtn.value =="Stop") startStopBtn.value = "Start";
  else startStopBtn.value = "Stop";
}

stop = function(){
  stoptime = true;
  clearInterval(Interval)
  startStopBtn.innerHTML = "Start"
  lastResult = secs + milis/100;
  console.log(lastResult)
  printResults()
  
}

start = function() {
          resetTimer()
          stoptime = false;
          console.log('button pressed')
          clearInterval(Interval);
          Interval = setInterval(timerCycle, 10)
          startStopBtn.innerHTML = "Stop"
}

function printResults() {
  if (lastResult === 0.97){
    resultText = "Single"
    singleResult();
  } else if (lastResult === 0.98) {
    resultText = "Double"
    doubleResult();
  } else if (lastResult === 0.99) {
    resultText = "Triple"
    tripleResult()
  }else if (lastResult === 1.00){
    resultText = "Homerun"
    homeRunResult()
  } else {
    resultText = "Out"
    outCounter()
  }
  resultsList.innerHTML = ""
  results.unshift(`${lastResult} - ${resultText}`)
  for (let i = 0; i < results.length; i++) {
    let newLi = document.createElement('li')
    newLi.textContent = results[i] 
    resultsList.appendChild(newLi)
  }
 
}

function singleResult() {
  if (runnerOnFirst == true && runnerOnSecond == false && runnerOnThird == false) {
    runnerOnFirst = true
    runnerOnSecond = true
    runnerOnThird = false
    if (homeAtBat == true){
      homeHits++
      inningHits++
      updateScoreboard()
    } else {
      awayHits ++
      inningHits++
      updateScoreboard()
    }
  } else if (runnerOnFirst == false && runnerOnSecond == true && runnerOnThird == false) {
    runnerOnFirst = true
    runnerOnSecond = false
    runnerOnThird = true
    if (homeAtBat === true){
      homeHits++
      inningHits++
      updateScoreboard()
    } else {
      awayHits ++
      inningHits++
      updateScoreboard()
    }
  } else if (runnerOnFirst == false && runnerOnSecond == false && runnerOnThird == true) {
    runnerOnFirst = true
    runnerOnSecond = false
    runnerOnThird = false
    if (homeAtBat == true){
      homeHits++
      inningHits++
      homeScore++
      inningRuns++
      updateScoreboard()
    } else {
      awayHits ++
      inningHits++
      awayScore ++
      inningRuns++
      updateScoreboard()
    }
  } else if (runnerOnFirst == true && runnerOnSecond == true && runnerOnThird == false) {
    runnerOnFirst = true
    runnerOnSecond = true
    runnerOnThird = true
    if (homeAtBat == true){
      homeHits++
      inningHits++
      updateScoreboard()
    } else {
      awayHits ++
      inningHits++
      updateScoreboard()
    }
  } else if (runnerOnFirst == true && runnerOnSecond == false && runnerOnThird == true) {
    runnerOnFirst = true
    runnerOnSecond = true
    runnerOnThird = false
    if (homeAtBat == true){
      homeHits++
      inningHits++
      homeScore++
      inningRuns++
      updateScoreboard()
    } else {
      awayHits ++
      inningHits++
      awayScore ++
      inningRuns++
      updateScoreboard()
    }
  } else if (runnerOnFirst == false && runnerOnSecond == true && runnerOnThird == true) {
    runnerOnFirst = true
    runnerOnSecond = false
    runnerOnThird = true
    if (homeAtBat == true){
      homeHits++
      inningHits++
      homeScore++
      inningRuns ++
      updateScoreboard()
    } else {
      awayHits ++
      inningHits++
      awayScore ++
      inningRuns ++
      updateScoreboard()
    }
  } else if (runnerOnFirst == true && runnerOnSecond == true && runnerOnThird == true) {
    runnerOnFirst = true
    runnerOnSecond = true
    runnerOnThird = true
    if (homeAtBat == true){
      homeHits++
      inningHits++
      homeScore++
      inningRuns ++
      updateScoreboard()
    } else {
      awayHits ++
      inningHits++
      awayScore ++
      inningRuns ++
      updateScoreboard()
    }
  } else {
    runnerOnFirst = true;
    if (homeAtBat == true){
      homeHits++
      inningHits++
      updateScoreboard()
    } else {
      awayHits ++
      inningHits++
      updateScoreboard()
    }
  }
}

function doubleResult() {
  if (runnerOnFirst == true && runnerOnSecond == false && runnerOnThird == false) {
    runnerOnFirst = false
    runnerOnSecond = true
    runnerOnThird = true
    if (homeAtBat == true){
      homeHits++
      inningHits++
      updateScoreboard()
    } else {
      awayHits ++
      inningHits++
      updateScoreboard()
    }
  } else if (runnerOnFirst == false && runnerOnSecond == true && runnerOnThird == false) {
    runnerOnFirst = false
    runnerOnSecond = true
    runnerOnThird = false
    if (homeAtBat == true){
      homeHits++
      homeScore++
      inningHits++
      inningRuns++
      updateScoreboard()
    } else {
      awayHits ++
      awayScore ++
      inningHits++
      inningRuns++
      updateScoreboard()
    }
  } else if (runnerOnFirst == false && runnerOnSecond == false && runnerOnThird == true) {
    runnerOnFirst = false
    runnerOnSecond = true
    runnerOnThird = false
    if (homeAtBat == true){
      homeHits++
      homeScore++
      inningHits++
      inningRuns++
      updateScoreboard()
    } else {
      awayHits ++
      awayScore ++
      inningHits++
      inningRuns++
      updateScoreboard()
    }
  }  else if (runnerOnFirst == true && runnerOnSecond == true && runnerOnThird == false) {
    runnerOnFirst = false
    runnerOnSecond = true
    runnerOnThird = true
    if (homeAtBat == true){
      homeHits++
      homeScore++
      inningHits++
      inningRuns++
      updateScoreboard()
    } else {
      awayHits ++
      awayScore ++
      inningHits++
      inningRuns++
      updateScoreboard()
    }
  } else if (runnerOnFirst == true && runnerOnSecond == false && runnerOnThird == true) {
    runnerOnFirst = false
    runnerOnSecond = true
    runnerOnThird = true
    if (homeAtBat == true){
      homeHits++
      homeScore++
      inningHits++
      inningRuns++
      updateScoreboard()
    } else {
      awayHits ++
      awayScore ++
      inningHits++
      inningRuns++
      updateScoreboard()
    }
  } else if (runnerOnFirst == false && runnerOnSecond == true && runnerOnThird == true) {
    runnerOnFirst = false
    runnerOnSecond = true
    runnerOnThird = false
    if (homeAtBat == true){
      homeHits++
      homeScore += 2
      inningHits++
      inningRuns += 2
      updateScoreboard()
    } else {
      awayHits ++
      awayScore += 2
      inningHits++
      inningRuns+=2
      updateScoreboard()
    }
  } else if (runnerOnFirst == true && runnerOnSecond == true && runnerOnThird == true) {
    runnerOnFirst = false
    runnerOnSecond = true
    runnerOnThird = true
    if (homeAtBat == true){
      homeHits++
      homeScore += 2
      inningHits++
      inningRuns+=2
      updateScoreboard()
    } else {
      awayHits ++
      awayScore += 2
      inningHits++
      inningRuns+=2
      updateScoreboard()
    }
  } else {
    runnerOnSecond = true;
    if (homeAtBat == true){
      homeHits++
      inningHits++
      updateScoreboard()
    } else {
      awayHits ++
      inningHits++
      updateScoreboard()
    }
  }
}

function tripleResult() {
  if (runnerOnFirst == true && runnerOnSecond == false && runnerOnThird == false) {
    runnerOnFirst = false
    runnerOnSecond = false
    runnerOnThird = true
    if (homeAtBat == true){
      homeHits++
      homeScore++
      inningHits++
      inningRuns++
      updateScoreboard()
    } else {
      awayHits ++
      awayScore ++
      inningHits++
      inningRuns++
      updateScoreboard()
    }
  } else if (runnerOnFirst == false && runnerOnSecond == true && runnerOnThird == false) {
    runnerOnFirst = false
    runnerOnSecond = false
    runnerOnThird = true
    if (homeAtBat == true){
      homeHits++
      homeScore++
      inningHits++
      inningRuns++
      updateScoreboard()
    } else {
      awayHits ++
      awayScore ++
      inningHits++
      inningRuns++
      updateScoreboard()
    }
  } else if (runnerOnFirst == false && runnerOnSecond == false && runnerOnThird == true) {
    runnerOnFirst = false
    runnerOnSecond = false
    runnerOnThird = true
    if (homeAtBat == true){
      homeHits++
      homeScore++
      inningHits++
      inningRuns++
      updateScoreboard()
    } else {
      awayHits ++
      awayScore ++
      inningHits++
      inningRuns++
      updateScoreboard()
    }
  }  else if (runnerOnFirst == true && runnerOnSecond == true && runnerOnThird == false) {
    runnerOnFirst = false
    runnerOnSecond = false
    runnerOnThird = true
    if (homeAtBat == true){
      homeHits++
      homeScore+=2
      inningHits++
      inningRuns+=2
      updateScoreboard()
    } else {
      awayHits ++
      awayScore +=2
      inningHits++
      inningRuns+=2
      updateScoreboard()
    }
  } else if (runnerOnFirst == true && runnerOnSecond == false && runnerOnThird == true) {
    runnerOnFirst = false
    runnerOnSecond = false
    runnerOnThird = true
    if (homeAtBat == true){
      homeHits++
      homeScore += 2
      inningHits++
      inningRuns+= 2
      updateScoreboard()
    } else {
      awayHits ++
      awayScore += 2
      inningHits++
      inningRuns+=2
      updateScoreboard()
    }
  } else if (runnerOnFirst == false && runnerOnSecond == true && runnerOnThird == true) {
    runnerOnFirst = false
    runnerOnSecond = false
    runnerOnThird = true
    if (homeAtBat == true){
      homeHits++
      homeScore += 2
      inningHits++
      inningRuns+=2
      updateScoreboard()
    } else {
      awayHits ++
      awayScore += 2
      inningHits++
      inningRuns+=2
      updateScoreboard()
    }
  } else if (runnerOnFirst == true && runnerOnSecond == true && runnerOnThird == true) {
    runnerOnFirst = false
    runnerOnSecond = false
    runnerOnThird = true
    if (homeAtBat == true){
      homeHits++
      homeScore += 3
      inningHits++
      inningRuns+=3
      updateScoreboard()
    } else {
      awayHits ++
      awayScore += 3
      inningHits++
      inningRuns+=3
      updateScoreboard()
    }
  } else {
    runnerOnThird = true;
    if (homeAtBat == true){
      homeHits++
      inningHits++
      updateScoreboard()
    } else {
      awayHits ++
      inningHits++
      updateScoreboard()
    }
  }
}

function homeRunResult() {
  if (runnerOnFirst == true && runnerOnSecond == false && runnerOnThird == false) {
    runnerOnFirst = false
    runnerOnSecond = false
    runnerOnThird = false
    if (homeAtBat == true){
      homeHits++
      homeScore += 2
      inningHits++
      inningRuns+=2
      updateScoreboard()
    } else {
      awayHits ++
      awayScore += 2
      inningHits++
      inningRuns+=2
      updateScoreboard()
    }
  } else if (runnerOnFirst == false && runnerOnSecond == true && runnerOnThird == false) {
    runnerOnFirst = false
    runnerOnSecond = false
    runnerOnThird = false
    if (homeAtBat == true){
      homeHits++
      homeScore += 2
      inningHits++
      inningRuns+=2
      updateScoreboard()
    } else {
      awayHits ++
      awayScore += 2
      inningHits++
      inningRuns+=2
      updateScoreboard()
    }
  } else if (runnerOnFirst == false && runnerOnSecond == false && runnerOnThird == true) {
    runnerOnFirst = false
    runnerOnSecond = false
    runnerOnThird = false
    if (homeAtBat == true){
      homeHits++
      homeScore += 2
      inningHits++
      inningRuns+=2
      updateScoreboard()
    } else {
      awayHits ++
      awayScore += 2
      inningHits++
      inningRuns+=2
      updateScoreboard()
    }
  }  else if (runnerOnFirst == true && runnerOnSecond == true && runnerOnThird == false) {
    runnerOnFirst = false
    runnerOnSecond = false
    runnerOnThird = false
    if (homeAtBat == true){
      homeHits++
      homeScore += 3
      inningHits++
      inningRuns+=3
      updateScoreboard()
    } else {
      awayHits ++
      awayScore += 3
      inningHits++
      inningRuns+=3
      updateScoreboard()
    }
  } else if (runnerOnFirst == true && runnerOnSecond == false && runnerOnThird == true) {
    runnerOnFirst = false
    runnerOnSecond = false
    runnerOnThird = false
    if (homeAtBat == true){
      homeHits++
      homeScore += 3
      inningHits++
      inningRuns+=3
      updateScoreboard()
    } else {
      awayHits ++
      awayScore += 3
      inningHits++
      inningRuns+=3
      updateScoreboard()
    }
  } else if (runnerOnFirst == false && runnerOnSecond == true && runnerOnThird == true) {
    runnerOnFirst = false
    runnerOnSecond = false
    runnerOnThird = false
    if (homeAtBat == true){
      homeHits++
      homeScore += 3
      inningHits++
      inningRuns+=3
      updateScoreboard()
    } else {
      awayHits ++
      awayScore += 3
      inningHits++
      inningRuns+=3
      updateScoreboard()
    }
  } else if (runnerOnFirst == true && runnerOnSecond == true && runnerOnThird == true) {
    runnerOnFirst = false
    runnerOnSecond = false
    runnerOnThird = false
    if (homeAtBat == true){
      homeHits++
      homeScore += 4
      inningHits++
      inningRuns+=4
      updateScoreboard()
    } else {
      awayHits ++
      awayScore += 4
      inningHits++
      inningRuns+=4
      updateScoreboard()
    }
  } else {
    if (homeAtBat == true){
      homeHits++
      homeScore ++
      inningHits++
      inningRuns++
      updateScoreboard()
    } else {
      awayHits ++
      awayScore ++
      inningHits++
      inningRuns++
      updateScoreboard()
    }
  }
}

function outCounter() {
  outs++
  outsTotal ++
  checkWinner()
  if (outs === 3) {
    lobCalculator()
    halfInningSummary()
    homeAtBat = !homeAtBat;
    outs = 0
    runnerOnFirst = false
    runnerOnSecond = false
    runnerOnThird = false
    if (homeAtBat === true) {
      document.querySelector('#atBat').textContent = 'Home'
    } else {
      document.querySelector('#atBat').textContent = 'Away'
    }
    updateInning()
    updateScoreboard()
  }
  updateScoreboard()
}

function updateInning () {
    if (outsTotal % 6 === 0){
      inning ++
    }
}

function runnerState(){
  if (runnerOnFirst === true){
    first.style.backgroundColor = "black";
  } else {
    first.style.backgroundColor = "white";
  }
  if (runnerOnSecond === true) {
    second.style.backgroundColor = "black";
  } else {
    second.style.backgroundColor = "white";
  }
  if (runnerOnThird === true) {
    third.style.backgroundColor = "black";
  } else {
    third.style.backgroundColor = "white";
  }
//   first.textContent = runnerOnFirst
//   second.textContent = runnerOnSecond
//   third.textContent = runnerOnThird
}

function lobCalculator() {
  if (homeAtBat === true) {
    homeLOB = homeHits - homeScore
  } else {
    awayLOB = awayHits - awayScore
  }
}

function halfInningSummary() {
  if (homeAtBat === true) {
    if (inningRuns === 1) {
      if (inningHits === 1){
        console.log('******************************************************')
        console.log(`The Home Team scored ${inningRuns} run on ${inningHits} hit. `)
        console.log('******************************************************')
      } else {
        console.log('******************************************************')
        console.log(`The Home Team scored ${inningRuns} run on ${inningHits} hits. `)
        console.log('******************************************************')
      }
    } else if (inningHits === 1){
      console.log('******************************************************')
      console.log(`The Home Team scored ${inningRuns} runs on ${inningHits} hit. `)
      console.log('******************************************************')
    } else {
      console.log('******************************************************')
      console.log(`The Home Team scored ${inningRuns} runs on ${inningHits} hits. `)
      console.log('******************************************************')
    }
  } else {
    if (inningRuns === 1){
      if (inningHits === 1){
        console.log('******************************************************')
        console.log(`The Away Team scored ${inningRuns} run on ${inningHits} hit. `)
        console.log('******************************************************')
      } else {
        console.log('******************************************************')
        console.log(`The Away Team scored ${inningRuns} run on ${inningHits} hits. `)
        console.log('******************************************************')
      }
    } else if (inningHits === 1){
    console.log('******************************************************')
    console.log(`The Away Team scored ${inningRuns} runs on ${inningHits} hit. `)
    console.log('******************************************************')
  } else {
    console.log('******************************************************')
    console.log(`The Away Team scored ${inningRuns} runs on ${inningHits} hits. `)
    console.log('******************************************************')
  }}
  inningHits = 0
  inningRuns = 0
}

function checkWinner() {
   if (outsTotal === 54 && inning < 10 && homeScore < awayScore) {
    alert('Away Team Wins!')
    resetGame()
  } else if (outsTotal >= 51 && homeScore > awayScore){
    alert('Home Team Wins!')
    resetGame()
  } else if (outsTotal > 54 && outsTotal % 6 === 0 && homeScore < awayScore) {
    alert('Away Team Wins!')
    resetGame()
  }
}

function resetGame() {
  seconds.textContent = "00"
  miliseconds.textContent = "00"
  resultsList.innerHTML = ""
  secs = 00;
  milis = 00;
  stoptime = true;
  lastResult = 00;
  results = []
  resultText = ""
  homeAtBat = false
  homeScore = 0
  homeHits = 0
  awayScore = 0
  awayHits = 0
  inning = 1
  outs = 0
  outsTotal = 0
  runnerOnFirst = false
  runnerOnSecond = false
  runnerOnThird = false
  inningHits = 0
  inningRuns = 0
  awayLOB = 0
  homeLOB = 0
  document.querySelector('#atBat').textContent = 'Away'
  updateScoreboard()
}