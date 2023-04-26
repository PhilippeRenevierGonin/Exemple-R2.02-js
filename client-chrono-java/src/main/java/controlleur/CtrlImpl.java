package controlleur;

import donnees.Temps;
import ihm.Vue;
import reseau.ControlleurReseau;
import reseau.Echange;
import reseau.EchangeImplSocketIO;

public class CtrlImpl implements ControlleurUI, ControlleurReseau {


    private Vue vue;
    private Echange echange;

    @Override
    public void nouveauTemps(Temps t) {
        if (vue != null) {
            String affichage = t.getNbHeures()+":"+t.getNbMinutes()+":"+t.getNbSecondes()+"'"+t.getNbDixiemes();
            vue.miseAJourTemps(affichage);
        }

    }

    @Override
    public void setVue(Vue v) {
        this.vue = v;
    }

    @Override
    public void connexion(String url) {
        if (echange == null) {
            echange = new EchangeImplSocketIO();
            echange.seConnecter(url, this);
        }
    }

    @Override
    public void stopOuEncore() {
            echange.stopperOuRelancer();
    }
}
