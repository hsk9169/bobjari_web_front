import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Chip from '@mui/material/Chip';
import PageBox from 'components/styled/PageBox'
const topics = require('constants/topics')

const Topic = (props) => {

    return (
        <Grid container 
            direction='column' sx={{pt: 1}}>
            <Grid item container 
                direction='column' sx={{p:2}}
            >
                <Grid item>
                    <Typography variant='h6'
                        sx={{fontWeight: 'fontWeightBold'}}
                    >
                        토픽
                    </Typography>
                </Grid>
                <Grid item container 
                    spacing={1} sx={{pt: 1}}>
                    {props.topic.map(el => (
                        <Grid item>
                            <PageBox sx={{
                                display: 'flex', 
                                borderRadius: 8,
                                color: '#f57c00',
                                border: 2,
                                p: 1
                            }}>
                                <Typography variant='body1'
                                    sx={{fontWeight: 'fontWeightBold'}}>
                                    {topics.topicList[el]}
                                </Typography>
                            </PageBox>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
            
            <Grid item sx={{pt: 1}}>
                <Divider sx={{width: '100%'}} />
            </Grid>
        </Grid>
    )
}

export default Topic