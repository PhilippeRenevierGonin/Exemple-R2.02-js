class ChronoControleur {
    constructor(modele, vue) {
        this.modele = modele;
        this.vues = [] ;
        this.addVue(vue);
    }

    addVue(vue) {
        this.vues.push(vue);
        vue.getElementHtml().addEventListener("click", () => this.modele.stopOuRelancer());
    }
}






