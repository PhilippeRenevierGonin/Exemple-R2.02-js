class ChronoModele {
    static CHRONO_MAX_VALEUR = 99*36000+59*600+599;

    constructor() {
        this.temps = 0;
        this.ecouteurs = [];
        this.interval = -1;
    }


    /**************************** Gestion des listeners *******************/
    ajouterEcouteur(ecouteur) {
        this.ecouteurs.push(ecouteur);
    }

    // une méthode interne
    prevenirLesEcouteurs() {
        let i = 0;
        for(i = 0; i < this.ecouteurs.length; i++) {
            this.ecouteurs[i].update(this.getHeures(), this.getMinutes(), this.getSecondes(), this.getDixiemes());
        }
    }


    /*************** lancer / arrêter le chrono ********************/
    stopOuRelancer() {
        if (this.interval >= 0) {
            clearInterval(this.interval);
            this.interval = -1;
        }
        else {
            this.interval = setInterval(() => this.incrementer(), 100);
        }
    }

    // une méthode interne
    incrementer() {
        this.temps += 1;
        if (this.temps > ChronoModele.CHRONO_MAX_VALEUR) this.temps = 0;
        this.prevenirLesEcouteurs();
    }


    /************************ Getter, a priori interne ****************************/

    getHeures() {
        let nbSecondes = Math.floor(this.temps  / 10);
        let nbH = Math.floor(nbSecondes / 3600);

        return nbH;
    }

    getMinutes() {
        let nbSecondes = Math.floor(this.temps  / 10);
        nbSecondes = nbSecondes - this.getHeures()*3600;
        let nbM = Math.floor( nbSecondes  / 60);

        return nbM;
    }

    getSecondes() {
        let nbSecondes = Math.floor(this.temps  / 10);
        nbSecondes = nbSecondes - this.getHeures()*3600 - this.getMinutes() * 60;
        return nbSecondes;
    }

    getDixiemes() {
        let nbDixièmes = this.temps  % 10;
        return nbDixièmes
    }

}
