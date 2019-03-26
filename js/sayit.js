var sayit = (function () {
    var scriptQueue = [],
        numResourcesLoaded = 0,
        numResources = 24,
        ecrans = [],
        niveauMax = 1,
        niveauActuel = 1;

    function init() {
        var preload = new createjs.LoadQueue(true);
        createjs.Sound.registerPlugins([createjs.HTMLAudioPlugin]);
        preload.installPlugin(createjs.Sound);
        preload.on("fileload", handleFileLoaded);
        preload.on("complete", setup);
        //preload.on("error", handleError);
        preload.loadManifest({
            src: "data/manifest.json",
            type: "manifest"
        });
        preload.load();
    }

    function handleError() {
        alert("Une erreur est survenue lors du chargement");
    }

    function handleFileLoaded(event) {
        var item = event.item;
        var result = event.result;
        numResourcesLoaded++;
        switch (item.type) {
            case createjs.Types.JAVASCRIPT:
                document.body.appendChild(result);
                break;
            case createjs.Types.CSS:
                document.head.appendChild(result);
                break;
        }
        var a = Math.round(numResourcesLoaded * 100 / numResources);
        updateProgress(a);
    }

    function updateProgress(progress) {
        dom.$(".progressbar .interieur")[0].style.width = progress + "%";
    }

    function setup() {
        afficherEcran("menu-principal");
    }

    function enregistrerNiveau() {
        if (typeof localStorage != 'undefined') {
            localStorage.niveauEnreg = niveauActuel;
        } else {
            alert('Ce navigateur ne supporte pas le web storage');
        }
    }

    function afficherEcran(ecranId) {
        var $ = dom.$,
            ecranActif = $("#jeux .ecran.actif")[0],
            ecran = $("#" + ecranId)[0];

        if (!sayit.ecrans[ecranId]) {
            alert("Ce module n'est pas encore implémenté!");
            return;
        }

        if (ecranActif) {
            dom.removeClass(ecranActif, "actif");
        }

        dom.addClass(ecran, "actif");
        sayit.ecrans[ecranId].executer();
    }

    function incrementeNiveauMax() {
        if (sayit.niveauMax < 7) sayit.niveauMax++;
    }

    return {
        init: init,
        ecrans: ecrans,
        afficherEcran,
        niveauMax: niveauMax,
        incrementeNiveauMax: incrementeNiveauMax,
        niveauActuel: niveauActuel,
        enregistrerNiveau: enregistrerNiveau
    };
})()
