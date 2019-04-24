sayit.ecrans["ecran-jeux"] = (function () {
    var indexPhraseCourante = 0,
        niveauMax = sayit.niveauMax,
        niveauActuel = sayit.niveauActuel,
        phraseCourante = sayit.data[niveauActuel - 1][0],
        transcript = "",
        totalTexteNiveau = sayit.data[niveauActuel - 1].length,
        animationSlide = false,
        stage = new createjs.Stage("words-area"),
        canvas = stage.canvas,
        ctx = canvas.getContext("2d"),
        text = new createjs.Text(phraseCourante, "bold 32 px Geo", "black"),
        micActif = false,
        micEnabled = false,
        speaking = false,
        score = -1,
        cWidth = stage.canvas.width,
        cHeight = stage.canvas.height;


    function updateScore() {
        score++;
        var texte_dt = dom.$("#score")[0];
        texte_dt.textContent = "score: " + score + "/" + totalTexteNiveau;
    }

    function nouveauTexte() {
        var textMetrics = ctx.measureText(phraseCourante);
        var tWidth = textMetrics.width;
        var x = (cWidth - tWidth) / 2;
        createjs.Tween.get(text).to({
            x: -tWidth
        }, 1000).call(handleSlideTweenComplete);
    }

    function handleAlphaTweenComplete() {
        micEnabled = false
        var instance = createjs.Sound.play("saythis");
        instance.on("complete", saythisPlayedHandler);
        instance.volume = 0.5;
    }

    function handleSlideTweenComplete() {
        if (indexPhraseCourante < (totalTexteNiveau - 1)) {
            indexPhraseCourante++;
            phraseCourante = sayit.data[niveauActuel - 1][indexPhraseCourante];
            var textMetrics = ctx.measureText(phraseCourante);
            var tWidth = textMetrics.width;
            var tHeight = textMetrics.height;
            var x = (cWidth - tWidth) / 2;
            var y =
                text.text = phraseCourante;
            text.alpha = 0;
            text.x = x;
            createjs.Tween.get(text).to({
                alpha: 1
            }, 3000).call(handleAlphaTweenComplete);
        } else {
            var instance = createjs.Sound.play("tada");
            if (niveauActuel == niveauMax) {
                sayit.incrementeNiveauMax();
                sayit.enregistrerNiveau();
            }
            sayit.afficherEcran("menu-niveau");

        }
    }

    function activerBoutonMic() {
        var boutonMic = dom.$("#bouton-mic")[0];
        dom.addClass(boutonMic, "actif");
        var instance = createjs.Sound.play("bloop");
        instance.on("complete", bipPlayedHandler);
        instance.volume = 0.5;
        micActif = true;
    }

    function desactiverBoutonMic() {
        var boutonMic = dom.$("#bouton-mic")[0];
        dom.removeClass(boutonMic, "actif");
        sayit.recog.recognition.stop();
        micActif = false;
    }

    function tick(event) {
        stage.update(event);
    }

    function bipPlayedHandler(event) {
        micActif = true;
        sayit.recog.start();
    }

    function saythisPlayedHandler() {
        desactiverBoutonMic();
        micEnabled = true;
        transcript = ""
    }

    function coinPlayedHandler() {
        text.color = "black";
        var texte_dit = dom.$("#texte-dit")[0];
        dom.removeClass(texte_dit, "actif");
        updateScore();
        nouveauTexte();
    }

    function errorPlayedHandler() {
        desactiverBoutonMic();
        text.color = "red";
        var texte_dit = dom.$("#texte-dit")[0];
        dom.addClass(texte_dit, "actif");
        var texte_dt = dom.$("#texte-dt")[0];
        texte_dt.textContent = transcript;
        var instance = createjs.Sound.play("saythis");
        instance.on("complete", saythisPlayedHandler);
        instance.volume = 0.5;
    }

    function ennoncerTexte() {
        console.log(speaking)
        desactiverBoutonMic();
        speaking = true;

        var msg = new SpeechSynthesisUtterance(phraseCourante);
        //msg.rate = 0.7;
        msg.lang = "en-US";
        msg.onend = function () {
            console.log("ok")
            micEnabled = true;
            speaking = false;
        };
        window.speechSynthesis.speak(msg);
    }

    function setup() {
        niveauMax = sayit.niveauMax;
        niveauActuel = sayit.niveauActuel;
        phraseCourante = sayit.data[niveauActuel - 1][0];
        transcript = "";
        totalTexteNiveau = sayit.data[niveauActuel - 1].length;
        indexPhraseCourante = 0;

        desactiverBoutonMic();

        createjs.Sound.registerSound("sounds/saythis.ogg", "saythis");
        createjs.Sound.registerSound("sounds/bloop.ogg", "bloop");
        createjs.Sound.registerSound("sounds/coin.ogg", "coin");
        createjs.Sound.registerSound("sounds/tada.ogg", "tada");
        createjs.Sound.registerSound("sounds/error.ogg", "error");
        sayit.recog.recognition.onresult = function (event) {
            for (var i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    transcript += event.results[i][0].transcript;
                }
            }
            transcript = transcript.replace("?", "").trim();
            micEnabled = false;
            console.log("transcript", transcript);
            desactiverBoutonMic();
            if (transcript.toLowerCase() == phraseCourante.replace("?", "").trim().toLowerCase()) {
                var instance = createjs.Sound.play("coin");
                instance.on("complete", coinPlayedHandler);
                instance.volume = 0.5;
            } else {
                var instance = createjs.Sound.play("error");
                instance.on("complete", errorPlayedHandler);
                instance.volume = 0.5;
            }
        };

        sayit.recog.recognition.onerror = function (event) {
            desactiverBoutonMic();
        };

        var retourMenuPrinc = dom.$("#retour-menu-princ")[0];
        dom.bind(retourMenuPrinc, "click", function (e) {
            sayit.afficherEcran("menu-principal");
        });

        var retourMenuNiv = dom.$("#retour-menu-niv")[0];
        dom.bind(retourMenuNiv, "click", function (e) {
            sayit.afficherEcran("menu-niveau");
        });

        var boutonMic = dom.$("#bouton-mic")[0];
        dom.bind(boutonMic, "click", function (e) {
            if (micEnabled) {
                if (!micActif) {
                    activerBoutonMic();
                } else {
                    desactiverBoutonMic();
                }
            }
        });

        var boutonSpeak = dom.$("#bouton-speak")[0];
        dom.bind(boutonSpeak, "click", function (e) {
            ennoncerTexte();
        });
        score = -1;

        updateScore();
        stage.removeAllChildren();

        var textMetrics = ctx.measureText(phraseCourante);
        var tWidth = textMetrics.width;
        text.text = phraseCourante;
        text.x = (cWidth - tWidth) / 2;
        text.y = 30;
        text.alpha = 0;
        stage.addChild(text);
        stage.update();
        createjs.Ticker.addEventListener("tick", tick);
        createjs.Tween.get(text).to({
            alpha: 1
        }, 1000).call(handleAlphaTweenComplete);
        var lvl_header = dom.$("#lvl-header")[0];
        lvl_header.textContent = "level " + niveauActuel;

        if (niveauActuel > 1) {
            var lvl1 = dom.$("#logo-lvl" + (niveauActuel - 1))[0];
            dom.removeClass(lvl1, "actif");
            var lvl2 = dom.$("#logo-lvl" + niveauActuel)[0];
            dom.addClass(lvl2, "actif");
        }
    }

    function executer() {
        ctx.font = "bold 32px Geo";
        setup();
    }

    return {
        executer: executer
    };
})();
