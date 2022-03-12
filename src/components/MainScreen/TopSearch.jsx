import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'

const TopSearch = (props) => {

    const height = window.innerHeight

    return (
        <Box sx={{
            width: '100%',
            height: height * 0.05,
            display: 'flex',
            justifyContent: 'flex-end'
        }}>
            {props.role === 'mentor' ?
                <ButtonBase>
                    <SearchIcon 
                        onClick={props.handleClickSearch}
                        sx={{
                            color: 'disabled',
                            width: 30,
                            height: 30
                        }} 
                    />
                </ButtonBase>
            : null}
        </Box>
    )
}

export default TopSearch