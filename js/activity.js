define(function (require) {
    var activity = require("sugar-web/activity/activity");
    var datastore = require("sugar-web/datastore");
    var jquery = require("../js/jquery.js");	
    var representa = require("../js/representa.js");
    var practica = require("../js/practica.js");

    function win_msg() {
        $('.win').removeClass('hidden');
    }

    function fail_msg() {
        $('.bad').removeClass('hidden');
        setTimeout(function() {
            $('.bad').addClass('hidden');
        }, 1500);
    }

    function good_msg() {
        $('.good').removeClass('hidden');
        setTimeout(function() {
            $('.good').addClass('hidden');
        }, 1500);
    }

    function Representa() {
        this.op1 = 0;
        this.scores = 0;
        this.win_count = 0;
    };

    Representa.prototype.addScore = function() {
        if (this.scores < 10) {
            $("#score").html("0"+this.scores);
        }else{
            $("#score").html(this.scores);
        }
    };

    Representa.prototype.randomSerie = function() {
        var tmp = representa[Math.floor(Math.random() * representa.length)];
        this.op1 = tmp.op1;
        $('#representa-img').css('background', 'url('+tmp.img+') no-repeat 0 0');
        var op = 1;
        for (var i=0; i<tmp.serie.length; i++) {
            if (tmp.serie[i] != null) {
                $('button[value="'+ i +'"]').html(tmp.serie[i]);
            }
            else {
                $('button[value="'+ i +'"]').next('input').removeClass('hidden').addClass('op' + op);
                op++;
            }

        }
    };

    Representa.prototype.clean = function() {
        for (var i=0; i<8; i++) {
            $('button[value="'+ i +'"]').html('');
            $('button[value="'+ i +'"]').next('input').addClass('hidden');
            if ($('button[value="'+ i +'"]').next('input').hasClass('op1')) {
                $('button[value="'+ i +'"]').next('input').removeClass('op1');
            }
        }

    };

    Representa.prototype.win = function() {
        if (this.win_count >= 15) {
            return true;
        }
        else {
            return false;
        }
    }

    Representa.prototype.check = function() {
        if (parseInt($('.op1').val()) === this.op1) {
            $('.op1').val('');
            this.win_count++;
            return true;
        }
        else {
            $('.op1').val('');
            return false;
        }


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
        $('#entrar').on('click', function(){
            $('#bienvenida').toggle();
            $('#menu').toggle();
        });

        $('#representa-button').on('click', function(){
            $('#menu').toggle();
            $('#representa').toggle();

            var s = new Representa();
                s.addScore
                s.randomSerie();
                $('#check-representa').on('click', function() {
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
                $('.serie-again').on('click', function(e) {
                    s.clean();
                    s.randomSerie();
                    $('.win').addClass('hidden');
                });
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
                $('.serie-again').on('click', function(e) {
                    s.clean();
                    s.randomSerie();
                    $('.win').addClass('hidden');
                });
        });




    });

});
