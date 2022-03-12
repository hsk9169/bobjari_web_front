import * as React from 'react'
import Stack from '@mui/material/Stack';
import ButtonBase from '@mui/material/ButtonBase';
import Button from '@mui/material/Button';
import AddBoxIcon from '@mui/icons-material/AddBoxOutlined';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Drawer from '@mui/material/Drawer';
import { TransitionGroup } from 'react-transition-group';
import Collapse from '@mui/material/Collapse'
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import InputBase from '@mui/material/InputBase'
import Typography from '@mui/material/Typography'
import NormalButton from 'components/styled/NormalButton'
import BobButton from 'components/styled/BobButton'

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


const Location = (props) => {

    const progressRatio = 10
    const height = window.innerHeight

    const [temp, setTemp] = React.useState({
        keyword: '',
        locations: [],
        prevSelect: null,
        cafe: null,
    })

    // Drawer
    const { drawerWindow } = props;
    const [open, setOpen] = React.useState(false);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const mapContainer = React.useRef(null);
    const [mapState, setMapState] = React.useState({
        map: null,
        ps: null,
        searchOk: null,
    }) //지도를 담을 영역의 DOM 레퍼런스
    const [listUp, setListUp] = React.useState(false);
    const [markers, setMarkers] = React.useState([]);
    const listRef = React.useRef([]);

    const placesSearchCB = (data, status, pagination) => {
        if (status === mapState.searchOk) {
            setTemp({
                ...temp,
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
                addMarker(data[i]);
                bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
            }
            mapState.map.setBounds(bounds);
            
        } else {console.log('keyword search failed',status)}
    }

    const addMarker = (place) => {
        
        // 마커를 생성합니다
        const marker = new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(place.y, place.x), 
            clickable: true,
        });
        marker.setMap(mapState.map);
        setMarkers(markers => [...markers, marker]);
    }

    const removeMarker = (i) => {
        markers[i].setMap(null);
        setMarkers(markers => [...markers.filter((marker,idx) => i !== idx)]);
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
        setTemp({
            ...temp,
            keyword: event.target.value,
        })
    }

    const handleEnter = value => {
        if (value.replace(/ /g,'').length > 0) {
            mapState.ps.keywordSearch(temp.keyword, placesSearchCB,
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

    const handleNext = () => {
        props.setState({
            ...props.state,
            pageNum: (props.state.pageNum < 10
                ? props.state.pageNum+1 
                : props.state.pageNum),
            progress: (props.state.progress < 100 
                ? props.state.progress+progressRatio 
                : props.state.progress),
        })
    }

    const handlePaper = idx => () => {
        mapState.map.setCenter(new window.kakao.maps.LatLng(props.state.locations[idx].y, 
                                                            props.state.locations[idx].x));
        if (temp.prevSelect !== null) {
            removeMarker(temp.prevSelect);
            addMarker(props.locations[temp.prevSelect]);
        }
        props.setState({
            ...props.state,
            prevSelect: idx,
        })
        removeMarker(idx);
        addMarker(props.state.locations[idx]);
    }

    const handleClick = () => {
        setListUp(false);
    }

    const handleSelect = idx => () => {
        const cafe = {
            place_name: temp.locations[idx].place_name,
            address_name: temp.locations[idx].address_name,
            road_address_name: temp.locations[idx].road_address_name,
            category_group_name: temp.locations[idx].category_group_name,
            content_id: temp.locations[idx].id,
            place_url: temp.locations[idx].place_url,
            phone: temp.locations[idx].phone,
            geolocation: {
                x: temp.locations[idx].x,
                y: temp.locations[idx].y,
                distance: '',
            }
        };
        props.setState({
            ...props.state,
            cafes: [...props.state.cafes, cafe]
        })
        setOpen(false);
        setListUp(false);
    }

    const handleDelete = index => () => {
        props.setState({
            ...props.state,
            cafes: [...props.state.cafes.filter((el,idx) =>
                        idx !== index)]
        })
    }


    const handleDialogClose = () => {
        setDialogOpen(false);
    }

    // Swipeable Modal Contents
    const container = drawerWindow !== undefined 
        ? () => window.document.body 
        : undefined;



    return (
        <>
        <Grid item container
            direction='column'
            sx={{
                width: '100%',
                display: 'flex', 
                p: 2,
            }}
        >
            <Grid item
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-start',
                }}
            >
                <ButtonBase>
                    <AddBoxIcon 
                        onClick={toggleDrawer(true)}
                        sx={{
                            color:'text.secondary', 
                            width: 50, 
                            height: 50
                        }}
                    />
                </ButtonBase>                
            </Grid>
                
 
            <Grid item container 
                sx={{
                    width: '100%',
                    p:3,
                    display:'flex',
                    justifyContent: 'center'
                }}
            >        
                <TransitionGroup>
                    {props.state.cafes.map((el,idx) => (
                        <Collapse key={idx} >
                            <Stack direction='row' spacing={2} sx={{margin:1}}>
                                <Button variant='outlined' 
                                    endIcon={
                                        <DeleteIcon
                                            onClick={handleDelete(idx)}
                                            color='error'
                                        />
                                    } 
                                    sx={{width: '100%', height: 60}}
                                >
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
                                            <Typography variant='subtitle1'
                                                sx={{ 
                                                    color: 'black',
                                                    fontWeight: 'fontWeightMedium',
                                                }}
                                            >
                                                {el.address_name}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Button>
                            </Stack>       
                        </Collapse>
                    ))}
                </TransitionGroup>
            </Grid>

            <Grid item 
                sx={{
                    width: '100%',
                    pt: 4
                }}
            >
                <BobButton 
                    onClick={handleNext}
                    disabled={false}
                    title={'다 음'}
                />
            </Grid>
        </Grid>


        <Root>
            <CssBaseline />
                <Global
                    styles={{
                        '.MuiDrawer-root > .MuiPaper-root': {
                          height: '80%',
                          overflow: 'hidden',
                        },
                        '.MuiDrawer-paper': {
                            borderTopLeftRadius: 24,
                            borderTopRightRadius: 24,
                        }
                    }}
                />
                <Drawer
                    container={container}
                    anchor="bottom"
                    open={open}
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{overflow: 'auto'}}
                > 
                    <Box
                        ref={mapContainer}
                        sx={{
                            width: '100%',
                            height: height,
                            overflow: 'auto',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Box sx={{
                            width: '100%',
                            maxHeight: 20,
                            pt: 10,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            }}
                        >
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
                                    value={temp.keyword}
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
                                    width: '100%',
                                    minHeight: 300,
                                    maxHeight: 300,
                                    display: 'flex',
                                    overflow: 'auto',
                                    border: 1,
                                    borderColor: 'grey.500',
                                    position: 'absolute',
                                    bottom: 0,
                                }}
                            >
                                <Stack direction='column'>                                
                                    {temp.locations.map((location,idx) => (
                                        <Grid item >
                                            <Paper ref={el => listRef.current.push(el)}
                                                sx={{
                                                    p:2, margin: 'auto', 
                                                    minWidth: 375, maxWidht: 400, 
                                                }}>
                                                <Grid container alignItems='center'>
                                                    <Grid items xs>
                                                        <Grid container direction='column' spacing={1}>
                                                            <Typography variant='subtitle'
                                                                sx={{
                                                                    color: '#000000',
                                                                    fontWeight: 'fontWeightBold'
                                                                }}
                                                            >
                                                                {location.place_name}
                                                            </Typography>
                                                            <Typography variant='body2' color='grey'>
                                                                {location.road_address_name}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item>
                                                        <NormalButton 
                                                            myColor='#f75910'
                                                            variant='contained'
                                                            onClick={handleSelect(idx)}
                                                            sx={{
                                                                backgroundColor: '#f75910'
                                                            }}>
                                                            장소 선택
                                                        </NormalButton>
                                                    </Grid>
                                                </Grid>
                                            </Paper>
                                        </Grid>
                                    ))}
                                </Stack> 
                            </Box>
                        : null}
                    </Box>
                </Drawer>
            </Root>
        </>
    )
}

export default Location;