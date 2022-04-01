

class CtrlCiment extends Ctrl {
    constructor(abs, pres) {
        super(abs, pres);
    }

    /**
     * pour lancer l'initialisation dans la hierarchie
     */
    init() {
        this.enfants.forEach(e => e.reçoitMessageDuParent(MESSAGE.INIT));
    }

    /**
     * Aiguillage des messages entre les enfants de Ciment
     * @param message : 2 messages sont traités MESSAGE.MOT_TAPE (de grille vers listemots) et MESSAGE.MOT_TROUVE (de listemots vers grille)
     * @param piecejointe : le mot tapé pour MESSAGE.MOT_TAPE ; et rien pour MESSAGE.MOT_TROUVE
     * @param ctrl : l'enfant qui appelle reçoitMessageDUnEnfant
     */
    reçoitMessageDUnEnfant(message, piecejointe, ctrl) {
        if (message == MESSAGE.MOT_TAPE) {
            let nb = this.abs.reçoitMessage(message, piecejointe);
            this.pres.reçoitMessage(message, nb);
            this.enfants.forEach(e => {
                if(e != ctrl) e.reçoitMessageDuParent(MESSAGE.MOT_TAPE, piecejointe);
            } );

        }
        else if (message == MESSAGE.MOT_TROUVE) {
            // todo factoriser transmettreAuxEnfants
            this.enfants.forEach(e => {
                if(e != ctrl) e.reçoitMessageDuParent(MESSAGE.MOT_TROUVE, piecejointe);
            } );
        }
        else super.reçoitMessageDUnEnfant(message, piecejointe);
    }
}
