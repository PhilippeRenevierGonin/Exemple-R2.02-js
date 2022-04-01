class ChronoPresentation extends Presentation {

    constructor(position) {
        super();

        let top = "0em";
        if (position) {
            top = ""+1.2*position+"em";
        }

        // la partie qui contient le chronometre
        this.texteChrono = document.createElement("span");

        this.texteChrono.innerHTML = "00:00:00'1";
        this.aside = document.createElement("aside");
        this.aside.id = "chrono";
        this.aside.appendChild(this.texteChrono);
        this.aside.style.top = top;

        this.aside.addEventListener("click", (event) => {
            this.ctrl.reçoitMessageDeLaPresentation(MESSAGE.CLICK);
            console.log("click");
        });

        document.body.appendChild(this.aside);
    }


    reçoitMessage(message, piecejointe) {
        if (message === MESSAGE.TEMPS) {
            this.affichageChrono(arguments[1], arguments[2], arguments[3], arguments[4]);
        }
        else super.reçoitMessage(message,piecejointe);
    }


    /**
     *
     * @param nbHeures un entier qui correspond au nombre d'heures
     * @param nbMinutes
     * @param nbSecondes
     * @param nbDixiemes
     */
    affichageChrono(nbHeures, nbMinutes, nbSecondes, nbDixiemes) {
        let nbH = nbHeures;
        let nbM = nbMinutes;
        let nbS = nbSecondes;

        if (nbH < 10) nbH = "0"+nbH;
        if (nbM < 10) nbM = "0"+nbM;
        if (nbS < 10) nbS = "0"+nbS;

        this.texteChrono.innerHTML = nbH+":"+nbM+":"+nbS+"'"+nbDixiemes;
    }

}
