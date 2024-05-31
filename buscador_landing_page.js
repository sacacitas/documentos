// ['id_oficina','id_servicio'] = entry
var SERVICIOS = {};

var CATEGORIAS = {};
var PRECIOS = {}
var MAX_CHECKOUT_ITEMS = 1; //Items máximos que se pueden añadir

var INPUT_JSON = {}

$(document).ready(function () {

    $.getJSON('https://documentos.sacacitas.es/categorias_servicios.json', (data) => CATEGORIAS = data);
    $.getJSON('https://documentos.sacacitas.es/precios_citas.json', (data) => PRECIOS = data);



    // Variables de los IDs selects de la landing
    var select_administracion = $('#select-buscador-administracion');
    var select_provincia = $('#select-buscador-provincia');
    var select_oficina = $('#select-buscador-oficina');
    var select_servicio = $('#select-buscador-servicio');
    var numero_citas_contador = $('numero-citas-seleccionadas-buscador');



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


    // Disable Multiofi until its implemented in backend
    ///////////
    radio_buscador_por_provincia.prop('disabled', true);
    $('#box-buscar-en-provincia').hide()
    ///////////

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



    //Tratamiento GCLID en la URL   
    // Obtener todos los parámetros de la URL
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    // Función para establecer cookies con atributos adicionales y log para debugging
    function setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        var secure = location.protocol === 'https:' ? '; Secure' : '';
        var domain = "; domain=" + window.location.hostname.split('.').slice(-2).join('.');
        var cookieString = name + "=" + (value || "") + expires + "; path=/" + secure + "; SameSite=Lax" + domain;
        document.cookie = cookieString;
        console.log("Cookie set:", cookieString);
    }

    // Obtener valor de gclid y fbclid de la URL y crear variables con sus valores
    var scgclid = getUrlParameter('gclid');
    var scfbclid = getUrlParameter('fbclid');

    // Log existing cookies before setting new ones
    console.log("Existing cookies before setting new ones:");
    console.log(document.cookie);

    // Si existe gclid o fbclid en la URL, crear cookie
    if (scgclid !== '') {
        setCookie("scgclid", scgclid, 45); // Expira en 45 días
    }
    if (scfbclid !== '') {
        setCookie("scfbclid", scfbclid, 45); // Expira en 45 días
    }

    // Obtener valor de la cookie por nombre
    function getCookie(name) {
        var nameEQ = name + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var cookieArray = decodedCookie.split(';');
        for (var i = 0; i < cookieArray.length; i++) {
            var cookie = cookieArray[i].trim();
            if (cookie.indexOf(nameEQ) === 0) {
                return cookie.substring(nameEQ.length, cookie.length);
            }
        }
        return "";
    }

    // Obtener valor cookie gclid, fbclid y fbp y meterlo en variables
    var cookieGclid = getCookie("scgclid");
    var cookieFbclid = getCookie("scfbclid");
    var cookieFbp = getCookie("_fbp");
    var originalFbclid = getCookie("_fbc");

    console.log(originalFbclid);

    if (originalFbclid !== '') {
        cookieFbp = originalFbclid;
    }


    console.log("Cookies retrieved:");
    console.log("gclid:", cookieGclid);
    console.log("fbclid:", cookieFbclid);
    console.log("fbp:", cookieFbp);


    // 1. PRIMERA PARTE BUSCADOR -> Lista estática de administración y provincias
    // Crear valores en el select de la Administración
    var values_select_administracion = [
        //{ value: 'EX1', text: 'Extranjería' },
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


    //Contador número de citas seleccionadas
    var numero_citas_contador = 0;


    //Crear valores y populate select oficina
    // Hacer API call al backend para descargar el JSON de oficinas y servicios según la provincia seleccionada y filtrar por administración
    function fetchJsonAndPopulateOficina() {
        var selectedAdministracion = select_administracion.val();
        var selectedProvincia = select_provincia.val();
        console.log(selectedAdministracion);
        console.log(selectedProvincia);

        // Comprobar si Adm, provincia y bsucador por oficina está seleccionado
        if (selectedAdministracion && selectedProvincia) {
            // Show loading message in select_oficina
            select_oficina.html('').append($('<option>', {
                value: '',
                text: 'Cargando...',
                disabled: true,
                selected: true
            }));

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

                    // Set SERVICIOS with the data we already got from outside
                    responseData
                        .forEach(oficina => SERVICIOS[oficina.id_oficina] = oficina);

                    data = responseData; // Set the data variable with the response
                    // Populate oficina select con los textos importados del json
                    select_oficina.html('').append(default_select_oficina);

                    // Mostrar en el select oficinas dependiendo de la administración seleccionada
                    var filteredData = data.filter(item => {
                        if (selectedAdministracion === 'EX1') {
                            // Show names where id_oficina starts with "gobext"
                            return item.id_oficina.toLowerCase().includes('gobext');
                        } else if (selectedAdministracion === 'DGT1') {
                            // All for DGT
                            return item.id_oficina.toLowerCase().includes('dgt');
                        } else if (selectedAdministracion === 'RC1') {
                            // Show names where id_oficina does not start with "gobext"
                            return !(item.id_oficina.toLowerCase().includes('gobext') || item.id_oficina.toLowerCase().includes('dgt'));
                        }
                        return false;
                    });

                    // Check if there are no oficinas
                    if (filteredData.length === 0) {
                        // Display a default message in select_oficina
                        select_oficina.html('').append($('<option>', {
                            value: '',
                            text: 'No hay oficinas disponibles',
                            disabled: true,
                            selected: true
                        }));
                    } else {
                        // Populate oficina select options with external data
                        $.each(filteredData, function (index, item) {
                            var optionElement = $('<option></option>')
                                .prop('value', item.nombre)
                                .attr('id_oficina', item.id_oficina) // https://stackoverflow.com/a/5995650
                                .text(item.nombre);
                            select_oficina.append(optionElement);
                        });

                        // Set default value and trigger change event
                        select_oficina.val(default_select_oficina.val()).trigger('change');
                    }
                },
                error: function (error) {
                    console.error('Error fetching data:', error);
                }
            });
        } else {
            // Clear data and reset options for 'js-oficina' and 'js-cita-previa' selects
            data = null;

        }
    } // Missing closing parenthesis


    //Crear valores y populate select servicio
    function updateCitaPrevia() {
        var selectedOficina = select_oficina.val();
        var selectedAdministracion = select_administracion.val();
        var selectedProvincia = select_provincia.val();

        // Clear existing options in select_servicio
        select_servicio.empty().append(default_select_servicio);

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
                        var optionElement = $('<option></option>')
                            .prop('value', servicio.nombre)
                            .attr('id_servicio', servicio.id_servicio)
                            .text(servicio.nombre);
                        select_servicio.append(optionElement);
                    }
                });

                // Trigger change event to refresh the select (if needed)
                select_servicio.trigger('change');
            }
        } else if (selectedAdministracion && selectedProvincia && radio_buscador_por_provincia.prop('checked')) {
            console.log('Entered the second IF statement.');

            // Assuming 'data' is your array of oficinas and 'selectedAdministracion' is your selected administration code

            // Initialize the array to store all servicios
            var allServicios = [];

            // Check if data is valid and is an array
            if (data && Array.isArray(data)) {
                data.forEach(oficina => {
                    // Check if 'oficina' and 'oficina.servicios' are valid
                    if (oficina && oficina.servicios && Array.isArray(oficina.servicios)) {
                        // Check if the id_oficina includes the text of the selected administration
                        const idOficinaLowerCase = oficina.id_oficina.toLowerCase();

                        if (
                            (selectedAdministracion === 'EX1' && idOficinaLowerCase.includes('gobext')) ||
                            (selectedAdministracion === 'RC1' && !idOficinaLowerCase.includes('gobext'))
                        ) {
                            // Add all servicios for this oficina to the array
                            allServicios.push(...oficina.servicios);
                        }
                    }
                });
            } else {
                console.log('Invalid data structure.');
            }

            // 'allServicios' now contains the array of servicios based on the selected administration
            console.log('All Servicios:', allServicios);

            var filteredServiciosData = allServicios;

            // Check if there are no servicios
            if (filteredServiciosData.length === 0) {
                console.log('No servicios available.');
                // Display a default message in select_servicio
                select_servicio.html('').append($('<option>', {
                    value: '',
                    text: 'No hay servicios disponibles',
                    disabled: true,
                    selected: true
                }));
            } else {
                // Variable to keep track of the total count of duplicates
                let totalDuplicateCount = 0;

                // Count occurrences of each servicio
                // https://stackoverflow.com/a/19395302
                const servicioCounts = {};
                filteredServiciosData.forEach(servicio => {
                    if (servicio && servicio.nombre) {
                        servicioCounts[servicio.nombre] = (servicioCounts[servicio.nombre] || 0) + 1;
                    }
                });

                Object.entries(servicioCounts)
                    .sort((a, b) => a[0].localeCompare(b[0])) // Reorder by text attribute
                    .forEach(([text_servicio, amount_repetitions]) => {
                        select_servicio.append(
                            $('<option></option>').prop('value', text_servicio).text(`${text_servicio} (${amount_repetitions})`)
                        );
                    });


            }


            // Trigger change event to refresh the select (if needed)
            select_servicio.trigger('change');

        } else {
            console.log('One of the conditions is not met.');
        }


    }


    //Cuando se activen uno de los dos triggers, se cambiará el texto con el valor
    function updateNumeroCitasCounter() {
        $('#numero-citas-seleccionadas-buscador').text(numero_citas_contador);
    }



    //3.Sección de citas previas seleccionadas bloque derecho
    var checkoutContainer = $('#bloque-items-citas');

    function add_elemtnt(id_oficina_elem, id_servicio_elem, frontend_administracion) {
        // if it exist in the final list, dont continue
        if (checkoutContainer.children(`.checkout-item[id_oficina="${id_oficina_elem}"][id_servicio="${id_servicio_elem}"]`).length) {
            return
        }

        if (checkoutContainer.children('.checkout-item').length >= MAX_CHECKOUT_ITEMS) {
            return
        }


        // validate exist oficina id
        if (!id_oficina_elem in SERVICIOS) {
            throw new Error(`Id oficina ${id_oficina_elem} not exists in SERVICIOS`);
        }


        obj = SERVICIOS[id_oficina_elem]

        svc_obj = obj.servicios.find((e) => e.id_servicio == id_servicio_elem);

        // validate exists servicio id
        if (svc_obj === undefined) {
            throw new Error(`Id servicio ${id_servicio_elem} not exists in SERVICIOS for oficina ${id_oficina_elem}`);
        }


        var checkoutItem = $(`<div class="checkout-item" id_oficina=${id_oficina_elem} id_servicio=${id_servicio_elem} frontend_administracion=${frontend_administracion}>` +
            '<div class="column wide-column">' +
            '   <span class="item-text">' + obj.provincia + ' | ' + obj.nombre + '</span>' +
            '   <span class="item-text text-span-5">' + svc_obj.nombre + '</span>' +
            '</div>' +
            '<div class="column narrow-column">' +
            '   <button class="delete-item"><img src="https://uploads-ssl.webflow.com/652f00909568ce58c099d55f/652f00919568ce58c099d689_Exit.svg" alt="Delete" style="width: 20px; height: 20px; margin-left: auto;"></button>' +
            '</div>' +
            '</div>');

        // FIXME: CSS should be static based on class, not dynamically inyected!

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

        // Función para borrar cita seleccionada
        var deleteButton = checkoutItem.find('.delete-item');
        deleteButton.on('click', function () {
            // Remove the item when the delete button is clicked
            checkoutItem.remove();

            // If the counter is greater than 0, decrement it
            numero_citas_contador = checkoutContainer.children('.checkout-item').length;

            // Update and display the counter
            updateNumeroCitasCounter();

            // Enable select_servicio if the maximum number of items is not reached
            if (checkoutContainer.children('.checkout-item').length < MAX_CHECKOUT_ITEMS) {
                select_servicio.prop('disabled', false);
            }

            //Si no hay citas seleccionadas, mostrar el div mensaje
            if (checkoutContainer.children('.checkout-item').length === 0) {
                $('#div-mensaje-citas-seleccionadas').show();
            }

            //Poner en default selector servicios cuando se borre algo
            resetOficinaAndUpdateCitaPrevia();

            updatePrice();
        });

        // Append the checkout item to the checkout container
        checkoutContainer.append(checkoutItem);

        updatePrice();

        // Check if the maximum number of items is reached and disable the select if needed
        if (checkoutContainer.children('.checkout-item').length >= MAX_CHECKOUT_ITEMS) {
            select_servicio.prop('disabled', true);
        }

        //Si hay una cita seleccionada, ocultrar el div mensaje
        if (checkoutContainer.children('.checkout-item').length > 0) {
            $('#div-mensaje-citas-seleccionadas').hide();
        }



    }


    // Actualizar precio en base a lo que hay en las cajas
    function updatePrice() {
        set_price_cents = 0;
        checkoutContainer.children('.checkout-item').each((idx, elem) => {
            id_ofi = $(elem).attr('id_oficina')
            id_ser = $(elem).attr('id_servicio')

            var idoficina_idservicio = `${id_ofi}_${id_ser}`;

            var parentID = Object.keys(CATEGORIAS).find(key => idoficina_idservicio in CATEGORIAS[key]) || "ES_0_SINDATOS";
            var target_precio = PRECIOS[parentID];

            // CRITICO: Decision de precio final. Coger siempre el mas alto
            if (target_precio > set_price_cents) {
                set_price_cents = target_precio
            }
        })

        // Convert cents to dollars and format with commas and two decimal places
        var formatted_price = (set_price_cents / 100).toLocaleString('es-ES', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        // Display the formatted price in your text element
        string_precio_buscador.text(formatted_price);

        INPUT_JSON['estimacion_precio_eur'] = set_price_cents
        //$('#INPUT_PRECIO').val(set_price_cents)


        updateHiddentInputForms()
    }


    //Event listener del select de servicios
    select_servicio.on('change', function () {
        var elements_to_add = []
        frontend_administracion = select_administracion.find(':selected').val()

        // Check if all values are selected
        if ($('#radio-buscar-con-oficina').is(':checked') && select_provincia.val() && select_oficina.val() && select_servicio.val()) {
            // Create a new div with a personalized HTML structure for the checkout item
            id_oficina = select_oficina.find(':selected').attr("id_oficina")
            id_servicio = select_servicio.find(':selected').attr("id_servicio")

            elements_to_add.push({
                'ofi': id_oficina,
                'srv': id_servicio
            })
        }

        // elif instead?
        if ($('#radio-buscar-en-provincia').is(':checked') && select_provincia.val() && select_servicio.val()) {
            for (const [id_oficina, ofi] of Object.entries(SERVICIOS)) {
                if (ofi.provincia !== select_provincia.val())
                    continue

                svc = ofi.servicios.find((e) => e.nombre == select_servicio.val());

                if (svc) {
                    elements_to_add.push({
                        'ofi': id_oficina,
                        'srv': svc.id_servicio,
                    })
                }
            }
        }

        elements_to_add
            .sort(() => Math.random() - 0.5)
            .forEach(e => add_elemtnt(e.ofi, e.srv, frontend_administracion));

        //Resetear select de servicios cuando se añade una cita
        //select_servicio.val(null).trigger('change');
    });







    // Reset values and update cita previa function
    function resetValuesAndUpdateCitaPrevia() {
        // Reset the values of the other three selects
        select_oficina.val('').empty().append(default_select_oficina);
        select_servicio.val('').empty().append(default_select_servicio);
        fetchJsonAndPopulateOficina();
        updateCitaPrevia();
    }

    // Reset values and update cita previa function
    function resetOficinaAndUpdateCitaPrevia() {
        // Reset the values of the other three selects
        select_servicio.val('').empty().append(default_select_servicio);
        updateCitaPrevia();
    }



    // Event listener for the 'radio_buscador_con_oficina' element
    radio_buscador_con_oficina.on('change', function () {
        if (radio_buscador_con_oficina.prop('checked')) {
            // Reset the values of the three selects when 'Con Oficina' is selected
            resetValuesAndUpdateCitaPrevia();
            // Fetch and populate oficinas
            //fetchJsonAndPopulateOficina();
        }
    });

    // Event listener for the 'radio_buscador_por_provincia' element
    radio_buscador_por_provincia.on('change', function () {
        if (radio_buscador_por_provincia.prop('checked')) {
            // Reset the values of the three selects when 'Por Provincia' is selected
            resetValuesAndUpdateCitaPrevia();
        }
    });


    // Attach the common change listener to select_administracion and select_provincia
    select_administracion.on('change', resetValuesAndUpdateCitaPrevia);
    select_provincia.on('change', resetValuesAndUpdateCitaPrevia);

    // Event listener for the 'change' event on select_oficina
    select_oficina.on('change', function () {
        // Update cita previa when oficina changes
        resetOficinaAndUpdateCitaPrevia();
    });







    // Event listener for the 'change' event on select_servicio
    select_servicio.on('change', function () {
        // If the counter is greater than 0, decrement it
        numero_citas_contador = checkoutContainer.children('.checkout-item').length;

        // Update and display the counter
        updateNumeroCitasCounter();

    });




    function updateHiddentInputForms() {
        // reset?
        INPUT_JSON = {
            'cookieGclid': cookieGclid,
            'cookieFbclid': cookieFbclid,
            'cookieFbp': cookieFbp
        }
        console.log(INPUT_JSON)
        var idbuscadores = []

        checkoutContainer.children('.checkout-item').each((idx, elem) => {
            id_ofi = $(elem).attr('id_oficina')
            id_ser = $(elem).attr('id_servicio')

            // frontend_administracion = $(elem).attr('frontend_administracion')

            // var idoficina_idservicio = `${id_ofi}_${id_ser}`;
            // var categ_ofi = Object.keys(CATEGORIAS).find(key => idoficina_idservicio in CATEGORIAS[key]) || "ES_0_SINDATOS";
            ofi = SERVICIOS[id_ofi]

            //Obtener datos de la oficina
            nombre_provincia = ofi.provincia
            nombre_oficina = ofi.nombre
            nombre_servicio = ofi.servicios.find((e) => e.id_servicio == id_ser).nombre;

            //Crear var con los objetos 
            idbuscadores.push({
                'id_oficina': id_ofi,
                'id_servicio': id_ser,
                'nombre_oficina': nombre_oficina,
                'nombre_servicio': nombre_servicio,
                'nombre_provincia': nombre_provincia
            })

        })

        INPUT_JSON['idbuscadores'] = idbuscadores

        if (idbuscadores.length === 0) {
            $('#INPUT_JSON').val('')
        } else {
            $('#INPUT_JSON').val(btoa(encodeURIComponent(JSON.stringify(INPUT_JSON)))) //base64
        }


    }


});





