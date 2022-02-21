
import {changeHP, renderHP, elHP ,attack} from './changeHP.js';


const $arenas = document.querySelector('.arenas');

const player1 = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['kunai', 'sword'],
    attack,
    changeHP,
    elHP,
    renderHP
};

const player2 = {
    player: 2,
    name: 'Sab-Zero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['scepter', 'sword'],
    attack,
    changeHP,
    elHP,
    renderHP
};



export {player1, player2 , $arenas};