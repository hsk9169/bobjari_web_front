import {useState} from 'react'
import {useSelector} from 'react-redux'
import PageBox from 'components/styled/PageBox'
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

import {Chat, Like, Calendar} from 'components/Bob'
import {selectSessions} from 'slices/session'

const Bob = () => {

    const session = useSelector(selectSessions)[1].session

    const [tabNum, setTabNum] = useState(0)

    const handleChange = (event, newVal) => {
        setTabNum(newVal)
    }

    const renderList = () => {
        switch (tabNum) {
            case 0:
                return <Chat />
            case 1:
                return (session.role === 'mentee'
                    ? <Like /> : <Calendar />)
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
                pt: 5,
            }}
        >
            <Typography variant='h4' sx={{fontWeight: 'fontWeightBold'}}>
                밥자리
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
                            {session.role === 'mentee' ? '찜한 밥자리' : '밥자리 달력'}
                        </Typography>
                    </Badge>
                    } 
                />
            </Tabs>
        </PageBox>

        {(renderList())}
        
        </div>
    )
    
}

export default Bob;