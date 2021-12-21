import { TransitionGroup } from 'react-transition-group';
import Collapse from '@mui/material/Collapse'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import DeleteIcon from '@mui/icons-material/Delete';

import PageBox from './PageBox'

const RemovableList = (props) => {

    return (
        <PageBox sx={{width:'100%'}}>
                <TransitionGroup>
                    {props.list.map((el) => (
                        <Collapse key={el} >
                            <Stack direction='row' spacing={2} sx={{margin:1}}>
                                <Button variant='outlined' 
                                    endIcon={
                                        <DeleteIcon
                                            onClick={props.handleDelete(el)}
                                            color='error'
                                        />
                                    }   
                                    sx={{width: '100%', height: 40}}>
                                    <Grid container direction='column' spacing={0}>
                                        <Grid item>
                                            <Typography variant='subtitle1'
                                                sx={{ 
                                                    color: 'black',
                                                    fontWeight: 'fontWeightBold',
                                                }}
                                            >
                                                {el}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Button>
                            </Stack>       
                        </Collapse>
                    ))}
                </TransitionGroup>
        </PageBox>
    )
}

export default RemovableList;