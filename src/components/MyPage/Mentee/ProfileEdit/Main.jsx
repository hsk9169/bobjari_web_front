import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Badge from "@mui/material/Badge";
import Divider from "@mui/material/Divider";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CssBaseline from '@mui/material/CssBaseline';
import { styled } from '@mui/material/styles';
import { Global } from '@emotion/react';
import { grey, blue } from '@mui/material/colors';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import PageBox from 'components/styled/PageBox'
import StackTitle from 'components/styled/StackTitle'
import ItemListPaper from 'components/styled/ItemListPaper';
import {NicknameEdit, InterestEdit, GenderEdit, EmailEdit, PhoneEdit} from 'components/MyPage/Mentee'
import {useSelector} from 'react-redux'
import {selectSessions} from 'slices/session';
const axios = require('axios');

const Root = styled('div')(({ theme }) => ({
    height: '100%',
    backgroundColor:
    theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

const ProfileEdit = ({context, history, drawerWindow}) => {

    const session = useSelector(selectSessions)[1].session

    // Drawer
    const drawerBleeding = 56;
    const [open, setOpen] = useState(false);
    const [drawerComp, setDrawerComp] = useState('')

    // Swipeable Modal Contents
    const container = drawerWindow !== undefined 
        ? () => window.document.body 
        : undefined;

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const [info, setInfo] = useState({
        imgUrl: (session.profileImg.contentType==='url' 
            ? session.profileImg.data
            : `data:${session.profileImg.contentType};base64,${session.profileImg.data}`),
        imgType: session.profileImg.contentType,
        imgFile: null,
        nickname: session.userInfo.nickname,
        interest: session.interests[0],
        gender: (session.userInfo.gender==='male' ? '남성' : '여성'),
        email: session.userInfo.email,
        phone: '010-1234-5678',
    });

    const handleBack = () => {
        history.push('/mypage')
    }

    const handleSelect = tag => () => {
        setDrawerComp(tag)
        setOpen(true)
    }

    const handleDone = () => {
        setOpen(false)
    }

    const handleFileInput = (event) => {
        event.preventDefault();

        let file = event.target.files[0];
        let reader = new FileReader();
        reader.onloadend = () => {
            setInfo({
                ...info,
                imgFile: file,
                imgUrl: reader.result,
                imgType: file.type,
            });
        }
        try {
            reader.readAsDataURL(file);
        } catch {}
    }

    const RenderComponent = () => {
        switch (drawerComp) {
            case 'nickname':
                return (
                    <NicknameEdit nickname={info.nickname}/>
                )
            case 'interest':
                return (
                    <InterestEdit interest={info.interest}/>
                )
            case 'gender':
                return (
                    <GenderEdit gender={info.gender}/>
                )
            case 'email':
                return (
                    <EmailEdit/>
                )
            case 'phone':
                return (
                    <PhoneEdit/>
                )
            default:
                break;
        }
    }

    return (
        <div>
        <PageBox sx={{overflow: 'hidden'}}>
            <StackTitle title={['프로필 수정']} subtitle={[]}
                onClickBack={handleBack} />
            <PageBox sx={{p: 2, display: 'flex'}}>
                <form id='myForm' name='myForm'>
                    <input
                        accept='image/*'
                        id='raised-button-file'
                        style={{ display: 'none', }}
                        type='file'
                        onChange={handleFileInput}
                    />
                    <label htmlFor='raised-button-file'>
                        <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: "bottom", horizontal: "middle" }}
                            badgeContent={
                              <CameraAltIcon sx={{color: 'text.secondary', width: 40, height: 40}}  />
                            }
                        >
                            <Avatar alt="프로필 사진" src={info.imgUrl} 
                                sx={{ width: 130, height: 130 }} />
                        </Badge>
                    </label>
                </form>
            </PageBox>
            <PageBox sx={{pt: 2, display: 'flex', p:2}}>
                <Stack direction='column' spacing={2} sx={{width: '100%'}}>
                        <ItemListPaper
                            title='닉네임'
                            body={info.nickname}
                            onClick={handleSelect('nickname')}
                        />
                        <Divider variant='fullWidth' />
                        <ItemListPaper
                            title='관심분야'
                            body={info.interest}
                            onClick={handleSelect('interest')}
                        />
                        <Divider variant='fullWidth' />
                        <ItemListPaper
                            title='성별'
                            body={info.gender}
                            onClick={handleSelect('gender')}
                        />
                        <Divider variant='fullWidth' />
                        <ItemListPaper
                            title='이메일'
                            body={info.email}
                            onClick={handleSelect('email')}
                        />
                        <Divider variant='fullWidth' />
                        <ItemListPaper
                            title='전화번호'
                            body={info.phone}
                            onClick={handleSelect('phone')}
                        />
                </Stack>
            </PageBox>
        </PageBox>
        <PageBox sx={{pb:7, }} />

        <Root>
            <CssBaseline />
                <Global
                    styles={{
                        '.MuiDrawer-root > .MuiPaper-root': {
                          height: '95%',
                          overflow: 'visible',
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
                    ModalProps={{
                        keepMounted: true,
                    }}
                >
                    <PageBox sx={{
                        display: 'flex', p:3, justifyContent:'flex-end'}}>
                        <ButtonBase onClick={handleDone}>
                            <Typography variant='h6' 
                                sx={{ 
                                    fontWeight: 'fontWeightMedium',
                                    color: blue[500] 
                                }}
                            >
                                닫기
                            </Typography>
                        </ButtonBase>
                    </PageBox>
                    <PageBox sx={{pt: 4}}>
                        {RenderComponent()}
                    </PageBox>
                </SwipeableDrawer>
            </Root>
        </div>
    )
}

export default ProfileEdit;




      