//Fechas por rango
var Webflow = Webflow || [];
Webflow.push(function () {
	document.getElementById('fechas-max-min').flatpickr({
		mode: "range",
        minDate: "today",
        altInput: true,
        altFormat: "F j, Y",
        dateFormat: "Y-m-d",
  });
});


var Webflow = Webflow || [];
Webflow.push(function () {
	document.getElementById('input-fecha-nacimiento').flatpickr({
    maxDate: "today",
    altInput: true,
    altFormat: "F j, Y",
    dateFormat: "Y-m-d",
  });
});



$(document).ready(function () {

    var selectFormDocPasaporte = $('#select-pasaporte-form');
    var selectFormDocNIE = $('#select-nie-form');
    var selectFormDocDNI = $('#select-dni-form');


    selectFormDocPasaporte.addClass('boton-documento-selected');
 
    // Click event for botonLinkUnicoBusqueda
    selectFormDocPasaporte.click(function () {
        selectFormDocPasaporte.addClass('boton-documento-selected');
        selectFormDocNIE.removeClass('boton-documento-selected');
        selectFormDocDNI.removeClass('boton-documento-selected');
    });                    
    
    // Click event for botonLinkUnicoBusqueda
    selectFormDocNIE.click(function () {
        selectFormDocPasaporte.removeClass('boton-documento-selected');
        selectFormDocNIE.addClass('boton-documento-selected');
        selectFormDocDNI.removeClass('boton-documento-selected');
    });                    
    
    // Click event for botonLinkUnicoBusqueda
    selectFormDocDNI.click(function () {
        selectFormDocPasaporte.removeClass('boton-documento-selected');
        selectFormDocNIE.removeClass('boton-documento-selected');
        selectFormDocDNI.addClass('boton-documento-selected');
    });                    
    


});

// For the 'js-provincia' select
var PaisesSelect = document.getElementById('input-lista-paises'); // Replace with the actual ID of your select element


var map_paises = {
    "Alava": "Alava",
    "Albacete": "Albacete",
    "Alicante": "Alicante",
    "Almería": "Almería",
    "Asturias": "Asturias",
    "Avila": "Avila",
    "Badajoz": "Badajoz",
    "Barcelona": "Barcelona",
    "Burgos": "Burgos",
    "Cáceres": "Cáceres",
    "Cádiz": "Cádiz",
    "Cantabria": "Cantabria",
    "Castellón": "Castellón",
    "Ceuta": "Ceuta",
    "Ciudad Real": "CiudadReal",
    "Córdoba": "Córdoba",
    "La Coruña": "LaCoruña",
    "Cuenca": "Cuenca",
    "Gerona": "Gerona",
    "Granada": "Granada",
    "Guadalajara": "Guadalajara",
    "Guipúzcoa": "Guipúzcoa",
    "Huelva": "Huelva",
    "Huesca": "Huesca",
    "Islas Baleares": "IslasBaleares",
    "Jaén": "Jaén",
    "León": "León",
    "Lérida": "Lérida",
    "Lugo": "Lugo",
    "Madrid": "Madrid",
    "Málaga": "Málaga",
    "Melilla": "Melilla",
    "Murcia": "Murcia",
    "Navarra": "Navarra",
    "Orense": "Orense",
    "Palencia": "Palencia",
    "Las Palmas": "LasPalmas",
    "Pontevedra": "Pontevedra",
    "La Rioja": "LaRioja",
    "Salamanca": "Salamanca",
    "Segovia": "Segovia",
    "Sevilla": "Sevilla",
    "Soria": "Soria",
    "Tarragona": "Tarragona",
    "Santa Cruz De Tenerife": "SantaCruzDeTenerife",
    "Teruel": "Teruel",
    "Toledo": "Toledo",
    "Valencia": "Valencia",
    "Valladolid": "Valladolid",
    "Vizcaya": "Vizcaya",
    "Zamora": "Zamora",
    "Zaragoza": "Zaragoza"
  }


  // Add default placeholder option
  var defaultOption = document.createElement('option');
  defaultOption.value = ''; // Set the value to an empty string or a value that is not present in the array
  defaultOption.text = 'Indica tu nacionalidad';
  defaultOption.disabled = true;
  defaultOption.selected = true; // Make this option selected by default
  PaisesSelect.add(defaultOption);

  // Populate provincia select options
  Object.entries(map_paises).forEach(([user_text, api_key_call]) => {
    var optionElement = document.createElement('option');
    optionElement.value = api_key_call;
    optionElement.text = user_text;
    PaisesSelect.add(optionElement);
  });
