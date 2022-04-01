class ChronoAbstraction extends Abstraction {
    static CHRONOMAXVALEUR = 99*36000+59*600+599;

    constructor() {
        super();
        this.temps = 0;
        this.interval = -1;
    }


    reçoitMessage(message, piecejointe) {
        if (message === MESSAGE.STOPOULANCER) {
            this.stopOuRelancer();
        }
        else super.reçoitMessage(message, piecejointe);
    }

    stopOuRelancer() {
        if (this.interval >= 0) {
            clearInterval(this.interval);
            this.interval = -1;
        }
        else {
            this.interval = setInterval(() => this.incrementer(), 100);
        }
    }


    incrementer() {
        this.temps += 1;
        if (this.temps > ChronoAbstraction.CHRONOMAXVALEUR) this.temps = 0;
        this.ctrl.reçoitMessageDeLAbstraction(MESSAGE.TEMPS, this.getHeures(), this.getMinutes(), this.getSecondes(), this.getDixiemes())
    }

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
