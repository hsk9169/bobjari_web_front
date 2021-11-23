import React, { useState, useEffect, useRef } from 'react';
import { addSession } from '../actions/index';
import { connect } from 'react-redux';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ButtonBase from '@mui/material/ButtonBase';
import LinearProgress from '@mui/material/LinearProgress';
import { red, grey } from '@mui/material/colors';
import CssBaseline from '@mui/material/CssBaseline';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Global } from '@emotion/react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';



const mapDispatchToProps = dispatch => {
    return {
        addSession: session => dispatch(addSession(session)),
    };
};

const mapStateToProps = state => {
    return {
        api: state.api,
    };
};

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 45,
        width: 300,
        padding: '0 30px',
    },
});


const drawerBleeding = 56;
const Root = styled('div')(({ theme }) => ({
    height: '100%',
    backgroundColor:
    theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

const options = {
    //지도를 생성할 때 필요한 기본 옵션
    center: new window.kakao.maps.LatLng(37.57746484601798, 126.97806054670292), //지도의 중심좌표.
    level: 4, //지도의 레벨(확대, 축소 정도)
};

const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png', // 마커이미지의 주소입니다    
        imageSize = new window.kakao.maps.Size(44, 49),
        imageOverSize = new window.kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
        imageOption = {offset: new window.kakao.maps.Point(20, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
        
// 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
const markerOverImage = new window.kakao.maps.MarkerImage(imageSrc, imageOverSize, imageOption);


const SignUpMentorLocationComp = (props) => {
    
    const classes = useStyles();

    const [state, setState] = useState({
        initialized: false,
        locations: [],
        keyword: '',
        prevSelect: null,
        cafes: [],
        cafe: null,
        progress: props.location.data.progress,
        progressRatio: props.location.data.progressRatio,
    });
    const mapContainer = useRef(null);
    const [mapState, setMapState] = useState({
        map: null,
        ps: null,
        searchOk: null,
    }) //지도를 담을 영역의 DOM 레퍼런스
    const [listUp, setListUp] = useState(false);
    const [markers, setMarkers] = useState([]);
    const listRef = useRef([]);

    const placesSearchCB = (data, status, pagination) => {
        if (status === mapState.searchOk) {
            setState({
                ...state,
                locations: data,
            })
            setListUp(true);
            const bounds = new window.kakao.maps.LatLngBounds();
            if (markers.length > 0) {
                for (let i=0; i<markers.length; i++){
                    removeMarker(i);
                }
            }
            for (let i=0; i<data.length; i++) {
                addMarker(data[i], markerImage);
                bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
            }
            mapState.map.setBounds(bounds);
            
        } else {console.log('keyword search failed',status)}
    }

    const addMarker = (place, image) => {
        
        // 마커를 생성합니다
        const marker = new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(place.y, place.x), 
            clickable: true,
            image: image // 마커이미지 설정 
        });
        marker.setMap(mapState.map);
        setMarkers(markers => [...markers, marker]);
    }

    const removeMarker = (i) => {
        markers[i].setMap(null);
        setMarkers(markers => [...markers.filter((marker,idx) => i !== idx)]);
    }


    // Drawer
    const { drawerWindow } = props;
    const [open, setOpen] = React.useState(false);

    const handleNext = event => {
        props.history.push({
            pathname: '/signup/mentor/auth',
            data: {
                email: props.location.data.email,
                age: props.location.data.age,
                gender: props.location.data.gender,
                nickname: props.location.data.nickname,
                profileImage: props.location.data.profileImage,
                role: props.location.data.role,
                jobs: props.location.data.jobs,
                companys: props.location.data.companys,
                topics: props.location.data.topics,
                schedules: props.location.data.schedules,
                cafes: state.cafes,
                progress: state.progress + state.progressRatio,
                progressRatio: state.progressRatio,
            }
        })
    }

    const handleBack = event => {
        props.history.replace({
            pathname: '/signup/mentor/schedule',
            data: {
                email: props.location.data.email,
                age: props.location.data.age,
                gender: props.location.data.gender,
                nickname: props.location.data.nickname,
                profileImage: props.location.data.profileImage,
                role: props.location.data.role,
                jobs: props.location.data.jobs,
                companys: props.location.data.companys,
                topics: props.location.data.topics,
                schedules: props.location.data.schedules,
                progress: state.progress - state.progressRatio,
                progressRatio: state.progressRatio,
            }
        })
    }

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
        const map = new window.kakao.maps.Map(mapContainer.current, options);
        
        setMapState({
            map: map,
            ps: new window.kakao.maps.services.Places(),
            searchOk: window.kakao.maps.services.Status.OK,
        })
    };

    const handleChange = event => {
        setState({
            ...state,
            keyword: event.target.value,
        })
    }

    const handleEnter = value => {
        if (value.replace(/ /g,'').length > 0) {
            mapState.ps.keywordSearch(state.keyword, placesSearchCB,
                                    {radius: 2000, size: 15, page: 3});
        }
    }

    const handlePress = event => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleEnter(event.target.value);
            return false;
       } else { return true;}
    } 

    const handlePaper = idx => () => {
        mapState.map.setCenter(new window.kakao.maps.LatLng(state.locations[idx].y, 
                                                            state.locations[idx].x));
        if (state.prevSelect !== null) {
            removeMarker(state.prevSelect);
            addMarker(state.locations[state.prevSelect], markerImage);
        }
        setState({
            ...state,
            prevSelect: idx,
        })
        removeMarker(idx);
        addMarker(state.locations[idx], markerOverImage);
    }

    const handleClick = () => {
        setListUp(false);
    }

    const handleSelect = idx => () => {
        setState({
            ...state,
            cafes: [...state.cafes, state.locations[idx]]
        })
        setOpen(false);
        setListUp(false);
    }

    const handleDelete = cafe => event => {
        setState({
            ...state,
            cafes: [...state.cafes.filter((el) =>
                            el !== cafe)]
        })
    }

    // Swipeable Modal Contents
    const container = drawerWindow !== undefined ? () => window.document.body : undefined;

    useEffect( () => {
        if (!state.initialized) {
            if (props.location.data.cafes !== undefined) {
                setState({
                    initialized: true,
                    cafes: props.location.data.cafes,
                    progress: props.location.data.progress,
                    progressRatio: props.location.data.progressRatio,
                });
            }
        } else {console.log('no prop data')}

    },[state, props]);


    // Kakao Map
    

    return (
        <div className='parent'>
            
        <Box sx={{
            pt: 1,
            pb: 1,
            margin: 2,
            maxWidth: 400,
            height: 50,
            display: 'flex',
        }}>
            <ButtonBase>
                <ArrowBackIosIcon color='disabled' onClick={handleBack} />
            </ButtonBase>
        </Box>
        <Box
            sx={{
                pt: 1,
                pb: 1,
                margin: 2,
                maxWidth: 400,
                overflow: 'auto',
                display: 'flex',
            }}
        >
            <Typography variant='h5' sx={{ fontWeight: 'fontWeightBold' }}>
                밥자리 희망장소를 등록해주세요
            </Typography>
        </Box>
        <Box sx={{ width: '100%' }}>
            <LinearProgress variant="determinate" value={state.progress}
                sx={{ color: red[300] }} />
        </Box>
        <Box
            sx={{
                pt: 4,
                margin: 2,
                maxWidth: 400,
                overflow: 'auto',
                display: 'flex',
                justifyContent: 'center'
            }}
        >
            <Button variant='contained' onClick={toggleDrawer(true)}>
                장소 선택
            </Button>
        </Box>
        <Box
            sx={{
                pt: 4,
                margin: 2,
                maxWidth: 400,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Stack direction='column' spacing={3}>
                {state.cafes.map((el,index) => (
                        <Box sx={{
                            alignContents: 'center',
                            justifyContent: 'center',
                            }}
                        >
                            <Stack direction='row' spacing={2}>
                                <ButtonBase>
                                    <RemoveCircleIcon onClick={handleDelete(el)}
                                        sx={{width:30, height:30}}
                                        color='error'/>
                                </ButtonBase>
                                <Button variant='outlined' sx={{width: 250, height: 70}}>
                                    <Grid container direction='column' spacing={0}>
                                        <Grid item>
                                            <Typography variant='subtitle1'
                                                sx={{ 
                                                    color: 'black',
                                                    fontWeight: 'fontWeightBold',
                                                }}
                                            >
                                                {el.place_name}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant='caption text'
                                                sx={{ 
                                                    color: 'text.secondary',
                                                    fontWeight: 'fontWeightMedium',
                                                }}
                                            >
                                                {el.address_name}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Button>
                            </Stack>                   
                    </Box>
                ))}
            </Stack>
        </Box>
        
        <Box sx={{ 
            display: 'flex',
            pt: 10,
            margin: 2,
            justifyContent: 'center', 
            maxWidth: 400,
            overflow: 'auto',
        }}>
            <Button className={classes.root} disabled={state.cafes.length===0} onClick={handleNext} 
                sx={{justifyContent: 'center'}}
            >
                <Typography variant='h6'>
                    다 음
                </Typography>
            </Button>
        </Box>

        <Root>
            <CssBaseline />
            <Global
                styles={{
                    '.MuiDrawer-root > .MuiPaper-root': {
                      height: '95%',
                      overflow: 'hidden',
                    },
                    '.MuiDrawer-paper': {
                        borderTopLeftRadius: 24,
                        borderTopRightRadius: 24,
                    }
                }}
            />

            
            <SwipeableDrawer
                container={container}
                anchor="bottom"
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                swipeAreaWidth={drawerBleeding}
                disableSwipeToOpen={true}
                disableBackdropTransition={true}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{overflow: 'auto',}}
            >
                <Box
                    ref={mapContainer}
                    sx={{
                        maxWidth: 400,
                        minHeight: 770,
                        overflow: 'auto',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Box sx={{
                        maxWidth: 400,
                        maxHeight: 20,
                        pt: 10,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Paper
                            component="form"
                            style={{zIndex:1500}}
                            sx={{ 
                                p: '2px 4px', 
                                display: 'flex', 
                                alignItems: 'center', 
                                width: 300,
                                borderRadius: 5,
                            }}
                        >
                            <IconButton sx={{ p: '10px' }} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                            <InputBase
                                autoComplete
                                type='text'
                                value={state.keyword}
                                onChange={handleChange}
                                onKeyPress={handlePress}
                                onClick={handleClick}
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="식당, 카페를 검색해보세요"
                            />
                        </Paper>
                    </Box>
                    {listUp ? 
                        <Box
                            bgcolor='white'
                            component='div' 
                            style={{zIndex: 1500}} 
                            sx={{
                                minWidth:'100%',
                                maxWidth:400,
                                minHeight: 300,
                                maxHeight: 300,
                                display: 'flex',
                                justifyContent: 'center',
                                overflow: 'auto',
                                border: 1,
                                borderColor: 'grey.500',
                                position: 'absolute',
                                bottom: 0,
                            }}
                        >
                            <Stack direction='column'>                                
                            {state.locations.map((location,idx) => (
                                    <Grid item >
                                        <Paper ref={el => listRef.current.push(el)}
                                            sx={{
                                                p:2, margin: 'auto', 
                                                minWidth: 375, maxWidht: 400, 
                                            }}>
                                            <Grid container alignItems='center'>
                                                <Grid items xs>
                                                    <Grid container direction='column' spacing={1}>
                                                        <Typography variant='subtitle' color='blue'>
                                                            {location.place_name}
                                                        </Typography>
                                                        <Typography variant='body2' color='grey'>
                                                            {location.road_address_name}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid item>
                                                    <Button variant='contained'
                                                        onClick={handleSelect(idx)}>
                                                        장소 선택
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                ))}
                            </Stack> 
                        </Box>
                    : null}
                </Box>
                
                
            </SwipeableDrawer>

        </Root>
        
        
    </div>
  );
}

const SignUpMentorLocation = connect(mapStateToProps, mapDispatchToProps)(SignUpMentorLocationComp);

export default SignUpMentorLocation;


