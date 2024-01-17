document.addEventListener('DOMContentLoaded', function () {
  
  //Variables de los IDs selects de la landing
  var select_administracion = document.getElementById('select-buscador-administracion')
  var select_provincia = document.getElementById('select-buscador-provincia')
  var select_oficina = document.getElementById('select-buscador-oficina')
  var select_servicio = document.getElementById('select-buscador-servicio')

  //Variables IDs de info secundaria
  var string_precio_buscador = document.getElementById('precio-total-buscador-landing')


  //Crear valores en el select de la Administración
  var values_select_administracion = [
    { value: 'EX1', text: 'Extranjería' },
    { value: 'RC1', text: 'Registro Civil' }
  ];

  //Crear texto predeterminado en el select
  var default_select_administracion = document.createElement('option');
  default_select_administracion.value = ''; // Set the value to an empty string or a value that is not present in the array
  default_select_administracion.text = 'Administración';
  default_select_administracion.disabled = true;
  default_select_administracion.selected = true; // Make this option selected by default
  select_administracion.add(default_select_administracion);

  // Populate select administración
  values_select_administracion.forEach(option => {
    var optionElement = document.createElement('option');
    optionElement.value = option.value;
    optionElement.text = option.text;
    select_administracion.add(optionElement);
  });
  

  
  )};
