import axios from 'axios';

export const verifyJWT = () => {
    let isValid = false;

    axios.get(process.env.REACT_APP_API_VERIFY_TOKEN,
        { headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        }})
        .then(res => {
            console.log(res)
            isValid = true;
        })
    return isValid;
};

export const refreshJWT = () => {

};