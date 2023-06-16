var img
var buscando = "nada"
var users = ["candymagdotcom", "8fit", "fitintennis", "100dod", "CROSSFITBORAN", "h0nestyb"]
function obtenerGif(nombreEjercicio) {
  if (!!ejercicios.findLast((e) => e.nombre == nombreEjercicio).gif) {
    addGif(ejercicios.findLast((e) => e.nombre == nombreEjercicio).gif)
    return;
  }

  const apiKey = 'yvyt1ie3dMcJOJzDj1Lp7okLFHIUXYfs';
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=exercise+${ejercicios.findLast((e) => e.nombre == nombreEjercicio).nombreIngles.replace(" ", "+")}&limit=200&offset=0&rating=g&lang=en`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.data) {
        temp = null;
        users.forEach((d) => {
          if (!temp) {
            find = data.data.filter((g) => { return g.username == d })
            if (find.length > 0)
              temp = find[0]
          }
        })

        if (!temp) {
          temp = data.data[0]
          console.log(nombreEjercicio + " - " + ejercicios.findLast((e) => e.nombre == nombreEjercicio).nombreIngles + " - " + temp.username)
        }
        const gifUrl = temp.images.downsized.url;
        // Mostrar el gif en una etiqueta HTML, por ejemplo:
        // <iframe src="https://giphy.com/embed/d3mlADRlF7SMFQRy" width="480" height="319" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
        addGif(gifUrl)
      } else {
        console.log('Gif no encontrado');
      }
    })
    .catch(error => {
      console.log('Error al obtener el gif:', error);
    });
}


function addGif(gifUrl) {
  if (img)
    img.remove()
  img = document.createElement('img');
  if (estado == "iniciado") {
  }
  else {
    img.style["max-height"]="420px"
    img.style["max-width"]="573px"
  }
  img.src = gifUrl;
  document.querySelector("#gifs").appendChild(img);
}

function llamarMetodo(fila) {
  if (!!fila.cells)
    nombreEjercicio = fila.cells[1].innerText; // Ajusta el índice según la columna en la que se encuentre el nombre del ejercicio
  else
    nombreEjercicio = fila.innerText; // Ajusta el índice según la columna en la que se encuentre el nombre del ejercicio
  if (buscando == nombreEjercicio || nombreEjercicio == 'Ejercicio') return;
  buscando = nombreEjercicio;
  var explicacion = ejercicios.findLast((e) => e.nombre == nombreEjercicio).descripcion
  document.getElementById('description').innerText = explicacion;
  obtenerGif(nombreEjercicio)
  document.getElementById("actual").innerText = "Ejercicio: " + nombreEjercicio;
}

function updateExerciseExplanation() {
  var exerciseExplanation = document.getElementById('exercise-description');

  var explanationText = ejercicios.findLast((e) => e.nombre == exercises[(rondas - rounds) % exercises.length].name).descripcion + "\n\n";

  exerciseExplanation.innerText = explanationText;
  obtenerGif(exercises[(rondas - rounds) % exercises.length].name)
}

function descansoGifDescript(){
  var exerciseExplanation = document.getElementById('description');
  
  var explanationText = ejercicios.findLast((e) => e.nombre == "Descanso 1 minuto").descripcion;

  exerciseExplanation.innerText = explanationText;
  obtenerGif("Descanso 1 minuto");
}