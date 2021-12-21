import * as React from 'react'
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import CssBaseline from '@mui/material/CssBaseline';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import PageBox from '../../styled/PageBox'
import BobButton from '../../styled/BobButton'

import { Email, Company, Business, Etc } from './options'
import { careerAuthText } from '../../../constants/mentor-signup-titles'

const authMethod = [
    {
        title: '회사 메일로 인증하기',
        details: '사내메일이 있을 경우에 해당합니다.',
    },
    {
        title: '재직증명서로 인증하기',
        details: '사내메일이 없을 경우에 해당합니다.',
    },
    {
        title: '사업자등록증으로 인증하기',
        details: '개인사업자/프리랜서 등 근로계약자가 아닌 경우에 해당합니다.',
    },
    {
        title: '기타 증빙 파일로 인증하기',
        details: '위 세가지 방법으로 인증할 수 없는 경우에 해당합니다.',
    },
]

const Root = styled('div')(({ theme }) => ({
    height: '100%',
    backgroundColor:
    theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

const CareerAuth = (props) => {

    const progressRatio = 11
    const drawerBleeding = 56;

    const [temp, setTemp] = React.useState({
        view: Array.from({length: authMethod.length}, (idx) => {
            if (idx === props.state.authSelect) return 'contained'
            else return 'outlined'
        }),
        select: (props.state.authSelect ? props.state.authSelect : null),
        inputFile: null,
        isAuth: false,
    })
    console.log(temp)

    // Drawer
    const { drawerWindow } = props;
    const [open, setOpen] = React.useState(false);

    const handleSelect = idx => () => {
        props.setState({
            ...props.state,
            authSelect: idx,
        })
        setTemp({
            view: (temp.view.map((element,index) => {
                if(index === idx) {
                    return 'contained'
                }
                else return 'outlined'
            })),
            select: idx,
        })
        setOpen(true)
    }

    const handleNext = () => {
        props.setState({
            ...props.state,
            pageNum: (props.state.pageNum < 9 
                ? props.state.pageNum+1 
                : props.state.pageNum),
            progress: (props.state.progress < 100 
                ? props.state.progress+progressRatio 
                : props.state.progress),
        })
    }

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    

    const handleDone = () => {
        switch (temp.select) {
            case 0:
                if (temp.isAuth) {
                    props.setState({
                        ...props.state,
                        authSelect: temp.select,
                        isAuth: true,
                    })
                }
                break;
            case 1:
                if (temp.inputFile !== null) {
                    props.setState({
                        ...props.state,
                        authSelect: temp.select,
                        authFile: temp.inputFile,
                    })
                } 
                break;
            case 2:
                if (temp.inputFile !== null) {
                    props.setState({
                        ...props.state,
                        authSelect: temp.select,
                        authFile: temp.inputFile,
                    })
                } 
                break;
            case 3:
                if (temp.inputFile !== null) {
                    props.setState({
                        ...props.state,
                        authSelect: temp.select,
                        authFile: temp.inputFile,
                    })
                } 
                break;
            default: 
                break;
        }
        setOpen(false);
    }

    const RenderDrawer = () => {
        switch (temp.select) {
            case 0:
                console.log(temp.select)
                return(
                    <Email
                        title={careerAuthText.title[temp.select]}
                        subtitle={careerAuthText.subtitle[temp.select]}
                        state={temp}
                        setState={setTemp}
                        onClickDone={handleDone}
                    />
                )
            case 1:
                return (
                    <Company 
                        title={careerAuthText.title[temp.select]}
                        subtitle={careerAuthText.subtitle[temp.select]}
                        state={temp}
                        setState={setTemp}
                        onClickDone={handleDone}
                    />
                )
            case 2:
                return(
                    <Business 
                        title={careerAuthText.title[temp.select]}
                        subtitle={careerAuthText.subtitle[temp.select]}
                        state={temp}
                        setState={setTemp}
                        onClickDone={handleDone}
                    />
                )
            case 3:
                return(
                    <Etc 
                        title={careerAuthText.title[temp.select]}
                        subtitle={careerAuthText.subtitle[temp.select]}
                        state={temp}
                        setState={setTemp}
                        onClickDone={handleDone}
                    />
                )
            default:
                break;
        }
    }

    // Swipeable Modal Contents
    const container = drawerWindow !== undefined 
        ? () => window.document.body 
        : undefined;


    return (
        <div>
            <PageBox sx={{display: 'flex'}}>
                <Stack direction='column' spacing={2} sx={{width:'85%'}}>
                    {authMethod.map((el,idx) => (
                        <Button variant={temp.view[idx]} onClick={handleSelect(idx)}>
                            <Grid container direction='column'>
                            <Typography variant='subtitle1' 
                                color={temp.view[idx]==='contained' ? 'white' : 'black'}
                                sx={{fontWeight: 'fontWeightBold'}}>
                                {el.title}
                            </Typography>
                            <Typography variant='caption text'
                                color={temp.view[idx]==='contained' ? 'white' : 'black'}
                                sx={{fontWeight: 'fontWeightMedium'}}>
                                {el.details}
                            </Typography>
                            </Grid>
                        </Button>
                    ))}
                </Stack>
            </PageBox>
            <PageBox sx={{pt: 4, display: 'flex'}}>
                <BobButton title='다 음' onClick={handleNext} />
            </PageBox>


            <Root>
            <CssBaseline />
                <Global
                    styles={{
                        '.MuiDrawer-root > .MuiPaper-root': {
                          height: '90%',
                          overflow: 'visible',
                        },
                        '.MuiDrawer-paper': {
                            borderTopLeftRadius: 24,
                            borderTopRightRadius: 24,
                        }
                    }}
                />
                <SwipeableDrawer
                    container={container}
                    anchor="bottom"
                    open={open}
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}
                    swipeAreaWidth={drawerBleeding}
                    disableSwipeToOpen={true}
                    ModalProps={{
                        keepMounted: true,
                    }}
                >
                    {RenderDrawer()}               
                </SwipeableDrawer>
            </Root>
        </div>
    )
}

export default CareerAuth;