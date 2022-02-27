import { getRandom } from "../utils/index.js";
import { HIT , ATTACK} from "../constants/index.js";
import { createElement } from "../utils/index.js";
import Player from "./Player.js";
import Logs from "./Logs.js";

export default class Game {
    constructor({
        root,
        form,
        chat,
    }) {
        this.form = form;
        this.root = root;
        this.chat = chat;
        this.player1 = new Player({
            player: 1,
            name: 'Scorpion',
            hp: 100,
            img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
            rootSelector: 'arenas'
        });
        this.player2 = new Player({
            player: 2,
            name: 'Sab-Zero',
            hp: 100,
            img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
            rootSelector: 'arenas'
        });

        this.logs = new Logs({
            chat
        });
    }

    start = () => {
        this.root.appendChild(this.player1.createPlayer());
        this.root.appendChild(this.player2.createPlayer());
        this.logs.generateLogs('start', this.player1, this.player2);

        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            const enemy = this.enemyAttack();
            const player = this.playerAttack();
            const {defence: playerDefence, hit: playerHit, value: playerValue} = player;
            const {defence: enemyDefence, hit: enemyHit, value: enemyValue} = enemy;
        
            if (playerDefence !== enemyHit) {
                this.player1.changeHP(enemyValue);
                this.player1.renderHP();
                this.logs.generateLogs('hit', this.player2, this.player1, enemyValue);
            } else {
                this.logs.generateLogs('defence', this.player1, this.player2);
            }
        
            if (enemyDefence !== playerHit) {
                this.player2.changeHP(playerValue);
                this.player2.renderHP();
                this.logs.generateLogs('hit', this.player1, this.player2, playerValue);
            } else {
                this.logs.generateLogs('defence', this.player2, this.player1);
            } 
        
            this.showResult(this.player1, this.player2);
        
        });
    }

    enemyAttack = () => {
        const hit = ATTACK[getRandom(2)];
        const defence = ATTACK[getRandom(2)];
    
        return {
            value: getRandom(HIT[hit]),
            hit,
            defence
        }
    }
    
    playerAttack = () => {
        const attack = {}
    
        for (let item of this.form) {
            if (item.checked && item.name === 'hit') {
                attack.value = getRandom(HIT[item.value]);
                attack.hit = item.value;
            }
    
            if (item.checked && item.name === 'defence') {
                attack.defence = item.value;
            }
    
            item.checked = false;
        }
    
        return attack;
    }

    createReloadButton = () => {
        const reloadWrap = createElement('div', 'reloadWrap');
        const reloadButton = createElement('button', 'button');
    
        reloadButton.innerText = 'Restart';
        reloadWrap.appendChild(reloadButton);
    
        return reloadWrap;
    }

    showResult = (player1, player2) => {
        const {name: namePlayer1, hp: hpPlayer1} = player1;
        const {name: namePlayer2, hp: hpPlayer2} = player2;
        if (hpPlayer1 === 0 || hpPlayer2 === 0) {
            const reloadButton =  this.createReloadButton();
            
            reloadButton.addEventListener('click', function() {
                window.location.reload();
            });
    
            this.root.appendChild(reloadButton);
        }
    
    
        if (hpPlayer1 === 0 && hpPlayer1< hpPlayer2) {
            this.root.appendChild(this.playerWins(namePlayer2));
            this.logs.generateLogs('end', player2, player1);
        } else if(hpPlayer2 === 0 && hpPlayer2 < hpPlayer1) {
            this.root.appendChild(this.playerWins(namePlayer1));
            this.logs.generateLogs('end', player1, player2);
        } else if (hpPlayer1 === 0 && hpPlayer2 === 0){
            this.root.appendChild(this.playerWins());
            this.logs.generateLogs('draw', player1, player2);
        }
    }

    playerWins = name => {
        const $winsTitle = createElement('div', 'loseTitle');
        if (name) {
            $winsTitle.innerText = `${name} wins`;
        } else {
            $winsTitle.innerText = 'draw';
        }
        return $winsTitle;
    
    }
}

