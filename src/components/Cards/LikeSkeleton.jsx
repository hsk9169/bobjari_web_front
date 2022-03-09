import {useState} from 'react'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

const LikeSkeleton = () => {
    
    const [array,setArray] = useState(new Array(3).fill(''))
    return (
        <Paper elevation={0} sx={{display: 'flex', pt:2, pb:2}}>
            <Grid container sx={{display: 'flex', justifyContent: 'center'}}>
                <Grid item xs={2.4}>
                    <Skeleton variant='circular' animation='wave'
                        width={65} height={65}
                    />
                </Grid>
                <Grid item xs={9} container direction='column'>
                    {array.map((el,idx) => (
                        <Grid item sx={{width: `${90-idx*10}%`}}>
                            <Skeleton animation='wave' />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Paper>
    )
}

export default LikeSkeleton    