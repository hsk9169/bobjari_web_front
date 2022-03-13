import {useState} from 'react'
import {HowTo, BobRules} from 'components/Cards'
import Box from '@mui/material/Box'
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const BobjariGuide = (props) => {

    const height = window.innerHeight
    const [activeStep, setActiveStep] = useState(0);

    const handleStepChange = (step) => {
        setActiveStep(step)
    }

    return (
        <>
        <Box
            style={{position: 'relative'}} 
            sx={{
                width: '100%', 
                height: height * 0.14,
                display: 'flex',
                alignItems: 'center'
            }}
        >
            <AutoPlaySwipeableViews
                style={{position: 'absolute'}}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvent
            >
                <HowTo />
                <BobRules />
            </AutoPlaySwipeableViews>
            <Box 
                style={{zIndex: 1500}} 
                sx={{
                    p: 1,
                    width: '10%',
                    height: 20,
                    position: 'absolute',
                    right: '5%',
                    bottom: '10%',
                    borderRadius: 3,
                    backgroundColor: '#9e9e9e',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: 0.85
                }}
            >
                <b style={{color: '#ffffff', fontSize: '12px'}}>
                    {activeStep+1}&nbsp;/&nbsp;2
                </b>
            </Box>
        </Box>
        </>
    )
}

export default BobjariGuide