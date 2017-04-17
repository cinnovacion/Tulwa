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

    var practicaSerie = null;
    var practicaLifeCount = null;
    var practicaWinCount = null;


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
        $('#representa-img').css('background', 'url('+representaSerie.img+')no-repeat 0 0');
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
        $('#reconoce-img').css('background', 'url('+reconoceSerie.img+') no-repeat 0 0');
        
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



    function Practica() {
        practicaLifeCount = 4;
        practicaWinCount = 0;
        $('#life-container-practica').empty();
        for (var i = 1; i <= practicaLifeCount; i++) {
            $('#life-container-practica').append('<button id="life-practica-'+i+'" class="life-practica-icon"></button>');
        };
    };

    function ramdomSerie_Practica() {
        practicaSerie = practica[Math.floor(Math.random() * practica.length)];
        $('#num-op1').html(practicaSerie.serie[0]);
        $('#den-op1').html(practicaSerie.serie[1]);
        $('#num-op2').html(practicaSerie.serie[2]);
        $('#den-op2').html(practicaSerie.serie[3]);
        $('#text-op-practica').html(practicaSerie.text);
        
        console.log(practicaSerie)
    };

    function check_Practica() {
            var hits = 0;
        if (parseInt($('#num-res').val()) == practicaSerie.num) {
            hits++;
        } else{
            $('#num-res').val('');
        }

        if (parseInt($('#den-res').val()) == practicaSerie.den) {
            hits++;
        } else{
            $('#den-res').val('');
        }

        if (hits == 2) {
            return true;
        } else{
            return false;
        }
    };

    function addScore_Practica() {
        if (practicaWinCount < 10) {
            $("#score-practica").html("0"+practicaWinCount);
        }else{
            $("#score-practica").html(practicaWinCount);
        }
    };

    function addLife_Practica() {
        $("#life-practica").html(practicaLifeCount);
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
            $('#modal-content').addClass('modal-content-menu');
            $('#modal-content').removeClass('modal-content-game');
            $('#modal-content').css('background-image', 'url(img/historia.png)');
            $('#modal').removeClass('hidden');
            $('#modal-content').removeClass('hidden');
        });

        $('#help-representa').on('click', function(){
            $('#modal-content').addClass('modal-content-menu');
            $('#modal-content').removeClass('modal-content-game');
            $('#modal-content').css('background-image', 'url(img/ayuda_representa-01.png)');
            $('#modal').removeClass('hidden');
            $('#modal-content').removeClass('hidden');
        });
        $('#help-reconoce').on('click', function(){
           $('#modal-content').addClass('modal-content-menu');
            $('#modal-content').removeClass('modal-content-game');
            $('#modal-content').css('background-image', 'url(img/ayuda_reconoce-01-02.png)');
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
        });

        $('#back-practica').on('click', function(){
            $('#practica').toggle();
            $('#menu').toggle();
        });

        $('#representa-button').on('click', function(){
            $('#menu').toggle();
            $('#representa').toggle();
            $('.win-representa').addClass('hidden');
            
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
                if (representaWinCount == 4) { //cambiar para cantidad de aciertos
                     $('.win-representa').removeClass('hidden');
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
                    $('.lose-representa').removeClass('hidden');
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


        $('#practica-button').on('click', function(){
            $('#menu').toggle();
            $('#practica').toggle();
            
            Practica();
            addLife_Practica();
            addScore_Practica();
            ramdomSerie_Practica();
        });

        $('#check-practica').on('click', function() {
            if(check_Practica() == true) {
                $('#msg-practica').html('¡Muy bien, continúa así!');
                $('#msg-practica').removeClass('hidden');
                setTimeout(function(){ $('#msg-practica').addClass('hidden'); }, 2000);
                $('#num-res').val('');
                $('#den-res').val('');
                practicaWinCount++;
                addScore_Practica();
                ramdomSerie_Practica();
                if (practicaWinCount == 3) { //cambiar para cantidad de aciertos
                    window.alert('pasaste!');
                }
            }else {
                $('#msg-practica').html('¡Te has equivocado en algun numero!');
                $('#msg-practica').removeClass('hidden');
                setTimeout(function(){ $('#msg-practica').addClass('hidden'); }, 2000);
                $('#life-practica-'+practicaLifeCount).fadeOut();
                practicaLifeCount--;
                addLife_Practica();
                if (practicaLifeCount == 0) {
                    window.alert('perdiste!');
                    $('#practica').toggle();
                    $('#menu').toggle();
                }
            }
        });

    });

});
