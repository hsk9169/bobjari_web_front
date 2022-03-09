import {useState, useEffect} from 'react'; 
import { Redirect, Route } from 'react-router-dom';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button'
import {getJWT} from 'utils/handle-jwt';
import {useDispatch} from 'react-redux'
import { updateBotNav } from 'slices/manage';


const PublicRoute = ({ component: Component, restricted, botNav, ...rest }) => {

    console.log('Public Route')

    const dispatch = useDispatch()

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
                        Authorization: `Bearer ${getJWT().accessToken}`,
                    }})
                    .then(res => {
                        if (res.data === 'valid') {
                            setDialogOpen(true)
                        } else if (res.data === 'invalid') {
                            setValid({
                                initialized: true,
                                access: true,
                            })
                        }                        
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        }
        
        dispatch(updateBotNav(botNav))

        if (!restricted) {
            setValid({
                initialized: true,
                access: true,
            })
        } else {
            start();
        }
        
    }, [botNav])
    
    const action = (props) => {
        if (isValid.access===true) {
            return (
                <Component {...props} />
            )
        } else if (isValid.access===false) {
            return (
                <Redirect to='/main' />
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
                    {'접근 불가'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        로그인 세션 유지 중...
                    </DialogContentText>
                    <DialogActions>
                        <Button onClick={handleDialogClose}>확인</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default PublicRoute;