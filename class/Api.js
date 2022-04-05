export default class Api {

    getAllHeroes = async () => {
        const heroes = fetch('https://reactmarathon-api.herokuapp.com/api/mk/players').then(res => res.json());
        return heroes;
    }

    getRandomHero = async () => {
        const hero = fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose').then(res => res.json());

        return hero;
    }

    apiFight = async (hit, defence) => {
       const fight = await fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
            method: 'POST',
            body: JSON.stringify({
                hit,
                defence,
            })
        }).then(res => res.json());

        return fight;
    }
}