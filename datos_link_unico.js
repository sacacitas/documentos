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
            document.getElementById('boton_estado_busqueda').textContent = state_front.charAt(0).toUpperCase() + state_front.substring(1).toLowerCase();
            document.getElementById('date_last_checked_front').textContent = date_last_checked_front_utc;
            document.getElementById('retries_front').textContent = formatNumberWithDots(retries_front);
            document.getElementById('cliente_id_obfuscado_front').textContent = cliente_id_obfuscado_front;
            document.getElementById('limit_max_front').textContent = formattedLimitMax;
            document.getElementById('date_added_front').textContent = formattedDateAdded;
            document.getElementById('caducidad_busqueda').textContent = `Dentro de ${dias_caducidad_restantes} días`;
            document.getElementById('horas_busqueda_front').textContent = horas_busqueda_front + ' h.';
            document.getElementById('precio_cita_front').textContent = precio_cita_backend.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            document.getElementById('precio_cita_hay_que_pagar').textContent = precio_cita_backend.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            document.getElementById('coste_hora_buscando').textContent = coste_hora_buscando.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            document.getElementById('codigo-reserva-cita-reservada').textContent = codigo_reserva_cita_front;
            document.getElementById('fecha-cita-reservada').textContent = formattedDate_cita_reservada;
            document.getElementById('boton-fecha-limite-pago').textContent = formattedDate_fecha_limite_pago;





            // Mostrar diferentes items dependiendo del estado
            if (state_front == 'RESERVADO' && horas_busqueda_front > 48) {
              document.getElementById('div-coste-hora-buscando').style.display = 'block';
            }
            if (horas_busqueda_front < 24) {
              document.getElementById('div-horas-buscando').style.display = 'none';
            }
            if (state_front == 'RESERVADO' && retries_front > 500) {
              document.getElementById('div-coste-hora-buscando').style.display = 'block';
            }
            if (retries_front < 200) {
              document.getElementById('div-total-busquedas').style.display = 'none';
            }
            if (state_front == 'BUSCANDO') {
              document.getElementById('boton-cancelar-link-unico').style.display = 'block';
            }
            if (state_front == 'RESERVADO') {
              document.getElementById('cuadrado-pago-cita20').style.display = 'block';
            }
            if (state_front == 'RESERVADO') {
              document.getElementById('div-datos-cita-reservada').style.display = 'block';
            }
            if (state_front == 'PAGADO') {
              document.getElementById('div-datos-cita-reservada').style.display = 'block';
            }
            if (state_front == 'PAGADO') {
              document.getElementById('estado-pago-cita-reservada').textContent = 'Pagado';
            }
            if (state_front == 'BUSCANDO') {
              document.getElementById('div_caducidad_busqueda').style.display = 'block';
            }
            if (state_front == 'RESERVADO') {
              document.getElementById('boton_estado_busqueda').textContent = 'Cita reservada, pendiente de pagar';
            }
            if (state_front == 'BUSCANDO') {
              document.getElementById('div-ultima-busqueda').style.display = 'block';
            }
    
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
                    //$("[data-form-datos-empresa]").prop("required", true);
                    document.getElementById('nombre_razon_social_link_unico-2').setAttribute('required', true);

                } else {
                    // If this checkbox is unchecked, hide the corresponding element
                    displayElement.hide();
                    // Set the 'required' attribute to false for the element with the attribute 'data-form-datos-empresa'
                    //$("[data-form-datos-empresa]").prop("required", false);
                    document.getElementById('nombre_razon_social_link_unico-2').removeAttribute('required');
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
            linkElement.style.color = '#2C64E3';


            //enviar id_publico al pulsar boton pagar
            document.getElementById('id_unico_webhook').style.display = 'none';
            document.getElementById('id_unico_webhook').setAttribute('value', referencia);


            // Si todo está OK mostar link unico e info exrra
            document.getElementById('main-content1').style.display = 'block';
            document.getElementById('main-content-info-extra').style.display = 'block';
            // Si todo OK ocultar página de carga
            document.getElementById('loading-content1').style.display = 'none';

            // Petición cancelar búsqueda
            document.getElementById('boton_confirmar_cancelar_busqueda').addEventListener('click', function () {
              const apiUrl = 'https://panelaws.sacacitas.es/public/cola/resumen?public_id_front=${public_id_front}';
              const requestOptions = {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
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
                  console.log('Response data:', data);
                })
                .catch(error => {
                  console.error('Error:', error);
                });
            });

            // Petición cancelar cita reservada
            document.getElementById('boton-cancelar-cita-reservada').addEventListener('click', function () {
              const apiUrl = 'https://hook.eu2.make.com/do8w7utervphwxlzzt9afkjixmqvtxl5';

              // Include data in the request body
              const requestBody = {
                public_id_front: public_id_front,
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
