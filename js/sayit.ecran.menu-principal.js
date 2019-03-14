sayit.ecrans["menu-principal"] = (function () {
    var niveauActuel = sayit.niveauActuel;

    function initialisation() {
        var boutonStart = dom.$("#bouton-start")[0];
        dom.bind(boutonStart, "click", function (e) {
            niveauActuel = 0
            sayit.afficherEcran("menu-niveau");
        });

        var boutonResume = dom.$("#bouton-resume")[0];

        if (niveauActuel > 0) {
            dom.removeClass(boutonResume, "actif");
        }

        dom.bind(boutonStart, "click", function (e) {
            sayit.afficherEcran("menu-niveau");
        });
    }

    function executer() {
        initialisation();
    }

    return {
        executer: executer
    };
})();
