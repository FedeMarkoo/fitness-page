const ejercicios = []

fetch("https://docs.google.com/spreadsheets/u/0/d/1TTMUElbBrNyJlxKiTrZ2MP5pOTQsqtYE4Z1-nd5jjYc/export?format=csv&id=1TTMUElbBrNyJlxKiTrZ2MP5pOTQsqtYE4Z1-nd5jjYc&gid=0", {
  method: 'GET',
})
  .then(response => response.text())
  .then(text => {
    csvToJson(text).forEach((ejercicio) => {
      ejercicios.push(ejercicio)
      addEjercicioTable(ejercicio)
    });
    const table = document.querySelector('#elegir');
    const tbody = table.querySelector('tbody');
    Array.from(tbody.querySelectorAll('tr'))
      .sort((a, b) => {
        if(a.childNodes[1].innerText == "Ejercicio") return 1;
        if(b.childNodes[1].innerText == "Ejercicio") return -1;
        return a.childNodes[1].innerText.localeCompare(b.childNodes[1].innerText)
      })
      .forEach(tr => {
        tbody.appendChild(tr)
      })
  }
  )
  .catch(error => {
    console.error(error);
  });
