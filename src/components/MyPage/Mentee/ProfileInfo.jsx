import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { grey } from '@mui/material/colors';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';

const controlText = [
    '진행 중인 밥자리',
    '찜한 밥자리',
    '이전 밥자리',
    '내가 쓴 리뷰',
    '결제 관리',
    '쿠폰함',
];

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(0),
    textAlign: 'center',
    minHeight: 80,
    color: theme.palette.text.secondary,
}));

export default function ProfileInfo(props) {

    const handleControl = idx => () => {
        console.log(controlText[idx])
    }

    const renderControlIcon = idx => {
    switch(idx) {
        case 0:
            return <MoreHorizOutlinedIcon sx={{width:40,height:40}}
            onClick={handleControl(idx)} />
        case 1:
            return <FavoriteBorderOutlinedIcon sx={{width:40,height:40}}
            onClick={handleControl(idx)} />
        case 2:
            return <ListAltOutlinedIcon sx={{width:40,height:40}}
            onClick={handleControl(idx)} />
        case 3:
            return <ChatOutlinedIcon sx={{width:40,height:40}}
            onClick={handleControl(idx)} />
        case 4:
            return <CreditCardOutlinedIcon sx={{width:40,height:40}}
            onClick={handleControl(idx)} />
        case 5:
            return <CardGiftcardOutlinedIcon sx={{width:40,height:40}}
            onClick={handleControl(idx)} />
        default:
            break;    
    }
}


    return(
        <Box component='div'
            sx={{
                margin: 2,
                maxWidth: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 6, sm: 8, md: 12 }}>
                {controlText.map((el,idx) => (
                    <Grid item xs={2} sm={4} md={4} key={idx}
                        sx={{
                            alinItems: 'center',
                                justifyContent: 'center',
                                display: 'flex'
                        }}>
                        <Item elevation={0} onClick={handleControl(idx)}
                            sx={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '100%',
                                height: '100%',
                                display: 'flex'
                            }}>
                            <Stack direction='column' 
                                sx={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                {renderControlIcon(idx)}
                                <Typography variant='body2' sx={{color: grey[900]}}>
                                    {el}
                                </Typography>
                            </Stack>
                        </Item>
                  </Grid>
                ))}
            </Grid>
        </Box>
    );
}