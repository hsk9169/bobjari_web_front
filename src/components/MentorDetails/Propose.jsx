import {useRef, useEffect} from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const Propose = (props) => {

    const ref = useRef()

    useEffect(() => {
        if (ref.current !== null)
            props.setBottomHeight(ref.current.clientHeight)
    })

    return (
        <>
        
        <Grid container 
            ref={ref}
            style={{zIndex: 1500}}
            sx={{
                width: '100%',
                height: 100,
                position: 'fixed',
                bottom: 0,
                backgroundColor: '#ffffff',
                borderTop: 1,
                borderColor: 'text.secondary',
                borderTopLeftRadius: '20px 20px',
                borderTopRightRadius: '20px 20px'
            }}
        >
            <Grid item 
                sx={{
                    p: 1,
                    width: props.session !== null && 
                            props.session.role !== 'mentor'
                            ? '60%' : '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',    
                }}
            >
                {props.fee.select === 0
                ?
                    <Grid item container 
                        sx={{display: 'flex', 
                            alignItems: 'flex-end',
                            justifyContent: 'center'
                    }}>
                        <Grid item>
                            <Typography variant='h5'
                                sx={{fontWeight: 'fontWeightBold'}}
                            >
                                {props.fee.value}원
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant='subtitle1'
                                sx={{color: 'text.secondary'}}>
                                {'/1시간'}
                            </Typography>
                        </Grid>
                    </Grid>
                :   
                    <Typography variant='h6'
                        sx={{fontWeight: 'fontWeightBold'}}
                    >
                        {props.fee.select===1 ? 
                        '식사 대접으로 충분해요!' : 
                        props.fee.select===2 ?
                        '커피 대접으로 충분해요!' :
                        '-'}
                    </Typography>
                }
            </Grid>
            {props.session !== null && 
            props.session.role !== 'mentor'
            ?
            <Grid item 
                sx={{
                    width: '40%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Button variant='contained'
                    onClick={props.onClickPropose}
                    sx={{
                        backgroundColor: '#f57c00'
                    }}
                >
                    <Typography variant='h6'
                        sx={{fontWeight: 'fontWeightBold'}}>
                        밥자리 신청
                    </Typography>
                </Button>
            </Grid>
            : null}
        </Grid>
        </>
    )
}

export default Propose