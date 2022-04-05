const generateTimeString = time => time < 10 ? `0${time}` : time;

export default function getTime() {
    const date = new Date;
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const secunds = date.getSeconds();
    return  `${generateTimeString(hours)}:${generateTimeString(minutes)}:${generateTimeString(secunds)}`
}
