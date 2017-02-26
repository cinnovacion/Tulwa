define(function (require) {
    var activity = require("sugar-web/activity/activity");
    var datastore = require("sugar-web/datastore");
    var jquery = require("../js/jquery.js");	
    var representa = require("../js/representa.js");
    var practica = require("../js/practica.js");

    var representaSerie = null;
    var representaLifeCount = null;
    var representaWinCount = null;

    function Representa() {
        representaLifeCount = 4;
        representaWinCount = 0;
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

    function Practica() {
        this.op1 = 0;
        this.op2 = 0;
        this.scores = 0;
        this.win_count = 0;
    };

    Practica.prototype.addScore = function() {
        if (this.scores < 10) {
            $("#score-practica").html("0"+this.scores);
        }else{
            $("#score-practica").html(this.scores);
        }
    };

    Practica.prototype.randomSerie = function() {
        var tmp = practica[Math.floor(Math.random() * practica.length)];
        this.op1 = tmp.op1;
        this.op2 = tmp.op2;
        var op = 1;
        for (var i=0; i<tmp.serie.length; i++) {
            if (tmp.serie[i] != null) {
                $('button[value="'+ i +'"]').html(tmp.serie[i]);
            }
            else {
                $('button[value="'+ i +'"]').next('input').removeClass('hidden').addClass('op' + op);
                op++;
            }

            $('#serie-text').html(tmp.text);
        }
    };

    Practica.prototype.clean = function() {
        for (var i=0; i<8; i++) {
            $('button[value="'+ i +'"]').html('');
            $('button[value="'+ i +'"]').next('input').addClass('hidden');
            if ($('button[value="'+ i +'"]').next('input').hasClass('op1')) {
                $('button[value="'+ i +'"]').next('input').removeClass('op1');
            }
            else if ($('button[value="'+ i +'"]').next('input').hasClass('op2')) {
                $('button[value="'+ i +'"]').next('input').removeClass('op2');
            }
        }
    };

    Practica.prototype.win = function() {
        if (this.win_count >= 25) {
            return true;
        }
        else {
            return false;
        }
    }

    Practica.prototype.check = function() {
        if (parseInt($('.op1').val()) === this.op1 && parseInt($('.op2').val()) === this.op2) {
            $('.op1').val('');
            $('.op2').val('');
            this.win_count++;
            return true;
        }
        else {
            $('.op1').val('');
            $('.op2').val('');
            return false;
        }
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

        $('#close-modal').on('click', function(){
            $('#modal').addClass('hidden');
            $('#modal-content').addClass('hidden');
        });

        $('#back-representa').on('click', function(){
            $('#representa').toggle();
            $('#menu').toggle();
        });

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

        $('#practica-button').on('click', function(){
            $('#menu').toggle();
            $('#practica').toggle();

            var s = new Practica();
                s.addScore
                s.randomSerie();
                $('#check').on('click', function() {
                    if(s.check()) {
                        console.log(s.win());
                        if(s.win()) {
                            win_msg();
                        }
                        else {
                            s.clean();
                            good_msg();
                            s.randomSerie();
                            s.scores++;
                            s.addScore();
                        }
                    }

                    else {
                        fail_msg();
                    }
                });
        });

    });

});
