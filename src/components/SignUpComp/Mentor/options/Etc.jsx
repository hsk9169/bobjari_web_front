import {useState} from 'react';
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import {grey, green} from '@mui/material/colors'
import AddPhotoIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import { makeStyles } from '@mui/styles';
import PageBox       from 'components/styled/PageBox'
import TitleWithDone from 'components/styled/TitleWithDone'

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 45,
        width: 300,
        padding: '0 30px',
    },
});

const Etc = (props) => {

    const classes = useStyles();

    const [state, setState] = useState({
        borderColor: grey[300],
    })

    const handleFileInput = (event) => {
        event.preventDefault();

        let file = event.target.files[0];
        let reader = new FileReader();
        reader.onloadend = () => {
            setState({
                borderColor: green[500],
            });
            props.setState({
                ...props.state,
                inputFile: file,
            })
        }
        try {
            reader.readAsDataURL(file);
        } catch {}
    }

    return (
        <div>
        <TitleWithDone 
            title={props.title} 
            subtitle={props.subtitle}
            onClickDone={props.onClickDone}    
        />
        <PageBox
            sx={{
                margin: 4,
                display: 'flex',
                justifyContent: 'left',
            }}
        >
            <Stack direction='column' spacing={2} sx={{width: '100%'}}>
                <Typography variant='h6' sx={{ fontWeight: 'fontWeightBold' }}>
                    앨범에서 파일 업로드
                </Typography>
                <PageBox variant='outlined' 
                    sx={{ 
                        display:'flex',
                        border: '3px dashed', 
                        borderColor: state.borderColor,
                        width: '50%',
                        height: 150,
                    }} 
                >
                    <form id='myForm' name='myForm'>
                        <input
                            accept='image/*'
                            className={classes.input}
                            id='raised-button-file'
                            style={{ display: 'none', }}
                            type='file'
                            onChange={handleFileInput}
                        />
                        <label htmlFor='raised-button-file'>
                            <AddPhotoIcon sx={{width:50,height:50}} />
                        </label>
                    </form>
                </PageBox>
            </Stack>
            
        </PageBox>
        </div>
    )
}

export default Etc;