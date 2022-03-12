import Grid from '@mui/material/Grid'
import ArrowBack from '@mui/icons-material/ArrowBackIos';
import CancelIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography'
import ButtonBase from '@mui/material/ButtonBase';
import Divider from '@mui/material/Divider'

const TopBar = (props) => {

    return (
        <Grid container
            direction='column'
            style={{zIndex: 1500}}
            sx={{
                position: 'fixed',
                top: 0,
                width: '100%',
                backgroundColor: '#ffffff'
            }}
        >
            <Grid item container
                sx={{
                    p: 2, 
                    width: '100%',
                }}
            >
                <Grid item
                    sx={{
                        width: '20%',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center'
                    }}
                >
                    <ButtonBase>
                        <ArrowBack 
                            sx={{color: 'disabled'}}
                            onClick={props.onClickBack} 
                        />
                    </ButtonBase>
                </Grid>
                <Grid item
                    sx={{
                        width: '60%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Typography variant='h6'
                        sx={{fontWeight: 'fontWeightBold'}}
                    >
                        밥자리 신청 확인
                    </Typography>
                </Grid>
                <Grid item
                    sx={{
                        width: '20%',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center'
                    }}
                >
                    <ButtonBase>
                        <CancelIcon 
                            onClick={props.onClickClose}
                            sx={{
                                width: '30px',
                                height: '30px',
                                color: '#000000'
                            }}
                        />
                    </ButtonBase>
                </Grid>
            </Grid>
            <Grid item sx={{width: '100%'}}>
                <Divider />
            </Grid>
        </Grid>
    )
}

export default TopBar