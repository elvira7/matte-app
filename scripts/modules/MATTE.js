/**
 * Created by elvira on 24/05/2017.
 */
var MATTE = (function () {

    var getRandomTask = function (sign) {
        var limit, signStr, randomNumber1, randomNumber2;

        if (sign == 1) {
            limit = 20;
            signStr = " + ";
            randomNumber1 = Math.floor(Math.random() * 10);
            randomNumber2 = Math.floor(Math.random() * 10);
        }
        else {
            limit = 30;
            signStr = " - ";
            randomNumber1 = Math.floor(Math.random() * 30);
            do {
                randomNumber2 = Math.floor(Math.random() * 30);
            } while (randomNumber2 > randomNumber1);
        }


        var answer = randomNumber1 + sign * randomNumber2;

        var options = [answer];

        while (options.length < 4) {
            var randomNumber = Math.floor(Math.random() * limit);
            if (options.indexOf(randomNumber) == -1) {
                options.push(randomNumber)
            }
        }

        return {
            task: randomNumber1 + signStr + randomNumber2 + " = ?",
            answer: answer,
            options: options.sort( function() { return Math.random() - .5 } )
        }

    }; //end of getRandomAdditionTask

    var getSequenceNumbers = function(){
        var randomNum = Math.floor(Math.random() * 21);
        var randomNumArray = [randomNum];
        while(randomNumArray.length < 4) {
            randomNum = randomNum + 1;
            if (randomNumArray.indexOf(randomNum) == -1) {
                randomNumArray.push(randomNum);
            }
        }
        return randomNumArray;
    }; //end of getSequenceNumber

    return {
        getRandomTask: getRandomTask,
        getSequenceNumbers: getSequenceNumbers

    }
}()); //end of the module