document.addEventListener('DOMContentLoaded', function () {
  
    //Variables de los IDs selects de la landing
    var select_administracion = document.getElementById('select-buscador-administracion')
    var select_provincia = document.getElementById('select-buscador-provincia')
    var select_oficina = document.getElementById('select-buscador-oficina')
    var select_servicio = document.getElementById('select-buscador-servicio')
  
    //Variables IDs de info secundaria
    var string_precio_buscador = document.getElementById('precio-total-buscador-landing')
  
  


//Tipo de buscador
    //Preselect del radio con oficina
    document.getElementById('radio-buscar-con-oficina').checked = true;
    document.getElementById('box-buscar-con-oficina').classList.add('selected-radio-buscador')

    //Variables de los radios
    var radio_buscador_con_oficina = document.getElementById('radio-buscar-con-oficina')
    var radio_buscador_por_provincia = document.getElementById('radio-buscar-en-provincia')

    
    //Cambios IF radio búsqueda con oficina
    function RadioOficinaSelected() {
        if (radio_buscador_con_oficina.checked) {
            // Apply CSS conditions for 'Con Oficina' selected
            getElementById('box-buscar-con-oficina').classList.add('selected-radio-buscador')
        } else {
            // Apply CSS conditions for 'Other Option' selected
            getElementById('box-buscar-en-provincia').classList.remove('selected-radio-buscador')
        }
    }
    //Cambios IF radio búsqueda por provincia



    //Event listeners de los radios
    radio_buscador_con_oficina.addEventListener('change', RadioOficinaSelected);




    //Filtrar con oficina
    


    //Buscar en toda la provincia



//Primera parte del buscador -> Lista estática de administración y provincias     
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
      var optionElement_administracion = document.createElement('option');
      optionElement_administracion.value = option.value;
      optionElement_administracion.text = option.text;
      select_administracion.add(optionElement_administracion);
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
    Object.entries(lista_provincias_espana).forEach(([text_lista_provincias, backend_provincia_id]) => {
      var optionElement_provincia = document.createElement('option');
      optionElement_provincia.value = backend_provincia_id;
      optionElement_provincia.text = text_lista_provincias;
      select_provincia.add(optionElement_provincia);
    });
  
//Segunda parte del buscador -> Lista dinámica de oficinas y servicios desde el backend
    //JSON externos de lista oficina_servicios y sus categorías
    const lista_oficina_servicios_json = 'https://documentos.sacacitas.es/categorias_servicios.json';
    const precios_citas_categorias_json = 'https://documentos.sacacitas.es/precios_citas.json';

    //Crear texto predeterminado en el select oficinas
    var default_select_oficina = document.createElement('option');
    default_select_oficina.value = ''; // Set the value to an empty string or a value that is not present in the array
    default_select_oficina.text = 'Escoge una oficina';
    default_select_oficina.disabled = true;
    default_select_oficina.selected = true; // Make this option selected by default
    select_oficina.add(default_select_oficina);
      







    //Crear texto predeterminado en el select citas previas
    var default_select_servicio = document.createElement('option');
    default_select_servicio.value = ''; // Set the value to an empty string or a value that is not present in the array
    default_select_servicio.text = 'Escoge tus citas previas';
    default_select_servicio.disabled = true;
    default_select_servicio.selected = true; // Make this option selected by default
    select_servicio.add(default_select_servicio);
      

  
  });
