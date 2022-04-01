package chrono.reseau;

import chrono.ServeurChrono;
import chrono.Temps;
import com.corundumstudio.socketio.AckRequest;
import com.corundumstudio.socketio.Configuration;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.ConnectListener;
import com.corundumstudio.socketio.listener.DataListener;

public class GestionnaireReseauSocketIO implements GestionnaireReseau {
    SocketIOServer serveur;
    ServeurChrono chrono;


    public GestionnaireReseauSocketIO() {
        Configuration config = new Configuration();
        config.setHostname("127.0.0.1");
        config.setPort(10101);
        serveur = new SocketIOServer(config);

        serveur.addConnectListener(new ConnectListener() {
            @Override
            public void onConnect(SocketIOClient socketIOClient) {
                System.out.println("serveur > connexion de " + socketIOClient.getRemoteAddress());
                // on a pas besoin de plus
            }
        });


        // réception de la commande "stopOuRelancer", il n'y a pas de paramètre...
        // ATTENTION : une constante écrite ici en dur !!
        serveur.addEventListener("stopOuRelancer", Void.class, new DataListener<Void>() {
            @Override
            public void onData(SocketIOClient socketIOClient, Void s, AckRequest ackRequest) throws Exception {
                chrono.stopOuRelancer();
            }
        });

        serveur.start();
    }


    @Override
    public void envoyerTemps(Temps temps) {
        // ATTENTION : une constante écrite ici en dur !!
        serveur.getBroadcastOperations().sendEvent("temps", temps);
    }

    public void setChrono(ServeurChrono chrono) {
        this.chrono = chrono;
    }
}
