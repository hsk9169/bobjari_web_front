import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Badge from "@mui/material/Badge";
import Divider from "@mui/material/Divider";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { styled } from "@mui/material/styles";


import PageBox from '../../../styled/PageBox'
import StackTitleWithDone from '../../../styled/StackTitleWithDone'
import ItemListPaper from '../../../styled/ItemListPaper';


const ProfileCardEdit = (props) => {

    const list = [
        {이름:'꿈나무개발자'},
        {직업:'서버 개발자'},
        {회사:'밥자리'},
        {성별:'남성'},
        {휴대폰인증:'010-1234-5678'},
        {이메일:'bobjari_admin@gmail.com'}
    ]
    const [state, setState] = React.useState({
        imgUrl: 'https://w.namu.la/s/28027c57126faed6ad2426677a122ac53864e9fca93d64442af454a4bb397c3ac6467f258f151f0bb19b3c8b91609ae7cc8ab888a9b235670622ef1cb1fbc6df56bfd6011ccdef1401fb8ce52739c8e9fc85a22f858fdfd891e8b8522d4647c4',
        userInfo: {
            nickname: '꿈나무개발자',
            career: '서버 개발자',
            company: '밥자리',
            gender: '남성',
            phone: '010-1234-5678',
            email: 'bobjari_admin@gmail.com'
        },
    });

    const handleDone= () => {
        console.log('done')
        
    }

    const handleBack = () => {
        console.log('back')
    }

    const handleSelect = idx => () => {
        console.log(idx)
    }

    return (
        <PageBox>
            <StackTitleWithDone title='프로필 수정'
                onClickDone={handleDone} onClickBack={handleBack} />
            <PageBox sx={{p: 2, display: 'flex'}}>
                <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "middle" }}
                    badgeContent={
                      <CameraAltIcon sx={{color: 'text.secondary', width: 40, height: 40}}  />
                    }
                >
                    <Avatar alt="프로필 사진" src={state.imgUrl} 
                        sx={{ width: 130, height: 130 }} />
                </Badge>
            </PageBox>
            <PageBox sx={{pt: 2, display: 'flex'}}>
                <Stack direction='column' spacing={1}
                    sx={{
                        width: '90%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {list.map((val,idx) => (
                        <PageBox sx={{width:'90%'}}>
                            <ItemListPaper title={Object.keys(val)} body={Object.values(val)} onClick={handleSelect(idx)}/>
                            <Divider variant='fullWidth'/>
                        </PageBox>
                    ))}
                    
                </Stack>
            </PageBox>
        </PageBox>

    )
}

export default ProfileCardEdit;




      