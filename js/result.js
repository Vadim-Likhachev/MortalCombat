import { player1, player2 } from "./players.js";
import createElement from "./createElement.js";
import { $arenas } from "./players.js";
import generateLogs from "./generateLogs.js";


const playerWins = name => {
    const $winsTitle = createElement('div', 'loseTitle');
    if (name) {
        $winsTitle.innerText = `${name} wins`;
    } else {
        $winsTitle.innerText = 'draw';
    }
    return $winsTitle;

}

const createReloadButton = () => {
    const reloadWrap = createElement('div', 'reloadWrap');
    const reloadButton = createElement('button', 'button');

    reloadButton.innerText = 'Restart';
    reloadWrap.appendChild(reloadButton);

    return reloadWrap;
}

const  showResult = () => {
    const {name: namePlayer1, hp: hpPlayer1} = player1;
    const {name: namePlayer2, hp: hpPlayer2} = player2;
    if (hpPlayer1 === 0 || hpPlayer2 === 0) {
        const reloadButton =  createReloadButton();
        
        reloadButton.addEventListener('click', function() {
            window.location.reload();
        });

        $arenas.appendChild(reloadButton);
    }


    if (hpPlayer1 === 0 && hpPlayer1< hpPlayer2) {
        $arenas.appendChild(playerWins(namePlayer2));
        generateLogs('end', player2, player1);
    } else if(hpPlayer2 === 0 && hpPlayer2 < hpPlayer1) {
        $arenas.appendChild(playerWins(namePlayer1));
        generateLogs('end', player1, player2);
    } else if (hpPlayer1 === 0 && hpPlayer2 === 0){
        $arenas.appendChild(playerWins());
        generateLogs('draw', player1, player2);
    }
}

export {playerWins, showResult};