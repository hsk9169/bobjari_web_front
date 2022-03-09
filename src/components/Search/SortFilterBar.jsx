import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const SortFilterBar = (props) => {

    const filterOptions = ['연차', '토픽', '감사비', '성별', '지역']

    return (
        <Grid container direction='column'>
            <Grid item
                sx={{
                    display:'flex', 
                    alignItems: 'center', 
                    justifyContent: 'flex-start'
                }}
            >
                <Button
                    onClick={props.onClickSort} 
                    endIcon={
                        <KeyboardArrowDownIcon
                            width={100}
                            sx={{color: 'black'}}
                        />
                    }
                    sx={{border: 0}}
                >
                    <Typography variant='h6'
                        sx={{
                            color: 'black',
                            fontWeight: 'fontWeightBold'
                        }}
                    >
                        추천순
                    </Typography>
                </Button>
            </Grid>
            <Grid item container spacing={0.5}>
                {filterOptions.map((el,idx) => (
                    <Grid item>
                        <Button variant={props.filterSel[idx] 
                                        ? 'contained' : 'outlined'}
                            onClick={() => {
                                props.onClickFilter()
                                props.setFilterSel(props.filterSel.map((element,index) => {
                                    if (index === idx) return !element
                                    else return element
                                }))
                            }}>
                            <Typography variant='button'>
                                {el}
                            </Typography>
                        </Button>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    )
}

export default SortFilterBar