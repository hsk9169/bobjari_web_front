import {useState, useRef} from 'react'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import {LocationCard} from 'components/Cards'
import { styled } from '@mui/material/styles';
import { Global } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Drawer from '@mui/material/Drawer';
import CancelIcon from '@mui/icons-material/Cancel';
import ButtonBase from '@mui/material/ButtonBase';
import TitleBar from './TitleBar'

const Root = styled('div')(({ theme }) => ({
    height: '100%',
    backgroundColor:
    theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

const options = {
    center: new window.kakao.maps.LatLng(37.57746484601798, 126.97806054670292),
    level: 2,
};

const Location = (props) => {
        
    const height = window.innerHeight

    const mapContainer = useRef(null);

    // Drawer
    const [open, setOpen] = useState(false)
    
    const [selected, setSelected] = useState(props.locationCheck)
    const [curSelect, setCurSelect] = useState(null)

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen)
    }

    const handleClick = (location, idx) => () => {
        setCurSelect(idx)
        const map = new window.kakao.maps.Map(mapContainer.current, options);
        const marker = new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(location.geolocation.y, location.geolocation.x), 
            clickable: true,
        });
        marker.setMap(map);
        map.setCenter(new window.kakao.maps.LatLng(
            location.geolocation.y, 
            location.geolocation.x));
        setOpen(true)
    }

    const handleSelect = () => {
        if (!selected.includes(curSelect)) 
            setSelected([...selected, curSelect])
        setOpen(false)
    }

    const handleNext = () => {
        props.setLocationCheck(selected)
        props.onClickNext()
    }

    return (
        <>
        <Grid container
            direction='column'
            sx={{
                width: '100%',
                height: height,
                backgroundColor: '#000000'
            }}
        >
            <Grid item>
                <TitleBar
                    onClickBack={props.onClickBack}
                    onClickClose={props.onClickClose}
                    title={[
                        '직업인에게 제안할',
                        '장소를 선택하세요.'
                    ]}
                />
            </Grid>
            <Grid item container
                direction='column'
                sx={{
                    height: height * 0.8,
                    borderTopLeftRadius: '30px',
                    borderTopRightRadius: '30px',
                    position: 'absolute',
                    bottom: 0,
                    p: 1,
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Grid item container
                    sx={{
                        width: '100%',
                        pt: 8,
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    {props.location.map((el,idx) => (
                        <Grid item 
                            onClick={handleClick(el,idx)}
                            sx={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                p: 1, 
                            }}
                        >
                            <LocationCard
                                borderColor={selected.includes(idx)
                                            ? '#000000' : '#e0e0e0'}
                                place={el.place_name}
                                address={el.address_name}
                            />
                        </Grid>
                    ))}
                </Grid>
                <Grid item 
                    sx={{
                        width: '100%',
                        position: 'absolute',
                        bottom: height * 0.15,
                        display: 'flex',
                        justifyContent: 'center',
                        p: 2,
                    }}>
                    <Button variant='contained'
                        onClick={handleNext}
                        sx={{
                            backgroundColor: '#000000',
                            width: '100%',
                            height: 50,
                            borderRadius: 2,
                        }}
                    >
                        <Typography variant='body1'
                            sx={{fontWeight: 'fontWeightBold'}}
                        >
                            다음
                        </Typography>
                    </Button>
                </Grid>
            </Grid>
        </Grid>


        <Root>
            <CssBaseline />
                <Global
                    styles={{
                        '.MuiDrawer-root > .MuiPaper-root': {
                          height: '90%',
                          overflow: 'hidden',
                        },
                        '.MuiDrawer-paper': {
                            borderTopLeftRadius: 24,
                            borderTopRightRadius: 24,
                        }
                    }}
                />
                <Drawer
                    anchor="bottom"
                    open={open}
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{overflow: 'auto',}}
                > 
                    <Grid container
                        direction='column'
                        sx={{
                            width: '100%',
                            height: height
                        }}
                    >
                        <Grid item container
                            ref={mapContainer}
                            sx={{
                                height: height * 0.7,
                                widht: '100%',
                                display: 'flex',
                                alignItems: 'flex-start'
                            }}
                        >
                            <Grid item
                                sx={{
                                    p: 2,
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'flex-end'
                                }}
                            >
                                <ButtonBase>
                                    <CancelIcon
                                        style={{zIndex: 1500}}
                                        sx={{
                                            width: '30px',
                                            height: '30px',
                                            color: '#000000'
                                        }}
                                        onClick={toggleDrawer(false)}
                                    />
                                </ButtonBase>
                            </Grid>
                        </Grid> 

                        <Grid item container
                            direction='column'
                            sx={{
                                width: '100%',
                                p: 2,
                            }}
                        >
                            <Grid item
                                sx={{width: '100%'}}
                            >
                                <Typography variant='h6'
                                    sx={{fontWeight: 'fontWeightBold'}}
                                >
                                    {curSelect !== null
                                    ? props.location[curSelect].place_name
                                    : null}
                                </Typography>
                            </Grid>
                            <Grid item
                                sx={{width: '100%'}}
                            >
                                <Typography variant='body1'
                                    sx={{color: '#9e9e9e'}}
                                >
                                    {curSelect !== null
                                    ? props.location[curSelect].address_name
                                    : null}
                                </Typography>
                            </Grid>
                            <Grid item sx={{pt: 2}}>
                                <Button 
                                    variant='contained'
                                    onClick={handleSelect}
                                    sx={{
                                        width: '100%',
                                        height: 50,
                                        backgroundColor: '#000000',
                                        borderRadius: 2,
                                    }} 
                                >
                                    <Typography variant='h6'
                                        sx={{
                                            color: '#ffffff',
                                            fontWeight: 'fontWeightBold'
                                        }}
                                    >
                                        확인
                                    </Typography>
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Drawer>
        </Root>
        </>
    )
}

export default Location