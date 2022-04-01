class AbsCiment extends Abs {
    constructor() {
        super();
        this.nbTentatives = 0;
    }

    /**
     * un seul message est traité par l'abstraction de ciment : MOT_TAPE, pour compter le nombre de tentative (en fait, le nombre de proposition de mot, fait à chaque touche appuyée)
     * @param message : le message traité est MESSAGE.MOT_TAPE
     * @param piecejointe : non utilisé ici
     * @returns {*} si le message est le bon, retourne le nombre de tentative
     */
    reçoitMessage(message, piecejointe) {
        let result = "";
        if (message == MESSAGE.MOT_TAPE) {
            this.nbTentatives += 1;
            result = this.nbTentatives;
        }
        else {
            result = super.reçoitMessage(message, piecejointe);
        }
        return result;
    }
}