import React, { useState } from 'react';

import createNickname from 'utils/create-nickname';
import StackTitleWithProgress from 'components/styled/StackTitleWithProgress';
import Nickname from 'components/SignUpComp/Nickname';
import Gender from 'components/SignUpComp/Gender';
import ProfileImage from 'components/SignUpComp/ProfileImage';
import Role from 'components/SignUpComp/Role';


const pageText = {
    title: [
        ['밥자리에서 사용할','닉네임을 설정해주세요'],
        ['성별을 선택해주세요'],
        ['프로필 사진을 등록해주세요'],
        ['회원가입 완료!','원하는 활동을 선택해주세요']
    ],
    subtitle: Array.from({length: 4}, () => []),
}

const SignUp = (props) => {

    props.setBotNav(false)

    const initialNickname = createNickname();
    const progressRatio = 25
  

    const [state, setState] = useState({
        email: (props.location.data.email ? props.location.data.email : ''),
        age: (props.location.data.age ? props.location.data.age : ''),
        gender: (props.location.data.gender ? props.location.data.gender : ''),
        nickname: (props.location.data.nickname ? props.location.data.nickname : initialNickname),
        nicknameCheck: (props.location.data.nickname ? true : null),
        selectedFile: (props.location.data.profileImage ? props.location.data.profileImage.file : null),
        imageFileUrl: (props.location.data.profileImage 
            ? (props.location.data.profileImage.contentType === 'url' ? '' : props.location.data.profileImage.data) 
            : ''),
        profileImage: (props.location.data.profileImage ? props.location.data.profileImage.data : ''),
        profileImageType: (props.location.data.profileImage ? props.location.data.profileImage.contentType : ''),
        role: (props.location.data.role ? props.location.data.role : ''),
        pageNum: 0,
        progress: progressRatio,
    })    
    console.log(state)

    const handleBack = () => {
        setState({
            ...state,
            pageNum: (state.pageNum > 0 
                ? state.pageNum-1 
                : state.pageNum),
            progress: (state.progress > progressRatio
                ? state.progress-progressRatio 
                : state.progress),
        })
    }

    const handleDone = () => {
        const data = {
            email: state.email,
            age: state.age,
            gender: state.gender,
            nickname: state.nickname,
            profileImage: {
                data: state.profileImage,
                file: state.selectedFile,
                contentType: state.profileImageType,
            },
            role: state.role,
        };

        if (state.role === 'mentee') {
            props.history.push({
                pathname: '/signup/mentee',
                data: data,
            })
        } else if (state.role === 'mentor') {
            props.history.push({
                pathname: '/signup/mentor',
                data: data,
            })
        }
    }

    const RenderBody = () => {
        switch (state.pageNum) {
            case 0:
                return (<Nickname state={state} setState={setState} />)
            case 1:
                return (<Gender state={state} setState={setState} />)
            case 2:
                return (<ProfileImage state={state} setState={setState} />)
            case 3:
                return (<Role state={state} setState={setState} onClick={handleDone} />)
            default:
                break;
        }
    }

    return (
        <div>
        <StackTitleWithProgress 
            title={pageText.title[state.pageNum]}
            subtitle={pageText.subtitle[state.pageNum]}
            progress={state.progress} 
            onClickBack={handleBack}
        />
        
        {RenderBody()}
        

        </div>
    )
}

export default SignUp;