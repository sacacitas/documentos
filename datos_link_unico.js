document.addEventListener('DOMContentLoaded', function () {

    // Get the 'referencia' parameter from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const referencia = urlParams.get('r');
  





    // IDs del JSON
    var id_oficina_front = null;
    var date_added_front = null;
    var date_last_checked_front = null;
    var retries_front = null;
    var limit_max_front = null;
    var date_min_front = null;
    var cola_dias_excluidos = null;
    var fecha_caducidad_front = null;
    var precio_eur_cent_front = null;
    var public_id_front = null;
    var servicio_nombre_front = null;
    var oficina_nombre_front = null;
    var provincia_front = null;
    var codigo_reserva_cita_front = null;
    var fecha_cita_reservada_front = null;
    var fecha_limite_pago_front = null;


    //Datos del cliente
    var clienteIdDocumento = null;
    var clienteIdType = null;
    var clienteNombre = null;
    var clienteApellido1 = null;
    var clienteApellido2 = null;
    var clienteTelefono = null;
    var clienteEmail = null;
    var clienteNacionalidad = null;
    var clienteFechaNacimiento = null;
    var clienteResolucionNacionalidad = null;
    
    //Verify email
    var EmailVerified = null;
    
    //Estados de la búsqueda
    var state_front = null;
    let previousState = null;
    var StatePendienteReason = null;
    var StatePausadoReason = null;




    //Items de la web
    // Variables de los IFs
    var botonCancelarLinkUnico = $('#boton-cancelar-link-unico');
    var cuadradoPagoCita20 = $('#cuadrado-pago-cita20');
    var divDatosCitaReservada = $('#div-datos-cita-reservada');
    var estadoPagoCitaReservada = $('#estado-pago-cita-reservada');
    var divUltimaBusqueda = $('#div-ultima-busqueda');
    var botonRenovarBusquedaCita = $('#boton-renovar-busqueda-cita');
    var textoCitaAunBuscando = $('#texto-pago-cita-aun-buscando');

    //botones
    var botonLinkUnicoBusqueda = $('#boton-link-unico-busqueda');
    var botonLinkUnicoReserva = $('#boton-link-unico-reserva');
    var botonLinkUnicoOficina = $('#boton-link-unico-oficina');
    var botonLinkUnicoDatos = $('#boton-link-unico-datos');
    var botonAjustesLinkUnico = $('#boton-link-unico-ajustes');
    var botonEstadoBusqueda = document.getElementById('boton_estado_busqueda');

    
    //Grids y divs
    var divLinkUnicoBusqueda = $('#div-busqueda-link-unico');
    var divPagoYReserva = $('#div-pago-y-reserva');
    var gridLinkUnicoOficina = $('#grid-link-unico-oficina');
    var gridLinkUnicoDatos = $('#grid-link-unico-datos');
    var gridLinkUnicoEstadistica = $('#grid-link-unico-estadistica');
    var divCaducidadBusqueda = $('#div_caducidad_busqueda');
    var divAjustesLinkUnico = $('#div-ajustes-link-unico');


    //default flags
    flag_loading_text = false;


    //Date now
    var DateNow = Date.now().toString(36);

    //Default hide
    $('#div-link-cliente-resolucion-nacionalidad').hide();










    // Function to fetch the data from the API
    function fetchDataStatic() {
        // Construct the URL with the referencia parameter
        var apiUrl = `https://n8n.sacacitas.es/webhook/38d7fbd6-0a86-4e8d-9d3b-f90b01a6923d-link-unico-data-request?id_publico=${referencia}`;
        



        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    //Mostrar error si falla el servidor
                    document.getElementById('error-message-parameter2').style.display = 'block';
                    document.getElementById('cargando-datos-link-unico').style.display = 'none';
                    throw new Error('Network response was not ok');
                }      
                return response.json();
            })
        .then(data => {
            // IDs del JSON
            id_oficina_front = data.ID_buscadores[0].id_oficina;
            date_added_front = data.fecha_cliente_creado;
            date_last_checked_front = data.date_last_checked;
            retries_front = data.retries;
            limit_max_front = data.fecha_maxima_cola;
            date_min_front = data.fecha_minima_cola;
            cola_dias_excluidos = data.cola_dias_excluidos;
            fecha_caducidad_front = data.fecha_caducidad_cola;
            precio_eur_cent_front = data.precio_centimos;
            public_id_front = data.ID_publico;
            servicio_nombre_front = data.servicio_nombre;
            oficina_nombre_front = data.oficina_nombre;
            provincia_front = data.provincia;
            codigo_reserva_cita_front = data.referencia_reserva;
            fecha_cita_reservada_front = data.fecha_cita_reservada;
            fecha_limite_pago_front = data.fecha_limite_pago;
            //Estados
            state_front = data.state_backend;
            StatePendienteReason = data.cola_pendiente_reason;
            StatePausadoReason = data.cola_pausado_reason;
            

            //Datos del cliente
            clienteIdDocumento = data.cliente_numero_documento;
            clienteIdType = data.cliente_tipo_documento;
            clienteNombre = data.cliente_nombre;
            clienteApellido1 = data.cliente_apellido1;
            clienteApellido2 = data.cliente_apellido2;
            clienteTelefono = data.cliente_telefono;
            clienteEmail = data.cliente_email;
            clienteNacionalidad = data.cliente_nacionalidad;
            clienteFechaNacimiento = data.cliente_fecha_nacimiento;
            clienteResolucionNacionalidad = data.cliente_resolucion_nacionalidad;
            //Verify email
            EmailVerified = data.cliente_correo_validated;
            
            

            
            
        })
        .then(() => {
            //Inyectar datos fijos y dinamicos al principio
            ReplaceItemsStatic ();
            ReplaceDynamicItems ();
            //Ejecutar timer para cargar datos dinámicos
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            // Handle errors and show an error message if needed
            document.getElementById('error-message-parameter2').style.display = 'block';
            document.getElementById('cargando-datos-link-unico').style.display = 'none';

        });

        console.log(state_front);
    }










    // Function to fetch the data from the API
    function fetchDataStateDynamic() {
        // Construct the URL with the referencia parameter
        var apiUrl = `https://n8n.sacacitas.es/webhook/38d7fbd6-0a86-4e8d-9d3b-f90b01a6923d-link-unico-data-request?id_publico=${referencia}`;
        

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                }
                return response.json();
            })
        .then(data => {
            //Variables
            date_last_checked_front = data.date_last_checked;
            retries_front = data.retries;
            //Estados
            state_front = data.state_backend;
            StatePendienteReason = data.cola_pendiente_reason;
            StatePausadoReason = data.cola_pausado_reason;
            
            //Verify email
            EmailVerified = data.cliente_correo_validated;
            
        })
        .then(() => {
            ReplaceDynamicItems ();

        })
        .catch(error => {
            console.error('Error fetching data:', error);
            // Handle errors and show an error message if needed
            document.getElementById('error-message-parameter2').style.display = 'block';
            document.getElementById('cargando-datos-link-unico').style.display = 'none';

        });

    }









      
    //Reemplazar items más fijos
    function ReplaceItemsStatic() {


        const DEFAULT_TIMEZONE = 'Europe/Madrid';




        // Calcular precio en euros de cents
        var precio_cita_backend = (precio_eur_cent_front / 100);

        // Crear fechas
        var date_added = new Date(date_added_front);
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

            document.getElementById('js-timer-days').innerText = days;
            document.getElementById('js-timer-hours').innerText = hours;
            document.getElementById('js-timer-minutes').innerText = minutes;
            document.getElementById('js-timer-seconds').innerText = seconds;

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
        
        //Fecha max y min formateada
        var formattedLimitMax = formatDateFromISOToDMY(limit_max_front);
        var formattedLimitMin = formatDateFromISOToDMY(date_min_front);


        var hoursAndMinutesOptions = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false, // Use 24-hour format
            timeZone: DEFAULT_TIMEZONE, // Madrid
            timeZoneName: 'short'
        };

        // Calculate the number of days between date_added and limit_max_date
        var dias_caducidad_restantes = Math.floor((fecha_caducidad_date - new Date()) / (24 * 60 * 60 * 1000));


        //Fecha nacimiento a DD.MM.YYYY
        var formatted_date_clienteFechaNacimiento = formatDateFromISOToDMY(clienteFechaNacimiento);



        // Reemplazar items de las variables por texto con ID's de la web
        document.getElementById('public_id_front2').textContent = public_id_front;
        document.getElementById('servicio_nombre_front').textContent = servicio_nombre_front;
        document.getElementById('oficina_nombre_front').textContent = oficina_nombre_front;
        document.getElementById('provincia_front').textContent = provincia_front;







        //Cambiar textos del link único
        document.getElementById('link-busqueda-fechas-min-max').textContent = 'Desde ' + formattedLimitMin + ' hasta ' + formattedLimitMax;
        
        //Si no es una fecha válida mostrar otro texto para la fecha de la búsqueda de inicio
        if ( formattedDateAdded === 'Invalid Date') {
            formattedDateAdded = 'Búsqueda aún no iniciada';
        }
        document.getElementById('date_added_front').textContent = formattedDateAdded;
        document.getElementById('caducidad_busqueda').textContent = `Dentro de ${dias_caducidad_restantes} días`;
        document.getElementById('precio_cita_front').textContent = precio_cita_backend.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        document.getElementById('precio_cita_hay_que_pagar').textContent = precio_cita_backend.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        document.getElementById('fecha-cita-reservada').textContent = formattedDate_cita_reservada;
        document.getElementById('boton-fecha-limite-pago').textContent = formattedDate_fecha_limite_pago;
        document.getElementById('correo_usuario_verify').textContent = clienteEmail;
        // Comprobar si nº referencia es= 'referencia N/A'
        if (codigo_reserva_cita_front === 'referencia N/A') {
            document.getElementById('codigo-reserva-cita-reservada').textContent = "Esta cita no requiere número de reserva";
        } else {
            // If it's not 'referencia N/A', set the text content as the value of codigo_reserva_cita_front
            document.getElementById('codigo-reserva-cita-reservada').textContent = codigo_reserva_cita_front;
        }



        //Sección datos personales del cliente
        document.getElementById('link-cliente-documento-identidad').textContent = clienteIdType + ': ' + clienteIdDocumento;
        document.getElementById('link-cliente-nacionalidad').textContent = clienteNacionalidad;
        document.getElementById('link-cliente-fecha-nacimiento').textContent = formatted_date_clienteFechaNacimiento;
        document.getElementById('link-cliente-telefono').textContent = clienteTelefono;
        document.getElementById('link-cliente-correo').textContent = clienteEmail;
        //Comprobar si está null o no el apellido 2
        var fullName = clienteNombre + ' ' + clienteApellido1 + (clienteApellido2 ? ' ' + clienteApellido2 : '');
        document.getElementById('link-cliente-nombre-completo').textContent = fullName;
        //Mostrar resolución nacionalidad si no es null
        if (clienteResolucionNacionalidad) {
            $('#div-link-cliente-resolucion-nacionalidad').show();
            $('#link-cliente-resolucion-nacionalidad').text(clienteResolucionNacionalidad);
        }



        //Ocultar elementos de manera predeterminada
        divCaducidadBusqueda.hide();
        botonCancelarLinkUnico.hide();
        divUltimaBusqueda.hide();

        cuadradoPagoCita20.hide();
        divDatosCitaReservada.hide();
        botonRenovarBusquedaCita.hide();
        
        //Ocultrar inciio busqueda si aún no se ha iniciado
        if (state_front == 'Formulario-Recibido' || state_front == 'CLIENTE-CREADO' || state_front == 'COLA-CREADA' || state_front == 'VALIDANDO-COLA' || state_front == 'ERROR-NO-CONSIGUE-BUSCAR') {
            $('#div-fecha-inicio-busqueda').hide();
        }



        $(document).ready(function () {

            //Mostrar diferentes elementos de la web según el estado de la búsqueda
            document.getElementById('id_unico_webhook').style.display = 'none';
            document.getElementById('id_unico_webhook').setAttribute('value', referencia);

            // Si todo está OK mostar link unico e info exrra
            document.getElementById('main-content1').style.display = 'block';
            document.getElementById('main-content-info-extra').style.display = 'block';
            // Si todo OK ocultar página de carga
            document.getElementById('loading-content1').style.display = 'none';



            // De manera predeterminada ocultar grids y seleccionar botón Búsqueda
            divPagoYReserva.hide();
            gridLinkUnicoOficina.hide();
            gridLinkUnicoDatos.hide();
            gridLinkUnicoEstadistica.hide();
            divAjustesLinkUnico.hide();
            botonLinkUnicoBusqueda.addClass('boton-datos-link-unico-selected');


            
            //Si la cita está reservada o pagada, mostrar el botón de reserva y datos pago
            if (state_front == 'RESERVADO' || state_front == 'PAGADO') { 
                botonLinkUnicoBusqueda.removeClass('boton-datos-link-unico-selected');
                divLinkUnicoBusqueda.hide();
                botonLinkUnicoReserva.addClass('boton-datos-link-unico-selected');
                divPagoYReserva.show();
                textoCitaAunBuscando.hide();
                

            }


            // Click event for botonLinkUnicoBusqueda
            botonLinkUnicoBusqueda.click(function () {
                divLinkUnicoBusqueda.show();
                divPagoYReserva.hide();
                gridLinkUnicoOficina.hide();
                gridLinkUnicoDatos.hide();
                gridLinkUnicoEstadistica.hide();
                divAjustesLinkUnico.hide();
                botonLinkUnicoBusqueda.addClass('boton-datos-link-unico-selected');
                botonLinkUnicoReserva.removeClass('boton-datos-link-unico-selected');
                botonLinkUnicoOficina.removeClass('boton-datos-link-unico-selected');
                botonLinkUnicoDatos.removeClass('boton-datos-link-unico-selected');
                botonAjustesLinkUnico.removeClass('boton-datos-link-unico-selected');
            });                    
        
            // Click event for botonLinkUnicoBusqueda
            botonLinkUnicoReserva.click(function () {
                divLinkUnicoBusqueda.hide();
                divPagoYReserva.show();
                gridLinkUnicoOficina.hide();
                gridLinkUnicoDatos.hide();
                gridLinkUnicoEstadistica.hide();
                divAjustesLinkUnico.hide();
                botonLinkUnicoBusqueda.removeClass('boton-datos-link-unico-selected');
                botonLinkUnicoReserva.addClass('boton-datos-link-unico-selected');
                botonLinkUnicoOficina.removeClass('boton-datos-link-unico-selected');
                botonLinkUnicoDatos.removeClass('boton-datos-link-unico-selected');
                botonAjustesLinkUnico.removeClass('boton-datos-link-unico-selected');
            });                    
        
            // Click event for botonLinkUnicoBusqueda
            botonLinkUnicoOficina.click(function () {
                divLinkUnicoBusqueda.hide();
                divPagoYReserva.hide();
                gridLinkUnicoOficina.show();
                gridLinkUnicoDatos.hide();
                gridLinkUnicoEstadistica.hide();
                divAjustesLinkUnico.hide();
                botonLinkUnicoBusqueda.removeClass('boton-datos-link-unico-selected');
                botonLinkUnicoReserva.removeClass('boton-datos-link-unico-selected');
                botonLinkUnicoOficina.addClass('boton-datos-link-unico-selected');
                botonLinkUnicoDatos.removeClass('boton-datos-link-unico-selected');
                botonAjustesLinkUnico.removeClass('boton-datos-link-unico-selected');
            });                                   
        

            // Click event for botonLinkUnicoBusqueda
            botonLinkUnicoDatos.click(function () {
                divLinkUnicoBusqueda.hide();
                divPagoYReserva.hide();
                gridLinkUnicoOficina.hide();
                gridLinkUnicoDatos.show();
                gridLinkUnicoEstadistica.hide();
                divAjustesLinkUnico.hide();
                botonLinkUnicoBusqueda.removeClass('boton-datos-link-unico-selected');
                botonLinkUnicoReserva.removeClass('boton-datos-link-unico-selected');
                botonLinkUnicoOficina.removeClass('boton-datos-link-unico-selected');
                botonLinkUnicoDatos.addClass('boton-datos-link-unico-selected');
                botonAjustesLinkUnico.removeClass('boton-datos-link-unico-selected');
            });                    
            
            // Click event for botonAjustesLinkUnico
            botonAjustesLinkUnico.click(function () {
                divLinkUnicoBusqueda.hide();
                divPagoYReserva.hide();
                gridLinkUnicoOficina.hide();
                gridLinkUnicoDatos.hide();
                gridLinkUnicoEstadistica.hide();
                divAjustesLinkUnico.show();
                botonLinkUnicoBusqueda.removeClass('boton-datos-link-unico-selected');
                botonLinkUnicoReserva.removeClass('boton-datos-link-unico-selected');
                botonLinkUnicoOficina.removeClass('boton-datos-link-unico-selected');
                botonLinkUnicoDatos.removeClass('boton-datos-link-unico-selected');
                botonAjustesLinkUnico.addClass('boton-datos-link-unico-selected');
            });                    
            


    


        });




        //Datos para empresa factura
        var razon_social = document.getElementById('nombre_razon_social_link_unico-2').value;
        var datosEmpresaField = document.querySelector('[data-form-datos-empresa]');
        
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
                document.getElementById('tipo_empresa_link_unico').setAttribute('required', true);
                document.getElementById('nombre_razon_social_link_unico-2').setAttribute('required', true);
                document.getElementById('nif_cif_link_unico-2').setAttribute('required', true);
                document.getElementById('calle_link_unico-2').setAttribute('required', true);
                document.getElementById('codigo_postal__link_unico-2').setAttribute('required', true);
                document.getElementById('poblacion_link_unico').setAttribute('required', true);
                document.getElementById('provincia_link_unico-2').setAttribute('required', true);
    
            } else {
                // If this checkbox is unchecked, hide the corresponding element
                displayElement.hide();
                // Set the 'required' attribute to false for the element with the attribute 'data-form-datos-empresa'
                document.getElementById('tipo_empresa_link_unico').removeAttribute('required');
                document.getElementById('nombre_razon_social_link_unico-2').removeAttribute('required');
                document.getElementById('nif_cif_link_unico-2').removeAttribute('required');
                document.getElementById('calle_link_unico-2').removeAttribute('required');
                document.getElementById('codigo_postal__link_unico-2').removeAttribute('required');
                document.getElementById('poblacion_link_unico').removeAttribute('required');
                document.getElementById('provincia_link_unico-2').removeAttribute('required');
                
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

        //URL administracion dinamico
        var backendWebOficialElement = document.getElementById('backend-web-oficial')

        if (id_oficina_front.startsWith("gobrc")) {
            backendWebOficialElement.innerHTML = '<a href="https://sede.administracionespublicas.gob.es/icpplustiej/" target="_blank">https://sede.administracionespublicas.gob.es/icpplustiej/</a>';
        } else if (id_oficina_front.startsWith("gvarc")) {
            backendWebOficialElement.innerHTML = '<a href="https://registrocivil.gva.es/es/cita-previa" target="_blank">https://registrocivil.gva.es/es/cita-previa</a>';
        } else if (id_oficina_front.startsWith("gobext")) {
            backendWebOficialElement.innerHTML = '<a href="https://sede.administracionespublicas.gob.es/pagina/index/directorio/icpplus" target="_blank">https://sede.administracionespublicas.gob.es/pagina/index/directorio/icpplus</a>';
        } else if (id_oficina_front.startsWith("g7mad")) {
            backendWebOficialElement.innerHTML = '<a href="https://gestiona7.madrid.org/CTAC_CITA/registro" target="_blank">https://gestiona7.madrid.org/CTAC_CITA/registro</a>';
        } else if (id_oficina_front.startsWith("gencat")) {
            backendWebOficialElement.innerHTML = '<a href="https://seujudicial.gencat.cat/ca/que_cal_fer/registre-civil/" target="_blank">https://seujudicial.gencat.cat/ca/que_cal_fer/registre-civil/</a>';
        } else {
            backendWebOficialElement.innerHTML = 'No hay datos de esta oficina';
        }
        //cambiar color al link
        var linkElement = document.getElementById('backend-web-oficial').querySelector('a');
        if (linkElement) {
            linkElement.style.color = '#2C64E3';
        }




        //Cancelar búsqueda
        // Function to make the first HTTP request
        const makeFirstRequest = () => {
            const apiUrlFirst = 'https://panelaws.sacacitas.es/public/cola/resumen?public_id_front=${public_id_front}';
            const requestOptionsFirst = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            fetch(apiUrlFirst, requestOptionsFirst)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('First response data:', data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        };

        // Function to make the second HTTP request
        const makeSecondRequest = (public_id_front, msgBusquedaCancelada) => {
            const apiUrlSecond = 'https://n8n.sacacitas.es/webhook/32a8b1d9-05dd-4ee0-a1c7-323fec2e26d1';

            const requestOptionsSecond = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    public_id_front: public_id_front,
                    msgBusquedaCancelada: msgBusquedaCancelada,
                    // Add other data properties as needed
                }),
            };

            fetch(apiUrlSecond, requestOptionsSecond)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Second response data:', data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        };

        // Trigger both requests separately on button click
        document.getElementById('boton_confirmar_cancelar_busqueda').addEventListener('click', function () {
            const msgBusquedaCanceladaInput = document.getElementById('input-cancelar-busqueda-link-unico').value;

            // Make both requests separately
            makeFirstRequest();
            makeSecondRequest(public_id_front, msgBusquedaCanceladaInput);
        });

        // Petición cancelar cita reservada
        document.getElementById('boton-cancelar-cita-reservada').addEventListener('click', function () {
            const apiUrl = 'https://n8n.sacacitas.es/webhook/0ab8f72e-48fa-4b5a-9f33-2dcb5d9a81d7';
            
            //Obtener datos del mensaje al cancelar la cita reservada
            var msgBusquedaAnulada = document.getElementById('input-razon-cancelar-cita-reservada').value;


            // Include data in the request body
            const requestBody = {
            public_id_front: public_id_front,
            msgBusquedaAnulada: msgBusquedaAnulada,
            // Add any other data properties as needed
            };

            const requestOptions = {
            method: 'POST', // or 'PUT', 'GET', etc.
            headers: {
                'Content-Type': 'application/json',
                // Add any other headers as needed
            },
            body: JSON.stringify(requestBody),
            };

            // Using the fetch API to send the HTTP request
            fetch(apiUrl, requestOptions)
            .then(response => {
                if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // Handle the successful response data here
                console.log('Response data:', data);
            })
            .catch(error => {
                // Handle errors here
                console.error('Error:', error);
            });
        });


        ReplaceAjustesDatosLinkUnico();
    }                










    //Reemplazar items que tienen que ver con el estado de la búsqueda
    function ReplaceDynamicItems() {
 

        //Función para actualizar mostrar/ocultar items si cambia el estado de la búsqueda
        function MostrarOcultarItemsSegunEstado() {
 
            //--> Reestablecer config original
            //Cosas de verificar email
            $('#block-email-verify').hide();
            //Texto debajo del estado
            $('#texto-dinamico-debajoestado').hide();
            $('#div-sub-estado').hide();
            $('#texto-sub-estado').text('Cargando...');
            $('#texto-sub-estado2').hide();
            //Cosas de sección ajustes
            $('#form_block_modificar_datos_personales').hide();
            $('#form_block_modificar_datos_busqueda').hide();
            $('#texto-info-modificar-datos-personales').show();
            $('#texto-info-modificar-datos-personales-2').show();
            //Gifs en el lateral del botón del estado
            $('#gif-radar-buscando').hide();
            $('#gif-pagar-reservado').hide();
            //Botones acciones relacionadas con el estado
            $('#boton_estado_busqueda').text('Cargando...');
            $('#boton-cancelar-link-unico').hide();
            $('#boton-renovar-busqueda-cita').hide();
            //CSS botones del estado
            $('#boton_estado_busqueda').removeClass('boton_busqueda_verde');
            $('#boton_estado_busqueda').removeClass('boton_busqueda_naranja');
            $('#boton_estado_busqueda').removeClass('boton_busqueda_azul');
            $('#boton_estado_busqueda').removeClass('boton_busqueda_rojo');
            //Items e inputs relacionados con el estado
            $('#div_caducidad_busqueda').hide();
            $('#div-ultima-busqueda').hide();
            $('#cuadrado-pago-cita20').hide();
            $('#div-datos-cita-reservada').hide();
            //Colas pausadas/pendientes que requieren acción. Ocultar datos innecesarios para mostrar botones ajustes
            $('#div-contenido-inside-bloque-busqueda').show();
            //Botones dentro del popup de ajustes
            $('#select-pasaporte-form-ajustes').show();
            $('#select-nie-form-ajustes').show();
            $('#select-dni-form-ajustes').show();





            // --> Mostrar cosas según estado
            // Bloques de la página de Ajustes. Datos personales y búsqueda
            if (state_front == 'BUSCANDO' || state_front == 'COLA-CREADA' || state_front == 'VALIDANDO-COLA') {
                $('#form_block_modificar_datos_personales').show();
                $('#form_block_modificar_datos_busqueda').show();
                $('#texto-info-modificar-datos-personales').hide();
                $('#texto-info-modificar-datos-personales-2').hide();
            }

            // Email aún no verificado
            if (!EmailVerified && !(state_front == 'EMAIL-NO-VERIFICADO')) {
                $('#block-email-verify').show();
                $('#boton_estado_busqueda').text('Email pendiente verificar');
            }

            // Estados de inicialización   
            if (state_front == 'CLIENTE-CREADO') {
                $('#boton_estado_busqueda').text('Verificando datos cliente...');
            }
            if (state_front == 'COLA-CREADA') {
                $('#boton_estado_busqueda').text('Verificando datos búsqueda...');
            }
            if (state_front == 'VALIDANDO-COLA') {
                $('#boton_estado_busqueda').text('Validando primera búsqueda...');
            }

            // Estados normales
            if (state_front == 'BUSCANDO') {
                $('#boton_estado_busqueda').text('Buscando cita');
                $('#boton_estado_busqueda').addClass('boton_busqueda_verde');
                $('#gif-radar-buscando').css('display', 'block');
                $('#boton-cancelar-link-unico').show();
                $('#div_caducidad_busqueda').show();
                $('#div-ultima-busqueda').show();
            }

            if (state_front == 'RESERVADO') {
                $('#boton_estado_busqueda').text('Cita reservada, pendiente de pagar');
                $('#boton_estado_busqueda').addClass('boton_busqueda_naranja');
                $('#gif-pagar-reservado').css('display', 'block');
                $('#cuadrado-pago-cita20').show();
                $('#div-datos-cita-reservada').show();
                //Caso excepcional de texto en sección cita reservada
                $('#texto-pago-cita-aun-buscando').hide();
            }

            if (state_front == 'PAGADO') {
                $('#boton_estado_busqueda').text('Pagado y confirmado');
                $('#boton_estado_busqueda').addClass('boton_busqueda_azul');
                $('#div-datos-cita-reservada').show();
                $('#estado-pago-cita-reservada').text('Pagado');
            }

            if (state_front == 'CANCELADO') {
                $('#boton_estado_busqueda').text('Búsqueda cancelada');
                $('#boton_estado_busqueda').addClass('boton_busqueda_rojo');
            }

            if (state_front == 'ANULADO') {
                $('#boton_estado_busqueda').text('Cita reservada anulada');
                $('#texto-pago-cita-aun-buscando').text('Cita reservada anulada');
                $('#boton_estado_busqueda').addClass('boton_busqueda_rojo');
            }
            if (state_front == 'ANULANDO-COLA') {
                $('#boton_estado_busqueda').text('Anulando cita...');
                $('#texto-pago-cita-aun-buscando').text('Anulando cita...');
                $('#boton_estado_busqueda').addClass('boton_busqueda_rojo');
            }
            if (state_front == 'EXPIRADO') {
                $('#boton_estado_busqueda').text('Búsqueda caducada');
                $('#texto-pago-cita-aun-buscando').text('Su cita no se está buscando debido a que ha caducado');
                $('#boton_estado_busqueda').addClass('boton_busqueda_rojo');
            }

            
            // Estados pendientes
            // ***Debido límite de búsquedas diarias
            if (state_front == 'PENDIENTE') {
                $('#boton_estado_busqueda').text('Pendiente de validación');
            }
            if (StatePendienteReason == 'LIMITE-BUSQUEDAS-DIARIAS' && state_front == 'PENDIENTE') {
                $('#div-sub-estado').show();
                $('#texto-sub-estado').text('No se puede continuar debido a que se ha excedido el límite máximo diario de búsquedas para esta cita y oficina. Se seguirá reintentando la validación durante cada hora durante los siguientes 3 días.');
            }

            // Estados pausados que requieren acción del usuario
            if (state_front == 'PAUSADO-REQUIERE-ACCION') {
                $('#boton_estado_busqueda').text('Pausado, acción necesaria');
                //Cosas fuera del popup
                $('#div-contenido-inside-bloque-busqueda').hide();
                $('#boton-renovar-busqueda-cita').show();
                $('#div-sub-estado').show();                
            }
            // ***Cita ya está resercada con DocID
            if (StatePausadoReason == 'CITA-ALREADY-BOOKED-WITH-ID' && state_front == 'PAUSADO-REQUIERE-ACCION') {
                $('#texto-sub-estado').text('Ya existe una cita reservada con su documento' + ' ' + clienteIdType + '. Introducta otro documento para continuar con la búsqueda o cancele la cita que ya tiene reservada, haciendo click en "Renovar búsqueda".');
                //Ocultar botones dentro popup ajustes

            }
            // ***Cita obligatorio buscar con NIE
            if (StatePausadoReason == 'REQUIERE-ID-NIE' && state_front == 'PAUSADO-REQUIERE-ACCION') {
                $('#texto-sub-estado').text('La cita que intenta buscar sólo se puede tramitar con el NIE. Actualiza el documento haciendo click en "Renovar búsqueda"');
                //Ocultar botones dentro popup ajustes
                $('#select-pasaporte-form-ajustes').hide();
                $('#select-dni-form-ajustes').hide();
                $('#select-pasaporte-form-ajustes').removeClass('boton-documento-selected');
                $('#div-popup-ajustes-question-cita-is-cancelada').hide();
                //Mostrar solo NIE
                $('#select-nie-form-ajustes').addClass('boton-documento-selected');
            }

            // Estados de errores
            if (state_front == 'NO_VALIDADO') {
                $('#boton_estado_busqueda').text('Error al procesar la solicitud');
            }
            if (state_front == 'EMAIL-NO-VERIFICADO') {
                $('#boton_estado_busqueda').text('Email no verificado, solicitud rechazada');
            }
            if (state_front == 'ERROR-NO-CONSIGUE-BUSCAR') {
                $('#boton_estado_busqueda').text('Error al procesar la solicitud');
            }
            
            //Mostrar texto dinamico debajo del estado en la que indica que está cargando
            if (state_front == 'BUSCANDO' && flag_loading_text == false) {
                $('#texto-dinamico-debajoestado').show();
                flag_loading_text = true;
                var loadList = [
                    "Cargando información de la búsqueda",
                    "Cargando datos del servidor",
                    "Codificando datos personales",
                    "Cargando página principal",
                    "Indexando menús",
                    "Analizando web",
                    "Rellenando información",
                    "Cargando datos",
                    "Completando formulario",
                    "Introduciendo datos usuario",
                    "Esperando respuesta del servidor",
                    "Cargando respuesta",
                    "Analizando respuesta",
                    "Buscando posibles citas",
                    "Buscando citas en el calendario",
                    "Comprobando disponibilidad",
                    "Analizando horarios",
                    "Buscando citas según fechas indicadas",
                    "Calculando resultados",
                    "Ninguna cita disponible",
                    "Cargando resultados",
                    "Reinicio de búsqueda",
                ];
            
                var i = 0;
                var textarea = $('#text-loop-link-unico');
            
                // Generate a random index to start from
                var randomIndex = Math.floor(Math.random() * loadList.length);
                textarea.text(loadList[randomIndex]); // Set initial text
            
                // Adjust i to start from the random index
                i = (randomIndex * 4) + 1;
            
                var loadTimer = setInterval(function () {
                    if (i % 4 === 0) {
                        var index = Math.floor(i / 4) % loadList.length;
                        textarea.text(loadList[index]);
                    } else {
                        // If not at the end of the text cycle, remove existing dots
                        textarea.text(loadList[Math.floor(i / 4)]); 
                        // Add dots corresponding to the current step
                        for (var j = 0; j < i % 4; j++) {
                            textarea.append('.');
                        }
                    }
            
                    if (i % (4 * loadList.length) === 0) {
                        i = 0; // Reset when all texts have been shown once
                    } else {
                        i++; // Increment i for the next iteration
                    }
                }, 2500); // 5 seconds timer
            }
    
        } 

        //IF para comprobar si ha cambiado el estado y ejecutar función
        if (state_front != previousState) {
            MostrarOcultarItemsSegunEstado();
            previousState = state_front;
                    

        }








        //Fechas para hacer calculos de horas de horas de búsqueda y last checked
        const DEFAULT_TIMEZONE = 'Europe/Madrid';
        //Fechas last checked
        var last_checked = new Date(date_last_checked_front);
        var date_added = new Date(date_added_front);
        var hoursAndMinutesOptions = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false, // Use 24-hour format
            timeZone: DEFAULT_TIMEZONE, // Madrid
            timeZoneName: 'short'
        };

        //Cosas con last checked
        var date_last_checked_front_utc = last_checked.toLocaleString('es-ES', hoursAndMinutesOptions);

        // Calcular número de horas buscando
        var horas_busqueda_front = Math.floor((last_checked - date_added) / (60 * 60 * 1000));

        //Poner a 0 el número de horas si es menor a 0
        if (horas_busqueda_front < 0 || horas_busqueda_front === 0) {
            horas_busqueda_front = 0;
            $('#date_last_checked_front').text('Iniciando primera búsqueda...');
        }
        //Si no es una fecha válida mostrar otro texto para la fecha de la búsqueda de inicio
        if (isNaN(horas_busqueda_front)) {
            document.getElementById('horas_busqueda_front').textContent = 'Sin datos';
        } else {
            document.getElementById('horas_busqueda_front').textContent = horas_busqueda_front + ' h.';
        }
        //Cambiar textos del link único
        
        document.getElementById('date_last_checked_front').textContent = date_last_checked_front_utc;









        //Calculos relacionados con el número de búsquedas
        // Function to format number with dots from 'horas_busqueda_front'
        function formatNumberWithDots(number) {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        }

        //Poner a 0 el numero de búsquedas si es menor a 0
        if (retries_front < 0) {
            retries_front = 0;
        }

        //Cambiar textos del link único
        if (retries_front !== null) {
            document.getElementById('retries_front').textContent = formatNumberWithDots(retries_front);
        } else {
            document.getElementById('retries_front').textContent = 'Sin datos';
        }
        






        //Ocultar caja para pagar si la fecha de pago es menor a la actual
        if (fecha_limite_pago_front < new Date()) {
            cuadradoPagoCita20.hide();
        }

        // Petición para verificar correo
        let button = document.getElementById("boton_completar_verify_correo");
        let isRequestPending = false;

        button.addEventListener("click", function() {
            if (!isRequestPending) {
                // Set flag to indicate request is pending
                isRequestPending = true;

                // Disable the button to prevent multiple requests
                button.disabled = true;

                // URL to which the request will be sent
                const url = "https://n8n.sacacitas.es/webhook/verify-email";

                // Check if public_id_front is defined and contains the correct value
                const codigo_confirmacion = document.getElementById("codigo_confirmacion").value;

                // Data to be sent in the request body
                const requestData = {
                    public_id_front: public_id_front,
                    codigo_confirmacion: codigo_confirmacion
                };

                // Fetch API to send a POST request
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestData)
                })
                .then(response => {
                    // Check if the request was successful (status 200)
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    // Parse the JSON response
                    return response.json();
                })
                .then(data => {
                    // Handle the response data
                    // Check if the response contains "cliente_correo_validated" set to true
                    if (data[0].cliente_correo_validated === true) {
                        // Redirect to a new URL
                        window.location.href = "https://sacacitas.es/link?r="+public_id_front;
                    } else {
                        console.log("Client email not validated.");
                        // Show error message
                        document.getElementById("texto-error-validar-correo").style.display = 'block';
                    }
                })
                .catch(error => {
                    // Handle any errors that occurred during the fetch
                    console.error('There was a problem with the fetch operation:', error);
                })
                .finally(() => {
                    // Reset flag and enable the button
                    isRequestPending = false;
                    button.disabled = false;
                });
            }
        });




        // Petición para reenviar el código de verificación de correo
        let resendButton = document.getElementById("boton-reenviar-codigo");
        let isResendRequestPending = false;

        resendButton.addEventListener("click", function() {
            if (!isResendRequestPending) {
                // Set flag to indicate request is pending
                isResendRequestPending = true;

                // Disable the button to prevent multiple requests
                resendButton.disabled = true;

                // URL for resending email verification
                const resendUrl = "https://n8n.sacacitas.es/webhook/resend-verification";

                // Data to be sent in the request body
                const requestData = {
                    public_id_front: public_id_front
                };

                // Timer element to display countdown
                let timerElement = document.getElementById("timer_resend_email");
                let countdown = 120; // 2 minutes in seconds

                // Update timer function
                function updateTimer() {
                    countdown--;
                    timerElement.textContent = `${Math.floor(countdown / 60)}:${(countdown % 60).toString().padStart(2, '0')}`;
                    if (countdown > 0) {
                        setTimeout(updateTimer, 1000); // Update timer every second
                    } else {
                        // Hide the timer element after 2 seconds when the countdown reaches 0
                        setTimeout(() => {
                            timerElement.style.display = 'none';
                        }, 2000);
                    }
                    timerElement.style.display = 'block'; // Show the timer element
                }

                // Fetch API to send a POST request for resending verification
                fetch(resendUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestData),
                })
                .then(response => {
                    // Check if the request was successful (status 200)
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    // Optionally, you can handle the response if needed
                    // return response.json();
                })
                .then(() => {
                    // Optionally, handle the response data if needed
                    // Perform any actions after successful resend

                    // Start the timer after successful resend
                    updateTimer();
                })
                .catch(error => {
                    // Handle any errors that occurred during the fetch
                    console.error('There was a problem with the resend operation:', error);
                    // Enable the button in case of error
                    isResendRequestPending = false;
                    resendButton.disabled = false;
                })
                .finally(() => {
                    // Enable the button after 2 minutes
                    setTimeout(() => {
                        isResendRequestPending = false;
                        resendButton.disabled = false;
                        // Reset timer
                        countdown = 120;
                        timerElement.textContent = "2:00";
                    }, 120000); // 2 minutes in milliseconds
                });
            }
        });








        //Inicializar operacion de tiempo para cargar datos dinámicos y peticion http
        GetTimeIntervalDynamic();
        
    }
    


















    //Cargar datos estaticos
    // Check if 'referencia' is present in the URL
    if (referencia) {
        // Call fetchData() initially (optional)
        fetchDataStatic();

    } else {
        console.error('Referencia parameter is missing in the URL.');
        // Handle missing referencia parameter and show an error message if needed
        document.getElementById('error-message-parameter1').style.display = 'block';
        document.getElementById('cargando-datos-link-unico').style.display = 'none';
    }









    //Cosas con los cambios de estado
    //crear variables locales del tiempo para actualizar datos dinámicos
    let intervalId;

    //obtener tiempo necessario para ejecutar la petición de datos dinámicos
    function GetTimeIntervalDynamic() {
        // Check if 'referencia' is present in the URL
        if (state_front == 'BUSCANDO') {
            // Call fetchData() initially (optional)
            intervalId = 45000;
            fetchDataStateDynamicInterval();
        } 
        if (state_front == 'CLIENTE-CREADO' || state_front == 'COLA-CREADA' || state_front == 'EMAIL-NO-VERIFICADO') {
            // Call fetchData() initially (optional)
            intervalId = 5000;
            fetchDataStateDynamicInterval();
        } 
        if (state_front == 'VALIDANDO-COLA' || state_front == 'PAUSADO-REQUIERE-ACCION') {
            // Call fetchData() initially (optional)
            intervalId = 15000;
            fetchDataStateDynamicInterval();
        }         
        if (state_front == 'ANULANDO-COLA') {
            // Call fetchData() initially (optional)
            intervalId = 10000;
            fetchDataStateDynamicInterval();
        }             
    }
    //Ejecutar peticion datos dinamicos
    function fetchDataStateDynamicInterval() {
        // Check if 'referencia' is present in the URL
        if (referencia) {
            // Call fetchData() initially (optional)
            const InicializarPeticion = setTimeout(fetchDataStateDynamic, intervalId);
        } else {
            console.error('Referencia parameter is missing in the URL.');
            // Handle missing referencia parameter and show an error message if needed
            document.getElementById('error-message-parameter1').style.display = 'block';
            document.getElementById('cargando-datos-link-unico').style.display = 'none';
        }
    }





    //-->Finaliza todo lo relacionado con la petición de datos dinámicos/estaticos o cambios de estado


























    //Reemplazar datos en los campos de ajustes 
    function ReplaceAjustesDatosLinkUnico() {
        //--> Primer formulario 

        //Datos personales cliente

        var formatted_date_clienteFechaNacimiento = formatDateFromISOToDMY(clienteFechaNacimiento);


        //Seleccionar botones de selección de tipo de documento. DNI, NIE, Pasaporte
        var selectFormDocPasaporte = $('#select-pasaporte-form');
        var selectFormDocNIE = $('#select-nie-form');
        var selectFormDocDNI = $('#select-dni-form');

        selectFormDocPasaporte.add(selectFormDocNIE).add(selectFormDocDNI).hide();

        optionsDocuments = {
            documentos_admitibles: ['pasaporte', 'nie', 'dni']
        }

        function toggleDocumentosAdmitibles() {

            optionsDocuments.documentos_admitibles.forEach(elem => {
                $(`#select-${elem}-form`).show();
            }
            );

        }

        toggleDocumentosAdmitibles();   

        //Selector del docucment type
        //Quitar clase predeterminada
        selectFormDocPasaporte.removeClass('boton-documento-selected');
        //Preseleccionar botones
        if (clienteIdType === 'PASAPORTE') {
            selectFormDocPasaporte.addClass('boton-documento-selected');
        } else if (clienteIdType === 'DNI') {
            selectFormDocDNI.addClass('boton-documento-selected');
        } else if (clienteIdType === 'NIE') {
            selectFormDocNIE.addClass('boton-documento-selected');
        }

        var options_documento = $('.div-documentos-formulario').children('a')

        options_documento.click(function () {
            options_documento.removeClass('boton-documento-selected')
            $(this).addClass('boton-documento-selected');

        });

        //Lista desplegable de paises
        var PaisesSelect = document.getElementById('input-lista-paises');
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

        //Date picker jquery fecha nacimiento
        $(function() {
            var dateFormat = "dd/mm/yy";
        
            $("#input-fecha-nacimiento").datepicker({
              dateFormat: dateFormat,
              maxDate: 0, // Maximum date is today (no future dates allowed)
              changeMonth: true, // Show month dropdown
              changeYear: true, // Show year dropdown
              yearRange: "c-100:c", // Display 100 years before and after the current year
              dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sá"],
              monthNames: [
                "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
              ]
            });
          });

        







        //--> Segundo formulario 


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


        //Inicializar datepickersf
        $(function() {
            var dateFormat = "dd/mm/yy";
        
            // Define Spanish localization directly in JavaScript
            $.datepicker.setDefaults($.datepicker.regional['es'] = {
              closeText: "Cerrar",
              prevText: "Anterior",
              nextText: "Siguiente",
              currentText: "Hoy",
              monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio",
                "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
              ],
              monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun",
                "jul", "ago", "sep", "oct", "nov", "dic"
              ],
              dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
              dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
              dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
              weekHeader: "Sm",
              dateFormat: "dd/mm/yy",
              firstDay: 1,
              isRTL: false,
              showMonthAfterYear: false,
              yearSuffix: ""
            });
        
            $("#start-date").datepicker({
              dateFormat: dateFormat,
              minDate: 0,
              onSelect: function(selectedDate) {
                $("#end-date").datepicker("option", "minDate", selectedDate);
              }
            });
        
            $("#end-date").datepicker({
              dateFormat: dateFormat,
              minDate: 0,
              onSelect: function(selectedDate) {
                var startDate = $("#start-date").datepicker("getDate");
                if (startDate && startDate > new Date(selectedDate)) {
                  $("#start-date").datepicker("setDate", selectedDate);
                }
              }
            });
          });






        //Poner read only al input de fecha max para que no salga el teclado en el movil
        $(document).ready(function () {
            // Select the input field by its ID and make it readonly
            $('#start-date').prop('readonly', true);
            $('#end-date').prop('readonly', true);
            $('#exclude-days').prop('readonly', true);
            $('#input-fecha-nacimiento').prop('readonly', true);
        });



        // Formatear fechas
        var formattedDate1 = formatDateFromISOToDMY(date_min_front);
        var formattedDate2 = formatDateFromISOToDMY(limit_max_front);


        //Reemplazar values existentes del cliente a los inputs
        $('#input-nombre').val(clienteNombre);
        $('#input-apellido1').val(clienteApellido1);
        $('#input-apellido2').val(clienteApellido2);
        $('#input-fecha-nacimiento').val(formatted_date_clienteFechaNacimiento);
        $('#input-ndocumento').val(clienteIdDocumento);
        $('#input-telefono').val(clienteTelefono);
        $('#input-lista-paises').val(clienteNacionalidad);
        //Value fechas de búsuqueda
        $('#start-date').val(formattedDate1);
        $('#end-date').val(formattedDate2);
        $('#exclude-days').val(cola_dias_excluidos);

    }


    //Formularios modificar datos personales
    $('#form_block_modificar_datos_personales').submit(function (event) {
        // Prevent the default form submission behavior
        event.preventDefault();
        //Desactivar boton enviar peticion 
        $('#finalizar-form-datos-personales').prop('disabled', true);
        
        // Show loading spinner
        $('#gif-cargando-boton-finalizar').show();
        $('#gif-error-boton-finalizar').hide();







        //Capturar tipo documento seleccionado
        var selected_document = $('#div-input-ajustes-n-documento').find('.boton-documento-selected').attr('id');
        if (selected_document === 'select-pasaporte-form') {
            var NiceSelected_document = 'PASAPORTE'
        } else if (selected_document === 'select-dni-form') {
            var NiceSelected_document = 'DNI'
        } else if (selected_document === 'select-nie-form') {
            var NiceSelected_document = 'NIE'
        }


        // Gather form data
        var formData = {
            Nombre: $('#input-nombre').val(),
            Apellido1: $('#input-apellido1').val(),
            Apellido2: $('#input-apellido2').val(),
            Fnacimiento: $('#input-fecha-nacimiento').val(),
            SelectedDocument: NiceSelected_document,
            NDocumento: $('#input-ndocumento').val(),
            Telefono: $('#input-telefono').val(),
            Pais: $('#input-lista-paises').val(),
            referencia: referencia
        };

        // Send POST request
        $.ajax({
            type: 'POST',
            url: 'https://n8n.sacacitas.es/webhook/69aba9e4-c06c-450e-9b50-69ec9b0782a5-actualizar-datos-personales',
            data: JSON.stringify(formData),
            // Send form data using the 'data' property
            dataType: 'json',
            contentType: 'application/json',
            success: function (response) {
                // Show your loading GIF 
                $('#gif-success-boton-finalizar').show();
                //$('#gif-cargando-boton-finalizar').hide();

                // Check if ID_publico exists in the response
                if (response.ID_publico) {
                    // Use the ID_publico property
                    var publicItemId = response.ID_publico;
                }


                // Redirect to a new page after a delay
                setTimeout(function() {
                    // Redirect to a new page
                    window.location.href = 'https://sacacitas.es/link?r='+publicItemId;
                }, 1000);
            },
            error: function (xhr, status, error) {
                // Handle error response
                console.error('Form submission failed');

                $('#div-error-enviar-datos').show();
                // Show loading spinner
                $('#gif-cargando-boton-finalizar').hide();
                $('#gif-error-boton-finalizar').show();   
                // Enable submit button
                $('#finalizar-form-datos-personales').prop('disabled', false);        
            }
        });


        // Prevent default form submission in Webflow
        return false;

    });

    
    //Formularios modificar fechas de búsqueda
    $('#form_block_modificar_datos_busqueda').submit(function (event) {
        // Prevent the default form submission behavior
        event.preventDefault();
        //Desactivar boton enviar peticion 
        $('#finalizar-form-datos-busqueda-2').prop('disabled', true);
        
        // Show loading spinner
        $('#gif-cargando-boton-finalizar-2').show();
        $('#gif-error-boton-finalizar-2').hide();





        // Gather form data
        var formData = {
            FMax: $('#end-date').val(),
            FMin: $('#start-date').val(),
            DiasExclusion: PickerExcluidosDias.multipleDatesToString() === '' ? [] : PickerExcluidosDias.multipleDatesToString().split(','),
            referencia: referencia
        };

        // Send POST request
        $.ajax({
            type: 'POST',
            url: 'https://n8n.sacacitas.es/webhook/69aba9e4-c06c-450e-9b50-69ec9b0782a5-actualizar-fechas-busqueda',
            data: JSON.stringify(formData),
            // Send form data using the 'data' property
            dataType: 'json',
            contentType: 'application/json',
            success: function (response) {
                // Show your loading GIF 
                $('#gif-success-boton-finalizar-2').show();
                //$('#gif-cargando-boton-finalizar').hide();

                // Check if ID_publico exists in the response
                if (response.ID_publico) {
                    // Use the ID_publico property
                    var publicItemId = response.ID_publico;
                }


                // Redirect to a new page after a delay
                setTimeout(function() {
                    // Redirect to a new page
                    window.location.href = 'https://sacacitas.es/link?r='+publicItemId;
                }, 1000);
            },
            error: function (xhr, status, error) {
                // Handle error response
                console.error('Form submission failed');

                $('#div-error-enviar-datos').show();
                // Show loading spinner
                $('#gif-cargando-boton-finalizar-2').hide();
                $('#gif-error-boton-finalizar-2').show();   
                // Enable submit button
                $('#finalizar-form-datos-busqueda-2').prop('disabled', false);        
            }
        });


        // Prevent default form submission in Webflow
        return false;

    });


    //Estado búsqueda pausada. Formularios modificar datos personales (re-validar)
    $('#pop-up-datos-personales-form').submit(function (event) {
        // Prevent the default form submission behavior
        event.preventDefault();
        //Desactivar boton enviar peticion 
        $('#finalizar-form-popup-datos-personales').prop('disabled', true);
        
        // Show loading spinner
        $('#gif-cargando-boton-finalizar3').show();
        $('#gif-error-boton-finalizar3').hide();







        //Capturar tipo documento seleccionado
        var selected_document3 = $('#div-input-popup-ajustes-n-documento').find('.boton-documento-selected').attr('id');
        if (selected_document3 === 'select-pasaporte-form-ajustes') {
            var NiceSelected_document3 = 'PASAPORTE'
        } else if (selected_document3 === 'select-dni-form-ajustes') {
            var NiceSelected_document3 = 'DNI'
        } else if (selected_document3 === 'select-nie-form-ajustes') {
            var NiceSelected_document3 = 'NIE'
        }


        console.log(selected_document3);
        console.log(NiceSelected_document3);
        //Checkbox si está marcado o no
        if ($('#checkbox_popup-ajustes-datos-personales').is(':checked')) {
            var checkboxpersonales = true;
        }

        // Gather form data
        var formData = {
            SelectedDocument: NiceSelected_document3,
            NDocumento: $('#input-ndocumento-ajustes-popup').val(),
            checkboxpersonales: checkboxpersonales,
            referencia: referencia
        };

        // Send POST request
        $.ajax({
            type: 'POST',
            url: 'https://n8n.sacacitas.es/webhook/69aba9e4-c06c-450e-9b50-69ec9b0782a5-estado-pausado-actualizar-datos-personales',
            data: JSON.stringify(formData),
            // Send form data using the 'data' property
            dataType: 'json',
            contentType: 'application/json',
            success: function (response) {
                // Show your loading GIF 
                $('#gif-success-boton-finalizar3').show();
                //$('#gif-cargando-boton-finalizar').hide();

                // Check if ID_publico exists in the response
                if (response.ID_publico) {
                    // Use the ID_publico property
                    var publicItemId = response.ID_publico;
                }


                // Redirect to a new page after a delay
                setTimeout(function() {
                    // Redirect to a new page
                    window.location.href = 'https://sacacitas.es/link?r='+publicItemId;
                }, 1000);
            },
            error: function (xhr, status, error) {
                // Handle error response
                console.error('Form submission failed');

                $('#div-error-enviar-datos').show();
                // Show loading spinner
                $('#gif-cargando-boton-finalizar3').hide();
                $('#gif-error-boton-finalizar3').show();   
                // Enable submit button
                $('#finalizar-form-popup-datos-personales').prop('disabled', false);        
            }
        });


        // Prevent default form submission in Webflow
        return false;

    });











//Otros / varios
    //Funcionalidad varias de ajustes y modificar datos
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




    //Función para transformar fechas a formato dd mes yyyy en locale es
    function formatDateToSpanishLocale(dateString) {
        // Create a Date object
        var date = new Date(dateString);
    
        // Get the day, month, and year parts
        var day = date.getDate();
        var month = date.getMonth() + 1; // Month is zero-based, so we add 1
        var year = date.getFullYear();
    
        // Get the full month name using toLocaleDateString with locale "es-ES"
        var monthName = date.toLocaleDateString('es-ES', { month: 'long' });
    
        // Format the date with the full month name
        var formattedDate = day + ' ' + monthName + ' ' + year;
    
        return formattedDate;
    }

    //Funcion transformar a DD/MM/YYYY
    function formatDateFromISOToDMY(dateString) {
        // Create a Date object from the ISO format date string
        var date = new Date(dateString);

        // Get day, month, and year from the Date object
        var day = date.getDate();
        var month = date.getMonth() + 1; // Month is zero-based, so we add 1
        var year = date.getFullYear();

        // Pad day and month with leading zeros if necessary
        var paddedDay = day < 10 ? '0' + day : day;
        var paddedMonth = month < 10 ? '0' + month : month;

        // Construct the formatted date string in DD/MM/YYYY format
        var formattedDate = paddedDay + '/' + paddedMonth + '/' + year;

        return formattedDate;
    }






  });
  


