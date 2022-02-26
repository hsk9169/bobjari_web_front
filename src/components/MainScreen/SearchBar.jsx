import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper'
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = (props) => {

    return (
        <Grid container direction='column' spacing={4}>
            <Grid item>
                <Typography variant='h4' sx={{fontWeight: 'fontWeightBold'}}>
                    천리길도<br/>밥자리부터
                </Typography>
            </Grid>
            <Grid item>
                <Paper elevation={1}
                    sx={{
                        margin: 0.5,
                        p: 1,
                        width: 'inherit',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Grid container spacing={1}>
                        <Grid item>
                            <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5}} />
                        </Grid>
                        <Grid item xs={10} sx={{display:'flex', alignItems:'center'}}>
                            <Typography onClick={props.handleClickSearch}
                                variant='body1' 
                                color='text.secondary'>
                                다른 직업인 둘러보기
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default SearchBar