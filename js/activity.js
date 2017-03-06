define(function (require) {
    var activity = require("sugar-web/activity/activity");
    var datastore = require("sugar-web/datastore");
    var jquery = require("../js/jquery.js");	
    var representa = require("../js/representa.js");
    var reconoce = require("../js/reconoce.js");
    var practica = require("../js/practica.js");

    var representaSerie = null;
    var representaLifeCount = null;
    var representaWinCount = null;

    var reconoceSerie = null;
    var reconoceLifeCount = null;
    var reconoceWinCount = null;


    function Representa() {
        representaLifeCount = 4;
        representaWinCount = 0;
        $('#life-container-representa').empty();
        for (var i = 1; i <= representaLifeCount; i++) {
            $('#life-container-representa').append('<button id="life-representa-'+i+'" class="life-representa-icon"></button>');
        };
    };

    function ramdomSerie_Representa() {
        representaSerie = representa[Math.floor(Math.random() * representa.length)];
        //$('#representa-img').css('background', 'url('+tmp.img+') no-repeat 0 0');
        $('#representa-img').css('background', 'url('+representaSerie.img+')');
        $('#representa-text').html(representaSerie.serie);
    };

    function check_Representa() {
        console.log(representaSerie)
        return parseInt($('#representa-op').val()) == representaSerie.op1;
    };

    function addScore_Representa() {
        if (representaWinCount < 10) {
            $("#score").html("0"+representaWinCount);
        }else{
            $("#score").html(representaWinCount);
        }
    };

    function addLife_Representa() {
        $("#life-representa").html(representaLifeCount);
    };

   function Reconoce() {
        reconoceLifeCount = 4;
        reconoceWinCount = 0;
        $('#life-container-reconoce').empty();
        for (var i = 1; i <= reconoceLifeCount; i++) {
            $('#life-container-reconoce').append('<button id="life-reconoce-'+i+'" class="life-reconoce-icon"></button>');
        };
    };

    function ramdomSerie_Reconoce() {
        reconoceSerie = reconoce[Math.floor(Math.random() * reconoce.length)];
        //$('#representa-img').css('background', 'url('+tmp.img+') no-repeat 0 0');
        $('#reconoce-img').css('background', 'url('+reconoceSerie.img+')');
        console.log(reconoceSerie)
    };

    function check_Reconoce() {
        var hits = 0;
        if (parseInt($('#reconoce-num').val()) == reconoceSerie.serie[0]) {
            hits++;
        } else{
            $('#reconoce-num').val('');
        }

        if (parseInt($('#reconoce-den').val()) == reconoceSerie.serie[1]) {
            hits++;
        } else{
            $('#reconoce-den').val('');
        }

        if (parseInt($('#reconoce-fra-num').val()) == reconoceSerie.serie[0]) {
            hits++;
        } else{
            $('#reconoce-fra-num').val('');
        }

        if (parseInt($('#reconoce-fra-den').val()) == reconoceSerie.serie[1]) {
            hits++;
        } else{
            $('#reconoce-fra-den').val('');
        }

        if (hits == 4) {
            return true;
        } else{
            return false;
        }
    };

    function addScore_Reconoce() {
        if (reconoceWinCount < 10) {
            $("#score-reconoce").html("0"+reconoceWinCount);
        }else{
            $("#score-reconoce").html(reconoceWinCount);
        }
    };

    function addLife_Reconoce() {
        $("#life-reconoce").html(reconoceLifeCount);
    };

    // Manipulate the DOM only when it is ready.
    require(['domReady!'], function (doc) {


        // Initialize the activity.
        activity.setup();
        $('#play').on('click', function(){
            $('#bienvenida').toggle();
            $('#menu').toggle();
        });
        $('#back-menu').on('click', function(){
            $('#bienvenida').toggle();
            $('#menu').toggle();
        });

        $('#history').on('click', function(){
            $('#modal').removeClass('hidden');
            $('#modal-content').removeClass('hidden');
        });

        $('#help-representa').on('click', function(){
            $('#modal').removeClass('hidden');
            $('#modal-content').removeClass('hidden');
        });
        $('#help-reconoce').on('click', function(){
            $('#modal').removeClass('hidden');
            $('#modal-content').removeClass('hidden');
        });

        $('#close-modal').on('click', function(){
            $('#modal').addClass('hidden');
            $('#modal-content').addClass('hidden');
        });

        $('#back-representa').on('click', function(){
            $('#representa').toggle();
            $('#menu').toggle();
        });

        $('#back-reconoce').on('click', function(){
            $('#reconoce').toggle();
            $('#menu').toggle();
        })

        $('#representa-button').on('click', function(){
            $('#menu').toggle();
            $('#representa').toggle();
            
            Representa();
            addLife_Representa();
            addScore_Representa();
            ramdomSerie_Representa();
        });

        $('#check-representa').on('click', function() {
            if(check_Representa() == true) {
                $('#msg-representa').html('¡Muy bien, continúa así!');
                $('#msg-representa').removeClass('hidden');
                setTimeout(function(){ $('#msg-representa').addClass('hidden'); }, 2000);
                $('#representa-op').val('');
                representaWinCount++;
                addScore_Representa();
                if (representaWinCount == 3) { //cambiar para cantidad de aciertos
                    window.alert('pasaste!');
                }
            }else {
                $('#msg-representa').html('¡Te has equivocado!');
                $('#msg-representa').removeClass('hidden');
                setTimeout(function(){ $('#msg-representa').addClass('hidden'); }, 2000);
                $('#representa-op').val('');
                $('#life-representa-'+representaLifeCount).fadeOut();
                representaLifeCount--;
                addLife_Representa();
                if (representaLifeCount == 0) {
                    window.alert('perdiste!');
                    $('#representa').toggle();
                    $('#menu').toggle();
                }
            }
            ramdomSerie_Representa();
        });

        $('#reconoce-button').on('click', function(){
            $('#menu').toggle();
            $('#reconoce').toggle();
            
            Reconoce();
            addLife_Reconoce();
            addScore_Reconoce();
            ramdomSerie_Reconoce();
        });

        $('#check-reconoce').on('click', function() {
            if(check_Reconoce() == true) {
                $('#msg-reconoce').html('¡Muy bien, continúa así!');
                $('#msg-reconoce').removeClass('hidden');
                setTimeout(function(){ $('#msg-reconoce').addClass('hidden'); }, 2000);
                $('#reconoce-num').val('');
                $('#reconoce-den').val('');
                $('#reconoce-fra-num').val('');
                $('#reconoce-fra-den').val('');
                reconoceWinCount++;
                addScore_Reconoce();
                ramdomSerie_Reconoce();
                if (reconoceWinCount == 3) { //cambiar para cantidad de aciertos
                    window.alert('pasaste!');
                }
            }else {
                $('#msg-reconoce').html('¡Te has equivocado en algun numero!');
                $('#msg-reconoce').removeClass('hidden');
                setTimeout(function(){ $('#msg-reconoce').addClass('hidden'); }, 2000);
                $('#life-reconoce-'+reconoceLifeCount).fadeOut();
                reconoceLifeCount--;
                addLife_Reconoce();
                if (reconoceLifeCount == 0) {
                    window.alert('perdiste!');
                    $('#reconoce').toggle();
                    $('#menu').toggle();
                }
            }
        });

    });

});
