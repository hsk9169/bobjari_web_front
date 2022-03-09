import * as React from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Search from '@mui/icons-material/Search';
import PageBox       from 'components/styled/PageBox'
import BobButton     from 'components/styled/BobButton'
import RemovableList from 'components/styled/RemovableList';

import {corps} from 'constants/job-corp-name'


const Company = (props) => {

    const progressRatio = 10

    const handleAddCompany = event => {
        let company;
        if (event.target.innerText &&
            props.state.company.indexOf(event.target.innerText) === -1) {
            company = event.target.innerText;
            props.setState({
                ...props.state,
                company: company,
            });
        } else if (event.target.value &&
            event.target.value.replace(/ /g,'').length > 0) {
            company = event.target.value;
            console.log(company)
            props.setState({
                ...props.state,
                company: company,
            });
        }
    }

    const handleDeleteCompany = select => event => {
        props.setState({
            ...props.state,
            company: ''
        })
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
            <PageBox sx={{display: 'flex',p:2}}>
                <Autocomplete
                    id="companySelect"
                    options={corps}
                    freeSolo
                    selectOnFocus
                    clearOnBlur
                    onChange={handleAddCompany}
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
                                label="회사명 검색"
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
                    list={(props.state.company === '' ? [] : [props.state.company])}
                    handleDelete={handleDeleteCompany}
                />
            </PageBox>
            <PageBox sx={{pt: 3, display: 'flex'}}>
                <BobButton title='다 음' onClick={handleNext} />
            </PageBox>
        </div>
    )
}

export default Company;