document.addEventListener('DOMContentLoaded', function () {
  
    //Variables de los IDs selects de la landing
    var select_administracion = document.getElementById('select-buscador-administracion')
    var select_provincia = document.getElementById('select-buscador-provincia')
    var select_oficina = document.getElementById('select-buscador-oficina')
    var select_servicio = document.getElementById('select-buscador-servicio')
  
    //Variables IDs de info secundaria
    var string_precio_buscador = document.getElementById('precio-total-buscador-landing')
  
  

//Textos predeterminados
    //Crear texto predeterminado en el select ADM
    var default_select_administracion = document.createElement('option');
    default_select_administracion.value = ''; // Set the value to an empty string or a value that is not present in the array
    default_select_administracion.text = 'Selecciona una Administración';
    default_select_administracion.disabled = true;
    default_select_administracion.selected = true; // Make this option selected by default
    select_administracion.add(default_select_administracion);

    //Crear texto predeterminado en el select provincias
    var default_select_provincias = document.createElement('option');
    default_select_provincias.value = ''; // Set the value to an empty string or a value that is not present in the array
    default_select_provincias.text = '¿Para qué provincia?';
    default_select_provincias.disabled = true;
    default_select_provincias.selected = true; // Make this option selected by default
    select_provincia.add(default_select_provincias);

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
     



  






//Tipo de buscador (si buscar con ofiicna o toda la provincia) -> Únicamente estilos y funcionalidades. 
//(La parte de crear valores está en la segunda parte)
    //Preselect del radio con oficina
    document.getElementById('radio-buscar-con-oficina').checked = true;
    document.getElementById('box-buscar-con-oficina').classList.add('selected-radio-buscador')

    //Variables de los radios
    var radio_buscador_con_oficina = document.getElementById('radio-buscar-con-oficina')
    var radio_buscador_por_provincia = document.getElementById('radio-buscar-en-provincia')

    //Que haga acciones CSS al seleccionar uno radio u otro 
    //Buscar con Oficina
    function RadioOficinaSelected() {
        if (radio_buscador_con_oficina.checked) {
            // Apply CSS conditions for 'Con Oficina' selected
            document.getElementById('box-buscar-con-oficina').classList.add('selected-radio-buscador')
            document.getElementById('box-buscar-en-provincia').classList.remove('selected-radio-buscador')
            document.getElementById('div-select-oficinas-buscador').style.display = 'flex';
        } 
    }
    //Buscar por toda la provincia
    function RadioProvinciaSelected() {
        if (radio_buscador_por_provincia.checked) {
            // Apply CSS conditions for 'Con Oficina' selected
            document.getElementById('box-buscar-en-provincia').classList.add('selected-radio-buscador')
            document.getElementById('box-buscar-con-oficina').classList.remove('selected-radio-buscador')
            document.getElementById('div-select-oficinas-buscador').style.display = 'none';
        } 
        
    }





//1. PRIMERA PARTE BUSCADOR -> Lista estática de administración y provincias     
    //Crear valores en el select de la Administración
    var values_select_administracion = [
      { value: 'EX1', text: 'Extranjería' },
      { value: 'RC1', text: 'Registro Civil' }
    ];
  
  
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
  
 
    // Populate select provincias con la lista de provincias
    Object.entries(lista_provincias_espana).forEach(([text_lista_provincias, backend_provincia_id]) => {
      var optionElement_provincia = document.createElement('option');
      optionElement_provincia.value = backend_provincia_id;
      optionElement_provincia.text = text_lista_provincias;
      select_provincia.add(optionElement_provincia);
    });
  

    //Event listeners de los radios
    radio_buscador_con_oficina.addEventListener('change', RadioOficinaSelected);
    radio_buscador_por_provincia.addEventListener('change', RadioProvinciaSelected);
       


//2. SEGUNDA PARTE BUSCADOR -> Lista dinámica de oficinas y servicios desde el backend
    //Importar JSON externos de lista oficina_servicios y sus precios por categorías
    const lista_oficina_servicios_json = 'https://documentos.sacacitas.es/categorias_servicios.json';
    const precios_citas_categorias_json = 'https://documentos.sacacitas.es/precios_citas.json';

    //Variables backend
    var apiBaseUrl = 'https://panelaws.sacacitas.es/public/oficina/';



     

    //Cuando se selecciona administración y la provincia, se descarga el JSON de oficinas y servicios
    function xxxxx() {

    }

     




//Mostrar datos en función del tipo de buscador radio seleccionado
    //Búsqueda con oficina. 
    //Hacer API call al backend para descargar el JSOn de oficinas y servicios según la provincia seleccionada y filtrar por administración
    function fetchJsonAndPopulateOficina() {
      var selectedAdministracion = select_administracion.val();
      var selectedProvincia = select_provincia.val();

      //Comprobar si Adm, provincia y bsucador por oficina está seleccionado
      if (selectedAdministracion && selectedProvincia) {
        // Build the API URL with the selected provincia
        var apiUrl = apiBaseUrl + selectedProvincia;

        //API call para descargar el JSON de oficinas y servicios del backend
        fetch(apiUrl)
          .then(response => response.json())
          .then(responseData => {
            data = responseData; // Set the data variable with the response
            // Populate oficina select con los textos importados del json
            select_oficina.html('').append(defaultOficinaOption);

            //Mostrar en el select oficinas dependiento de la administración seleccionada
            var filteredData = data.filter(item => {
              if (selectedAdministracion === 'EX1') {
                // Show names where id_oficina starts with "gobext"
                return item.id_oficina.toLowerCase().includes('gobext');
              } else if (selectedAdministracion === 'RC1') {
                // Show names where id_oficina does not start with "gobext"
                return !item.id_oficina.toLowerCase().includes('gobext');
              }
              return false;
            });

            // Populate oficina select options with external data
            filteredData.forEach(item => {
              var optionElement = $('<option></option>').prop('value', item.nombre).text(item.nombre);
              select_oficina.append(optionElement);
            });

            // Trigger change event to refresh the select (if needed)
            select_oficina.trigger('change');
          })
          .catch(error => console.error('Error fetching data:', error));
      } else {
        // Clear data and reset options for 'js-oficina' and 'js-cita-previa' selects
        data = null;
        select_oficina.html('').append(defaultOficinaOption);
        select_servicio.html('').append(defaultCitaPreviaOption);
      }
    }


    //Llamar a la función de descarga de JSON de oficinas y servicios del backend caundo se selecciona AD







    //Event listeners de los selects
    select_administracion.addEventListener('change', fetchJsonAndPopulateOficina);
    select_provincia.addEventListener('change', fetchJsonAndPopulateOficina);
    select_oficina.addEventListener('change', updateCitaPrevia);
  




  });
