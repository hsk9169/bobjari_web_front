import axios from 'axios';

export const verifyJWT = async (caller) => {
    console.log(caller)

    await axios.get(process.env.REACT_APP_API_VERIFY_TOKEN,
        { headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        }})
        .then(res => {
            if (res.data === 'valid') {
                console.log('valid')
                return true;
            }             
        })
        .catch(err => {
            console.log('invalid token')
            return false
        })
};