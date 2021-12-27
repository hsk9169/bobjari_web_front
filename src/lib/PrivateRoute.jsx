import {useState, useEffect} from 'react';
import { Redirect, Route } from 'react-router-dom';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button'

const PrivateRoute = ({ component: Component, setBotNav, access, ...rest }) => {
    const [isValid, setValid] = useState({
        initialized: false,
        access: null,
    })
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect( () => {
        async function start() {
            if (!isValid.initialized) {
                await axios.get(process.env.REACT_APP_API_VERIFY_TOKEN,
                    { headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    }})
                    .then(res => {
                        if (res.data === 'valid') {
                            console.log('token valid')
                            setValid({
                                initialized: true,
                                access: true,
                            })                        
                        } else if (res.data === 'invalid') {
                            console.log('token invalid')
                            setDialogOpen(true)                       
                        }         
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        }

        start();
        if (!access) {
            setDialogOpen(true)
        }

    }, [isValid, setValid, access])

    const action = (props) => {
        console.log(access)
        if (isValid.access===true) {
            return (
                <Component {...props} 
                    setBotNav={setBotNav} 
                />
            )
        } else if (isValid.access===false) {
            return (
                <Redirect to='/' />
            )
        }
    }

    const handleDialogClose = () => {
        setValid({
            ...isValid,
            access: false,
        })
        action();
        setDialogOpen(false);
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
                    {'로그인 세션 만료'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        로그인 페이지로 돌아가기
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