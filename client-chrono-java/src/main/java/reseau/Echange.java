package reseau;

public interface Echange {

    void seConnecter(String adresse, ControlleurReseau ctrl) ;
    void stopperOuRelancer();

}
