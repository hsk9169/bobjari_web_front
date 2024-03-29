import {useState} from 'react'
import Avatar from '@mui/material/Avatar';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Badge from "@mui/material/Badge";
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import BobButton from 'components/styled/BobButton'
import {blobToFile, compressImgFile} from 'utils/handle-imgFile'
const imageUri = require('constants/image-uri')


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


const ProfileImage = (props) => {

    const classes = useStyles();

    const [disabled, setDisabled] = useState(
        (props.state.profileImage==='' ? true : false))
    const [selectedFile, setSelectedFile] = useState({
        file: null,
        compFile: null,
        previewUrl: props.state.profileImage,
        selectUrl: props.state.imageFileUrl,
        editEnable: true,
    });
    console.log('original image',selectedFile.file)
    console.log('compressed image',selectedFile.compFile)
    
    const progressRatio = 20

    const handleNext = () => {
        props.setState({
            ...props.state,
            pageNum: (props.state.pageNum < 5
                ? props.state.pageNum+1 
                : props.state.pageNum),
            progress: (props.state.progress < 100 
                ? props.state.progress+progressRatio 
                : props.state.progress),
        })
    }


    const handleProfileImageSelect = (event) => {
        event.preventDefault();
        const prefix = event.target.value.slice(0,4);
        let fileType = 'url';
        if (selectedFile.file !== null) {
            fileType = selectedFile.file.type;
        }

        props.setState({
            ...props.state,
            profileImage: event.target.value,
            profileImageType: (prefix === 'http' ? 'url' : fileType),
        });
        setSelectedFile({
            ...selectedFile,
            previewUrl: event.target.value,
            editEnable: (prefix === 'http' ? false : true),
        })
        setDisabled((prefix==='' ? true : false));
    };

    const handleFileInput = async (event) => {
        event.preventDefault();

        let file = event.target.files[0];
        let compFile = null;

        await compressImgFile(file)
            .then(result => {
                compFile = blobToFile(result, result.name);
            })
            .catch(err => {
                console.log(err)
            })

        let reader = new FileReader();
        reader.onloadend = () => {
            setSelectedFile({
                file: file,
                compFile: compFile,
                selectUrl: reader.result,
                previewUrl: reader.result,
                editEnable: true
            });
            props.setState({
                ...props.state,
                imageFileUrl: reader.result,
                selectedFile: compFile,
            })
        }
        try {
            reader.readAsDataURL(file);
        } catch {}

    }


    return (
        <Grid item container
            direction='column'
            sx={{
                width: '100%',
                display: 'flex', 
                p: 2,
            }}
        >
            <Grid item
                sx={{
                    width: '100%',
                    pt: 4,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <form id='myForm' name='myForm'>
                    <input
                        disabled={!selectedFile.editEnable}
                        accept='image/*'
                        className={classes.input}
                        id='raised-button-file'
                        style={{ display: 'none', }}
                        type='file'
                        onChange={handleFileInput}
                    />
                    <label htmlFor='raised-button-file'>
                        <Badge
                            overlap="circular"
                            anchorOrigin={{ 
                                vertical: "top", 
                                horizontal: 'left' 
                            }}
                            badgeContent={
                                <CameraAltIcon 
                                    sx={{
                                        color: 'text.secondary', 
                                        width: 40, 
                                        height: 40
                                    }}  
                                />
                            }
                        >
                            <Avatar alt="프로필 사진" 
                                src={selectedFile.previewUrl} 
                                sx={{ 
                                    width: 130, 
                                    height: 130 
                                }} 
                            />
                        </Badge>
                    </label>
                </form>
            </Grid>

            <Grid item
                sx={{
                    width: '100%',
                    pt: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <FormControl component="fieldset" >
                    <RadioGroup row
                        aria-label="profileImage"
                        value={props.state.profileImage}
                        onChange={handleProfileImageSelect}
                        name="controlled-radio-buttons-group"
                    >
                        <FormControlLabel 
                            value={selectedFile.selectUrl} 
                            control={
                                <Radio 
                                    sx={{
                                        color: '#000000',
                                        '&.Mui-checked': {
                                            color: '#f75910',
                                        }
                                    }}
                                />
                            } 
                            label="사용" 
                        />
                        <FormControlLabel 
                            value={imageUri.BOB_CHARACTER} 
                            control={
                                <Radio 
                                    sx={{
                                        color: '#000000',
                                        '&.Mui-checked': {
                                            color: '#f75910',
                                        }
                                    }}
                                />
                            } 
                            label="미사용" 
                        />                            
                    </RadioGroup>
                </FormControl>
            </Grid>
                    

            <Grid item 
                sx={{
                    width: '100%',
                    pt: 4
                }}
            >
                <BobButton 
                    onClick={handleNext}
                    disabled={disabled}
                    title={'다 음'}
                />
            </Grid>
        </Grid>
    )
}

export default ProfileImage;