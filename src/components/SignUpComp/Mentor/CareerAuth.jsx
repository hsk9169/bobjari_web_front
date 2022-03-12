import * as React from 'react'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import CssBaseline from '@mui/material/CssBaseline';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import BobButton from 'components/styled/BobButton'
import NormalButton from 'components/styled/NormalButton'
import { Email, Company, Business, Etc } from './options'
import { careerAuthText } from 'constants/mentor-signup-titles'

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

    const progressRatio = 10
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
            pageNum: (props.state.pageNum < 10
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
                        isAuth: true,
                    })
                } 
                break;
            case 2:
                if (temp.inputFile !== null) {
                    props.setState({
                        ...props.state,
                        authSelect: temp.select,
                        authFile: temp.inputFile,
                        isAuth: true,
                    })
                } 
                break;
            case 3:
                if (temp.inputFile !== null) {
                    props.setState({
                        ...props.state,
                        authSelect: temp.select,
                        authFile: temp.inputFile,
                        isAuth: true,
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
        <>
        <Grid item container
            direction='column'
            sx={{
                width: '100%',
                display: 'flex', 
                p: 2,
            }}
        >
            <Grid item container
                direction='column'
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                {authMethod.map((el,idx) => (
                    <Grid item 
                        sx={{
                            width: '100%',
                            pb: 2
                        }}
                    >
                        <NormalButton myColor='#75910' 
                            variant={temp.view[idx]} 
                            onClick={handleSelect(idx)}
                            sx={{
                                width: '100%',
                                backgroundColor: temp.view[idx]==='contained'
                                    ? '#f75910' : '#ffffff',
                                borderColor: '#000000'
                            }}
                        >
                            <Grid container direction='column'>
                                <Grid item 
                                    sx={{
                                        width: '100%',
                                        display:'flex',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Typography variant='subtitle1' 
                                        sx={{
                                            fontWeight: 'fontWeightBold',
                                            color: temp.view[idx]==='contained' 
                                                ? '#ffffff' : '#000000'
                                        }}
                                    >
                                        {el.title}
                                    </Typography>
                                </Grid>
                                <Grid item 
                                    sx={{
                                        width: '100%',
                                        display:'flex',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Typography variant='caption text' 
                                        sx={{
                                            fontWeight: 'fontWeightMedium',
                                            color: temp.view[idx]==='contained' 
                                                ? '#ffffff' : '#000000'
                                        }}
                                    >
                                        {el.details}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </NormalButton>
                    </Grid>        
                ))}
            </Grid>

            <Grid item 
                sx={{
                    width: '100%',
                    pt: 4
                }}
            >
                <BobButton 
                    onClick={handleNext}
                    disabled={false}
                    title={'다 음'}
                />
            </Grid>
        </Grid>


            <Root>
            <CssBaseline />
                <Global
                    styles={{
                        '.MuiDrawer-root > .MuiPaper-root': {
                          height: '80%',
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
        </>
    )
}

export default CareerAuth;