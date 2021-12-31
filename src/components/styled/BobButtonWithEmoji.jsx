import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { EmojiProvider, Emoji } from 'react-apple-emojis'
import emojiData from 'react-apple-emojis/lib/data.json'
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 45,
        width: '85%',
        padding: '0 30px',
    },
});

const BobButton = (props) => {
    const classes = useStyles();

    return (
        <Button className={classes.root} onClick={props.onClick} disabled={props.disabled}>
            <Typography variant='h6'>
                {props.title}&nbsp;
                <EmojiProvider data={emojiData}>
                    <Emoji name={props.emoji} width={20} />
                </EmojiProvider>
            </Typography>
        </Button>
    )
}

export default BobButton;