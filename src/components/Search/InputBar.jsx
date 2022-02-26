import {useState} from 'react'
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import PageBox from 'components/styled/PageBox'
import ButtonBase from '@mui/material/ButtonBase';
import ArrowBack from '@mui/icons-material/ArrowBackIos';


const InputBar = (props) => {

    return (
        <Grid container sx={{p:1}}>
            <Grid item
                sx={{
                    width: '10%',
                    display:'flex', 
                    alignItems: 'center', 
                    justifyContent: 'flex-start',
                }}
            >
                <ButtonBase>
                    <ArrowBack color='disabled' 
                        onClick={props.onClickBack} />
                </ButtonBase> 
            </Grid>
            <Grid item sx={{width: '90%'}}>
                <Paper elevation={0}
                    sx={{
                        margin: 0.5,
                        p: 1,
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#eeeeee',
                        borderRadius: 2,
                    }}
                >
                    <Grid item container spacing={1}>
                        <Grid item>
                            <SearchIcon 
                                sx={{ 
                                    color: 'action.active', 
                                    mr: 1, my: 0.5
                                }} 
                            />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField
                                fullWidth
                                variant='standard'
                                InputProps={{ disableUnderline: true }}
                                placeholder='직업명, 직군, 회사 등'
                                value={props.searchInput}
                                onChange={props.onSearchInput}
                                onKeyPress={props.onSearchClick}
                                sx={{width:'100%'}}
                            />
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
        
    )
}

export default InputBar