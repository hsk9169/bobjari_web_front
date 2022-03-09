import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import dog from 'contents/dog.png'
import cat from 'contents/cat.png'

const HowTo = () => {

    const handleGuideLink = () => {
        console.log('link')
    }

    return (
        <Grid container
            sx={{
                width: '100%',
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
                        밥자리<br/>이렇게 하는 겁니다
                    </h4>
                </Grid>
                
                <Grid item container
                    onClick={handleGuideLink}
                >
                    <Grid item>
                        <Typography variant='button'
                            sx={{color: '#ffffff'}}
                        >
                            사용법 바로가기&nbsp;
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

            <Grid item container
                sx={{
                    width: '45%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end'
                }}
            >
                <Grid item>
                    <Box component='img'
                        src={cat}
                        alt='cat_image'
                        sx={{width: 70, height: 100}}
                    />
                </Grid>
                <Grid item>
                    <Box component='img'
                        src={dog}
                        alt='dog_image'
                        sx={{width: 80, height: 80}}
                    />
                </Grid>
            </Grid>
        </Grid>
    )
}

export default HowTo