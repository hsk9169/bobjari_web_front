import {useState} from 'react'
import PageBox from 'components/styled/PageBox'
import Autocomplete from '@mui/material/Autocomplete';
import Search from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import RemovableList from 'components/styled/RemovableList';
import {jobs} from 'constants/job-corp-name'

const InterestEdit = (props) => {

    const [state, setState] = useState({
        job: [props.interest]
    })
    const handleAddJob = event => {
        let job;
        if (event.target.innerText &&
            state.job.indexOf(event.target.innerText) === -1) {
            job = event.target.innerText;
            setState({
                job: [...state.job, job],
            });
        } else if (event.target.value &&
            event.target.value.replace(/ /g,'').length > 0) {
            job = event.target.value;
            setState({
                job: [...state.job, job],
            });
        }
    }

    const handleDeleteJob = select => event => {
        setState({
            job: [...state.job.filter((el) => 
                    el !== select)]
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
                list={state.job}
                handleDelete={handleDeleteJob}
            />
        </PageBox>
        </div>
    )
}

export default InterestEdit