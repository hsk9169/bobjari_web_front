import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const BobButton = (props) => {

    const StyledButton = styled(Button)({
        '&:active': {
            backgroundColor: '#000000',
            borderColor: '#000000'
        },
        '&:focus': {
            backgroundColor: '#000000',
            borderColor: '#000000'
        }
    })

    return (
        <StyledButton variant='contained' 
            onClick={props.onClick} 
            disabled={props.disabled} 
            sx={{
                width: '100%',
                backgroundColor: '#000000',
                borderRadius: 2
            }}
        >
            <Typography variant='h6'
                sx={{
                    fontWeight: 'fontWeightBold',
                    color: '#ffffff'
                }}
            >
                {props.title}
            </Typography>
        </StyledButton>
    )
}

export default BobButton;