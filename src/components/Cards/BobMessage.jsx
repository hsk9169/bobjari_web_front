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
                    <span style={{
                        fontSize: '14px',
                        color: '#9e9e9e'
                    }}>
                        밥자리 거절
                    </span>
                )
            case 1:
                return (
                    <span style={{
                        fontSize: '14px',
                        color: '#9e9e9e'
                    }}>
                        밥자리 신청
                    </span>
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
        <Paper elevation={0} 
            onClick={props.handleClick}
            sx={{
                p: 1,
                pt: 2,
                display: 'flex', 
                width: '100%'
            }}
        >
            <Grid container sx={{display: 'flex', justifyContent: 'center'}}>
                
                <Grid item
                    sx={{
                        width: '17%',
                        display: 'flex', 
                        alignItems: 'center'
                    }}
                >
                    <Avatar alt='프로필 사진'
                        src={props.image.contentType==='url'
                            ? props.image.data
                            : `data:${props.image.contentType};base64,${props.image.data}`
                        }
                        sx={{ width: 55, height: 55}} 
                    />
                </Grid>

                <Grid item
                    sx={{
                        width: '65%',
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    <div style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        lineHeight: '120%'
                    }}>
                        <b style={{
                            fontSize: '16px',
                            color: '#000000'
                        }}>
                            {props.nickname}
                        </b>
                        {props.role === 'mentee' ?
                            <span style={{
                                fontSize: '16px',
                                color: '#000000'
                            }}>
                                &nbsp;&bull;&nbsp;{props.job}
                            </span>
                        : null}
                        <br/>
                        <span style={{
                            fontSize: '14px',
                            color: '#000000'
                        }}>
                            {props.lastMessage !== null ?
                            props.lastMessage : '[ 대화를 시작해보세요! ]'}
                        </span>
                        <br/>
                        <BobjariStatus />
                    </div>
                </Grid>
                
                <Grid item
                    sx={{ 
                        width: '18%',
                        display: 'flex', 
                        justifyContent: 'flex-end',
                        alignItems: 'flex-start',
                    }}
                >
                    {renderDateTime()}
                </Grid>
            </Grid>
        </Paper>
    )
}

export default BobMessage