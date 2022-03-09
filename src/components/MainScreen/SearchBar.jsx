import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper'
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = (props) => {

    return (
        <Grid container 
            sx={{
                width: '100%',
                border: 2,
                borderColor: '#f75910',
                borderRadius: 3,
                p: 1,
            }}
        >
            <Grid item
                sx={{pl: 1, width: '10%'}}
            >
                <SearchIcon 
                    sx={{
                        color: '#f75910',
                        width: 30,
                        height: 30
                    }} 
                />
            </Grid>
            <Grid item
                sx={{
                    pl: 1,
                    width: '90%',
                    display:'flex', 
                    alignItems:'center',
                }}
            >
                <Typography onClick={props.handleClickSearch}
                    variant='body1' 
                    color='text.secondary'>
                    직업인 찾아보기
                </Typography>
            </Grid>
        </Grid>
    )
}

export default SearchBar