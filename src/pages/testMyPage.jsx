import {useState, useEffect} from 'react'
import Button from '@mui/material/Button'

const TestMyPage = (props) => {
    console.log(props)
    
    const [count, countUp] = useState(props.location.params.count)

    const handleClick = () => {
        countUp(count+1)
        props.location.params.countUp(count)
    }

    useEffect( () => {
        props.location.visible.setState(true)
    })

    return (
        <div>
            MyPage
            <Button onClick={handleClick}>count</Button>
        </div>
    )
}

export default TestMyPage;