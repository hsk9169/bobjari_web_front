import * as React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import BobButton from 'components/styled/BobButton'
import NormalButton from 'components/styled/NormalButton'
import {topicList} from 'constants/topics'

const Topic = (props) => {

    const progressRatio = 10

    const [view, setView] = React.useState({
        state: (props.state.topics.length!==0 
            ? (topicList.map(el => {
                if(props.state.topics.filter(topic => topic===el).length > 0) {
                    return 'contained';
                } else {
                    return 'outlined';
                }
            }))
            : Array.from({length: topicList.length}, () => 'outlined')
        )
    });

    const handleTopic = idx => () => {
        if (props.state.topics.filter(el => el===idx).length > 0) {
            props.setState({
                ...props.state,
                topics: props.state.topics.filter(el => el!==idx),
                
            });
            setView({
                state: (view.state.map((element,index) => {
                        if(index === idx) {
                            return 'outlined';
                        } else {
                            return element;
                        }
                    })
                )
            });
        } else {
            props.setState({
                ...props.state,
                topics: [...props.state.topics, idx],
            });
            setView({
                state: (view.state.map((element,index) => {
                        if(index === idx) {
                            return 'contained';
                        } else {
                            return element;
                        }
                    })
                )
            });
        };
    }

    const handleNext = () => {
        props.setState({
            ...props.state,
            pageNum: (props.state.pageNum < 10
                ? props.state.pageNum+1 
                : props.state.pageNum),
            progress: (props.state.progress < 100 
                ? props.state.progress+progressRatio 
                : props.state.progress),
        })
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
            <Grid item container
                sx={{
                    width: '100%',
                    pt: 4,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                {topicList.map((el,idx) => (
                    <Grid item 
                        sx={{
                            width: '50%',
                            p: 0.5,
                        }}
                    >
                        <NormalButton myColor='#f75910' 
                            variant={view.state[idx]} 
                            onClick={handleTopic(idx)}
                            sx={{
                                width: '100%',
                                height: 80,
                                backgroundColor: view.state[idx]==='contained'
                                    ? '#f75910' : '#ffffff',
                                borderColor: '#000000'
                            }}
                        >
                            <Typography variant='subtitle1' 
                                color={view.state[idx]==='contained' 
                                    ? 'white' : 'black'}
                                sx={{fontWeight: 'fontWeightBold'}}>
                                {el}
                            </Typography>
                        </NormalButton>
                    </Grid>
                ))}
            </Grid>

            <Grid item 
                sx={{
                    width: '100%',
                    pt: 4
                }}
            >
                <BobButton 
                    onClick={handleNext}
                    disabled={false}
                    title={'다 음'}
                />
            </Grid>
        </Grid>
    )
}

export default Topic;