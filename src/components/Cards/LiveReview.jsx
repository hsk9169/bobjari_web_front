import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import {compareDate} from 'utils/handle-datetime'



const LiveReview = (props) => {

    const width = window.innerWidth
    const height = window.innerHeight

    const date = compareDate(props.date) 

    return (
        <Paper elevation={3}
            sx={{
                p: 2,
                width: width * 0.7, 
                height: height * 0.25,
                backgroundColor: '#f5f5f5',
            }}
        >
            <Grid container direction='column'>
                <Grid item sx={{width: '100%'}}>
                    <span style={{
                        fontSize: '13px',
                        color: '#616161'
                    }}>
                        {props.mentorNickname}
                        &nbsp;&bull;&nbsp;
                        {date}
                    </span>
                </Grid>
                <Grid item sx={{width: '100%'}}>
                    <div style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}>
                        <span style={{
                            fontSize: '13px',
                            color: '#616161'
                        }}>
                            {props.job}
                        </span>
                    </div>
                </Grid>
                <Grid item 
                    sx={{
                        pt: 1,
                        height: height * 0.12,
                        maxHeight: height * 0.12,
                        width: '100%'
                    }}
                >
                    <div style={{
                        whiteSpace: 'normal',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}>
                        <b style={{
                            fontSize: '14px',
                            color: '#000000'
                        }}>
                            {props.body}
                        </b>
                    </div>
                </Grid>
                <Grid item 
                    sx={{
                        pt: 2,
                        width: '100%'
                    }}
                >
                    <span style={{
                        fontSize: '13px',
                        color: '#616161'
                    }}>
                        {props.menteeNickname}
                    </span>
                </Grid>     
            </Grid>
        </Paper>
    )
}

export default LiveReview