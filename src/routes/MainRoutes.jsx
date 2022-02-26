import { ContentRoute } from 'lib';
import {Switch} from 'react-router-dom'
import {Main, Search, MentorDetails} from 'pages'


const MainRoutes = (props) => {

    return (
        <Switch>
            <ContentRoute component={Main} path='/main'
                exact botNav={true} />
            <ContentRoute component={Search} path='/main/search' 
                exact botNav={false} />
            <ContentRoute component={MentorDetails} path='/main/mentor/:id' 
                exact botNav={false} />
        </Switch>
    )
}

export default MainRoutes