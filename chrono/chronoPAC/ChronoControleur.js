class ChronoControleur extends Controleur{
    constructor(nom, abstraction, presentation) {
        super(nom, abstraction, presentation);
    }

    reçoitMessageDeLAbstraction(message, piecejointe) {
        if (message === MESSAGE.TEMPS) {
            this.pres.reçoitMessage(message, arguments[1], arguments[2], arguments[3], arguments[4]);
        } else super.reçoitMessageDeLAbstraction(message, piecejointe);
    }

    reçoitMessageDeLaPresentation(message, piecejointe) {
        if (message === MESSAGE.CLICK)
        {
            this.abs.reçoitMessage(MESSAGE.STOPOULANCER);
        }
        else super.reçoitMessageDeLaPresentation(message, piecejointe);
    }

}




/*

// point d'entrée
document.addEventListener("DOMContentLoaded", () => {

});
*/