import React from 'react';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Skeleton from '@mui/material/Skeleton';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
const authInfo = require('../constants/kakao-auth');
const imgUri = require('../constants/image-uri');

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const steps = [
    {
        label1: '속 시원한',
        label2: '현직자 인터뷰, 밥자리',
        description1: '오래 꿈꿔온 직업부터',
        description2: '한 번 알아보고 싶은 직업까지',
        image: imgUri.INTERVIEW_ILLUST,
    },
    {
        label1: '검증된 직업인과',
        label2: '안전하고 만족스럽게',
        description1: '직업인 인증절차에서 시작되는',
        description2: '성공적인 밥자리',
        image: imgUri.VERIFY_ILLUST,
    },
    {
        label1: '쉽고 간단한 ',
        label2: '밥자리 만남 프로세스',
        description1: '심플한 과정으로',
        description2: '날짜 시간 장소까지 빠르게 확정',
        image: imgUri.RESERVE_ILLUST,
    },
];

const drawerBleeding = 56;

const Root = styled('div')(({ theme }) => ({
    height: '100%',
    backgroundColor:
    theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));
  
const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));
  
const Puller = styled(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
}));

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 45,
        width: 300,
        padding: '0 30px',
    },
});

const Welcome = (props) => {

    const classes = useStyles();

    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = steps.length;

    // Drawer
    const { window } = props;
    const [open, setOpen] = React.useState(false);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };
    
    // This is used only for the example
    const container = window !== undefined ? () => window().document.body : undefined;


    const redirectUri = () => {
        let baseUri = authInfo.BASE_URI;
        baseUri = baseUri.concat('client_id=', authInfo.CLIENT_ID, '&');
        baseUri = baseUri.concat('client_secret=', authInfo.SECRET_KEY, '&');
        baseUri = baseUri.concat('redirect_uri=', authInfo.CALLBACK_URI, '&');
        baseUri = baseUri.concat('response_type=', 'code');
        return baseUri;
    }

    const kakaoButtonHandler = () => {
        //window.location.assign(redirectUri());
        props.history.push({
            pathname: '/signupform',
            props: {
                email: 'hsk9169@gmail.com',
                age: '31',
                gender: 'male',
                profileImage: 'https://w.namu.la/s/28027c57126faed6ad2426677a122ac53864e9fca93d64442af454a4bb397c3ac6467f258f151f0bb19b3c8b91609ae7cc8ab888a9b235670622ef1cb1fbc6df56bfd6011ccdef1401fb8ce52739c8e9fc85a22f858fdfd891e8b8522d4647c4',
            }
        });
    }

    const bobjariSignInButtonHandler = () => {
        props.history.push('/signin');
    }

    const bobjariSignUpButtonHandler = () => {
        props.history.push('/signup');
    }

    return (
        <div>
            <Box sx={{height: 30}}></Box>
            <Box sx={{ 
                    maxWidth: 400, 
                    flexGrow: 1,
                }}
            >
                <Paper
                    square
                    elevation={0}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      height: 100,
                      pl: 5,
                    }}
                >
                    <Typography variant='h4' sx={{ fontWeight: 'fontWeightBold'}}>
                        {steps[activeStep].label1}<br/>
                        {steps[activeStep].label2}
                    </Typography>
                </Paper>
                <Box
                    sx={{ 
                        maxWidth: 400, 
                        pl: 5,
                    }}
                >
                    {steps[activeStep].description1}<br/>
                    {steps[activeStep].description2}
                </Box>
                <AutoPlaySwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={activeStep}
                    onChangeIndex={handleStepChange}
                    enableMouseEvents
                >
                    {steps.map((steps, index) => (
                        <div key={steps.label1}>
                            {Math.abs(activeStep - index) <= 2 ? (
                                <Box
                                    component="img"
                                    sx={{
                                        height: 255,
                                        display: 'block',
                                        maxWidth: 400,
                                        overflow: 'hidden',
                                        margin: 2,
                                    }}
                                    src={steps.image}
                                    alt={steps.label1}
                                />
                          ) : null}
                        </div>
                    ))}
                </AutoPlaySwipeableViews>
                <MobileStepper  
                    steps={maxSteps}  
                    position="static" 
                    activeStep={activeStep}   
                    nextButton={  
                        <Button 
                            size="small"  
                            onClick={handleNext}  
                            disabled={activeStep === maxSteps - 1}
                        >   
                            Next  
                            {theme.direction === 'rtl' ? (
                              <KeyboardArrowLeft />
                            ) : (
                              <KeyboardArrowRight />
                            )}
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                            {theme.direction === 'rtl' ? (
                                <KeyboardArrowRight />
                            ) : (
                                <KeyboardArrowLeft />
                            )}
                            Back
                        </Button>
                    }
                />
            </Box>
            <br/>
            <div>
                <img src={require('../contents/kakao_login_medium_wide.png').default} alt="카카오 로그인 버튼"
                 onClick={() => {
                    kakaoButtonHandler();
                 }}/>
            </div>
            <div>
                <Button className={classes.root} onClick={() => {
                    bobjariSignInButtonHandler();
                }}>밥자리 계정으로 로그인</Button>
            </div>
            <div>
                <a>아직 회원이 아니신가요?  </a>
                <Link
                    component="button"
                    variant="body2"
                    onClick={() => {
                        bobjariSignUpButtonHandler();
                    }}
                >
                    밥자리 회원가입
                </Link>
            </div>      

            <Root>
                <CssBaseline />
                <Global
                    styles={{
                        '.MuiDrawer-root > .MuiPaper-root': {
                          height: `calc(50% - ${drawerBleeding}px)`,
                          overflow: 'visible',
                        },
                    }}
                />
                <SwipeableDrawer
                    container={container}
                    anchor="bottom"
                    open={open}
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}
                    swipeAreaWidth={drawerBleeding}
                    disableSwipeToOpen={false}
                    ModalProps={{
                        keepMounted: true,
                    }}
                >
                    <StyledBox
                        sx={{
                            position: 'absolute',
                            top: -drawerBleeding,
                            borderTopLeftRadius: 8,
                            borderTopRightRadius: 8,
                            visibility: 'visible',
                            right: 0,
                            left: 0,
                        }}
                    >
                        <Puller />
                        <Typography sx={{ 
                                        p: 2, 
                                        color: 'text.secondary',
                                        fontWeight: 'fontWeigntMedium',
                                    }}
                        >
                            로그인 회원가입
                        </Typography>
                    </StyledBox>
                    <StyledBox
                        sx={{
                            px: 2,
                            pb: 2,
                            height: '100%',
                            overflow: 'auto',
                        }}
                    >
                    </StyledBox>
                </SwipeableDrawer>
    </Root>


        </div>
        
    );
}

Welcome.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
  };

export default Welcome;