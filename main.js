const scorpion = {
    name: 'Scorpion',
    hp: 70,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['kunai', 'sword'],
    attack: function() {
        console.log(scorpion.name + ' Fight...');
    }
};

const subZero = {
    name: 'Sab-Zero',
    hp: 50,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['scepter', 'sword'],
    attack: function() {
        console.log(subZero.name + ' Fight...');
    }
};

function createPlayer(player, hero) {
    const $player = document.createElement('div');
    $player.classList.add(`${player}`);

    const $progressbar = document.createElement('div');
    $progressbar.classList.add('progressbar');
    $player.appendChild($progressbar);

    const $character = document.createElement('div');
    $character.classList.add('character');
    $player.appendChild($character);

    const $life = document.createElement('div');
    $life.classList.add('life');
    $life.style.width = `${hero.hp}%`;
    $progressbar.appendChild($life);

    const $name = document.createElement('div');
    $name.classList.add('name');
    $name.innerText = hero.name;
    $progressbar.appendChild($name);

    const $img = document.createElement('img');
    $img.src = hero.img;
    $character.appendChild($img);


    const $arenas = document.querySelector('.arenas');
    $arenas.appendChild($player);
};

createPlayer('player1', scorpion);

createPlayer('player2', subZero);
