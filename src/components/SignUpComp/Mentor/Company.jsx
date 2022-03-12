import * as React from 'react'
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import Search from '@mui/icons-material/Search';
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
        <Grid item container
            direction='column'
            sx={{
                width: '100%',
                display: 'flex', 
                p: 2,
            }}
        >
            <Grid item
                sx={{
                    width: '100%',
                    pt: 4,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Autocomplete
                    id="companySelect"
                    options={corps}
                    freeSolo
                    selectOnFocus
                    clearOnBlur
                    onChange={handleAddCompany}
                    renderInput={(params) => (
                        <Grid container 
                            sx={{ 
                                width: '100%',
                                display: 'flex',
                                alignItems: 'flex-end'
                            }}
                        >
                            <Grid item
                                sx={{width: '10%'}}
                            >
                                <Search 
                                    sx={{ 
                                        color: 'action.active', 
                                        mr: 1, my: 0.5
                                    }} 
                                />
                            </Grid>
                            <Grid item
                                sx={{width: '90%'}}
                            >
                                <TextField
                                    {...params}
                                    variant="standard"
                                    label="회사명 검색"
                                    sx={{
                                        width:'inherit'
                                    }}
                                />
                            </Grid>
                        </Grid>
                    )}
                    sx={{width: '100%'}}
                />
            </Grid>
            <Grid item container
                direction='column'
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <RemovableList 
                    list={(props.state.company === '' ? [] : [props.state.company])}
                    handleDelete={handleDeleteCompany}
                />
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

export default Company;