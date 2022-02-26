import Button from '@mui/material/Button'
import PageBox from 'components/styled/PageBox'


const SortDrawer = (props) => {

    return (
        <PageBox sx={{display:'flex'}}>
            <Button variant='contained'
                onClick={props.onClickClose}>
                닫기
            </Button>
        </PageBox>
    )
}

export default SortDrawer