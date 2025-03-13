export function getRandomHash(len:number) {
    let options='qwertyuioasdfghjklzxcvbnm12345678';
    let answer='';
    for(let i=0;i<len;i++){
        answer+=options[Math.floor(Math.random()*options.length)];
    }
    return answer;
}