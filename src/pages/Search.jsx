import {useEffect, useRef} from 'react'
import Box from '@mui/material/Box';
import checkJWTExp from 'utils/check-jwt-exp';

const Search = (props) => {
    const interval = useRef(null)

    props.setBotNav(true)

    useEffect( () => {
        interval.current = setInterval(() => {
            const check = checkJWTExp(props.sessionTime.expireTime,
                                      props.sessionTime.remainTime);
            if (props.sessionTime.remainTime !== 0) {
                props.setSessionTime({
                    ...props.sessionTime,
                    remainTime: check,
                })
            }
        }, 1000)
        return () => {
            clearInterval(interval.current)
        }
    })

    return (
        <div>
            <h2>Search</h2>
            <Box sx={{
                width: '100%',
                display: 'flex',
                position: 'absolute',
                top: 0,
                alignItems: 'center',
                justifyContent: 'right'
            }}>
                <p>session remained: {props.sessionTime.remainTime}sec</p>
            </Box>
        </div>
    )
}

export default Search;