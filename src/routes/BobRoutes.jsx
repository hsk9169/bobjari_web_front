import {useEffect} from 'react'
import { ContentRoute } from 'lib';
import {useDispatch} from 'react-redux'
import {Switch} from 'react-router-dom'
import {Bob, ChatRoom} from 'pages'
import {updateNavScreen} from 'slices/manage'

const BobRoutes = ({match}) => {

    const dispatch = useDispatch()

    useEffect( () => {
        dispatch(updateNavScreen('bob'))
    }, [])
    

    return (
        <Switch>
            <ContentRoute component={Bob} 
                path={match.path} exact botNav={true} />
        </Switch>
    )
}

export default BobRoutes