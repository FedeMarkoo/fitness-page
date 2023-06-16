var exercises = [];
var restTime = 10;
var intervalTime = 30;
var rounds = 1;
var rondas = 1;
var intervalTimer;
var restTimerInterval;
var duration = null;
var estado = "stop"
var isRutina = false;
var activeRutina = ""


function speak(text) {
  var speechSynthesisUtterance = new SpeechSynthesisUtterance(text);
  speechSynthesisUtterance.rate = 1.4
  speechSynthesis.speak(speechSynthesisUtterance);
}


function updateProgressBars() {
  if (exercises[(rondas - rounds) % exercises.length]) {
    var roundProgressBar = document.getElementById("round-progress");
    var intervalProgressBar = document.getElementById("interval-progress");
    var restProgressBar = document.getElementById("rest-progress");
    document.getElementById("roundNum").innerText = rounds;

    if (isDescanso) {
      roundProgressBar.style.width = ((rounds) / rondas * 100) + "%";
      intervalProgressBar.style.width = (intervalTime / exercises[(rondas - rounds) % exercises.length].duration * 100) + "%";
      restProgressBar.style.width = (descansoTime / descansoTimeIni * 100) + "%";
    } else {
      roundProgressBar.style.width = ((rounds) / rondas * 100) + "%";
      intervalProgressBar.style.width = (intervalTime / exercises[(rondas - rounds) % exercises.length].duration * 100) + "%";
      restProgressBar.style.width = (restTime / exercises[(rondas - rounds) % exercises.length].rest * 100) + "%";
    }
  }
}



document.addEventListener('DOMContentLoaded', () => {
  addRutinasTable()

  var startButton = document.getElementById("start");
  var pauseButton = document.getElementById("pause");
  var resetButton = document.getElementById("reset");

  startButton.addEventListener("click", function () {
    if (!document.querySelectorAll("#activos tr").length || estado == "iniciado")
      return;
    if (estado == "stop") {
      addExercises();
    }
    if (estado != "pausa") {
      document.querySelector("#exercise-list").style['display'] = 'none'
      restTimer();
    }
    else {
      clearInterval(restTimerInterval);
      clearInterval(intervalTimer);
      restTimer();
    }

    document.querySelector("#controls").style['position'] = 'inherit'
    document.querySelector("#controls").style['width'] = '100%'
    document.querySelector("#exercise-detail").style['display'] = 'contents'
    estado = "iniciado"
  });

  pauseButton.addEventListener("click", function () {
    estado = "pausa"
  });

  resetButton.addEventListener("click", function () {
    estado = "stop"
    document.querySelector("#exercise-list").style['display'] = 'block'

    document.querySelector("#controls").style['position'] = 'fixed'
    document.querySelector("#controls").style['width'] = '30%'
    resetTimer();
  });

  setInterval(function () {
    updateProgressBars();
  }, 100);
}, false);

function csvToJson(csvData) {
  const lines = csvData.split('\n');
  const result = [];

  const headers = lines[0].split(',');
  for (let i = 1; i < lines.length; i++) {
    const obj = {};
    const currentLine = lines[i].split(',');

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j].trim()] = currentLine[j].trim();
    }

    result.push(obj);
  }

  return result;
}