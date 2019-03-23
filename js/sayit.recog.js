sayit.recog = (function () {
    var recognition,
        finalTranscript = "";
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition;

    if (!(('SpeechRecognition' in window) || ('webkitSpeechRecognition' in window))) {
        alert("Mettez à jour votre navigateur pour profiter des fonctionalités de la reconnaissance vocale")
    } else {
        recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.maxAlternatives = 5;
        recognition.continuous = false;
        recognition.onresult = function (event) {
            for (var i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                }
            }
            console.log("Test", finalTranscript);
        };

        recognition.onerror = function (event) {
            console.log(event);
        };
        recognition.onend = function () {};
        recognition.onaudiostart = function () {
            console.log('Audio capturing started');
        }
    }

    function start() {
        if (recognition) {
            finalTranscript = "";
            console.log("sfsdfs");
            recognition.start();
        }
    }

    return {
        recognition: recognition,
        finalTranscript: finalTranscript,
        start: start
    }
})();
