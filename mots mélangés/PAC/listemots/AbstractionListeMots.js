class Mot {
    constructor(mot) {
        this.mot = mot.toUpperCase();
        this.trouve = false;
    }
}

class AbsListeMots extends Abs {
    constructor() {
        super();
        this.listes = [];
        this.listes.push(new Mot("croc"));
        this.listes.push(new Mot("solution"));
        this.listes.push(new Mot("lac"));
        this.listes.push(new Mot("AAAA"));
    }

    reçoitMessage(message, piecejointe) {
        let result = "";
        if (message == MESSAGE.MOT_TAPE) {
            let mot = piecejointe;
            let recherche = this.listes.filter(m => {
                let r = (m.mot == mot) ;
                if (r) m.trouve = true; // par effet de bord, le mot sera bien modifié
                return r;
            });
            result = (recherche.length > 0);
        }
        else if (message == MESSAGE.LISTE) {
            this.listes.forEach(m => {
                if (m.trouve) this.ctrl.reçoitMessageDeLAbstraction(MESSAGE.MOT_TROUVE, m.mot);
                else this.ctrl.reçoitMessageDeLAbstraction(MESSAGE.MOT_NON_TROUVE, m.mot);
            });
        }
        else {
            result = super.reçoitMessage(message, piecejointe);
        }
        return result;
    }
}