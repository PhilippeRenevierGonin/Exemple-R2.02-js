package chrono.reseau;

import chrono.ServeurChrono;
import chrono.Temps;

public interface GestionnaireReseau {

    void envoyerTemps(Temps temps);
    void setChrono(ServeurChrono chrono);
}
