package donnees;

public class Temps {

    private int nbHeures;
    private int nbMinutes;
    private int nbSecondes;
    private int nbDixiemes;

    public Temps() {
        this(0, 0, 0, 0);
    }

    public Temps(int h, int m, int s, int d){
        setNbHeures(h);
        setNbMinutes(m);
        setNbSecondes(s);
        setNbDixiemes(d);
    }

    public void setNbHeures(int nbHeures) {
        this.nbHeures = nbHeures;
    }

    public int getNbHeures() {
        return nbHeures;
    }

    public void setNbMinutes(int nbMinutes) {
        this.nbMinutes = nbMinutes;
    }

    public int getNbMinutes() {
        return nbMinutes;
    }

    public void setNbSecondes(int nbSecondes) {
        this.nbSecondes = nbSecondes;
    }

    public int getNbSecondes() {
        return nbSecondes;
    }

    public void setNbDixiemes(int nbDixiemes) {
        this.nbDixiemes = nbDixiemes;
    }

    public int getNbDixiemes() {
        return nbDixiemes;
    }
}
