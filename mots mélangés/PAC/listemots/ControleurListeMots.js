
class CtrlListeMots extends Ctrl {
    constructor(abs, pres) {
        super(abs, pres);
    }

    reçoitMessageDuParent(message, piecejointe) {
        if (message == MESSAGE.MOT_TAPE) {
            let trouve = this.abs.reçoitMessage(message, piecejointe);
            if (trouve) {
                this.pres.reçoitMessage(MESSAGE.CLEAR);
                this.abs.reçoitMessage(MESSAGE.LISTE);
                this.parent.reçoitMessageDUnEnfant(MESSAGE.MOT_TROUVE, "", this);
            }

        }
        else if (message == MESSAGE.INIT) {
            this.pres.reçoitMessage(MESSAGE.CLEAR);
            this.abs.reçoitMessage(MESSAGE.LISTE);
        }
        else super.reçoitMessageDUnEnfant(message, piecejointe);
    }

    reçoitMessageDeLAbstraction(message, piecejointe) {
        if (message == MESSAGE.MOT_TROUVE) this.pres.reçoitMessage(message, piecejointe);
        else if (message == MESSAGE.MOT_NON_TROUVE) this.pres.reçoitMessage(message, piecejointe);
        else super.reçoitMessageDeLAbstraction(message, piecejointe);
    }
}
