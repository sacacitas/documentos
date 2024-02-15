document.addEventListener('DOMContentLoaded', function () {
  // For the 'js-administracion' select
  var administracionSelect = document.getElementById('administracionSelect'); // Replace with the actual ID of your select element

  // Example values for administracion
  var administracionValues = [
    { value: 'EX1', text: 'Extranjería' },
    { value: 'RC1', text: 'Registro Civil' },
    { value: 'DGT1', text: 'DGT' }
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

  var map_provincias = {
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
  defaultOption.text = 'Provincia';
  defaultOption.disabled = true;
  defaultOption.selected = true; // Make this option selected by default
  provinciaSelect.add(defaultOption);

  // Populate provincia select options
  Object.entries(map_provincias).forEach(([user_text, api_key_call]) => {
    var optionElement = document.createElement('option');
    optionElement.value = api_key_call;
    optionElement.text = user_text;
    provinciaSelect.add(optionElement);
  });






//Cookie ID_lead
// Function to get URL parameter by name
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Check if lead ID parameter exists in URL
var leadIdFromUrl = getUrlParameter('gclid');

// If lead ID is present in URL, create a cookie
if (leadIdFromUrl !== '') {
    document.cookie = "lead_id_cookie=" + leadIdFromUrl + "; path=/";
    console.log("Lead ID cookie created with value:", leadIdFromUrl);
}

// Function to get the value of the lead ID cookie
function getLeadIdCookie() {
    var name = "lead_id_cookie=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(';');
    for(var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i].trim();
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return "";
}

// Get the value of the lead ID cookie and store it in a variable
var leadIdFromCookie = getLeadIdCookie();
console.log("El ID de la cookie es:", leadIdFromCookie);








  
});
