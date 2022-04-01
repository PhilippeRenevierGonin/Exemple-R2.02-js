
class PresListeMots extends Pres {
    constructor() {
        super();
        this.ul = document.createElement("ul");
        this.ul.innerHTML = "<li>-</li>";
        let aside = document.createElement("aside");
        // ici on peut mettre du style, ou alors dans le css
        aside.innerHTML="Liste des mots : ";
        aside.appendChild(this.ul);
        document.body.appendChild(aside);
    }

    reçoitMessage(message, piecejointe) {
        let result = "";
        if (message == MESSAGE.CLEAR) {
            this.ul.innerHTML = "";
        }
        else if (message == MESSAGE.MOT_TROUVE) {
            let li = document.createElement("li");
            li.innerHTML = "<span style='text-decoration: line-through;'>"+piecejointe+"</span>";
            this.ul.appendChild(li);
        } else if (message == MESSAGE.MOT_NON_TROUVE) {
            let li = document.createElement("li");
            li.innerHTML = "<span>"+piecejointe+"</span>";
            this.ul.appendChild(li);
        }
        else {
            result = super.reçoitMessage(message, piecejointe);
        }
        return result;
    }

}
