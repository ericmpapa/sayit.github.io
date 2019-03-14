sayit.ecrans["menu-niveau"] = (function () {
    var niveauActuel = sayit.niveauActuel;
    var $ = dom.$;

    function setup() {
        for (var i = 1; i <= niveauActuel; i++) {
            var niv = $("#niv" + i)[0];
            dom.addClass(niv, "actif");
            dom.bind(niv, "click", function (e) {
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
