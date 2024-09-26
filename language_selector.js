$(document).ready(function () {
    // Function to set a cookie for the parent domain (accessible from all subdomains)
    function setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        // Set cookie for the parent domain to ensure it's shared across all subdomains
        document.cookie = name + "=" + (value || "") + expires + "; path=/; domain=.sacacitas.com";
    }

    // Attach click event to all anchor tags with the attribute 'ListenerLanguageItems'
    $('a[ListenerLanguageItems]').on('click', function (event) {
        // Prevent the default link behavior
        event.preventDefault();

        // Get the value of the listenerlanguageitems attribute
        var SC_lang = $(this).attr('ListenerLanguageItems');
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
