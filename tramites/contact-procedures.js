
$(document).ready(function () {



    // Hide and show the divs
    $('#div-contactar-datoscontactar').hide();
    $('#div-contactar-slider').show();



    // Intercept the form submission
    $('#formulario-boton-finalizar').click(function (e) {
        e.preventDefault(); // Prevent default form submission behavior

        $('#gif-error-boton-finalizar-2').hide();

        // Validation checks
        var email = $('#contact-email').val();
        var message = $('#contact-message').val();
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email validation regex

        if ($('#contact-name').val() &&
            email &&
            emailRegex.test(email) &&
            message.length > 24 &&
            message &&
            message.length <= 1000) {

            $('#gif-cargando-boton-finalizar-2').show();
            $('#formulario-boton-finalizar').hide();

            // Collect all form data
            var formData = {
                cliente_nombre: $('#contact-name').val(),
                cliente_email: $('#contact-email').val(),
                cliente_phone: $('#contact-phone').val(),
                contact_message: $('#contact-message').val(),
                ISO_language: subdomain,
                pageurl: window.location.href
            };

            console.log('2');

            // Send the POST request
            $.post('https://n8n.sacacitas.com/webhook/procedures-contact', formData)
                .done(function (response) {
                    // Handle success
                    console.log('Form successfully submitted:', response);
                    // Optionally, show a success message to the user

                    // Hide and show the divs
                    $('#gif-cargando-boton-finalizar-2').hide();
                    $('#gif-success-boton-finalizar-2').show();
                })
                .fail(function (error) {
                    console.log('3');

                    // Handle error
                    console.log('Form submission failed:', error);
                    // Optionally, show an error message to the user

                    $('#gif-cargando-boton-finalizar-2').hide();
                    $('#gif-error-boton-finalizar-2').show();


                    //if error call to webhook
                    $.ajax({
                        url: "https://n8n.sacacitas.com/webhook/error-alerts",
                        type: "POST",
                        contentType: "application/json", // Specify content type as JSON
                        dataType: 'json',
                        data: JSON.stringify({
                            LocalisationError: "web_contact-procedure-tramites",
                            Extrainfo: "Llamar a n8n para enviar el mesnaje contacto de tramite", // Add extra text or data
                            errorCode: 500 // Example of sending an additional error code
                        }),
                        success: function (response) {
                            console.log("Success:", response);
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            console.error("Error:", errorThrown);
                        }
                    });


                });

        } else {
            $('#gif-error-boton-finalizar-2').show(); // Show error gif if validation fails
        }
    });

});
