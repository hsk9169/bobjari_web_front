import {useState} from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import {useDispatch} from 'react-redux'
import {updateNavScreen} from 'slices/manage'

const authInfo = require('constants/kakao-auth');
const imgUri = require('constants/image-uri');

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


const Welcome = ({context, drawerWindow, history}) => {

    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);

    const dispatch = useDispatch()

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    const redirectUri = () => {
        let baseUri = authInfo.BASE_URI;
        baseUri = baseUri.concat('client_id=', authInfo.CLIENT_ID, '&');
        baseUri = baseUri.concat('client_secret=', authInfo.SECRET_KEY, '&');
        baseUri = baseUri.concat('redirect_uri=', authInfo.CALLBACK_URI, '&');
        baseUri = baseUri.concat('response_type=', 'code');
        return baseUri;
    }

    const kakaoButtonHandler = async () => {
        window.location.assign(redirectUri());
    }

    const bobjariSignInButtonHandler = () => {
        history.push('/signin/bob');
    }

    const handleVisitorEntering = () => {
        history.push('/main')
        dispatch(updateNavScreen('main'))
    }

    return (
        <div>
            <Box sx={{height: 60}}></Box>
            <Box sx={{ 
                    width: '100%', 
                    flexGrow: 1,
                }}
            >
                <Paper
                    square
                    elevation={0}
                    sx={{
                      height: 100,
                      pl: 5,
                      margin: 2,
                    }}
                >
                    <Typography variant='h4' 
                        sx={{ fontWeight: 'fontWeightBold'}}>
                        {steps[activeStep].label1}<br/>
                        {steps[activeStep].label2}
                    </Typography>
                </Paper>
                <Box
                    sx={{ 
                        maxWidth: 400, 
                        pl: 5,
                        margin: 2,
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
                                        width: '100%',
                                        overflow: 'hidden',
                                    }}
                                    src={steps.image}
                                    alt={steps.label1}
                                />
                          ) : null}
                        </div>
                    ))}
                </AutoPlaySwipeableViews>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    pt: 6,
                    overflow: 'auto',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                }}
            >
                <Stack direction='column' spacing={1}>
                    <div>
                        <img src={require('../contents/kakao_login_medium_wide.png').default} alt="카카오 로그인 버튼"
                            onClick={() => {
                                kakaoButtonHandler();
                            }}
                        />
                    </div>
                    <Button variant='contained'
                        onClick={bobjariSignInButtonHandler}
                        sx={{
                            width: '100%', 
                            height: 45,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#f75910'
                        }}
                    >
                        <Typography variant='body1' 
                            sx={{ fontWeight: 'fontWeightBold'}}>
                            밥자리 계정으로 시작하기
                        </Typography>
                    </Button>
                    <Button variant='outlined'
                        onClick={handleVisitorEntering}
                        sx={{
                            width: '100%', 
                            height: 45, 
                            border: 1.5,
                            borderColor: '#000000'
                        }}
                    >
                        <Typography variant='body1' 
                            sx={{ 
                                fontWeight: 'fontWeightBold',
                                color: '#000000'
                            }}>
                            비회원으로 둘러보기
                        </Typography>
                    </Button>
                </Stack>
            </Box>
        </div>
    );
}

export default Welcome;