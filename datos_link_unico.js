document.addEventListener('DOMContentLoaded', function () {

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
                var id_oficina_front = data.id_oficina;
                var date_added_front = data.date_added;
                var state_front = data.state;
                var date_last_checked_front = data.date_last_checked;
                var retries_front = data.retries;
                var limit_max_front = data.limit_max;
                var date_min_front = data.date_min;
                var fecha_caducidad_front = data.limit_caducidad;
                var precio_eur_cent_front = data.precio_eur_cent;
                var public_id_front = data.public_id;
                var servicio_nombre_front = data.servicio_nombre;
                var oficina_nombre_front = data.oficina_nombre;
                var provincia_front = data.provincia;
                var codigo_reserva_cita_front = data.referencia_reserva;
                var fecha_cita_reservada_front = data.fecha_cita_reservada;
                var fecha_limite_pago_front = data.fecha_limite_pago;

                //Datos del cliente
                var clienteIdDocumento = data.cliente.id_documento;
                var clienteIdType = data.cliente.id_type;
                var clienteNombre = data.cliente.nombre;
                var clienteApellido1 = data.cliente.apellido1;
                var clienteApellido2 = data.cliente.apellido2;
                var clienteTelefono = data.cliente.telefono;
                var clienteEmail = data.cliente.email;
                var clienteNacionalidad = data.cliente.nacionalidad;
                var clienteFechaNacimiento = data.cliente.fecha_nacimiento;
                //var clienteResolucionNacionalidad = data.cliente.resolucion_nacionalidad;
                //var clienteCsvNacionalidad = data.cliente.csv_nacionalidad;
                //var clienteIdCaducidad = data.cliente.id_caducidad;
                //var clienteIdCliente = data.cliente.id_cliente;
            
                

                // Variables de elementos del front-end
                var botonEstadoBusqueda = document.getElementById('boton_estado_busqueda');
                
                
                

                
                
                
                
                
                
                
                


                // Fetching data from jsonUrl2 based on parentIdoficinaIdservicio
                var precio_cita_front = jsonData2[parentIDofIdoficinaIdservicio] || 'ES_0_SINDATOS';
                var precio_cita_front_euros = (precio_cita_front / 100);
    
                // Calcular precio en euros de cents
                var precio_cita_backend = (precio_eur_cent_front / 100);
    
                // Crear fechas
                var limit_max_date = new Date(limit_max_front);
                var limit_min_date = new Date(date_min_front);
                var date_added = new Date(date_added_front);
                var last_checked = new Date(date_last_checked_front);
                var fecha_caducidad_date = new Date(fecha_caducidad_front);
                var fecha_cita_reservada = new Date(fecha_cita_reservada_front);
                var fecha_limite_pago = new Date(fecha_limite_pago_front);
                var date_clienteFechaNacimiento = new Date(clienteFechaNacimiento);
    
    
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
                var formattedLimitMax = limit_max_date.toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    timeZone: DEFAULT_TIMEZONE // GMT+1
                }).replace(/,/g, '-');
    
                var formattedLimitMin = limit_min_date.toLocaleDateString('es-ES', {
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

                //Fecha nacimiento a DD.MM.YYYY
                var formatted_date_clienteFechaNacimiento = date_clienteFechaNacimiento.toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                }).replace(/,/g, '-');



                // Reemplazar items de las variables por texto con ID's de la web
                document.getElementById('public_id_front').textContent = public_id_front;
                document.getElementById('public_id_front2').textContent = public_id_front;
                document.getElementById('servicio_nombre_front').textContent = servicio_nombre_front;
                document.getElementById('oficina_nombre_front').textContent = oficina_nombre_front;
                document.getElementById('provincia_front').textContent = provincia_front;
        
                // Apply class based on the state text
                if (state_front == 'BUSCANDO') {
                    document.getElementById('boton_estado_busqueda').classList.toggle('boton_busqueda_verde');
                }
                if (state_front == 'RESERVADO') {
                    document.getElementById('boton_estado_busqueda').classList.toggle('boton_busqueda_naranja');
                }
                if (state_front == 'EXPIRADO' || state_front == 'CANCELADO' || state_front == 'ANULADO') {
                    document.getElementById('boton_estado_busqueda').classList.toggle('boton_busqueda_rojo');
                }
                if (state_front == 'PAGADO') {
                    document.getElementById('boton_estado_busqueda').classList.toggle('boton_busqueda_azul');
                }
                








                //Cambiar textos del link único
                document.getElementById('state_front').textContent = state_front.charAt(0).toUpperCase() + state_front.substring(1).toLowerCase();
                botonEstadoBusqueda.textContent = state_front.charAt(0).toUpperCase() + state_front.substring(1).toLowerCase();
                document.getElementById('date_last_checked_front').textContent = date_last_checked_front_utc;
                document.getElementById('retries_front').textContent = formatNumberWithDots(retries_front);
                document.getElementById('link-busqueda-fechas-min-max').textContent = 'Desde ' + formattedLimitMin + ' hasta ' + formattedLimitMax;
                document.getElementById('date_added_front').textContent = formattedDateAdded;
                document.getElementById('caducidad_busqueda').textContent = `Dentro de ${dias_caducidad_restantes} días`;
                document.getElementById('horas_busqueda_front').textContent = horas_busqueda_front + ' h.';
                document.getElementById('precio_cita_front').textContent = precio_cita_backend.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                document.getElementById('precio_cita_hay_que_pagar').textContent = precio_cita_backend.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                document.getElementById('coste_hora_buscando').textContent = coste_hora_buscando.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                document.getElementById('fecha-cita-reservada').textContent = formattedDate_cita_reservada;
                document.getElementById('boton-fecha-limite-pago').textContent = formattedDate_fecha_limite_pago;
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


                //Cambiar textos del link único
                if (state_front == 'CANCELADO') {
                    botonEstadoBusqueda.textContent = 'Búsqueda cancelada';
                }

                if (state_front == 'BUSCANDO') {
                    botonEstadoBusqueda.textContent = 'Buscando cita';
                }

                if (state_front == 'ANULADO') {
                    botonEstadoBusqueda.textContent = 'Cita reservada anulada';
                }

                if (state_front == 'RESERVADO') {
                    botonEstadoBusqueda.textContent = 'Cita reservada, pendiente de pagar';
                }

                if (state_front == 'EXPIRADO') {
                    botonEstadoBusqueda.textContent = 'Búsqueda caducada';
                }

                if (state_front == 'NO_VALIDADO') {
                    botonEstadoBusqueda.textContent = 'Error al procesar la solicitud';
                }


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
                var textoCitaAunBuscando = $('#texto-pago-cita-aun-buscando');


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
                if (state_front == 'RESERVADO' && retries_front > 500) {
                    divCosteHoraBuscando.show();
                }
                if (state_front == 'BUSCANDO') {
                    botonCancelarLinkUnico.show();
                    divCaducidadBusqueda.show();
                    divUltimaBusqueda.show();
                }
                if (state_front == 'RESERVADO') {
                    cuadradoPagoCita20.show();
                    divDatosCitaReservada.show();
                }
                if (state_front == 'PAGADO') {
                    divDatosCitaReservada.show();
                    estadoPagoCitaReservada.text('Pagado');
                }

                //if (state_front == 'EXPIRADO' || state_front == 'CANCELADO' || state_front == 'ANULADO') {
                //    botonRenovarBusquedaCita.show();
                //}    



                $(document).ready(function () {
                    //botones
                    var botonLinkUnicoBusqueda = $('#boton-link-unico-busqueda');
                    var botonLinkUnicoReserva = $('#boton-link-unico-reserva');
                    var botonLinkUnicoOficina = $('#boton-link-unico-oficina');
                    var botonLinkUnicoDatos = $('#boton-link-unico-datos');
                    var botonLinkUnicoEstadistica = $('#boton-link-unico-estadistica');
                    
                    //Grids
                    var divLinkUnicoBusqueda = $('#div-busqueda-link-unico');
                    var divPagoYReserva = $('#div-pago-y-reserva');
                    var gridLinkUnicoOficina = $('#grid-link-unico-oficina');
                    var gridLinkUnicoDatos = $('#grid-link-unico-datos');
                    var gridLinkUnicoEstadistica = $('#grid-link-unico-estadistica');


                    // De manera predeterminada ocultar grids y seleccionar botón Búsqueda
                    divPagoYReserva.hide();
                    gridLinkUnicoOficina.hide();
                    gridLinkUnicoDatos.hide();
                    gridLinkUnicoEstadistica.hide();
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
                        botonLinkUnicoBusqueda.addClass('boton-datos-link-unico-selected');
                        botonLinkUnicoReserva.removeClass('boton-datos-link-unico-selected');
                        botonLinkUnicoOficina.removeClass('boton-datos-link-unico-selected');
                        botonLinkUnicoDatos.removeClass('boton-datos-link-unico-selected');
                        botonLinkUnicoEstadistica.removeClass('boton-datos-link-unico-selected');
                    });                    
                
                    // Click event for botonLinkUnicoBusqueda
                    botonLinkUnicoReserva.click(function () {
                        divLinkUnicoBusqueda.hide();
                        divPagoYReserva.show();
                        gridLinkUnicoOficina.hide();
                        gridLinkUnicoDatos.hide();
                        gridLinkUnicoEstadistica.hide();
                        botonLinkUnicoBusqueda.removeClass('boton-datos-link-unico-selected');
                        botonLinkUnicoReserva.addClass('boton-datos-link-unico-selected');
                        botonLinkUnicoOficina.removeClass('boton-datos-link-unico-selected');
                        botonLinkUnicoDatos.removeClass('boton-datos-link-unico-selected');
                        botonLinkUnicoEstadistica.removeClass('boton-datos-link-unico-selected');
                    });                    
                
                    // Click event for botonLinkUnicoBusqueda
                    botonLinkUnicoOficina.click(function () {
                        divLinkUnicoBusqueda.hide();
                        divPagoYReserva.hide();
                        gridLinkUnicoOficina.show();
                        gridLinkUnicoDatos.hide();
                        gridLinkUnicoEstadistica.hide();
                        botonLinkUnicoBusqueda.removeClass('boton-datos-link-unico-selected');
                        botonLinkUnicoReserva.removeClass('boton-datos-link-unico-selected');
                        botonLinkUnicoOficina.addClass('boton-datos-link-unico-selected');
                        botonLinkUnicoDatos.removeClass('boton-datos-link-unico-selected');
                        botonLinkUnicoEstadistica.removeClass('boton-datos-link-unico-selected');
                    });                                   
                
  
                    // Click event for botonLinkUnicoBusqueda
                    botonLinkUnicoDatos.click(function () {
                        divLinkUnicoBusqueda.hide();
                        divPagoYReserva.hide();
                        gridLinkUnicoOficina.hide();
                        gridLinkUnicoDatos.show();
                        gridLinkUnicoEstadistica.hide();
                        botonLinkUnicoBusqueda.removeClass('boton-datos-link-unico-selected');
                        botonLinkUnicoReserva.removeClass('boton-datos-link-unico-selected');
                        botonLinkUnicoOficina.removeClass('boton-datos-link-unico-selected');
                        botonLinkUnicoDatos.addClass('boton-datos-link-unico-selected');
                        botonLinkUnicoEstadistica.removeClass('boton-datos-link-unico-selected');
                    });                    
                    
                    // Click event for botonLinkUnicoBusqueda
                    botonLinkUnicoEstadistica.click(function () {
                        divLinkUnicoBusqueda.hide();
                        divPagoYReserva.hide();
                        gridLinkUnicoOficina.hide();
                        gridLinkUnicoDatos.hide();
                        gridLinkUnicoEstadistica.show();
                        botonLinkUnicoBusqueda.removeClass('boton-datos-link-unico-selected');
                        botonLinkUnicoReserva.removeClass('boton-datos-link-unico-selected');
                        botonLinkUnicoOficina.removeClass('boton-datos-link-unico-selected');
                        botonLinkUnicoDatos.removeClass('boton-datos-link-unico-selected');
                        botonLinkUnicoEstadistica.addClass('boton-datos-link-unico-selected');
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
            
                //Poner gifs según el estado de búsqueda
                if (state_front == 'BUSCANDO') {
                    document.getElementById('gif-radar-buscando').style.display = 'block';
                }
                if (state_front == 'RESERVADO') {
                    document.getElementById('gif-pagar-reservado').style.display = 'block';
                }
        
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
        
    
                //enviar id_publico al pulsar boton pagar
                document.getElementById('id_unico_webhook').style.display = 'none';
                document.getElementById('id_unico_webhook').setAttribute('value', referencia);
                // Si todo está OK mostar link unico e info exrra
                document.getElementById('main-content1').style.display = 'block';
                document.getElementById('main-content-info-extra').style.display = 'block';
                // Si todo OK ocultar página de carga
                document.getElementById('loading-content1').style.display = 'none';
    


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
    
  
            })
            .catch(error => {
              console.error('Error fetching data:', error);
              // Handle errors and show an error message if needed
              document.getElementById('error-message-parameter2').style.display = 'block';
              document.getElementById('cargando-datos-link-unico').style.display = 'none';
  
            });
        } else {
          console.error('Referencia parameter is missing in the URL.');
          // Handle missing referencia parameter and show an error message if needed
          document.getElementById('error-message-parameter1').style.display = 'block';
          document.getElementById('cargando-datos-link-unico').style.display = 'none';
        }
      });
  });
  
