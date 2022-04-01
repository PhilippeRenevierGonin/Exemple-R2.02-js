class Lettre {
    constructor(valeur, indice) {
        this.valeur = valeur;
        this.indice = indice;
    }
}

class AbsGrille extends Abs {


    static NODIRECTION = -1;

    static NORD = 0;
    static NORDEST = 1;
    static EST = 2;
    static SUDEST = 3;
    static SUD = 4;
    static SUDOUEST = 5;
    static OUEST = 6;
    static NORDOUEST = 7;
    static DIRECTIONS = [AbsGrille.NORD, AbsGrille.NORDEST, AbsGrille.EST, AbsGrille.SUDEST, AbsGrille.SUD, AbsGrille.SUDOUEST, AbsGrille.OUEST, AbsGrille.NORDOUEST];

    constructor() {
        super();
        this.taille = 0;
        this.lettres = [];
    }


    /**
     * méthode pour recevoir les messages du controleur
     */
    reçoitMessage(message, piecejointe) {
        let result = "";
        if (message == MESSAGE.SELECTION_MOT) {
            if (piecejointe.length > 0) {
                result = this.getToutesLesPossibilites(piecejointe);
            }

        }
        else if (message == MESSAGE.INIT) {
            const grilleInitiale=`ABDOMINALE
                              ACTUALITES
                              ADAPTABLES
                              ADOLESCENT
                              ADRENALINE
                              ABSOLUTION
                              ACCOMMODER
                              ACCROCHEUR
                              ACTIVISTES
                              ACTUALITES`;
            let grilles = grilleInitiale.split("\n").map(s => s.trim()).join("");
            let lettres = [];
            for (let i = 0; i < grilles.length; i++) {
                lettres.push(grilles.charAt(i).toUpperCase());
            }
            this.setLettres(lettres);
        }
        else if (message == MESSAGE.VERIF_SELECTION) {
            result = this.verification(piecejointe);
        }
        else {
            result = super.reçoitMessage(message, piecejointe);
        }
        return result;
    }


    /**
     *  le nombre de lettres doit être un carré (4,9,16,25, etc.)
     *  à appeler que si l'abstraction est associée à un contrôleur
     */
    setLettres(listeDeLettres) {
        if (this.ctrl) {
            this.lettres = [];
            for (let i = 0; i < listeDeLettres.length; i++) {
                this.lettres.push(new Lettre(listeDeLettres[i], i));
            }
            this.taille = Math.sqrt(this.lettres.length);

            for(let ligne = 0; ligne < this.taille; ligne++) {
                let ligneDeMots = [];
                for(let col = 0; col < this.taille; col++) {
                    ligneDeMots.push(listeDeLettres[ligne*this.taille+col]);
                }
                this.ctrl.reçoitMessageDeLAbstraction(MESSAGE.AJOUTER_LIGNE, ligneDeMots, ligne); // ajout de la coordonnée y

            }
            this.ctrl.reçoitMessageDeLAbstraction(MESSAGE.FIN_INIT, this.taille); // pour que le controleur puisse convertir les coordonnées

        }

    }


    /**
     * pour trouver la lettre suivante, en partant d'une lettre dans une direction donnée
     * @param lettre : la lettre d'où on part
     * @param direction : la direction à suivre
     * @return la lettre si elle existe (on ne sort pas du cadre) ou null sinon
     */
    getLettreSuivante(lettre, direction) {
        let i = this.getIndiceSuivant(lettre.indice, direction);
        let result = null;
        if (i >= 0) result = this.lettres[i];
        return result;
    }

    /**
     * pour obtenir l'indice suivant (d'une lettre), en partant dans une direction
     * @param indice
     * @param direction
     * @returns {number} -1 si l'indice n'est pas possible (hors du tableau) ou
     */
    getIndiceSuivant(indice, direction) {
        let indicePotentiel = indice;
        let modulo = indicePotentiel % this.taille;
        let division = Math.floor(indicePotentiel / this.taille);
        switch (direction) {
            case AbsGrille.NORD:
                if (division > 0) indicePotentiel = indicePotentiel - this.taille;
                else indicePotentiel = -1;
                break;
            case AbsGrille.NORDEST:
                if ((division > 0) && (modulo < (this.taille - 1))) {
                    indicePotentiel = indicePotentiel - this.taille + 1;
                } else indicePotentiel = -1;
                break;
            case AbsGrille.EST:
                if (modulo < (this.taille - 1)) {
                    indicePotentiel = indicePotentiel + 1;
                } else indicePotentiel = -1;
                break;
            case AbsGrille.SUDEST:
                if ((modulo < (this.taille - 1)) && (division < (this.taille - 1))) {
                    indicePotentiel = indicePotentiel + this.taille + 1;
                } else indicePotentiel = -1;
                break;
            case AbsGrille.SUD:
                if (division < (this.taille - 1)) {
                    indicePotentiel = indicePotentiel + this.taille;
                } else indicePotentiel = -1;
                break;
            case AbsGrille.SUDOUEST:
                if ((division < (this.taille - 1)) && (modulo > 0)) {
                    indicePotentiel = indicePotentiel + this.taille - 1;
                } else indicePotentiel = -1;
                break;
            case AbsGrille.OUEST:
                if (modulo > 0) {
                    indicePotentiel = indicePotentiel - 1;
                } else indicePotentiel = -1;
                break;
            case AbsGrille.NORDOUEST:
                if ((modulo > 0) && (division > 0)) {
                    indicePotentiel = indicePotentiel - this.taille - 1;
                } else indicePotentiel = -1;
                break;
            default:
                indicePotentiel = -1;
                break;
        }
        return indicePotentiel;
    }


    /**
     * recherche toutes les suites d'indice qui correspondent au mot recherché
     * @param motrecherché
     * @returns {[]} un tableau d'indice s'il n'y a qu'une lettre ou un tableau de tableau d'indice s'il y a 2 lettres ou plus
     */
    getToutesLesPossibilites(motrecherché) {
        let liste = [];
        let premiereLettre = motrecherché.charAt(0);
        let candidats = this.lettres.filter(lettre => lettre.valeur == premiereLettre);

        // pour chaque lettre, il faut explorer toutes les directions
        for (let c = 0; c < candidats.length; c++) {
            let lettreCourante = candidats[c];
            // pour chacune des directions
            if (motrecherché.length > 1) {
                for (let dir = 0; dir < AbsGrille.DIRECTIONS.length; dir++) {

                    lettreCourante = candidats[c];
                    let chemin = [];
                    chemin.push(lettreCourante);

                    let direction = AbsGrille.DIRECTIONS[dir];
                    let motCourant = motrecherché.substring(1);

                    while (motCourant.length > 0) {

                        lettreCourante = this.getLettreSuivante(lettreCourante, direction);
                        if ((lettreCourante) && (lettreCourante.valeur == motCourant.charAt(0))) {
                            chemin.push(lettreCourante);
                        } else {
                            chemin = [];
                            break;

                        }
                        motCourant = motCourant.substring(1);
                    }

                    if (chemin.length > 0) liste.push(chemin)

                }
            } else {
                liste.push(lettreCourante);
            }
        }

        return liste;
    }

    verification(listeCoord) {
        console.log("verif");
        let result = true;

        if (listeCoord.length > 1) {
            // il faut trouver la direction
            let direction = AbsGrille.NODIRECTION;
            let delta = listeCoord[0] - listeCoord[1];
            switch (delta) {
                case 1:             direction = AbsGrille.OUEST;    break;
                case -1:            direction = AbsGrille.EST;      break;
                case this.taille:   direction = AbsGrille.NORD;     break;
                case this.taille-1: direction = AbsGrille.NORDEST;  break;
                case this.taille+1: direction = AbsGrille.NORDOUEST;break;
                case -this.taille:  direction = AbsGrille.SUD;      break;
                case -this.taille-1:direction = AbsGrille.SUDEST;   break;
                case -this.taille+1:direction = AbsGrille.SUDOUEST; break;
                default:            result    = false;
            }
            if (direction != AbsGrille.NODIRECTION) {
                for(let i = 1; i < listeCoord.length; i++) {
                    result = result && (this.getIndiceSuivant(listeCoord[i-1], direction) == listeCoord[i]);
                    if (! result) break;
                }
            }
        }

        return result;
    }
}
