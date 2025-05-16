// Declare in a global scope
var INPUT_JSON = null

//Default config form
var CONFIG_FORM = {
    'servicio_blocked': false,
    'iso3166': "ES",
    "first_name": true,
    "lastname1": true,
    "lastname2": true,
    "fecha_nacimiento": true,
    "email": true,
    "phone_number": [
        "ES"
    ],
    "documentos_admitidos": [
        {
            "iso3166_1_alpha2": "ES",
            "type": "PASAPORTE"
        }
    ],

    "resolucion_nacionalidad": false,
    "csv_nacionalidad": false,
    "caducidad_documento": false,
    "motivo_cita": false,
    "nacionalidad": [],
    "inconsistent": true,
    "unknown_elements": []

};


// Set text i18n
var TEXTOS_API = {

    'js-form-placeholder-1': 'Fecha mínima',
    'js-form-placeholder-2': 'Fecha máxima',
    'js-form-placeholder-3': 'Seleccionar días',


    'js-form-text-1': 'Hubo un problema al procesar la solicitud, acceda al formulario desde el buscador de https://sacacitas.com, Si el problema persiste, contacte con nosotros.',
    'js-form-text-2': 'Existe un problema al recibir los datos. Las fechas de búsqueda están vacías, es posible que el formulario se ha iniciado hace mucho tiempo y se ha perdido esta información o que el navegador que está utilizando no es compatible con el formulario. Por favor, prueba otro navegador.',
    'js-form-text-3': 'Debes seleccionar un rango de fechas',
    'js-form-text-4': `Se necesitan al menos 4 días de búsqueda`,
    'js-form-text-5': 'Este campo es obligatorio',
    'js-form-text-6': 'Documento incorrecto',
    'js-form-text-7': 'Correos no coinciden',
    'js-form-text-8': 'Telefonos no coinciden',
    'js-form-text-9': 'El teléfono no es válido',
    'js-form-text-10': 'El formato es incorrecto',
    'js-form-text-11': 'País de nacionalidad',
    'js-finish-button': 'Finalizar',



    'js-datepicker-lang-1': 'Cerrar',
    'js-datepicker-lang-2': 'Anterior',
    'js-datepicker-lang-3': 'Siguiente',
    'js-datepicker-lang-4': 'Hoy',
    'js-datepicker-lang-5': 'Aplicar',
    'js-datepicker-lang-6': 'Borrar',
    'js-datepicker-lang-7': 'día',
    'js-datepicker-lang-8': 'días',

    'js-datepicker-month-1': 'enero',
    'js-datepicker-month-2': 'febrero',
    'js-datepicker-month-3': 'marzo',
    'js-datepicker-month-4': 'abril',
    'js-datepicker-month-5': 'mayo',
    'js-datepicker-month-6': 'junio',
    'js-datepicker-month-7': 'julio',
    'js-datepicker-month-8': 'agosto',
    'js-datepicker-month-9': 'septiembre',
    'js-datepicker-month-10': 'octubre',
    'js-datepicker-month-11': 'noviembre',
    'js-datepicker-month-12': 'diciembre',
    'js-datepicker-shortmonth-1': 'ene',
    'js-datepicker-shortmonth-2': 'feb',
    'js-datepicker-shortmonth-3': 'mar',
    'js-datepicker-shortmonth-4': 'abr',
    'js-datepicker-shortmonth-5': 'may',
    'js-datepicker-shortmonth-6': 'jun',
    'js-datepicker-shortmonth-7': 'jul',
    'js-datepicker-shortmonth-8': 'ago',
    'js-datepicker-shortmonth-9': 'sep',
    'js-datepicker-shortmonth-10': 'oct',
    'js-datepicker-shortmonth-11': 'nov',
    'js-datepicker-shortmonth-12': 'dic',
    'js-datepicker-dayweek-1': 'lunes',
    'js-datepicker-dayweek-2': 'martes',
    'js-datepicker-dayweek-3': 'miércoles',
    'js-datepicker-dayweek-4': 'jueves',
    'js-datepicker-dayweek-5': 'viernes',
    'js-datepicker-dayweek-6': 'sábado',
    'js-datepicker-dayweek-7': 'domingo',
    'js-datepicker-shortdayweek-1': 'lun',
    'js-datepicker-shortdayweek-2': 'mar',
    'js-datepicker-shortdayweek-3': 'mié',
    'js-datepicker-shortdayweek-4': 'jue',
    'js-datepicker-shortdayweek-5': 'vie',
    'js-datepicker-shortdayweek-6': 'sáb',
    'js-datepicker-shortdayweek-7': 'dom',
    'js-datepicker-ultrashortdayweek-1': 'L',
    'js-datepicker-ultrashortdayweek-2': 'M',
    'js-datepicker-ultrashortdayweek-3': 'X',
    'js-datepicker-ultrashortdayweek-4': 'J',
    'js-datepicker-ultrashortdayweek-5': 'V',
    'js-datepicker-ultrashortdayweek-6': 'S',
    'js-datepicker-ultrashortdayweek-7': 'D',

};
//--> Set functionality for language translation
var { Tolgee, BackendFetch } = window['@tolgee/web'];

//Current subdomain
var host = window.location.hostname;  // Get the full hostname (e.g., subdomain.example.com)
var subdomain = host.split('.')[0];   // Get the first part of the hostname
if (subdomain === "sacacitas") {
    subdomain = "es";
}

var tolgee_instance = Tolgee()
    .use(BackendFetch({ prefix: "https://documentos.sacacitas.com/lang" }))
    .init({
        language: subdomain
    })




//--> Variables del fornulario
//Crear variables cogiendo las secciones divs del formulario
var AsiloPrimeraBloque = $('#bloque-asilo-primera-vez-form');
var seccion1 = $('#Secciones-Form-1');
var seccion2 = $('#Secciones-Form-2');
var seccion3 = $('#Secciones-Form-3');
var seccion4 = $('#Secciones-Form-4');
var seccion5 = $('#Secciones-Form-5');
var seccion6 = $('#Secciones-Form-6');

//Crear variables botones de siguiente
var NextButon1 = $('#Next-Buton-1');
var NextButon2 = $('#Next-Buton-2');
var NextButon3 = $('#Next-Buton-3');
var NextButon4 = $('#Next-Buton-4');
var NextButon5 = $('#Next-Buton-5');

//Crear variables botones hacia atrás
var BackButon1 = $('#Back-Buton-1');
var BackButon2 = $('#Back-Buton-2');
var BackButon3 = $('#Back-Buton-3');
var BackButon4 = $('#Back-Buton-4');
var BackButon5 = $('#Back-Buton-5');

//Boton finalizar
var FinalizarButon = $('#formulario-boton-finalizar');

//Variables de los inputs del formulario
var InputDivFMinMax = $('#div-block-f-min-max');
var InputFMin = $('#start-date');
var InputFMax = $('#end-date');
//var InputFechaExclusion = $('#input-fecha-exclusion');
var InputNombre = $('#input-nombre');
var InputApellido1 = $('#input-apellido1');
var InputApellido2 = $('#input-apellido2');
var InputFNacimiento = $('#input-fecha-nacimiento');
var InputNumeroDocumento = $('#input-documento');
var InputCorreo = $('#input-correo');
var InputCorreoVerf = $('#input-confirmar-correo');
var InputTelef = $('#input-telefono');
var InputTelefVerf = $('#input-confirmar-telefono');
var InputRNacionalidad = $('#input-resolucion-nacionalidad');
var InputCSVdoc = $('#input-csv-doc');
var InputListaPaises = $('#input-lista-paises');

// Init FilePond and keep reference to files
let uploadedFiles = [];

//Buttons documents
var selectFormDocPasaporte = $('#select-PASAPORTE-form');
var selectFormDocNIE = $('#select-NIE-form');
var selectFormDocDNI = $('#select-DNI-form');


//Divs del formulario
var DivListaPaises = $('#div-lista-paises');
var DivJuraNacionalidad = $('#div-resolucion-nacionalidad');
var DivCSVdoc = $('#div-csv-doc');
var DocResNacionalidadPDF = $('#div-res-nacionalidad-pdf');
var DivCaducidadTarjeta = $('#clientes-caducidad-tarjeta');
var DivPhone = $('#div-telefono');
var DivVerifyPhone = $('#div-confirmar-telefono');


//Let Inputs to check defaults
var inputsToCheckButton2 = [];
var inputsToCheckButton5 = [];

//Fecha exclusion
var TextFechaExclusion = $('#texto-fechas-exclusion');

//Set config form not completed
var config_completed = false;


//Hide sections by default
seccion1.show();
seccion2.hide();
seccion3.hide();
seccion4.hide();
seccion5.hide();
seccion6.hide();

//Hide asterisks by default in the page
$('#asterisk-apellido2').hide();
$('#asterisk-fecha-nacimiento').hide();
$('#asterisk-lista-paises').hide();



//Settings regarding the data picker
var PickerExcluidosDias = null
var MIN_DIAS = 4



//Regarding page counting and showing different sections
let PageCountingTotal = 5
var ENABLED_PAGES = {
    'seccion5': true
}




$(document).ready(function () {
    tolgee_instance.run().then(() => {


        if (subdomain === "es" || subdomain === "sacacitas") {
        } else {
            for (const [key, value] of Object.entries(TEXTOS_API)) {
                const translation = tolgee_instance.t(key, `${TEXTOS_API[key]} {{${key}}}`);
                TEXTOS_API[key] = translation;
            }
        }

        //Replace text in placeholders, buttons, etc
        $('#start-date').attr('placeholder', TEXTOS_API['js-form-placeholder-1']);
        $('#end-date').attr('placeholder', TEXTOS_API['js-form-placeholder-2']);
        $('#exclude-days').attr('placeholder', TEXTOS_API['js-form-placeholder-3']);
        $('#formulario-boton-finalizar').val(TEXTOS_API['js-finish-button']);


        //Set default input to check
        DetermineInputsToCheck();

        //--> Load config FORM
        var urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('INPUT_JSON')) {
            try {
                // Decode and parse the INPUT_JSON parameter
                const decodedInput = decodeURIComponent(atob(urlParams.get('INPUT_JSON')));
                INPUT_JSON = JSON.parse(decodedInput);

                // Prepare the data to send
                var inputData = JSON.stringify(INPUT_JSON.idbuscadores);

                // Send the data as a POST request
                $.ajax({
                    url: "https://n8n.sacacitas.com/webhook/config-form",
                    type: "POST",
                    contentType: "application/json", // Specify JSON content type
                    dataType: 'json',
                    data: JSON.stringify({ data: inputData }), // Send the data in the request body
                    success: function (response) {
                        // Merge two dictionaries
                        CONFIG_FORM = Object.assign(CONFIG_FORM, response);

                        // Load items
                        DetermineInputsToCheck();
                        InputsToShow();
                        ExecuteitiPhoneLibrary();
                        InjectCountryList();
                        DefineUploadPDF();

                        config_completed = true;
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // Load default items in case of error
                        DetermineInputsToCheck();
                        InputsToShow();
                        ExecuteitiPhoneLibrary();
                        InjectCountryList();
                        DefineUploadPDF();

                        config_completed = true;

                        // If error, call the error webhook
                        $.ajax({
                            url: "https://n8n.sacacitas.com/webhook/error-alerts",
                            type: "POST",
                            contentType: "application/json",
                            dataType: 'json',
                            data: JSON.stringify({
                                inputData: inputData,
                                LocalisationError: "formulario_inicio-load-config-form",
                                Extrainfo: "Llamada al config form desde el formulario",
                                errorCode: 500
                            }),
                            success: function (response) {
                                console.log("Error alert sent successfully:", response);
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                console.error("Error sending error alert:", errorThrown);
                            }
                        });
                    }
                });
            } catch (error) {
                console.error("Error decoding or processing INPUT_JSON:", error);
            }
        } else {
            alert(`${TEXTOS_API['js-form-text-1']}`);
        }




        //--> Add html elements dinamically and import libraries

        //SECTION: 1 - Escoger fechas máx min
        //Datepicker things
        //Difference between days in datepicker, first page
        function calculateDateDifference() {
            var startDate = $("#start-date").datepicker("getDate");
            var endDate = $("#end-date").datepicker("getDate");
            var daysDiff = 0;
            if (startDate && endDate) {
                var timeDiff = endDate - startDate;
                daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
                $("#texto-dias-de-busqueda").text(' ' + daysDiff);
            } else {
                $("#texto-dias-de-busqueda").text(' ' + "-");
            }
            return daysDiff;
        }
        //Días de exclusión
        PickerExcluidosDias = new Litepicker({
            element: document.getElementById('exclude-days'),
            plugins: ['multiselect', 'mobilefriendly'],
            minDate: new Date(),
            numberOfColumns: 2,
            numberOfMonths: 2,
            lang: 'es-ES',
            buttonText: {
                apply: TEXTOS_API['js-datepicker-lang-5'],  // "Aplicar"
                cancel: TEXTOS_API['js-datepicker-lang-6']  // "Borrar"
            },
            tooltipText: {
                one: TEXTOS_API['js-datepicker-lang-7'],    // "día"
                other: TEXTOS_API['js-datepicker-lang-8']   // "días"
            },
            setup: function (picker) {
                picker.on('button:apply', function () {
                    document.getElementById('exclude-days').value = picker.multipleDatesToString();
                });
            }
        });
        //Datepicker localisation
        $(function () {
            var dateFormat = "dd/mm/yy";

            // Define Spanish localization directly in JavaScript
            $.datepicker.setDefaults($.datepicker.regional['es'] = {
                closeText: TEXTOS_API['js-datepicker-lang-1'], // "Cerrar"
                prevText: TEXTOS_API['js-datepicker-lang-2'],  // "Anterior"
                nextText: TEXTOS_API['js-datepicker-lang-3'],  // "Siguiente"
                currentText: TEXTOS_API['js-datepicker-lang-4'], // "Hoy"
                monthNames: [
                    TEXTOS_API['js-datepicker-month-1'],  // "enero"
                    TEXTOS_API['js-datepicker-month-2'],  // "febrero"
                    TEXTOS_API['js-datepicker-month-3'],  // "marzo"
                    TEXTOS_API['js-datepicker-month-4'],  // "abril"
                    TEXTOS_API['js-datepicker-month-5'],  // "mayo"
                    TEXTOS_API['js-datepicker-month-6'],  // "junio"
                    TEXTOS_API['js-datepicker-month-7'],  // "julio"
                    TEXTOS_API['js-datepicker-month-8'],  // "agosto"
                    TEXTOS_API['js-datepicker-month-9'],  // "septiembre"
                    TEXTOS_API['js-datepicker-month-10'], // "octubre"
                    TEXTOS_API['js-datepicker-month-11'], // "noviembre"
                    TEXTOS_API['js-datepicker-month-12']  // "diciembre"
                ],
                monthNamesShort: [
                    TEXTOS_API['js-datepicker-shortmonth-1'],  // "ene"
                    TEXTOS_API['js-datepicker-shortmonth-2'],  // "feb"
                    TEXTOS_API['js-datepicker-shortmonth-3'],  // "mar"
                    TEXTOS_API['js-datepicker-shortmonth-4'],  // "abr"
                    TEXTOS_API['js-datepicker-shortmonth-5'],  // "may"
                    TEXTOS_API['js-datepicker-shortmonth-6'],  // "jun"
                    TEXTOS_API['js-datepicker-shortmonth-7'],  // "jul"
                    TEXTOS_API['js-datepicker-shortmonth-8'],  // "ago"
                    TEXTOS_API['js-datepicker-shortmonth-9'],  // "sep"
                    TEXTOS_API['js-datepicker-shortmonth-10'], // "oct"
                    TEXTOS_API['js-datepicker-shortmonth-11'], // "nov"
                    TEXTOS_API['js-datepicker-shortmonth-12']  // "dic"
                ],
                dayNames: [
                    TEXTOS_API['js-datepicker-dayweek-7'],  // "domingo"
                    TEXTOS_API['js-datepicker-dayweek-1'],  // "lunes"
                    TEXTOS_API['js-datepicker-dayweek-2'],  // "martes"
                    TEXTOS_API['js-datepicker-dayweek-3'],  // "miércoles"
                    TEXTOS_API['js-datepicker-dayweek-4'],  // "jueves"
                    TEXTOS_API['js-datepicker-dayweek-5'],  // "viernes"
                    TEXTOS_API['js-datepicker-dayweek-6']   // "sábado"
                ],
                dayNamesShort: [
                    TEXTOS_API['js-datepicker-shortdayweek-7'], // "dom"
                    TEXTOS_API['js-datepicker-shortdayweek-1'], // "lun"
                    TEXTOS_API['js-datepicker-shortdayweek-2'], // "mar"
                    TEXTOS_API['js-datepicker-shortdayweek-3'], // "mié"
                    TEXTOS_API['js-datepicker-shortdayweek-4'], // "jue"
                    TEXTOS_API['js-datepicker-shortdayweek-5'], // "vie"
                    TEXTOS_API['js-datepicker-shortdayweek-6']  // "sáb"
                ],
                dayNamesMin: [
                    TEXTOS_API['js-datepicker-ultrashortdayweek-7'], // "D"
                    TEXTOS_API['js-datepicker-ultrashortdayweek-1'], // "L"
                    TEXTOS_API['js-datepicker-ultrashortdayweek-2'], // "M"
                    TEXTOS_API['js-datepicker-ultrashortdayweek-3'], // "X"
                    TEXTOS_API['js-datepicker-ultrashortdayweek-4'], // "J"
                    TEXTOS_API['js-datepicker-ultrashortdayweek-5'], // "V"
                    TEXTOS_API['js-datepicker-ultrashortdayweek-6']  // "S"
                ],
                weekHeader: "Sm",
                dateFormat: "dd/mm/yy",
                firstDay: 1,
                isRTL: false,
                showMonthAfterYear: false,
                yearSuffix: ""
            });


            //Datepcicker First date
            $("#start-date").datepicker({
                dateFormat: dateFormat,
                minDate: 0,
                onSelect: function (selectedDate) {
                    var dateObj = $(this).datepicker('getDate')
                    $("#end-date").datepicker("option", "minDate", selectedDate);
                    var newMargin = calculateDateDifference();

                    PickerExcluidosDias.setOptions({ minDate: dateObj })
                    PickerExcluidosDias.gotoDate(dateObj)
                    PickerExcluidosDias.clearSelection()


                }
            });
            //Datepcicker Last date
            $("#end-date").datepicker({
                dateFormat: dateFormat,
                minDate: 0,
                onSelect: function (selectedDate) {
                    var dateObj = $(this).datepicker('getDate')

                    var startDate = $("#start-date").datepicker("getDate");
                    var endDate = $.datepicker.parseDate(dateFormat, selectedDate);
                    // Check if start date is greater than end date
                    if (startDate && startDate.getTime() > endDate.getTime()) {
                        $("#start-date").datepicker("setDate", selectedDate);
                    }
                    var newMargin = calculateDateDifference();
                    PickerExcluidosDias.setOptions({ maxDate: dateObj })
                    PickerExcluidosDias.clearSelection()

                }
            });


        });
        //Poner read only al input de fecha max para que no salga el teclado en el movil
        function makeReadonly() {
            document.getElementById('readonly-field').setAttribute("readonly", "");
        }

        //Mostrar y ocultar input fechas exclusión
        TextFechaExclusion.click(function () {
            // Toggle the visibility of InputFechaExclusion
            $('#div-fecha-exclusion').toggle();
        });

        //SECTION: 2 - Datos cliente
        //Date picker jquery fecha nacimiento
        $(function () {
            var dateFormat = "dd/mm/yy";

            $("#input-fecha-nacimiento").datepicker({
                dateFormat: dateFormat,
                maxDate: 0, // Maximum date is today (no future dates allowed)
                changeMonth: true, // Show month dropdown
                changeYear: true, // Show year dropdown
                yearRange: "c-100:c", // Display 100 years before and after the current year
                dayNamesMin: [
                    TEXTOS_API['js-datepicker-ultrashortdayweek-7'], // Sunday (D)
                    TEXTOS_API['js-datepicker-ultrashortdayweek-1'], // Monday (L)
                    TEXTOS_API['js-datepicker-ultrashortdayweek-2'], // Tuesday (M)
                    TEXTOS_API['js-datepicker-ultrashortdayweek-3'], // Wednesday (X)
                    TEXTOS_API['js-datepicker-ultrashortdayweek-4'], // Thursday (J)
                    TEXTOS_API['js-datepicker-ultrashortdayweek-5'], // Friday (V)
                    TEXTOS_API['js-datepicker-ultrashortdayweek-6']  // Saturday (S)
                ],
                monthNames: [
                    TEXTOS_API['js-datepicker-month-1'], // January
                    TEXTOS_API['js-datepicker-month-2'], // February
                    TEXTOS_API['js-datepicker-month-3'], // March
                    TEXTOS_API['js-datepicker-month-4'], // April
                    TEXTOS_API['js-datepicker-month-5'], // May
                    TEXTOS_API['js-datepicker-month-6'], // June
                    TEXTOS_API['js-datepicker-month-7'], // July
                    TEXTOS_API['js-datepicker-month-8'], // August
                    TEXTOS_API['js-datepicker-month-9'], // September
                    TEXTOS_API['js-datepicker-month-10'], // October
                    TEXTOS_API['js-datepicker-month-11'], // November
                    TEXTOS_API['js-datepicker-month-12']  // December
                ]
            });
        });

        //SECTION: 3 - Documento identidad
        //Seleccionar botones de selección de tipo de documento. DNI, NIE, Pasaporte
        selectFormDocPasaporte.add(selectFormDocNIE).add(selectFormDocDNI).hide();
        selectFormDocPasaporte.removeClass('boton-documento-selected')

        var options_documento = $('.div-documentos-formulario').children('a')

        //Logic when clicking button document
        options_documento.click(function () {
            options_documento.removeClass('boton-documento-selected')
            $(this).addClass('boton-documento-selected');
        });

        //Mostrar y ocultar input fechas exclusión
        $('#texto-documentos-identidad').click(function () {
            // Toggle the visibility of InputFechaExclusion
            $('#texto-more-info-variosdocs').toggle();
        });

        //SECTION: 4 - Contact items. Email and Phone number
        function ExecuteitiPhoneLibrary() {
            // Add country code to phone number input
            $('input[ms-code-phone-number]').each(function () {
                var input = this;

                // Initialize intlTelInput with your configuration
                const iti = window.intlTelInput(input, {
                    onlyCountries: CONFIG_FORM.phone_number,
                    separateDialCode: true,
                    strictMode: true,
                    utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@23.9.3/build/js/utils.js"
                });

                // Attach iti instance to the input element for later use
                $(input).data('itiInstance', iti);

                // Set the user's country based on predefined or IP-based location
                let CountryISOselected = CONFIG_FORM.phone_number[0];
                if (typeof CountryISOselected !== 'undefined' && CountryISOselected) {
                    iti.setCountry(CountryISOselected);
                } else {
                    $.get("https://ipinfo.io", function (response) {
                        var countryCode = response.country;
                        iti.setCountry(countryCode);

                        // Update the saved ISO and dial code if changed by IP-based detection
                        var ipBasedCountryData = iti.getSelectedCountryData();
                        countryISO = ipBasedCountryData.iso2;
                        dialCode = ipBasedCountryData.dialCode;


                        // Update the hidden fields or variables
                        $('input[name="country_iso"]').val(countryISO);
                        $('input[name="dial_code"]').val(dialCode);
                    }, "jsonp");
                }


                // Retrieve the predefined country ISO and dial code
                var selectedCountryData = iti.getSelectedCountryData();
                var countryISO = selectedCountryData.iso2;   // Get the ISO2 code (e.g., "US")
                var dialCode = selectedCountryData.dialCode; // Get the dial code (e.g., "1" for US)
                $('#phone-dial-iso').val(countryISO); // Assuming you have hidden inputs for this
                $('#phone-dial-code').val(dialCode);

                // Retrieve just the country ISO and dial code on input change
                input.addEventListener('countrychange', function () {
                    var selectedCountryData = iti.getSelectedCountryData();
                    var countryISO = selectedCountryData.iso2;   // Get the ISO2 code (e.g., "US")
                    var dialCode = selectedCountryData.dialCode; // Get the dial code (e.g., "1" for US)
                    $('#phone-dial-iso').val(countryISO); // Assuming you have hidden inputs for this
                    $('#phone-dial-code').val(dialCode);
                });

            });

        }




        //SECTION: 5 - Specific search itmes. Nacionalidad, R Nacionalidad y caducidad tarjeta


        // Inject country list
        // Function to fetch country data and populate the dropdown
        function InjectCountryList() {
            // Determine the list of countries to use
            let country_array_final;
            if (CONFIG_FORM.nacionalidad && CONFIG_FORM.nacionalidad.length > 0) {
                country_array_final = CONFIG_FORM.nacionalidad;

            } else {
                // Use default iso31661 array from the window object
                const isoCountries = window.iso3166.iso31661;
                country_array_final = isoCountries.map(country => country.alpha2);

            }

            // Fetch the country data from the provided URL
            fetch(`https://cdn.jsdelivr.net/npm/i18n-iso-countries/langs/${subdomain}.json`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Network response was not ok: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(data => {
                    // Get the countries object from the response
                    const countries = data.countries;

                    // Create an array to hold country options
                    let countryOptions = [];

                    // Loop through the country_array_final and check if the country code exists in the fetched data
                    country_array_final.forEach(code => {
                        if (countries[code]) {
                            const countryName = Array.isArray(countries[code]) ? countries[code][0] : countries[code];
                            // Push the code and country name to the array
                            countryOptions.push({ code: code, name: countryName });
                        }
                    });

                    // Sort the country options array alphabetically by country name
                    countryOptions.sort((a, b) => a.name.localeCompare(b.name));

                    // Get the dropdown element by its ID
                    const dropdown = document.getElementById('input-lista-paises');

                    // Create and add the default option
                    const defaultOption = document.createElement('option');
                    defaultOption.value = '';
                    defaultOption.text = TEXTOS_API['js-form-text-11']; // "País de nacionalidad"
                    defaultOption.disabled = true; // Prevents selection
                    defaultOption.selected = true; // Sets as the default selected option
                    dropdown.appendChild(defaultOption);


                    // Append each country option to the dropdown
                    countryOptions.forEach(optionData => {
                        const option = document.createElement('option');
                        option.value = optionData.code;
                        option.textContent = optionData.name;
                        dropdown.appendChild(option);
                    });
                })

                .catch(error => {
                    // Send an error to the webhook in case of failure
                    const inputData = JSON.stringify({ error: error.message });

                    $.ajax({
                        url: "https://n8n.sacacitas.com/webhook/didnt-create-country-list-correctly",
                        type: "POST",
                        contentType: "application/json",
                        dataType: 'json',
                        data: inputData,
                        success: function (response) {
                            console.log("Error reported successfully:", response);
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            console.error("Error reporting failed:", errorThrown);
                        }
                    });
                });
        }

        //File upload settings
        function DefineUploadPDF() {
            if (CONFIG_FORM.adjunto_resolucion_nacionalidad == true) {
                // Register the size validation plugin and type of file
                FilePond.registerPlugin(
                    FilePondPluginFileValidateSize,
                    FilePondPluginFileValidateType
                );

                // Set FilePond locale and file type
                FilePond.setOptions({

                    // Locale translation
                    labelIdle: 'Arrastra un archivo PDF o <span class="filepond--label-action"> haz clic aquí </span>',
                    labelInvalidField: 'El campo contiene archivos inválidos',
                    labelFileWaitingForSize: 'Esperando tamaño...',
                    labelFileSizeNotAvailable: 'Tamaño no disponible',
                    labelFileLoading: 'Cargando...',
                    labelFileLoadError: 'Error al cargar',
                    labelFileProcessing: 'Subiendo...',
                    labelFileProcessingComplete: 'Subida completa',
                    labelFileProcessingAborted: 'Subida cancelada',
                    labelFileProcessingError: 'Error al subir',
                    labelFileProcessingRevertError: 'Error al revertir',
                    labelFileRemoveError: 'Error al eliminar',
                    labelTapToCancel: 'Toca para cancelar',
                    labelTapToRetry: 'Toca para reintentar',
                    labelTapToUndo: 'Toca para deshacer',
                    labelButtonRemoveItem: 'Eliminar',
                    labelButtonAbortItemLoad: 'Abortar',
                    labelButtonRetryItemLoad: 'Reintentar',
                    labelButtonAbortItemProcessing: 'Cancelar',
                    labelButtonUndoItemProcessing: 'Deshacer',
                    labelButtonRetryItemProcessing: 'Reintentar',
                    labelButtonProcessItem: 'Subir',

                    // File Type & Size Validation
                    acceptedFileTypes: ['application/pdf'],
                    labelMaxFileSizeExceeded: 'El archivo es demasiado grande',
                    fileValidateTypeLabelExpectedTypes: 'Solo se permiten archivos PDF',
                    fileValidateTypeLabelExpectedTypesMap: { 'application/pdf': '.pdf' },
                    fileValidateSizeMaxFileSize: '5MB',
                    labelMaxFileSize: 'El archivo supera el tamaño máximo de 5MB'
                });

                const pond = FilePond.create(document.querySelector('.filepond'), {
                allowMultiple: false,
                maxFileSize: '5MB',
                onupdatefiles: (fileItems) => {
                    uploadedFiles = fileItems.map(fileItem => fileItem.file);
                }
                });
            }
        }









        const PickerCadTarjeta = new easepick.create({
            element: "#input-caducidad-tarjeta",
            css: ["https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.css", 'https://documentos.sacacitas.com/formulario-inicio.css',],
            zIndex: 999999999,
            lang: "es-ES",
            format: "DD MMMM YYYY",
            readonly: false,
            AmpPlugin: {
                dropdown: {
                    months: true,
                    years: true,
                    minYear: 2000,
                    maxYear: 2050
                },
                resetButton: false,
                darkMode: false
            },
            plugins: ["AmpPlugin", "LockPlugin"]
        })

        // SECTION: 6. Finalizar y enviar a backend los datos
        $('#formulario_ID').submit(async function (event) {
            event.preventDefault();

            // UI: Show loading and disable button
            $('#gif-cargando-boton-finalizar').show();
            $('#div-error-enviar-datos, #gif-error-boton-finalizar, #gif-success-boton-finalizar').hide();
            $('#submit-button-id').prop('disabled', true);

            // Get selected document type and prettify
            const selected_document = $('.div-documentos-formulario .boton-documento-selected').attr('id');
            const docTypeMap = {
                'select-PASAPORTE-form': 'PASAPORTE',
                'select-DNI-form': 'DNI',
                'select-NIE-form': 'NIE'
            };
            const NiceSelected_document = docTypeMap[selected_document] || '';

            // Generate unique ID
            const RandomStringID = `${Date.now().toString(36)}-${Math.floor(Math.random() * 10000).toString(36)}`;
            const LangBrowser = navigator.language || navigator.userLanguage;

            // Handle excluded days
            const excludedDaysRaw = PickerExcluidosDias.multipleDatesToString();
            const dias_excluidos = excludedDaysRaw === '' ? [] : excludedDaysRaw.split(',');

            // Handle base64 PDF file
            let pdfBase64resnac = null;
            if (CONFIG_FORM.adjunto_resolucion_nacionalidad === true) {
                const files = FilePond.find(document.querySelector('#input-upload-pdf-nacionalidad')).getFiles();
                if (files.length > 0) {
                    pdfBase64resnac = await new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onload = () => resolve(reader.result.split(',')[1]); // remove "data:application/pdf;base64,"
                        reader.onerror = reject;
                        reader.readAsDataURL(files[0].file);
                    });
                }
            }

            // Construct JSON payload
            const formData = {
                idbuscadores: INPUT_JSON.idbuscadores,
                Fmin: $('#start-date').val(),
                Fmax: $('#end-date').val(),
                dias_excluidos: dias_excluidos,
                Nombre: $('#input-nombre').val(),
                Apellido1: $('#input-apellido1').val(),
                Apellido2: $('#input-apellido2').val(),
                Fnacimiento: $('#input-fecha-nacimiento').val(),
                SelectedDocument: NiceSelected_document,
                NDocumento: $('#input-documento').val(),
                Correo: $('#input-correo').val(),
                Telefono: $('#input-telefono').val(),
                TelefonoDialISO: $('#phone-dial-iso').val(),
                TelefonoDiaCode: $('#phone-dial-code').val(),
                Pais: $('#input-lista-paises option:selected').text(),
                Pais_iso: $('#input-lista-paises').val(),
                RNacionalidad: $('#input-resolucion-nacionalidad').val(),
                csv_doc: $('#input-csv-doc').val(),
                CaducidadTarjeta: $('#input-caducidad-tarjeta').val(),
                RandomStringID,
                LangBrowser,
                gclid: INPUT_JSON.cookieGclid,
                retargetingSource: null,
                fbclid: INPUT_JSON.cookieFbclid,
                fbpid: INPUT_JSON.cookieFbp,
                ISO_language: subdomain,
                nacionalidad_pdf_base64: pdfBase64resnac // base64 string or null
            };

            // Send JSON request
            $.ajax({
                type: 'POST',
                url: 'https://n8n.sacacitas.com/webhook/d34bf08d-32d8-4956-8dc4-9e1d676bb5fa434-formulario-recibido-new-form',
                data: JSON.stringify(formData),
                contentType: 'application/json',
                dataType: 'json',
                success: function (response) {
                    $('#gif-cargando-boton-finalizar').hide();
                    if (response?.ID_publico) {
                        $('#formulario-boton-finalizar').hide();
                        $('#gif-success-boton-finalizar').show();
                        window.location.href = `https://${subdomain}.sacacitas.com/link?r=${response.ID_publico}`;
                    } else if (response?.empty_dates === true) {
                        $('#div-error-enviar-datos').show();
                        $('#gif-error-boton-finalizar').show();
                        $('#texto_error_form').text(TEXTOS_API['js-form-text-2']);
                    }
                },
                error: function (xhr, status, error) {
                    $('#gif-cargando-boton-finalizar').hide();
                    $('#div-error-enviar-datos, #gif-error-boton-finalizar').show();
                    $('#submit-button-id').prop('disabled', false);
                    console.error('Form submission failed:', error);

                    // Send error alert
                    $.ajax({
                        type: 'POST',
                        url: 'https://n8n.sacacitas.com/webhook/error-alerts',
                        contentType: 'application/json',
                        dataType: 'json',
                        data: JSON.stringify({
                            inputData: formData,
                            LocalisationError: 'formulario_inicio-send-final-form',
                            Extrainfo: 'Ha fallado completar el formulario final',
                            errorCode: 500
                        }),
                        success: res => console.log('Error alert sent'),
                        error: err => console.error('Failed to send error alert', err)
                    });
                }
            });

            return false;
        });




        // --> Logic buttons back and next
        //Button 1: Verificar F Min y F Max
        $(NextButon1).click(function () {
            let inputsToCheck = [InputFMin, InputFMax];
            // Array de inputs que verificar
            let allInputsValid = true;
            // Si todo OK pasa a la siguiente

            // Check each input
            inputsToCheck.some(function (input) {
                if (input.val().trim() === '') {
                    displayErrorMessage(InputDivFMinMax, `${TEXTOS_API['js-form-text-3']}`);
                    // Muestra mensaje de error en la funcion displayErrorMessage donde inputElement = input
                    allInputsValid = false;
                } else {
                    // If input is not empty, remove the error message
                    $(InputDivFMinMax).next('.error-message-form').remove();
                }
            });



            if (calculateDateDifference() < MIN_DIAS) {
                displayErrorMessage(InputDivFMinMax, `${TEXTOS_API['js-form-text-4']}`);
                // Muestra mensaje de error en la funcion displayErrorMessage donde inputElement = input
                allInputsValid = false;
            } else {
                // If input is not empty, remove the error message
                $(InputDivFMinMax).next('.error-message-form').remove();
            }

            // Si todo OK pasa a la siguiente
            if (allInputsValid) {
                seccion1.hide();
                seccion2.show();
            }
        });

        //Button 2: Comprobar nombre, apellido1 e input-fecha-nacimiento
        $(NextButon2).click(function () {
            let inputsToCheck = inputsToCheckButton2
            // Array de inputs que verificar
            let allInputsValid = true;
            // Si todo OK pasa a la siguiente

            // Check each input
            inputsToCheck.forEach(function (input) {
                if (input.val().trim() === '') {
                    displayErrorMessage(input, `${TEXTOS_API['js-form-text-5']}`); // "Este campo es obligatorio"
                    // Muestra mensaje de error en la funcion displayErrorMessage donde inputElement = input
                    allInputsValid = false;
                } else {
                    // If input is not empty, remove the error message
                    $(input).next('.error-message-form').remove();
                }
            });





            // Function to check if config is completed
            function isConfigCompleted() {
                return new Promise((resolve) => {
                    // Polling function to check the status
                    const interval = setInterval(() => {
                        if (config_completed === true) {
                            clearInterval(interval);
                            resolve(true);

                            //if error call to webhook
                            $.ajax({
                                url: "https://n8n.sacacitas.com/webhook/too-much-time-loading-config-form",
                                type: "POST",
                                contentType: "application/json",
                                // Specify content type as JSON
                                dataType: 'json',
                                data: inputData,
                                // Send the JSON data
                                success: function (response) {
                                    console.log("Error:", response);
                                },
                                error: function (jqXHR, textStatus, errorThrown) {
                                    console.error("Error:", errorThrown);
                                }
                            });


                        }
                    }, 1000); // Check every 1 second
                });
            }
            // Function to handle the transition --> From isConfigCompleted
            async function handleTransition() {
                // If all inputs are valid
                if (allInputsValid) {
                    // Show the loading GIF
                    $('#gif-cargando-boton-config-form').show();

                    // Wait for the config to be completed
                    if (config_completed === false) {
                        await isConfigCompleted();
                    }
                    // Once completed, hide the loading GIF and move to the next section
                    seccion2.hide();
                    seccion3.show();
                    $('#gif-cargando-boton-config-form').hide();
                }
            }

            // Call the transition handler --> From isConfigCompleted
            handleTransition();

        });

        //Button 3: Comprobar numero de documento
        $(NextButon3).click(function () {
            let inputsToCheck = [InputNumeroDocumento];
            // Array de inputs que verificar
            let allInputsValid = true;
            // Si todo OK pasa a la siguiente

            // Check each input
            inputsToCheck.forEach(function (input) {
                var selected_document = $('.div-documentos-formulario').find('.boton-documento-selected').attr('id')

                var func_validate = function (text_input) {
                    return true
                };
                // PASAPORTE will be always True because we cant validate it

                if (selected_document === 'select-NIE-form') {
                    func_validate = validateNIE

                } else if (selected_document === 'select-DNI-form') {
                    func_validate = validateDNI

                }

                if (input.val().trim() === '') {
                    displayErrorMessage(input, `${TEXTOS_API['js-form-text-5']}`); // "Este campo es obligatorio"
                    // Muestra mensaje de error en la funcion displayErrorMessage donde inputElement = input
                    allInputsValid = false;
                } else if (!func_validate(input.val())) {
                    displayErrorMessage(input, `${TEXTOS_API['js-form-text-6']}`);
                    // Muestra mensaje de error en la funcion displayErrorMessage donde inputElement = input
                    allInputsValid = false;

                } else {
                    // Make sure is uppercase
                    input.val(input.val().toUpperCase());

                    // If input is not empty, remove the error message
                    $(input).next('.error-message-form').remove();
                }

            });

            // Si todo OK pasa a la siguiente
            if (allInputsValid) {
                seccion3.hide();
                seccion4.show();
            }
        });

        //Button 4: Comprobar correo y telefono
        $(NextButon4).click(function () {
            let inputsToCheck = [InputCorreo, InputCorreoVerf, InputTelef, InputTelefVerf];
            // Array de inputs que verificar
            let allInputsValid = true;
            // Si todo OK pasa a la siguiente

            // Check each input
            inputsToCheck.forEach(function (input) {
                if (input.val().trim() === '' || !input[0].checkValidity()) {
                    input[0].reportValidity();
                    displayErrorMessage(input, `${TEXTOS_API['js-form-text-5']}`); // "Este campo es obligatorio"
                    // Muestra mensaje de error en la funcion displayErrorMessage donde inputElement = input
                    allInputsValid = false;
                } else {
                    // If input is not empty, remove the error message
                    $(input).next('.error-message-form').remove();
                }
            });

            //Check both emails match
            if (InputCorreo.val() !== InputCorreoVerf.val()) {
                displayErrorMessage(InputCorreo, `${TEXTOS_API['js-form-text-7']}`);
                displayErrorMessage(InputCorreoVerf, `${TEXTOS_API['js-form-text-7']}`);
                allInputsValid = false;
            }
            //Check both phone numbers match
            if (InputTelef.val() !== InputTelefVerf.val()) {
                displayErrorMessage(DivPhone, `${TEXTOS_API['js-form-text-8']}`);
                displayErrorMessage(DivVerifyPhone, `${TEXTOS_API['js-form-text-8']}`);
                allInputsValid = false;
            }

            // Check if the first phone number is valid by country code with library
            let itiInstanceTelef = $(InputTelef).data('itiInstance');
            if (itiInstanceTelef && itiInstanceTelef.isValidNumber()) {
                // First phone number is valid
            } else {
                displayErrorMessage(DivPhone, `${TEXTOS_API['js-form-text-9']}`);
                allInputsValid = false;
            }

            // Check if the second phone number is valid by country code with library
            let itiInstanceTelefVerf = $(InputTelefVerf).data('itiInstance');
            if (itiInstanceTelefVerf && itiInstanceTelefVerf.isValidNumber()) {
                // Second phone number is valid
            } else {
                displayErrorMessage(DivVerifyPhone, `${TEXTOS_API['js-form-text-9']}`);
                allInputsValid = false;
            }

            // Si todo OK pasa a la siguiente
            if (allInputsValid) {
                //Jump page if all hidden
                if (ENABLED_PAGES.seccion5 === true) {
                    seccion4.hide();
                    seccion5.show();
                } else if (ENABLED_PAGES.seccion5 === false) {
                    seccion4.hide();
                    seccion6.show();
                    ResumenPage();
                }
            }
        });

        //Button 5: Comprobar nacionalidad. R Nacionalidad y caducidad tarjeta
        $(NextButon5).click(function () {

            let inputsToCheck = inputsToCheckButton5// Start with InputNacionalidad already included


            // Array de inputs que verificar
            let allInputsValid = true;
            // Si todo OK pasa a la siguiente

            // Check each input
            inputsToCheck.forEach(function (input) {

                //Validar regex campos individuales
                var func_validate = function (text_input) {
                    return true
                };
                //Comprobar si RNacionalidad se ha seleccionado
                if (input === InputRNacionalidad) {
                    func_validate = validateRNacionalidad
                }

                //Comprobar si CSV doc se ha seleccionado
                if (input === InputCSVdoc) {
                    func_validate = ValidateCSVdoc
                }

                //Hacer validación de los campos
                if (input.val().trim() === '') {
                    displayErrorMessage(input, `${TEXTOS_API['js-form-text-5']}`); // "Este campo es obligatorio"
                    // Muestra mensaje de error en la funcion displayErrorMessage donde inputElement = input
                    allInputsValid = false;
                } else if (!func_validate(input.val())) {
                    displayErrorMessage(input, `${TEXTOS_API['js-form-text-10']}`); // "El formato es incorrecto"
                    // Muestra mensaje de error en la funcion displayErrorMessage donde inputElement = input
                    allInputsValid = false;

                } else {
                    // If input is not empty, remove the error message
                    $(input).next('.error-message-form').remove();
                }
            });

            // Si todo OK pasa a la siguiente y crea el texto del resumen
            if (allInputsValid) {
                seccion5.hide();
                seccion6.show();
                ResumenPage();
            }
        });



        // --> Logic when going back on the form
        //Botones hacia atrás. Ocultra y muestra secciones
        $(BackButon1).click(function () {
            seccion1.show();
            seccion2.hide();
        });

        $(BackButon2).click(function () {
            seccion2.show();
            seccion3.hide();
        });

        $(BackButon3).click(function () {
            seccion3.show();
            seccion4.hide();
        });

        $(BackButon4).click(function () {
            seccion4.show();
            seccion5.hide();
        });

        $(BackButon5).click(function () {
            //Jump page if all hidden
            if (ENABLED_PAGES.seccion5 === true) {
                seccion5.show();
                seccion6.hide();
            } else if (ENABLED_PAGES.seccion5 === false) {
                seccion4.show();
                seccion6.hide();
            }
        });






        // --> Various other functionalities
        //Poner read only a los inputs con desplegable fechas para que no salga el teclado en el movil
        $(document).ready(function () {
            // Select the input field by its ID and make it readonly
            $('#start-date').prop('readonly', true);
            $('#end-date').prop('readonly', true);
            $('#exclude-days').prop('readonly', true);
            $('#input-fecha-nacimiento').prop('readonly', true);
        });

        //Bloquear zoom al darle doble click en los moviles
        const input = document.getElementById('myInput');
        if (input) {
            // Event listener para el doble click
            input.addEventListener('dblclick', function (event) {
                // Prevent default behavior
                event.preventDefault();

                // Remove focus from the input element
                input.blur();
            });
        }





    });
});




// --> Decide which items to check in the form based on config form
function DetermineInputsToCheck() {


    $('#asterisk-apellido2').hide();
    $('#asterisk-fecha-nacimiento').hide();
    $('#asterisk-lista-paises').hide();
    $('#asterisk-resolucion-nacionalidad').hide();
    $('#asterisk-csv-doc').hide();
    $('#asterisk-caducidad-tarjeta').hide();

    // Function to remove specific items from the array
    function removeItemsFromArray(array, itemsToRemove) {
        itemsToRemove.forEach(item => {
            const index = array.indexOf(item);
            if (index !== -1) {
                array.splice(index, 1);
            }
        });
    }
    // Remove specific items
    removeItemsFromArray(inputsToCheckButton2, [InputApellido2, InputFNacimiento]);


    // -> Button 2
    inputsToCheckButton2.push(InputNombre, InputApellido1);
    //If second name is true
    if (CONFIG_FORM.lastname2 === true) {
        inputsToCheckButton2.push(InputApellido2);
        $('#asterisk-apellido2').show();

    }
    //If birth date is true
    if (CONFIG_FORM.fecha_nacimiento === true) {
        inputsToCheckButton2.push(InputFNacimiento);
        $('#asterisk-fecha-nacimiento').show();

    }


    // -> Button 5
    if (CONFIG_FORM.nacionalidad.length > 0) {
        inputsToCheckButton5.push(InputListaPaises);
        $('#asterisk-lista-paises').show();
    }

    if (CONFIG_FORM.resolucion_nacionalidad === true) {
        inputsToCheckButton5.push(InputRNacionalidad);
        $('#asterisk-resolucion-nacionalidad').show();

    }

    if (CONFIG_FORM.csv_nacionalidad === true) {
        inputsToCheckButton5.push(InputCSVdoc);
        $('#asterisk-csv-doc').show();

    }

    if (CONFIG_FORM.caducidad_documento === true) {
        inputsToCheckButton5.push(CaducidadTarjeta);
        $('#asterisk-caducidad-tarjeta').show();

    }


}







// --> Construct which items are visible in the form based on config form
//Decide which inputs and divs to show based on config form
function InputsToShow() {

    // -> SECTION: 3 - Type of document
    // Assuming CONFIG_FORM has an iso3166 property to match against
    const iso3166 = CONFIG_FORM.iso3166;
    // Filter the documentos_admitidos array to find the matching iso3166_1_alpha2
    const matchedDocumentos = CONFIG_FORM.documentos_admitidos.filter(doc => doc.iso3166_1_alpha2 === iso3166);

    const firstDocumentadmted = matchedDocumentos[0].type;

    if (firstDocumentadmted === 'PASAPORTE') {
        selectFormDocPasaporte.addClass('boton-documento-selected');
    } else if (firstDocumentadmted === 'NIE') {
        selectFormDocNIE.addClass('boton-documento-selected');
    } else if (firstDocumentadmted === 'DNI') {
        selectFormDocDNI.addClass('boton-documento-selected');
    }

    // Iterate over the matched documents and show the elements based on their type
    matchedDocumentos.forEach(doc => {
        const type = doc.type;
        $(`#select-${type}-form`).show();
    });


    // -> SECTION: 5 - Specific search itmes
    DivJuraNacionalidad.toggle(CONFIG_FORM.resolucion_nacionalidad || false);
    DivCSVdoc.toggle(CONFIG_FORM.csv_nacionalidad || false);
    DocResNacionalidadPDF.toggle(CONFIG_FORM.adjunto_resolucion_nacionalidad || false);
    DivCaducidadTarjeta.toggle(CONFIG_FORM.caducidad_documento || false);




}
// --> Not in use at the moment
//Decide which pages to show depending on config form
function ShowPagesCalculate() {


    //Check Section 5
    if (DivListaPaises.is(':hidden') && DivJuraNacionalidad.is(':hidden') && DivCSVdoc.is(':hidden') && DivCaducidadTarjeta.is(':hidden') && DocResNacionalidadPDF.is(':hidden')) {
        $('#Secciones-Form-5').hide();
        PageCountingTotal = 4
        ENABLED_PAGES.seccion5 = false
    }


    //Change page numeration based on quantity of pages
    PageNumerationCalculation();
}
// --> Not in use at the moment
//Recalculate page numeration based on ShowPagesCalculate()
function PageNumerationCalculation() {
    $("#pagecount1").text("1/" + PageCountingTotal);
    $("#pagecount2").text("2/" + PageCountingTotal);
    $("#pagecount3").text("3/" + PageCountingTotal);
    $("#pagecount4").text("4/" + PageCountingTotal);
    $("#pagecount5").text("5/" + PageCountingTotal);

}








// --> Build last page resume
function ResumenPage() {

    //Reset to default show all
    $('#text-resume-birthdate').show();
    $('#text-resumen-nacionalidad').show();
    $('#text-resumen-resolucion-nacionalidad').show();
    $('#text-resumen-csv').show();


    //Crear texto resumen
    $('#resumen-servicio').text(' ' + INPUT_JSON.idbuscadores[0].nombre_servicio);
    $('#resumen-oficina').text(' ' + INPUT_JSON.idbuscadores[0].nombre_oficina);
    $('#resumen-provincia').text(' ' + INPUT_JSON.idbuscadores[0].nombre_provincia);
    $('#resumen-nombre-completo').text(' ' + $('#input-nombre').val() + ' ' + $('#input-apellido1').val() + ' ' + $('#input-apellido2').val());
    $('#resumen-documento-identidad').text(' ' + $('#input-documento').val());
    $('#resumen-fecha-nacimiento').text(' ' + $('#input-fecha-nacimiento').val());
    $('#resumen-nacionalidad').text(' ' + $('#input-lista-paises option:selected').text());
    $('#resumen-resolucion-nacionalidad').text(' ' + $('#input-resolucion-nacionalidad').val());
    $('#resumen-csv').text(' ' + $('#input-csv-doc').val());
    $('#resumen-telefono').text(' ' + $('#input-telefono').val());
    $('#resumen-correo').text(' ' + $('#input-correo').val());
    $('#resumen-Fmin').text(' ' + $('#start-date').val());
    $('#resumen-Fmax').text(' ' + $('#end-date').val());
    // Convert cents to dollars and format with commas and two decimal places
    var formatted_price = ((CONFIG_FORM.precio) / 100).toLocaleString('es-ES', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    $('#end-form-text-precio').text(formatted_price);

    //if inputs are not empty, show them
    if ($('#input-fecha-nacimiento').val() === '') {
        $('#text-resume-birthdate').hide();
    }
    if ($('#input-lista-paises').val() === null) {
        $('#text-resumen-nacionalidad').hide();
    }
    if ($('#input-resolucion-nacionalidad').val() === '') {
        $('#text-resumen-resolucion-nacionalidad').hide();
    }
    if ($('#input-csv-doc').val() === '') {
        $('#text-resumen-csv').hide();
    }
}



// --> Create dnamic error messages in the form
function displayErrorMessage(inputElement, message) {
    // Remove any existing error message
    $(inputElement).next('.error-message-form').remove();

    // Create error message element if input is empty
    const errorMessage = $('<div>').addClass('error-message-form').text(message);

    // Insert error message after the input element
    $(inputElement).after(errorMessage);

}



// --> Validate inputs of the form
//Validate DNI
// https://donnierock.com/2011/11/05/validar-un-dni-con-javascript/
function validateDNI(dni) {
    if (/^\d{8}[a-zA-Z]$/.test(dni)) {
        var n = dni.substr(0, 8);
        var c = dni.substr(8, 1);
        return c.toUpperCase() === 'TRWAGMYFPDXBNJZSQVHLCKET'.charAt(n % 23);
        // DNI correcto ?
    }
    return false;
    // DNI incorrecto
}
//Validate NIE
// https://trellat.es/funcion-para-validar-dni-o-nie-en-javascript/
function validateNIE(nie) {
    var numero, lett, letra;
    var expresion_regular_dni = /^[XYZxyz]\d{7}[A-Za-z]$/;

    if (!expresion_regular_dni.test(nie)) {
        return false;
    }

    numero = nie.substr(0, nie.length - 1);

    numero = numero.replace('X', 0);
    numero = numero.replace('x', 0);
    numero = numero.replace('Y', 1);
    numero = numero.replace('y', 1);
    numero = numero.replace('Z', 2);
    numero = numero.replace('z', 2);

    lett = nie.substr(nie.length - 1, 1).toUpperCase();
    numero = numero % 23;
    letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
    letra = letra.substring(numero, numero + 1);

    return letra === lett;
}
//Validar Resolución de nacionalidad
function validateRNacionalidad(RN) {
    // Define regular expression for RN validation
    var expresion_regular_rn = /^R\d{4,9}\/20\d{2}$/;

    // Check if RN matches the regular expression and has a maximum length of 14 characters
    if (!expresion_regular_rn.test(RN) || RN.length > 14) {
        return false; // RN format is invalid
    }

    return true; // RN format is valid
}
// Validar csv
function ValidateCSVdoc(CSVd) {
    // Define regular expression for PF validation
    var expresion_regular_pf = /^PF:[^\s]*?-.*?-.*?-.*$/;

    // Check if PF matches the regular expression and has a minimum length of 16 characters
    if (!expresion_regular_pf.test(CSVd) || CSVd.length < 16) {
        return false; // PF format is invalid
    }

    return true; // PF format is valid
}
