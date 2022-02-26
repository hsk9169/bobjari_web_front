import {useState} from 'react'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import ButtonBase from '@mui/material/ButtonBase'


const RecentKeywords = (props) => {

    const [keywordList, setKeywordList] = useState([
        '공무원', '광고기획', '디자이너', '회계사', '영상처리 개발'
    ])

    const handleRemoveKeywordsAll = () => {
        setKeywordList([])
    }

    const handleRemoveKeyword = el => {
        setKeywordList([
            ...keywordList.filter(keyword => 
                keyword !== el)
        ])
    }


    return (
        <Grid container direction='column'>
            <Grid container sx={{p:1}}>
                <Grid item 
                    sx={{
                        display:'flex', 
                        alignItems: 'center', 
                        width: '30%'
                    }}
                >
                    <Typography variant='body1'
                        sx={{fontWeight: 'fontWeightBold'}}>
                        최근 검색어
                    </Typography>
                </Grid>
                <Grid item 
                    sx={{
                        display:'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        width: '70%'
                    }}
                >
                    {keywordList.length > 0
                    ?
                        <Typography variant='body1'
                            onClick={handleRemoveKeywordsAll}
                            sx={{
                                color: '#512da8',
                                fontWeight: 'fontWeightMedium'
                            }}
                        >
                            모두 지우기
                        </Typography>
                    : null}
                </Grid>
            </Grid>
            <Grid container>
                {keywordList.length > 0 ?
                    keywordList.map( el => (
                        <Grid item conatiner direction='column'
                            sx={{p: 1, width: '50%'}}>
                            <Grid item container
                                sx={{display:'flex', alignItems:'center'}}>
                                <Grid item sx={{width: '90%'}}>
                                    <Typography variant='button'>
                                        {el}
                                    </Typography>
                                </Grid>
                                <Grid item sx={{width: '10%'}}>
                                    <ButtonBase>
                                        <CloseIcon color='disabled'
                                            sx={{width: 20}}
                                            onClick={() => 
                                                handleRemoveKeyword(el)} 
                                        />
                                    </ButtonBase>
                                </Grid>
                            </Grid>
                            <Grid item sx={{pt: 0.5, width: '100%'}}>
                                <Divider />
                            </Grid>
                        </Grid>
                    ))
                    : <Typography variant='body1' 
                        color='text.secondary'
                        sx={{p: 1}}>
                        없음
                    </Typography>
                }
            </Grid>
        </Grid>
    )
}

export default RecentKeywords