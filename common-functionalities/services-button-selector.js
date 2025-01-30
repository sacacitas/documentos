$(document).ready(function () {        
        // 0. TEMP. SERVICE SEARCH CHANGER -> Change from appointment to general procedures
        // Button logic -> appointments
        $('#service-appointment-select').click(function () {
            //background color
            $('.div-block-services-selected').css('background-color', '#2c64e3');
            $('.div-block-services-nodefault').css('background-color', 'white');

            //text color
            $('.text-service-selected').css('color', 'white');
            $('.text-service-nodefault').css('color', '#071536');

            //div elements
            $('.appointments-elements-buscador').show();
            $('.general-procedures-buscador').hide();

        });

        // Button logic -> general appointments
        $('#general-procedures-select').click(function () {
            //background color
            $('.div-block-services-selected').css('background-color', 'white');
            $('.div-block-services-nodefault').css('background-color', '#2c64e3');

            //text color
            $('.text-service-selected').css('color', '#071536');
            $('.text-service-nodefault').css('color', 'white');


            //div elements
            $('.appointments-elements-buscador').hide();
            $('.general-procedures-buscador').show();

        });

    });

