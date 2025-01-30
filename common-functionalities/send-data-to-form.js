$(document).ready(function () {
    // Complete search and redirect to form page
    $('#LandingProcedureForm').submit(function (event) {

        // Prevent the default form submission behavior
        event.preventDefault();

        //Redirects to the form page
        window.location.href = `https://${subdomain}.sacacitas.com//services/form` //`https://${subdomain}.sacacitas.com/opera/form?INPUT_JSON=` + INPUT_JSON_COMPLETE;


        return false;
    });
});


