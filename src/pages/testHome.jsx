import {useState} from 'react'
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import PageBox from 'components/styled/PageBox'
import BobButton from 'components/styled/BobButton'
import {SearchCard, ProposeCard, HistoryCard} from 'components/Cards'
import Grid from '@mui/material/Grid'
import { grey } from '@mui/material/colors';

const TestHome = (props) => {
    
    const date = new Date();

    const [disabled, setDisabled] = useState(
        (false)
    )
    const [ year, setYear ] = useState(
        date.setYear(date.getFullYear() - 20)
    );
    console.log(year)

    const progressRatio = 20

    const handleNext = () => {
        props.setState({
            ...props.state,
            age: date.getFullYear() - year + 1,
            pageNum: (props.state.pageNum < 5
                ? props.state.pageNum+1 
                : props.state.pageNum),
            progress: (props.state.progress < 100 
                ? props.state.progress+progressRatio 
                : props.state.progress),
        })
    }


    return (
        <div>
            <PageBox sx={{display: 'flex',p:2}}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                        views={["year"]}
                        label="태어난 연도를 선택해주세요"
                        value={year}
                        onChange={setYear}
                    />
                </MuiPickersUtilsProvider>
            </PageBox>
            <PageBox sx={{pt: 4, display: 'flex'}}>
                <BobButton title='다 음' onClick={handleNext} disabled={disabled} />
            </PageBox>
        </div>
    )
}

export default TestHome;