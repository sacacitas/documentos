  document.addEventListener('DOMContentLoaded', function () {
    var data;
    var administracionSelect = $('#administracionSelect');
    var provinciaSelect = $('#provinciaSelect');
    var oficinaSelect = $('#oficinaSelect');
    var citaPreviaSelect = $('#citaPreviaSelect');
    var apiBaseUrl = 'https://panelaws.sacacitas.es/public/oficina/';

    administracionSelect.on('change', fetchAndPopulateOficina);

    provinciaSelect.on('change', fetchAndPopulateOficina);

    oficinaSelect.on('change', updateCitaPrevia);
    
    document.getElementById('PCCO1').style.display = 'none';
    document.getElementById('OF_CTP').style.display = 'none';
    document.getElementById('CATEG_CTP').style.display = 'none';
    document.getElementById('CXXO').style.display = 'none';

    // Add default placeholder option for 'js-oficina' select
    var defaultOficinaOption = $('<option></option>').text('Oficina').prop('disabled', true).prop('selected', true).val('');
    oficinaSelect.html('').append(defaultOficinaOption);

    // Add default placeholder option for 'js-cita-previa' select
    var defaultCitaPreviaOption = $('<option></option>').text('Servicios').prop('disabled', true).prop('selected', true).val('');
    citaPreviaSelect.html('').append(defaultCitaPreviaOption);


		// Resetear cosas cuando administracion o provincia se cambia
    function fetchAndPopulateOficina() {
      // Reset the selection in 'js-oficina' select to default
      oficinaSelect.val(defaultOficinaOption.val());

      // Reset the selection in 'js-cita-previa' select to default
      citaPreviaSelect.val(defaultCitaPreviaOption.val());

      // Clear existing options for 'js-cita-previa' select
      citaPreviaSelect.html('').append(defaultCitaPreviaOption);

      // Call the fetchData function
      fetchData();
    }


		// Resetear cosas cuando administracion o provincia se cambia
    function resetearcita() {

      // Reset the selection in 'js-cita-previa' select to default
      citaPreviaSelect.val(defaultCitaPreviaOption.val());

    }


    function fetchData() {
      var selectedAdministracion = administracionSelect.val();
      var selectedProvincia = provinciaSelect.val();

      // Check if both administracion and provincia are selected
      if (selectedAdministracion && selectedProvincia) {
        // Build the API URL with the selected provincia
        var apiUrl = apiBaseUrl + selectedProvincia;

        // Make the API call
        fetch(apiUrl)
          .then(response => response.json())
          .then(responseData => {
            data = responseData; // Set the data variable with the response
            // Populate oficina select options with default text
            oficinaSelect.html('').append(defaultOficinaOption);

            // Filter data based on selectedAdministracion
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
              oficinaSelect.append(optionElement);
            });

            // Trigger change event to refresh the select (if needed)
            oficinaSelect.trigger('change');
          })
          .catch(error => console.error('Error fetching data:', error));
      } else {
        // Clear data and reset options for 'js-oficina' and 'js-cita-previa' selects
        data = null;
        oficinaSelect.html('').append(defaultOficinaOption);
        citaPreviaSelect.html('').append(defaultCitaPreviaOption);
      }
    }

    function updateCitaPrevia() {
      var selectedOficina = oficinaSelect.val();
      var selectedCitaPrevia = citaPreviaSelect.val();

      // Check if oficina is selected
      if (selectedOficina) {
        // Clear existing options and set default option for 'js-cita-previa' select
        citaPreviaSelect.html('').append(defaultCitaPreviaOption);

        // Find the selected oficina in the external data
        var selectedOficinaData = data.find(item => item.nombre === selectedOficina);

        // Check if data is found and servicios is an array 
        if (selectedOficinaData && Array.isArray(selectedOficinaData.servicios)) {
          // Populate citaPrevia select options with services from selected oficina
          selectedOficinaData.servicios.forEach(servicio => {
            // Check if servicio has the required properties
            if (servicio && servicio.id_servicio && servicio.nombre) {
              var optionElement = $('<option></option>').prop('value', servicio.nombre).text(servicio.nombre);
              citaPreviaSelect.append(optionElement);
            }
          });

          // Trigger change event to refresh the select (if needed)
          citaPreviaSelect.trigger('change');
        }
      }
    }

    // URLs of your JSON files
    const jsonUrl1 = 'https://documentos.sacacitas.es/categorias_servicios.json';
    const jsonUrl2 = 'https://documentos.sacacitas.es/precios_citas.json';

    // Fetch JSON data asynchronously after the main content has loaded
    Promise.all([loadJSON(jsonUrl1), loadJSON(jsonUrl2)])
      .then(dataArray => {
        // Handle your JSON data here
        const [jsonData1, preciosCitas] = dataArray;

        // Event listener for changes in the citaPrevia select
        citaPreviaSelect.on('change', function () {
          var selectedOficina = oficinaSelect.val();
          var selectedCitaPrevia = citaPreviaSelect.val();

          // Check if both oficina and citaPrevia are selected
          if (selectedOficina && selectedCitaPrevia) {
            // Find the selected oficina in the external data
            var selectedOficinaData = data.find(item => item.nombre === selectedOficina);

            // Check if data is found and servicios is an array 
            if (selectedOficinaData && Array.isArray(selectedOficinaData.servicios)) {
              // Find the selected servicio based on the name
              var selectedServicio = selectedOficinaData.servicios.find(servicio => servicio.nombre === selectedCitaPrevia);

              // Check if the selected servicio has the required properties
              if (selectedServicio && selectedServicio.id_servicio) {
                // Create the idoficina_idservicio variable
                var idoficina_idservicio = selectedOficinaData.id_oficina + '_' + selectedServicio.id_servicio;

								var parentID = Object.keys(jsonData1).find(key => idoficina_idservicio in jsonData1[key]) || "ES_0_SINDATOS";                

                var PRCDS = preciosCitas[parentID];
                var PRECIO_REAL_COBRO = preciosCitas[parentID]*100;
                
                // Get the corresponding price from preciosCitas
                var precioCitaID = preciosCitas[parentID];

                precioCitaID = precioCitaID / 100;
                
                // Round to two decimal places
                precioCitaID = parseFloat(precioCitaID).toFixed(2);                
                
                // Replace dot (.) with comma (,)
                precioCitaID = precioCitaID.toString().replace('.', ',');                
                
                // Update the content of an element with ID "precio-total-buscador" with precioCitaID
                var precioTotalElement = $('#precio-total-buscador');
                precioTotalElement.text(precioCitaID);    
                
                
                // Resetear valores de OF_CTP cuando cita se cambia y cambiar texto de la parte de la cita
                oficinaSelect.on('change', function () {
                    resetearcita();
                    OF_CTP();
                });

                function OF_CTP() {
                    document.getElementById('OF_CTP').setAttribute('value', '');
                    document.getElementById('parte-final-buscador').style.display = 'none';
                }


                document.getElementById('OF_CTP').setAttribute('value', idoficina_idservicio);
                document.getElementById('PCCO1').setAttribute('value', precioCitaID);
                document.getElementById('CATEG_CTP').setAttribute('value', parentID);
                document.getElementById('CXXO').setAttribute('value', PRCDS);
                
              }
            }
          }
        });
      });

    // Function to load JSON asynchronously
    function loadJSON(url) {
      return fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
          }
          return response.json();
        })
        .catch(error => {
          console.error('Error loading JSON:', error);
        });
    }
  });

