class MESSAGE {
    // général
    static TEMPS = "temps";
    static CLICK = "click sur le chrono";
    static STOPOULANCER = "stopOuRelancer";

}

class Abstraction {
    setCtrl(ctrl, nom) {
        this.ctrl = ctrl;
        this.nom = nom;
    }

    reçoitMessage(message, piecejointe) {
        console.error("["+this.nom+"] reçoitMessage de Abs pas encore implémentée : "+message);
        return false;
    }
}



class Presentation {
    setCtrl(ctrl, nom) {
        this.ctrl = ctrl;
        this.nom = nom;
    }

    reçoitMessage(message, piecejointe) {
        console.error("["+this.nom+"] reçoitMessage de Pres pas encore implémentée : "+message);
        return false;
    }

}


class Controleur  {
    constructor(nom, abs, pres) {
        this.nom = nom;
        this.abs = abs;
        this.abs.setCtrl(this, nom);
        this.pres = pres;
        this.pres.setCtrl(this, nom);

        this.parent = null;
        this.enfants = [];
    }

    reçoitMessageDeLAbstraction(message, piecejointe) {
        console.error("["+this.nom+"] reçoitMessageDeLAbstraction non impl : "+message);
        return false;
    }

    reçoitMessageDUnEnfant(message, piecejointe, ctrl) {
        console.error("["+this.nom+"] reçoitMessageDUnEnfant non impl : "+message);
        return  this.parent.reçoitMessageDUnEnfant(message, piecejointe, this);
    }

    reçoitMessageDuParent(message, piecejointe) {
        console.error("["+this.nom+"] reçoitMessageDuParent non impl : "+message);
        for(let i = 0; i < this.enfants.length; i++) this.enfants[i].reçoitMessageDuParent(message, piecejointe);
        return false;
    }

    reçoitMessageDeLaPresentation(message, piecejointe) {
        console.error("["+this.nom+"] reçoitMessageDeLaPresentation non impl : "+message);
        return false;
    }

    addEnfant(controleur) {
        this.enfants.push(controleur);
        controleur.setParent(this);
    }

    removeEnfant(controleur) {
        this.enfants = this.enfants.filter(pac => pac !== controleur);
    }

    setParent(controleur) {
        this.parent = controleur;
    }

}
