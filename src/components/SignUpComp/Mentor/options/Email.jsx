import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input'
import Button from '@mui/material/Button'
import CheckIcon from '@mui/icons-material/Check';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PageBox       from 'components/styled/PageBox'
import Title         from 'components/styled/Title'
import TitleWithDone from 'components/styled/TitleWithDone'
import BobButton     from 'components/styled/BobButton'
import {useSelector} from 'react-redux'
import { selectBasePath } from 'slices/basePath'
const axios = require('axios');


const Email = (props) => {

    const [state, setState] = useState({
        pageNum: 0,
        emailInput: '',
        emailAuthInput: '',
        emailAuthNum: '',
        authButtonText: '인증하기',
        dialogText:'',
    })
    const [dialogOpen, setDialogOpen] = useState(false);
    const basePath = useSelector(selectBasePath)   


    const handleDialogButton = () => {
        setDialogOpen(false);
    }

    const handleInput = (event) => {
        setState({
            ...state,
            [event.target.id]: event.target.value,
        });
    };

    const handleAuth = async () => {
        await axios({
            method: 'POST',
            url: basePath.path + process.env.REACT_APP_API_EMAIL_AUTH,
            data: {
                email: state.emailInput,
            }
        })
            .then(res => {
                setState({
                    ...state,
                    emailAuthNum: res.data,
                    // For Test
                    emailAuthInput: res.data,
                    pageNum: (state.pageNum + 1),
                })
            })
            .catch(err => {
                console.log(err);
            });
    }

    const handleAuthCheck = () => {
        if (state.emailAuthInput === state.emailAuthNum) {
            setState({
                ...state,
                authButtonText: '인증완료',
            })
            props.setState({
                ...props.state,
                isAuth: true,
            })
        } else {
            setState({
                ...state,
                dialogText: '인증번호 불일치, 확인부탁드립니다'
            })
            setDialogOpen(true)
        }
        
    }

    const renderContent = () => {
        switch (state.pageNum) {
            case 0:
                return (
                    <div>
                        <Title
                            title={props.title[0]} 
                            subtitle={props.subtitle} 
                        />
                        <PageBox
                            sx={{
                                display: 'flex',
                            }}
                        >
                            <FormControl sx={{ width: '80%' }} variant="contained">
                                <Input
                                    id="emailInput"
                                    value={state.emailInput}
                                    onChange={handleInput}
                                    aria-describedby="component-error-text"
                                />
                            </FormControl>
                        </PageBox>
                        <PageBox
                            sx={{
                                pt:10,
                                display: 'flex',
                            }}
                        >
                            <BobButton title='확 인' onClick={handleAuth} />
                        </PageBox>
                    </div>
                )
            case 1:
                return (
                    <div>
                        <TitleWithDone
                            title={props.title[1]} 
                            subtitle={props.subtitle} 
                            onClickDone={props.onClickDone}
                        />
                        <PageBox
                            sx={{
                                display: 'flex',
                            }}
                        >
                            <FormControl sx={{ width: '80%' }} variant="contained">
                                <Input
                                    id="emailAuthInput"
                                    value={state.emailAuthInput}
                                    onChange={handleInput}
                                    aria-describedby="component-error-text"
                                />
                            </FormControl>
                        </PageBox>
                        <PageBox
                            sx={{
                                pt:10,
                                display: 'flex',
                            }}
                        >
                            <BobButton 
                                title={state.authButtonText} 
                                endIcon={(props.state.isAuth ? CheckIcon : null)}
                                onClick={handleAuthCheck}
                            />
                        </PageBox>
                    </div>
                )
            default:
                break;
        }
    }



    return (
        <div>
            {renderContent()}
            <Dialog
                open={dialogOpen}
                onClose={handleDialogButton}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'Error'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {state.dialogText}
                    </DialogContentText>
                    <Button onClick={handleDialogButton}>확인</Button>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Email;