package chrono;

import chrono.reseau.GestionnaireReseau;
import chrono.reseau.GestionnaireReseauSocketIO;

import java.util.concurrent.TimeUnit;

public class ServeurChrono implements Runnable {

	public static final int CHRONO_VALEUR_MAX =  99*36000+59*600+599;

	private GestionnaireReseau connexion;
	private  Boolean running = false;
	private int temps = 0;
	private Thread  threadChrono;

	public ServeurChrono(GestionnaireReseau connexion) {
		this.connexion = connexion;
	}

	public void run() {
		boolean valeurLocal = running;

		while (valeurLocal) {
			synchronized(running) {
				valeurLocal = running;
			}
			try {
				TimeUnit.MILLISECONDS.sleep(100);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
			incrementer();
		}

	}

	/*************** lancer / arrêter le chrono ********************/
	public void stopOuRelancer() {
		synchronized(running) {
			if (running) {
				running = false; // wrap automatique
				threadChrono = null;
			}
			else {
				threadChrono = new Thread(this);
				running = true;
				threadChrono.start();
			}
		}

}

	// une méthode interne
	private void incrementer() {
		this.temps += 1;
		if (this.temps > CHRONO_VALEUR_MAX) this.temps = 0;
		connexion.envoyerTemps(new Temps(getHeures(), getMinutes(), getSecondes(), getDixiemes()));
	}



	/************************ Getter, a priori interne ****************************/

	private int getHeures() {
		int nbSecondes = this.temps  / 10;
		int nbH = (int) Math.floor(nbSecondes / 3600);

		return nbH;
	}

	private int getMinutes() {
		int nbSecondes = this.temps  / 10;
		nbSecondes = nbSecondes - this.getHeures()*3600;
		int nbM = (int) Math.floor( nbSecondes  / 60);

		return nbM;
	}

	private int getSecondes() {
		int nbSecondes = this.temps  / 10;
		nbSecondes = nbSecondes - this.getHeures()*3600 - this.getMinutes() * 60;
		return nbSecondes;
	}

	private int getDixiemes() {
		int nbDixièmes = this.temps  % 10;
		return nbDixièmes;
	}

	
	public static void main(String [] args) {

		GestionnaireReseau connexion = new GestionnaireReseauSocketIO();
		ServeurChrono serveurChrono = new ServeurChrono(connexion);
		connexion.setChrono(serveurChrono);

	}
}