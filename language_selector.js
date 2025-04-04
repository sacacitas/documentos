// Function to run after the DOM has fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // Function to set a cookie for the parent domain (accessible from all subdomains)
    function setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        // Set cookie for the parent domain to ensure it's shared across all subdomains
        document.cookie = name + "=" + (value || "") + expires + "; path=/; domain=.sacacitas.com; SameSite=None; Secure";
    }

    // Function to get a cookie value
    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i].trim();
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Check if a language cookie already exists
    var currentLanguage = getCookie('SC_lang');
    var currentSubdomain = window.location.hostname.split('.')[0];  // Get the subdomain

    // Only set the cookie to the current subdomain if no language cookie exists
    if (!currentLanguage) {
        setCookie('SC_lang', currentSubdomain, 365);
    }

    // Attach click event to all anchor tags with the attribute 'ListenerLanguageItems'
    document.querySelectorAll('a[ListenerLanguageItems]').forEach(function (anchor) {
        anchor.addEventListener('click', function (event) {
            // Prevent the default link behavior
            event.preventDefault();

            // Get the value of the ListenerLanguageItems attribute
            var SC_lang = this.getAttribute('ListenerLanguageItems');
            console.log("Selected language (SC_lang):", SC_lang);

            // Update the language cookie with the new selected language
            setCookie('SC_lang', SC_lang, 365);

            // Get the current path and query string
            var currentPath = window.location.pathname + window.location.search;

            // Construct the URL using the language attribute value as the subdomain
            var url = 'https://' + SC_lang + '.sacacitas.com' + currentPath;

            // Redirect to the constructed URL
            window.location.href = url;
        });
    });

});
