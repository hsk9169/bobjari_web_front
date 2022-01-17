import React, { useState } from 'react';
import createNickname from 'utils/create-nickname';
import StackTitleWithProgress from 'components/styled/StackTitleWithProgress';
import {Nickname, Gender, ProfileImage, Role, Age} from 'components/SignUpComp';

const pageText = {
    title: [
        ['밥자리에서 사용할','닉네임을 설정해주세요'],
        ['성별을 선택해주세요'],
        ['태어난 연도를 선택해주세요'],
        ['프로필 사진을 등록해주세요'],
        ['회원가입 완료!','원하는 활동을 선택해주세요']
    ],
    subtitle: Array.from({length: 5}, () => []),
}

const SignUp = ({context, location, history}) => {

    context.setBotNav(false)

    const initialNickname = createNickname();
    const progressRatio = 20
  

    const [state, setState] = useState({
        email: (location.data.email ? location.data.email : ''),
        age: (location.data.age ? location.data.age : ''),
        gender: (location.data.gender 
            ? location.data.gender : ''),
        nickname: (location.data.nickname 
            ? location.data.nickname : initialNickname),
        nicknameCheck: (location.data.nickname ? true : null),
        selectedFile: (location.data.profileImage 
            ? location.data.profileImage.file : null),
        imageFileUrl: (location.data.profileImage 
            ? (location.data.profileImage.contentType === 'url' 
                ? '' : location.data.profileImage.data) 
            : ''),
        profileImage: (location.data.profileImage 
            ? location.data.profileImage.data : ''),
        profileImageType: (location.data.profileImage 
            ? location.data.profileImage.contentType : ''),
        role: (location.data.role ? location.data.role : ''),
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
            history.push({
                pathname: '/signup/mentee',
                data: data,
            })
        } else if (state.role === 'mentor') {
            history.push({
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
                return (<Age state={state} setState={setState} />)
            case 3:
                return (<ProfileImage state={state} setState={setState} />)
            case 4:
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