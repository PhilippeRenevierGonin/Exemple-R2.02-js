
class CtrlGrille extends Ctrl{
    constructor(abs, pres) {
        super(abs, pres);
    }

    reçoitMessageDeLAbstraction(message, piecejointe) {
        if (message == MESSAGE.AJOUTER_LIGNE) {
            this.pres.reçoitMessage(MESSAGE.AJOUTER_LIGNE, piecejointe, arguments[2]);  // le 3e param, c'est le n° de la ligne
        } else if (message == MESSAGE.FIN_INIT) {
            this.tailleLigne = piecejointe;
            this.pres.reçoitMessage(MESSAGE.FIN_INIT);
        } else super.reçoitMessageDeLAbstraction(message, piecejointe);
    }

    reçoitMessageDuParent(message, piecejointe) {
        if (message == MESSAGE.INIT) {
            this.abs.reçoitMessage(message);
        }
        else if (message == MESSAGE.MOT_TROUVE) {
            this.pres.reçoitMessage(MESSAGE.BARRER_SELECTION);
            this.pres.reçoitMessage(MESSAGE.CLEAR);
        }
        else super.reçoitMessageDuParent(message, piecejointe);
    }

    reçoitMessageDeLaPresentation(message, piecejointe) {
        if (message == MESSAGE.MOT_TAPE) {
            this.nouvelleSelection(piecejointe);
            this.parent.reçoitMessageDUnEnfant(message, piecejointe, this);
        } else if (message == MESSAGE.SELECTION_MOT_PAR_CLIC) {
            let selection = piecejointe;

            if (selection.length == 1) this.pres.reçoitMessage(MESSAGE.TRANSITION_INPUT_CLIC, selection); // pour le passage tapé / clic

            let listCoord = [];
            selection.forEach(span => {
                let num = span.coordGrillex+span.coordGrilleY*this.tailleLigne;
                listCoord.push(num);
            });
            let valide = this.abs.reçoitMessage(MESSAGE.VERIF_SELECTION, listCoord);
            this.pres.reçoitMessage(MESSAGE.RESULTAT_VERIF, valide);
            if (valide) {
                let mot = "";
                selection.forEach(span => {
                    mot = mot+span.textContent;
                });
                this.pres.reçoitMessage(MESSAGE.SELECTION_MOT_PAR_CLIC, mot);
                this.parent.reçoitMessageDUnEnfant(MESSAGE.MOT_TAPE, mot, this);
            }
            else {
                this.pres.reçoitMessage(MESSAGE.CLEAR);
            }

        }
        else super.reçoitMessageDeLaPresentation(message, piecejointe);
    }


    nouvelleSelection(mot) {
        let listes = this.abs.reçoitMessage(MESSAGE.SELECTION_MOT, mot);
        let indicesDesCases = [];
        for (let i = 0; i < listes.length; i++) {
            // indicesDesCases[i] est un tableau ou un int
            let chemin = listes[i];
            if (Array.isArray(chemin)) {
                for(let j = 0; j < chemin.length; j++) indicesDesCases.push(chemin[j].indice);
            }
            else {
                indicesDesCases.push(chemin.indice);
            }
        }
        this.pres.reçoitMessage(MESSAGE.SELECTION_CASE, indicesDesCases);
    }
}
