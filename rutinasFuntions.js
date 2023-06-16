function activateRoutine(routine) {
    document.querySelectorAll("#activos td").forEach(td => {
        if (td.textContent != "Ejercicio")
            td.remove();
    })
    isRutina = true
    activeRutina = routine;
    newIndex = 1;
    const table = document.querySelector('#activos');
    const tbody = table.querySelector('tbody');
    rutinas.get(routine).forEach(ejer => {
        if (ejer != "") {

            td = tbody.appendChild(document.createElement('tr'))
                .appendChild(document.createElement('td'));
            td.textContent = ejer
            td.addEventListener('mouseover', function () {
                if (estado != "iniciado")
                    llamarMetodo(this);
            });
            td.addEventListener('click', function (target) {
                target.target.remove()
            });
        }
    });
}

function addRutinasTable() {
    fetch("https://docs.google.com/spreadsheets/u/0/d/1TTMUElbBrNyJlxKiTrZ2MP5pOTQsqtYE4Z1-nd5jjYc/export?format=csv&id=1TTMUElbBrNyJlxKiTrZ2MP5pOTQsqtYE4Z1-nd5jjYc&gid=1556160038", {
        method: 'GET',
    })
        .then(response => response.text())
        .then(text => {
            text.split("\r\n").forEach((line) => {
                data = line.split(",")
                nombre = data[0]
                ejerRutina = data.splice(1)
                rutinas.set(nombre, ejerRutina)
                b = document.querySelector("#routine-buttons")
                    .appendChild(document.createElement('button'));
                b.addEventListener("click", function (event) {
                    activateRoutine(event.target.textContent)
                });
                b.textContent = nombre
            });
        }
        )
        .catch(error => {
            console.error(error);
        });


}