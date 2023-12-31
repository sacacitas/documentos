
document.addEventListener('DOMContentLoaded', function () {

  var administracionSelect = document.getElementById('administracionSelect');
  var provinciaSelect = document.getElementById('provinciaSelect');
  var citaPreviaSelect = document.getElementById('citaPreviaSelect');
  var segundaParteBuscador = document.getElementById('segunda-parte-buscador');
  var parteFinalBuscador = document.getElementById('parte-final-buscador');

  // Hide segunda-parte-buscador and parte-final-buscador by default using jQuery
  segundaParteBuscador.style.display = 'none';
  parteFinalBuscador.style.display = 'none';
  
  // Function to check whether both selects are selected
  function checkSelection() {
    if (administracionSelect.value && provinciaSelect.value) {
      segundaParteBuscador.style.display = 'block'; // Show segunda-parte-buscador
    } else {
      segundaParteBuscador.style.display = 'none'; // Hide segunda-parte-buscador
    }
  }

  // Function to show/hide parte-final-buscador based on citaPreviaSelect
  function checkCitaPreviaSelection() {
    if (citaPreviaSelect.value) {
      parteFinalBuscador.style.display = 'block'; // Show parte-final-buscador
    } else {
      parteFinalBuscador.style.display = 'none'; // Hide parte-final-buscador
    }
  }

  // Add event listeners to the selects
  administracionSelect.addEventListener('change', checkSelection);
  provinciaSelect.addEventListener('change', checkSelection);
  citaPreviaSelect.addEventListener('change', checkCitaPreviaSelection);
});


