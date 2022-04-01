class ChronoAbstractionConnexion extends Abstraction {
    static CHRONOMAXVALEUR = 99*36000+59*600+599;

    constructor() {
        super();
        this.socket = io('http://127.0.0.1:10101/');
        // on reçoit un objet, un objet Temps, c.f. Temps.java sur le serveur
        this.socket.on("temps", (temps) => this.prevenirLeCtrl(temps));
        this.socket.connect();

    }


    reçoitMessage(message, piecejointe) {
        if (message === MESSAGE.STOPOULANCER) {
            this.socket.emit(message);
        }
        else super.reçoitMessage(message, piecejointe);
    }




    prevenirLeCtrl(temps) {
        this.ctrl.reçoitMessageDeLAbstraction(MESSAGE.TEMPS,temps.nbHeures, temps.nbMinutes, temps.nbSecondes, temps.nbDixiemes)
    }


}
