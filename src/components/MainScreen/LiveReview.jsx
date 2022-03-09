import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ButtonBase from '@mui/material/ButtonBase';

const LiveReview = (props) => {

    return (
        <Grid container
            direction='column'
            sx={{width: '100%', pt: 1}}
        >
            <Grid item container
                sx={{width: '100%'}}
            >
                <Grid item 
                    sx={{
                        width: '50%',
                        display: 'flex',
                        justifyContent: 'flex-start'
                    }}
                >
                    <Typography variant='h6'
                        sx={{fontWeight: 'fontWeightBold'}}
                    >
                        실시간 리뷰
                    </Typography>
                </Grid>
                <Grid item
                    sx={{
                        width: '50%',
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }}
                >
                    <ButtonBase>
                        <ArrowForwardIosIcon
                            color='disabled'
                            onClick={props.handleMoreReview}
                        />
                    </ButtonBase>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default LiveReview