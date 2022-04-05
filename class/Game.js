import { getRandom } from "../utils/index.js";
import { HIT , ATTACK} from "../constants/index.js";
import { createElement } from "../utils/index.js";
import Player from "./Player.js";
import Logs from "./Logs.js";
import Api from "./Api.js";


export default class Game {
    constructor({
        root,
        form,
        chat,
    }) {
        this.form = form;
        this.root = root;
        this.chat = chat;
        this.api = new Api();
        this.api.apiFight()
        this.logs = new Logs({
            chat
        });
    }

    start = async() => {
        const randomPlayer1 = JSON.parse(localStorage.getItem('player1'));
        const randomPlayer2 = await this.api.getRandomHero();

        this.player1 = new Player({
            ...randomPlayer1,
            player: 1,
            rootSelector: 'arenas'
        });
        this.player2 = new Player({
            ...randomPlayer2,
            player: 2,
            rootSelector: 'arenas'
        });


        this.root.appendChild(this.player1.createPlayer());
        this.root.appendChild(this.player2.createPlayer());
        this.logs.generateLogs('start', this.player1, this.player2);

        this.form.addEventListener('submit', async(e) => {
            e.preventDefault();
            const fight = await this.playerAttack();
            const enemy = fight.player2;
            const player = fight.player1;
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
    
    playerAttack = async() => {
        let hit;
        let defence;
    

        for (let item of this.form) {
            if (item.checked && item.name === 'hit') {
                hit = item.value;
            }
    
            if (item.checked && item.name === 'defence') {
                defence = item.value;
            }
    
            item.checked = false;
        }

        const fight = await this.api.apiFight(hit, defence);

        return fight;
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
                window.location.pathname = './index.html';
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

