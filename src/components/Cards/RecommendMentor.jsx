import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Avatar from '@mui/material/Avatar';

const RecommendMentor = (props) => {

    const width = window.innerWidth
    const height = window.innerHeight

    return (
        <Paper elevation={3}
            sx={{
                width: width * 0.4,
                height: height * 0.1,
                borderRadius: 2,
                backgroundColor: '#f5f5f5',
                p: 1,
                display: 'flex',
                alignItems: 'center'
            }}
        >
            <Grid item container
                spacing={2.5}
                sx={{
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <Grid item sx={{width: '40%'}}>
                    <Avatar alt='프로필 사진'
                        src={props.image.contentType==='url'
                            ? props.image.data
                            : `data:${props.image.contentType};base64,${props.image.data}`
                        }
                        sx={{ width: 55, height: 55}} 
                    />
                </Grid>
                <Grid item 
                    sx={{width: '60%'}}
                >
                    <div style={{
                        overflow: 'hidden',
                        //textOverflow: 'ellipsis',
                        lineHeight: '110%'
                    }}>
                        <b style={{
                            fontSize: '15px',
                            color: '#f75910'
                        }}>
                            {props.job}
                        </b>
                        <br/>
                        <b style={{
                            fontSize: '13px',
                            color: '#000000'
                        }}>
                            {props.company}
                        </b>
                        <br/>
                        <span style={{
                            fontSize: '12px',
                            color: '#9e9e9e'
                        }}>
                            {props.nickname}
                        </span>
                    </div>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default RecommendMentor