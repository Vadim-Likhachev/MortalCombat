export const getRandom = (num) => Math.ceil(Math.random() * num);

export const createElement = (tag, className) => {
    const $tag = document.createElement(tag);

    if  (className) {
        $tag.classList.add(className);
    }

    return $tag;
}

const generateTimeString = time => time < 10 ? `0${time}` : time;

export const getTime = () => {
    const date = new Date;
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const secunds = date.getSeconds();
    return  `${generateTimeString(hours)}:${generateTimeString(minutes)}:${generateTimeString(secunds)}`
}