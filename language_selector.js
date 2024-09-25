$(document).ready(function () {
    // Function to set a cookie
    function setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    console.log(getCookie('SC_lang'));
    // Function to get a cookie value (optional if needed)
    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Attach click event to all anchor tags with the attribute 'listenerlanguageitems'
    $('a[listenerlanguageitems]').on('click', function (event) {
        // Prevent the default link behavior
        event.preventDefault();

        // Get the value of the listenerlanguageitems attribute
        var SC_lang = $(this).attr('listenerlanguageitems');

        // Set the selected language in a cookie
        setCookie('SC_lang', SC_lang, 365);

        // Get the current path and query string
        var currentPath = window.location.pathname + window.location.search;

        // Construct the URL using the language attribute value as the subdomain
        var url = 'https://' + SC_lang + '.sacacitas.com' + currentPath;

        // Redirect to the constructed URL
        window.location.href = url;
    });

    // SWITCHER-4 logic to hide the current language link
    const currentLinksSwitcher4 = $('a[listenerlanguageitems].w--current');
    currentLinksSwitcher4.each(function () {
        $(this).hide();
    });
});
