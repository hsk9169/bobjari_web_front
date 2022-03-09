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

import { useDispatch, useSelector } from "react-redux";
import { deleteSession } from "slices/session";
import { selectManage, updateBotNav, updateSessionTime } from 'slices/manage'

import {getJWT, deleteJWT, checkJWTExp, verifyJWT} from 'utils/handle-jwt';

const PrivateRoute = ({ component: Component, botNav, ...rest }) => {
    const [isValid, setValid] = useState({
        initialized: false,
        access: null,
    })
    const [dialogOpen, setDialogOpen] = useState(false);
    const dispatch = useDispatch();
    const manage = useSelector(selectManage)
    

    console.log('Private Route')

    const handleDialogClose = () => {
        setValid({
            ...isValid,
            access: false,
        })
        dispatch(updateSessionTime({
            expireTime: null,
            remainTime: null,
        }))
        setDialogOpen(false);
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
                            setValid({
                                initialized: true,
                                access: true,
                            })
                            let obj = {expireTime: null, remainTime: null}
                            verifyJWT(obj)
                            dispatch(updateSessionTime(obj))
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
        if (manage.sessionTime.remainTime === 0) {
            setDialogOpen(true)
        }
        dispatch(updateBotNav(botNav))
        
        
        
    }, [isValid, dialogOpen, manage, dispatch, botNav])

    const action = (props) => {
        if (isValid.access===true) {
            return (
                <Component {...props} />
            )
        } else if (isValid.access===false) {
            return (
                <Redirect to='/' />
            )
        }
    }
    
    return (
        <div>
            <Route {...rest}
                render={action}
            />
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