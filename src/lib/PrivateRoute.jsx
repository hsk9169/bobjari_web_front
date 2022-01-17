import {useState, useEffect, useRef} from 'react';
import { Redirect, Route } from 'react-router-dom';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import { useDispatch } from "react-redux";
import { deleteSession } from "slices/session";
import {getJWT, deleteJWT, checkJWTExp, verifyJWT} from 'utils/handle-jwt';

const PrivateRoute = ({ component: Component, context, ...rest }) => {
    const [isValid, setValid] = useState({
        initialized: false,
        access: null,
    })
    const [dialogOpen, setDialogOpen] = useState(false);
    const interval = useRef(null)
    const dispatch = useDispatch();

    const handleDialogClose = () => {
        setValid({
            ...isValid,
            access: false,
        })
        context.setSessionTime({
            expireTime: null, 
            remainTime: null,
        })
        setDialogOpen(false);
        context.setScreen('main')
        action();
        dispatch(deleteSession())
    }
    
    useEffect( () => {
        async function start() {
            if (!isValid.initialized) {
                await axios.get(process.env.REACT_APP_API_VERIFY_TOKEN,
                    { headers: {
                        Authorization: `Bearer ${getJWT().accessToken}`,
                    }})
                    .then(res => {
                        console.log('token check', res.data)
                        if (res.data === 'valid') {
                            console.log('valid')
                            setValid({
                                initialized: true,
                                access: true,
                            })
                            verifyJWT(context)
                        } else if (res.data === 'invalid') {
                            console.log('invalid')
                            setDialogOpen(true)                       
                        }         
                    })
                    .catch(err => {
                        console.log(err)
                    })
            } 
        }
        if (!dialogOpen) start();
        if (context.sessionTime.remainTime === 0) {
            setDialogOpen(true)
        }

        interval.current = setInterval(() => {
            const check = checkJWTExp(context.sessionTime.expireTime,
                                      context.sessionTime.remainTime);
            if (context.sessionTime.remainTime !== 0) {
                context.setSessionTime({
                    ...context.sessionTime,
                    remainTime: check,
                })
            }
        }, 1000)
        return () => {
            clearInterval(interval.current)
        }

    }, [isValid, context, dialogOpen])

    const action = (props) => {
        if (isValid.access===true) {
            return (
                <Component {...props} 
                    context={context}
                />
            )
        } else if (isValid.access===false) {
            return (
                <Redirect to='/' />
            )
        }
    }

    const clickSignOut = () => {
        deleteJWT();
        verifyJWT(context);
    }
    
    return (
        <div>
            <Route {...rest}
                render={action}
            />
            {isValid.access 
                ? <Box sx={{
                    width: '100%',
                    display: 'flex',
                    position: 'absolute',
                    top: 0,
                    alignItems: 'center',
                    justifyContent: 'right'
                }}>
                    <p>session remained: {context.sessionTime.remainTime}sec</p>
                    <Button variant='contained' size='small'
                        onClick={clickSignOut}
                    >SignOut</Button>
                </Box>
                : null
            }
            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    로그인 정보없음
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        로그인 후 사용가능한 서비스입니다
                    </DialogContentText>
                    <DialogActions>
                        <Button onClick={handleDialogClose}>확인</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default PrivateRoute;