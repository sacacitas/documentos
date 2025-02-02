$(document).ready(function () {
    // Function to get URL parameters
    function getQueryParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    // Get the 'ref' parameter
    let refValue = getQueryParam("ref");

    // Set the value in the input field if 'ref' exists
    if (refValue) {
        $("#ref-input").val(refValue);
    }



    // Send data form
    $('#formulario_ID').submit(function (event) {


        // Show loading gif
        $('#gif-cargando-boton-finalizar').show();
        //Hide error div                  
        $('#div-error-enviar-datos').hide();
        //Hide error gif
        $('#gif-error-boton-finalizar').hide();
        //Hide success button gif
        $('#gif-success-boton-finalizar').hide();
        // Prevent the default form submission behavior
        event.preventDefault();



        // Disable the submit button to prevent multiple submissions
        $('#submit-button-id').prop('disabled', true);





        // Gather form data
        var formData = {
            name: $('#input-nombre').val(),
            email: $('#input-correo').val(),
            phone: $('#input-telefono').val(),
            message: $('#input-optional-message').val(),
            pagepath: $('#ref-input').val()
        };

        // Send POST request
        $.ajax({
            type: 'POST',
            url: 'https://n8n.sacacitas.com/webhook/form-services',
            data: JSON.stringify(formData),
            dataType: 'json',
            contentType: 'application/json',
            success: function (response) {

                $('#gif-cargando-boton-finalizar').hide();
                $('#formulario-boton-finalizar').hide();
                $('#gif-success-boton-finalizar').show();


            },
            error: function (xhr, status, error) {

                $('#gif-cargando-boton-finalizar').hide();
                $('#div-error-enviar-datos').show();
                $('#gif-error-boton-finalizar').show();
                $('#submit-button-id').prop('disabled', false);

                console.error('Form submission failed');
                //if error call to webhook
                $.ajax({
                    url: "https://n8n.sacacitas.com/webhook/error-alerts",
                    type: "POST",
                    contentType: "application/json", // Specify content type as JSON
                    dataType: 'json',
                    data: JSON.stringify({
                        inputData: inputData, // Assuming inputData is an object or data you want to send
                        LocalisationError: "formulario_tramites-ha-fallado",
                        Extrainfo: "Ha fallado completar form tramites", // Add extra text or data
                        errorCode: 500 // Example of sending an additional error code
                    }),
                    success: function (response) {
                        console.log("Success:", response);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.error("Error:", errorThrown);
                    }
                });

            }
        });

        return false;
    });

});

