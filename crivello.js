let len; // lunghezza del crivello
let mat; // vettore in cui memorizzo gli stati
         /*
         stati possibili:
         -1: il numero è stato eliminato
         0: non si è ancora trovato un divisore di quel numero
         1: il numero è primo
         */
let lev=2; // divisore di partenza

function inizializza() {
    // l'utente inserisce tramite un prompt la lunghezza per il crivello
    do {
        len = prompt("Inserisci lunghezza del crivello");
    } while(len < 1);
    // l'array mat viene dichiarato e inizializzato a 0
    mat = new Array(len);
    for(let i = 0; i < len;i++) {
        mat[i] = 0;
    }
    // viene eseguita la prima stampa della tabella senza modifiche
    stampaCrivello();
}

function stampaCrivello() {
    // la funzione stampa crivello crea una stringa di HTML da inserire all'interno di una tabella
    
    // la stringa comincia con uno spazio vuoto: quello che andrebbe occupato dall'1
    let str = "<tr><td></td>";
    // la variabile gi (già inseriti) rappresenta il numero di elementi già inseriti sulla riga
    let gi = 1;
    for(let i = 1; i < len; i++) {
        if(gi == 10) {
            // se gli elementi inseriti sono già 10, allora si va a capo
            // gi viene, successivamente, resettato
            gi = 0;
            str+="</tr><tr>"     
        }
        if(mat[i] == -1) {
            // se lo stato del numero (i+1) è -1, gli si attribuisce la classe "deleted" in modo che l'eliminazione sia rappresentabile graficamente tramite CSS
            str+="<td id='m"+i+"' align='center' class='deleted'>"+(i+1)+"</td>"
        }
        else if(mat[i] == 1) {
            // se lo stato del numero (i+1) è 1, gli si attribuisce la classe "prime" in modo che, tramite il CSS, si possa rappresentare graficamente come numero primo
            str+="<td id='m"+i+"' align='center' class='prime'>"+(i+1)+"</td>";
        }
        else {
            // se lo stato del numero (i+1) è 0, gli si attribuisce la classe "generic", quindi non subisce modifiche grafiche
            str+="<td id='m"+i+"' align='center' class='generic'>"+(i+1)+"</td>";
        }
        // dato che ho inserito un elemento, incremento gi
        gi++;
    }
    str+="</tr>";
    // inserisco la stringa di HTML nella tabella
    document.getElementById("table").innerHTML = str;
}

function aggiorna() {
    // la funzione aggiorna cerca se dei numeri a stato 0 siano divisori dell'attuale divisore (lev)
    // nel caso ne trovasse li pone a -1 e verifica anche l'eventuale fine del crivello
    // per come è costruita la funzione, l'utente avrà sempre una resa grafica dalla sua esecuzione
    
    // la variabile change conta il numero di cambiamenti di stato dopo il ciclo
    let change = 0;
    for(let i = lev*2-1; i < len;i++) {
        // partendo dal numero doppio del divisore (non doppio+1 perché altrimenti il 4 non verrebbe eliminato)
        // si cercano eventuali numeri divisibili per il divisore
        if((i+1) % lev == 0 && mat[i] != -1) {
            // se si trova un numero divisibile per il divisore il suo stato viene posto a -1 e change viene incrementato
            mat[i] = -1;
            change++;
        }
    }
    // il divisore viene incrementato
    lev++;
    if(change == 0 && lev<=(len+1)/2) {
        // se non ci sono stati cambiamenti, quindi non sono stati trovati elementi da eliminare e il crivello non è finito,
        // si riesegue la funzione aggiorna().
        // Quindi, al click dell'utente, la funzione viene rieseguita finché non vengono trovati dei numeri da eliminare o finché il crivello non è finito
        aggiorna();
    }
    else {
        if(lev>(len+1)/2) {
            // se il divisore attuale è più grande della metà del numero massimo si è sicuri che i numeri rimasti sono tutti primi
            
            // il bottone viene disabilitato
            document.getElementById("update").setAttribute("class","off");
            document.getElementById("update").setAttribute("onclick","");
            // tutti i numeri che sono rimasti sono sicuramente primi, quindi vengono messi allo stato 1
            for(let i = 1; i < len;i++) {
                if(document.getElementById("m"+i).getAttribute("class") != "deleted"){
                    mat[i] = 1;
                }
            }
        }
        // il crivello aggiornato viene stampato
        stampaCrivello();
    }
}