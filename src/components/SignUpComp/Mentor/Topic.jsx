import * as React from 'react'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import PageBox from 'components/styled/PageBox'
import BobButton from 'components/styled/BobButton'
import {topicList} from 'constants/topics'

const Topic = (props) => {

    const progressRatio = 10

    const [disabled, setDisabled] = React.useState(
        (props.state.company==='' ? true : false)
    );
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
    console.log(view)

    const handleTopic = idx => () => {
        if (props.state.topics.filter(el => el===topicList[idx]).length > 0) {
            props.setState({
                ...props.state,
                topics: props.state.topics.filter(el => el!==topicList[idx]),
                
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
                topics: [...props.state.topics, topicList[idx]],
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
        <div>
            <PageBox sx={{p:2,display: 'flex'}}>
                <Grid container rowSpacing={2} columnSpacing={{ xs: 2, sm: 4, md: 6 }}>
                    {topicList.map((el,idx) => (
                        <Grid item xs={6} key={idx}>
                                <Button variant={view.state[idx]} onClick={handleTopic(idx)}
                                    sx={{minWidth:160, maxWidth:160,
                                        minHeight:80, maxHeigth:80,
                                        textAlign: 'center'}}
                                >
                                    <Typography variant='subtitle1' 
                                        color={view.state[idx]==='contained' ? 'white' : 'black'}
                                        sx={{fontWeight: 'fontWeightBold'}}>
                                        {el}
                                    </Typography>
                                </Button>
                        </Grid>
                    ))}
                </Grid>
            </PageBox>
            <PageBox sx={{pt: 3, display: 'flex'}}>
                <BobButton title='다 음' onClick={handleNext} disabled={disabled} />
            </PageBox>
        </div>
    )
}

export default Topic;