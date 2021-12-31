import * as React from 'react'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import PageBox from 'components/styled/PageBox'
import BobButton from 'components/styled/BobButton'

const topicList = [
    '직업 이점',
    '직업 고충',
    '하루 일과',
    '직업선택 이유',
    '자소서/면접',
    '회사 정보',
    '커리어 계획',
    '직업 비전',
    '마인드셋',
    '라이프 스타일',
];

const Topic = (props) => {

    const progressRatio = 11

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
            pageNum: (props.state.pageNum < 9 
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