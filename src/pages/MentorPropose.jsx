import {useState} from 'react'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CheckIcon from '@mui/icons-material/Check';
import {Schedule, Location, Propose} from 'components/Proposal'
import {getJWT} from 'utils/handle-jwt'
import {useSelector} from 'react-redux'
import { selectBasePath } from 'slices/basePath'
const axios = require('axios')

const MentorPropose = (props) => {

    const width = window.innerWidth
    const height = window.innerHeight

    const [step, setStep] = useState(0)
    const [scheduleCheck, setScheduleCheck] = useState([])
    const [numSchedSel, setNumSchedSel] = useState(0)
    const [locationCheck, setLocationCheck] = useState([])

    const [dialogOpen, setDialogOpen] = useState(false)
    const [isPending, setIsPending] = useState(false)
    const basePath = useSelector(selectBasePath)   

    const handleNext = () => {
        setStep(step + 1)
    }

    const handleBack = () => {
        if (step > 0) setStep(step - 1)
        else props.history.goBack()
    }

    const handleClose = () => {
        props.history.goBack()
    }

    const handleGoSchedule = () => {
        setStep(0)
    }

    const handleGoLocation = () => {
        setStep(1)
    }

    const handlePropose = async () => {
        let location = []
        locationCheck.map(idx => {
            location = [...location, {
                place_name: props.location.data.location[idx].place_name,
                address_name: props.location.data.location[idx].address_name,
                geolocation: {
                    x: props.location.data.location[idx].geolocation.x,
                    y: props.location.data.location[idx].geolocation.y,
                }
            }]
        })

        setIsPending(true)        
        await axios.post(basePath.path + process.env.REACT_APP_API_BOBJARI,
            {
                menteeId: props.location.data.menteeId,
                mentorId: props.location.data.mentorId,
                appointment: {
                    schedule: scheduleCheck,
                    location: location,
                    fee: props.location.data.fee,
                }
            }, 
            {
                headers: {
                    Authorization: `Bearer ${getJWT().accessToken}`,
                },
            })
            .then(res => {
                setIsPending(false)
                if (res.data === 'success') {
                    setDialogOpen(true)
                    setTimeout(() => { 
                        setDialogOpen(false)
                        handleClose()
                    }, 3000)
                }
            })
            .catch(err => {
                console.log(err)
            })
        
        
    }

    const RenderSteps = () => {
        switch(step) {
            case 0:
                return (
                    <Schedule
                        schedule={props.location.data.schedule}
                        scheduleCheck={scheduleCheck}
                        numSchedSel={numSchedSel}
                        setNumSchedSel={setNumSchedSel}
                        setScheduleCheck={setScheduleCheck}
                        onClickNext={handleNext}
                        onClickBack={handleBack}
                        onClickClose={handleClose}
                    />
                )
            case 1:
                return (
                    <Location
                        location={props.location.data.location}
                        locationCheck={locationCheck}
                        setLocationCheck={setLocationCheck}
                        onClickNext={handleNext}
                        onClickBack={handleBack}
                        onClickClose={handleClose}
                    />
                )
            case 2:
                return (
                    <Propose
                        location={props.location.data.location}
                        fee={props.location.data.fee}
                        mentorData={props.location.data.mentorProfile}
                        scheduleCheck={scheduleCheck}
                        locationCheck={locationCheck}
                        isPending={isPending}
                        dialogOpen={dialogOpen}
                        onClickPropose={handlePropose}
                        onClickBack={handleBack}
                        onClickClose={handleClose}
                        onClickSchedule={handleGoSchedule}
                        onClickLocation={handleGoLocation}
                    />
                )
            default:
                break
        }
    }

    return (
        <>
        <RenderSteps />

        <Dialog
            open={dialogOpen}
            onClose={handleClose}
        >
            <DialogContent
                sx={{
                    width: width * 0.5,
                    height: height * 0.3,
                    p: 0,
                }}
            >
                <Grid container
                    direction='column'
                    sx={{
                        pt: 6,
                        width: '100%',
                        height: height * 0.3,
                        backgroundColor: '#9e9e9e',
                    }}
                >
                    <Grid item
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <CheckIcon 
                            sx={{
                                width: 100, 
                                height: 100,
                                color: '#ffffff'
                            }}
                        />
                    </Grid>
                    <Grid item
                        sx={{
                            pt: 4,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant='h6'
                            sx={{
                                color: '#ffffff',
                                fontWeight: 'fontWeightBold'
                            }}
                        >
                            밥자리 신청 완료
                        </Typography>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
        </>
    )
}

export default MentorPropose