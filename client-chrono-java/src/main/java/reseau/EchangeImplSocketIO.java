package reseau;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import donnees.Temps;
import io.socket.client.IO;
import io.socket.client.Socket;
import io.socket.emitter.Emitter;

import java.net.URISyntaxException;

public class EchangeImplSocketIO implements Echange {


    final static String STOPOULANCER = "stopOuRelancer";
    Socket connexion;
    private ControlleurReseau ctrl;

    ObjectMapper mapper = new ObjectMapper();


    @Override
    public void seConnecter(String adresse, ControlleurReseau ctrl) {
        if (connexion == null) {
            this.ctrl = ctrl;
            try {
                connexion = IO.socket(adresse);
            } catch (URISyntaxException e) {
                System.out.println("pb de conenxion, on crash");
                System.exit(-1);
            }

            connexion.on("connect", new Emitter.Listener() {
                @Override
                public void call(Object... objects) {
                    System.out.println("connexion ok");
                }
            });

            connexion.on("temps", new Emitter.Listener() {
                @Override
                public void call(Object... objects) {
                    try {
                        Temps tempsRecu = mapper.readValue(objects[0].toString(), Temps.class);
                        ctrl.nouveauTemps(tempsRecu);
                    } catch (JsonProcessingException e) {
                        throw new RuntimeException(e);
                    }
                }
            });
            connexion.connect();
        }

    }

    @Override
    public void stopperOuRelancer() {
        if (connexion != null) connexion.emit(STOPOULANCER);
    }

}
