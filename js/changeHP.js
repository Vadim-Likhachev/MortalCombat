function changeHP(damage) {
    this.hp -= damage;

    if (this.hp <= 0) {
        this.hp = 0;
    }
}

function elHP() {
    return document.querySelector(`.player${this.player} .life`)
}

function renderHP() {
   return this.elHP().style.width = `${this.hp}%`;
}

const attack = () => console.log(subZero.name + ' Fight...');


export {changeHP, renderHP, elHP, attack};

