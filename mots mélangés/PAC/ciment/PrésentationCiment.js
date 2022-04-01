
class PresCiment extends Pres {
    constructor() {
        super();
        this.spanCpt = document.createElement("span");
        this.spanCpt.innerHTML = "-";
        let aside = document.createElement("aside");
        // ici on peut mettre du style, ou alors dans le css
        aside.innerHTML="Nb tentative(s) : ";
        aside.appendChild(this.spanCpt);
        document.body.appendChild(aside);
    }

    /**
     * La présentation de Ciment ne fait que mettre à jour le nombre de tentative, soit le texte de la span qui a été crée dans le constructeur
     * @param message le message traité est MESSAGE.MOT_TAPE
     * @param piecejointe : contient le nombre de tentative
     * @returns {*} (ne retourne rien)
     */
    reçoitMessage(message, piecejointe) {
        let result = "";
        if (message == MESSAGE.MOT_TAPE) {
            this.spanCpt.innerHTML = piecejointe;
            result = piecejointe;
        }
        else {
            result = super.reçoitMessage(message, piecejointe);
        }
        return result;
    }

}