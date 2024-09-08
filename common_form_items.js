
function ExecuteitiPhoneLibrary() {
    // Add country code to phone number input
    $('input[ms-code-phone-number]').each(function () {
        var input = this;

        // Initialize intlTelInput with your configuration
        const iti = window.intlTelInput(input, {
            onlyCountries: CONFIG_FORM.phone_number,
            separateDialCode: true,
            strictMode: true,
            utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@23.9.3/build/js/utils.js"
        });

        // Attach iti instance to the input element for later use
        $(input).data('itiInstance', iti);

        // Set the user's country based on CountryISOselected or fallback to IP-based location
        let CountryISOselected = CONFIG_FORM.phone_number[0];
        if (typeof CountryISOselected !== 'undefined' && CountryISOselected) {
            iti.setCountry(CountryISOselected);

        } else {
            $.get("https://ipinfo.io", function (response) {
                var countryCode = response.country;
                iti.setCountry(countryCode);
            }, "jsonp");
        }

        // Format phone number as user types
        // input.addEventListener('change', formatPhoneNumber);
        // input.addEventListener('keyup', formatPhoneNumber);

        // function formatPhoneNumber() {
        //     var formattedNumber = iti.getNumber(intlTelInput.utils.numberFormat.NATIONAL);
        //     input.value = formattedNumber;
        // }


        // Format phone number on form submission
        var form = $(input).closest('form');
        form.submit(function () {
            var formattedNumber = iti.getNumber(intlTelInput.utils.numberFormat.E164);
            input.value = formattedNumber;
        });
    });

}