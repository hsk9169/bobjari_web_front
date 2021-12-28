import React, { useState } from 'react';
import StackTitleWithProgress from '../components/styled/StackTitleWithProgress';

import Job from '../components/SignUpComp/Mentor/Job'
import Company from '../components/SignUpComp/Mentor/Company'
import Topic from '../components/SignUpComp/Mentor/Topic'
import Schedule from '../components/SignUpComp/Mentor/Schedule'
import Location from '../components/SignUpComp/Mentor/Location'
import CareerAuth from '../components/SignUpComp/Mentor/CareerAuth'
import Fee from '../components/SignUpComp/Mentor/Fee'
import HashTag from '../components/SignUpComp/Mentor/HashTag'
import Introduce from '../components/SignUpComp/Mentor/Introduce'
import PageBox from '../components/styled/PageBox';
import {pageText} from '../constants/mentor-signup-titles'

const axios = require('axios');


const SignUpMentor = (props) => {

    props.setBotNav(false)
    
    const progressRatio = 11;
    
    const [state, setState] = useState({
        job: [],
        company: [],
        topics: [],
        schedules: [],
        schedList: [],
        cafes: [],
        authSelect: null,
        authFile: null,
        isAuth: false,
        feeSelect: null,
        fee: '',
        hashtag: '',
        introduce: '',
        pageNum: 0,
        progress: progressRatio,
    })
    console.log(state)

    const handleJoin = (event) => {
        event.preventDefault();

        let formData = new FormData();
        
        const req = {
            email: props.location.data.email,
            age: props.location.data.age,
            gender: props.location.data.gender,
            nickname: props.location.data.nickname,
            role: props.location.data.role,
            job: state.job,
            company: state.company,
            topics: state.topics,
            authSelect: state.authSelect,
            isAuth: state.isAuth,
            introduce: state.introduce,
            schedules: state.schedules,
            cafes: state.cafes,
            feeSelect: state.feeSelect,
            fee: state.fee,
        }

        if (props.location.data.profileImage.contentType === 'url') {
            formData.append(
                'img', 
                JSON.stringify(props.location.data.profileImage.data),
            );
        } else {
            formData.append(
                'img', 
                props.location.data.profileImage.file,
            );
        }
        try {
            formData.append(
                'auth', 
                state.authFile,
            )
        } catch {}
        
        for (let [key, value] of Object.entries(req)) {
            console.log(key, JSON.stringify(value))
            formData.append(key, JSON.stringify(value));
        }

        axios.post(process.env.REACT_APP_API_MENTOR_JOIN,
            formData, { headers: {
                'Content-Type': 'multipart/form-data'
                }
            }
        )
            .then(res => {
                const retEmail = res.data;
                if (retEmail === props.location.data.email) {
                    console.log('request getting token');
                    axios.get(process.env.REACT_APP_API_GET_TOKEN, 
                        { params: {
                            email: retEmail,
                            }
                        })
                        .then(res => {
                            const token = res.data.token;
                            localStorage.setItem("accessToken", token.accessToken);
                            localStorage.setItem("refreshToken", token.refreshToken);
                            props.history.push({
                                pathname: '/service',
                                data: {
                                    email: props.location.data.email,
                                }
                            });
                        })
                        .catch(err => {
                            console.log(err);
                        })
                } else {
                }
                    
                
            })
            .catch(err => {
                console.log(err);
            });        
    };  


    const handleBack = () => {
        
        if (state.pageNum === 0) {
            const data = {
                email: props.location.data.email,
                age: props.location.data.age,
                gender: props.location.data.gender,
                nickname: props.location.data.nickname,
                profileImage: props.location.data.profileImage,
                role: props.location.data.role,    
            };
            props.history.push({
                pathname: '/signup',
                data: data
            })
        } else if (state.pageNum > 0) {
            setState({
                ...state,
                pageNum: (state.pageNum-1),
                progress: (state.progress-progressRatio),
            })
        }
        
    }

    const RenderBody = () => {
        switch (state.pageNum) {
            case 0:
                return (<Job state={state} setState={setState} />)
            case 1:
                return (<Company state={state} setState={setState} />)
            case 2:
                return (<Topic state={state} setState={setState} />)
            case 3:
                return (<Schedule state={state} setState={setState} />)    
            case 4:
                return (<Location state={state} setState={setState} />)
            case 5:
                return (<CareerAuth state={state} setState={setState} />)
            case 6:
                return (<Fee state={state} setState={setState} />)
            case 7:
                return (<HashTag state={state} setState={setState} />)
            case 8:
                return (<Introduce state={state} setState={setState}
                            clickJoin={handleJoin} />)
            default:
                break;
        }
    }


    return (
        <PageBox sx={{overflow:'auto'}}>
            <StackTitleWithProgress 
                title={pageText.title[state.pageNum]}
                subtitle={pageText.subtitle[state.pageNum]}
                progress={state.progress} 
                onClickBack={handleBack}
            />
        
            {RenderBody()}
        
        </PageBox>
        
    );
}

export default SignUpMentor;