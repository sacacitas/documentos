$(document).ready(function () {

    // Get the 'referencia' parameter from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const referencia = urlParams.get('r');

    // URLs of your JSON files
    const json_categorias = 'https://documentos.sacacitas.es/categorias_servicios.json';
    const json_precios_citas = 'https://documentos.sacacitas.es/precios_citas.json';

    function loadJSON(url) {
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .catch(error => {
                console.error('Error loading JSON:', error);
                throw error;
            });
    }

    // Fetch JSON data asynchronously after the main content has loaded
    Promise.all([loadJSON(json_categorias), loadJSON(json_precios_citas)])

        .then(dataArray => {
            // Handle your JSON data here
            const [jsonData1, jsonData2] = dataArray;

            // Buscar el oficina_servicio en el JSON 1
            let parentIDofIdoficinaIdservicio = null;
            let idoficina_idservicio = null;

            // Iterate through the JSON data loaded from jsonUrl1
            for (const parentKey in jsonData1) {
                const parentData = jsonData1[parentKey];
                idoficina_idservicio = parentData.id_oficina + '_' + parentData.id_servicio;

                // Check if the parentIdoficinaIdservicio matches the idoficina_idservicio
                if (idoficina_idservicio === idoficina_idservicio) {
                    // Set the variable to the parent key
                    parentIDofIdoficinaIdservicio = parentKey;
                    break; // Assuming idoficina_idservicio is unique, you can stop the iteration
                }
            }

            // Check if 'referencia' is present in the URL
            if (referencia) {
                // Construct the URL with the referencia parameter
                var apiUrl = `https://panelaws.sacacitas.es/public/cola/resumen?id_publico=${referencia}`;

                const DEFAULT_TIMEZONE = 'Europe/Madrid';

                // Fetch data from the JSON endpoint
                $.ajax({
                    url: apiUrl,
                    method: 'GET',
                    success: function (data) {
                        // Use the data as needed
                        var public_id_front = data.public_id;
                        var servicio_nombre_front = data.servicio_nombre;
                        var id_oficina_front = data.id_oficina;
                        var oficina_nombre_front = data.oficina_nombre;
                        var provincia_front = data.provincia;
                        var date_added_front = data.date_added;
                        var state_front = data.state;
                        var date_last_checked_front = data.date_last_checked;
                        var retries_front = data.retries;
                        var cliente_id_obfuscado_front = data.cliente_id_obfuscado;
                        var limit_max_front = data.limit_max;
                        var fecha_caducidad_front = data.limit_caducidad;
                        var precio_eur_cent_front = data.precio_eur_cent;
                        var codigo_reserva_cita_front = data.referencia_reserva;
                        var fecha_cita_reservada_front = data.fecha_cita_reservada;
                        var fecha_limite_pago_front = data.fecha_limite_pago;

                        // Fetching data from jsonUrl2 based on parentIdoficinaIdservicio
                        var precio_cita_front = jsonData2[parentIDofIdoficinaIdservicio] || 'ES_0_SINDATOS';
                        var precio_cita_front_euros = (precio_cita_front / 100);

                        // Calcular precio en euros de cents
                        var precio_cita_backend = (precio_eur_cent_front / 100);

                        // Crear fechas
                        var limit_max_date = new Date(limit_max_front);
                        var date_added = new Date(date_added_front);
                        var last_checked = new Date(date_last_checked_front);
                        var fecha_caducidad_date = new Date(fecha_caducidad_front);
                        var fecha_cita_reservada = new Date(fecha_cita_reservada_front);
                        var fecha_limite_pago = new Date(fecha_limite_pago_front);

                        //contar hacía atrás del tiempo que falta para pagar
                        const deadline = fecha_limite_pago.getTime();
                        setInterval(() => {
                            const now_time = new Date().getTime();
                            const distance = deadline - now_time;

                            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                            $('#js-timer-days').text(days);
                            $('#js-timer-hours').text(hours);
                            $('#js-timer-minutes').text(minutes);
                            $('#js-timer-seconds').text(seconds);
                        }, 1000);

                        var options = {
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false, // Use 24-hour format
                            timeZone: DEFAULT_TIMEZONE, // Madrid
                            timeZoneName: 'short'
                        };

                        //Formatear fechas a strings
                        var formattedDateAdded = date_added.toLocaleString('es-ES', options).replace(/,/g, ' -');
                        var formattedDate_cita_reservada = fecha_cita_reservada.toLocaleString('es-ES', options).replace(/,/g, ' -');
                        var formattedDate_fecha_limite_pago = fecha_limite_pago.toLocaleString('es-ES', options).replace(/,/g, ' -');
                        var formattedLimitMax = limit_max_date.toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric',
                            timeZone: DEFAULT_TIMEZONE // GMT+1
                        }).replace(/,/g, '-');

                        var hoursAndMinutesOptions = {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false, // Use 24-hour format
                            timeZone: DEFAULT_TIMEZONE, // Madrid
                            timeZoneName: 'short'
                        };
                        var date_last_checked_front_utc = last_checked.toLocaleString('es-ES', hoursAndMinutesOptions);

                        // Calculate the number of days between date_added and limit_max_date
                        var dias_caducidad_restantes = Math.floor((fecha_caducidad_date - new Date()) / (24 * 60 * 60 * 1000));

                        // Calcular número de horas buscando
                        var horas_busqueda_front = Math.floor((last_checked - date_added) / (60 * 60 * 1000));

                        //Calcular coste horas buscando
                        var coste_hora_buscando = (precio_cita_backend / horas_busqueda_front);

                        // Function to format number with dots from 'horas_busqueda_front'
                        function formatNumberWithDots(number) {
                            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                        }

                        // Reemplazar items de las variables por texto con ID's de la web
                        $('#public_id_front').text(public_id_front);
                        $('#public_id_front2').text(public_id_front);
                        $('#servicio_nombre_front').text(servicio_nombre_front);
                        $('#oficina_nombre_front').text(oficina_nombre_front);
                        $('#provincia_front').text(provincia_front);

                        // Apply class based on the state text
                        if (state_front == 'BUSCANDO') {
                            $('#boton_estado_busqueda').toggleClass('boton_busqueda_verde');
                        }
                        if (state_front == 'RESERVADO') {
                            $('#boton_estado_busqueda').toggleClass('boton_busqueda_naranja');
                        }
                        if (state_front == 'EXPIRADO' || state_front == 'CANCELADO' || state_front == 'ANULADO') {
                            $('#boton_estado_busqueda').toggleClass('boton_busqueda_rojo');
                        }
                        if (state_front == 'PAGADO') {
                            $('#boton_estado_busqueda').toggleClass('boton_busqueda_azul');
                        }

                        //Cambiar textos del link único
                        $('#state_front').text(state_front.charAt(0).toUpperCase() + state_front.substring(1).toLowerCase());
                        $('#boton_estado_busqueda').text(state_front.charAt(0).toUpperCase() + state_front.substring(1).toLowerCase());
                        $('#date_last_checked_front').text(date_last_checked_front_utc);
                        $('#retries_front').text(formatNumberWithDots(retries_front));
                        $('#cliente_id_obfuscado_front').text(cliente_id_obfuscado_front);
                        $('#limit_max_front').text(formattedLimitMax);
                        $('#date_added_front').text(formattedDateAdded);
                        $('#caducidad_busqueda').text(`Dentro de ${dias_caducidad_restantes} días`);
                        $('#horas_busqueda_front').text(horas_busqueda_front + ' h.');
                        $('#precio_cita_front').text(precio_cita_backend.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
                        $('#precio_cita_hay_que_pagar').text(precio_cita_backend.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
                        $('#coste_hora_buscando').text(coste_hora_buscando.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
                        $('#codigo-reserva-cita-reservada').text(codigo_reserva_cita_front);
                        $('#fecha-cita-reservada').text(formattedDate_cita_reservada);
                        $('#boton-fecha-limite-pago').text(formattedDate_fecha_limite_pago);

                        // Variables de los IFs
                        var divCosteHoraBuscando = $('#div-coste-hora-buscando');
                        var divHorasBuscando = $('#div-horas-buscando');
                        var divTotalBusquedas = $('#div-total-busquedas');
                        var botonCancelarLinkUnico = $('#boton-cancelar-link-unico');
                        var cuadradoPagoCita20 = $('#cuadrado-pago-cita20');
                        var divDatosCitaReservada = $('#div-datos-cita-reservada');
                        var estadoPagoCitaReservada = $('#estado-pago-cita-reservada');
                        var divCaducidadBusqueda = $('#div_caducidad_busqueda');
                        var botonEstadoBusqueda = $('#boton_estado_busqueda');
                        var divUltimaBusqueda = $('#div-ultima-busqueda');
                        var botonRenovarBusquedaCita = $('#boton-renovar-busqueda-cita');

                        //Ocultar elementos de manera predeterminada
                        divCaducidadBusqueda.hide();
                        botonCancelarLinkUnico.hide();
                        divUltimaBusqueda.hide();
                        divCosteHoraBuscando.hide();
                        cuadradoPagoCita20.hide();
                        divDatosCitaReservada.hide();
                        botonRenovarBusquedaCita.hide();

                        // Mostrar diferentes items dependiendo del estado
                        if (state_front == 'RESERVADO' && horas_busqueda_front > 48) {
                            divCosteHoraBuscando.show();
                        }
                        if (horas_busqueda_front < 24) {
                            divHorasBuscando.hide();
                        }
                        if (state_front == 'RESERVADO' && retries_front > 500) {
                            divCosteHoraBuscando.show();
                        }
                        if (state_front == 'BUSCANDO') {
                            botonCancelarLinkUnico.show();
                        }
                        if (state_front == 'RESERVADO') {
                            cuadradoPagoCita20.show();
                            divDatosCitaReservada.show();
                        }
                        if (state_front == 'PAGADO') {
                            divDatosCitaReservada.show();
                            estadoPagoCitaReservada.text('Pagado');
                        }
                        if (state_front == 'BUSCANDO') {
                            divCaducidadBusqueda.show();
                        }
                        if (state_front == 'RESERVADO') {
                            botonEstadoBusqueda.text('Cita reservada, pendiente de pagar');
                        }
                        if (state_front == 'BUSCANDO') {
                            divUltimaBusqueda.show();
                        }
                        //if (state_front == 'EXPIRADO' || state_front == 'CANCELADO' || state_front == 'ANULADO') {
                        //    botonRenovarBusquedaCita.show();
                        //}

                        //Datos para empresa factura
                        var razon_social = $('#nombre_razon_social_link_unico-2').val();
                        var datosEmpresaField = $('[data-form-datos-empresa]');

                        $("[ms-code-checkbox-input]").click(function () {
                            // Get the value of the 'ms-code-checkbox-input' attribute
                            var checkboxVal = $(this).attr('ms-code-checkbox-input');

                            // Find the corresponding element with the 'ms-code-checkbox-display' attribute and the same value
                            var displayElement = $("[ms-code-checkbox-display=" + checkboxVal + "]");

                            // If this checkbox is checked, show the corresponding element
                            if ($(this).is(":checked")) {
                                displayElement.show();
                                // Set the 'required' attribute to true for the element with the attribute 'data-form-datos-empresa'
                                //$("[data-form-datos-empresa]").setAttribute('required', true);
                                $('#tipo_empresa_link_unico').attr('required', true);
                                $('#nombre_razon_social_link_unico-2').attr('required', true);
                                $('#nif_cif_link_unico-2').attr('required', true);
                                $('#calle_link_unico-2').attr('required', true);
                                $('#codigo_postal__link_unico-2').attr('required', true);
                                $('#poblacion_link_unico').attr('required', true);
                                $('#provincia_link_unico-2').attr('required', true);

                            } else {
                                // If this checkbox is unchecked, hide the corresponding element
                                displayElement.hide();
                                // Set the 'required' attribute to false for the element with the attribute 'data-form-datos-empresa'
                                $('#tipo_empresa_link_unico').removeAttr('required');
                                $('#nombre_razon_social_link_unico-2').removeAttr('required');
                                $('#nif_cif_link_unico-2').removeAttr('required');
                                $('#calle_link_unico-2').removeAttr('required');
                                $('#codigo_postal__link_unico-2').removeAttr('required');
                                $('#poblacion_link_unico').removeAttr('required');
                                $('#provincia_link_unico-2').removeAttr('required');

                            }
                        });

                        // Al hacer clic en el botón 'boton_pagar_link_unico', se completará el formulario
                        $('#boton_pagar_link_unico_form').click(function () {
                            // Comprueba si el checkbox está marcado
                            if ($("[ms-code-checkbox-input]").is(":checked")) {
                                // Comprueba si los campos obligatorios están rellenos
                                if (datosEmpresaField.value == "") {
                                    alert("Por favor, rellena los campos obligatorios.");
                                    return false;
                                }
                            }
                        });

                        //Poner gifs según el estado de búsqueda
                        if (state_front == 'BUSCANDO') {
                            $('#gif-radar-buscando').css('display', 'block');
                        }
                        if (state_front == 'RESERVADO') {
                            $('#gif-pagar-reservado').css('display', 'block');
                        }

                        //URL administracion dinamico
                        var backendWebOficialElement = $('#backend-web-oficial');

                        if (id_oficina_front.startsWith("gobrc")) {
                            backendWebOficialElement.html('<a href="https://sede.administracionespublicas.gob.es/icpplustiej/" target="_blank">https://sede.administracionespublicas.gob.es/icpplustiej/</a>');
                        } else if (id_oficina_front.startsWith("gvarc")) {
                            backendWebOficialElement.html('<a href="https://registrocivil.gva.es/es/cita-previa" target="_blank">https://registrocivil.gva.es/es/cita-previa</a>');
                        } else if (id_oficina_front.startsWith("gobext")) {
                            backendWebOficialElement.html('<a href="https://sede.administracionespublicas.gob.es/pagina/index/directorio/icpplus" target="_blank">https://sede.administracionespublicas.gob.es/pagina/index/directorio/icpplus</a>');
                        } else if (id_oficina_front.startsWith("g7mad")) {
                            backendWebOficialElement.html('<a href="https://gestiona7.madrid.org/CTAC_CITA/registro" target="_blank">https://gestiona7.madrid.org/CTAC_CITA/registro</a>');
                        } else if (id_oficina_front.startsWith("gencat")) {
                            backendWebOficialElement.html('<a href="https://seujudicial.gencat.cat/ca/que_cal_fer/registre-civil/" target="_blank">https://seujudicial.gencat.cat/ca/que_cal_fer/registre-civil/</a>');
                        } else {
                            backendWebOficialElement.html('No hay datos de esta oficina');
                        }
                        //cambiar color al link
                        var linkElement = backendWebOficialElement.find('a');
                        linkElement.css('color', '#2C64E3');

                        //enviar id_publico al pulsar boton pagar
                        $('#id_unico_webhook').css('display', 'none');
                        $('#id_unico_webhook').attr('value', referencia);

                        // Initialize DataTable
                        $('#historial-busquedas-table').DataTable({
                            "paging": false,
                            "info": false,
                            "ordering": false,
                            "searching": false,
                            "scrollY": "200px",
                            "scrollCollapse": true
                        });

                        // Fetch historial de búsquedas
                        $.ajax({
                            url: 'https://panelaws.sacacitas.es/public/cola/verhistorial?id_publico=' + referencia,
                            method: 'GET',
                            success: function (data) {
                                // Use the data as needed
                                if (data.length > 0) {
                                    $('#historial-busquedas-table tbody').empty(); // Clear existing rows
                                    data.forEach(function (historialItem) {
                                        // Append new rows with data
                                        $('#historial-busquedas-table tbody').append(
                                            '<tr>' +
                                            '<td>' + historialItem.date_added + '</td>' +
                                            '<td>' + historialItem.state + '</td>' +
                                            '<td>' + historialItem.date_last_checked + '</td>' +
                                            '</tr>'
                                        );
                                    });
                                }
                            },
                            error: function (error) {
                                console.error('Error fetching historial de búsquedas:', error);
                            }
                        });
                    },
                    error: function (error) {
                        console.error('Error fetching data from API:', error);
                        // You may want to handle errors more gracefully
                    }
                });
            }
        })
        .catch(error => {
            // Handle errors from the Promise.all or individual fetch calls
            console.error('Error loading JSON data:', error);
        });
});
