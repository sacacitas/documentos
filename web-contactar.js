// Set text i18n
var TEXTOS_API = {
    'contact-select-problem-0': 'No encuentro en el buscador lo que necesito',
    'contact-select-problem-1': 'Sugerencias de mejora',
    'contact-select-problem-2': '¿Podéis incluir este servicio?',
    'contact-select-problem-3': 'Problemas con mi búsqueda',
    'contact-select-problem-4': 'Hubo un problema con mi cita reservada',
    'contact-select-problem-5': 'Estoy presentando un error',
    'contact-select-problem-6': 'Trabajar con nosotros',
    'contact-select-problem-7': 'Otro',
    'contact-selector-placeholdertext': 'Máximo 1000 caracteres',
};

$(document).ready(function () {

    // Hide and show the divs
    $('#div-contactar-datoscontactar').hide();
    $('#div-contactar-slider').show();

    // Add options to the select element
    $('#contact-select-problem').append(`
        <option value="NoSearchResults">${TEXTOS_API['contact-select-problem-0']}</option>
        <option value="ImprovementSuggestions">${TEXTOS_API['contact-select-problem-1']}</option>
        <option value="ServiceRequest">${TEXTOS_API['contact-select-problem-2']}</option>
        <option value="SearchIssues">${TEXTOS_API['contact-select-problem-3']}</option>
        <option value="AppointmentProblem">${TEXTOS_API['contact-select-problem-4']}</option>
        <option value="ErrorGeneral">${TEXTOS_API['contact-select-problem-5']}</option>
        <option value="JoinUs">${TEXTOS_API['contact-select-problem-6']}</option>
        <option value="Other">${TEXTOS_API['contact-select-problem-7']}</option>
    `);

    $('#contact-message').attr('placeholder', TEXTOS_API['contact-selector-placeholdertext']);

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
            $('#contact-select-problem').val() && 
            message && 
            message.length <= 1000) {

            $('#gif-cargando-boton-finalizar-2').show();
            $('#formulario-boton-finalizar').hide();

            // Collect all form data
            var formData = {
                cliente_nombre: $('#contact-name').val(),
                cliente_email: $('#contact-email').val(),
                problem_value: $('#contact-select-problem').val(),
                contact_reason: $('#contact-select-problem option:selected').text(), // Get the selected option's text
                contact_message: $('#contact-message').val(),
            };


            // Send the POST request
            $.post('https://n8n.sacacitas.com/webhook/contact', formData)
                .done(function(response) {
                    // Handle success
                    console.log('Form successfully submitted:', response);
                    // Optionally, show a success message to the user

                    // Hide and show the divs
                    $('#gif-cargando-boton-finalizar-2').hide();
                    $('#gif-success-boton-finalizar-2').show();
                })
                .fail(function(error) {
                    // Handle error
                    console.log('Form submission failed:', error);
                    // Optionally, show an error message to the user

                    $('#gif-cargando-boton-finalizar-2').hide();
                    $('#gif-error-boton-finalizar-2').show();
                });        

        } else {
            $('#gif-error-boton-finalizar-2').show(); // Show error gif if validation fails
        }
    });

    // Optionally, deactivate the original form submission behavior
    $('#email-form').submit(function(e) {
        e.preventDefault(); // Prevent the original Webflow form submission
    });

});
