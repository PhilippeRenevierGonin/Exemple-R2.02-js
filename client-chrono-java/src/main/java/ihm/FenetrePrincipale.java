package ihm;

import controlleur.ControlleurUI;
import controlleur.CtrlImpl;
import javafx.application.Application;
import javafx.application.Platform;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.layout.*;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.scene.text.FontWeight;
import javafx.stage.Stage;


public class FenetrePrincipale extends Application implements Vue {
    private static final String URL_SERVEUR = "http://localhost:10101/";

    /* ******************** objets de l'appli ******************** */
    ControlleurUI ctrl;

    /* ******************** objets de l'IHM/UI ******************** */
    int cpt = 0;
    Label labelTemps;

    public static void lancement(String[] args) {
        FenetrePrincipale.launch(args);
    }



    public void start(Stage primaryStage) throws Exception {
        /* ******************** création des objets ******************** */
        ctrl = new CtrlImpl();
        ctrl.setVue(this);


        /* ******************** création de l'IHM/UI ******************** */
        primaryStage.setTitle("1re application en javafx");
        primaryStage.setWidth(1280);
        primaryStage.setHeight(720);

        // le conteneur principal
        BorderPane primaryPane = new BorderPane();

        Scene primaryScene = new Scene(primaryPane);
        primaryStage.setScene(primaryScene);


        // ligne de titre
        HBox ligneTitre = new HBox();
        ligneTitre.setPrefHeight(70);
        ligneTitre.setBackground(new Background(new BackgroundFill(Color.BEIGE, CornerRadii.EMPTY,null)));
        ligneTitre.setAlignment(Pos.CENTER);

        String texteInitial = "Un selecteur de couleur tres simple";
        Label titre = new Label(texteInitial);
        titre.setFont(Font.font("Arial", FontWeight.BOLD, 48));

        ligneTitre.getChildren().add(titre);
        primaryPane.setTop(ligneTitre);


        // la ligne du bas
        HBox piedDePage = new HBox();
        piedDePage.setPrefHeight(60);
        piedDePage.setBackground(new Background(new BackgroundFill(Color.BEIGE, CornerRadii.EMPTY,null)));
        piedDePage.setAlignment(Pos.CENTER_RIGHT);



        labelTemps = new Label("n.a.");
        labelTemps.setFont(Font.font("Arial", FontWeight.BOLD, 32));

        piedDePage.getChildren().add(labelTemps);

        Button stopAndGo = new Button("lancer");
        piedDePage.getChildren().add(stopAndGo);
        stopAndGo.setOnAction(action -> {
            if (stopAndGo.getText().equals("lancer")) {
                stopAndGo.setText("stopper");
            }
            else stopAndGo.setText("lancer");
            ctrl.stopOuEncore();
        });


        Button connexion = new Button("connexion");
        piedDePage.getChildren().add(connexion);
        connexion.setOnAction(action -> {
            ctrl.connexion(URL_SERVEUR);
            connexion.setDisable(true);
        });


        Button quitter = new Button("quitter");
        piedDePage.getChildren().add(quitter);
        primaryPane.setBottom(piedDePage);

        quitter.setOnAction(action -> {
            // code exécuté quand on clique sur le bouton
            System.out.println("clic !");
            cpt++;
            titre.setText(texteInitial+" "+cpt);
        });




        // à placer à la fin quand tout est prêt
        primaryStage.show();
    }


    @Override
    public void miseAJourTemps(String temps) {
        Platform.runLater(() -> {
            labelTemps.setText(temps);

        });

    }
}
