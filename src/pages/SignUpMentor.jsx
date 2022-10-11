import React, { useState } from 'react';
import StackTitleWithProgress from '../components/styled/StackTitleWithProgress';
import {Job, Company, Topic, Schedule, Location, CareerAuth, 
        Fee, HashTag, Introduce, Years} from 'components/SignUpComp/Mentor'
import Grid from '@mui/material/Grid'
import {pageText} from 'constants/mentor-signup-titles'
import { saveJWT } from 'utils/handle-jwt';
import { useDispatch, useSelector } from "react-redux";
import { addSession } from "slices/session";
import { selectBasePath } from 'slices/basePath'
const axios = require('axios');


const SignUpMentor = ({context, location, history}) => {

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
    const basePath = useSelector(selectBasePath)   

    const handleJoin = (event) => {
        event.preventDefault();

        let formData = new FormData();
        
        const req = {
            phone: location.data.phone,
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

        console.log('req data', req);

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

        axios.post(basePath.path + process.env.REACT_APP_API_USER_JOIN,
            formData, { headers: {
                'Content-Type': 'multipart/form-data'
                }
            }
        )
            .then(res => {
                dispatch(addSession(res.data))
                const retPhone = res.data.profile.phone;
                if (retPhone === location.data.phone) {
                    axios.get(basePath.path + process.env.REACT_APP_API_GET_TOKEN, 
                        { params: {
                            phone: retPhone,
                            }
                        })
                        .then(res => {
                            const tokens = res.data.token;
                            saveJWT(tokens)
                            history.push({
                                pathname: '/main',
                                data: {
                                    phone: location.data.phone,
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
                phone: location.data.phone,
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
        <Grid container
            direction='column'
            sx={{width: '100%'}}
        >
            <Grid item container>
                <StackTitleWithProgress 
                    title={pageText.title[state.pageNum]}
                    subtitle={pageText.subtitle[state.pageNum]}
                    progress={state.progress} 
                    onClickBack={handleBack}
                />
            </Grid>
            
            <Grid item container>
                {RenderBody()}
            </Grid>
        </Grid>
    );
}

export default SignUpMentor;