class ChronoModeleConnexion {
    constructor() {
        this.ecouteurs = [];
        this.socket = io('http://127.0.0.1:10101/');
        // on reçoit un objet, un objet Temps, c.f. Temps.java sur le serveur
        this.socket.on("temps", (temps) => this.prevenirLesEcouteurs(temps));
        this.socket.connect();
    }

    /**************************** Gestion des listeners *******************/
    ajouterEcouteur(ecouteur) {
        this.ecouteurs.push(ecouteur);
    }

    // une méthode interne
    prevenirLesEcouteurs(temps) {
        let i = 0;
        for(i = 0; i < this.ecouteurs.length; i++) {
            this.ecouteurs[i].update(temps.nbHeures, temps.nbMinutes, temps.nbSecondes, temps.nbDixiemes);
        }
    }

    /*************** lancer / arrêter le chrono ********************/
    stopOuRelancer() {
       this.socket.emit("stopOuRelancer");
    }
}
