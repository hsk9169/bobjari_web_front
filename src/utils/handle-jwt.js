const jwt = require('jsonwebtoken');

export const saveJWT = tokens => {
    localStorage.setItem("accessToken", tokens.accessToken);
    localStorage.setItem("refreshToken", tokens.refreshToken);
}

export const deleteJWT = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
}

export const getJWT = () => {
    let tokens = {accessToken:'', refreshToken:''}
    tokens.accessToken = localStorage.getItem('accessToken')
    tokens.refreshToken = localStorage.getItem('refreshToken')
    return tokens;
}

export const verifyJWT = async (context) => {
    jwt.verify(localStorage.getItem('accessToken'),
        'shhhhh', (err,decoded) => {
            if (decoded) {
                context.setSessionTime({
                    expireTime: decoded.exp, 
                    remainTime: decoded.exp - Math.floor(Date.now()/1000),
                })
            } else {
                context.setSessionTime({
                    expireTime: null,
                    remainTime: 0,
                })
            }
        }
    )
};

export const checkJWTExp = (expire, remain) => {
    const now = Math.floor(Date.now()/1000)
    if (expire - now !== remain) {
        return expire - now;
    } else if (expire - now < 1) {
        return 0;
    }
};