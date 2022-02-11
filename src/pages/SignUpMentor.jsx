import React, { useState } from 'react';
import StackTitleWithProgress from '../components/styled/StackTitleWithProgress';
import {Job, Company, Topic, Schedule, Location, CareerAuth, 
        Fee, HashTag, Introduce, Years} from 'components/SignUpComp/Mentor'
import PageBox from 'components/styled/PageBox';
import {pageText} from 'constants/mentor-signup-titles'
import { saveJWT } from 'utils/handle-jwt';
import { useDispatch } from "react-redux";
import { addSession } from "slices/session";
const axios = require('axios');


const SignUpMentor = ({context, location, history}) => {

    context.setBotNav(false)
    
    const progressRatio = 10;
    
    const [state, setState] = useState({
        job: '',
        company: '',
        years: null,
        topics: [],
        schedules: [],
        schedList: [],
        cafes: [],
        authSelect: null,
        authFile: null,
        isAuth: false,
        feeSelect: null,
        fee: '',
        title: '',
        introduce: '',
        pageNum: 0,
        progress: progressRatio,
    })
    const dispatch = useDispatch();

    const handleJoin = (event) => {
        event.preventDefault();

        let formData = new FormData();
        
        const req = {
            email: location.data.email,
            age: location.data.age,
            gender: location.data.gender,
            nickname: location.data.nickname,
            role: location.data.role,
            job: state.job,
            company: state.company,
            years: state.years,
            topics: state.topics,
            authSelect: state.authSelect,
            isAuth: state.isAuth,
            title: state.title,
            introduce: state.introduce,
            schedules: state.schedules,
            cafes: state.cafes,
            feeSelect: state.feeSelect,
            fee: state.fee,
        }

        if (location.data.profileImage.contentType === 'url') {
            formData.append(
                'img', 
                JSON.stringify(location.data.profileImage.data),
            );
        } else {
            formData.append(
                'img', 
                location.data.profileImage.file,
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

        axios.post(process.env.REACT_APP_API_USER_JOIN,
            formData, { headers: {
                'Content-Type': 'multipart/form-data'
                }
            }
        )
            .then(res => {
                dispatch(addSession(res.data))
                const retEmail = res.data.profile.email;
                if (retEmail === location.data.email) {
                    axios.get(process.env.REACT_APP_API_GET_TOKEN, 
                        { params: {
                            email: retEmail,
                            }
                        })
                        .then(res => {
                            const tokens = res.data.token;
                            saveJWT(tokens)
                            history.push({
                                pathname: '/main',
                                data: {
                                    email: location.data.email,
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
                email: location.data.email,
                age: location.data.age,
                gender: location.data.gender,
                nickname: location.data.nickname,
                profileImage: location.data.profileImage,
                role: location.data.role,    
            };
            history.push({
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
                return (<Years state={state} setState={setState} />)
            case 3:
                return (<Topic state={state} setState={setState} />)
            case 4:
                return (<Schedule state={state} setState={setState} />)    
            case 5:
                return (<Location state={state} setState={setState} />)
            case 6:
                return (<CareerAuth state={state} setState={setState} />)
            case 7:
                return (<Fee state={state} setState={setState} />)
            case 8:
                return (<HashTag state={state} setState={setState} />)
            case 9:
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