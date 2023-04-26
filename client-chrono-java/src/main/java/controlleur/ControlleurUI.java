package controlleur;

import ihm.Vue;

public interface ControlleurUI {


    // ihm vers ctrl
    void setVue(Vue v);
    void connexion(String url);

    void stopOuEncore();

}
