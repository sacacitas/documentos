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

// Check if the 'yourParameter' exists in the current URL
var yourParameter = getParameterByName('?redirect');
if (yourParameter) {
    // If the parameter exists, redirect to another URL
    window.location.href = 'https://www.sacacitas.es/operaciones/fin-tramite';
}
