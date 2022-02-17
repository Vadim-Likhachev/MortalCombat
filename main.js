const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const player1 = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['kunai', 'sword'],
    attack: function() {
        console.log(scorpion.name + ' Fight...');
    }
};

const player2 = {
    player: 2,
    name: 'Sab-Zero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['scepter', 'sword'],
    attack: function() {
        console.log(subZero.name + ' Fight...');
    }
};

function createElement (tag, className) {
    const $tag = document.createElement(tag);

    if  (className) {
        $tag.classList.add(className);
    }

    return $tag;
}

    function createPlayer(hero) {
    const $player = createElement('div', 'player'+hero.player);
    const $progressbar = createElement('div', 'progressbar');
    const $character = createElement('div', 'character');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $img = createElement('img');

    $life.style.width = `${hero.hp}%`;
    $name.innerText = hero.name;
    $img.src = hero.img;

    $progressbar.appendChild($life);
    $progressbar.appendChild($name);

    $character.appendChild($img);
    
    $player.appendChild($progressbar);
    $player.appendChild($character);

    return $player;
};

function random() {
    return Math.floor(Math.random() * 20 + 1);
    
}

function changeHP(player) {
    const $playerLife = document.querySelector('.player' + player.player +' .life');
    player.hp -= random();
    $playerLife.style.width = `${player.hp}%`;


    if (player.hp <= 0) {
        $playerLife.style.width = '0';
        $arenas.appendChild(playerLose(player));
        $randomButton.disabled = true;
    }
}

function playerLose(player) {
    const $loseTitle = createElement('div', 'loseTitle');
    if (player.player  === 1) {
        $loseTitle.innerText = `${player2.name} wins`;
    } else {
        $loseTitle.innerText = `${player1.name} wins`;
    }

    return $loseTitle;

}

$randomButton.addEventListener('click', () => {
    changeHP(player1);
    changeHP(player2);
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));




