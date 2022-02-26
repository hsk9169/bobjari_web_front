import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import PageBox from 'components/styled/PageBox'
import Typography from '@mui/material/Typography';

const NoBob = (props) => {

    return (
        <PageBox sx={{display: 'flex', width: '100%', height: 500}} onClick={props.onClick}>
            <Grid container direction='column' sx={{display: 'flex', alignItems: 'center'}}>
                <Grid item>
                    <Typography variant='subtitle1' sx={{fontWeight: 'fontWeightBold'}}>
                        {props.title}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant='subtitle1' sx={{fontWeight: 'fontWeightBold'}}>
                        지금 바로 직업인을 검색해보세요.
                    </Typography>
                </Grid>
                <br/>
                <Grid item>
                    <Button variant='contained'>
                        <Typography variant='subtitle1'>
                            검색하기
                        </Typography>
                    </Button>
                </Grid>
            </Grid>
        </PageBox>
    )
}

export default NoBob;