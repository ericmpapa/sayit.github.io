sayit.screens["glass-screen"] = (function () {
    function setup() {
        var currentLevel = sayit.screens["game-screen"].currentLevel
        var resumeBtn = sayit.dom.$("#resume")[0]
        sayit.dom.bind(resumeBtn, "click", function (e) {
            sayit.showScreen("game-screen", currentLevel > 1);
        });

        var maxScore = sayit.screens["game-screen"].maxScore
        var fblvl = sayit.dom.$("#blvl" + (currentLevel - 1))[0]
        var fslvl = sayit.dom.$("#slvl" + (currentLevel - 1))[0]
        var cblvl = sayit.dom.$("#blvl" + currentLevel)[0]
        var cslvl = sayit.dom.$("#slvl" + currentLevel)[0]
        if (currentLevel > 1) {
            sayit.dom.removeClass(fblvl, "active")
            sayit.dom.removeClass(fslvl, "active")
        }
        console.log(currentLevel)
        sayit.dom.addClass(cblvl, "active")
        sayit.dom.addClass(cslvl, "active")

        var e = sayit.dom.$("#max-score-ind")[0];
        sayit.dom.setValue(e, "max: " + maxScore);
    }

    function run() {
        setup();
    }
    return {
        run: run
    }
})();
