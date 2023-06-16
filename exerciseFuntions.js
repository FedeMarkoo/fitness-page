index = 1;
function addEjercicioTable(ejercicio) {
  td = document.querySelector("#elegir tbody")
    .appendChild(document.createElement('tr'));
  tipo = 'td'
  cb = td.appendChild(document.createElement(tipo)).appendChild(document.createElement('input'))
  cb.name = "exercises"
  cb.type = "button"
  cb.value = "Agregar"
  td.appendChild(document.createElement(tipo)).textContent = ejercicio.nombre
  td.appendChild(document.createElement(tipo)).textContent = ejercicio.zonaTrabajo
  td.appendChild(document.createElement(tipo)).textContent = ejercicio.tipo

  td.addEventListener('mouseover', function () {
    if (estado != "iniciado")
      llamarMetodo(this);
  });

  cb.addEventListener('click', function (target) {
    const table = document.querySelector('#activos');
    const tbody = table.querySelector('tbody');
    td = document.createElement('td');
    tbody.appendChild(document.createElement('tr'))
      .appendChild(td).textContent = target.target.parentNode.parentNode.children[1].textContent;
    td.addEventListener('click', function (target) {
      target.target.parentNode.remove()
    });
    td.addEventListener('mouseover', function () {
      if (estado != "iniciado")
        llamarMetodo(this);
    });
  });
}

function addExercises() {
  var exercisesList;
  exercisesList = document.querySelectorAll("#activos td")
  exercisesList.forEach(function (exercise) {
    var row = $("#elegir tr td").filter((n, td) => { return td.innerText == exercise.textContent })[0].parentNode;
    var name = row.cells[1].textContent;
    var duration = document.getElementById("ejerTime").value;
    var rest = document.getElementById("restTimeIni").value;
    exercises.push({ name: name, duration: duration, rest: rest });
  });
  rounds = rondas = parseInt(document.getElementById("rounds").value) * exercises.length;
}

function resetTimer() {
  rounds = 0;
  restTime = 10;
  intervalTime = 30;
  exercises = [];
  document.getElementById("workTime").innerText = intervalTime;
  document.getElementById("restTime").innerText = restTime;
  clearInterval(intervalTimer);
  clearInterval(restTimerInterval);
  updateProgressBars();
}

function restTimer() {
  isDescanso = false
  restTime = exercises[(rondas - rounds) % exercises.length].rest;
  updateExerciseExplanation();
  document.querySelector("#workTime-bar").style['display'] = 'none'
  document.querySelector("#rest-bar").style['display'] = 'flow-root'
  document.getElementById("actual").innerText = "Preparate: " + exercises[(rondas - rounds) % exercises.length].name;
  speak("preparate");
  restTimerInterval = setInterval(function () {
    if (estado == "pausa") return;
    document.getElementById("restTime").innerText = restTime;
    if (restTime === exercises[(rondas - rounds) % exercises.length].rest - 1) {
      speak("Ronda " + rounds);
      speak(exercises[(rondas - rounds) % exercises.length].name);
    }
    if (restTime <= 5 && restTime > 0) {
      speak(restTime);
    }
    if (restTime < 2) {
      clearInterval(restTimerInterval);
      if (rounds > 0) {
        startTimer();
      } else {
        alert("¡Workout completo!");
      }
    }
    restTime--;
  }, 1000);
}

function startTimer() {
  document.querySelector("#rest-bar").style['display'] = 'none'
  document.querySelector("#workTime-bar").style['display'] = 'flow-root'
  intervalTime = exercises[(rondas - rounds) % exercises.length].duration;
  document.getElementById("actual").innerText = "Ejercicio: " + exercises[(rondas - rounds) % exercises.length].name;

  intervalTimer = setInterval(function () {
    if (estado == "pausa") return;
    document.getElementById("workTime").innerText = intervalTime;
    if (intervalTime == exercises[(rondas - rounds) % exercises.length].duration) {
      speak("¡Arranca!");
    }
    if (intervalTime == parseInt(exercises[(rondas - rounds) % exercises.length].duration / 2)) {
      speak("mitad del ejercicio");
    }
    if (intervalTime <= 5 && intervalTime > 0) {
      speak(intervalTime);
    }
    if (intervalTime === 0) {
      rounds--;
      if (rounds == 0)
        speak("TERMINADO!")
      else {
        clearInterval(intervalTimer);
        if (!!((rondas - rounds) % exercises.length)) {
          restTimer();
        } else {
          descansoTimer();
        }
      }
    }
    intervalTime--;
  }, 1000);
}
isDescanso = false;
descansoTimeIni = 60;
function descansoTimer() {
  descansoTime = descansoTimeIni;
  isDescanso = true
  descansoGifDescript();

  document.querySelector("#workTime-bar").style['display'] = 'none'
  document.querySelector("#rest-bar").style['display'] = 'flow-root'
  document.getElementById("actual").innerText = "Descanso";


  speak("Descanso de un minuto")
  descansoInterval = setInterval(function () {
    if (estado == "pausa") return;
    document.getElementById("restTime").innerText = descansoTime;
    if (descansoTime == parseInt(descansoTimeIni / 2))
      speak("Mitad del descanso")
    if (descansoTime-- < 1) {
      clearInterval(descansoInterval)
      restTimer();
    }
  }, 1000);
}