import {adjective, noun} from '../constants/nicknames';

const rand = (bot,top) => {
    return Math.floor((Math.random()*(top-bot))+bot);
}

const createNickname = () => {
    let adjMax = adjective.length;
    let nounMax = noun.length;

    const adjNum = rand(0,adjMax);
    const nounNum = rand(0,nounMax);

    const first = adjective[rand(0,adjNum)];
    const last = noun[rand(0,nounNum)];
    const nickName = first + last;
    return nickName;
}

export default createNickname;