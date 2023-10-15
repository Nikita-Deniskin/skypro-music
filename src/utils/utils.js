export const timePresent = (time) =>{
    const m = Math.floor(time / 60);
    const s = (time % 60 < 10)? `0${  time % 60}` : time % 60;
    return `${m  }:${  s}`;
}

export const another = () =>null