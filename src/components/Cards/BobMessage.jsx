import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import {compareDate} from 'utils/handle-datetime'


const BobMessage = (props) => {

    const BobjariStatus = () => {
        switch (props.bobjariStatus) {
            case 0:
                return (
                    <Typography variant='subtitle2' color='text.secondary'>
                        밥자리 거절
                    </Typography>
                )
            case 1:
                return (
                    <Typography variant='subtitle2' color='text.secondary'>
                        밥자리 신청
                    </Typography>
                )
            case 2:
                return (
                    <Typography variant='subtitle2' color='text.secondary'>
                        밥자리 수락
                    </Typography>
                )
            case 3:
                return (
                    <Typography variant='subtitle2' color='text.secondary'>
                        밥자리 확정
                    </Typography>
                )
            case 4:
                return (
                    <Typography variant='subtitle2' color='text.secondary'>
                        밥자리 종료
                    </Typography>
                )
            default:
                break
        }
    }

    const renderDateTime = () => {
        const datetime = compareDate(props.lastUpdated)
        return (
            <Typography variant='caption' color='text.secondary'>
                {datetime}
            </Typography>
        )
    }

    return (
        <Paper elevation={0} onClick={props.handleClick}
            sx={{pt: 2, pb: 2, display: 'flex', width: '100%'}}>
            <Grid container sx={{display: 'flex', justifyContent: 'center'}}>
                <Grid item xs={2.4} sx={{display: 'flex', alignItems: 'center'}}>
                    <Avatar alt='프로필 사진'
                        src={props.image.contentType==='url'
                            ? props.image.data
                            : `data:${props.image.contentType};base64,${props.image.data}`
                        }
                        sx={{ width: 65, height: 65}} 
                    />
                </Grid>
                <Grid item xs={7.2} container direction='column'>
                    <Grid item container>
                        <Grid item>
                            <Typography variant='subtitle2' sx={{fontWeight: 'fontWeightBold'}}>
                                {props.nickname}
                            </Typography>
                        </Grid>
                        <Grid item>
                            {props.role === 'mentee' ?
                            <Typography variant='subtitle2'>
                                &nbsp;&bull;&nbsp;
                            </Typography>
                            : null}
                        </Grid>
                        <Grid item>
                            <Typography variant='subtitle2'>
                                {props.role === 'mentor' ? null : props.job===null ? '미입력' : 
                                    props.lineExceeded.firstLine.exceeded 
                                        ? props.job.slice(0, 0-props.lineExceeded.firstLine.num) + '..'
                                        : props.job
                                }
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography variant='subtitle2'>
                            {props.lastMessage===null ? '(메시지 없음)' : 
                                props.lineExceeded.secondLine
                                    ? props.lastMessage.slice(0, 19) + '..'
                                    : props.lastMessage
                            }
                        </Typography>
                    </Grid>
                    <Grid item>
                        <BobjariStatus />
                    </Grid>
                </Grid>
                <Grid item xs={1.8} sx={{ display: 'flex', justifyContent: 'flex-end'}}>
                    <Typography variant='caption' color='text.secondary'>
                        {renderDateTime()}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default BobMessage