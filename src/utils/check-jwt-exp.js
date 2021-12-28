const checkJWTExp = (expire, remain) => {
    const now = Math.floor(Date.now()/1000)
    if (expire - now !== remain) {
        return expire - now;
    } else if (expire - now < 1) {
        return 0;
    }
}

export default checkJWTExp;