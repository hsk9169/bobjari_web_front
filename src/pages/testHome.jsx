import {useState, useEffect} from 'react'
import Button from '@mui/material/Button'

const TestHome = (props) => {
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
            Home
            <Button onClick={handleClick}>count</Button>
        </div>
    )
}

export default TestHome;