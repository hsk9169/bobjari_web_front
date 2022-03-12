import {useState} from 'react'
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@mui/material/Grid';
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
                <MuiPickersUtilsProvider 
                    utils={DateFnsUtils}
                >
                    <DatePicker
                        views={["year"]}
                        label="연도 선택"
                        value={year}
                        onChange={setYear}
                    />
                </MuiPickersUtilsProvider>
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

export default Age;