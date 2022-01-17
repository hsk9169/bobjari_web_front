import {useState} from 'react';
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Stack'
import Grid from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { EmojiProvider, Emoji } from 'react-apple-emojis';
import emojiData from 'react-apple-emojis/lib/data.json';
import PageBox from 'components/styled/PageBox'
import StackTitle from 'components/styled/StackTitle'
const authInfo = require('constants/kakao-auth');

const SignIn = ({context, history}) => {

    context.setBotNav(false)

    const redirectUri = () => {
        let baseUri = authInfo.BASE_URI;
        baseUri = baseUri.concat('client_id=', authInfo.CLIENT_ID, '&');
        baseUri = baseUri.concat('client_secret=', authInfo.SECRET_KEY, '&');
        baseUri = baseUri.concat('redirect_uri=', authInfo.CALLBACK_URI, '&');
        baseUri = baseUri.concat('response_type=', 'code');
        return baseUri;
    }

    const kakaoButtonHandler = async () => {
        window.location.assign(redirectUri());
    }

    const bobjariSignInButtonHandler = () => {
        history.push('/signin/bob');
    }

    const handleBackButton = () => {
        history.push('/main')
    }

    return (
        <PageBox sx={{border: 1, display: 'flex', width: '100%', height: 400}}>
            <Stack direction='column' spacing={1}>
                    <div>
                        <img src=
                            {require('../contents/kakao_login_medium_wide.png').default} 
                            alt="카카오 로그인 버튼"
                            inClick={() => {
                                kakaoButtonHandler();
                            }}
                        />
                    </div>
                    <Button variant='contained'>aslidjf</Button>
            </Stack>
        </PageBox>
    )
}

export default SignIn;