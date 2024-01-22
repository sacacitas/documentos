$(document).ready(function () {
    // Variables de los IDs selects de la landing
    var select_administracion = $('#select-buscador-administracion');
    var select_provincia = $('#select-buscador-provincia');
    var select_oficina = $('#select-buscador-oficina');
    var select_servicio = $('#select-buscador-servicio');
  
    // Variables IDs de info secundaria
    var string_precio_buscador = $('#precio-total-buscador-landing');
  
    // Textos predeterminados en los selects
    // Crear texto predeterminado en ADM
    var default_select_administracion = $('<option>', {
        value: '',
        text: 'Selecciona una Administración',
        disabled: true,
        selected: true
    });
    select_administracion.append(default_select_administracion);
  
    // Crear texto predeterminado en provincias
    var default_select_provincias = $('<option>', {
        value: '',
        text: '¿Para qué provincia?',
        disabled: true,
        selected: true
    });
    select_provincia.append(default_select_provincias);
  
    // Crear texto predeterminado en oficinas
    var default_select_oficina = $('<option>', {
        value: '',
        text: 'Escoge una oficina',
        disabled: true,
        selected: true
    });
    select_oficina.append(default_select_oficina);
  
    // Crear texto predeterminado en citas previas
    var default_select_servicio = $('<option>', {
        value: '',
        text: 'Escoge tus citas previas',
        disabled: true,
        selected: true
    });
    select_servicio.append(default_select_servicio);
  




// Tipo de buscador (si buscar con oficina o toda la provincia) -> Únicamente estilos y funcionalidades.
    // (La parte de crear valores está en la segunda parte)
  
    // Preselect del radio con oficina
    $('#radio-buscar-con-oficina').prop('checked', true);
    $('#box-buscar-con-oficina').addClass('selected-radio-buscador');
  
    // Variables de los radios
    var radio_buscador_con_oficina = $('#radio-buscar-con-oficina');
    var radio_buscador_por_provincia = $('#radio-buscar-en-provincia');
  
    // Que haga acciones CSS al seleccionar uno radio u otro
    // Buscar con Oficina
    function RadioOficinaSelected() {
        if (radio_buscador_con_oficina.prop('checked')) {
            // Apply CSS conditions for 'Con Oficina' selected
            $('#box-buscar-con-oficina').addClass('selected-radio-buscador');
            $('#box-buscar-en-provincia').removeClass('selected-radio-buscador');
            $('#div-select-oficinas-buscador').css('display', 'flex');
        }
    }
    // Buscar por toda la provincia
    function RadioProvinciaSelected() {
        if (radio_buscador_por_provincia.prop('checked')) {
            // Apply CSS conditions for 'Con Oficina' selected
            $('#box-buscar-en-provincia').addClass('selected-radio-buscador');
            $('#box-buscar-con-oficina').removeClass('selected-radio-buscador');
            $('#div-select-oficinas-buscador').css('display', 'none');
        }
    }
  
    // Event listeners de los radios
    radio_buscador_con_oficina.on('change', RadioOficinaSelected);
    radio_buscador_por_provincia.on('change', RadioProvinciaSelected);
  






// 1. PRIMERA PARTE BUSCADOR -> Lista estática de administración y provincias
    // Crear valores en el select de la Administración
    var values_select_administracion = [
        { value: 'EX1', text: 'Extranjería' },
        { value: 'RC1', text: 'Registro Civil' }
    ];
  
    // Populate select administración
    values_select_administracion.forEach(option => {
        var optionElement_administracion = $('<option></option>').prop('value', option.value).text(option.text);
        select_administracion.append(optionElement_administracion);
    });
  
    // Crear valores en el select de la Provincia
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
    };
  
    // Populate select provincias con la lista de provincias
    $.each(lista_provincias_espana, function (text_lista_provincias, backend_provincia_id) {
        var optionElement_provincia = $('<option></option>').prop('value', backend_provincia_id).text(text_lista_provincias);
        select_provincia.append(optionElement_provincia);
    });
  




  
// 2. SEGUNDA PARTE BUSCADOR -> Lista dinámica de oficinas y servicios desde el backend
    // Importar JSON externos de lista oficina_servicios y sus precios por categorías
    const lista_oficina_servicios_json = 'https://documentos.sacacitas.es/categorias_servicios.json';
    const precios_citas_categorias_json = 'https://documentos.sacacitas.es/precios_citas.json';
  
    // Variables backend
    var apiBaseUrl = 'https://panelaws.sacacitas.es/public/oficina/';
  
  
    //Resetear valor cita previa cuando se cambie oficina, provincia o administracióna
    //select_oficina.on('change', updateCitaPrevia);
    //select_provincia.on('change', updateCitaPrevia);
    //select_administracion.on('change', updateCitaPrevia);
   


    //Crear valores y populate select oficina
    // Hacer API call al backend para descargar el JSON de oficinas y servicios según la provincia seleccionada y filtrar por administración
    function fetchJsonAndPopulateOficina() {
        var selectedAdministracion = select_administracion.val();
        var selectedProvincia = select_provincia.val();
        console.log(selectedAdministracion);
        console.log(selectedProvincia);

        // Show loading message in select_oficina
        select_oficina.html('').append($('<option>', {
            value: '',
            text: 'Cargando...',
            disabled: true,
            selected: true
        }));

        
        console.log(selectedAdministracion);
        console.log(selectedProvincia);
        // Comprobar si Adm, provincia y bsucador por oficina está seleccionado
        if (selectedAdministracion && selectedProvincia) {
            console.log(selectedAdministracion);
            console.log(selectedProvincia);
            // Build the API URL with the selected provincia
            var apiUrl = apiBaseUrl + selectedProvincia;
  
            // API call para descargar el JSON de oficinas y servicios del backend
            $.ajax({
                url: apiUrl,
                method: 'GET',
                dataType: 'json',
                success: function (responseData) {
                    data = responseData; // Set the data variable with the response
                    // Populate oficina select con los textos importados del json
                    select_oficina.html('').append(default_select_oficina);
  
                    // Mostrar en el select oficinas dependiendo de la administración seleccionada
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
                    $.each(filteredData, function (index, item) {
                        var optionElement = $('<option></option>').prop('value', item.nombre).text(item.nombre);
                        select_oficina.append(optionElement);
                    });
  
                    // Set default value and trigger change event
                    select_oficina.val(default_select_oficina.val()).trigger('change');

                    
                },
                error: function (error) {
                    console.error('Error fetching data:', error);
                }
            });
        } else {
            // Clear data and reset options for 'js-oficina' and 'js-cita-previa' selects
            data = null;
            //select_oficina.html('').append(default_select_oficina);
            //select_servicio.html('').append(default_select_servicio);
        }
    }
  



    //Crear valores y populate select servicio
    function updateCitaPrevia() {
        var selectedOficina = select_oficina.val();
        var selectedAdministracion = select_administracion.val();
        var selectedProvincia = select_provincia.val();
    
        // Clear existing options in select_servicio
        //select_servicio.empty().append(default_select_servicio);
    
        // Check if oficina is selected
        if (selectedOficina && selectedAdministracion && selectedProvincia && radio_buscador_con_oficina.prop('checked')) {
      
            // Find the selected oficina in the external data
            var selectedOficinaData = data.find(item => item.nombre === selectedOficina);
      
            // Check if data is found and servicios is an array 
            if (selectedOficinaData && Array.isArray(selectedOficinaData.servicios)) {
                // Add a default option if needed
                // var defaultOption = $('<option>', {
                //     value: '',
                //     text: 'Select a service',
                //     disabled: true,
                //     selected: true
                // });
                // select_servicio.append(defaultOption);
    
                // Populate citaPrevia select options with services from selected oficina
                selectedOficinaData.servicios.forEach(servicio => {
                    // Check if servicio has the required properties
                    if (servicio && servicio.id_servicio && servicio.nombre) {
                        var optionElement = $('<option></option>').prop('value', servicio.nombre).text(servicio.nombre);
                        select_servicio.append(optionElement);
                    }
                });
      
                // Trigger change event to refresh the select (if needed)
                select_servicio.trigger('change');
            }
        } 
    }
    
  

    // Reset values and update cita previa function
    function resetValuesAndUpdateCitaPrevia() {
        // Reset the values of the other three selects
        select_oficina.val('').empty().append(default_select_oficina);
        select_servicio.val('').empty().append(default_select_servicio);
        updateCitaPrevia();
    }

    // Event listener for the 'radio_buscador_con_oficina' element
    radio_buscador_con_oficina.on('change', function () {
        if (radio_buscador_con_oficina.prop('checked')) {
            // Reset the values of the three selects when 'Con Oficina' is selected
            resetValuesAndUpdateCitaPrevia();
            // Fetch and populate oficinas
            fetchJsonAndPopulateOficina();
        }
    });

    // Event listener for the 'radio_buscador_por_provincia' element
    radio_buscador_por_provincia.on('change', function () {
        if (radio_buscador_por_provincia.prop('checked')) {
            // Reset the values of the three selects when 'Por Provincia' is selected
            resetValuesAndUpdateCitaPrevia();
        }
    });

    // Common event listener for both select_administracion and select_provincia
    var commonChangeListener = function () {
        // Reset the values of the other three selects
        resetValuesAndUpdateCitaPrevia();
    };

    // Attach the common change listener to select_administracion and select_provincia
    select_administracion.on('change', commonChangeListener);
    select_provincia.on('change', commonChangeListener);

    // Event listener for the 'change' event on select_oficina
    select_oficina.on('change', function () {
        // Update cita previa when oficina changes
        updateCitaPrevia();
    });

    // Event listener for the 'change' event on select_servicio
    select_servicio.on('change', function () {
        // Your existing implementation for updating cita previa based on selected servicio
        // ...
    });


    











//3.Sección de citas previas seleccionadas bloque derecho
    var checkoutContainer = $('#bloque-items-citas');
    var maxCheckoutItems = 15; //Items máximos que se pueden añadir
    //Event listener del select de servicios
    select_servicio.on('change', function () {
        // Get the selected values
        var selectedProvincia = select_provincia.val();
        var selectedOficina = select_oficina.val();
        var selectedServicio = select_servicio.val();

        // Check if all values are selected
        if (selectedProvincia && selectedOficina && selectedServicio) {
            // Create a new div with a personalized HTML structure for the checkout item
            var checkoutItem = $('<div class="checkout-item">' +
                '<div class="column wide-column">' +
                '   <span class="item-text">' + selectedProvincia + ' | ' + selectedOficina + '</span>' +
                '   <span class="item-text">' + selectedServicio + '</span>' +
                '</div>' +
                '<div class="column narrow-column">' +
                '   <button class="delete-item"><img src="https://uploads-ssl.webflow.com/652f00909568ce58c099d55f/652f00919568ce58c099d689_Exit.svg" alt="Delete" style="width: 20px; height: 20px; margin-left: auto;"></button>' +
                '</div>' +
                '</div>');

            //Box de la cita seleccionada
            checkoutItem.css({
                //'padding': '5px',
                'border': '1px solid #99a4af',
                'border-radius': '5px',
                'background-color': '#fff',
                'padding': '10px 0px 10px 0px',
                'margin': '5px 0px 5px 0px',
                'display': 'flex',
                //'justify-content': 'space-between',
                'align-items': 'center',
                'box-shadow': '0px 3px 5px 0px rgba(0, 0, 0, .2)'
            });

            //Items dentro del box de la cita seleccionada
            checkoutItem.find('.item-text').css({
                'font-size': '16px',
                'color': '#333'
            });

            //Columna izquierda del grid de la cita seleccionada
            checkoutItem.find('.wide-column').css({
                'flex': '85%', // Adjust the percentage as needed
                'padding': '0px 5px 0px 5px' 
            });

            //Columna derecha del grid de la cita seleccionada
            checkoutItem.find('.narrow-column').css({
                'flex': '15%',
                'margin': '0px 5px 0px 5px',
                'padding': '0'
            });


            //Botón de borrar cita seleccionada
            checkoutItem.find('.delete-item').css({
                'background-color': '#fff',
                'border': 'none',
                'cursor': 'pointer'
            });

            //Función para borrar cita seleccionada
            var deleteButton = checkoutItem.find('.delete-item');
            deleteButton.on('click', function () {
                // Remove the item when the delete button is clicked
                checkoutItem.remove();
                if (checkoutContainer.children('.checkout-item').length < maxCheckoutItems) {
                    select_servicio.prop('disabled', false);
                }                
            });

            // Append the checkout item to the checkout container
            checkoutContainer.append(checkoutItem);

            // Check if the maximum number of items is reached and disable the select if needed
            if (checkoutContainer.children('.checkout-item').length >= maxCheckoutItems) {
                select_servicio.prop('disabled', true);
            }
        }

        //Resetear select de servicios cuando se añade una cita
        select_servicio.val(null).trigger('change');
    });




  });
  
