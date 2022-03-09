import {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import PageBox from 'components/styled/PageBox'
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { withStyles } from "@material-ui/core/styles";

import {Chat, Like, Calendar} from 'components/Bob'
import {selectSessions} from 'slices/session'
import {selectManage, updateBobTab} from 'slices/manage'

const BobTabs = styled(Tabs)({
    borderBottom: '1px solid #e8e8e8',
    '& .MuiTabs-indicator': {
      backgroundColor: '#f75910',
    },
});

const styles = theme => ({
    customBadge: {
        backgroundColor: '#f75910',
        color: 'white',
    }
})

const Bob = (props) => {

    const { classes } = props

    const dispatch = useDispatch()
    const session = useSelector(selectSessions)[1].session
    const manage = useSelector(selectManage)

    const [tabNum, setTabNum] = useState(manage.bobTab)

    const handleChange = (event, newVal) => {
        setTabNum(newVal)
        dispatch(updateBobTab(newVal))
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
            <Typography variant='h4' 
                sx={{fontWeight: 'fontWeightBold'}}>
                밥자리
            </Typography>
        </PageBox>
        <PageBox sx={{display: 'flex', width: '100%'}}>
            <BobTabs 
                value={tabNum} 
                onChange={handleChange}
                textColor='inherit'
                variant='fullWidth'
                sx={{width: '100%'}}
            >
                <Tab label={
                    <Badge variant="dot" 
                        classes={{ badge: classes.customBadge }}
                        invisible={tabNum===0 ? true : false}
                    >
                        <Typography variant='subtitle1' sx={{fontWeight: 'fontWeightBold'}}>
                            나의 밥자리
                        </Typography>
                    </Badge>
                    } 
                />
                <Tab label={
                    <Badge badgeContent={12}
                        classes={{ badge: classes.customBadge }}
                    >
                        <Typography variant='subtitle1' sx={{fontWeight: 'fontWeightBold'}}>
                            {session.role === 'mentee' ? '찜한 밥자리' : '밥자리 달력'}
                        </Typography>
                    </Badge>
                    } 
                />
            </BobTabs>
        </PageBox>

        {(renderList())}
        
        </div>
    )
    
}

export default withStyles(styles)(Bob);