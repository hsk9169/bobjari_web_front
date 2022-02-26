import {useRef, useEffect} from 'react'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'
import ButtonBase from '@mui/material/ButtonBase';
import Divider from '@mui/material/Divider'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const TopBar = (props) => {

    const ref = useRef(null)

    useEffect(() => {
        if (ref.current !== null)
            props.setMessageVPos(ref.current.clientHeight)
    })

    return (
        <Grid container direction='column' ref={ref}
            sx={{position: 'fixed', top: 0}}>
            <Grid item container sx={{p: 2}}>
                <Grid item xs={1}>
                    <ButtonBase>
                        <ArrowBackIosIcon color='disabled' onClick={props.handleBack} />
                    </ButtonBase>
                </Grid>
                <Grid item xs={10} sx={{display: 'flex', justifyContent: 'center'}}>
                    <Typography variant='h6' sx={{fontWeight: 'fontWeightBold'}}>
                        {props.nickname}
                    </Typography>
                </Grid>
                <Grid item>
                    <MoreHorizIcon />
                </Grid>
            </Grid>
            <Grid item>
                <Divider sx={{width: '100%'}} />
            </Grid>
        </Grid>
        
    )
}

export default TopBar