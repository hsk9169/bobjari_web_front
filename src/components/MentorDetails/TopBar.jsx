import {useRef, useEffect} from 'react'
import ArrowBack from '@mui/icons-material/ArrowBackIos';
import ButtonBase from '@mui/material/ButtonBase';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider'
import ShareIcon from '@mui/icons-material/IosShare';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CircularProgress from '@mui/material/CircularProgress';


const TopBar = (props) => {

    const ref = useRef(null)
    
    useEffect(() => {
        if (ref.current !== null)
            props.setTopBarHeight(ref.current.clientHeight)
    })

    return (
        <Grid container 
            style={{zIndex: 1500}}
            direction='column' ref={ref}
            sx={{
                position: 'fixed', 
                top: 0, 
                backgroundColor: '#ffffff'
            }}
        >
            <Grid item container sx={{p: 2}}>
                <Grid item container
                    sx={{
                        width: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                    }}
                >
                    <ButtonBase>
                        <ArrowBack color='disabled' 
                            onClick={props.onClickBack} />
                    </ButtonBase>
                </Grid>
                <Grid item container
                    sx={{
                        width: '50%',
                        display:'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                    }}
                >
                    <Grid item sx={{pr: 3}}>
                        <ButtonBase>
                            <ShareIcon 
                                onClick={props.onClickShare}
                                sx={{width: 30, height: 30}}
                            />
                        </ButtonBase>
                    </Grid>
                    {props.session !== null && 
                    props.session.role !== 'mentor'
                    ?
                    <Grid item>
                        <ButtonBase>
                            {props.like === null
                            ? <CircularProgress 
                                color='inherit'
                                size={30} />
                            : props.like 
                                ? <FavoriteIcon
                                    onClick={props.onClickLike}
                                    sx={{width: 30, height: 30, color: '#b71c1c'}} />
                                : <FavoriteBorderIcon 
                                    onClick={props.onClickLike}
                                    sx={{width: 30, height: 30}} />
                            }
                        </ButtonBase>
                    </Grid>
                    : null}
                </Grid>
            </Grid>
            <Grid item>
                <Divider sx={{width: '100%'}} />
            </Grid>
        </Grid>
    )
}

export default TopBar