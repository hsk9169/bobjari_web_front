import {useState} from 'react'
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import PageBox from 'components/styled/PageBox'
import BobButton from 'components/styled/BobButton'

const Age = (props) => {

    const currentDate = new Date();
    const initialDate = new Date();

    const [ year, setYear ] = useState(
        props.state.age==='' 
            ? () => {
                initialDate.setYear(currentDate.getFullYear() - 20) 
                return initialDate
            }
            : () => {
                initialDate.setYear(currentDate.getFullYear() - props.state.age) 
                return initialDate
            }
    );
    console.log(year)

    const progressRatio = 20

    const handleNext = () => {
        props.setState({
            ...props.state,
            age: currentDate.getFullYear() - year.getFullYear() + 1,
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
            <PageBox sx={{display: 'flex', pt: 4}}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                        views={["year"]}
                        label="연도 선택"
                        value={year}
                        onChange={setYear}
                        sx={{width: '100%', border: '1px dashed'}}
                    />
                </MuiPickersUtilsProvider>
            </PageBox>
            <PageBox sx={{pt: 4, display: 'flex'}}>
                <BobButton title='다 음' onClick={handleNext} />
            </PageBox>
        </div>
    )
}

export default Age;