sayit.ecrans["ecran-jeux"] = (function () {
    /*var dom = sayit.dom,
    canvas = document.getElementById("words-area"),
    recording = false,
    spokeWithErrors = false,
    score = 0,
    error = [],
    currentText,
    currentLevelData,
    currentLevel = 1,
    fadeAnim = false,
    slideAnim = false,
    previousTs = 0,
    tx = 0,
    maxScore = sayit.data[0].length,
    data,
    context,
    stream;

var ctx = canvas.getContext("2d");
ctx.font = "normal normal 2.5em Geo";

createjs.Ticker.addEventListener("tick", anim);

var client = new BinaryClient('ws://localhost:11001');

var socket = io();
socket.on("update", function (data) {
    switchRecordingOff();
    checkPlayerSpeech(data.toLowerCase());
})

function convertFloat32ToInt16(buffer) {
    l = buffer.length;
    buf = new Int16Array(l);
    while (l--) {
        buf[l] = Math.min(1, buffer[l]) * 0x7FFF;
    }
    return buf.buffer;
}

function recorderProcess(e) {
    var left = e.inputBuffer.getChannelData(0);
    if (recording) {
        var r = stream.write(convertFloat32ToInt16(left));
    }
}

function initializeRecorder(stream) {
    var audioContext = window.AudioContext || window.webkitAudioContext;
    if (!context) context = new audioContext();
    var audioInput = context.createMediaStreamSource(stream);
    var bufferSize = 2048;
    var recorder = context.createScriptProcessor(bufferSize, 1, 1);
    recorder.onaudioprocess = recorderProcess;
    audioInput.connect(recorder);
    recorder.connect(context.destination);
}

function switchRecordingOn() {
    recording = true
    var recordBtn = dom.$("#record")[0];
    dom.addClass(recordBtn, "active");
    stream = client.createStream({
        data: 'audio'
    });
}

function switchRecordingOff() {
    recording = false
    var recordBtn = dom.$("#record")[0];
    dom.removeClass(recordBtn, "active");
    stream.end();
}

function checkPlayerSpeech(data) {
    var words = currentText.toLowerCase().split(" ")
    var cwords = data.trim().split(" ")
    errorText = ""
    error = []
    for (var i = 0; i < words.length; i++) {
        if (cwords[i] != words[i]) {
            errorText += (words[i] + " ")
            error.push(true)
        } else {
            error.push(false)
        }
    }
    errorText = errorText.trim()
    if (errorText != "") {
        fadeAnim = true
    } else {
        updateScore(++score)
        slideAnim = true
    }
}

function anim(event) {
    var currentTs = createjs.Ticker.getEventTime()
    var delta = Math.round(currentTs - previousTs)
    previousTs = Math.round(currentTs)
    if (fadeAnim) {
        ctx.globalAlpha = (ctx.globalAlpha * 10 - 0.05 * 10) / 10
        writeTextResult(currentText, error);
        if (ctx.globalAlpha <= 0) {
            fadeAnim = false;
            ctx.globalAlpha = 1
            currentText = errorText.trim()
            writeTextInit(currentText)
            switchRecordingOn();
        }
    } else if (slideAnim) {
        tx = (tx * 10 + 2 * 10) / 10;
        tx = writeTextInit(currentText, tx * delta);
        var textMetrics = ctx.measureText(currentText);
        var cWidth = textMetrics.width;
        if ((tx + cWidth) <= 0) {
            slideAnim = false;
            if (score == maxScore) {
                score = 0;
                currentLevel = currentLevel + 1;
                console.log('fdjjjjj')
                sayit.showScreen("glass-screen")
            } else {
                currentLevelData.shift()
                currentText = currentLevelData[0].toLowerCase();
                writeTextInit(currentText);
            }
            tx = 0;

        }
    }
}*/

    function setup() {
        /*if (!navigator.getUserMedia) {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
}

if (navigator.getUserMedia) {
    navigator.getUserMedia({
        audio: true,
        video: false
    }, initializeRecorder, function (e) {
        alert('Error capturing audio.');
    });
}

var back = sayit.dom.$("#back")[0]
dom.bind(back, "click", function (e) {
    sayit.showScreen("menu");
});

dom.bind("a.record", "click", function (e) {
    var e = dom.$("#record")[0];
    if (dom.hasClass(e, "active")) {
        switchRecordingOff();
    } else {
        switchRecordingOn();
    }
});*/
    }

    /*function writeTextInit(text, dx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var textMetrics = ctx.measureText(text);
        var cWidth = textMetrics.width;
        var tY = (canvas.height - 5) / 2
        var tX = (canvas.width - cWidth) / 2;
        if (dx) tX -= dx
        ctx.fillStyle = "#000000"
        ctx.fillText(text, tX, tY);
        return tX;
    }

    function writeTextResult(text, error) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var words = text.split(" ");
        var textMetrics = ctx.measureText(text);
        var cWidth = textMetrics.width;
        var tY = (canvas.height - 5) / 2
        var tX = (canvas.width - cWidth) / 2;
        for (var i = 0; i < words.length; i++) {
            ctx.fillStyle = error[i] ? "crimson" : "cadetblue";
            if (i < text.length) {
                ctx.fillText(words[i] + " ", tX, tY);
            } else {
                ctx.fillText(words[i], tX, tY);
            }
            tX += ctx.measureText(words[i] + " ").width
            spokeWithErrors = spokeWithErrors && error[i]
        }
    }

    function updateScore(score) {
        var e = dom.$("#score")[0];
        dom.setValue(e, score + "/" + maxScore);
    }*/

    function executer() {}

    /*function getMaxScore() {
        return maxScore;
    }

    function getCurrentLevel() {
        return currentLevel
    }*/

    return {
        executer: executer
    };
})();
