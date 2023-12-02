document.addEventListener('DOMContentLoaded', function() {
    // Function to extract parameter from URL
    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
    
    // Get the 'referencia' parameter from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const referencia = urlParams.get('r');

    
    // URLs of your JSON files
    const jsonUrl1 = 'https://documentos.sacacitas.es/categorias_servicios.json';
    const jsonUrl2 = 'https://documentos.sacacitas.es/precios_citas.json';
    
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
    Promise.all([loadJSON(jsonUrl1), loadJSON(jsonUrl2)])
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
    
                // Fetching data from jsonUrl2 based on parentIdoficinaIdservicio
                var precio_cita_front = jsonData2[parentIDofIdoficinaIdservicio] || 'ES_0_SINDATOS';
    
                // Convert UTC date to Spanish date format without time and with hyphen as separator
                var limit_max_date = new Date(limit_max_front);
                var date_added = new Date(date_added_front);
                var last_checked = new Date(date_last_checked_front);
    
                var options = {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false, // Use 24-hour format
                timeZone: DEFAULT_TIMEZONE, // CET/CEST
                timeZoneName: 'short'
                };
                //Fecha añadido 
                var formattedDateAdded = date_added.toLocaleString('es-ES', options).replace(/,/g, ' -');
                var formattedLimitMax = limit_max_date.toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric'
                }).replace(/,/g, '-');
                
                var hoursAndMinutesOptions = {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false, // Use 24-hour format
                timeZone: DEFAULT_TIMEZONE, // CET/CEST
                timeZoneName: 'short'
                };
                var date_last_checked_front_utc = last_checked.toLocaleString('es-ES', hoursAndMinutesOptions);
    
                // Calculate the number of days between date_added and newDateAdded
                var timeDiffHoras = Math.floor((limit_max_date - date_added) / (24 * 60 * 1000));
    
                // Determine whether to use "días" or "hora"
                const timeValue = timeDiffHoras > 24 ? Math.floor(timeDiffHoras / 60) : timeDiffHoras;
                var timeUnit = timeDiffHoras > 24 ? `días` : 'horas';
    
                // Caluclar número de horas buscando
                var horas_busqueda_front = Math.floor((new Date() - date_added) / (24 * 60 * 1000));
                
                var coste_hora_buscando = (precio_cita_front / horas_busqueda_front);
    
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
    
                // Botón 'Estado' búsqueda por colores
                var estadoBusquedaElement = document.getElementById('boton_estado_busqueda');
                var lowerCaseState = state_front.toLowerCase();
    
                // Apply class based on the state text
                estadoBusquedaElement.classList.toggle('boton_busqueda_verde', lowerCaseState === 'buscando');
                estadoBusquedaElement.classList.toggle('boton_busqueda_azul', lowerCaseState === 'reservado');
                estadoBusquedaElement.classList.toggle('boton_busqueda_naranja', lowerCaseState === 'expirado');
                estadoBusquedaElement.classList.toggle('boton_busqueda_rojo', lowerCaseState === 'cancelado');
    
                document.getElementById('state_front').textContent = state_front.charAt(0).toUpperCase() + state_front.substring(1).toLowerCase();
                document.getElementById('boton_estado_busqueda').textContent = state_front.charAt(0).toUpperCase() + state_front.substring(1).toLowerCase();
                document.getElementById('date_last_checked_front').textContent = date_last_checked_front_utc;
                document.getElementById('retries_front').textContent = formatNumberWithDots(retries_front);
                document.getElementById('cliente_id_obfuscado_front').textContent = cliente_id_obfuscado_front;
                document.getElementById('limit_max_front').textContent = formattedLimitMax;
                document.getElementById('date_added_front').textContent = formattedDateAdded;
                document.getElementById('caducidad_busqueda').textContent = `Dentro de ${timeValue} ${timeUnit}`;
                document.getElementById('horas_busqueda_front').textContent = formatNumberWithDots(horas_busqueda_front) + ' h.';
                document.getElementById('precio_cita_front').textContent = precio_cita_front.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                document.getElementById('coste_hora_buscando').textContent = coste_hora_buscando.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                // Check if 'retries_front' is less than 1000 or 'horas_busqueda_front' is less than 48
                if (retries_front < 250 || horas_busqueda_front < 48) {
                    document.getElementById('coste_hora_buscando_texto_entero').textContent = 'No hay datos suficientes';
                }
                if (state_front == 'CANCELADO') {
                    document.getElementById('boton-cancelar-link-unico').style.display = 'none';
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
               
                // Hide the element with ID 'cuadrado-pago-cita'
                document.getElementById('cuadrado-pago-cita20').style.display = 'none';
    
                // Update opacity of 'main-content' from 0% to 100%
                //document.getElementById('main-content').style.opacity = '1';
                document.getElementById('main-content').style.display = 'block';
    
                // Hide the element with ID 'loading-content'
                document.getElementById('loading-content1').style.display = 'none';
    
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                // Handle errors and show an error message if needed
                document.getElementById('error-message').style.display = 'block';

                //ocultar main content si no carga
                document.getElementById('main-content').style.display = 'none';
            });
        } else {
            console.error('Referencia parameter is missing in the URL.');
            // Handle missing referencia parameter and show an error message if needed
            document.getElementById('error-message').style.display = 'block';

            //ocultar main content si no carga
            document.getElementById('main-content').style.display = 'none';
        }
        });
    });
