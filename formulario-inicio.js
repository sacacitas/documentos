
$(document).ready(function () {


    //Crear variables cogiendo las secciones del formulario
    var seccion1 = $('#Secciones-Form-1');
    var seccion2 = $('#Secciones-Form-2');
    var seccion3 = $('#Secciones-Form-3');
    var seccion4 = $('#Secciones-Form-4');
    var seccion5 = $('#Secciones-Form-5');
    var seccion6 = $('#Secciones-Form-6');

    //Crear variables botones de siguiente
    var NextButon1 = $('#Next-Buton-1');
    var NextButon2 = $('#Next-Buton-2');
    var NextButon3 = $('#Next-Buton-3');
    var NextButon4 = $('#Next-Buton-4');
    var NextButon5 = $('#Next-Buton-5');

    //Crear variables botones hacia atrás
    var BackButon1 = $('#Back-Buton-1');
    var BackButon2 = $('#Back-Buton-2');
    var BackButon3 = $('#Back-Buton-3');
    var BackButon4 = $('#Back-Buton-4');
    var BackButon5 = $('#Back-Buton-5');

    //Ocultar secciones divs
    seccion1.show();
    seccion2.hide();
    seccion3.hide();
    seccion4.hide();
    seccion5.hide();
    seccion6.hide();

    //Botones de siguiente. Ocultra y muestra secciones
    $(NextButon1).click(function () {
        seccion1.hide();
        seccion2.show();
    });

    $(NextButon2).click(function () {
        seccion2.hide();
        seccion3.show();
    });

    $(NextButon3).click(function () {
        seccion3.hide();
        seccion4.show();
    });

    $(NextButon4).click(function () {
        seccion4.hide();
        seccion5.show();
    });

    $(NextButon5).click(function () {
        seccion5.hide();
        seccion6.show();
    });


    //Botones hacia atrás. Ocultra y muestra secciones
    $(BackButon1).click(function () {
        seccion1.show();
        seccion2.hide();
    });

    $(BackButon2).click(function () {
        seccion2.show();
        seccion3.hide();
    });

    $(BackButon3).click(function () {
        seccion3.show();
        seccion4.hide();
    });

    $(BackButon4).click(function () {
        seccion4.show();
        seccion5.hide();
    });

    $(BackButon5).click(function () {
        seccion5.show();
        seccion6.hide();
    });





    //Seleccionar botones de selección de tipo de documento. DNI, NIE, Pasaporte
    var selectFormDocPasaporte = $('#select-pasaporte-form');
    var selectFormDocNIE = $('#select-nie-form');
    var selectFormDocDNI = $('#select-dni-form');


    selectFormDocPasaporte.addClass('boton-documento-selected');
 
    // Click event for botonLinkUnicoBusqueda
    selectFormDocPasaporte.click(function () {
        selectFormDocPasaporte.addClass('boton-documento-selected');
        selectFormDocNIE.removeClass('boton-documento-selected');
        selectFormDocDNI.removeClass('boton-documento-selected');
    });                    
    
    // Click event for botonLinkUnicoBusqueda
    selectFormDocNIE.click(function () {
        selectFormDocPasaporte.removeClass('boton-documento-selected');
        selectFormDocNIE.addClass('boton-documento-selected');
        selectFormDocDNI.removeClass('boton-documento-selected');
    });                    
    
    // Click event for botonLinkUnicoBusqueda
    selectFormDocDNI.click(function () {
        selectFormDocPasaporte.removeClass('boton-documento-selected');
        selectFormDocNIE.removeClass('boton-documento-selected');
        selectFormDocDNI.addClass('boton-documento-selected');
    });                    
    






    //Lista desplegable de paises
    var PaisesSelect = document.getElementById('input-lista-paises'); // Replace with the actual ID of your select element
        
    // Mapa paises
    var map_paises = {
        "Alava": "Alava",
        "Albacete": "Albacete",
        "Alicante": "Alicante",
        "Almería": "Almería",
        "Asturias": "Asturias",
        "Avila": "Avila",
        "Badajoz": "Badajoz",
        "Barcelona": "Barcelona",
        "Burgos": "Burgos",
        "Cáceres": "Cáceres",
        "Cádiz": "Cádiz",
        "Cantabria": "Cantabria",
        "Castellón": "Castellón",
        "Ceuta": "Ceuta",
        "Ciudad Real": "CiudadReal",
        "Córdoba": "Córdoba",
        "La Coruña": "LaCoruña",
        "Cuenca": "Cuenca",
        "Gerona": "Gerona",
        "Granada": "Granada",
        "Guadalajara": "Guadalajara",
        "Guipúzcoa": "Guipúzcoa",
        "Huelva": "Huelva",
        "Huesca": "Huesca",
        "Islas Baleares": "IslasBaleares",
        "Jaén": "Jaén",
        "León": "León",
        "Lérida": "Lérida",
        "Lugo": "Lugo",
        "Madrid": "Madrid",
        "Málaga": "Málaga",
        "Melilla": "Melilla",
        "Murcia": "Murcia",
        "Navarra": "Navarra",
        "Orense": "Orense",
        "Palencia": "Palencia",
        "Las Palmas": "LasPalmas",
        "Pontevedra": "Pontevedra",
        "La Rioja": "LaRioja",
        "Salamanca": "Salamanca",
        "Segovia": "Segovia",
        "Sevilla": "Sevilla",
        "Soria": "Soria",
        "Tarragona": "Tarragona",
        "Santa Cruz De Tenerife": "SantaCruzDeTenerife",
        "Teruel": "Teruel",
        "Toledo": "Toledo",
        "Valencia": "Valencia",
        "Valladolid": "Valladolid",
        "Vizcaya": "Vizcaya",
        "Zamora": "Zamora",
        "Zaragoza": "Zaragoza"
    }

    // Añadir un elemento por defecto
    var defaultOption = document.createElement('option');
    defaultOption.value = ''; // Set the value to an empty string or a value that is not present in the array
    defaultOption.text = 'Indica tu nacionalidad';
    defaultOption.disabled = true;
    defaultOption.selected = true; // Make this option selected by default
    PaisesSelect.add(defaultOption);

    // Crear lista en el select
    Object.entries(map_paises).forEach(([user_text, api_key_call]) => {
        var optionElement = document.createElement('option');
        optionElement.value = api_key_call;
        optionElement.text = user_text;
        PaisesSelect.add(optionElement);
    });




    






    //Fecha now
    var DateNow = new Date();

//SECTION: 1 - Escoger fechas máx min
    //Easepicker codigo
    const PickerRangoBusqueda = new easepick.create({
        element: "#checkin",
        css: [
            "https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.css",
            'https://documentos.sacacitas.es/formulario-inicio.css',
        ],
        zIndex: 500,
        lang: "es-ES",
        format: "DD MMMM YYYY",
        grid: 2,
        calendars: 2,
        readonly: true,
        inline: false,
        header: "",
        AmpPlugin: {
            dropdown: {
                months: true,
                minYear: 2024,
                maxYear: 2026
            },
            resetButton: false
        },
        RangePlugin: {
            elementEnd: "#checkout",
            repick: false,
            delimiter: "-",
            locale: {
                zero: "cero",
                one: "días",
                two: "dos",
                few: "unos cuantos",
                many: "muchos",
                other: "días"
            }
        },
        LockPlugin: {
            minDate: (DateNow),
            selectForward: true
        },
        plugins: [
            "AmpPlugin",
            "RangePlugin",
            "LockPlugin"
        ]
    })




    const PickerNacimiento = new easepick.create({
        element: "#input-fecha-nacimiento",
        css: [
            "https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.css"
        ],
        zIndex: 500,
        lang: "es-ES",
        format: "DD MMMM YYYY",
        readonly: true,
        AmpPlugin: {
            dropdown: {
                months: true,
                years: true,
                minYear: 1930,
                maxYear: 2028
            },
            resetButton: true
        },
        LockPlugin: {
            maxDate: (DateNow)
        },
        plugins: [
            "AmpPlugin",
            "LockPlugin"
        ]
    })








  // Get the input element
  const input = document.getElementById('myInput');

  // Add event listener for double click
  input.addEventListener('dblclick', function(event) {
    // Prevent default behavior
    event.preventDefault();
    
    // Remove focus from the input element
    input.blur();
  });







});

