sayit.ecrans["menu-niveau"] = (function () {

    var $ = dom.$;

    function setup() {
        var niveauMax = sayit.niveauMax;
        console.log("niveauMax", niveauMax);
        for (var i = 1; i <= 8; i++) {
            var max = sayit.data[i - 1].length;
            $("#max-lvl" + i)[0].textContent = "max: " + max;
        }
        var niv = [];
        for (var i = 1; i <= niveauMax; i++) {
            niv[i] = $("#niv" + i)[0];
            dom.addClass(niv[i], "actif");
            var a = i;
            dom.bind(niv[i], "click", function (e) {
                sayit.niveauActuel = a;
                sayit.afficherEcran("ecran-jeux");
            });
        }
    }

    function executer() {
        setup();
    }

    return {
        executer: executer
    };
})();
