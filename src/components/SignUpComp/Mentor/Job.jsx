import * as React from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Search from '@mui/icons-material/Search';
import PageBox from '../../styled/PageBox'
import BobButton from '../../styled/BobButton'
import RemovableList from '../../styled/RemovableList';

import {jobs} from '../../../constants/job-corp-name'


const Job = (props) => {

    const progressRatio = 11

    const [disabled, setDisabled] = React.useState(
        (props.state.job==='' ? true : false)
    )

    const handleAddJob = event => {
        let job;
        if (event.target.innerText &&
            props.state.job.indexOf(event.target.innerText) === -1) {
            job = event.target.innerText;
            props.setState({
                ...props.state,
                job: [...props.state.job, job],
            });
        } else if (event.target.value &&
            event.target.value.replace(/ /g,'').length > 0) {
            job = event.target.value;
            props.setState({
                ...props.state,
                job: [...props.state.job, job],
            });
        }
    }

    const handleDeleteJob = select => event => {
        props.setState({
            ...props.state,
            job: [...props.state.job.filter((el) => 
                    el !== select)]
        })
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
            <PageBox sx={{display: 'flex',p:2}}>
                <Autocomplete
                    id="jobSelect"
                    options={jobs}
                    freeSolo
                    selectOnFocus
                    clearOnBlur
                    onChange={handleAddJob}
                    renderInput={(params) => (
                        <PageBox sx={{ 
                            display: 'flex', 
                            alignItems: 'flex-end',
                            overflow: 'auto'
                        }}>
                            <Search sx={{ color: 'action.active', mr: 1, my: 0.5}} />
                            <TextField
                                {...params}
                                variant="standard"
                                label="직업명 검색"
                                sx={{
                                    width:'inherit'
                                }}
                            />
                        </PageBox>
                    )}
                    sx={{width: '100%'}}
                />
            </PageBox>
            <PageBox sx={{p:3,display: 'flex'}}>
                <RemovableList 
                    list={props.state.job}
                    handleDelete={handleDeleteJob}
                />
            </PageBox>
            <PageBox sx={{pt: 4, display: 'flex'}}>
                <BobButton title='다 음' onClick={handleNext} disabled={disabled} />
            </PageBox>
        </div>
    )
}

export default Job;