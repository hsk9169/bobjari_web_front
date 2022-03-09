import {useEffect} from 'react'
import { ContentRoute } from 'lib';
import {useDispatch} from 'react-redux'
import {Switch} from 'react-router-dom'
import {Mypage, MenteeProfileEdit} from 'pages'
import {updateNavScreen} from 'slices/manage'

const MainRoutes = ({match}) => {

    const dispatch = useDispatch()

    useEffect( () => {
        dispatch(updateNavScreen('mypgae'))
    }, [])
    

    return (
        <Switch>
            <ContentRoute component={Mypage} 
                path={match.path} exact botNav={true} />
            <ContentRoute component={MenteeProfileEdit} 
                path={`${match.path}/edit`} exact botNav={false} />
        </Switch>
    )
}

export default MainRoutes