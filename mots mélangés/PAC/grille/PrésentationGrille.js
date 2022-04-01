
class PresGrille extends Pres {
    constructor() {
        super();
        this.lettres = null;

        this.input = document.createElement("input");
        this.input.id = "mot";

        let nav = document.createElement("nav");
        nav.appendChild(this.input);
        document.body.appendChild(nav);

        this.grille = document.createElement("div");
        this.grille.id = "motsmeles"
        document.body.appendChild(this.grille);

        this.nouveauMot = () => { // l'evenement n'interesse pas
            // todo, si spanSelectionnesParClic n'est pas vide, il faut la vider
            this.clear();
            let mot = this.input.value.toUpperCase();
            if (mot.length > 0) this.ctrl.reçoitMessageDeLaPresentation(MESSAGE.MOT_TAPE, mot);
        };

        this.spanSelectionnesParClic = [];
        this.selectionParClic = (e) => {
            // todo si spanSelectionnesParClic est vide et si input avec du texte, clear
            console.log(e.target.textContent);
            let span = e.target;
            this.spanSelectionnesParClic.push(span);
            this.ctrl.reçoitMessageDeLaPresentation(MESSAGE.SELECTION_MOT_PAR_CLIC, this.spanSelectionnesParClic);
        };
    }

    reçoitMessage(message, piecejointe) {
        let result = "";
        if (message == MESSAGE.AJOUTER_LIGNE) {
            this.contruireLigne(piecejointe, arguments[2]); // le 3e param, c'est le n° de la ligne
        }
        else if (message == MESSAGE.FIN_INIT) {
            // ajout de listener que quand on est pret
            this.lettres = document.querySelectorAll("div#motsmeles > div > span");
            this.input.addEventListener("keyup", this.nouveauMot);
        }
        else if (message == MESSAGE.SELECTION_CASE) {
            if (piecejointe.length > 0) {
                this.select(piecejointe);
            }
        }
        else if (message == MESSAGE.BARRER_SELECTION) {
            let spanSelectionnes = document.querySelectorAll("div#motsmeles > div > span.selected");
            for(let i = 0; i < spanSelectionnes.length; i++) {
                let span = spanSelectionnes.item(i);
                if (! span.classList.contains("trouve"))  span.classList.toggle("trouve");
            }
        }
        else if (message == MESSAGE.RESULTAT_VERIF) {
            console.log("pres : messsage reçu "+message+" / "+piecejointe+" / "+this.spanSelectionnesParClic.length);
            let valide = piecejointe;
            if (valide) {
                this.selectSpan(this.spanSelectionnesParClic);
            }
            else {
                this.clear();
            }
        }
        else if (message == MESSAGE.CLEAR) {
            this.clear();
            this.input.value="";
        }
        else if (message == MESSAGE.SELECTION_MOT_PAR_CLIC) {
            this.input.value = piecejointe;
        }
        else if (message == MESSAGE.TRANSITION_INPUT_CLIC) {
            this.clearExceptFirstClic(piecejointe);
        }
        else {
            result = super.reçoitMessage(message, piecejointe);
        }

        return result;
    }


    clear() {
        this.spanSelectionnesParClic = [];  // pour avoir un reset complet
        this.lettres.forEach(function (span) {
            if (span.classList.contains("selected")) span.classList.toggle("selected");
        });
    }

    clearExceptFirstClic(arrayOfOneSpan) {
        this.clear(); // on désélection tout, y compris la case cliquée
        this.spanSelectionnesParClic = arrayOfOneSpan;
        arrayOfOneSpan[0].classList.toggle("selected"); // on la resélection
    }

    select(liste) {
        liste.forEach((indiceSpan) => {
            if (! this.lettres.item(indiceSpan).classList.contains("selected")) this.lettres.item(indiceSpan).classList.toggle("selected");
        });
    }

    selectSpan(listeSpan) {
        listeSpan.forEach((span) => {
            console.log("on selecte "+span.textContent);
            if (! span.classList.contains("selected")) span.classList.toggle("selected");
        });
    }

    contruireLigne(mot, nbLigne) {
        let ligne = document.createElement("div");
        for(let i = 0; i < mot.length; i++) {
            let span = document.createElement("span");
            span.coordGrilleY = nbLigne;
            span.coordGrillex = i;
            span.innerHTML=mot[i].toUpperCase();
            span.addEventListener("click", this.selectionParClic);
            ligne.appendChild(span);
        }
        this.grille.appendChild(ligne);
    }
}
