sayit.ecrans["menu-principal"] = (function () {
    function initialisation() {
        var niveauActuel = sayit.niveauActuel;
        var boutonStart = dom.$("#bouton-start")[0];
        dom.bind(boutonStart, "click", function (e) {
            niveauActuel = 0
            sayit.afficherEcran("menu-niveau");
        });

        var boutonResume = dom.$("#bouton-resume")[0];


        if (localStorage.niveauEnreg > 1) {
            dom.addClass(boutonResume, "actif");
            dom.bind(boutonResume, "click", function (e) {
                sayit.niveauActuel = localStorage.niveauEnreg;
                sayit.afficherEcran("menu-niveau");
            });
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
