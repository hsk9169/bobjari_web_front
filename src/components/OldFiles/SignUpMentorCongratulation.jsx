import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { EmojiProvider, Emoji } from 'react-apple-emojis';
import emojiData from 'react-apple-emojis/lib/data.json';



const SignUpMentorCongratulation = (props) => {
 
    console.log(props.location.data);

    


    return (
        <div>
            
        <Box sx={{
            pt: 1,
            pb: 1,
            margin: 2,
            maxWidth: 400,
            height: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Stack direction='column' spacing={5}>
                <Box sx={{
                    maxWidth: 400, 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'}}
                >
                    <EmojiProvider data={emojiData}>
                        <Emoji name="party-popper" width={80} height={80} />
                        <Emoji name="party-popper" width={80} height={80} />
                        <Emoji name="party-popper" width={80} height={80} />
                    </EmojiProvider>
                </Box>
                <Typography variant='h4' sx={{ fontWeight: 'fontWeightBold' }}>
                    가입을 축하드립니다!
                </Typography>
            </Stack>
        </Box>
        
        
    </div>
  );
}


export default SignUpMentorCongratulation;


