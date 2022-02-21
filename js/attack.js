import getRandom from "./getRandom.js";

const ATTACK = ['head', 'body', 'foot'];
const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const $formFight = document.querySelector('.control');

const enemyAttack = () => {
    const hit = ATTACK[getRandom(2)];
    const deffence = ATTACK[getRandom(2)];

    return {
        value: getRandom(HIT[hit]),
        hit,
        deffence
    }
}

const playerAttack = () => {
    const attack = {}

    for (let item of $formFight) {
        if (item.checked && item.name === 'hit') {
            attack.value = getRandom(HIT[item.value]);
            attack.hit = item.value;
        }

        if (item.checked && item.name === 'defence') {
            attack.deffence = item.value;
        }

        item.checked = false;
    }

    return attack;
}

export {enemyAttack, playerAttack , $formFight};