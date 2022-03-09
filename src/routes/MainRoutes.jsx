import {useState, useEffect} from 'react'
import { ContentRoute } from 'lib';
import {useDispatch, useSelector} from 'react-redux'
import {Switch} from 'react-router-dom'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import {Main, Search, MentorDetails} from 'pages'
import {selectManage, updateNavScreen, updateLoginAlert} from 'slices/manage'

const MainRoutes = ({match, history}) => {

    const dispatch = useDispatch()
    const manage = useSelector(selectManage)
    const [dialogOpen, setDialogOpen] = useState(false)

    const handleDialogClose = () => {
        setDialogOpen(false);
        dispatch(updateLoginAlert(false))
        history.push('/')
    }

    useEffect( () => {
        if (manage.loginAlert === true)
            setDialogOpen(true)
        else setDialogOpen(false)
    }, [manage])
    
    useEffect( () => {
        dispatch(updateNavScreen('main'))
    }, [])

    return (
        <>
        <Switch>
            <ContentRoute component={Main} 
                path={match.path} exact botNav={true} />
            <ContentRoute component={Search} 
                path={`${match.path}/search`} exact botNav={false} />
            <ContentRoute component={MentorDetails} 
                path={`${match.path}/mentor/:id`} exact botNav={false} />
        </Switch>

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
        </>
    )
}

export default MainRoutes