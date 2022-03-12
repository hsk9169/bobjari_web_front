import {HowTo, BobRules} from 'components/Cards'

const BobjariGuide = (props) => {

    return (
        <>
        {props.role === 'mentor'
            ? <BobRules/> : <HowTo/>
        }
        </>
    )
}

export default BobjariGuide