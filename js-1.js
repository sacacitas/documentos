
document.addEventListener('DOMContentLoaded', function () {
    // For the 'js-administracion' select
    var administracionSelect = document.getElementById('administracionSelect'); // Replace with the actual ID of your select element

    // Example values for administracion
    var administracionValues = [
      { value: 'EX1', text: 'Extranjería' },
      { value: 'RC1', text: 'Registro Civil' }
    ];

    // Add default placeholder option
    var defaultAdministracionOption = document.createElement('option');
    defaultAdministracionOption.value = ''; // Set the value to an empty string or a value that is not present in the array
    defaultAdministracionOption.text = 'Administración';
    defaultAdministracionOption.disabled = true;
    defaultAdministracionOption.selected = true; // Make this option selected by default
    administracionSelect.add(defaultAdministracionOption);

    // Populate administracion select options
    administracionValues.forEach(option => {
      var optionElement = document.createElement('option');
      optionElement.value = option.value;
      optionElement.text = option.text;
      administracionSelect.add(optionElement);
    });

    // For the 'js-provincia' select
    var provinciaSelect = document.getElementById('provinciaSelect'); // Replace with the actual ID of your select element

    // Example values for provincia
    var provinces = [
      "Alava", "Albacete", "Alicante", "Almería", "Asturias", "Avila", "Badajoz", "Barcelona", "Burgos",
      "Cáceres", "Cádiz", "Cantabria", "Castellón", "Ceuta", "CiudadReal", "Córdoba", "LaCoruña", "Cuenca",
      "Gerona", "Granada", "Guadalajara", "Guipúzcoa", "Huelva", "Huesca", "IslasBaleares", "Jaén", "León",
      "Lérida", "Lugo", "Madrid", "Málaga", "Melilla", "Murcia", "Navarra", "Orense", "Palencia", "LasPalmas",
      "Pontevedra", "LaRioja", "Salamanca", "Segovia", "Sevilla", "Soria", "Tarragona", "SantaCruzDeTenerife",
      "Teruel", "Toledo", "Valencia", "Valladolid", "Vizcaya", "Zamora", "Zaragoza"
    ];

    // Modify the province names
    var modifiedProvinces = provinces.map(province => province.replace(/([a-z])([A-Z])/g, '$1 $2'));

    // Add default placeholder option
    var defaultOption = document.createElement('option');
    defaultOption.value = ''; // Set the value to an empty string or a value that is not present in the array
    defaultOption.text = 'Provincia';
    defaultOption.disabled = true;
    defaultOption.selected = true; // Make this option selected by default
    provinciaSelect.add(defaultOption);

    // Populate provincia select options
    modifiedProvinces.forEach(province => {
      var optionElement = document.createElement('option');
      optionElement.value = province;
      optionElement.text = province;
      provinciaSelect.add(optionElement);
    });
  });



