import {useEffect} from 'react'
import {updateBotNav} from 'slices/manage'
import {Route} from 'react-router-dom'
import {useDispatch} from 'react-redux'


const ContentRoute = ({component: Component, botNav, 
                    checkClick, setDialogOpen, ...rest}) => {
    console.log('Content Route')

    const dispatch = useDispatch()

    const action = (props) => {
        return (
            <Component {...props} />
        )
    }

    useEffect(() => {
        dispatch(updateBotNav(botNav))

        //window.addEventListener('click', handleClick)
        //return () => window.removeEventListener('click', handleClick)
    }, [botNav])

    return (
        <Route {...rest}
            render={action}
        />
    )
}

export default ContentRoute