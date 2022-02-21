import generateLogs from './js/generateLogs.js';
import {enemyAttack, playerAttack, $formFight} from './js/attack.js'
import { player1, player2 } from './js/players.js';
import {showResult} from './js/result.js';
import createElement from './js/createElement.js';
import { $arenas } from './js/players.js';


function createPlayer(hero) {
    const {player, hp, name ,img} = hero;
    const $player = createElement('div', 'player'+ player);
    const $progressbar = createElement('div', 'progressbar');
    const $character = createElement('div', 'character');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $img = createElement('img');

    $life.style.width = `${hp}%`;
    $name.innerText = name;
    $img.src = img;

    $progressbar.appendChild($life);
    $progressbar.appendChild($name);

    $character.appendChild($img);
    
    $player.appendChild($progressbar);
    $player.appendChild($character);

    return $player;
};


$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
generateLogs('start', player1, player2);


 
$formFight.addEventListener('submit', (e) => {
    e.preventDefault();
    const enemy = enemyAttack();
    const player = playerAttack();
    const {defence: playerDefence, hit: playerHit, value: playerValue} = player;
    const {defence: enemyDefence, hit: enemyHit, value: enemyValue} = enemy;

    if (playerDefence !== enemyHit) {
        player1.changeHP(enemyValue);
        player1.renderHP();
        generateLogs('hit', player2, player1, enemy.value);
    } else {
        generateLogs('defence', player1, player2);
    }

    if (enemyDefence !== playerHit) {
        player2.changeHP(playerValue);
        player2.renderHP();
        generateLogs('hit', player1, player2, playerValue);
    } else {
        generateLogs('defence', player2, player1);
    }

    console.log(player);
    console.log(enemy);

    showResult()

});


