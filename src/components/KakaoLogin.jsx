import React, { useEffect, useState } from 'react';
import { addSession } from '../actions/index';
import { connect } from 'react-redux';
import { v1 as uuid } from 'uuid';
const axios = require('axios');
const authInfo = require('../constants/kakao-auth');

const mapDispatchToProps = dispatch => {
    return {
        addSession: session => dispatch(addSession(session)),
    };
};

const KakaoLoginComp = props => {


    const id = uuid();

    useEffect(() => {
        props.addSession({ id,  });

    }, [id, props]);

    return (
        <div>
            <h1>Kakao Login</h1>
        </div>
    );
}

const KakaoLogin = connect(null, mapDispatchToProps)(KakaoLoginComp);

export default KakaoLogin;