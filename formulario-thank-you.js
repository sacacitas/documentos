// Function to check if a parameter exists in the current URL
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


const RatingValueFormulario = getParameterByName('rating-value-formulario');
const precioCita = getParameterByName('precio-cita');


// Push data to the data layer
dataLayer.push({
    'GTM-formulario-completado': 'GTM-formulario-completado-true',
    'rating-value-formulario': RatingValueFormulario,
    'precio-cita': precioCita,
    });



// Check if the 'redirect' parameter exists in the current URL
var redirectParam = getParameterByName('redirect');
if (redirectParam) {
    // Get all parameters from the current URL
    var urlSearchParams = new URLSearchParams(window.location.search);

    // Initialize an empty array to store parameters for the redirect URL
    var parametersForRedirect = [];

    // Iterate through all parameters to include in the redirect
    for (var pair of urlSearchParams.entries()) {
        if (pair[0] !== 'redirect') { // Exclude 'redirect' parameter
            parametersForRedirect.push(pair.join('='));
        }
    }

    // Build the redirect URL using all parameters except 'redirect'
    var redirectUrl = 'https://www.sacacitas.es/operaciones/fin-tramite';
    if (parametersForRedirect.length > 0) {
        redirectUrl += '?' + parametersForRedirect.join('&');
    }

    // Redirect to the new URL
    window.location.replace(redirectUrl);
}
