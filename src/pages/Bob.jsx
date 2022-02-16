
import {useState} from 'react';
import PageBox from 'components/styled/PageBox'
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Badge from '@mui/material/Badge';

import {CurrentBob, LikeBob, HistoryBob} from 'components/Bob'

const Bob = ({context}) => {

    context.setBotNav(true)

    const [tabNum, setTabNum] = useState(0)

    const handleChange = (event, newVal) => {
        setTabNum(newVal)
    }

    const renderList = () => {
        switch (tabNum) {
            case 0:
                return <CurrentBob />
            case 1:
                return <LikeBob />
            case 2:
                return <HistoryBob />
            default:
                break;
        }
    }

    return (
        <div>
            <PageBox sx={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'flex-start',
                    p: 2,
                    pt: 10,
                }}
            >
                <Typography variant='h4' sx={{fontWeight: 'fontWeightBold'}}>
                    밥자리들
                </Typography>
            </PageBox>
            <PageBox sx={{display: 'flex', width: '100%'}}>
                <Tabs 
                    value={tabNum} 
                    onChange={handleChange}
                    textColor='inherit'
                    indicatorColor='secondary'
                    variant='fullWidth'
                    sx={{width: '100%'}}
                >
                    <Tab label={
                        <Badge color="secondary" variant="dot" invisible={tabNum===0 ? true : false}>
                            <Typography variant='subtitle1' sx={{fontWeight: 'fontWeightBold'}}>
                                나의 밥자리
                            </Typography>
                        </Badge>
                        } 
                    />
                    <Tab label={
                        <Badge color="secondary" badgeContent={12}>
                            <Typography variant='subtitle1' sx={{fontWeight: 'fontWeightBold'}}>
                                찜한 밥자리
                            </Typography>
                        </Badge>
                        } 
                    />
                    <Tab label={
                        <Typography variant='subtitle1' sx={{fontWeight: 'fontWeightBold'}}>
                            이전 밥자리
                        </Typography>
                        } 
                    />
                </Tabs>
            </PageBox>
            {(renderList())}
        </div>
    )
}

export default Bob;