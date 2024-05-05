// Declare in a global scope
var INPUT_JSON = null

var CONFIG_FORM = {
    'resolucion_nacionalidad': false,
    'caducidad_tarjeta': false,
    'documentos_admitibles': ['pasaporte', 'dni', 'nie'],
    'servicio_blocked': false
};


var PickerExcluidosDias = null


$(document).ready(function () {


    //Variables del fornulario
    {
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
        var InputFMin = $('#checkin');
        var InputFMax = $('#checkout');
        //var InputFechaExclusion = $('#input-fecha-exclusion');
        var InputNombre = $('#input-nombre');
        var InputApellido1 = $('#input-apellido1');
        var InputFNacimiento = $('#input-fecha-nacimiento');
        var InputNumeroDocumento = $('#input-documento');
        var InputCorreo = $('#input-correo');
        var InputCorreoVerf = $('#input-confirmar-correo');
        var InputTelef = $('#input-telefono');
        var InputTelefVerf = $('#input-confirmar-telefono');
        var InputNacionalidad = $('#input-lista-paises');
        var InputRNacionalidad = $('#input-resolucion-nacionalidad');

        //Divs del formulario
        var DivJuraNacionalidad = $('#clientes-jura-nacionalidad');
        var DivCaducidadTarjeta = $('#clientes-caducidad-tarjeta');

        //Fecha exclusion
        var TextFechaExclusion = $('#texto-fechas-exclusion');

        //Generar random id para el formulario
        var RandomNumber = Math.floor(Math.random() * 10000).toString(36);
        var DateNow = Date.now().toString(36);

        var RandomStringID = (DateNow + '-' + RandomNumber);

        //Lenguaje del navegador
        var LangBrowser = navigator.language || navigator.userLanguage;

    }
    //Ocultrar seccion

    //Ocultar secciones divs (temporal)
    seccion1.show();
    seccion2.hide();
    seccion3.hide();
    seccion4.hide();
    seccion5.hide();
    seccion6.hide();

    //Cargar datos del buscador
    var urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('INPUT_JSON')) {
        INPUT_JSON = JSON.parse(decodeURIComponent(atob(urlParams.get('INPUT_JSON'))));
        // Stringify the JSON data
        var inputData = JSON.stringify(INPUT_JSON.idbuscadores);

        //GET INPUT_JSON para mostrar secciones
        $.ajax({
            url: "https://n8n.sacacitas.es/webhook/0a372cab-4efe-4fa0-b471-545e93719107",
            type: "POST",
            contentType: "application/json",
            // Specify content type as JSON
            dataType: 'json',
            data: inputData,
            // Send the JSON data
            success: function (response) {
                // merge two dict
                CONFIG_FORM = Object.assign(CONFIG_FORM, response);

                execute_parte_dinamica_form();
                toggleDocumentosAdmitibles();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error("Error:", errorThrown);
            }
        });
        console.log('CONFIG_FORM', CONFIG_FORM);
    } else {
        alert('Hubo un problema al procesar la solicitud, acceda al formulario desde el buscador de https://sacacitas.es, Si el problema persiste, contacte con nosotros.');
    }
    //Mostrar secciones dinámicas
    function execute_parte_dinamica_form() {
        // Parte dinámica del formulario
        //Resolucion nacionalidad
        DivJuraNacionalidad.toggle(CONFIG_FORM.resolucion_nacionalidad || false);
        //$('#input-resolucion-nacionalidad').prop('required', CONFIG_FORM.resolucion_nacionalidad || false);

        DivCaducidadTarjeta.toggle(CONFIG_FORM.caducidad_tarjeta || false);
        //$('#input-caducidad-tarjeta').prop('required', CONFIG_FORM.caducidad_tarjeta || false);

        if (CONFIG_FORM.servicio_blocked === true) {
            $('#bloque-asilo-primera-vez-form').show();
            seccion1.hide();
        }
    }

    //Funcionalidades de cada sección del formulario 
    {
        //SECTION: 1 - Escoger fechas máx min
        //Easepicker fechas max min
        const PickerRangoBusqueda = new easepick.create({
            element: "#checkin",
            css: ["https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.css", 'https://documentos.sacacitas.es/formulario-inicio.css',],
            zIndex: 999999999,
            lang: "es-ES",
            format: "DD MMMM YYYY",
            grid: 2,
            calendars: 2,
            readonly: false,
            inline: false,
            header: "",
            AmpPlugin: {
                dropdown: {
                    months: true,
                    minYear: 2024,
                    maxYear: 2026
                },
                resetButton: false,
                darkMode: false
            },
            RangePlugin: {
                elementEnd: "#checkout",
                repick: false,
                delimiter: "-",
                locale: {
                    zero: "cero",
                    one: "días",
                    two: "dos",
                    few: "unos cuantos",
                    many: "muchos",
                    other: "días"
                }
            },
            LockPlugin: {
                minDate: (DateNow),
                selectForward: true,
                minDays: 3
            },
            plugins: ["AmpPlugin", "RangePlugin", "LockPlugin"]

        })

        //Días de exclusión
        PickerExcluidosDias = new Litepicker({
            element: document.getElementById('exclude-days'),
            plugins: ['multiselect', 'mobilefriendly'],
            minDate: new Date(),
            numberOfColumns: 2,
            numberOfMonths: 2,
            lang: 'es-ES',
            buttonText: {
            apply: 'Aplicar',
            cancel: 'Borrar',
            },
            tooltipText: {
            one: 'día',
            other: 'días'
            },
            setup: function (picker) {
                picker.on('button:apply', function () {
                    document.getElementById('exclude-days').value = picker.multipleDatesToString();
                });
            }
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
        //Easepicker fecha nacimiento
        const PickerNacimiento = new easepick.create({
            element: "#input-fecha-nacimiento",
            css: ["https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.css", 'https://documentos.sacacitas.es/formulario-inicio.css',],
            zIndex: 999999999,
            lang: "es-ES",
            format: "DD MMMM YYYY",
            readonly: false,
            AmpPlugin: {
                dropdown: {
                    months: true,
                    years: true,
                    minYear: 1930,
                    maxYear: 2028
                },
                resetButton: false,
                darkMode: false
            },
            LockPlugin: {
                maxDate: (DateNow)
            },
            plugins: ["AmpPlugin", "LockPlugin"]
        })

        //SECTION: 3 - Documento identidad
        //Seleccionar botones de selección de tipo de documento. DNI, NIE, Pasaporte
        var selectFormDocPasaporte = $('#select-pasaporte-form');
        var selectFormDocNIE = $('#select-nie-form');
        var selectFormDocDNI = $('#select-dni-form');

        selectFormDocPasaporte.add(selectFormDocNIE).add(selectFormDocDNI).hide();

        function toggleDocumentosAdmitibles() {

            CONFIG_FORM.documentos_admitibles.forEach(elem => {
                $(`#select-${elem}-form`).show();
            }
            );

        }

        selectFormDocPasaporte.addClass('boton-documento-selected');

        var options_documento = $('.div-documentos-formulario').children('a')

        options_documento.click(function () {
            options_documento.removeClass('boton-documento-selected')
            $(this).addClass('boton-documento-selected');
        });

        //Mostrar y ocultar input fechas exclusión
        $('#texto-documentos-identidad').click(function () {
            // Toggle the visibility of InputFechaExclusion
            $('#texto-more-info-variosdocs').toggle();
        });

        //SECTION: 5 - Nacionalidad, R Nacionalidad y caducidad tarjeta
        //Lista desplegable de paises
        var PaisesSelect = document.getElementById('input-lista-paises');
        // Replace with the actual ID of your select element

        // Añadir un elemento por defecto
        var defaultOption = document.createElement('option');
        defaultOption.value = '';
        // Set the value to an empty string or a value that is not present in the array
        defaultOption.text = 'Indica tu nacionalidad';
        defaultOption.disabled = true;
        // Make this option disabled
        defaultOption.selected = true;
        // Make this option selected by default
        PaisesSelect.add(defaultOption);

        // Crear lista en el select
        // list_paises = window.iso3166.iso31661.sort((a,b)=>a.name.localeCompare(b.name)).
        list_paises = ["AFGANISTAN", "ALBANIA", "ALEMANIA", "ANDORRA", "ANGOLA", "ANGUILLA", "ANTIGUA Y BARBUDA", "ANTILLAS NL.", "APATRIDA", "ARABIA SAUDI", "ARGELIA", "ARGENTINA", "ARMENIA", "ARUBA", "AUSTRALIA", "AUSTRIA", "AZERBAYAN", "BAHAMAS", "BAHREIN", "BANGLADESH", "BARBADOS", "BELGICA", "BELICE", "BENIN", "BHUTAN", "BIELORRUSIA O BELARUS", "BOLIVIA", "BOSNIA-HERZEGOVINA", "BOTSWANA", "BRASIL", "BRUNEI DARUSSALAM", "BULGARIA", "BURKINA FASO", "BURUNDI", "CABO VERDE", "CAMBOYA", "CAMERUN", "CANADA", "CENTROAFRICA REPUBLICA", "CHAD", "CHILE", "CHINA", "CHIPRE", "COLOMBIA", "COMORES", "CONGO BRAZZAVILLE", "COREA, REP. POP. DEMOC.", "COREA, REPUBLICA", "COSTA DE MARFIL", "COSTA RICA", "CROACIA", "CUBA", "DINAMARCA", "DJIBOUTI", "DOMINICA", "DOMINICANA REPUBLICA", "ECUADOR", "EEUU", "EGIPTO", "EL SALVADOR", "EL VATICANO", "EMIRATOS ARABES UNIDOS", "ERITREA", "ESLOVAQUIA", "ESLOVENIA", "ESPAÑA", "ESTONIA", "ETIOPIA", "FIDJI", "FILIPINAS", "FINLANDIA", "FRANCIA", "GABON", "GAMBIA", "GEORGIA", "GHANA", "GRANADA REPUBLICA", "GRECIA", "GUATEMALA", "GUAYANA", "GUINEA ECUATORIAL", "GUINEA REPUBLICA", "GUINEA-BISSAU", "HAITI", "HOLANDA", "HONDURAS", "HUNGRIA", "INDIA", "INDONESIA", "IRAK", "IRAN", "IRLANDA", "ISLANDIA", "ISLAS MARSCHALL", "ISRAEL", "ITALIA", "JAMAICA", "JAPON", "JORDANIA", "KAZAJSTAN", "KENIA", "KIRGUISTAN", "KIRIBATI", "KUWAIT", "LAOS", "LAS MALDIVAS", "LESOTHO", "LETONIA", "LIBANO", "LIBERIA", "LIBIA", "LIECHTENSTEIN", "LITUANIA", "LUXEMBURGO", "MACAO", "MACEDONIA", "MADAGASCAR", "MALASIA", "MALASIA - GRAN BRETAÑA", "MALAWI", "MALI", "MALTA", "MARRUECOS", "MAURICIO", "MAURITANIA", "MEJICO", "MICRONESIA", "MOLDAVIA", "MONACO", "MONGOLIA", "MONTENEGRO", "MOZAMBIQUE", "MYANMAR", "NAMIBIA", "NAURU", "NEPAL", "NICARAGUA", "NIGER", "NIGERIA", "NORUEGA", "NUEVA ZELANDA", "OMAN", "PAKISTAN", "PALESTINA EONU", "PANAMA", "PAPUA NUEVA GUINEA", "PARAGUAY", "PERU", "POLONIA", "PORTUGAL", "PUERTO RICO", "QATAR", "REINO UNIDO", "REP. DEMOCRATICA DEL CONGO (EX-ZAIRE)", "REPUBLICA CHECA", "REUNION-COMO", "RUANDA", "RUMANIA", "RUSIA", "SALOMON", "SAMOA OCCIDENTAL", "SAN CRISTOBAL Y NEVIS", "SAN MARINO", "SAN VICENTE", "SANTA LUCIA", "SANTO TOME Y PRINCIPE", "SEICHELLES", "SENEGAL", "SENEGAMBIA", "SERBIA", "SIERRA LEONA", "SINGAPUR", "SIRIA", "SOMALIA", "SRI LANKA", "SUDAFRICA", "SUDAN", "SUECIA", "SUIZA", "SURINAM", "SWAZILANDIA", "TADJIKISTAN", "TAIWAN", "TANZANIA", "THAILANDIA", "TIMOR ORIENTAL", "TOGO", "TONGA", "TRINIDAD Y TOBAGO", "TUNEZ", "TURKMENIA", "TURQUIA", "TUVALU", "UCRANIA", "UGANDA", "URUGUAY", "UZBEKISTAN", "VANUATU", "VENEZUELA", "VIETNAM", "YEMEN", "ZAMBIA", "ZIMBABWE",]
        list_paises.sort((a, b) => a.localeCompare(b)).forEach(elem => {
            var optionElement = document.createElement('option');
            //optionElement.value = elem.alpha3;
            //optionElement.text = elem.name;

            optionElement.value = elem;
            optionElement.text = elem;
            PaisesSelect.add(optionElement);
        }
        );

        const PickerCadTarjeta = new easepick.create({
            element: "#input-caducidad-tarjeta",
            css: ["https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.css", 'https://documentos.sacacitas.es/formulario-inicio.css',],
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

        //6. Finalizar y enviar a backend los datos
        $('#formulario_ID').submit(function (event) {
            // Prevent the default form submission behavior
            event.preventDefault();

            //No coge el var de fuera entonces lo vuelvo a obtener para enviarlo en el formulario
            var selected_document = $('.div-documentos-formulario').find('.boton-documento-selected').attr('id')

            //Dejar bonito el document type
            //Poner datos del selected document bonito 
            if (selected_document === 'select-pasaporte-form') {
                var NiceSelected_document = 'PASAPORTE'
            } else if (selected_document === 'select-dni-form') {
                var NiceSelected_document = 'DNI'
            } else if (selected_document === 'select-nie-form') {
                var NiceSelected_document = 'NIE'
            }


            $('#gif-cargando-boton-finalizar').show();

            // Gather form data
            var formData = {
                idbuscadores: INPUT_JSON.idbuscadores,
                Fmin: $('#checkin').val(),
                Fmax: $('#checkout').val(),
                dias_excluidos: PickerExcluidosDias.multipleDatesToString() === '' ? [] : PickerExcluidosDias.multipleDatesToString().split(','),
                Nombre: $('#input-nombre').val(),
                Apellido1: $('#input-apellido1').val(),
                Apellido2: $('#input-apellido2').val(),
                // Fixed typo here
                Fnacimiento: $('#input-fecha-nacimiento').val(),
                SelectedDocument: NiceSelected_document,
                NDocumento: $('#input-documento').val(),
                Correo: $('#input-correo').val(),
                Telefono: $('#input-telefono').val(),
                Pais: $('#input-lista-paises').val(),
                RNacionalidad: $('#input-resolucion-nacionalidad').val(),
                CaducidadTarjeta: $('#input-caducidad-tarjeta').val(),
                RandomStringID: RandomStringID,
                LangBrowser: LangBrowser,
                gclid: INPUT_JSON.gclid
            };

            // Send POST request
            $.ajax({
                type: 'POST',
                url: 'https://n8n.sacacitas.es/webhook/d34bf08d-32d8-4956-8dc4-9e1d676bb5fa434-formulario-recibido-new-form',
                data: JSON.stringify(formData),
                // Send form data using the 'data' property
                dataType: 'json',
                contentType: 'application/json',
                success: function (response) {
                    // Handle successful response
                    // Here, response contains the data sent back by the server

                    // Check if ID_publico exists in the response
                    if (response.ID_publico) {
                        // Use the ID_publico property
                        var publicItemId = response.ID_publico;
                    }

                    // Redirect to a new page
                    window.location.href = 'https://www.sacacitas.es/link?r='+publicItemId;
                },
                error: function (xhr, status, error) {
                    // Handle error response
                    console.error('Form submission failed');

                    // Send logs or data if HTTP request fails
                    $.ajax({
                        type: 'POST',
                        url: 'https://n8n.sacacitas.es/webhook-test/1273a5d4-5b9e-4826-94ab-04c5bbeedfad-error-formulario',
                        data: JSON.stringify({error: error}),
                        dataType: 'json',
                        contentType: 'application/json',
                        success: function (response) {
                            console.log('Log sent successfully');
                        },
                        error: function (xhr, status, error) {
                            console.error('Failed to send logs');
                        }
                    });

                    $('#div-error-enviar-datos').show();
                }
            });


            // Prevent default form submission in Webflow
            return false;

        });

    }
    //Ocultrar seccion

    //Logica de los botones de siguiente y atrás        
    {
        // Funcion de mostrar mensaje de error debajo de los inputs
        function displayErrorMessage(inputElement, message) {
            // Remove any existing error message
            $(inputElement).next('.error-message-form').remove();

            // Create error message element if input is empty
            const errorMessage = $('<div>').addClass('error-message-form').text(message);

            // Insert error message after the input element        
            $(inputElement).after(errorMessage);

        }

        //Botones de siguiente. Oculta y muestra secciones de los 5 botones
        {
            //1.Verificar F Min y F Max
            $(NextButon1).click(function () {
                let inputsToCheck = [InputFMin, InputFMax];
                // Array de inputs que verificar
                let allInputsValid = true;
                // Si todo OK pasa a la siguiente

                // Check each input
                inputsToCheck.some(function (input) {
                    if (input.val().trim() === '') {
                        displayErrorMessage(InputDivFMinMax, 'Debes seleccionar un rango de fechas');
                        // Muestra mensaje de error en la funcion displayErrorMessage donde inputElement = input
                        allInputsValid = false;
                    } else {
                        // If input is not empty, remove the error message
                        $(InputDivFMinMax).next('.error-message-form').remove();
                    }
                });

                // Si todo OK pasa a la siguiente
                if (allInputsValid) {
                    seccion1.hide();
                    seccion2.show();
                }
            });

            //2.Comprobar nombre, apellido1 y input-fecha-nacimiento
            $(NextButon2).click(function () {
                let inputsToCheck = [InputNombre, InputApellido1, InputFNacimiento];
                // Array de inputs que verificar
                let allInputsValid = true;
                // Si todo OK pasa a la siguiente

                // Check each input
                inputsToCheck.forEach(function (input) {
                    if (input.val().trim() === '') {
                        displayErrorMessage(input, 'Este campo es obligatorio');
                        // Muestra mensaje de error en la funcion displayErrorMessage donde inputElement = input
                        allInputsValid = false;
                    } else {
                        // If input is not empty, remove the error message
                        $(input).next('.error-message-form').remove();
                    }
                });

                // Si todo OK pasa a la siguiente
                if (allInputsValid) {
                    seccion2.hide();
                    seccion3.show();
                }
            });

            //3.Comprobar numero de documento
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

                    if (selected_document === 'select-nie-form') {
                        func_validate = validateNIE

                    } else if (selected_document === 'select-dni-form') {
                        func_validate = validateDNI

                    }

                    if (input.val().trim() === '') {
                        displayErrorMessage(input, 'Este campo es obligatorio');
                        // Muestra mensaje de error en la funcion displayErrorMessage donde inputElement = input
                        allInputsValid = false;
                    } else if (!func_validate(input.val())) {
                        displayErrorMessage(input, 'Documento incorrecto');
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

            //4.Comprobar correo y telefono
            InputTelef.add(InputTelefVerf).keyup(function (e) {
                var prefix = '+34'
                if (this.value.substring(0, prefix.length) != prefix) {
                    $(this).val(prefix)
                }
            });
            $(NextButon4).click(function () {
                let inputsToCheck = [InputCorreo, InputCorreoVerf, InputTelef, InputTelefVerf];
                // Array de inputs que verificar
                let allInputsValid = true;
                // Si todo OK pasa a la siguiente

                // Check each input
                inputsToCheck.forEach(function (input) {
                    if (input.val().trim() === '' || !input[0].checkValidity()) {
                        input[0].reportValidity();
                        displayErrorMessage(input, 'Este campo es obligatorio');
                        // Muestra mensaje de error en la funcion displayErrorMessage donde inputElement = input
                        allInputsValid = false;
                    } else {
                        // If input is not empty, remove the error message
                        $(input).next('.error-message-form').remove();
                    }
                });

                if (InputCorreo.val() !== InputCorreoVerf.val()) {
                    displayErrorMessage(InputCorreo, 'Correos no coinciden');
                    displayErrorMessage(InputCorreoVerf, 'Correos no coinciden');
                    allInputsValid = false;
                }

                if (InputTelef.val() !== InputTelefVerf.val()) {
                    displayErrorMessage(InputTelef, 'Telefonos no coinciden');
                    displayErrorMessage(InputTelefVerf, 'Telefonos no coinciden');
                    allInputsValid = false;
                }

                // Si todo OK pasa a la siguiente
                if (allInputsValid) {
                    seccion4.hide();
                    seccion5.show();
                }
            });

            //5.Comprobar nacionalidad. R Nacionalidad y caducidad tarjeta
            $(NextButon5).click(function () {
                
                let inputsToCheck; // Declare inputsToCheck variable outside the if statement

                if (CONFIG_FORM.resolucion_nacionalidad === true) {
                    inputsToCheck = [InputNacionalidad, InputRNacionalidad];
                } else {
                    // If input is not empty, remove the error message
                    inputsToCheck = [InputNacionalidad];
                }                
                   
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

                    //Hacer validación de los campos
                    if (input.val().trim() === '') {
                        displayErrorMessage(input, 'Este campo es obligatorio');
                        // Muestra mensaje de error en la funcion displayErrorMessage donde inputElement = input
                        allInputsValid = false;
                    } else if (!func_validate(input.val())) {
                        displayErrorMessage(input, 'Resolución de nacionalidad incorrecta');
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

                    //Crear texto resumen
                    $('#resumen-servicio').text(INPUT_JSON.idbuscadores[0].nombre_oficina);
                    $('#resumen-oficina').text(INPUT_JSON.idbuscadores[0].nombre_servicio);
                    $('#resumen-provincia').text(INPUT_JSON.idbuscadores[0].nombre_provincia);
                    $('#resumen-nombre-completo').text($('#input-nombre').val() + ' ' + $('#input-apellido1').val() + ' ' + $('#input-apellido2').val());
                    $('#resumen-documento-identidad').text($('#input-documento').val());
                    $('#resumen-fecha-nacimiento').text($('#input-fecha-nacimiento').val());
                    $('#resumen-nacionalidad').text($('#input-lista-paises').val());
                    $('#resumen-telefono').text($('#input-telefono').val());
                    $('#resumen-correo').text($('#input-correo').val());
                    $('#resumen-Fmin').text($('#checkin').val());
                    $('#resumen-Fmax').text($('#checkout').val());
                    // Convert cents to dollars and format with commas and two decimal places
                    var formatted_price = ((CONFIG_FORM.precio) / 100).toLocaleString('es-ES', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });
                    $('#end-form-text-precio').text(formatted_price);

                }
            });
        }

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
            seccion5.show();
            seccion6.hide();
        });
    }
    //Ocultrar seccion

    //Funcionalidades varias 
    {
        //Poner read only al input de fecha max para que no salga el teclado en el movil
        $(document).ready(function () {
            // Select the input field by its ID and make it readonly
            $('#checkin').prop('readonly', true);
            $('#checkout').prop('readonly', true);
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

    }
    //Ocultrar seccion

});

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
    var expresion_regular_rn = /^R\S{0,13}20\d{2}$/;

    // Check if RN matches the regular expression and has a maximum length of 14 characters
    if (!expresion_regular_rn.test(RN) || RN.length > 14) {
        return false; // RN format is invalid
    }

    return true; // RN format is valid
}
