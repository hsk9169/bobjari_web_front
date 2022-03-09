import {useState} from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

const Introduce = (props) => {

    const [introHeight, setIntroHeight] = useState({
        open: false,
        size: 120
    })

    const toggleIntroHeight = () => {
        setIntroHeight({
            open: !introHeight.open,
            size: introHeight.open ? 120 : 300
        })
    }
    

    return (
        <Grid container direction='column' sx={{pt: 2}}>
            <Grid item sx={{p: 2}}>
                <Typography variant='h6'
                    sx={{fontWeight: 'fontWeightBold'}}
                >
                    {props.title}
                </Typography>
            </Grid>
            <Grid item 
                sx={{
                    p: 2,
                    maxHeight: introHeight.size,
                    overflow: 'hidden'
                }}
            >
                <Typography variant='subtitle1'>
                    {props.introduce}
                </Typography>
            </Grid>
            <Grid item container 
                sx={{p: 2, pt: 1, pb: 1}}>
                <Grid item>
                    <Link onClick={toggleIntroHeight}>
                        <Typography variant='subtitle1' 
                            sx={{fontWeight: 'fontWeightBold'}}>
                            {introHeight.open ? '접기' : '더 보기'}
                        </Typography>
                    </Link>
                </Grid>
                <Grid item>
                    <ArrowForwardIosIcon sx={{width: 15, height: 15}} />
                </Grid>
            </Grid>
            <Grid item sx={{pt: 2}}>
                <Divider sx={{width: '100%'}} />
            </Grid>
        </Grid>
    )
}

export default Introduce