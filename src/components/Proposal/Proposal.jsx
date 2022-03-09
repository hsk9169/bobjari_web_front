import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link'


const Proposal = (props) => {

    return (
        <Grid container
            direction='column'
            sx={{
                p: 2,
                width: '100%',
            }}
        >
            <Grid item>
                <Typography variant='h6'
                    sx={{fontWeight: 'fontWeightBold'}}
                >
                    신청 정보
                </Typography>
            </Grid>

            <Grid item container
                sx={{
                    pt: 2,
                    width: '100%'
                }}
            >
                <Grid item
                    sx={{
                        width: '50%',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant='body1'
                        sx={{fontWeight: 'fontWeightBold'}}
                    >
                        날짜 시간
                    </Typography>
                </Grid>
                <Grid item
                    sx={{
                        width: '50%',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}
                >
                    <Link>
                        <Typography variant='body1'
                            onClick={props.onClickSchedule}
                            sx={{fontWeight: 'fontWeightBold'}}
                        >
                            수정
                        </Typography>
                    </Link>
                </Grid>
            </Grid>
            <Grid item container
                direction='column'
                sx={{
                    pt: 1,
                    width: '100%'
                }}
            >
                {props.scheduleCheck.map(el1 => (
                    el1.dateDay.map((el2,idx) => (
                        <Grid item sx={{width: '100%'}}>
                            <Typography variant='body1'
                                sx={{color: '#9e9e9e'}}
                            >
                                {el1.year}.{el1.month}.{el2}&nbsp;
                                {el1.time[idx].startTime}&nbsp;-&nbsp;{el1.time[idx].endTime}
                            </Typography>
                        </Grid>
                    ))
                    
                ))}
            </Grid>

            <Grid item container
                sx={{
                    pt: 2,
                    width: '100%'
                }}
            >
                <Grid item
                    sx={{
                        width: '50%',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant='body1'
                        sx={{fontWeight: 'fontWeightBold'}}
                    >
                        장소
                    </Typography>
                </Grid>
                <Grid item
                    sx={{
                        width: '50%',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}
                >
                    <Link onClick={props.onClickLocation}>
                        <Typography variant='body1'
                            sx={{fontWeight: 'fontWeightBold'}}
                        >
                            수정
                        </Typography>
                    </Link>
                </Grid>
            </Grid>
            <Grid item container
                direction='column'
                sx={{
                    pt: 1,
                    width: '100%'
                }}
            >
                {props.locationCheck.map(el => (
                    <Grid item
                        sx={{width: '100%'}}
                    >
                        <Typography variant='body1'
                            sx={{color: '#9e9e9e'}}
                        >
                            {props.location[el].place_name}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
            
        </Grid>
    )
}

export default Proposal