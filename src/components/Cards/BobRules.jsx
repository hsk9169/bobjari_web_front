import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const BobRules = () => {

    const handleGuideLink = () => {
        console.log('link')
    }
    const height = window.innerHeight


    return (
        <Grid container
            sx={{
                width: '100%',
                height: height * 0.14,
                backgroundColor: '#f75910',
                borderRadius: 3
            }}
        >
            <Grid item container
                direction='column'
                sx={{
                    p: 2,
                    width: '55%',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start'
                }}
            >
                <Grid item>
                    <h4 style={{color:'white', fontWeight: 700}}>
                        밥자리 강령 10조
                    </h4>
                </Grid>
                
                <Grid item container
                    onClick={handleGuideLink}
                >
                    <Grid item>
                        <Typography variant='button'
                            sx={{color: '#ffffff'}}
                        >
                            바로가기&nbsp;
                        </Typography>
                    </Grid>
                    
                    <Grid item>
                        <ArrowForwardIosIcon
                            sx={{
                                color: '#ffffff',
                                width: 12,
                                height: 12
                            }}
                        />
                    </Grid>
                </Grid>
            </Grid>

            
        </Grid>
    )
}

export default BobRules