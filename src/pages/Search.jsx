import {useState, useEffect} from 'react';
import {SearchInputBar, RecentSearchKeywords, SortFilterBar,
        SortDrawer, FilterDrawer, MentorSearchResult} from 'components/Search'
import PageBox from 'components/styled/PageBox'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import { Global } from '@emotion/react';
import {useDispatch} from 'react-redux'
import {getJWT, verifyJWT} from 'utils/handle-jwt'
import {updateSessionTime} from 'slices/manage'

const axios = require('axios');


const Root = styled('div')(({ theme }) => ({
    height: '100%',
    backgroundColor:
    theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

const Search = ({history}) => {

    const dispatch = useDispatch()

    const [searchInput, setSearchInput] = useState('')
    const [queryId, setQueryId] = useState(0)
    const [pending, setPending] = useState(false)
    const [isEnd, setIsEnd] = useState(false)
    const [resultText, setResultText] = useState('')
    const [mentors, setMentors] = useState([])
    const [drawerType, setDrawerType] = useState('')
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [filterSel, setFilterSel] = useState(new Array(5).fill(false))

    const numGet = 10;

    console.log(mentors)

    const handleClickBack = () => {
        history.push('/main')
    }

    const handleSearchInput = event => {
        setSearchInput(event.target.value)
        setQueryId(0)
    }

    const handleSearch = async event => {
        if (event.key === 'Enter') {
            console.log('search')
            event.preventDefault();
            setIsEnd(false)
            if (searchInput === '') {
                setMentors([])
                setResultText('No Result')
                setPending(false)
            } else {
                if (queryId === 0) {
                    await axios.get(process.env.REACT_APP_API_MENTOR_SEARCH,
                        { 
                            params: {
                                keyword: searchInput,
                                startIdx: queryId,
                                num: numGet,
                            },
                        })
                        .then(res => {
                            if (res.data === 'invalid') {
                                let obj = {expireTime: null, remainTime: null}
                                verifyJWT(obj)
                                dispatch(updateSessionTime(obj))
                            } else {
                                if (res.data.length > 0) {
                                    setMentors(res.data)
                                    setQueryId(res.data.length)
                                    setResultText('')
                                } else {
                                    setMentors([])
                                    setResultText('No Result')
                                }
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                } else {
                    setIsEnd(true)
                }
            }
        }
    }

    const handleClickSort = () => {
        setDrawerType('sort')
        setDrawerOpen(true)
    }

    const handleClickFilter = () => {
        setDrawerType('filter')
        setDrawerOpen(true)
    }

    const toggleDrawer = (newOpen) => () => {
        setDrawerOpen(newOpen);
    };

    const infiniteScroll = async () => {
        let scrollHeight = Math.max(
            document.documentElement.scrollHeight, 
            document.body.scrollHeight);
        let scrollTop = Math.max(
            document.documentElement.scrollTop,
            document.body.scrollTop);
        let clientHeight = document.documentElement.clientHeight;
        if (scrollTop + clientHeight === scrollHeight) {
            setPending(true)
            if (!isEnd) {
                await axios.get(process.env.REACT_APP_API_MENTORS_GET,
                    { 
                        headers: {
                            Authorization: `Bearer ${getJWT().accessToken}`,
                        },
                        params: {
                            keyword: searchInput,
                            startIdx: queryId,
                            num: numGet,
                        },
                    })
                    .then(res => {
                        setPending(false)
                        if (res.data === 'invalid') {
                            let obj = {expireTime: null, remainTime: null}
                            verifyJWT(obj)
                            dispatch(updateSessionTime(obj))
                        } else {
                            if (res.data.length > 0) {
                                setMentors([...mentors, ...res.data])
                                setQueryId(queryId + res.data.length)
                            } else {
                                setIsEnd(true)
                            }
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            } else {
                setPending(false)
            }
        }
    }

    useEffect( () => {
        window.addEventListener('scroll', infiniteScroll)
        return () => window.removeEventListener('scroll', infiniteScroll)
    })

    return (
        <div>
        <PageBox sx={{p: 2, display: 'flex'}}>
            <Stack direction='column' spacing={2}
                sx={{width: '100%'}}>   
                <SearchInputBar
                    onClickBack={handleClickBack}
                    searchInput={searchInput} 
                    onSearchInput={handleSearchInput}
                    onSearchClick={handleSearch}
                />
                <RecentSearchKeywords />
                <SortFilterBar 
                    filterSel={filterSel}
                    onClickSort={handleClickSort}
                    onClickFilter={handleClickFilter}
                    setFilterSel={setFilterSel}
                />
                <MentorSearchResult 
                    mentors={mentors}
                    pending={pending}
                    resultText={resultText}
                />
            </Stack>
        </PageBox>



        <Root>
        <CssBaseline />
            <Global
                styles={{
                    '.MuiDrawer-root > .MuiPaper-root': {
                      height: drawerType === 'sort' ? '50%' : '90%',
                      overflow: 'hidden',
                    },
                    '.MuiDrawer-paper': {
                        borderTopLeftRadius: 24,
                        borderTopRightRadius: 24,
                    }
                }}
            />
            <Drawer
                anchor="bottom"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                ModalProps={{
                    keepMounted: true,
                }}
            > 
                {drawerType === 'sort' 
                ? <SortDrawer onClickClose={toggleDrawer(false)} /> 
                : <FilterDrawer onClickClose={toggleDrawer(false)} />}
            </Drawer>
        </Root>
        </div>
    )
}

export default Search