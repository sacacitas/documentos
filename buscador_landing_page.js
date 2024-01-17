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
  
    //Crear texto predeterminado en el select ADM
    var default_select_administracion = document.createElement('option');
    default_select_administracion.value = ''; // Set the value to an empty string or a value that is not present in the array
    default_select_administracion.text = 'Selecciona una Administración';
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

    //Crear valores en el select de la Provincia
    var lista_provincias_espana = {
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
  
  
    //Crear texto predeterminado en el select provincias
    var default_select_provincias = document.createElement('option');
    default_select_provincias.value = ''; // Set the value to an empty string or a value that is not present in the array
    default_select_provincias.text = '¿Para qué provincia?';
    default_select_provincias.disabled = true;
    default_select_provincias.selected = true; // Make this option selected by default
    select_provincia.add(default_select_provincias);
  
    // Populate select provincias con la lista de provincias
    Object.entries(lista_provincias_espana).forEach(([frontend_provincia_string, backend_provincia_id]) => {
      var optionElement = document.createElement('option');
      optionElement.value = api_key_call;
      optionElement.text = user_text;
      select_provincia.add(optionElement);
    });
        
  
  });
