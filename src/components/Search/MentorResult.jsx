import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import {SearchCard} from 'components/Cards'


const MentorResult = (props) => {

    return (
        <Grid container direction='column'
        >
            <Grid item>
                <Typography variant='caption'>
                    {props.resultText}
                </Typography>
            </Grid>
            {props.mentors.map( (el,idx) => (
                <Grid item 
                    sx={{
                        pt: 2,
                        display: 'flex',
                        width: '100%',
                    }}>
                    <SearchCard 
                        nickname={el.user.profile.nickname} 
                        profileImg={el.user.profile.image} 
                        careerInfo={el.career}
                        fee={el.details.preference.fee}
                        title={el.title}
                        onClick={() => {
                            const scrollTop = 
                                document.documentElement.scrollTop
                            props.onClickMentor(idx, scrollTop)
                        }}
                    />
                </Grid>
            ))}
            {props.pending 
            ?<Grid item 
                sx={{
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                }}
            >
                <CircularProgress sx={{color: 'text.secondary'}}/> 
            </Grid> 
            : null}
        </Grid>
    )
}

export default MentorResult