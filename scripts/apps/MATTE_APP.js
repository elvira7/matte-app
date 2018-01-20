/**
 * Created by elvira on 24/05/2017.
 */
var MATTE_APP = {
    //HTML objects

    taskText: null,
    message: null,
    answerContainer: null,
    ddContainer: null,
    taskHeader: null,


    //init
    init: function () {

        var taskCount = 5;
        var taskIndex = 1;
        var sign;
        var correctAnswers = 0;

        var setHTMLObjects = function(){
            MATTE_APP.taskText = $("#task-text");
            MATTE_APP.message = $("#message");
            MATTE_APP.answerContainer = $("#answer-container");
            MATTE_APP.ddContainer = $("#dd-container");
            MATTE_APP.taskHeader = $("#task-header");

        }();

        var dragAndDrop = function () {

            /*-- draggable elements --*/

            $(".answer").draggable({

                containment: 'sliding-container',
                stack: '#answer-container div',
                snap: true,
                revert: true

            })

            /*-- droppable elements --*/

            $(".dashed").droppable({
                /*over: function (e, ui) {
                    var id = ui.draggable.attr("id");
                },
                out: function(e, ui) {
                    var id = ui.draggable.attr("id");
                },*/
                drop: handleDrop

            });


        };

        /*-- Handle the drop --*/

        var handleDrop = function (event, ui) {
            var dashedBoxNumber = $(this).data('number');
            var sequenceNumber = ui.draggable.data('number');

            if(dashedBoxNumber == sequenceNumber){
                ui.draggable.draggable('disable');
                $(this).droppable('disable');
                ui.draggable.position({ of: $(this), my: 'left top', at: 'left top'});
                ui.draggable.draggable( 'option', 'revert', false );
                correctAnswers++;
            }
            if(correctAnswers ==4){
                showCorrectAnswerMessage();
                $("#star-" + taskIndex).attr("src", "images/star-yellow.png");
                correctAnswers = 0;
                goToNextAction(showSequenceTask);
            }

        };

         var showSequenceTask = function() {
             var sequence = MATTE.getSequenceNumbers();
             setSequenceNumbers(sequence);
             dragAndDrop();
         };

        var setSequenceNumbers = function (sequence) {
            var i=0;
            MATTE_APP.ddContainer.empty();
            MATTE_APP.answerContainer.empty();

            for (i = 0; i<sequence.length; i++) {
                var number = sequence[i];

                var dashedBox = $("<div class='dashed'></div>")
                    .data('number', number);
                MATTE_APP.ddContainer.append(dashedBox);
            }

            sequence = sequence.sort( function() { return Math.random() - .5 } );

            for (i = 0; i<sequence.length; i++) {
                var number = sequence[i];
                var answerEl = $("<div class='answer'  id='answer-" + i + "'></div>")
                    .data('number', number)
                    .html(number);
                MATTE_APP.answerContainer.append(answerEl);
            }
         };


        var showSimpleTasks = function () {
            var taskObj = MATTE.getRandomTask(sign);

            MATTE_APP.taskText.html(taskObj.task);
            setAnswers(taskObj);
        };

        var setAnswers = function(taskObj) {

            MATTE_APP.answerContainer.empty();

            for (var i=0; i<taskObj.options.length; i++) {
                var number = taskObj.options[i];
                var answerEl = $("<div class='answer'></div>")
                    .html(number);
                MATTE_APP.answerContainer.append(answerEl);
                if (number == taskObj.answer) {
                    answerEl.click(function() {
                        handleCorrectAnswer($(this));
                    });
                }
                else {
                    answerEl.click(showWrongAnswerMessage);
                }
            }
        };


        var goToNextAction = function (callback) {
            setTimeout(function() {
                $('#sliding-container').hide( "slide", {}, 1000, function() {
                    MATTE_APP.message.html('');
                    $('#sliding-container').removeAttr( "style" );
                    if (taskIndex == taskCount) {
                        showMainPage();
                    }
                    else {
                        taskIndex++;
                        callback();
                    }
                });
            }, 1000);
            
        }

        var handleCorrectAnswer = function (answerDiv, slideContainer) {
            showCorrectAnswerMessage();
            changeBorderColor(answerDiv);
            $("#star-" + taskIndex).attr("src", "images/star-yellow.png");
            goToNextAction(showSimpleTasks);

        };

        var changeBorderColor = function (obj) {
            obj.css({'border-color': 'green'});
        };

        var showCorrectAnswerMessage = function() {
            if (taskIndex == taskCount) {
                MATTE_APP.message.css({color: 'green'}).html("Greit! Det var den siste oppgave!");
            }
            else {
                MATTE_APP.message.css({color: 'green'}).html("Det var riktig!");
            }
        };

        var showWrongAnswerMessage = function() {
            MATTE_APP.message.css({color: 'red'}).html("Det var feil! Prøv en gang til :-)");
        };

        var showMainPage = function() {
            taskIndex = 1;
            $("main").removeClass();
            MATTE_APP.taskText.html('');
            MATTE_APP.answerContainer.empty();
            $(".star").attr("src", "images/star-white.png");
        };


        $(".menu.task").click(function () {
            $("main").addClass("hide task");
        });

        $("#order").click(function () {
            $("main").addClass("hide sequence");
        });

        $("#back-btn").click(function () {
            showMainPage();
        });

        $("#addition").click(function() {
            sign = 1;
            showSimpleTasks();
        });

        $("#subtraction").click(function() {
            sign = -1;
            showSimpleTasks();
        });

        $("#order").click(showSequenceTask);

    } // end init
}; // end MATTE_APP